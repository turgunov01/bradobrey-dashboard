<script setup lang="ts">
import { calculateMinutePenalty } from '~/utils/penalty'
import { formatMoney } from '~/utils/format'
import { useStorage } from '@vueuse/core'
import type { TableColumn } from '@nuxt/ui'

import type { VerifixEvent, VerifixSchedule } from '~/composables/useVerifixApi'

type LateRow = {
  id: string
  barberId: string
  barberName: string
  branchId: string
  branchName: string
  date: Date
  lateMinutes: number
  loginAt: Date
  scheduleStart: string
}

const branchStore = useBranchStore()
const barbersApi = useBarbersApi()
const verifixApi = useVerifixApi()
const { data: penaltySettings, refresh: refreshPenaltySettings } = await useVerifixPenalty()
const penaltyOverrides = useStorage<Record<string, number>>('verifix-penalty-overrides', {})

function calculatedPenalty(row: LateRow) {
  return penaltySettings.value
    ? calculateMinutePenalty(row.lateMinutes, penaltySettings.value.penalty_per_minute)
    : 0
}

function penaltyForRow(row: LateRow) {
  const override = penaltyOverrides.value[row.id]

  return typeof override === 'number' && Number.isFinite(override) && override >= 0
    ? override
    : calculatedPenalty(row)
}

function updatePenaltyOverride(row: LateRow, value: unknown) {
  const amount = Number(value)

  if (!Number.isFinite(amount) || amount < 0) return
  penaltyOverrides.value[row.id] = Math.round(amount * 100) / 100
}

function resetPenaltyOverride(row: LateRow) {
  delete penaltyOverrides.value[row.id]
}

await branchStore.ensureLoaded()

function dateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseEventDate(value: unknown) {
  const date = new Date(String(value || ''))
  return Number.isNaN(date.getTime()) ? null : date
}

function getEventDate(event: VerifixEvent) {
  const source = event as VerifixEvent & Record<string, unknown>
  return parseEventDate(
    source.occurred_at
    ?? source.occurredAt
    ?? source.login_at
    ?? source.loginAt
    ?? source.created_at
    ?? source.createdAt
    ?? source.timestamp
  )
}

function getTimeMinutes(value: unknown) {
  const match = String(value || '').match(/^(\d{1,2}):(\d{2})/)
  if (!match) return null

  const hours = Number(match[1])
  const minutes = Number(match[2])
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60
    ? hours * 60 + minutes
    : null
}

function isLoginEvent(event: VerifixEvent) {
  const type = String(event.event_type || '').trim().toLowerCase()
  return !type || [
    'check_in', 'checkin', 'clock_in', 'clockin', 'entry', 'login', 'sign_in', 'signin'
  ].some(loginType => type === loginType || type.includes(loginType))
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(value)
}

function formatTime(value: Date) {
  return new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(value)
}

const now = new Date()
const fromDate = ref(dateInputValue(new Date(now.getFullYear(), now.getMonth(), 1)))
const toDate = ref(dateInputValue(now))
const selectedBranchId = ref<string>(branchStore.activeBranchId || 'all')

watch(() => branchStore.activeBranchId, branchId => {
  selectedBranchId.value = branchId || 'all'
})

const branchOptions = computed(() => [
  { label: 'Общий', value: 'all' },
  ...branchStore.branches.map(branch => ({
    label: String(branch.name || 'Филиал'),
    value: String(branch.id)
  }))
])

const branchNameMap = computed(() => new Map(
  branchStore.branches.map(branch => [String(branch.id), String(branch.name || 'Филиал')])
))

const { data: verifixData, pending, refresh } = await useAsyncData('verifix-lateness', async () => {
  if (!fromDate.value || !toDate.value) {
    return { employees: [], events: [] as VerifixEvent[], schedules: [] as VerifixSchedule[] }
  }

  const branchIds = selectedBranchId.value === 'all'
    ? branchStore.branches.map(branch => String(branch.id))
    : [selectedBranchId.value]
  const results = await Promise.all(branchIds.map(async (branchId) => {
    const [eventsResponse, schedulesResponse, employeesResponse] = await Promise.all([
      verifixApi.events({ branch_id: branchId, start_date: fromDate.value, end_date: toDate.value, limit: 1000 }, { silent: true }),
      verifixApi.schedules({ branch_id: branchId }),
      barbersApi.list({ branch_id: branchId, mode: 'employees' })
    ])

    return {
      employees: Array.isArray(employeesResponse?.items) ? employeesResponse.items : [],
      events: Array.isArray(eventsResponse?.items)
        ? eventsResponse.items.map(event => ({ ...event, branch_id: event.branch_id || branchId }))
        : [],
      schedules: Array.isArray(schedulesResponse?.items) ? schedulesResponse.items : []
    }
  }))

  return {
    employees: results.flatMap(result => result.employees),
    events: results.flatMap(result => result.events),
    schedules: results.flatMap(result => result.schedules)
  }
}, {
  default: () => ({ employees: [], events: [] as VerifixEvent[], schedules: [] as VerifixSchedule[] }),
  server: false,
  watch: [selectedBranchId, fromDate, toDate]
})

