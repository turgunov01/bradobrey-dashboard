import { createError, getMethod, setResponseStatus } from 'h3'
import { proxyBackend } from '~~/server/utils/backend'

export default defineEventHandler(async (event): Promise<unknown> => {
  const slug = event.context.params?.slug || ''
  const method = getMethod(event)

  // Backend не поддерживает DELETE, удаляем напрямую через Supabase
  if (method === 'DELETE') {
    const config = useRuntimeConfig(event)
    const supabaseUrl = String(config.supabaseUrl || '').trim().replace(/\/$/, '')
    const serviceRoleKey = String(config.supabaseServiceRoleKey || '').trim()

    if (!supabaseUrl || !serviceRoleKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Supabase не настроен для удаления сертификатов.'
      })
    }

    async function deleteFrom(table: string) {
      return $fetch('/rest/v1/' + table, {
        baseURL: supabaseUrl,
        method: 'DELETE',
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          Prefer: 'return=representation'
        },
        query: {
          id: `eq.${slug}`
        }
      })
    }

    try {
      await deleteFrom('certificate')
    }
    catch (error: any) {
      // retry with plural table name if single is missing
      if (error?.response?.status === 404) {
        await deleteFrom('certificates')
      } else {
        throw error
      }
    }

    setResponseStatus(event, 204)
    return { deleted: true }
  }

  return proxyBackend<unknown>(event, `/api/certificate/${slug}`, 'optional')
})
