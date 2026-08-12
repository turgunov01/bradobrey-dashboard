import { createError } from 'h3'

export default defineEventHandler(() => {
  throw createError({
    statusCode: 405,
    statusMessage: 'Employee deletion is disabled. Archive the employee instead.'
  })
})
