import { createError } from 'h3'

import { ensureDashboardAccess } from '~~/server/utils/dashboard-access'
import { supabaseRequest } from '~~/server/utils/supabase'

function requireBranchId(value: unknown) {
  const id = String(value || '').trim()

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'РќРµ СѓРєР°Р·Р°РЅ id С„РёР»РёР°Р»Р°.'
    })
  }

  return id
}

export default defineEventHandler(async (event) => {
  await ensureDashboardAccess(event)

  const branchId = requireBranchId(event.context.params?.id)

  const rows = await supabaseRequest(event, 'branches', {
    method: 'DELETE',
    prefer: 'return=representation',
    query: {
      id: `eq.${branchId}`,
      select: 'id'
    }
  })

  const item = Array.isArray(rows) ? rows[0] : null

  if (!item) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Р¤РёР»РёР°Р» РЅРµ РЅР°Р№РґРµРЅ.'
    })
  }

  return {
    deleted: true,
    id: String(item.id)
  }
})

