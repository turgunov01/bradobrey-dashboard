globalThis.__timing__.logStart('Load chunks/build/index-bxxO4lWv');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$6 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$5 } from './Badge-CHxj5N7w.mjs';
import { _ as _sfc_main$1 } from './Table-uigNOx9c.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as _sfc_main$4 } from './Pagination-t5D_AaGq.mjs';
import { f as formatDateTime, a as formatMoney } from './format-DDcTL-sj.mjs';
import { f as formatPaymentMethod } from './display-CyQec-Wd.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { u as useHistoryApi } from './useHistoryApi-XZUYGosn.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';
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
import '../_/index2.mjs';
import '../_/index.mjs';
import './useKioskApi-l3XfHmhL.mjs';
import 'node:stream';

const itemsPerPage = 10;
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "index",
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
    const branchStore = useBranchStore();
    const historyApi = useHistoryApi();
    const page = vueExports.ref(1);
    [__temp, __restore] = vueExports.withAsyncContext(() => branchStore.ensureLoaded()), await __temp, __restore();
    const columns = [
      { accessorKey: "phone_number", header: "КЛИЕНТ" },
      { accessorKey: "status", header: "СТАТУС" },
      { accessorKey: "payment_method", header: "ОПЛАТА" },
      { accessorKey: "amount", header: "СУММА" },
      { accessorKey: "created_at", header: "СОЗДАНО" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("history-current-filter", async () => {
      if (!branchStore.activeBranchId) {
        return [];
      }
      const response = await historyApi.branch(branchStore.activeBranchId);
      return extractHistoryItems(response);
    }, {
      watch: [() => branchStore.activeBranchId]
    })), __temp = await __temp, __restore(), __temp);
    const historyItems = vueExports.computed(() => data.value || []);
    const paginatedHistory = vueExports.computed(() => {
      const start = (page.value - 1) * itemsPerPage;
      return historyItems.value.slice(start, start + itemsPerPage);
    });
    const pageFrom = vueExports.computed(
      () => historyItems.value.length ? (page.value - 1) * itemsPerPage + 1 : 0
    );
    const pageTo = vueExports.computed(
      () => historyItems.value.length ? Math.min(page.value * itemsPerPage, historyItems.value.length) : 0
    );
    vueExports.watch(
      () => branchStore.activeBranchId,
      () => {
        page.value = 1;
      }
    );
    vueExports.watch(
      () => historyItems.value.length,
      (length) => {
        const maxPage = Math.max(1, Math.ceil(length / itemsPerPage));
        if (page.value > maxPage) {
          page.value = maxPage;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$6;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_UBadge = _sfc_main$5;
      const _component_UTable = _sfc_main$1;
      const _component_SharedStatusBadge = __nuxt_component_7;
      const _component_UPagination = _sfc_main$4;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "history-global" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "История",
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
                title: "История",
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
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> История </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> История филиала </h2><p class="text-sm text-charcoal-500"${_scopeId2}> Таблица показывает записи для филиала, выбранного в BranchSelector. </p></div><div class="flex flex-wrap items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    size: "lg",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(branchStore).activeBranch?.name || "Филиал не выбран")}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(branchStore).activeBranch?.name || "Филиал не выбран"), 1)
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
                        _push4(`${ssrInterpolate_1(vueExports.unref(historyItems).length)} записей `);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(historyItems).length) + " записей ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " История "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " История филиала "),
                        vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Таблица показывает записи для филиала, выбранного в BranchSelector. ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(branchStore).activeBranch?.name || "Филиал не выбран"), 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          variant: "outline"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(historyItems).length) + " записей ", 1)
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
                  if (vueExports.unref(historyItems).length) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UTable, {
                      columns,
                      data: vueExports.unref(paginatedHistory),
                      loading: vueExports.unref(pending),
                      sticky: "header",
                      ui: {
                        root: "w-full overflow-auto",
                        base: "w-full min-w-[64rem]",
                        thead: "bg-charcoal-50/90",
                        tbody: "divide-y divide-charcoal-100",
                        th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500"
                      }
                    }, {
                      "phone_number-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-medium text-charcoal-950"${_scopeId3}>${ssrInterpolate_1(row.original.phone_number || "Не указан")}</span>`);
                        } else {
                          return [
                            vueExports.createVNode("span", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.phone_number || "Не указан"), 1)
                          ];
                        }
                      }),
                      "status-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_SharedStatusBadge, {
                            label: row.original.status
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: row.original.status
                            }, null, 8, ["label"])
                          ];
                        }
                      }),
                      "payment_method-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(vueExports.unref(formatPaymentMethod)(row.original.payment_method))}`);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatPaymentMethod)(row.original.payment_method)), 1)
                          ];
                        }
                      }),
                      "amount-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(vueExports.unref(formatMoney)(row.original.amount))}`);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.amount)), 1)
                          ];
                        }
                      }),
                      "created_at-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(vueExports.unref(formatDateTime)(row.original.created_at))}`);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.created_at)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="flex flex-col gap-3 border-t border-charcoal-200 pt-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId2}><p class="text-sm text-charcoal-500"${_scopeId2}> Показано ${ssrInterpolate_1(vueExports.unref(pageFrom))}-${ssrInterpolate_1(vueExports.unref(pageTo))} из ${ssrInterpolate_1(vueExports.unref(historyItems).length)}</p>`);
                    _push3(ssrRenderComponent_1(_component_UPagination, {
                      page: vueExports.unref(page),
                      "onUpdate:page": ($event) => vueExports.isRef(page) ? page.value = $event : null,
                      "active-color": "primary",
                      "active-variant": "solid",
                      "items-per-page": itemsPerPage,
                      "show-controls": true,
                      "sibling-count": 1,
                      total: vueExports.unref(historyItems).length
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<div class="rounded-[1.25rem] border border-dashed border-charcoal-200 bg-white/70 px-5 py-6"${_scopeId2}><p class="text-base font-semibold text-charcoal-950"${_scopeId2}> История не найдена </p><p class="mt-2 text-sm text-charcoal-500"${_scopeId2}> Для выбранного филиала записи отсутствуют. </p></div>`);
                  }
                } else {
                  return [
                    vueExports.unref(historyItems).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      vueExports.createVNode("div", { class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90" }, [
                        vueExports.createVNode(_component_UTable, {
                          columns,
                          data: vueExports.unref(paginatedHistory),
                          loading: vueExports.unref(pending),
                          sticky: "header",
                          ui: {
                            root: "w-full overflow-auto",
                            base: "w-full min-w-[64rem]",
                            thead: "bg-charcoal-50/90",
                            tbody: "divide-y divide-charcoal-100",
                            th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500"
                          }
                        }, {
                          "phone_number-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode("span", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.phone_number || "Не указан"), 1)
                          ]),
                          "status-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: row.original.status
                            }, null, 8, ["label"])
                          ]),
                          "payment_method-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatPaymentMethod)(row.original.payment_method)), 1)
                          ]),
                          "amount-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.amount)), 1)
                          ]),
                          "created_at-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.created_at)), 1)
                          ]),
                          _: 1
                        }, 8, ["data", "loading"])
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-col gap-3 border-t border-charcoal-200 pt-4 sm:flex-row sm:items-center sm:justify-between" }, [
                        vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Показано " + vueExports.toDisplayString(vueExports.unref(pageFrom)) + "-" + vueExports.toDisplayString(vueExports.unref(pageTo)) + " из " + vueExports.toDisplayString(vueExports.unref(historyItems).length), 1),
                        vueExports.createVNode(_component_UPagination, {
                          page: vueExports.unref(page),
                          "onUpdate:page": ($event) => vueExports.isRef(page) ? page.value = $event : null,
                          "active-color": "primary",
                          "active-variant": "solid",
                          "items-per-page": itemsPerPage,
                          "show-controls": true,
                          "sibling-count": 1,
                          total: vueExports.unref(historyItems).length
                        }, null, 8, ["page", "onUpdate:page", "total"])
                      ])
                    ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 1,
                      class: "rounded-[1.25rem] border border-dashed border-charcoal-200 bg-white/70 px-5 py-6"
                    }, [
                      vueExports.createVNode("p", { class: "text-base font-semibold text-charcoal-950" }, " История не найдена "),
                      vueExports.createVNode("p", { class: "mt-2 text-sm text-charcoal-500" }, " Для выбранного филиала записи отсутствуют. ")
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " История "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " История филиала "),
                      vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Таблица показывает записи для филиала, выбранного в BranchSelector. ")
                    ]),
                    vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                      vueExports.createVNode(_component_UBadge, {
                        color: "neutral",
                        size: "lg",
                        variant: "soft"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(branchStore).activeBranch?.name || "Филиал не выбран"), 1)
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UBadge, {
                        color: "neutral",
                        variant: "outline"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(historyItems).length) + " записей ", 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                default: vueExports.withCtx(() => [
                  vueExports.unref(historyItems).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    vueExports.createVNode("div", { class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90" }, [
                      vueExports.createVNode(_component_UTable, {
                        columns,
                        data: vueExports.unref(paginatedHistory),
                        loading: vueExports.unref(pending),
                        sticky: "header",
                        ui: {
                          root: "w-full overflow-auto",
                          base: "w-full min-w-[64rem]",
                          thead: "bg-charcoal-50/90",
                          tbody: "divide-y divide-charcoal-100",
                          th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500"
                        }
                      }, {
                        "phone_number-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("span", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.phone_number || "Не указан"), 1)
                        ]),
                        "status-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode(_component_SharedStatusBadge, {
                            label: row.original.status
                          }, null, 8, ["label"])
                        ]),
                        "payment_method-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatPaymentMethod)(row.original.payment_method)), 1)
                        ]),
                        "amount-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.amount)), 1)
                        ]),
                        "created_at-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.created_at)), 1)
                        ]),
                        _: 1
                      }, 8, ["data", "loading"])
                    ]),
                    vueExports.createVNode("div", { class: "flex flex-col gap-3 border-t border-charcoal-200 pt-4 sm:flex-row sm:items-center sm:justify-between" }, [
                      vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, " Показано " + vueExports.toDisplayString(vueExports.unref(pageFrom)) + "-" + vueExports.toDisplayString(vueExports.unref(pageTo)) + " из " + vueExports.toDisplayString(vueExports.unref(historyItems).length), 1),
                      vueExports.createVNode(_component_UPagination, {
                        page: vueExports.unref(page),
                        "onUpdate:page": ($event) => vueExports.isRef(page) ? page.value = $event : null,
                        "active-color": "primary",
                        "active-variant": "solid",
                        "items-per-page": itemsPerPage,
                        "show-controls": true,
                        "sibling-count": 1,
                        total: vueExports.unref(historyItems).length
                      }, null, 8, ["page", "onUpdate:page", "total"])
                    ])
                  ])) : (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    class: "rounded-[1.25rem] border border-dashed border-charcoal-200 bg-white/70 px-5 py-6"
                  }, [
                    vueExports.createVNode("p", { class: "text-base font-semibold text-charcoal-950" }, " История не найдена "),
                    vueExports.createVNode("p", { class: "mt-2 text-sm text-charcoal-500" }, " Для выбранного филиала записи отсутствуют. ")
                  ]))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/history/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-bxxO4lWv');
//# sourceMappingURL=index-bxxO4lWv.mjs.map
