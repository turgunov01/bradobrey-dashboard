import type {
  BarberProfile,
  BarberUser,
  BreakPayload,
  LoginPayload,
  QueueEditBeforeCompletePayload,
  QueueItem,
  QueueUpdatePayload
} from '~~/shared/schemas'

export function useBarbersApi() {
  const client = useApiClient()

  return {
    break(minutes: BreakPayload) {
      return client.request('/api/barbers/break', { body: minutes, method: 'POST', successMessage: 'Break started' })
    },
    callQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/call`, { method: 'PATCH', successMessage: 'Client called' })
    },
    completeQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/complete`, { method: 'PATCH', successMessage: 'Queue entry completed' })
    },
    login(payload: LoginPayload) {
      const data = client.request<any>('/api/barbers/login', {
        body: payload,
        method: 'POST',
        successMessage: 'Signed in'
      })

      return data;
    },
    logout(payload?: Record<string, unknown>) {
      return client.request('/api/barbers/logout', { body: payload, method: 'POST', successMessage: 'Signed out' })
    },
    me(options: { silent?: boolean } = {}) {
      return client.request<{ barber: BarberProfile | null, user: BarberUser | null }>('/api/barbers/me', {
        method: 'GET',
        silent: options.silent
      })
    },
    queue() {
      return client.request<{ count: number, items: QueueItem[] }>('/api/barbers/queue')
    },
    queueHistory(query?: Record<string, unknown>) {
      return client.request<{ items: QueueItem[], total?: number }>('/api/history/barber', { query })
    },
    queueItem(id: string, options: { silent?: boolean } = {}) {
      return client.rawRequest<QueueItem>(`/api/barbers/queue/${id}`, { method: 'GET', silent: options.silent })
    },
    register(payload: Record<string, unknown>) {
      return client.request('/api/barbers/register', { body: payload, method: 'POST', successMessage: 'Barber registered' })
    },
    returnFromBreak() {
      return client.request('/api/barbers/return', { method: 'POST', successMessage: 'Returned from break' })
    },
    startQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/start`, { method: 'PATCH', successMessage: 'Service started' })
    },
    updateMe(body: FormData | Record<string, unknown>) {
      return client.request('/api/barbers/me', { body, method: 'PATCH', successMessage: 'Profile updated' })
    },
    updateQueue(id: string, payload: QueueUpdatePayload) {
      return client.request(`/api/barbers/queue/${id}`, { body: payload, method: 'PATCH', successMessage: 'Queue entry updated' })
    },
    updateQueueBeforeComplete(id: string, payload: QueueEditBeforeCompletePayload) {
      return client.request(`/api/barbers/queue/${id}/edit-before-complete`, {
        body: payload,
        method: 'PATCH',
        successMessage: 'Completion override saved'
      })
    },
    updateQueueNoShow(id: string, payload?: { no_show?: boolean }) {
      return client.request(`/api/barbers/queue/${id}/no-show`, {
        body: payload,
        method: 'PATCH',
        successMessage: 'Queue entry marked as no-show'
      })
    },
    updateQueueNotInTime(id: string) {
      return client.request(`/api/barbers/queue/${id}/not-in-time`, {
        method: 'PATCH',
        successMessage: 'Queue entry marked not in time'
      })
    }
  }
}
