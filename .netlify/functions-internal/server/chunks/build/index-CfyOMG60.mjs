globalThis.__timing__.logStart('Load chunks/build/index-CfyOMG60');import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$5 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { _ as _sfc_main$4 } from './Badge-CHxj5N7w.mjs';
import { f as useSessionStore, g as useUiStore, a as useBarbersApi, b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a } from './server.mjs';
import { _ as __nuxt_component_5 } from './MetricCard-CDSLylAv.mjs';
import { b as formatCount } from './format-DDcTL-sj.mjs';
import { u as useStatisticsApi, p as pickValue, t as toKeyLabel, a as asNumber } from './useStatisticsApi-D5PxREFa.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { u as usePromoApi } from './usePromoApi-DE1sz-6g.mjs';
import { u as useRealtimeQueue } from './useRealtimeQueue-CK9yRiyf.mjs';
import { v as vueExports, s as ssrRenderComponent_1, d as ssrRenderList_1, c as ssrInterpolate_1, g as ssrRenderStyle_1 } from '../routes/renderer.mjs';
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
import '../_/index.mjs';
import './useKioskApi-l3XfHmhL.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const branchStore = useBranchStore();
    const sessionStore = useSessionStore();
    const uiStore = useUiStore();
    const barbersApi = useBarbersApi();
    const promoApi = usePromoApi();
    const statisticsApi = useStatisticsApi();
    useRealtimeQueue();
    [__temp, __restore] = vueExports.withAsyncContext(() => Promise.all([
      branchStore.ensureLoaded(),
      sessionStore.ensureLoaded()
    ])), await __temp, __restore();
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("overview-dashboard", async () => {
      const [health, queue, promoDashboard, statistics] = await Promise.all([
        $fetch("/api/health"),
        sessionStore.barber?.id ? barbersApi.queue() : Promise.resolve({ count: 0, items: [] }),
        promoApi.dashboard(),
        statisticsApi.global({
          end_date: uiStore.statisticsRange.end,
          start_date: uiStore.statisticsRange.start
        })
      ]);
      return {
        health,
        promoDashboard,
        queue,
        statistics
      };
    }, {
      watch: [() => uiStore.statisticsRange.end, () => uiStore.statisticsRange.start]
    })), __temp = await __temp, __restore(), __temp);
    const promoItems = vueExports.computed(() => {
      const dashboard = data.value?.promoDashboard;
      if (Array.isArray(dashboard)) {
        return dashboard;
      }
      if (Array.isArray(dashboard?.items)) {
        return dashboard.items;
      }
      return [];
    });
    vueExports.computed(
      () => branchStore.branches.map((branch) => ({
        id: branch.id,
        isActive: branch.id === branchStore.activeBranchId,
        name: branch.name
      }))
    );
    const statisticsHighlights = vueExports.computed(() => {
      const payload = data.value?.statistics || {};
      const desired = [
        pickValue(payload, ["revenue", "total_revenue", "amount", "total_amount"], "0"),
        pickValue(payload, ["orders", "queue_count", "total_clients", "count"], "0"),
        pickValue(payload, ["completed", "completed_orders", "done"], "0")
      ];
      return [
        {
          description: "Итог по всей системе за выбранный период",
          icon: "i-lucide-wallet",
          label: "Выручка",
          value: desired[0] ?? "0"
        },
        {
          description: "Объем очереди по данным аналитики",
          icon: "i-lucide-users-round",
          label: "Заказы",
          value: desired[1] ?? "0"
        },
        {
          description: "Количество завершенных записей в аналитике",
          icon: "i-lucide-check-check",
          label: "Завершено",
          value: desired[2] ?? "0"
        }
      ];
    });
    const statRows = vueExports.computed(
      () => Object.entries(data.value?.statistics || {}).filter(([, value]) => ["number", "string"].includes(typeof value)).slice(0, 8)
    );
    vueExports.computed(
      () => [
        // sessionStore.barber?.id
        //   ? { description: 'Управление очередью и перерывами барбера', icon: 'i-lucide-scissors-line-dashed', title: 'Рабочее место', to: '/barbers/workspace' }
        //   : null,
        { description: "Создание записей через киоск и проверка сценариев филиала", icon: "i-lucide-monitor-smartphone", title: "Киоск", to: "/kiosk" },
        { description: "Управление сгруппированным каталогом услуг", icon: "i-lucide-badge-dollar-sign", title: "Услуги", to: "/services" },
        { description: "Просмотр всех запросов и ответов через Nuxt", icon: "i-lucide-code-xml", title: "Отладка API", to: "/api-debug" }
      ].filter((shortcut) => Boolean(shortcut))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$5;
      const _component_UBadge = _sfc_main$4;
      const _component_UButton = _sfc_main$a;
      const _component_DashboardMetricCard = __nuxt_component_5;
      const _component_UCard = _sfc_main$3;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "overview" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Обзор",
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
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: vueExports.unref(data)?.health ? "primary" : "neutral",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(data)?.health ? "API доступен" : "Проверка API")}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(data)?.health ? "API доступен" : "Проверка API"), 1)
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
                    vueExports.createVNode(_component_UBadge, {
                      color: vueExports.unref(data)?.health ? "primary" : "neutral",
                      variant: "soft"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(data)?.health ? "API доступен" : "Проверка API"), 1)
                      ]),
                      _: 1
                    }, 8, ["color"]),
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
                title: "Обзор",
                ui: { right: "gap-3" }
              }, {
                leading: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UDashboardSidebarCollapse)
                ]),
                right: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UBadge, {
                    color: vueExports.unref(data)?.health ? "primary" : "neutral",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(data)?.health ? "API доступен" : "Проверка API"), 1)
                    ]),
                    _: 1
                  }, 8, ["color"]),
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
            _push2(`<div class="space-y-6"${_scopeId}><div class="grid gap-4 xl:grid-cols-4 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
              description: "Текущие записи очереди, назначенные авторизованному барберу.",
              icon: "i-lucide-clock-3",
              label: "Активная очередь",
              value: vueExports.unref(formatCount)(vueExports.unref(data)?.queue?.count)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
              description: "Филиалы, загруженные из конфигурации киоска.",
              icon: "i-lucide-map",
              label: "Филиалы",
              value: vueExports.unref(formatCount)(vueExports.unref(branchStore).branches.length)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
              description: "Промокоды, полученные с панели управления.",
              icon: "i-lucide-ticket-percent",
              label: "Промокоды",
              value: vueExports.unref(formatCount)(vueExports.unref(promoItems).length)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_DashboardMetricCard, {
              description: "Состояние основного health-эндпоинта.",
              icon: "i-lucide-heart-pulse",
              label: "Состояние",
              value: vueExports.unref(data)?.health ? "OK" : "В ожидании"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid gap-6 xl:grid-cols-[1]"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Пульс салона </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Быстрая операционная сводка </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Пульс салона "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Быстрая операционная сводка ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-3"${_scopeId2}><!--[-->`);
                  ssrRenderList_1(vueExports.unref(statisticsHighlights), (card) => {
                    _push3(ssrRenderComponent_1(_component_DashboardMetricCard, {
                      key: card.label,
                      description: card.description,
                      icon: card.icon,
                      label: card.label,
                      value: card.value
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div><div class="mt-6 grid gap-3"${_scopeId2}><!--[-->`);
                  ssrRenderList_1(vueExports.unref(statRows), ([key, value]) => {
                    _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"${_scopeId2}><div class="flex items-center justify-between gap-4"${_scopeId2}><span class="text-sm font-medium text-charcoal-700"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(toKeyLabel)(key))}</span><span class="text-sm font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(value)}</span></div><div class="mt-3 h-2 rounded-full bg-sand-100"${_scopeId2}><div class="h-full rounded-full bg-brass-400" style="${ssrRenderStyle_1({ width: `${Math.min(vueExports.unref(asNumber)(value, 0), 100)}%` })}"${_scopeId2}></div></div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(statisticsHighlights), (card) => {
                        return vueExports.openBlock(), vueExports.createBlock(_component_DashboardMetricCard, {
                          key: card.label,
                          description: card.description,
                          icon: card.icon,
                          label: card.label,
                          value: card.value
                        }, null, 8, ["description", "icon", "label", "value"]);
                      }), 128))
                    ]),
                    vueExports.createVNode("div", { class: "mt-6 grid gap-3" }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(statRows), ([key, value]) => {
                        return vueExports.openBlock(), vueExports.createBlock("div", {
                          key,
                          class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                        }, [
                          vueExports.createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                            vueExports.createVNode("span", { class: "text-sm font-medium text-charcoal-700" }, vueExports.toDisplayString(vueExports.unref(toKeyLabel)(key)), 1),
                            vueExports.createVNode("span", { class: "text-sm font-semibold text-charcoal-950" }, vueExports.toDisplayString(value), 1)
                          ]),
                          vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                            vueExports.createVNode("div", {
                              class: "h-full rounded-full bg-brass-400",
                              style: { width: `${Math.min(vueExports.unref(asNumber)(value, 0), 100)}%` }
                            }, null, 4)
                          ])
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-6"${_scopeId}></div></div></div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.createVNode("div", { class: "grid gap-4 xl:grid-cols-4 md:grid-cols-2" }, [
                  vueExports.createVNode(_component_DashboardMetricCard, {
                    description: "Текущие записи очереди, назначенные авторизованному барберу.",
                    icon: "i-lucide-clock-3",
                    label: "Активная очередь",
                    value: vueExports.unref(formatCount)(vueExports.unref(data)?.queue?.count)
                  }, null, 8, ["value"]),
                  vueExports.createVNode(_component_DashboardMetricCard, {
                    description: "Филиалы, загруженные из конфигурации киоска.",
                    icon: "i-lucide-map",
                    label: "Филиалы",
                    value: vueExports.unref(formatCount)(vueExports.unref(branchStore).branches.length)
                  }, null, 8, ["value"]),
                  vueExports.createVNode(_component_DashboardMetricCard, {
                    description: "Промокоды, полученные с панели управления.",
                    icon: "i-lucide-ticket-percent",
                    label: "Промокоды",
                    value: vueExports.unref(formatCount)(vueExports.unref(promoItems).length)
                  }, null, 8, ["value"]),
                  vueExports.createVNode(_component_DashboardMetricCard, {
                    description: "Состояние основного health-эндпоинта.",
                    icon: "i-lucide-heart-pulse",
                    label: "Состояние",
                    value: vueExports.unref(data)?.health ? "OK" : "В ожидании"
                  }, null, 8, ["value"])
                ]),
                vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-[1]" }, [
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Пульс салона "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Быстрая операционная сводка ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "grid gap-4 md:grid-cols-3" }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(statisticsHighlights), (card) => {
                          return vueExports.openBlock(), vueExports.createBlock(_component_DashboardMetricCard, {
                            key: card.label,
                            description: card.description,
                            icon: card.icon,
                            label: card.label,
                            value: card.value
                          }, null, 8, ["description", "icon", "label", "value"]);
                        }), 128))
                      ]),
                      vueExports.createVNode("div", { class: "mt-6 grid gap-3" }, [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(statRows), ([key, value]) => {
                          return vueExports.openBlock(), vueExports.createBlock("div", {
                            key,
                            class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 px-4 py-3"
                          }, [
                            vueExports.createVNode("div", { class: "flex items-center justify-between gap-4" }, [
                              vueExports.createVNode("span", { class: "text-sm font-medium text-charcoal-700" }, vueExports.toDisplayString(vueExports.unref(toKeyLabel)(key)), 1),
                              vueExports.createVNode("span", { class: "text-sm font-semibold text-charcoal-950" }, vueExports.toDisplayString(value), 1)
                            ]),
                            vueExports.createVNode("div", { class: "mt-3 h-2 rounded-full bg-sand-100" }, [
                              vueExports.createVNode("div", {
                                class: "h-full rounded-full bg-brass-400",
                                style: { width: `${Math.min(vueExports.unref(asNumber)(value, 0), 100)}%` }
                              }, null, 4)
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode("div", { class: "space-y-6" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-CfyOMG60');
//# sourceMappingURL=index-CfyOMG60.mjs.map
