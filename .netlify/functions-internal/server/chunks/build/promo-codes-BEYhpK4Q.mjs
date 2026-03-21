globalThis.__timing__.logStart('Load chunks/build/promo-codes-BEYhpK4Q');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$c } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { e as useApiClient, b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$5 } from './Badge-CHxj5N7w.mjs';
import { _ as _sfc_main$1 } from './Table-uigNOx9c.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as _sfc_main$4 } from './Tooltip-BXK1uE6k.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { _ as _sfc_main$6 } from './Modal-Dv48105F.mjs';
import { _ as _sfc_main$7 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$8 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$9 } from './SelectMenu-9fuPONhl.mjs';
import { _ as _sfc_main$b } from './Checkbox-BOWf4Iqw.mjs';
import { p as promoCodeSchema, f as promoCreateSchema } from '../_/index.mjs';
import { f as formatDateTime, b as formatCount } from './format-DDcTL-sj.mjs';
import { u as usePromoApi } from './usePromoApi-DE1sz-6g.mjs';
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
import './display-CyQec-Wd.mjs';
import '../_/PopperArrow.mjs';
import '../_/useId.mjs';
import '../_/FocusScope.mjs';
import '../_/utils.mjs';
import '../_/VisuallyHiddenInput.mjs';
import '../_/isValueEqualOrExist.mjs';
import '../_/RovingFocusItem.mjs';
import '../_/RovingFocusGroup.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "promo-codes",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const promoApi = usePromoApi();
    const apiClient = useApiClient();
    const discountTypeOptions = [
      { label: "Процент", value: "percentage" },
      { label: "Фиксированная сумма", value: "fixed" }
    ];
    const statusOptions = [
      { label: "Активный", value: "active" },
      { label: "Неактивный", value: "inactive" }
    ];
    function createDefaultPromoForm() {
      return {
        code: "",
        discount_type: "percentage",
        discount_value: 10,
        is_unlimited: false,
        status: "active",
        usage_limit: 1
      };
    }
    function normalizeDiscountType(value) {
      return String(value || "").toLowerCase() === "fixed" ? "fixed" : "percentage";
    }
    function normalizeStatus(value, fallback = false) {
      if (String(value || "").toLowerCase() === "active") {
        return "active";
      }
      if (value === true || fallback) {
        return "active";
      }
      return "inactive";
    }
    function normalizeNumber(value, fallback = 0) {
      const amount = Number(value);
      return Number.isFinite(amount) ? amount : fallback;
    }
    function normalizeNullableNumber(value) {
      if (value === void 0 || value === null || value === "") {
        return null;
      }
      const amount = Number(value);
      return Number.isFinite(amount) ? amount : null;
    }
    function buildDiscountLabel(type, value, fallback) {
      if (fallback) {
        return fallback;
      }
      if (type === "percentage") {
        return `${formatCount(value)}%`;
      }
      return formatCount(value);
    }
    function toPromoRow(item, index) {
      const parsed = promoCodeSchema.safeParse(item);
      const source = parsed.success ? parsed.data : item;
      const usedCount = normalizeNumber(source.used_count ?? source.usage_count);
      const isUnlimited = Boolean(source.is_unlimited ?? false);
      const usageLimit = normalizeNullableNumber(source.usage_limit);
      const discountType = normalizeDiscountType(source.discount_type);
      const discountValue = normalizeNumber(source.discount_value);
      const remaining = isUnlimited ? null : normalizeNullableNumber(source.remaining) ?? Math.max((usageLimit || 0) - usedCount, 0);
      return {
        code: String(source.code || "Без кода"),
        createdAt: source.created_at ? String(source.created_at) : null,
        discountLabel: buildDiscountLabel(discountType, discountValue, source.discount ? String(source.discount) : null),
        discountType,
        discountValue,
        id: String(source.id ?? `promo-${index}`),
        isUnlimited,
        remaining,
        status: normalizeStatus(source.status, Boolean(source.is_active)),
        usageLimit,
        usedCount
      };
    }
    function isPromoActive(row) {
      return row.status === "active" && (row.isUnlimited || (row.remaining ?? 0) > 0);
    }
    const createForm = vueExports.reactive(createDefaultPromoForm());
    const editForm = vueExports.reactive({
      ...createDefaultPromoForm(),
      id: ""
    });
    const createModalOpen = vueExports.ref(false);
    const editModalOpen = vueExports.ref(false);
    const removingId = vueExports.ref("");
    const promoColumns = [
      { accessorKey: "code", header: "КОД" },
      { id: "discount", header: "СКИДКА" },
      { id: "usage", header: "ИСПОЛЬЗОВАНИЯ" },
      { id: "status", header: "СТАТУС" },
      { accessorKey: "createdAt", header: "СОЗДАН" },
      { id: "actions", header: "" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("promo-dashboard", async () => {
      const dashboard = await promoApi.dashboard();
      const rawItems = Array.isArray(dashboard?.items) ? dashboard.items : Array.isArray(dashboard) ? dashboard : [];
      const items = rawItems.map((item, index) => toPromoRow(item, index)).sort((left, right) => right.code.localeCompare(left.code, "ru"));
      return {
        items
      };
    })), __temp = await __temp, __restore(), __temp);
    const promoRows = vueExports.computed(() => data.value?.items || []);
    const activePromoRows = vueExports.computed(() => promoRows.value.filter(isPromoActive));
    vueExports.watch(
      () => createForm.is_unlimited,
      (isUnlimited) => {
        if (isUnlimited) {
          createForm.usage_limit = null;
          return;
        }
        if (!createForm.usage_limit) {
          createForm.usage_limit = 1;
        }
      },
      { immediate: true }
    );
    vueExports.watch(
      () => editForm.is_unlimited,
      (isUnlimited) => {
        if (isUnlimited) {
          editForm.usage_limit = null;
          return;
        }
        if (!editForm.usage_limit) {
          editForm.usage_limit = 1;
        }
      },
      { immediate: true }
    );
    vueExports.watch(createModalOpen, (open) => {
      if (!open) {
        resetCreateForm();
      }
    });
    vueExports.watch(editModalOpen, (open) => {
      if (!open) {
        resetEditForm();
      }
    });
    function resetCreateForm() {
      Object.assign(createForm, createDefaultPromoForm());
    }
    function resetEditForm() {
      Object.assign(editForm, {
        ...createDefaultPromoForm(),
        id: ""
      });
    }
    function openCreateModal() {
      resetCreateForm();
      createModalOpen.value = true;
    }
    function startEdit(row) {
      Object.assign(editForm, {
        code: row.code,
        discount_type: row.discountType,
        discount_value: row.discountValue,
        id: row.id,
        is_unlimited: row.isUnlimited,
        status: row.status,
        usage_limit: row.isUnlimited ? null : row.usageLimit || 1
      });
      editModalOpen.value = true;
    }
    function validatePromoForm(form) {
      const payload = promoCreateSchema.safeParse({
        code: form.code,
        discount_type: form.discount_type,
        discount_value: form.discount_value,
        is_unlimited: form.is_unlimited,
        status: form.status,
        usage_limit: form.is_unlimited ? null : form.usage_limit
      });
      if (!payload.success) {
        apiClient.notifyError(new Error(payload.error.issues[0]?.message || "Некорректные данные промокода"));
        return null;
      }
      return payload.data;
    }
    async function createPromo() {
      const payload = validatePromoForm(createForm);
      if (!payload) {
        return;
      }
      await promoApi.create(payload);
      resetCreateForm();
      await refresh();
      createModalOpen.value = false;
    }
    async function savePromo() {
      const payload = validatePromoForm(editForm);
      if (!payload || !editForm.id) {
        return;
      }
      await promoApi.update(editForm.id, payload);
      await refresh();
      editModalOpen.value = false;
    }
    async function removePromo(row) {
      row.usedCount ? `Удалить промокод ${row.code} вместе с историей его использований?` : `Удалить промокод ${row.code}?`;
      removingId.value = row.id;
      try {
        await promoApi.remove(row.id);
        await refresh();
        if (editForm.id === row.id) {
          editModalOpen.value = false;
        }
      } finally {
        removingId.value = "";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$c;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_UBadge = _sfc_main$5;
      const _component_UTable = _sfc_main$1;
      const _component_SharedStatusBadge = __nuxt_component_7;
      const _component_UTooltip = _sfc_main$4;
      const _component_SharedEmptyState = __nuxt_component_9;
      const _component_UModal = _sfc_main$6;
      const _component_UFormField = _sfc_main$7;
      const _component_UInput = _sfc_main$8;
      const _component_USelectMenu = _sfc_main$9;
      const _component_UCheckbox = _sfc_main$b;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "promo" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Промокоды",
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
                title: "Промокоды",
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
                  _push3(`<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Панель </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Действующие промокоды </h2></div><div class="flex flex-wrap items-center justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-plus",
                    onClick: openCreateModal
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Создать `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Создать ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    size: "lg",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(activePromoRows).length)} действующих `);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(activePromoRows).length) + " действующих ", 1)
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
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Панель "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Действующие промокоды ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center justify-end gap-3" }, [
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-plus",
                          onClick: openCreateModal
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Создать ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(activePromoRows).length) + " действующих ", 1)
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
                  if (vueExports.unref(activePromoRows).length) {
                    _push3(`<div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UTable, {
                      columns: promoColumns,
                      data: vueExports.unref(activePromoRows),
                      loading: vueExports.unref(pending),
                      sticky: "header",
                      ui: {
                        root: "w-full max-h-[42rem] overflow-auto",
                        base: "w-full min-w-[72rem]",
                        thead: "bg-charcoal-50/90",
                        tbody: "divide-y divide-charcoal-100",
                        th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                        td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                      }
                    }, {
                      "code-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-1"${_scopeId3}><p class="font-semibold text-charcoal-950"${_scopeId3}>${ssrInterpolate_1(row.original.code)}</p><p class="text-xs text-charcoal-500"${_scopeId3}>${ssrInterpolate_1(row.original.isUnlimited ? "Без лимита" : "Ограниченный промокод")}</p></div>`);
                        } else {
                          return [
                            vueExports.createVNode("div", { class: "space-y-1" }, [
                              vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.original.code), 1),
                              vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Без лимита" : "Ограниченный промокод"), 1)
                            ])
                          ];
                        }
                      }),
                      "discount-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-1"${_scopeId3}><p class="font-medium text-charcoal-950"${_scopeId3}>${ssrInterpolate_1(row.original.discountLabel)}</p><p class="text-xs text-charcoal-500"${_scopeId3}>${ssrInterpolate_1(row.original.discountType === "percentage" ? "Процентная скидка" : "Фиксированная скидка")}</p></div>`);
                        } else {
                          return [
                            vueExports.createVNode("div", { class: "space-y-1" }, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.discountLabel), 1),
                              vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.discountType === "percentage" ? "Процентная скидка" : "Фиксированная скидка"), 1)
                            ])
                          ];
                        }
                      }),
                      "usage-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-1"${_scopeId3}><p class="font-medium text-charcoal-950"${_scopeId3}>${ssrInterpolate_1(vueExports.unref(formatCount)(row.original.usedCount))} `);
                          if (!row.original.isUnlimited) {
                            _push4(`<span${_scopeId3}> / ${ssrInterpolate_1(vueExports.unref(formatCount)(row.original.usageLimit))}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</p><p class="text-xs text-charcoal-500"${_scopeId3}>${ssrInterpolate_1(row.original.isUnlimited ? "Лимит не ограничен" : `Осталось ${vueExports.unref(formatCount)(row.original.remaining)}`)}</p></div>`);
                        } else {
                          return [
                            vueExports.createVNode("div", { class: "space-y-1" }, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usedCount)) + " ", 1),
                                !row.original.isUnlimited ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, " / " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usageLimit)), 1)) : vueExports.createCommentVNode("", true)
                              ]),
                              vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Лимит не ограничен" : `Осталось ${vueExports.unref(formatCount)(row.original.remaining)}`), 1)
                            ])
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
                      "createdAt-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate_1(vueExports.unref(formatDateTime)(row.original.createdAt))}`);
                        } else {
                          return [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.createdAt)), 1)
                          ];
                        }
                      }),
                      "actions-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex justify-end gap-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent_1(_component_UTooltip, { text: "Редактировать" }, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent_1(_component_UButton, {
                                  "aria-label": "Редактировать промокод",
                                  color: "neutral",
                                  icon: "i-lucide-pencil",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => startEdit(row.original)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": "Редактировать промокод",
                                    color: "neutral",
                                    icon: "i-lucide-pencil",
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => startEdit(row.original)
                                  }, null, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent_1(_component_UTooltip, { text: "Удалить" }, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent_1(_component_UButton, {
                                  "aria-label": `Удалить промокод ${row.original.code}`,
                                  color: "error",
                                  icon: "i-lucide-trash-2",
                                  loading: vueExports.unref(removingId) === row.original.id,
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => removePromo(row.original)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": `Удалить промокод ${row.original.code}`,
                                    color: "error",
                                    icon: "i-lucide-trash-2",
                                    loading: vueExports.unref(removingId) === row.original.id,
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => removePromo(row.original)
                                  }, null, 8, ["aria-label", "loading", "onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                              vueExports.createVNode(_component_UTooltip, { text: "Редактировать" }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": "Редактировать промокод",
                                    color: "neutral",
                                    icon: "i-lucide-pencil",
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => startEdit(row.original)
                                  }, null, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024),
                              vueExports.createVNode(_component_UTooltip, { text: "Удалить" }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": `Удалить промокод ${row.original.code}`,
                                    color: "error",
                                    icon: "i-lucide-trash-2",
                                    loading: vueExports.unref(removingId) === row.original.id,
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => removePromo(row.original)
                                  }, null, 8, ["aria-label", "loading", "onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                      description: "В списке нет ни одного действующего промокода.",
                      icon: "i-lucide-ticket-percent",
                      title: "Действующих промокодов нет"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vueExports.unref(activePromoRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"
                    }, [
                      vueExports.createVNode(_component_UTable, {
                        columns: promoColumns,
                        data: vueExports.unref(activePromoRows),
                        loading: vueExports.unref(pending),
                        sticky: "header",
                        ui: {
                          root: "w-full max-h-[42rem] overflow-auto",
                          base: "w-full min-w-[72rem]",
                          thead: "bg-charcoal-50/90",
                          tbody: "divide-y divide-charcoal-100",
                          th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                          td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                        }
                      }, {
                        "code-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.original.code), 1),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Без лимита" : "Ограниченный промокод"), 1)
                          ])
                        ]),
                        "discount-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.discountLabel), 1),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.discountType === "percentage" ? "Процентная скидка" : "Фиксированная скидка"), 1)
                          ])
                        ]),
                        "usage-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usedCount)) + " ", 1),
                              !row.original.isUnlimited ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, " / " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usageLimit)), 1)) : vueExports.createCommentVNode("", true)
                            ]),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Лимит не ограничен" : `Осталось ${vueExports.unref(formatCount)(row.original.remaining)}`), 1)
                          ])
                        ]),
                        "status-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode(_component_SharedStatusBadge, {
                            label: row.original.status
                          }, null, 8, ["label"])
                        ]),
                        "createdAt-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.createdAt)), 1)
                        ]),
                        "actions-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                            vueExports.createVNode(_component_UTooltip, { text: "Редактировать" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  "aria-label": "Редактировать промокод",
                                  color: "neutral",
                                  icon: "i-lucide-pencil",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => startEdit(row.original)
                                }, null, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024),
                            vueExports.createVNode(_component_UTooltip, { text: "Удалить" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  "aria-label": `Удалить промокод ${row.original.code}`,
                                  color: "error",
                                  icon: "i-lucide-trash-2",
                                  loading: vueExports.unref(removingId) === row.original.id,
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => removePromo(row.original)
                                }, null, 8, ["aria-label", "loading", "onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 1
                      }, 8, ["data", "loading"])
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "В списке нет ни одного действующего промокода.",
                      icon: "i-lucide-ticket-percent",
                      title: "Действующих промокодов нет"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_UModal, {
              open: vueExports.unref(createModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(createModalOpen) ? createModalOpen.value = $event : null,
              class: "sm:max-w-xl",
              description: "Задайте параметры нового промокода.",
              title: "Создать промокод"
            }, {
              body: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Код" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(createForm).code,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).code = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).code,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).code = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid gap-4 sm:grid-cols-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Тип скидки" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(createForm).discount_type,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_type = $event,
                          items: discountTypeOptions,
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(createForm).discount_type,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_type = $event,
                            items: discountTypeOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Статус" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(createForm).status,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).status = $event,
                          items: statusOptions,
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(createForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).status = $event,
                            items: statusOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-4 sm:grid-cols-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Размер скидки" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(createForm).discount_value,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_value = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).discount_value,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_value = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Лимит использований" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(createForm).usage_limit,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).usage_limit = $event,
                          disabled: vueExports.unref(createForm).is_unlimited,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).usage_limit,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).usage_limit = $event,
                            disabled: vueExports.unref(createForm).is_unlimited,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(_component_UCheckbox, {
                    modelValue: vueExports.unref(createForm).is_unlimited,
                    "onUpdate:modelValue": ($event) => vueExports.unref(createForm).is_unlimited = $event,
                    label: "Безлимитный промокод"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Код" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).code,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).code = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Тип скидки" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(createForm).discount_type,
                              "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_type = $event,
                              items: discountTypeOptions,
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(createForm).status,
                              "onUpdate:modelValue": ($event) => vueExports.unref(createForm).status = $event,
                              items: statusOptions,
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Размер скидки" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(createForm).discount_value,
                              "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_value = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Лимит использований" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(createForm).usage_limit,
                              "onUpdate:modelValue": ($event) => vueExports.unref(createForm).usage_limit = $event,
                              disabled: vueExports.unref(createForm).is_unlimited,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode(_component_UCheckbox, {
                        modelValue: vueExports.unref(createForm).is_unlimited,
                        "onUpdate:modelValue": ($event) => vueExports.unref(createForm).is_unlimited = $event,
                        label: "Безлимитный промокод"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              footer: vueExports.withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex w-full flex-wrap justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: resetCreateForm
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Сбросить `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Сбросить ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    onClick: close
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Закрыть `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Закрыть ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-plus",
                    onClick: createPromo
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Создать промокод `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Создать промокод ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex w-full flex-wrap justify-end gap-3" }, [
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "outline",
                        onClick: resetCreateForm
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Сбросить ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        onClick: close
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Закрыть ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-plus",
                        onClick: createPromo
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Создать промокод ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UModal, {
              open: vueExports.unref(editModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(editModalOpen) ? editModalOpen.value = $event : null,
              class: "sm:max-w-xl",
              description: "Обновите параметры выбранного промокода.",
              title: "Редактировать промокод"
            }, {
              body: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Код" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(editForm).code,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).code = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).code,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).code = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid gap-4 sm:grid-cols-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Тип скидки" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(editForm).discount_type,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_type = $event,
                          items: discountTypeOptions,
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(editForm).discount_type,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_type = $event,
                            items: discountTypeOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Статус" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(editForm).status,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).status = $event,
                          items: statusOptions,
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(editForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).status = $event,
                            items: statusOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-4 sm:grid-cols-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Размер скидки" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(editForm).discount_value,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_value = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).discount_value,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_value = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Лимит использований" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(editForm).usage_limit,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).usage_limit = $event,
                          disabled: vueExports.unref(editForm).is_unlimited,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).usage_limit,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).usage_limit = $event,
                            disabled: vueExports.unref(editForm).is_unlimited,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(_component_UCheckbox, {
                    modelValue: vueExports.unref(editForm).is_unlimited,
                    "onUpdate:modelValue": ($event) => vueExports.unref(editForm).is_unlimited = $event,
                    label: "Безлимитный промокод"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Код" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).code,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).code = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Тип скидки" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(editForm).discount_type,
                              "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_type = $event,
                              items: discountTypeOptions,
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(editForm).status,
                              "onUpdate:modelValue": ($event) => vueExports.unref(editForm).status = $event,
                              items: statusOptions,
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Размер скидки" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(editForm).discount_value,
                              "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_value = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Лимит использований" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(editForm).usage_limit,
                              "onUpdate:modelValue": ($event) => vueExports.unref(editForm).usage_limit = $event,
                              disabled: vueExports.unref(editForm).is_unlimited,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode(_component_UCheckbox, {
                        modelValue: vueExports.unref(editForm).is_unlimited,
                        "onUpdate:modelValue": ($event) => vueExports.unref(editForm).is_unlimited = $event,
                        label: "Безлимитный промокод"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              footer: vueExports.withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex w-full flex-wrap justify-end gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: resetEditForm
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Сбросить `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Сбросить ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    onClick: close
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Закрыть `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Закрыть ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-save",
                    onClick: savePromo
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Сохранить изменения `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Сохранить изменения ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex w-full flex-wrap justify-end gap-3" }, [
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "outline",
                        onClick: resetEditForm
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Сбросить ")
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        onClick: close
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Закрыть ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-save",
                        onClick: savePromo
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Сохранить изменения ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  header: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Панель "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Действующие промокоды ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center justify-end gap-3" }, [
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-plus",
                          onClick: openCreateModal
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Создать ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(activePromoRows).length) + " действующих ", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.unref(activePromoRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"
                    }, [
                      vueExports.createVNode(_component_UTable, {
                        columns: promoColumns,
                        data: vueExports.unref(activePromoRows),
                        loading: vueExports.unref(pending),
                        sticky: "header",
                        ui: {
                          root: "w-full max-h-[42rem] overflow-auto",
                          base: "w-full min-w-[72rem]",
                          thead: "bg-charcoal-50/90",
                          tbody: "divide-y divide-charcoal-100",
                          th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                          td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                        }
                      }, {
                        "code-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-semibold text-charcoal-950" }, vueExports.toDisplayString(row.original.code), 1),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Без лимита" : "Ограниченный промокод"), 1)
                          ])
                        ]),
                        "discount-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.discountLabel), 1),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.discountType === "percentage" ? "Процентная скидка" : "Фиксированная скидка"), 1)
                          ])
                        ]),
                        "usage-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "space-y-1" }, [
                            vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usedCount)) + " ", 1),
                              !row.original.isUnlimited ? (vueExports.openBlock(), vueExports.createBlock("span", { key: 0 }, " / " + vueExports.toDisplayString(vueExports.unref(formatCount)(row.original.usageLimit)), 1)) : vueExports.createCommentVNode("", true)
                            ]),
                            vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.isUnlimited ? "Лимит не ограничен" : `Осталось ${vueExports.unref(formatCount)(row.original.remaining)}`), 1)
                          ])
                        ]),
                        "status-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode(_component_SharedStatusBadge, {
                            label: row.original.status
                          }, null, 8, ["label"])
                        ]),
                        "createdAt-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(formatDateTime)(row.original.createdAt)), 1)
                        ]),
                        "actions-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                            vueExports.createVNode(_component_UTooltip, { text: "Редактировать" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  "aria-label": "Редактировать промокод",
                                  color: "neutral",
                                  icon: "i-lucide-pencil",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => startEdit(row.original)
                                }, null, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024),
                            vueExports.createVNode(_component_UTooltip, { text: "Удалить" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  "aria-label": `Удалить промокод ${row.original.code}`,
                                  color: "error",
                                  icon: "i-lucide-trash-2",
                                  loading: vueExports.unref(removingId) === row.original.id,
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => removePromo(row.original)
                                }, null, 8, ["aria-label", "loading", "onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 1
                      }, 8, ["data", "loading"])
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "В списке нет ни одного действующего промокода.",
                      icon: "i-lucide-ticket-percent",
                      title: "Действующих промокодов нет"
                    }))
                  ]),
                  _: 1
                })
              ]),
              vueExports.createVNode(_component_UModal, {
                open: vueExports.unref(createModalOpen),
                "onUpdate:open": ($event) => vueExports.isRef(createModalOpen) ? createModalOpen.value = $event : null,
                class: "sm:max-w-xl",
                description: "Задайте параметры нового промокода.",
                title: "Создать промокод"
              }, {
                body: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, { label: "Код" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(createForm).code,
                          "onUpdate:modelValue": ($event) => vueExports.unref(createForm).code = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Тип скидки" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(createForm).discount_type,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_type = $event,
                            items: discountTypeOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(createForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).status = $event,
                            items: statusOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Размер скидки" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).discount_value,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).discount_value = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Лимит использований" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(createForm).usage_limit,
                            "onUpdate:modelValue": ($event) => vueExports.unref(createForm).usage_limit = $event,
                            disabled: vueExports.unref(createForm).is_unlimited,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode(_component_UCheckbox, {
                      modelValue: vueExports.unref(createForm).is_unlimited,
                      "onUpdate:modelValue": ($event) => vueExports.unref(createForm).is_unlimited = $event,
                      label: "Безлимитный промокод"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                footer: vueExports.withCtx(({ close }) => [
                  vueExports.createVNode("div", { class: "flex w-full flex-wrap justify-end gap-3" }, [
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "outline",
                      onClick: resetCreateForm
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Сбросить ")
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      onClick: close
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Закрыть ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    vueExports.createVNode(_component_UButton, {
                      color: "primary",
                      icon: "i-lucide-plus",
                      onClick: createPromo
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Создать промокод ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              vueExports.createVNode(_component_UModal, {
                open: vueExports.unref(editModalOpen),
                "onUpdate:open": ($event) => vueExports.isRef(editModalOpen) ? editModalOpen.value = $event : null,
                class: "sm:max-w-xl",
                description: "Обновите параметры выбранного промокода.",
                title: "Редактировать промокод"
              }, {
                body: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, { label: "Код" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(editForm).code,
                          "onUpdate:modelValue": ($event) => vueExports.unref(editForm).code = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Тип скидки" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(editForm).discount_type,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_type = $event,
                            items: discountTypeOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Статус" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(editForm).status,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).status = $event,
                            items: statusOptions,
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Размер скидки" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).discount_value,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).discount_value = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Лимит использований" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(editForm).usage_limit,
                            "onUpdate:modelValue": ($event) => vueExports.unref(editForm).usage_limit = $event,
                            disabled: vueExports.unref(editForm).is_unlimited,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode(_component_UCheckbox, {
                      modelValue: vueExports.unref(editForm).is_unlimited,
                      "onUpdate:modelValue": ($event) => vueExports.unref(editForm).is_unlimited = $event,
                      label: "Безлимитный промокод"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                footer: vueExports.withCtx(({ close }) => [
                  vueExports.createVNode("div", { class: "flex w-full flex-wrap justify-end gap-3" }, [
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "outline",
                      onClick: resetEditForm
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Сбросить ")
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      onClick: close
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Закрыть ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    vueExports.createVNode(_component_UButton, {
                      color: "primary",
                      icon: "i-lucide-save",
                      onClick: savePromo
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Сохранить изменения ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/promo-codes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/promo-codes-BEYhpK4Q');
//# sourceMappingURL=promo-codes-BEYhpK4Q.mjs.map
