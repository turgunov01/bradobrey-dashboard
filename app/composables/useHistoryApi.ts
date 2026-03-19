export function useHistoryApi() {
  const client = useApiClient()

  return {
    barber(query?: Record<string, unknown>) {
      return client.request('/api/history/barber', { query })
    },
    branch(branchId: string, query?: Record<string, unknown>) {
      return client.request('/api/history/branch', {
        query: {
          ...query,
          id: branchId
        }
      })
    },
    list(query?: Record<string, unknown>) {
      return client.request('/api/history', { query })
    }
  }
}
