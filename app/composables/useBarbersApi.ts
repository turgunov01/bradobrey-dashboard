import type {
  BarberProfile,
  BarberUser,
  BreakPayload,
  LoginPayload,
  QueueEditBeforeCompletePayload,
  QueueItem,
  QueueUpdatePayload,
} from "~~/shared/schemas";

export function useBarbersApi() {
  const client = useApiClient();

  return {
    break(minutes: BreakPayload) {
      return client.request("/api/barbers/break", {
        body: minutes,
        method: "POST",
        successMessage: "РџРµСЂРµСЂС‹РІ РЅР°С‡Р°С‚",
      });
    },
    callQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/call`, {
        method: "PATCH",
        successMessage: "РљР»РёРµРЅС‚ РІС‹Р·РІР°РЅ",
      });
    },
    completeQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/complete`, {
        method: "PATCH",
        successMessage: "Р—Р°РїРёСЃСЊ РѕС‡РµСЂРµРґРё Р·Р°РІРµСЂС€РµРЅР°",
      });
    },
    list(query?: Record<string, unknown>) {
      return client.request<{
        items: Array<{
          branch_id: string | null;
          id: string;
          login: string | null;
          role: string | null;
        }>;
        total?: number;
      }>("/api/barbers", {
        method: "GET",
        query,
      });
    },
    login(payload: LoginPayload) {
      const data = client.request<any>("/api/barbers/login", {
        body: payload,
        method: "POST",
        successMessage: "Р’С…РѕРґ РІС‹РїРѕР»РЅРµРЅ",
      });

      return data;
    },
    logout(payload?: Record<string, unknown>) {
      return client.request("/api/barbers/logout", {
        body: payload,
        method: "POST",
        successMessage: "Р’С‹С…РѕРґ РІС‹РїРѕР»РЅРµРЅ",
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
    queue() {
      return client.request<{ count: number; items: QueueItem[] }>(
        "/api/barbers/queue",
      );
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
    register(payload: Record<string, unknown>) {
      return client.request("/api/barbers/register", {
        body: payload,
        method: "POST",
        successMessage: "Р‘Р°СЂР±РµСЂ Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅ",
      });
    },
    returnFromBreak() {
      return client.request("/api/barbers/return", {
        method: "POST",
        successMessage: "Р’РѕР·РІСЂР°С‚ СЃ РїРµСЂРµСЂС‹РІР° РІС‹РїРѕР»РЅРµРЅ",
      });
    },
    startQueue(id: string) {
      return client.request(`/api/barbers/queue/${id}/start`, {
        method: "PATCH",
        successMessage: "РЈСЃР»СѓРіР° РЅР°С‡Р°С‚Р°",
      });
    },
    updateMe(body: FormData | Record<string, unknown>) {
      return client.request("/api/barbers/me", {
        body,
        method: "PATCH",
        successMessage: "РџСЂРѕС„РёР»СЊ РѕР±РЅРѕРІР»РµРЅ",
      });
    },
    updateQueue(id: string, payload: QueueUpdatePayload) {
      return client.request(`/api/barbers/queue/${id}`, {
        body: payload,
        method: "PATCH",
        successMessage: "Р—Р°РїРёСЃСЊ РѕС‡РµСЂРµРґРё РѕР±РЅРѕРІР»РµРЅР°",
      });
    },
    updateQueueBeforeComplete(
      id: string,
      payload: QueueEditBeforeCompletePayload,
    ) {
      return client.request(`/api/barbers/queue/${id}/edit-before-complete`, {
        body: payload,
        method: "PATCH",
        successMessage: "РљРѕСЂСЂРµРєС‚РёСЂРѕРІРєР° РїРµСЂРµРґ Р·Р°РІРµСЂС€РµРЅРёРµРј СЃРѕС…СЂР°РЅРµРЅР°",
      });
    },
    updateQueueNoShow(id: string, payload?: { no_show?: boolean }) {
      return client.request(`/api/barbers/queue/${id}/no-show`, {
        body: payload,
        method: "PATCH",
        successMessage: "Р—Р°РїРёСЃСЊ РѕС‚РјРµС‡РµРЅР° РєР°Рє РЅРµСЏРІРєР°",
      });
    },
    updateQueueNotInTime(id: string) {
      return client.request(`/api/barbers/queue/${id}/not-in-time`, {
        method: "PATCH",
        successMessage: "Р—Р°РїРёСЃСЊ РѕС‚РјРµС‡РµРЅР° РєР°Рє РЅРµ РІРѕРІСЂРµРјСЏ",
      });
    },
  };
}
