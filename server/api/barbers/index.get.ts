import { listSupabaseUsers } from '~~/server/utils/admin-access'
import { ensureDashboardAccess } from '~~/server/utils/dashboard-access'
import { getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  await ensureDashboardAccess(event)

  const { branch_id } = getQuery(event)
  const branchId = branch_id ? String(branch_id) : null

  const items = await listSupabaseUsers(event, { role: 'barber', branchId })

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
