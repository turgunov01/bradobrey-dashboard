import { readBody } from 'h3'

import { backendRequest } from '~~/server/utils/backend'
import { clearAdminSession } from '~~/server/utils/admin-session'
import { clearBarberToken, getBarberToken } from '~~/server/utils/session'

export default defineEventHandler(async (event): Promise<{ success: true }> => {
  const payload = await readBody(event).catch(() => ({}))

  try {
    if (getBarberToken(event)) {
      await backendRequest(event, {
        auth: 'required',
        body: payload,
        method: 'POST',
        path: '/api/barbers/logout'
      })
    }
  }
  finally {
    clearAdminSession(event)
    clearBarberToken(event)
  }

  return { success: true }
})
