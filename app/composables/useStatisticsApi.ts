export function useStatisticsApi() {
  const client = useApiClient()

  return {
    barber(barberId: string, query?: Record<string, unknown>) {
      return client.request(`/api/statistics/barbers/${barberId}`, { query })
    },
    branch(branchId: string, query?: Record<string, unknown>) {
      return client.request(`/api/statistics/branches/${branchId}`, { query })
    },
    global(query?: Record<string, unknown>) {
      return client.request('/api/statistics', { query })
    }
  }
}
