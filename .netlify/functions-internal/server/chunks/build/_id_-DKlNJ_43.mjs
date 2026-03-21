globalThis.__timing__.logStart('Load chunks/build/_id_-DKlNJ_43');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$6 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { u as useRoute, a as useBarbersApi, b as useAsyncData, _ as _sfc_main$2$1, c as _sfc_main$3, d as _sfc_main$a, e as useApiClient } from './server.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as _sfc_main$1 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$4 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$5 } from './SelectMenu-9fuPONhl.mjs';
import { _ as __nuxt_component_10 } from './JsonBlock-DvPUbwNJ.mjs';
import { q as queueUpdateSchema, a as queueEditBeforeCompleteSchema } from '../_/index.mjs';
import { f as formatDateTime, a as formatMoney } from './format-DDcTL-sj.mjs';
import { f as formatPaymentMethod } from './display-CyQec-Wd.mjs';
import { f as flattenServicesPayload } from './services-D0S0WuHG.mjs';
import { u as useKioskApi } from './useKioskApi-l3XfHmhL.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';
import './Badge-CHxj5N7w.mjs';
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
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const barbersApi = useBarbersApi();
    const kioskApi = useKioskApi();
    const queueId = vueExports.computed(() => String(route.params.id));
    const updateForm = vueExports.reactive({
      payment_method: "",
      service_ids: [],
      status: ""
    });
    const overrideForm = vueExports.reactive({
      amount: 0,
      reason: ""
    });
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("barber-queue-detail", async () => {
      const [detail, services] = await Promise.all([
        barbersApi.queueItem(queueId.value, { silent: true }),
        kioskApi.services({ active: true, grouped: true })
      ]);
      return {
        detail,
        services
      };
    }, {
      watch: [queueId]
    })), __temp = await __temp, __restore(), __temp);
    const queueItem = vueExports.computed(() => data.value?.detail?.data || null);
    const queueStatusCode = vueExports.computed(() => data.value?.detail?.status || 200);
    const flatServices = vueExports.computed(() => flattenServicesPayload(data.value?.services));
    const serviceOptions = vueExports.computed(
      () => flatServices.value.map((service) => ({
        label: `${service.name || "Услуга без названия"}${service.category ? ` / ${service.category}` : ""}`,
        value: String(service.id)
      }))
    );
    vueExports.watch(
      queueItem,
      (item) => {
        updateForm.status = item?.status || "";
        updateForm.payment_method = item?.payment_method || "";
        updateForm.service_ids = Array.isArray(item?.service_ids) ? item.service_ids.map((value) => String(value)) : item?.service_id ? [String(item.service_id)] : [];
        overrideForm.amount = Number(item?.price_override ?? item?.amount ?? 0);
        overrideForm.reason = item?.price_override_reason || "";
      },
      { immediate: true }
    );
    async function submitUpdate() {
      const payload = queueUpdateSchema.safeParse({
        payment_method: updateForm.payment_method || void 0,
        service_ids: updateForm.service_ids.length ? updateForm.service_ids : void 0,
        status: updateForm.status || void 0
      });
      if (!payload.success) {
        useApiClient().notifyError(new Error(payload.error.issues[0]?.message || "Некорректное обновление очереди"));
        return;
      }
      await barbersApi.updateQueue(queueId.value, payload.data);
      await refresh();
    }
    async function saveOverride() {
      const payload = queueEditBeforeCompleteSchema.safeParse(overrideForm);
      if (!payload.success) {
        useApiClient().notifyError(new Error(payload.error.issues[0]?.message || "Некорректная корректировка перед завершением"));
        return;
      }
      await barbersApi.updateQueueBeforeComplete(queueId.value, payload.data);
      await refresh();
    }
    async function callEntry() {
      await barbersApi.callQueue(queueId.value);
      await refresh();
    }
    async function startEntry() {
      await barbersApi.startQueue(queueId.value);
      await refresh();
    }
    async function completeEntry() {
      await barbersApi.completeQueue(queueId.value);
      await refresh();
    }
    async function markNoShow() {
      await barbersApi.updateQueueNoShow(queueId.value, { no_show: true });
      await refresh();
    }
    async function markNotInTime() {
      await barbersApi.updateQueueNotInTime(queueId.value);
      await refresh();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$6;
      const _component_UButton = _sfc_main$a;
      const _component_UAlert = _sfc_main$2$1;
      const _component_UCard = _sfc_main$3;
      const _component_SharedStatusBadge = __nuxt_component_7;
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$4;
      const _component_USelectMenu = _sfc_main$5;
      const _component_SharedJsonBlock = __nuxt_component_10;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "queue-detail" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: vueExports.unref(queueItem)?.customer_name || `Запись очереди ${vueExports.unref(queueId)}`,
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
                    icon: "i-lucide-arrow-left",
                    to: "/barbers/workspace",
                    variant: "outline"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Назад `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Назад ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                      icon: "i-lucide-arrow-left",
                      to: "/barbers/workspace",
                      variant: "outline"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Назад ")
                      ]),
                      _: 1
                    }),
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
                title: vueExports.unref(queueItem)?.customer_name || `Запись очереди ${vueExports.unref(queueId)}`,
                ui: { right: "gap-3" }
              }, {
                leading: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UDashboardSidebarCollapse)
                ]),
                right: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-arrow-left",
                    to: "/barbers/workspace",
                    variant: "outline"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Назад ")
                    ]),
                    _: 1
                  }),
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
              }, 8, ["title"])
            ];
          }
        }),
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}>`);
            if (vueExports.unref(queueStatusCode) === 209) {
              _push2(ssrRenderComponent_1(_component_UAlert, {
                color: "warning",
                icon: "i-lucide-badge-alert",
                title: "Завершенная запись очереди",
                description: "Бэкенд вернул HTTP 209 для этой записи. Просмотр деталей остается доступным, но запись уже завершена.",
                variant: "soft"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Сводка по очереди </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Отслеживание текущего визита </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Сводка по очереди "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Отслеживание текущего визита ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(queueItem)) {
                    _push3(`<div class="grid gap-3 sm:grid-cols-2"${_scopeId2}><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Статус</p><div class="mt-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_SharedStatusBadge, {
                      label: vueExports.unref(queueItem).status
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Оплата</p><p class="mt-3 text-lg font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatPaymentMethod)(vueExports.unref(queueItem).payment_method))}</p></div><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Создано</p><p class="mt-3 text-lg font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatDateTime)(vueExports.unref(queueItem).created_at))}</p></div><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Сумма</p><p class="mt-3 text-lg font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(formatMoney)(vueExports.unref(queueItem).amount))}</p></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="mt-5 flex flex-wrap gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-phone-call",
                    variant: "outline",
                    onClick: callEntry
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Вызвать `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Вызвать ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-play",
                    variant: "outline",
                    onClick: startEntry
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Начать `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Начать ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-check-check",
                    onClick: completeEntry
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Завершить `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Завершить ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.unref(queueItem) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "grid gap-3 sm:grid-cols-2"
                    }, [
                      vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Статус"),
                        vueExports.createVNode("div", { class: "mt-3" }, [
                          vueExports.createVNode(_component_SharedStatusBadge, {
                            label: vueExports.unref(queueItem).status
                          }, null, 8, ["label"])
                        ])
                      ]),
                      vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Оплата"),
                        vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatPaymentMethod)(vueExports.unref(queueItem).payment_method)), 1)
                      ]),
                      vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Создано"),
                        vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatDateTime)(vueExports.unref(queueItem).created_at)), 1)
                      ]),
                      vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Сумма"),
                        vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(vueExports.unref(queueItem).amount)), 1)
                      ])
                    ])) : vueExports.createCommentVNode("", true),
                    vueExports.createVNode("div", { class: "mt-5 flex flex-wrap gap-3" }, [
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        icon: "i-lucide-phone-call",
                        variant: "outline",
                        onClick: callEntry
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Вызвать ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-play",
                        variant: "outline",
                        onClick: startEntry
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Начать ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-check-check",
                        onClick: completeEntry
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Завершить ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Обновление </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Изменение услуг и статуса </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Обновление "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Изменение услуг и статуса ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-5"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Статус" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(updateForm).status,
                          "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).status = $event,
                          placeholder: "ожидает, начато, завершено"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(updateForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).status = $event,
                            placeholder: "ожидает, начато, завершено"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Способ оплаты" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(updateForm).payment_method,
                          "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).payment_method = $event,
                          placeholder: "наличные, карта, сертификат"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(updateForm).payment_method,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).payment_method = $event,
                            placeholder: "наличные, карта, сертификат"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Услуги" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(updateForm).service_ids,
                          "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).service_ids = $event,
                          class: "w-full",
                          items: vueExports.unref(serviceOptions),
                          multiple: "",
                          placeholder: "Выберите одну или несколько услуг",
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(updateForm).service_ids,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).service_ids = $event,
                            class: "w-full",
                            items: vueExports.unref(serviceOptions),
                            multiple: "",
                            placeholder: "Выберите одну или несколько услуг",
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-save",
                    onClick: submitUpdate
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Сохранить изменения очереди `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Сохранить изменения очереди ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500"${_scopeId2}> Редактирование перед завершением </p><div class="mt-4 grid gap-4 sm:grid-cols-[0.45fr_0.55fr]"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Корректировка суммы" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(overrideForm).amount,
                          "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).amount = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(overrideForm).amount,
                            "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).amount = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Причина" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(overrideForm).reason,
                          "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).reason = $event,
                          placeholder: "Причина корректировки"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(overrideForm).reason,
                            "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).reason = $event,
                            placeholder: "Причина корректировки"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-pencil-line",
                    variant: "outline",
                    onClick: saveOverride
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Сохранить корректировку `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Сохранить корректировку ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-5" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(updateForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).status = $event,
                            placeholder: "ожидает, начато, завершено"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Способ оплаты" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(updateForm).payment_method,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).payment_method = $event,
                            placeholder: "наличные, карта, сертификат"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Услуги" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(updateForm).service_ids,
                            "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).service_ids = $event,
                            class: "w-full",
                            items: vueExports.unref(serviceOptions),
                            multiple: "",
                            placeholder: "Выберите одну или несколько услуг",
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "flex justify-end" }, [
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-save",
                          onClick: submitUpdate
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Сохранить изменения очереди ")
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode("div", { class: "rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500" }, " Редактирование перед завершением "),
                        vueExports.createVNode("div", { class: "mt-4 grid gap-4 sm:grid-cols-[0.45fr_0.55fr]" }, [
                          vueExports.createVNode(_component_UFormField, { label: "Корректировка суммы" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UInput, {
                                modelValue: vueExports.unref(overrideForm).amount,
                                "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).amount = $event,
                                type: "number"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          vueExports.createVNode(_component_UFormField, { label: "Причина" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UInput, {
                                modelValue: vueExports.unref(overrideForm).reason,
                                "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).reason = $event,
                                placeholder: "Причина корректировки"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        vueExports.createVNode("div", { class: "mt-4 flex justify-end" }, [
                          vueExports.createVNode(_component_UButton, {
                            color: "neutral",
                            icon: "i-lucide-pencil-line",
                            variant: "outline",
                            onClick: saveOverride
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Сохранить корректировку ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Флаги </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Нестандартные исходы </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Флаги "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Нестандартные исходы ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    block: "",
                    color: "warning",
                    icon: "i-lucide-user-round-x",
                    variant: "outline",
                    onClick: markNotInTime
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Отметить как не вовремя `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Отметить как не вовремя ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    block: "",
                    color: "error",
                    icon: "i-lucide-ban",
                    variant: "outline",
                    onClick: markNoShow
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Отметить как неявку `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Отметить как неявку ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-3" }, [
                      vueExports.createVNode(_component_UButton, {
                        block: "",
                        color: "warning",
                        icon: "i-lucide-user-round-x",
                        variant: "outline",
                        onClick: markNotInTime
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Отметить как не вовремя ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        block: "",
                        color: "error",
                        icon: "i-lucide-ban",
                        variant: "outline",
                        onClick: markNoShow
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Отметить как неявку ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_SharedJsonBlock, {
              label: "Сырые данные очереди",
              value: vueExports.unref(queueItem) || {}
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.unref(queueStatusCode) === 209 ? (vueExports.openBlock(), vueExports.createBlock(_component_UAlert, {
                  key: 0,
                  color: "warning",
                  icon: "i-lucide-badge-alert",
                  title: "Завершенная запись очереди",
                  description: "Бэкенд вернул HTTP 209 для этой записи. Просмотр деталей остается доступным, но запись уже завершена.",
                  variant: "soft"
                })) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]" }, [
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Сводка по очереди "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Отслеживание текущего визита ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.unref(queueItem) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                        key: 0,
                        class: "grid gap-3 sm:grid-cols-2"
                      }, [
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Статус"),
                          vueExports.createVNode("div", { class: "mt-3" }, [
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: vueExports.unref(queueItem).status
                            }, null, 8, ["label"])
                          ])
                        ]),
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Оплата"),
                          vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatPaymentMethod)(vueExports.unref(queueItem).payment_method)), 1)
                        ]),
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Создано"),
                          vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatDateTime)(vueExports.unref(queueItem).created_at)), 1)
                        ]),
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Сумма"),
                          vueExports.createVNode("p", { class: "mt-3 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(vueExports.unref(queueItem).amount)), 1)
                        ])
                      ])) : vueExports.createCommentVNode("", true),
                      vueExports.createVNode("div", { class: "mt-5 flex flex-wrap gap-3" }, [
                        vueExports.createVNode(_component_UButton, {
                          color: "neutral",
                          icon: "i-lucide-phone-call",
                          variant: "outline",
                          onClick: callEntry
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Вызвать ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-play",
                          variant: "outline",
                          onClick: startEntry
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Начать ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-check-check",
                          onClick: completeEntry
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Завершить ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Обновление "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Изменение услуг и статуса ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-5" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(updateForm).status,
                              "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).status = $event,
                              placeholder: "ожидает, начато, завершено"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Способ оплаты" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(updateForm).payment_method,
                              "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).payment_method = $event,
                              placeholder: "наличные, карта, сертификат"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Услуги" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(updateForm).service_ids,
                              "onUpdate:modelValue": ($event) => vueExports.unref(updateForm).service_ids = $event,
                              class: "w-full",
                              items: vueExports.unref(serviceOptions),
                              multiple: "",
                              placeholder: "Выберите одну или несколько услуг",
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode("div", { class: "flex justify-end" }, [
                          vueExports.createVNode(_component_UButton, {
                            color: "primary",
                            icon: "i-lucide-save",
                            onClick: submitUpdate
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Сохранить изменения очереди ")
                            ]),
                            _: 1
                          })
                        ]),
                        vueExports.createVNode("div", { class: "rounded-[1.5rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.2em] text-charcoal-500" }, " Редактирование перед завершением "),
                          vueExports.createVNode("div", { class: "mt-4 grid gap-4 sm:grid-cols-[0.45fr_0.55fr]" }, [
                            vueExports.createVNode(_component_UFormField, { label: "Корректировка суммы" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UInput, {
                                  modelValue: vueExports.unref(overrideForm).amount,
                                  "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).amount = $event,
                                  type: "number"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            vueExports.createVNode(_component_UFormField, { label: "Причина" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UInput, {
                                  modelValue: vueExports.unref(overrideForm).reason,
                                  "onUpdate:modelValue": ($event) => vueExports.unref(overrideForm).reason = $event,
                                  placeholder: "Причина корректировки"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          vueExports.createVNode("div", { class: "mt-4 flex justify-end" }, [
                            vueExports.createVNode(_component_UButton, {
                              color: "neutral",
                              icon: "i-lucide-pencil-line",
                              variant: "outline",
                              onClick: saveOverride
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(" Сохранить корректировку ")
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-[0.7fr_1.3fr]" }, [
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Флаги "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Нестандартные исходы ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-3" }, [
                        vueExports.createVNode(_component_UButton, {
                          block: "",
                          color: "warning",
                          icon: "i-lucide-user-round-x",
                          variant: "outline",
                          onClick: markNotInTime
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Отметить как не вовремя ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          block: "",
                          color: "error",
                          icon: "i-lucide-ban",
                          variant: "outline",
                          onClick: markNoShow
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Отметить как неявку ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode(_component_SharedJsonBlock, {
                    label: "Сырые данные очереди",
                    value: vueExports.unref(queueItem) || {}
                  }, null, 8, ["value"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/barbers/queue/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_id_-DKlNJ_43');
//# sourceMappingURL=_id_-DKlNJ_43.mjs.map
