import type { H3Event } from 'h3'

import { ensureAdminNetworkAccess } from './admin-access'
import { clearAdminSession, getAdminSession } from './admin-session'
import { backendRequest } from './backend'
import { clearBarberToken } from './session'

export async function ensureDashboardAccess(event: H3Event) {
  const adminSession = getAdminSession(event)

  if (adminSession) {
    try {
      return await ensureAdminNetworkAccess(event, adminSession)
    }
    catch (error) {
      clearAdminSession(event)
      throw error
    }
  }

  try {
    const response = await backendRequest<{ user?: Record<string, any> | null }>(event, {
      auth: 'required',
      method: 'GET',
      path: '/api/barbers/me'
    })

    return await ensureAdminNetworkAccess(event, {
      id: response.data?.user?.id,
      login: response.data?.user?.login
    })
  }
  catch (error: any) {
    if ((error?.statusCode || error?.response?.status) === 403) {
      clearAdminSession(event)
      clearBarberToken(event)
    }

    throw error
  }
}
