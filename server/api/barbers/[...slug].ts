import { proxyBackend } from '~~/server/utils/backend'

export default defineEventHandler(async (event): Promise<unknown> => {
  const slug = event.context.params?.slug || ''
  const path = `/api/barbers/${slug}`
  const auth = slug === 'register' ? 'none' : 'required'

  return proxyBackend<unknown>(event, path, auth)
})