async function refreshAll() {
  await Promise.all([refresh(), refreshPenaltySettings()])
}

const employeeNameMap = computed(() => new Map(
  verifixData.value.employees.map(employee => [String(employee.id), String(employee.name || employee.login || `Сотрудник ${employee.id}`)])
))

const schedulesByBranchAndDay = computed(() => {
  const schedules = new Map<string, { graceMinutes: number, startMinutes: number, startTime: string }>()
  for (const schedule of verifixData.value.schedules) {
    const key = `${schedule.branch_id}:${schedule.day_of_week}`
    if (!schedule.is_active || schedule.barber_id || schedules.has(key)) continue
    const startMinutes = getTimeMinutes(schedule.start_time)
    if (startMinutes === null) continue
    schedules.set(key, {
      graceMinutes: Math.max(0, Number(schedule.grace_minutes) || 0),
      startMinutes,
      startTime: schedule.start_time.slice(0, 5)
    })
  }
  return schedules
})

const lateRows = computed<LateRow[]>(() => {
  const firstLogins = new Map<string, { barberId: string, branchId: string, loginAt: Date }>()

  for (const event of verifixData.value.events) {
    if (!isLoginEvent(event) || !event.barber_id) continue
    const loginAt = getEventDate(event)
    if (!loginAt) continue

    const barberId = String(event.barber_id)
    const branchId = String(event.branch_id || '')
    if (!branchId) continue

    const key = `${branchId}:${barberId}:${dateInputValue(loginAt)}`
    const current = firstLogins.get(key)
    if (!current || loginAt.getTime() < current.loginAt.getTime()) firstLogins.set(key, { barberId, branchId, loginAt })
  }

  return [...firstLogins.values()].flatMap(({ barberId, branchId, loginAt }) => {
    const schedule = schedulesByBranchAndDay.value.get(`${branchId}:${loginAt.getDay()}`)
    if (!schedule) return []

    const loginMinutes = loginAt.getHours() * 60 + loginAt.getMinutes()
    const lateMinutes = Math.max(0, loginMinutes - schedule.startMinutes - schedule.graceMinutes)
    if (!lateMinutes) return []

    return [{
      id: `${branchId}:${barberId}:${loginAt.toISOString()}`,
      barberId,
      barberName: employeeNameMap.value.get(barberId) || `Сотрудник ${barberId.slice(0, 6)}`,
      branchId,
      branchName: branchNameMap.value.get(branchId) || 'Филиал',
      date: loginAt,
      lateMinutes,
      loginAt,
      scheduleStart: schedule.startTime
    }]
  }).sort((left, right) => right.loginAt.getTime() - left.loginAt.getTime())
})

const totalLateMinutes = computed(() => lateRows.value.reduce((sum, row) => sum + row.lateMinutes, 0))
const penaltyTotal = computed(() => penaltySettings.value
  ? lateRows.value.reduce((sum, row) => row ? sum + penaltyForRow(row) : sum, 0)
  : null)
const lateEmployees = computed(() => new Set(lateRows.value.map(row => row.barberId)).size)
const page = ref(1)
const pageSize = 20
const pageCount = computed(() => Math.max(1, Math.ceil(lateRows.value.length / pageSize)))
const pagedLateRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return lateRows.value.slice(start, start + pageSize)
})

watch([lateRows, page], () => {
  if (page.value > pageCount.value) {
    page.value = pageCount.value
  }
})

watch([selectedBranchId, fromDate, toDate], () => {
  page.value = 1
})

const columns: TableColumn<LateRow>[] = [
  { accessorKey: 'barberName', header: 'Сотрудник' },
  { accessorKey: 'branchName', header: 'Филиал' },
  { id: 'date', header: 'Дата' },
  { id: 'scheduleStart', header: 'Начало смены' },
  { id: 'loginAt', header: 'Первый вход' },
  { id: 'lateMinutes', header: 'Опоздание' },
  { id: 'penalty', header: 'Штраф' }
]
</script>

