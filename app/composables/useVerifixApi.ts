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

export type VerifixSchedule = {
  id: string
  branch_id: string
  barber_id: string | null
  day_of_week: number
  start_time: string
  end_time: string | null
  grace_minutes: number | null
  is_active: boolean
}

export type VerifixSchedulePayload = {
  barber_id?: string | null
  branch_id: string
  day_of_week: number
  end_time?: string | null
  grace_minutes?: number
  is_active?: boolean
  start_time: string
}

export type VerifixPenaltySettings = {
  penalty_per_minute: number
}

export function useVerifixApi() {
  const client = useApiClient()

  return {
    settings() {
      return client.request<VerifixPenaltySettings>('/api/verifix/settings', { query: { __skipBranchScope: true } })
    },
    updateSettings(penalty_per_minute: number) {
      return client.request<VerifixPenaltySettings>('/api/verifix/settings', {
        method: 'PATCH',
        body: { penalty_per_minute },
        successMessage: 'Настройки штрафов сохранены'
      })
    },
    bulkSchedules(payload: { branch_ids: string[], start_time: string, end_time: string, grace_minutes: number }) {
      return client.request('/api/verifix/schedules/bulk', {
        method: 'POST', body: payload, successMessage: 'График на все дни недели сохранён'
      })
    },
    events(query: VerifixEventsQuery = {}, options: { silent?: boolean } = {}) {
      return client.request<VerifixEventsResponse>('/api/verifix/events', {
        query: { __skipBranchScope: true, ...query },
        silent: options.silent
      })
    },
    schedules(query: { barber_id?: string, branch_id?: string } = {}) {
      return client.request<{ items: VerifixSchedule[] }>('/api/verifix/schedules', {
        query: { __skipBranchScope: true, ...query }
      })
    },
    createSchedule(payload: VerifixSchedulePayload) {
      return client.request<{ schedule: VerifixSchedule }>('/api/verifix/schedules', {
        body: payload,
        method: 'POST',
        successMessage: 'График Verifix сохранён'
      })
    },
    updateSchedule(id: string, payload: Partial<VerifixSchedulePayload>) {
      return client.request<{ schedule: VerifixSchedule }>(`/api/verifix/schedules/${id}`, {
        body: payload,
        method: 'PATCH',
        successMessage: 'График Verifix обновлён'
      })
    },
    deactivateSchedule(id: string) {
      return client.request<{ schedule: VerifixSchedule }>(`/api/verifix/schedules/${id}`, {
        method: 'DELETE',
        successMessage: 'График Verifix отключён'
      })
    }
  }
}
