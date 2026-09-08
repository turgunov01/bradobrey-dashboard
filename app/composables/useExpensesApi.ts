type ExpenseRecord = Record<string, unknown>
type ExpenseListResponse = ExpenseRecord[] | { items?: ExpenseRecord[]; data?: ExpenseRecord[]; total?: number }

export function useExpensesApi() {
  const client = useApiClient()

  return {
    list(query?: Record<string, unknown>) {
      return client.request<ExpenseListResponse>('/api/expenses', { query })
    },
    create(body: ExpenseRecord) {
      return client.request<ExpenseRecord>('/api/expenses', {
        body,
        method: 'POST',
        successMessage: 'Расход создан'
      })
    },
    update(id: string, body: ExpenseRecord) {
      return client.request<ExpenseRecord>(`/api/expenses/${id}`, {
        body,
        method: 'PATCH',
        successMessage: 'Расход обновлён'
      })
    },
    remove(id: string) {
      return client.request<ExpenseRecord>(`/api/expenses/${id}`, {
        method: 'DELETE',
        successMessage: 'Расход удалён'
      })
    }
  }
}
