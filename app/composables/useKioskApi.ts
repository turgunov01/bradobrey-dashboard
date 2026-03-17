import type {
  KioskBookingPayload,
  KioskRegisterPayload
} from '~~/shared/schemas'

export function useKioskApi() {
  const client = useApiClient()

  return {
    barbers(branchId: string) {
      return client.request<{ data: any[] }>(`/api/kiosk/barbers/${branchId}`)
    },
    book(payload: KioskBookingPayload) {
      return client.request('/api/kiosk/book', { body: payload, method: 'POST', successMessage: 'Booking created' })
    },
    certificate(code: string) {
      return client.request(`/api/kiosk/certificate/${code}`)
    },
    config() {
      return client.request<{ branches: any[] }>('/api/kiosk/config')
    },
    index() {
      return client.request('/api/kiosk')
    },
    register(payload: KioskRegisterPayload) {
      return client.request('/api/kiosk/register', { body: payload, method: 'POST', successMessage: 'Kiosk registered' })
    },
    services(query?: Record<string, unknown>) {
      return client.request<{ categories?: any[], services?: any[] }>('/api/kiosk/services', { query })
    }
  }
}