<template>
  <UDashboardPanel id="verifix">
    <template #body>
      <div class="space-y-5 sm:space-y-6">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 class="barbershop-heading text-2xl text-charcoal-950 sm:text-3xl">Verifix</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-charcoal-500">Опоздания по первому входу сотрудника относительно графика филиала.</p>
          </div>
          <UButton class="w-full sm:w-auto" icon="i-lucide-refresh-cw" color="neutral" variant="outline" :loading="pending" @click="refreshAll">Обновить</UButton>
        </div>

        <UCard class="warm-card rounded-[1.25rem] border border-charcoal-200 bg-white/90" :ui="{ body: 'p-4 sm:p-6' }">
          <div class="grid gap-4 md:grid-cols-3">
            <label class="flex items-center gap-3">
              <span class="shrink-0 text-sm font-semibold text-charcoal-700">С</span>
              <UInput v-model="fromDate" type="date" size="lg" class="min-w-0 flex-1" :max="toDate" :ui="{ base: 'px-4' }" />
            </label>
            <label class="flex items-center gap-3">
              <span class="shrink-0 text-sm font-semibold text-charcoal-700">По</span>
              <UInput v-model="toDate" type="date" size="lg" class="min-w-0 flex-1" :min="fromDate" :ui="{ base: 'px-4' }" />
            </label>
            <label class="space-y-2">
              <span class="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal-500">Филиал</span>
              <USelectMenu v-model="selectedBranchId" :items="branchOptions" value-key="value" size="lg" class="w-full" placeholder="Выберите филиал" />
            </label>
          </div>
        </UCard>

        <VerifixPenaltySettings />

        <div class="grid gap-4 sm:grid-cols-4">
          <DashboardMetricCard label="Общая сумма штрафов" icon="i-lucide-coins" :value="penaltyTotal === null ? '—' : formatMoney(penaltyTotal)" />
          <DashboardMetricCard label="Опоздания" icon="i-lucide-circle-alert" :value="String(lateRows.length)" />
          <DashboardMetricCard label="Сотрудники" icon="i-lucide-users" :value="String(lateEmployees)" />
          <DashboardMetricCard label="Всего минут" icon="i-lucide-clock-3" :value="`${totalLateMinutes} мин`" />
        </div>

        <div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90">
          <UTable :columns="columns" :data="pagedLateRows" :loading="pending" :ui="{ root: 'w-full overflow-auto', base: 'w-full min-w-[56rem]', thead: 'bg-charcoal-50/90', tbody: 'divide-y divide-charcoal-100', th: 'px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-charcoal-500 whitespace-nowrap', td: 'px-5 py-4 text-sm text-charcoal-700 align-middle whitespace-nowrap' }">
            <template #barberName-cell="{ row }"><span class="font-semibold text-charcoal-950">{{ row.original.barberName }}</span></template>
            <template #branchName-cell="{ row }">{{ row.original.branchName }}</template>
            <template #date-cell="{ row }">{{ formatDate(row.original.date) }}</template>
            <template #scheduleStart-cell="{ row }">{{ row.original.scheduleStart }}</template>
            <template #loginAt-cell="{ row }">{{ formatTime(row.original.loginAt) }}</template>
            <template #penalty-cell="{ row }">
              <div class="space-y-1">
                <UInput
                  :model-value="penaltyForRow(row.original)"
                  type="number"
                  min="0"
                  step="0.01"
                  size="sm"
                  class="w-32"
                  @update:model-value="value => updatePenaltyOverride(row.original, value)"
                />
                <UButton
                  v-if="penaltyOverrides[row.original.id] !== undefined"
                  size="xs"
                  color="neutral"
                  variant="link"
                  class="px-0"
                  @click="resetPenaltyOverride(row.original)"
                >Авто</UButton>
              </div>
            </template>
            <template #lateMinutes-cell="{ row }"><UBadge color="error" variant="soft">{{ row.original.lateMinutes }} мин</UBadge></template>
          </UTable>
          <div v-if="!pending && !lateRows.length" class="px-6 py-12 text-center text-sm text-charcoal-500">За выбранный период опозданий не найдено.</div>
          <div v-else-if="lateRows.length" class="flex flex-col gap-3 border-t border-charcoal-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <span class="text-xs text-charcoal-500">
              Показано {{ (page - 1) * pageSize + 1 }}–{{ Math.min(page * pageSize, lateRows.length) }} из {{ lateRows.length }}
            </span>
            <UPagination v-model:page="page" :total="lateRows.length" :items-per-page="pageSize" size="sm" />
          </div>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
