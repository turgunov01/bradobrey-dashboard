globalThis.__timing__.logStart('Load chunks/build/services-DZRVGc59');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$b } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a, e as useApiClient } from './server.mjs';
import { _ as _sfc_main$5 } from './Badge-CHxj5N7w.mjs';
import { _ as _sfc_main$1 } from './Table-uigNOx9c.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as _sfc_main$4 } from './Tooltip-BXK1uE6k.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { _ as _sfc_main$6 } from './Modal-Dv48105F.mjs';
import { _ as _sfc_main$7 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$8 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$9 } from './Checkbox-BOWf4Iqw.mjs';
import { s as serviceFormSchema } from '../_/index.mjs';
import { a as formatMoney } from './format-DDcTL-sj.mjs';
import { f as flattenServicesPayload } from './services-D0S0WuHG.mjs';
import { v as vueExports, s as ssrRenderComponent_1, i as ssrRenderAttr_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';
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
import '../_/isValueEqualOrExist.mjs';
import '../_/VisuallyHiddenInput.mjs';
import '../_/RovingFocusItem.mjs';
import '../_/utils.mjs';
import '../_/RovingFocusGroup.mjs';
import 'node:stream';

function useServicesApi() {
  const client = useApiClient();
  return {
    create(payload) {
      return client.request("/api/services", { body: payload, method: "POST", successMessage: "Услуга создана" });
    },
    detail(id) {
      return client.request(`/api/services/${id}`);
    },
    list() {
      return client.request("/api/services");
    },
    remove(id) {
      return client.request(`/api/services/${id}`, { method: "DELETE", successMessage: "Услуга удалена" });
    },
    update(id, payload) {
      return client.request(`/api/services/${id}`, { body: payload, method: "PATCH", successMessage: "Услуга обновлена" });
    }
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "services",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const servicesApi = useServicesApi();
    const serviceModalOpen = vueExports.ref(false);
    const form = vueExports.reactive({
      category_name: "",
      duration: 30,
      id: "",
      is_active: true,
      name: "",
      price: 0
    });
    const modalTitle = vueExports.computed(
      () => form.id ? "Редактировать услугу" : "Создать новую услугу"
    );
    const modalDescription = vueExports.computed(
      () => form.id ? "Обновите данные выбранной услуги." : "Заполните форму, чтобы добавить услугу в каталог."
    );
    const serviceColumns = [
      { accessorKey: "id", header: "id" },
      { accessorKey: "name", header: "name" },
      { accessorKey: "category", header: "category" },
      { accessorKey: "duration_minutes", header: "duration_minutes" },
      { accessorKey: "base_price", header: "base_price" },
      { accessorKey: "image", header: "image" },
      { accessorKey: "is_active", header: "is_active" },
      { id: "actions", header: "" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("services-dashboard", async () => {
      return await servicesApi.list();
    })), __temp = await __temp, __restore(), __temp);
    const serviceRows = vueExports.computed(
      () => flattenServicesPayload(data.value).map((service, index) => ({
        base_price: service.base_price ?? service.price ?? 0,
        category: service.category || "Без категории",
        duration_minutes: Number(service.duration_minutes ?? service.duration ?? 0),
        id: String(service.id ?? `service-${index}`),
        image: String(service.image || "").trim() || null,
        is_active: Boolean(service.is_active ?? true),
        name: service.name || "Услуга без названия"
      })).sort((left, right) => {
        const categoryComparison = left.category.localeCompare(right.category, "ru");
        return categoryComparison !== 0 ? categoryComparison : left.name.localeCompare(right.name, "ru");
      })
    );
    vueExports.watch(serviceModalOpen, (open) => {
      if (!open) {
        resetForm();
      }
    });
    function resetForm() {
      form.category_name = "";
      form.duration = 30;
      form.id = "";
      form.is_active = true;
      form.name = "";
      form.price = 0;
    }
    function openCreateModal() {
      resetForm();
      serviceModalOpen.value = true;
    }
    function startEdit(service) {
      form.category_name = service.category;
      form.duration = Number(service.duration_minutes || 0);
      form.id = String(service.id);
      form.is_active = Boolean(service.is_active ?? true);
      form.name = service.name || "";
      form.price = Number(service.base_price || 0);
      serviceModalOpen.value = true;
    }
    async function submit() {
      const payload = serviceFormSchema.safeParse({
        category_name: form.category_name || void 0,
        duration: form.duration,
        is_active: form.is_active,
        name: form.name,
        price: form.price
      });
      if (!payload.success) {
        useApiClient().notifyError(new Error(payload.error.issues[0]?.message || "Некорректные данные услуги"));
        return;
      }
      if (form.id) {
        await servicesApi.update(form.id, payload.data);
      } else {
        await servicesApi.create(payload.data);
      }
      await refresh();
      serviceModalOpen.value = false;
    }
    async function removeService(id) {
      await servicesApi.remove(id);
      await refresh();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$b;
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
      const _component_UCheckbox = _sfc_main$9;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "services" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Услуги",
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
                title: "Услуги",
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
                  _push3(`<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Единый список </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Каталог услуг </h2></div><div class="flex flex-wrap items-center gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UBadge, {
                    color: "neutral",
                    size: "lg",
                    variant: "soft"
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(serviceRows).length)} услуг `);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(serviceRows).length) + " услуг ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-plus",
                    onClick: openCreateModal
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Создать услугу `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Создать услугу ")
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
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Единый список "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Каталог услуг ")
                      ]),
                      vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                        vueExports.createVNode(_component_UBadge, {
                          color: "neutral",
                          size: "lg",
                          variant: "soft"
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(serviceRows).length) + " услуг ", 1)
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-plus",
                          onClick: openCreateModal
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Создать услугу ")
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
                  if (vueExports.unref(serviceRows).length) {
                    _push3(`<div class="overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"${_scopeId2}><div class="max-h-[42rem] overflow-auto"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UTable, {
                      columns: serviceColumns,
                      data: vueExports.unref(serviceRows),
                      loading: vueExports.unref(pending),
                      sticky: "header",
                      ui: {
                        root: "w-full overflow-auto",
                        base: "w-full min-w-[88rem]",
                        thead: "bg-charcoal-50/90",
                        tbody: "divide-y divide-charcoal-100",
                        th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                        td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                      }
                    }, {
                      "id-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-mono text-xs text-charcoal-500"${_scopeId3}>${ssrInterpolate_1(row.original.id)}</span>`);
                        } else {
                          return [
                            vueExports.createVNode("span", { class: "font-mono text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.id), 1)
                          ];
                        }
                      }),
                      "duration_minutes-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-medium"${_scopeId3}>${ssrInterpolate_1(row.original.duration_minutes)} мин</span>`);
                        } else {
                          return [
                            vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.duration_minutes) + " мин", 1)
                          ];
                        }
                      }),
                      "base_price-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="font-medium"${_scopeId3}>${ssrInterpolate_1(vueExports.unref(formatMoney)(row.original.base_price))}</span>`);
                        } else {
                          return [
                            vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.base_price)), 1)
                          ];
                        }
                      }),
                      "image-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (row.original.image) {
                            _push4(`<a${ssrRenderAttr_1("href", row.original.image)} class="inline-flex items-center gap-3" rel="noreferrer" target="_blank"${_scopeId3}><img${ssrRenderAttr_1("alt", row.original.name)}${ssrRenderAttr_1("src", row.original.image)} class="size-12 rounded-xl border border-charcoal-200 object-cover"${_scopeId3}><span class="max-w-[16rem] truncate text-xs text-primary-600"${_scopeId3}>${ssrInterpolate_1(row.original.image)}</span></a>`);
                          } else {
                            _push4(`<span class="text-charcoal-400"${_scopeId3}>Нет изображения</span>`);
                          }
                        } else {
                          return [
                            row.original.image ? (vueExports.openBlock(), vueExports.createBlock("a", {
                              key: 0,
                              href: row.original.image,
                              class: "inline-flex items-center gap-3",
                              rel: "noreferrer",
                              target: "_blank"
                            }, [
                              vueExports.createVNode("img", {
                                alt: row.original.name,
                                src: row.original.image,
                                class: "size-12 rounded-xl border border-charcoal-200 object-cover"
                              }, null, 8, ["alt", "src"]),
                              vueExports.createVNode("span", { class: "max-w-[16rem] truncate text-xs text-primary-600" }, vueExports.toDisplayString(row.original.image), 1)
                            ], 8, ["href"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              class: "text-charcoal-400"
                            }, "Нет изображения"))
                          ];
                        }
                      }),
                      "is_active-cell": vueExports.withCtx(({ row }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_SharedStatusBadge, {
                            label: row.original.is_active ? "active" : "inactive"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: row.original.is_active ? "active" : "inactive"
                            }, null, 8, ["label"])
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
                                  "aria-label": "Редактировать услугу",
                                  color: "neutral",
                                  icon: "i-lucide-pencil",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => startEdit(row.original)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": "Редактировать услугу",
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
                                  "aria-label": "Удалить услугу",
                                  color: "error",
                                  icon: "i-lucide-trash-2",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => removeService(row.original.id)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": "Удалить услугу",
                                    color: "error",
                                    icon: "i-lucide-trash-2",
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => removeService(row.original.id)
                                  }, null, 8, ["onClick"])
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
                                    "aria-label": "Редактировать услугу",
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
                                    "aria-label": "Удалить услугу",
                                    color: "error",
                                    icon: "i-lucide-trash-2",
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => removeService(row.original.id)
                                  }, null, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                      description: "Список услуг пуст или не был получен от бэкенда.",
                      icon: "i-lucide-badge-dollar-sign",
                      title: "Услуги не загружены"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vueExports.unref(serviceRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"
                    }, [
                      vueExports.createVNode("div", { class: "max-h-[42rem] overflow-auto" }, [
                        vueExports.createVNode(_component_UTable, {
                          columns: serviceColumns,
                          data: vueExports.unref(serviceRows),
                          loading: vueExports.unref(pending),
                          sticky: "header",
                          ui: {
                            root: "w-full overflow-auto",
                            base: "w-full min-w-[88rem]",
                            thead: "bg-charcoal-50/90",
                            tbody: "divide-y divide-charcoal-100",
                            th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                            td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                          }
                        }, {
                          "id-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode("span", { class: "font-mono text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.id), 1)
                          ]),
                          "duration_minutes-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.duration_minutes) + " мин", 1)
                          ]),
                          "base_price-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.base_price)), 1)
                          ]),
                          "image-cell": vueExports.withCtx(({ row }) => [
                            row.original.image ? (vueExports.openBlock(), vueExports.createBlock("a", {
                              key: 0,
                              href: row.original.image,
                              class: "inline-flex items-center gap-3",
                              rel: "noreferrer",
                              target: "_blank"
                            }, [
                              vueExports.createVNode("img", {
                                alt: row.original.name,
                                src: row.original.image,
                                class: "size-12 rounded-xl border border-charcoal-200 object-cover"
                              }, null, 8, ["alt", "src"]),
                              vueExports.createVNode("span", { class: "max-w-[16rem] truncate text-xs text-primary-600" }, vueExports.toDisplayString(row.original.image), 1)
                            ], 8, ["href"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              class: "text-charcoal-400"
                            }, "Нет изображения"))
                          ]),
                          "is_active-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: row.original.is_active ? "active" : "inactive"
                            }, null, 8, ["label"])
                          ]),
                          "actions-cell": vueExports.withCtx(({ row }) => [
                            vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                              vueExports.createVNode(_component_UTooltip, { text: "Редактировать" }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_component_UButton, {
                                    "aria-label": "Редактировать услугу",
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
                                    "aria-label": "Удалить услугу",
                                    color: "error",
                                    icon: "i-lucide-trash-2",
                                    square: "",
                                    variant: "ghost",
                                    onClick: ($event) => removeService(row.original.id)
                                  }, null, 8, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ]),
                          _: 1
                        }, 8, ["data", "loading"])
                      ])
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Список услуг пуст или не был получен от бэкенда.",
                      icon: "i-lucide-badge-dollar-sign",
                      title: "Услуги не загружены"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UModal, {
              open: vueExports.unref(serviceModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(serviceModalOpen) ? serviceModalOpen.value = $event : null,
              class: "sm:max-w-xl",
              description: vueExports.unref(modalDescription),
              title: vueExports.unref(modalTitle)
            }, {
              body: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Название услуги" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Название категории" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).category_name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).category_name = $event,
                          placeholder: "Стрижки, бритье, окрашивание"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).category_name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).category_name = $event,
                            placeholder: "Стрижки, бритье, окрашивание"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid gap-4 sm:grid-cols-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Длительность" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).duration,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).duration = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).duration,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).duration = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Цена" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).price,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).price = $event,
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).price,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).price = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(_component_UCheckbox, {
                    modelValue: vueExports.unref(form).is_active,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                    label: "Услуга активна"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Название услуги" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Название категории" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).category_name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).category_name = $event,
                            placeholder: "Стрижки, бритье, окрашивание"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Длительность" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(form).duration,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).duration = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Цена" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(form).price,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).price = $event,
                              type: "number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode(_component_UCheckbox, {
                        modelValue: vueExports.unref(form).is_active,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                        label: "Услуга активна"
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
                    onClick: resetForm
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
                    onClick: submit
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(form).id ? "Обновить услугу" : "Создать услугу")}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить услугу" : "Создать услугу"), 1)
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
                        onClick: resetForm
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
                        onClick: submit
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить услугу" : "Создать услугу"), 1)
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
              vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Единый список "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Каталог услуг ")
                    ]),
                    vueExports.createVNode("div", { class: "flex flex-wrap items-center gap-3" }, [
                      vueExports.createVNode(_component_UBadge, {
                        color: "neutral",
                        size: "lg",
                        variant: "soft"
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(serviceRows).length) + " услуг ", 1)
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-plus",
                        onClick: openCreateModal
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Создать услугу ")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                default: vueExports.withCtx(() => [
                  vueExports.unref(serviceRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "overflow-hidden rounded-[1.25rem] border border-charcoal-200 bg-white/90"
                  }, [
                    vueExports.createVNode("div", { class: "max-h-[42rem] overflow-auto" }, [
                      vueExports.createVNode(_component_UTable, {
                        columns: serviceColumns,
                        data: vueExports.unref(serviceRows),
                        loading: vueExports.unref(pending),
                        sticky: "header",
                        ui: {
                          root: "w-full overflow-auto",
                          base: "w-full min-w-[88rem]",
                          thead: "bg-charcoal-50/90",
                          tbody: "divide-y divide-charcoal-100",
                          th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                          td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                        }
                      }, {
                        "id-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("span", { class: "font-mono text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.id), 1)
                        ]),
                        "duration_minutes-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.duration_minutes) + " мин", 1)
                        ]),
                        "base_price-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(vueExports.unref(formatMoney)(row.original.base_price)), 1)
                        ]),
                        "image-cell": vueExports.withCtx(({ row }) => [
                          row.original.image ? (vueExports.openBlock(), vueExports.createBlock("a", {
                            key: 0,
                            href: row.original.image,
                            class: "inline-flex items-center gap-3",
                            rel: "noreferrer",
                            target: "_blank"
                          }, [
                            vueExports.createVNode("img", {
                              alt: row.original.name,
                              src: row.original.image,
                              class: "size-12 rounded-xl border border-charcoal-200 object-cover"
                            }, null, 8, ["alt", "src"]),
                            vueExports.createVNode("span", { class: "max-w-[16rem] truncate text-xs text-primary-600" }, vueExports.toDisplayString(row.original.image), 1)
                          ], 8, ["href"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            class: "text-charcoal-400"
                          }, "Нет изображения"))
                        ]),
                        "is_active-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode(_component_SharedStatusBadge, {
                            label: row.original.is_active ? "active" : "inactive"
                          }, null, 8, ["label"])
                        ]),
                        "actions-cell": vueExports.withCtx(({ row }) => [
                          vueExports.createVNode("div", { class: "flex justify-end gap-2" }, [
                            vueExports.createVNode(_component_UTooltip, { text: "Редактировать" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UButton, {
                                  "aria-label": "Редактировать услугу",
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
                                  "aria-label": "Удалить услугу",
                                  color: "error",
                                  icon: "i-lucide-trash-2",
                                  square: "",
                                  variant: "ghost",
                                  onClick: ($event) => removeService(row.original.id)
                                }, null, 8, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 1
                      }, 8, ["data", "loading"])
                    ])
                  ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                    key: 1,
                    description: "Список услуг пуст или не был получен от бэкенда.",
                    icon: "i-lucide-badge-dollar-sign",
                    title: "Услуги не загружены"
                  }))
                ]),
                _: 1
              }),
              vueExports.createVNode(_component_UModal, {
                open: vueExports.unref(serviceModalOpen),
                "onUpdate:open": ($event) => vueExports.isRef(serviceModalOpen) ? serviceModalOpen.value = $event : null,
                class: "sm:max-w-xl",
                description: vueExports.unref(modalDescription),
                title: vueExports.unref(modalTitle)
              }, {
                body: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, { label: "Название услуги" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, { label: "Название категории" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).category_name,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).category_name = $event,
                          placeholder: "Стрижки, бритье, окрашивание"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Длительность" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).duration,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).duration = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Цена" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).price,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).price = $event,
                            type: "number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    vueExports.createVNode(_component_UCheckbox, {
                      modelValue: vueExports.unref(form).is_active,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                      label: "Услуга активна"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                footer: vueExports.withCtx(({ close }) => [
                  vueExports.createVNode("div", { class: "flex w-full flex-wrap justify-end gap-3" }, [
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "outline",
                      onClick: resetForm
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
                      onClick: submit
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить услугу" : "Создать услугу"), 1)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open", "description", "title"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/services-DZRVGc59');
//# sourceMappingURL=services-DZRVGc59.mjs.map
