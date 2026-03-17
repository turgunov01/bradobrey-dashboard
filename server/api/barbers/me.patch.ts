import { setResponseStatus } from 'h3'

import { backendRequest, readIncomingBody } from '~~/server/utils/backend'

export default defineEventHandler(async (event): Promise<unknown> => {
  const response = await backendRequest(event, {
    auth: 'required',
    body: await readIncomingBody(event),
    method: 'PATCH',
    path: '/api/barbers/me'
  })

  setResponseStatus(event, response.status)

  return response.data
})
