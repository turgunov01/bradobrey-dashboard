import { listSupabaseUsers } from '~~/server/utils/admin-access'
import { ensureDashboardAccess } from '~~/server/utils/dashboard-access'

export default defineEventHandler(async (event) => {
  await ensureDashboardAccess(event)

  const items = await listSupabaseUsers(event, { role: 'barber' })

  return {
    items: items.map(item => ({
      branch_id: item.branch_id || null,
      id: String(item.id),
      login: item.login || null,
      role: item.role || null
    })),
    total: items.length
  }
})
