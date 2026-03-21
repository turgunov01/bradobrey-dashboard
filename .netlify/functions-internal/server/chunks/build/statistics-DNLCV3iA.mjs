globalThis.__timing__.logStart('Load chunks/build/statistics-DNLCV3iA');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$7 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { a as useBarbersApi, g as useUiStore, b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$6 } from './Badge-CHxj5N7w.mjs';
import { _ as _sfc_main$1 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$4 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$5 } from './SelectMenu-9fuPONhl.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { _ as __nuxt_component_5 } from './MetricCard-CDSLylAv.mjs';
import { b as formatCount, a as formatMoney, c as formatPercent } from './format-DDcTL-sj.mjs';
import { f as formatPaymentMethod, b as formatScopeLabel } from './display-CyQec-Wd.mjs';
import { f as flattenServicesPayload } from './services-D0S0WuHG.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { u as useHistoryApi } from './useHistoryApi-XZUYGosn.mjs';
import { u as useKioskApi } from './useKioskApi-l3XfHmhL.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1, d as ssrRenderList_1, i as ssrRenderAttr_1, g as ssrRenderStyle_1 } from '../routes/renderer.mjs';
import './index-qsfWWCYt.mjs';
import '../_/nitro.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:fs';
import '../_/shared.cjs.prod.mjs';
import '../virtual/_commonjsHelpers.mjs';
import '../_/FocusScope.mjs';
import '../_/PopperArrow.mjs';
import '../_/utils.mjs';
import '../_/VisuallyHiddenInput.mjs';
import '../_/useId.mjs';
import '../_/index2.mjs';
import '../_/index.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "statistics",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    function extractHistoryItems(response) {
      if (Array.isArray(response)) {
        return response;
      }
      if (!response || typeof response !== "object") {
        return [];
      }
      const payload = response;
      if (Array.isArray(payload.items)) {
        return payload.items;
      }
      if (Array.isArray(payload.data)) {
        return payload.data;
      }
      if (Array.isArray(payload.data?.items)) {
        return payload.data.items;
      }
      return [];
    }
    function extractBarberAccounts(response) {
      if (!response || typeof response !== "object") {
        return [];
      }
      const items = Array.isArray(response.items) ? response.items : [];
      return items.flatMap((item) => {
        if (!item || typeof item !== "object") {
          return [];
        }
        const payload = item;
        return [{
          branch_id: payload.branch_id == null ? null : String(payload.branch_id),
          id: String(payload.id || ""),
          login: normalizeText(payload.login),
          role: normalizeText(payload.role)
        }];
      }).filter((item) => Boolean(item.id));
    }
    function normalizeText(value) {
      if (value === void 0 || value === null) {
        return null;
      }
      const text = String(value).trim();
      return text || null;
    }
    function normalizeTimestamp(value) {
      const normalizedValue = normalizeText(value);
      if (!normalizedValue) {
        return null;
      }
      const trimmedFraction = normalizedValue.replace(/(\.\d{3})\d+/, "$1");
      const date = new Date(trimmedFraction);
      return Number.isNaN(date.getTime()) ? null : date.getTime();
    }
    function parseRangeDate(value) {
      const normalizedValue = normalizeText(value);
      if (!normalizedValue) {
        return null;
      }
      const date = /* @__PURE__ */ new Date(`${normalizedValue}T00:00:00`);
      return Number.isNaN(date.getTime()) ? null : date;
    }
    function toDateKey(timestamp) {
      return new Date(timestamp).toISOString().slice(0, 10);
    }
    function shortId(value) {
      const normalizedValue = normalizeText(value);
      if (!normalizedValue) {
        return "неизвестно";
      }
      return normalizedValue.slice(0, 8);
    }
    function normalizeStatus(value) {
      return String(value || "unknown").trim().toLowerCase();
    }
    function isCompletedStatus(status) {
      return ["completed", "done", "paid"].includes(status);
    }
    function isCancelledStatus(status) {
      return ["cancelled", "no_show", "not_in_time"].includes(status);
    }
    function getBranchId(item) {
      return normalizeText(item.branch_id || item.branch?.id);
    }
    function getBarberId(item) {
      return normalizeText(item.barber_id || item.barber?.id);
    }
    function getBarberName(item) {
      return normalizeText(item.barber?.name || item.barber_name || item.barber?.user?.name);
    }
    function getClientPhone(item) {
      return normalizeText(
        item.phone_number || item.phone || item.client?.phone || item.client?.phone_number || item.customer?.phone
      );
    }
    function getServiceIds(item) {
      const values = Array.isArray(item.service_ids) ? item.service_ids : item.service_id ? [item.service_id] : [];
      return values.map((value) => normalizeText(value)).filter((value) => Boolean(value));
    }
    function getServicePrice(service) {
      const amount = Number(service?.base_price ?? service?.price ?? 0);
      return Number.isFinite(amount) ? amount : 0;
    }
    function getServiceDuration(service) {
      const amount = Number(service?.duration_minutes ?? service?.duration ?? 0);
      return Number.isFinite(amount) ? amount : 0;
    }
    function average(values) {
      if (!values.length) {
        return 0;
      }
      return values.reduce((sum, value) => sum + value, 0) / values.length;
    }
    function toBarHeight(value, max) {
      if (!value || !max) {
        return 0;
      }
      return Math.max(value / max * 100, 8);
    }
    function formatMinutes(value) {
      const amount = Math.max(0, Math.round(value));
      return `${formatCount(amount)} мин`;
    }
    const shortDayFormatter = new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "short"
    });
    const branchStore = useBranchStore();
    const barbersApi = useBarbersApi();
    const historyApi = useHistoryApi();
    const kioskApi = useKioskApi();
    const uiStore = useUiStore();
    const scope = vueExports.ref("global");
    const selectedBarberId = vueExports.ref("");
    [__temp, __restore] = vueExports.withAsyncContext(() => branchStore.ensureLoaded()), await __temp, __restore();
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("statistics-dashboard-rich", async () => {
      const [historyResult, servicesResult, barbersResult] = await Promise.allSettled([
        historyApi.list(),
        kioskApi.services({ active: true, grouped: true }),
        barbersApi.list()
      ]);
      return {
        barberAccounts: barbersResult.status === "fulfilled" ? extractBarberAccounts(barbersResult.value) : [],
        historyItems: historyResult.status === "fulfilled" ? extractHistoryItems(historyResult.value) : [],
        services: servicesResult.status === "fulfilled" ? flattenServicesPayload(servicesResult.value) : []
      };
    })), __temp = await __temp, __restore(), __temp);
    const serviceMap = vueExports.computed(
      () => new Map(
        (data.value?.services || []).map((service) => [String(service.id), service])
      )
    );
    const branchMap = vueExports.computed(
      () => new Map(
        branchStore.branches.map((branch) => [branch.id, branch])
      )
    );
    const normalizedHistory = vueExports.computed(
      () => (data.value?.historyItems || []).map((item, index) => {
        const createdAt = normalizeText(item.created_at || item.createdAt);
        const finishedAt = normalizeText(item.finished_at || item.completed_at || item.finishedAt || item.completedAt);
        const createdTimestamp = normalizeTimestamp(createdAt);
        const finishedTimestamp = normalizeTimestamp(finishedAt);
        const branchId = getBranchId(item);
        const barberId = getBarberId(item);
        const barberName = getBarberName(item);
        const clientPhone = getClientPhone(item);
        const serviceIds = getServiceIds(item);
        const status = normalizeStatus(item.status);
        const estimatedRevenue = serviceIds.reduce((sum, serviceId) => {
          return sum + getServicePrice(serviceMap.value.get(serviceId));
        }, 0);
        const estimatedServiceMinutes = serviceIds.reduce((sum, serviceId) => {
          return sum + getServiceDuration(serviceMap.value.get(serviceId));
        }, 0);
        let actualServiceMinutes = null;
        if (createdTimestamp !== null && finishedTimestamp !== null && finishedTimestamp >= createdTimestamp) {
          const diffMinutes = (finishedTimestamp - createdTimestamp) / 6e4;
          if (diffMinutes > 0 && diffMinutes <= 360) {
            actualServiceMinutes = diffMinutes;
          }
        }
        const fallbackId = [
          createdAt || finishedAt || "history",
          branchId || "branch",
          barberId || "barber",
          clientPhone || "client",
          serviceIds.join(",") || `item-${index + 1}`
        ].join(":");
        return {
          actualServiceMinutes,
          barberId,
          barberName,
          branchId,
          branchName: branchId ? branchMap.value.get(branchId)?.name || `Филиал ${shortId(branchId)}` : "Филиал не указан",
          clientPhone,
          createdAt,
          createdTimestamp,
          estimatedRevenue,
          estimatedServiceMinutes,
          finishedAt,
          finishedTimestamp,
          id: String(item.id || fallbackId),
          isCancelled: isCancelledStatus(status),
          isCompleted: isCompletedStatus(status),
          paymentMethod: normalizeText(item.payment_method),
          primaryTimestamp: createdTimestamp ?? finishedTimestamp,
          serviceIds,
          status
        };
      }).filter((item) => Boolean(item.id))
    );
    const barberOptions = vueExports.computed(() => {
      const options = /* @__PURE__ */ new Map();
      for (const account of data.value?.barberAccounts || []) {
        const branchId = normalizeText(account.branch_id);
        const branchName = branchId ? branchMap.value.get(branchId)?.name || null : null;
        options.set(account.id, {
          branchId,
          branchName,
          label: account.login || `Барбер ${shortId(account.id)}`,
          login: account.login,
          value: account.id
        });
      }
      for (const item of normalizedHistory.value) {
        if (!item.barberId) {
          continue;
        }
        const existing = options.get(item.barberId);
        const branchId = existing?.branchId || item.branchId || null;
        const branchName = existing?.branchName || item.branchName || null;
        const label = item.barberName || existing?.label || `Барбер ${shortId(item.barberId)}`;
        options.set(item.barberId, {
          branchId,
          branchName,
          label,
          login: existing?.login || null,
          value: item.barberId
        });
      }
      return [...options.values()].sort((left, right) => left.label.localeCompare(right.label, "ru"));
    });
    vueExports.watch(
      () => barberOptions.value.map((option) => option.value),
      (ids) => {
        if (!ids.length) {
          selectedBarberId.value = "";
          return;
        }
        if (!ids.includes(selectedBarberId.value)) {
          selectedBarberId.value = ids[0] || "";
        }
      },
      { immediate: true }
    );
    const selectedBarber = vueExports.computed(
      () => barberOptions.value.find((option) => option.value === selectedBarberId.value) || null
    );
    const selectedRange = vueExports.computed(() => {
      const start = parseRangeDate(uiStore.statisticsRange.start);
      const end = parseRangeDate(uiStore.statisticsRange.end);
      if (!start || !end) {
        return null;
      }
      if (start.getTime() <= end.getTime()) {
        return {
          end: end.getTime() + 86399999,
          start: start.getTime()
        };
      }
      return {
        end: start.getTime() + 86399999,
        start: end.getTime()
      };
    });
    const selectedPeriodDays = vueExports.computed(() => {
      if (!selectedRange.value) {
        return 0;
      }
      return Math.max(1, Math.round((selectedRange.value.end - selectedRange.value.start) / 864e5));
    });
    const needsBranchSelection = vueExports.computed(
      () => scope.value === "branch" && !branchStore.activeBranchId
    );
    const needsBarberSelection = vueExports.computed(
      () => scope.value === "barber" && !selectedBarberId.value
    );
    const scopeHistory = vueExports.computed(() => {
      return normalizedHistory.value.filter((item) => {
        if (scope.value === "branch") {
          return Boolean(branchStore.activeBranchId) && item.branchId === branchStore.activeBranchId;
        }
        if (scope.value === "barber") {
          return Boolean(selectedBarberId.value) && item.barberId === selectedBarberId.value;
        }
        return true;
      });
    });
    const filteredHistory = vueExports.computed(() => {
      if (!selectedRange.value) {
        return [];
      }
      return scopeHistory.value.filter((item) => {
        if (item.primaryTimestamp === null) {
          return false;
        }
        return item.primaryTimestamp >= selectedRange.value.start && item.primaryTimestamp <= selectedRange.value.end;
      }).sort((left, right) => (left.primaryTimestamp || 0) - (right.primaryTimestamp || 0));
    });
    const completedHistory = vueExports.computed(
      () => filteredHistory.value.filter((item) => item.isCompleted)
    );
    const mainMetrics = vueExports.computed(() => {
      const revenue = completedHistory.value.reduce((sum, item) => sum + item.estimatedRevenue, 0);
      const orders = filteredHistory.value.length;
      const completed = completedHistory.value.length;
      const averageCheck = completed ? revenue / completed : 0;
      return {
        averageCheck,
        completed,
        orders,
        revenue
      };
    });
    const clientMetrics = vueExports.computed(() => {
      const firstSeenByPhone = /* @__PURE__ */ new Map();
      for (const item of scopeHistory.value) {
        if (!item.clientPhone || item.primaryTimestamp === null) {
          continue;
        }
        const currentFirstSeen = firstSeenByPhone.get(item.clientPhone);
        if (currentFirstSeen === void 0 || item.primaryTimestamp < currentFirstSeen) {
          firstSeenByPhone.set(item.clientPhone, item.primaryTimestamp);
        }
      }
      const uniqueClientsInPeriod = /* @__PURE__ */ new Map();
      for (const item of filteredHistory.value) {
        if (!item.clientPhone || item.primaryTimestamp === null) {
          continue;
        }
        const currentFirstSeen = uniqueClientsInPeriod.get(item.clientPhone);
        if (currentFirstSeen === void 0 || item.primaryTimestamp < currentFirstSeen) {
          uniqueClientsInPeriod.set(item.clientPhone, item.primaryTimestamp);
        }
      }
      let newClients = 0;
      let repeatClients = 0;
      for (const [phone, firstInPeriod] of uniqueClientsInPeriod.entries()) {
        const firstOverall = firstSeenByPhone.get(phone);
        if (firstOverall !== void 0 && firstOverall < firstInPeriod) {
          repeatClients += 1;
        } else {
          newClients += 1;
        }
      }
      const uniqueClients = uniqueClientsInPeriod.size;
      const completionRate = mainMetrics.value.orders ? mainMetrics.value.completed / mainMetrics.value.orders * 100 : 0;
      return {
        completionRate,
        newClients,
        repeatClients,
        uniqueClients
      };
    });
    const operationsMetrics = vueExports.computed(() => {
      const cancelled = filteredHistory.value.filter((item) => item.isCancelled).length;
      const noShow = filteredHistory.value.filter((item) => item.status === "no_show").length;
      const serviceMinutes = completedHistory.value.map((item) => {
        if (item.actualServiceMinutes !== null) {
          return item.actualServiceMinutes;
        }
        return item.estimatedServiceMinutes > 0 ? item.estimatedServiceMinutes : null;
      }).filter((value) => value !== null && value > 0);
      const waitMinutes = completedHistory.value.map((item) => {
        if (item.actualServiceMinutes === null || item.estimatedServiceMinutes <= 0) {
          return null;
        }
        return Math.max(item.actualServiceMinutes - item.estimatedServiceMinutes, 0);
      }).filter((value) => value !== null);
      return {
        averageServiceMinutes: average(serviceMinutes),
        averageWaitMinutes: average(waitMinutes),
        cancelled,
        noShow
      };
    });
    const timelineRows = vueExports.computed(() => {
      if (!selectedRange.value) {
        return [];
      }
      const points = /* @__PURE__ */ new Map();
      for (let timestamp = selectedRange.value.start; timestamp <= selectedRange.value.end; timestamp += 864e5) {
        const dateKey = toDateKey(timestamp);
        points.set(dateKey, {
          cancelled: 0,
          completed: 0
        });
      }
      for (const item of filteredHistory.value) {
        if (item.primaryTimestamp === null) {
          continue;
        }
        const dateKey = toDateKey(item.primaryTimestamp);
        const current = points.get(dateKey);
        if (!current) {
          continue;
        }
        if (item.isCompleted) {
          current.completed += 1;
        }
        if (item.isCancelled) {
          current.cancelled += 1;
        }
      }
      const maxCompleted = Math.max(...[...points.values()].map((point) => point.completed), 0);
      const maxCancelled = Math.max(...[...points.values()].map((point) => point.cancelled), 0);
      const maxValue = Math.max(maxCompleted, maxCancelled, 4);
      return [...points.entries()].map(([dateKey, point]) => ({
        cancelled: point.cancelled,
        cancelledHeight: toBarHeight(point.cancelled, maxValue),
        completed: point.completed,
        completedHeight: toBarHeight(point.completed, maxValue),
        dateKey,
        label: shortDayFormatter.format(/* @__PURE__ */ new Date(`${dateKey}T00:00:00`))
      }));
    });
    const timelineScaleMax = vueExports.computed(
      () => Math.max(
        ...timelineRows.value.flatMap((point) => [point.completed, point.cancelled]),
        4
      )
    );
    const timelineAxisTicks = vueExports.computed(() => {
      const steps = 4;
      return Array.from({ length: steps + 1 }, (_, index) => {
        const ratio = (steps - index) / steps;
        const value = Math.round(timelineScaleMax.value * ratio);
        return {
          label: formatCount(value),
          value
        };
      });
    });
    const branchBreakdown = vueExports.computed(() => {
      const rows = /* @__PURE__ */ new Map();
      for (const item of filteredHistory.value) {
        const id = item.branchId || "unknown";
        const current = rows.get(id) || {
          cancelled: 0,
          completed: 0,
          completionRate: 0,
          count: 0,
          id,
          label: item.branchName || "Филиал не указан",
          phones: /* @__PURE__ */ new Set(),
          revenue: 0,
          uniqueClients: 0
        };
        current.count += 1;
        if (item.clientPhone) {
          current.phones.add(item.clientPhone);
        }
        if (item.isCompleted) {
          current.completed += 1;
          current.revenue += item.estimatedRevenue;
        }
        if (item.isCancelled) {
          current.cancelled += 1;
        }
        rows.set(id, current);
      }
      return [...rows.values()].map((row) => ({
        cancelled: row.cancelled,
        completionRate: row.count ? row.completed / row.count * 100 : 0,
        count: row.count,
        id: row.id,
        label: row.label,
        revenue: row.revenue,
        uniqueClients: row.phones.size
      })).sort((left, right) => right.revenue - left.revenue || right.count - left.count);
    });
    const barberBreakdown = vueExports.computed(() => {
      const rows = /* @__PURE__ */ new Map();
      for (const item of filteredHistory.value) {
        const id = item.barberId || "unknown";
        const current = rows.get(id) || {
          cancelled: 0,
          completed: 0,
          completionRate: 0,
          count: 0,
          id,
          label: item.barberName || `Барбер ${shortId(item.barberId)}`,
          phones: /* @__PURE__ */ new Set(),
          revenue: 0,
          uniqueClients: 0
        };
        current.count += 1;
        if (item.clientPhone) {
          current.phones.add(item.clientPhone);
        }
        if (item.isCompleted) {
          current.completed += 1;
          current.revenue += item.estimatedRevenue;
        }
        if (item.isCancelled) {
          current.cancelled += 1;
        }
        rows.set(id, current);
      }
      return [...rows.values()].map((row) => ({
        cancelled: row.cancelled,
        completionRate: row.count ? row.completed / row.count * 100 : 0,
        count: row.count,
        id: row.id,
        label: row.label,
        revenue: row.revenue,
        uniqueClients: row.phones.size
      })).sort((left, right) => right.revenue - left.revenue || right.count - left.count);
    });
    const serviceBreakdown = vueExports.computed(() => {
      const rows = /* @__PURE__ */ new Map();
      for (const item of filteredHistory.value) {
        for (const serviceId of item.serviceIds) {
          const service = serviceMap.value.get(serviceId);
          const current = rows.get(serviceId) || {
            avgPrice: 0,
            category: normalizeText(service?.category_name || service?.category) || "Без категории",
            completed: 0,
            count: 0,
            id: serviceId,
            label: normalizeText(service?.name) || `Услуга ${shortId(serviceId)}`,
            revenue: 0
          };
          current.count += 1;
          if (item.isCompleted) {
            current.completed += 1;
            current.revenue += getServicePrice(service);
          }
          rows.set(serviceId, current);
        }
      }
      return [...rows.values()].map((row) => ({
        ...row,
        avgPrice: row.completed ? row.revenue / row.completed : row.revenue / Math.max(row.count, 1)
      })).sort((left, right) => right.count - left.count || right.revenue - left.revenue);
    });
    const paymentBreakdown = vueExports.computed(() => {
      const rows = /* @__PURE__ */ new Map();
      for (const item of filteredHistory.value) {
        const key = normalizeText(item.paymentMethod) || "pending";
        const current = rows.get(key) || {
          count: 0,
          key,
          label: formatPaymentMethod(key),
          percent: 0,
          revenue: 0
        };
        current.count += 1;
        if (item.isCompleted) {
          current.revenue += item.estimatedRevenue;
        }
        rows.set(key, current);
      }
      return [...rows.values()].map((row) => ({
        ...row,
        percent: filteredHistory.value.length ? row.count / filteredHistory.value.length * 100 : 0
      })).sort((left, right) => right.count - left.count || right.revenue - left.revenue);
    });
    const topBranches = vueExports.computed(() => branchBreakdown.value.slice(0, 3));
    const topBarbers = vueExports.computed(() => barberBreakdown.value.slice(0, 3));
    const topServices = vueExports.computed(() => serviceBreakdown.value.slice(0, 3));
    const primaryKpiCards = vueExports.computed(() => [
      {
        description: "Оценка по стоимости услуг в завершённых записях.",
        icon: "i-lucide-wallet",
        label: "Выручка",
        value: formatMoney(mainMetrics.value.revenue)
      },
      {
        description: "Все записи за выбранный период и область.",
        icon: "i-lucide-ticket",
        label: "Заказы",
        value: formatCount(mainMetrics.value.orders)
      },
      {
        description: "Записи со статусом завершения.",
        icon: "i-lucide-check-check",
        label: "Завершено",
        value: formatCount(mainMetrics.value.completed)
      },
      {
        description: "Выручка, делённая на число завершённых записей.",
        icon: "i-lucide-receipt",
        label: "Средний чек",
        value: formatMoney(mainMetrics.value.averageCheck)
      }
    ]);
    const supportingKpiCards = vueExports.computed(() => [
      {
        description: "Уникальные номера телефона в выбранном периоде.",
        icon: "i-lucide-users-round",
        label: "Всего клиентов",
        value: formatCount(clientMetrics.value.uniqueClients)
      },
      {
        description: "Новые и повторные клиенты в рамках выбранной области.",
        icon: "i-lucide-repeat-2",
        label: "Новые / повторные",
        value: `${formatCount(clientMetrics.value.newClients)} / ${formatCount(clientMetrics.value.repeatClients)}`
      },
      {
        description: "Доля завершённых записей от общего числа заказов.",
        icon: "i-lucide-gauge",
        label: "Completion rate",
        value: formatPercent(clientMetrics.value.completionRate)
      }
    ]);
    const operationsCards = vueExports.computed(() => [
      {
        description: "Статусы cancelled, no_show и not_in_time.",
        icon: "i-lucide-ban",
        label: "Отмены",
        value: formatCount(operationsMetrics.value.cancelled)
      },
      {
        description: "Отдельно по статусу no_show.",
        icon: "i-lucide-user-x",
        label: "No-show",
        value: formatCount(operationsMetrics.value.noShow)
      },
      {
        description: "Приближение: фактический цикл минус длительность услуг.",
        icon: "i-lucide-hourglass",
        label: "Среднее ожидание",
        value: formatMinutes(operationsMetrics.value.averageWaitMinutes)
      },
      {
        description: "По completed-записям, от created_at до finished_at.",
        icon: "i-lucide-timer",
        label: "Среднее обслуживание",
        value: formatMinutes(operationsMetrics.value.averageServiceMinutes)
      }
    ]);
    const scopeContextLabel = vueExports.computed(() => {
      if (scope.value === "branch") {
        return branchStore.activeBranch?.name || "Филиал не выбран";
      }
      if (scope.value === "barber") {
        return selectedBarber.value?.label || "Барбер не выбран";
      }
      return "Все филиалы";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$7;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_UBadge = _sfc_main$6;
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$4;
      const _component_USelectMenu = _sfc_main$5;
      const _component_SharedEmptyState = __nuxt_component_9;
      const _component_DashboardMetricCard = __nuxt_component_5;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "statistics" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Статистика",
              ui: { right: "gap-3" }
            }, {
              leading: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UDashboardSidebarCollapse, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UDashboardSidebarCollapse)
                  ];
                }
              }),
              right: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-refresh-cw",
                    loading: vueExports.unref(pending),
                    variant: "outline",
                    onClick: ($event) => vueExports.unref(refresh)()
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Обновить `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Обновить ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      icon: "i-lucide-refresh-cw",
                      loading: vueExports.unref(pending),
                      variant: "outline",
                      onClick: ($event) => vueExports.unref(refresh)()
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Обновить ")
                      ]),
                      _: 1
                    }, 8, ["loading", "onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UDashboardNavbar, {
                title: "Статистика",
                ui: { right: "gap-3" }
              }, {
                leading: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UDashboardSidebarCollapse)
                ]),
                right: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-refresh-cw",
                    loading: vueExports.unref(pending),
                    variant: "outline",
                    onClick: ($event) => vueExports.unref(refresh)()
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Обновить ")
                    ]),
                    _: 1
                  }, 8, ["loading", "onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Настройка среза </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Бизнес-аналитика по истории записей </h2><p class="text-sm text-charcoal-500"${_scopeId2}> Выручка и средний чек считаются по прайсу услуг в завершённых записях, так как backend не отдаёт отдельное поле revenue. </p></div><div class="flex flex-wrap items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    size: "lg",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(formatScopeLabel)(vueExports.unref(scope)))}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatScopeLabel)(vueExports.unref(scope))), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    variant: "outline"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(scopeContextLabel))}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(scopeContextLabel)), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    variant: "outline"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(formatCount)(vueExports.unref(filteredHistory).length))} записей `);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(filteredHistory).length)) + " записей ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Настройка среза "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Бизнес-аналитика по истории записей "),
                        vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Выручка и средний чек считаются по прайсу услуг в завершённых записях, так как backend не отдаёт отдельное поле revenue. ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatScopeLabel)(vueExports.unref(scope))), 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          variant: "outline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(scopeContextLabel)), 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          variant: "outline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(filteredHistory).length)) + " записей ", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 xl:grid-cols-[0.26fr_0.26fr_0.18fr_0.3fr]"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Дата начала" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(uiStore).statisticsRange.start,
                          "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.start = $event,
                          type: "date"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.start,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.start = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Дата окончания" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(uiStore).statisticsRange.end,
                          "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.end = $event,
                          type: "date"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.end,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.end = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Область" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(scope),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(scope) ? scope.value = $event : null,
                          items: [
                            { label: "Общая", value: "global" },
                            { label: "Филиал", value: "branch" },
                            { label: "Барбер", value: "barber" }
                          ],
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(scope),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(scope) ? scope.value = $event : null,
                            items: [
                              { label: "Общая", value: "global" },
                              { label: "Филиал", value: "branch" },
                              { label: "Барбер", value: "barber" }
                            ],
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (vueExports.unref(scope) === "barber") {
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Барбер" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_USelectMenu, {
                            modelValue: vueExports.unref(selectedBarberId),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(selectedBarberId) ? selectedBarberId.value = $event : null,
                            items: vueExports.unref(barberOptions),
                            "value-key": "value"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(selectedBarberId),
                              "onUpdate:modelValue": ($event) => vueExports.isRef(selectedBarberId) ? selectedBarberId.value = $event : null,
                              items: vueExports.unref(barberOptions),
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-[0.26fr_0.26fr_0.18fr_0.3fr]" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Дата начала" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.start,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.start = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Дата окончания" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.end,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.end = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Область" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(scope),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(scope) ? scope.value = $event : null,
                            items: [
                              { label: "Общая", value: "global" },
                              { label: "Филиал", value: "branch" },
                              { label: "Барбер", value: "barber" }
                            ],
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.unref(scope) === "barber" ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                        key: 0,
                        label: "Барбер"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(selectedBarberId),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(selectedBarberId) ? selectedBarberId.value = $event : null,
                            items: vueExports.unref(barberOptions),
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })) : vueExports.createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (vueExports.unref(needsBranchSelection)) {
              _push2(ssrRenderComponent_1(_component_SharedEmptyState, {
                description: "Для режима филиала выберите branch через BranchSelector в левой панели.",
                icon: "i-lucide-map-pinned",
                title: "Филиал не выбран"
              }, null, _parent2, _scopeId));
            } else if (vueExports.unref(needsBarberSelection)) {
              _push2(ssrRenderComponent_1(_component_SharedEmptyState, {
                description: "Не найдено ни одного барбера для построения персональной статистики.",
                icon: "i-lucide-user-round-search",
                title: "Барбер не выбран"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!--[--><div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(primaryKpiCards), (card) => {
                _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
                  key: card.label,
                  description: card.description,
                  icon: card.icon,
                  label: card.label,
                  value: card.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="grid gap-4 xl:grid-cols-3 md:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(supportingKpiCards), (card) => {
                _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
                  key: card.label,
                  description: card.description,
                  icon: card.icon,
                  label: card.label,
                  value: card.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(operationsCards), (card) => {
                _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
                  key: card.label,
                  description: card.description,
                  icon: card.icon,
                  label: card.label,
                  value: card.value
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Динамика </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Завершённые заказы и отказы по дням </h2></div><div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="size-3 rounded-full bg-emerald-400"${_scopeId2}></span> Завершено </div><div class="flex items-center gap-2"${_scopeId2}><span class="size-3 rounded-full bg-amber-400"${_scopeId2}></span> Отказы </div>`);
                    _push3(ssrRenderComponent_1(_component_UBadge, {
                      color: "neutral",
                      variant: "outline"
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(vueExports.unref(formatCount)(vueExports.unref(selectedPeriodDays)))} дн. `);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(selectedPeriodDays))) + " дн. ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between" }, [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Динамика "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Завершённые заказы и отказы по дням ")
                        ]),
                        vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-charcoal-500" }, [
                          vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                            vueExports.createVNode("span", { class: "size-3 rounded-full bg-emerald-400" }),
                            vueExports.createTextVNode(" Завершено ")
                          ]),
                          vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                            vueExports.createVNode("span", { class: "size-3 rounded-full bg-amber-400" }),
                            vueExports.createTextVNode(" Отказы ")
                          ]),
                          vueExports.createVNode(_component_UBadge, {
                            color: "neutral",
                            variant: "outline"
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(selectedPeriodDays))) + " дн. ", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(timelineRows).length && vueExports.unref(filteredHistory).length) {
                      _push3(`<div class="overflow-x-auto pb-2"${_scopeId2}><div class="min-w-[64rem] rounded-[2rem] bg-charcoal-950 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.24)] sm:p-6"${_scopeId2}><div class="grid grid-cols-[3.75rem_minmax(0,1fr)] gap-4"${_scopeId2}><div class="flex h-[24rem] flex-col justify-between pb-12 text-right text-xs font-medium text-sand-200/70"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(timelineAxisTicks), (tick) => {
                        _push3(`<span${_scopeId2}>${ssrInterpolate_1(tick.label)}</span>`);
                      });
                      _push3(`<!--]--></div><div class="relative"${_scopeId2}><div class="pointer-events-none absolute inset-0 flex h-[24rem] flex-col justify-between pb-12"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(timelineAxisTicks), (tick) => {
                        _push3(`<div class="border-t border-dashed border-white/10"${_scopeId2}></div>`);
                      });
                      _push3(`<!--]--></div><div class="relative flex h-[24rem] min-w-max items-end gap-3 pb-12"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(timelineRows), (point) => {
                        _push3(`<div class="flex w-14 shrink-0 flex-col items-center gap-3"${ssrRenderAttr_1("title", `${point.label}: ${vueExports.unref(formatCount)(point.completed)} завершено, ${vueExports.unref(formatCount)(point.cancelled)} отказов`)}${_scopeId2}><div class="flex h-full w-full items-end justify-center gap-1.5 rounded-[1.5rem] px-1"${_scopeId2}><div class="w-4 rounded-t-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.35)] transition-all" style="${ssrRenderStyle_1({ height: `${point.completedHeight}%` })}"${_scopeId2}></div><div class="w-4 rounded-t-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.28)] transition-all" style="${ssrRenderStyle_1({ height: `${point.cancelledHeight}%` })}"${_scopeId2}></div></div><div class="space-y-1 text-center"${_scopeId2}><p class="text-[11px] font-medium text-sand-50"${_scopeId2}>${ssrInterpolate_1(point.label)}</p><p class="text-[10px] text-sand-200/60"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(point.completed))} / ${ssrInterpolate_1(vueExports.unref(formatCount)(point.cancelled))}</p></div></div>`);
                      });
                      _push3(`<!--]--></div></div></div></div></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "За выбранный диапазон нет записей для построения графика завершений и отказов.",
                        icon: "i-lucide-chart-no-axes-combined",
                        title: "Нет данных по периоду"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(timelineRows).length && vueExports.unref(filteredHistory).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "overflow-x-auto pb-2"
                      }, [
                        vueExports.createVNode("div", { class: "min-w-[64rem] rounded-[2rem] bg-charcoal-950 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.24)] sm:p-6" }, [
                          vueExports.createVNode("div", { class: "grid grid-cols-[3.75rem_minmax(0,1fr)] gap-4" }, [
                            vueExports.createVNode("div", { class: "flex h-[24rem] flex-col justify-between pb-12 text-right text-xs font-medium text-sand-200/70" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineAxisTicks), (tick) => {
                                return vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: `tick-${tick.value}`
                                }, vueExports.toDisplayString(tick.label), 1);
                              }), 128))
                            ]),
                            vueExports.createVNode("div", { class: "relative" }, [
                              vueExports.createVNode("div", { class: "pointer-events-none absolute inset-0 flex h-[24rem] flex-col justify-between pb-12" }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineAxisTicks), (tick) => {
                                  return vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: `grid-${tick.value}`,
                                    class: "border-t border-dashed border-white/10"
                                  });
                                }), 128))
                              ]),
                              vueExports.createVNode("div", { class: "relative flex h-[24rem] min-w-max items-end gap-3 pb-12" }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineRows), (point) => {
                                  return vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: point.dateKey,
                                    class: "flex w-14 shrink-0 flex-col items-center gap-3",
                                    title: `${point.label}: ${vueExports.unref(formatCount)(point.completed)} завершено, ${vueExports.unref(formatCount)(point.cancelled)} отказов`
                                  }, [
                                    vueExports.createVNode("div", { class: "flex h-full w-full items-end justify-center gap-1.5 rounded-[1.5rem] px-1" }, [
                                      vueExports.createVNode("div", {
                                        class: "w-4 rounded-t-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.35)] transition-all",
                                        style: { height: `${point.completedHeight}%` }
                                      }, null, 4),
                                      vueExports.createVNode("div", {
                                        class: "w-4 rounded-t-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.28)] transition-all",
                                        style: { height: `${point.cancelledHeight}%` }
                                      }, null, 4)
                                    ]),
                                    vueExports.createVNode("div", { class: "space-y-1 text-center" }, [
                                      vueExports.createVNode("p", { class: "text-[11px] font-medium text-sand-50" }, vueExports.toDisplayString(point.label), 1),
                                      vueExports.createVNode("p", { class: "text-[10px] text-sand-200/60" }, vueExports.toDisplayString(vueExports.unref(formatCount)(point.completed)) + " / " + vueExports.toDisplayString(vueExports.unref(formatCount)(point.cancelled)), 1)
                                    ])
                                  ], 8, ["title"]);
                                }), 128))
                              ])
                            ])
                          ])
                        ])
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "За выбранный диапазон нет записей для построения графика завершений и отказов.",
                        icon: "i-lucide-chart-no-axes-combined",
                        title: "Нет данных по периоду"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="grid gap-6 2xl:grid-cols-2"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Разбивка </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> По филиалам </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По филиалам ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(branchBreakdown).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(branchBreakdown), (row) => {
                        _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-start justify-between gap-4"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs uppercase tracking-[0.16em] text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} записей · ${ssrInterpolate_1(vueExports.unref(formatCount)(row.uniqueClients))} клиентов </p></div><div class="space-y-1 text-right"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p><p class="text-xs text-charcoal-500"${_scopeId2}> Completion ${ssrInterpolate_1(vueExports.unref(formatPercent)(row.completionRate))}</p></div></div><div class="mt-3 h-2 rounded-full bg-sand-100"${_scopeId2}><div class="h-full rounded-full bg-brass-400" style="${ssrRenderStyle_1({ width: `${row.completionRate}%` })}"${_scopeId2}></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Нет записей для группировки по филиалам.",
                        icon: "i-lucide-map",
                        title: "Разбивка пуста"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(branchBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(branchBreakdown), (row) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.uniqueClients)) + " клиентов ", 1)
                              ]),
                              vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Completion " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.completionRate)), 1)
                              ])
                            ]),
                            vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                              vueExports.createVNode("div", {
                                class: "h-full rounded-full bg-brass-400",
                                style: { width: `${row.completionRate}%` }
                              }, null, 4)
                            ])
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Нет записей для группировки по филиалам.",
                        icon: "i-lucide-map",
                        title: "Разбивка пуста"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Разбивка </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> По барберам </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По барберам ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(barberBreakdown).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(barberBreakdown), (row) => {
                        _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-start justify-between gap-4"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs uppercase tracking-[0.16em] text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} записей · ${ssrInterpolate_1(vueExports.unref(formatCount)(row.uniqueClients))} клиентов </p></div><div class="space-y-1 text-right"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p><p class="text-xs text-charcoal-500"${_scopeId2}> Completion ${ssrInterpolate_1(vueExports.unref(formatPercent)(row.completionRate))}</p></div></div><div class="mt-3 h-2 rounded-full bg-sand-100"${_scopeId2}><div class="h-full rounded-full bg-charcoal-700" style="${ssrRenderStyle_1({ width: `${row.completionRate}%` })}"${_scopeId2}></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Нет записей для группировки по барберам.",
                        icon: "i-lucide-scissors",
                        title: "Разбивка пуста"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(barberBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(barberBreakdown), (row) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.uniqueClients)) + " клиентов ", 1)
                              ]),
                              vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Completion " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.completionRate)), 1)
                              ])
                            ]),
                            vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                              vueExports.createVNode("div", {
                                class: "h-full rounded-full bg-charcoal-700",
                                style: { width: `${row.completionRate}%` }
                              }, null, 4)
                            ])
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Нет записей для группировки по барберам.",
                        icon: "i-lucide-scissors",
                        title: "Разбивка пуста"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Разбивка </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> По услугам </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По услугам ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(serviceBreakdown).length) {
                      _push3(`<div class="max-h-[34rem] space-y-3 overflow-auto pr-1"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(serviceBreakdown), (row) => {
                        _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-start justify-between gap-4"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs uppercase tracking-[0.16em] text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(row.category)} · ${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} использований </p></div><div class="space-y-1 text-right"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p><p class="text-xs text-charcoal-500"${_scopeId2}> Средняя цена ${ssrInterpolate_1(vueExports.unref(formatMoney)(row.avgPrice))}</p></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "В истории нет услуг для разбивки.",
                        icon: "i-lucide-badge-dollar-sign",
                        title: "Разбивка пуста"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(serviceBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "max-h-[34rem] space-y-3 overflow-auto pr-1"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(serviceBreakdown), (row) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(row.category) + " · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " использований ", 1)
                              ]),
                              vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Средняя цена " + vueExports.toDisplayString(vueExports.unref(formatMoney)(row.avgPrice)), 1)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "В истории нет услуг для разбивки.",
                        icon: "i-lucide-badge-dollar-sign",
                        title: "Разбивка пуста"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Разбивка </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> По способам оплаты </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По способам оплаты ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(paymentBreakdown).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(paymentBreakdown), (row) => {
                        _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-start justify-between gap-4"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs uppercase tracking-[0.16em] text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} записей · ${ssrInterpolate_1(vueExports.unref(formatPercent)(row.percent))}</p></div><div class="text-right"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p></div></div></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Не найдено ни одного способа оплаты.",
                        icon: "i-lucide-credit-card",
                        title: "Разбивка пуста"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(paymentBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(paymentBreakdown), (row) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.key,
                            class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.percent)), 1)
                              ]),
                              vueExports.createVNode("div", { class: "text-right" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Не найдено ни одного способа оплаты.",
                        icon: "i-lucide-credit-card",
                        title: "Разбивка пуста"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="grid gap-6 xl:grid-cols-3"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Top-лист </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Лучшие филиалы </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Лучшие филиалы ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(topBranches).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(topBranches), (row, index) => {
                        _push3(`<div class="flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}><div class="flex size-9 items-center justify-center rounded-2xl bg-brass-100 font-semibold text-brass-800"${_scopeId2}>${ssrInterpolate_1(index + 1)}</div><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} записей </p></div></div><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Нет филиалов для ранжирования.",
                        icon: "i-lucide-trophy",
                        title: "Top-лист пуст"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(topBranches).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topBranches), (row, index) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                              vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-brass-100 font-semibold text-brass-800" }, vueExports.toDisplayString(index + 1), 1),
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей ", 1)
                              ])
                            ]),
                            vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Нет филиалов для ранжирования.",
                        icon: "i-lucide-trophy",
                        title: "Top-лист пуст"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Top-лист </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Лучшие барберы </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Лучшие барберы ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(topBarbers).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(topBarbers), (row, index) => {
                        _push3(`<div class="flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}><div class="flex size-9 items-center justify-center rounded-2xl bg-sand-100 font-semibold text-charcoal-900"${_scopeId2}>${ssrInterpolate_1(index + 1)}</div><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} записей </p></div></div><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Нет барберов для ранжирования.",
                        icon: "i-lucide-award",
                        title: "Top-лист пуст"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(topBarbers).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topBarbers), (row, index) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                              vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-sand-100 font-semibold text-charcoal-900" }, vueExports.toDisplayString(index + 1), 1),
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей ", 1)
                              ])
                            ]),
                            vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Нет барберов для ранжирования.",
                        icon: "i-lucide-award",
                        title: "Top-лист пуст"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Top-лист </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Частые услуги </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Частые услуги ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (vueExports.unref(topServices).length) {
                      _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(topServices), (row, index) => {
                        _push3(`<div class="flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}><div class="flex size-9 items-center justify-center rounded-2xl bg-charcoal-100 font-semibold text-charcoal-900"${_scopeId2}>${ssrInterpolate_1(index + 1)}</div><div class="space-y-1"${_scopeId2}><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.label)}</p><p class="text-xs text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(row.category)} · ${ssrInterpolate_1(vueExports.unref(formatCount)(row.count))} раз </p></div></div><p class="font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.revenue))}</p></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                        description: "Нет услуг для ранжирования.",
                        icon: "i-lucide-list-ordered",
                        title: "Top-лист пуст"
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      vueExports.unref(topServices).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "space-y-3"
                      }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topServices), (row, index) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key: row.id,
                            class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                              vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-charcoal-100 font-semibold text-charcoal-900" }, vueExports.toDisplayString(index + 1), 1),
                              vueExports.createVNode("div", { class: "space-y-1" }, [
                                vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.category) + " · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " раз ", 1)
                              ])
                            ]),
                            vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                          ]);
                        }), 128))
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "Нет услуг для ранжирования.",
                        icon: "i-lucide-list-ordered",
                        title: "Top-лист пуст"
                      }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  header: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Настройка среза "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Бизнес-аналитика по истории записей "),
                        vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Выручка и средний чек считаются по прайсу услуг в завершённых записях, так как backend не отдаёт отдельное поле revenue. ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatScopeLabel)(vueExports.unref(scope))), 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          variant: "outline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(scopeContextLabel)), 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          variant: "outline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(filteredHistory).length)) + " записей ", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-[0.26fr_0.26fr_0.18fr_0.3fr]" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Дата начала" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.start,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.start = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Дата окончания" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(uiStore).statisticsRange.end,
                            "onUpdate:modelValue": ($event) => vueExports.unref(uiStore).statisticsRange.end = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Область" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(scope),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(scope) ? scope.value = $event : null,
                            items: [
                              { label: "Общая", value: "global" },
                              { label: "Филиал", value: "branch" },
                              { label: "Барбер", value: "barber" }
                            ],
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.unref(scope) === "barber" ? (vueExports.openBlock(), vueExports.createBlock(_component_UFormField, {
                        key: 0,
                        label: "Барбер"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(selectedBarberId),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(selectedBarberId) ? selectedBarberId.value = $event : null,
                            items: vueExports.unref(barberOptions),
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })) : vueExports.createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                }),
                vueExports.unref(needsBranchSelection) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                  key: 0,
                  description: "Для режима филиала выберите branch через BranchSelector в левой панели.",
                  icon: "i-lucide-map-pinned",
                  title: "Филиал не выбран"
                })) : vueExports.unref(needsBarberSelection) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                  key: 1,
                  description: "Не найдено ни одного барбера для построения персональной статистики.",
                  icon: "i-lucide-user-round-search",
                  title: "Барбер не выбран"
                })) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 2 }, [
                  vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-4 md:grid-cols-2" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(primaryKpiCards), (card) => {
                      return vueExports.openBlock(), vueExports.createBlock(_component_DashboardMetricCard, {
                        key: card.label,
                        description: card.description,
                        icon: card.icon,
                        label: card.label,
                        value: card.value
                      }, null, 8, ["description", "icon", "label", "value"]);
                    }), 128))
                  ]),
                  vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-3 md:grid-cols-2" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(supportingKpiCards), (card) => {
                      return vueExports.openBlock(), vueExports.createBlock(_component_DashboardMetricCard, {
                        key: card.label,
                        description: card.description,
                        icon: card.icon,
                        label: card.label,
                        value: card.value
                      }, null, 8, ["description", "icon", "label", "value"]);
                    }), 128))
                  ]),
                  vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-4 md:grid-cols-2" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(operationsCards), (card) => {
                      return vueExports.openBlock(), vueExports.createBlock(_component_DashboardMetricCard, {
                        key: card.label,
                        description: card.description,
                        icon: card.icon,
                        label: card.label,
                        value: card.value
                      }, null, 8, ["description", "icon", "label", "value"]);
                    }), 128))
                  ]),
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between" }, [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Динамика "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Завершённые заказы и отказы по дням ")
                        ]),
                        vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-charcoal-500" }, [
                          vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                            vueExports.createVNode("span", { class: "size-3 rounded-full bg-emerald-400" }),
                            vueExports.createTextVNode(" Завершено ")
                          ]),
                          vueExports.createVNode("div", { class: "flex items-center gap-2" }, [
                            vueExports.createVNode("span", { class: "size-3 rounded-full bg-amber-400" }),
                            vueExports.createTextVNode(" Отказы ")
                          ]),
                          vueExports.createVNode(_component_UBadge, {
                            color: "neutral",
                            variant: "outline"
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(vueExports.unref(selectedPeriodDays))) + " дн. ", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.unref(timelineRows).length && vueExports.unref(filteredHistory).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "overflow-x-auto pb-2"
                      }, [
                        vueExports.createVNode("div", { class: "min-w-[64rem] rounded-[2rem] bg-charcoal-950 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.24)] sm:p-6" }, [
                          vueExports.createVNode("div", { class: "grid grid-cols-[3.75rem_minmax(0,1fr)] gap-4" }, [
                            vueExports.createVNode("div", { class: "flex h-[24rem] flex-col justify-between pb-12 text-right text-xs font-medium text-sand-200/70" }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineAxisTicks), (tick) => {
                                return vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: `tick-${tick.value}`
                                }, vueExports.toDisplayString(tick.label), 1);
                              }), 128))
                            ]),
                            vueExports.createVNode("div", { class: "relative" }, [
                              vueExports.createVNode("div", { class: "pointer-events-none absolute inset-0 flex h-[24rem] flex-col justify-between pb-12" }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineAxisTicks), (tick) => {
                                  return vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: `grid-${tick.value}`,
                                    class: "border-t border-dashed border-white/10"
                                  });
                                }), 128))
                              ]),
                              vueExports.createVNode("div", { class: "relative flex h-[24rem] min-w-max items-end gap-3 pb-12" }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(timelineRows), (point) => {
                                  return vueExports.openBlock(), vueExports.createBlock("div", {
                                    key: point.dateKey,
                                    class: "flex w-14 shrink-0 flex-col items-center gap-3",
                                    title: `${point.label}: ${vueExports.unref(formatCount)(point.completed)} завершено, ${vueExports.unref(formatCount)(point.cancelled)} отказов`
                                  }, [
                                    vueExports.createVNode("div", { class: "flex h-full w-full items-end justify-center gap-1.5 rounded-[1.5rem] px-1" }, [
                                      vueExports.createVNode("div", {
                                        class: "w-4 rounded-t-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.35)] transition-all",
                                        style: { height: `${point.completedHeight}%` }
                                      }, null, 4),
                                      vueExports.createVNode("div", {
                                        class: "w-4 rounded-t-full bg-amber-400 shadow-[0_0_18px_rgba(251,191,36,0.28)] transition-all",
                                        style: { height: `${point.cancelledHeight}%` }
                                      }, null, 4)
                                    ]),
                                    vueExports.createVNode("div", { class: "space-y-1 text-center" }, [
                                      vueExports.createVNode("p", { class: "text-[11px] font-medium text-sand-50" }, vueExports.toDisplayString(point.label), 1),
                                      vueExports.createVNode("p", { class: "text-[10px] text-sand-200/60" }, vueExports.toDisplayString(vueExports.unref(formatCount)(point.completed)) + " / " + vueExports.toDisplayString(vueExports.unref(formatCount)(point.cancelled)), 1)
                                    ])
                                  ], 8, ["title"]);
                                }), 128))
                              ])
                            ])
                          ])
                        ])
                      ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                        key: 1,
                        description: "За выбранный диапазон нет записей для построения графика завершений и отказов.",
                        icon: "i-lucide-chart-no-axes-combined",
                        title: "Нет данных по периоду"
                      }))
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode("div", { class: "grid gap-6 2xl:grid-cols-2" }, [
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По филиалам ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(branchBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(branchBreakdown), (row) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.uniqueClients)) + " клиентов ", 1)
                                ]),
                                vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Completion " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.completionRate)), 1)
                                ])
                              ]),
                              vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                                vueExports.createVNode("div", {
                                  class: "h-full rounded-full bg-brass-400",
                                  style: { width: `${row.completionRate}%` }
                                }, null, 4)
                              ])
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Нет записей для группировки по филиалам.",
                          icon: "i-lucide-map",
                          title: "Разбивка пуста"
                        }))
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По барберам ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(barberBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(barberBreakdown), (row) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.uniqueClients)) + " клиентов ", 1)
                                ]),
                                vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Completion " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.completionRate)), 1)
                                ])
                              ]),
                              vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                                vueExports.createVNode("div", {
                                  class: "h-full rounded-full bg-charcoal-700",
                                  style: { width: `${row.completionRate}%` }
                                }, null, 4)
                              ])
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Нет записей для группировки по барберам.",
                          icon: "i-lucide-scissors",
                          title: "Разбивка пуста"
                        }))
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По услугам ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(serviceBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "max-h-[34rem] space-y-3 overflow-auto pr-1"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(serviceBreakdown), (row) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(row.category) + " · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " использований ", 1)
                                ]),
                                vueExports.createVNode("div", { class: "space-y-1 text-right" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, " Средняя цена " + vueExports.toDisplayString(vueExports.unref(formatMoney)(row.avgPrice)), 1)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "В истории нет услуг для разбивки.",
                          icon: "i-lucide-badge-dollar-sign",
                          title: "Разбивка пуста"
                        }))
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Разбивка "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " По способам оплаты ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(paymentBreakdown).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(paymentBreakdown), (row) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.key,
                              class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-start justify-between gap-4" }, [
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.16em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей · " + vueExports.toDisplayString(vueExports.unref(formatPercent)(row.percent)), 1)
                                ]),
                                vueExports.createVNode("div", { class: "text-right" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                                ])
                              ])
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Не найдено ни одного способа оплаты.",
                          icon: "i-lucide-credit-card",
                          title: "Разбивка пуста"
                        }))
                      ]),
                      _: 1
                    })
                  ]),
                  vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-3" }, [
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Лучшие филиалы ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(topBranches).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topBranches), (row, index) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                                vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-brass-100 font-semibold text-brass-800" }, vueExports.toDisplayString(index + 1), 1),
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей ", 1)
                                ])
                              ]),
                              vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Нет филиалов для ранжирования.",
                          icon: "i-lucide-trophy",
                          title: "Top-лист пуст"
                        }))
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Лучшие барберы ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(topBarbers).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topBarbers), (row, index) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                                vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-sand-100 font-semibold text-charcoal-900" }, vueExports.toDisplayString(index + 1), 1),
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " записей ", 1)
                                ])
                              ]),
                              vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Нет барберов для ранжирования.",
                          icon: "i-lucide-award",
                          title: "Top-лист пуст"
                        }))
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Top-лист "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Частые услуги ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.unref(topServices).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(topServices), (row, index) => {
                            return vueExports.openBlock(), vueExports.createBlock("div", {
                              key: row.id,
                              class: "flex items-center justify-between gap-4 rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                            }, [
                              vueExports.createVNode("div", { class: "flex items-center gap-3" }, [
                                vueExports.createVNode("div", { class: "flex size-9 items-center justify-center rounded-2xl bg-charcoal-100 font-semibold text-charcoal-900" }, vueExports.toDisplayString(index + 1), 1),
                                vueExports.createVNode("div", { class: "space-y-1" }, [
                                  vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.label), 1),
                                  vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.category) + " · " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.count)) + " раз ", 1)
                                ])
                              ]),
                              vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.revenue)), 1)
                            ]);
                          }), 128))
                        ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                          key: 1,
                          description: "Нет услуг для ранжирования.",
                          icon: "i-lucide-list-ordered",
                          title: "Top-лист пуст"
                        }))
                      ]),
                      _: 1
                    })
                  ])
                ], 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/statistics.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/statistics-DNLCV3iA');
//# sourceMappingURL=statistics-DNLCV3iA.mjs.map
