import { createError, setResponseStatus } from 'h3'

import { backendRequest, readIncomingBody } from '~~/server/utils/backend'

type BulkScheduleBody = {
  branch_ids?: string[]
  end_time?: string
  grace_minutes?: number
  start_time?: string
}

type VerifixScheduleItem = {
  barber_id?: string | null
  branch_id?: string | null
  day_of_week?: number | null
  end_time?: string | null
  grace_minutes?: number | null
  id?: string
  is_active?: boolean | null
  start_time?: string | null
}

async function listSchedulesForBranch(event: Parameters<typeof backendRequest>[0], branchId: string) {
  const response = await backendRequest<{ items?: VerifixScheduleItem[] }>(event, {
    auth: 'required',
    method: 'GET',
    path: '/api/verifix/schedules',
    query: { branch_id: branchId }
  })

  return Array.isArray(response.data?.items) ? response.data.items : []
}

async function deactivateSchedule(event: Parameters<typeof backendRequest>[0], id: string) {
  await backendRequest(event, {
    auth: 'required',
    method: 'DELETE',
    path: `/api/verifix/schedules/${id}`
  })
}

async function createSchedule(
  event: Parameters<typeof backendRequest>[0],
  payload: {
    branch_id: string
    day_of_week: number
    end_time: string
    grace_minutes: number
    start_time: string
  },
) {
  return await backendRequest(event, {
    auth: 'required',
    body: { ...payload, barber_id: null, is_active: true },
    method: 'POST',
    path: '/api/verifix/schedules'
  })
}

export default defineEventHandler(async (event) => {
  const body = (await readIncomingBody(event)) as BulkScheduleBody | undefined
  const branchIds = Array.isArray(body?.branch_ids)
    ? body.branch_ids.map(branchId => String(branchId).trim()).filter(Boolean)
    : []
  const startTime = String(body?.start_time || '').trim()
  const endTime = String(body?.end_time || '').trim()
  const graceMinutes = Number(body?.grace_minutes)

  if (!branchIds.length) {
    throw createError({ statusCode: 400, message: 'Укажите хотя бы один филиал.' })
  }

  if (!startTime || !endTime) {
    throw createError({ statusCode: 400, message: 'Укажите время начала и окончания.' })
  }

  if (startTime === endTime) {
    throw createError({ statusCode: 400, message: 'Время начала и окончания не должны совпадать.' })
  }

  if (!Number.isInteger(graceMinutes) || graceMinutes < 0) {
    throw createError({ statusCode: 400, message: 'Допуск должен быть неотрицательным целым числом.' })
  }

  const created: unknown[] = []

  for (const branchId of branchIds) {
    const schedules = await listSchedulesForBranch(event, branchId)
    const activeGeneralSchedules = schedules.filter(schedule => schedule?.is_active !== false && !schedule?.barber_id)

    for (const schedule of activeGeneralSchedules) {
      if (schedule.id) {
        await deactivateSchedule(event, String(schedule.id))
      }
    }

    for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek += 1) {
      const response = await createSchedule(event, {
        branch_id: branchId,
        day_of_week: dayOfWeek,
        end_time: endTime,
        grace_minutes: graceMinutes,
        start_time: startTime
      })

      created.push(response.data)
    }
  }

  setResponseStatus(event, 200)
  return { items: created }
})
