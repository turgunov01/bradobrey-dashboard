import type { ServiceFormPayload } from '~~/shared/schemas'

export function useServicesApi() {
  const client = useApiClient()

  return {
    create(payload: ServiceFormPayload) {
      return client.request('/api/services', { body: payload, method: 'POST', successMessage: 'Услуга создана' })
    },
    detail(id: string) {
      return client.request(`/api/services/${id}`)
    },
    list() {
      return client.request('/api/services')
    },
    remove(id: string) {
      return client.request(`/api/services/${id}`, { method: 'DELETE', successMessage: 'Услуга удалена' })
    },
    update(id: string, payload: Partial<ServiceFormPayload>) {
      return client.request(`/api/services/${id}`, { body: payload, method: 'PATCH', successMessage: 'Услуга обновлена' })
    }
  }
}
