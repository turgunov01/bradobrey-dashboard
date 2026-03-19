export function useMarketplaceApi() {
  const client = useApiClient()

  return {
    create(body: FormData) {
      return client.request('/api/marketplace/banners', {
        body,
        method: 'POST',
        successMessage: 'Баннер создан'
      })
    },
    detail(id: string) {
      return client.request(`/api/marketplace/banners/${id}`)
    },
    list() {
      return client.request('/api/marketplace/banners')
    },
    toggleActive(id: string, isActive: boolean) {
      return client.request(`/api/marketplace/banners/${id}`, {
        body: { is_active: isActive },
        method: 'DELETE',
        successMessage: isActive ? 'Баннер активирован' : 'Баннер деактивирован'
      })
    },
    update(id: string, body: FormData) {
      return client.request(`/api/marketplace/banners/${id}`, {
        body,
        method: 'PUT',
        successMessage: 'Баннер обновлен'
      })
    }
  }
}
