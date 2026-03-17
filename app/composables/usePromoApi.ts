import type {
  PromoCreatePayload,
  PromoUsePayload,
  PromoValidatePayload
} from '~~/shared/schemas'

export function usePromoApi() {
  const client = useApiClient()

  return {
    create(payload: PromoCreatePayload) {
      return client.request('/api/promo-code/dashboard/create', {
        body: payload,
        method: 'POST',
        successMessage: 'Promo code created'
      })
    },
    dashboard() {
      return client.request('/api/promo-code/dashboard')
    },
    detail(id: string) {
      return client.request(`/api/promo-code/dashboard/${id}`)
    },
    use(payload: PromoUsePayload) {
      return client.request('/api/promo-code/use', {
        body: payload,
        method: 'POST',
        successMessage: 'Promo code usage recorded'
      })
    },
    validate(payload: PromoValidatePayload) {
      return client.request('/api/promo-code/validate', {
        body: payload,
        method: 'POST',
        successMessage: 'Promo code validated'
      })
    }
  }
}
