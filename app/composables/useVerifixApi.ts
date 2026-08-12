export type VerifixEvent = {
  barber_id: string | null
  branch_id: string | null
  event_type: string
  is_late: boolean | null
  late_by_minutes: number | null
  occurred_at: string | null
}

export type VerifixEventsResponse = {
  items: VerifixEvent[]
  total: number
}

export type VerifixEventsQuery = {
  barber_id?: string | null
  branch_id?: string | null
  end_date?: string
  event_type?: string
  late_only?: boolean
  limit?: number
  start_date?: string
}

export function useVerifixApi() {
  const client = useApiClient()

  return {
    events(query: VerifixEventsQuery = {}, options: { silent?: boolean } = {}) {
      return client.request<VerifixEventsResponse>('/api/verifix/events', {
        query: { __skipBranchScope: true, ...query },
        silent: options.silent
      })
    }
  }
}
