import type {
  BarberProfile,
  BarberRegisterPayload,
  BarberUpdatePayload,
  BarberUser,
  BreakPayload,
  EmployeePermission,
  LoginPayload,
  QueueCompletePayload,
  QueueEditBeforeCompletePayload,
  QueueItem,
  QueueUpdatePayload,
} from "~~/shared/schemas";

export function useBarbersApi() {
  const client = useApiClient();

  function getErrorStatus(error: any) {
    return Number(error?.statusCode || error?.status || error?.response?.status || 500);
  }

  function shouldFallbackToActivePatch(error: any) {
    return [404, 405, 501].includes(getErrorStatus(error));
  }

  async function toggleEmployeeArchive(
    id: string,
    endpoint: "archive" | "restore",
    isActive: boolean,
    successMessage: string,
  ) {
    try {
      const response = await client.request(`/api/barbers/${id}/${endpoint}`, {
        method: "PATCH",
        silent: true,
      });

      client.notifySuccess(successMessage);

      return response;
    } catch (error) {
      if (!shouldFallbackToActivePatch(error)) {
        client.notifyError(error);
        throw error;
      }

      return client.request(`/api/barbers/${id}`, {
        body: { is_active: isActive },
        method: "PATCH",
        successMessage,
      });
    }
  }

  return {
    break(minutes: BreakPayload) {
      return client.request("/api/barbers/break", {
        body: minutes,
        method: "POST",
        successMessage: "Перерыв начат",
      });
    },
    callQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/call`, {
        method: "PATCH",
        successMessage: "Клиент вызван",
      });
    },
    completeQueue(id: string, payload: QueueCompletePayload = {}) {
      return client.request(`/api/barbers/queue/${id}/complete`, {
        body: payload,
        method: "PATCH",
        successMessage: "Запись очереди завершена",
      });
    },
    list(query?: Record<string, unknown>) {
      return client.request<{
        items: Array<{
          branch_id: string | null;
          id: string;
          is_active?: boolean | null;
          login: string | null;
          name?: string | null;
          permissions?: EmployeePermission[];
          photo_url?: string | null;
          phone: string | null;
          role: string | null;
          specialization?: string | null;
        }>;
        total?: number;
      }>("/api/barbers", {
        method: "GET",
        query,
      });
    },
    login(payload: LoginPayload) {
      return client.request<any>("/api/barbers/login", {
        body: {
          login: payload.login,
          password: payload.password,
        },
        method: "POST",
        skipAuth: true,
        successMessage: "Вход выполнен",
      });
    },
    logout(payload?: Record<string, unknown>) {
      return client.request("/api/barbers/logout", {
        body: payload,
        method: "POST",
        successMessage: "Выход выполнен",
      });
    },
    me(options: { silent?: boolean } = {}) {
      return client.request<{
        barber: BarberProfile | null;
        user: BarberUser | null;
      }>("/api/barbers/me", {
        method: "GET",
        silent: options.silent,
      });
    },
    queueHistory(query?: Record<string, unknown>) {
      return client.request<{ items: QueueItem[]; total?: number }>(
        "/api/history/barber",
        { query },
      );
    },
    queueItem(id: string, options: { silent?: boolean } = {}) {
      return client.rawRequest<QueueItem>(`/api/barbers/queue/${id}`, {
        method: "GET",
        silent: options.silent,
      });
    },
    register(payload: BarberRegisterPayload | FormData) {
      return client.request("/api/barbers/register", {
        body: payload,
        method: "POST",
        successMessage: "Сотрудник создан",
      });
    },
    archive(id: string) {
      return toggleEmployeeArchive(id, "archive", false, "Сотрудник уволен");
    },
    restore(id: string) {
      return toggleEmployeeArchive(id, "restore", true, "Сотрудник восстановлен");
    },
    returnFromBreak() {
      return client.request("/api/barbers/return", {
        method: "POST",
        successMessage: "Возврат с перерыва выполнен",
      });
    },
    startQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/start`, {
        method: "PATCH",
        successMessage: "Услуга начата",
      });
    },
    startShift() {
      return client.request("/api/barbers/shift/start", {
        method: "POST",
        successMessage: "Смена начата",
      });
    },
    endShift() {
      return client.request("/api/barbers/shift/end", {
        method: "POST",
        successMessage: "Смена завершена",
      });
    },
    update(id: string, payload: BarberUpdatePayload | FormData) {
      return client.request(`/api/barbers/${id}`, {
        body: payload,
        method: "PATCH",
        successMessage: "Сотрудник обновлен",
      });
    },
    updateMe(body: FormData | Record<string, unknown>) {
      return client.request("/api/barbers/me", {
        body,
        method: "PATCH",
        successMessage: "Профиль обновлен",
      });
    },
    updateQueue(id: string, payload: QueueUpdatePayload) {
      return client.request(`/api/barbers/queue/${id}`, {
        body: payload,
        method: "PATCH",
        successMessage: "Запись очереди обновлена",
      });
    },
    updateQueueBeforeComplete(
      id: string,
      payload: QueueEditBeforeCompletePayload,
    ) {
      return client.request(`/api/barbers/queue/${id}/edit-before-complete`, {
        body: payload,
        method: "PATCH",
        successMessage: "Корректировка перед завершением сохранена",
      });
    },
    updateQueueNoShow(id: string, payload?: { no_show?: boolean }) {
      return client.request(`/api/barbers/queue/${id}/no-show`, {
        body: payload,
        method: "PATCH",
        successMessage: "Запись отмечена как неявка",
      });
    },
    updateQueueNotInTime(id: string) {
      return client.request(`/api/barbers/queue/${id}/not-in-time`, {
        method: "PATCH",
        successMessage: "Запись отмечена как не вовремя",
      });
    },
  };
}
