globalThis.__timing__.logStart('Load chunks/build/banners-CQ0UsfPq');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$8 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a, e as useApiClient } from './server.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { _ as __nuxt_component_10 } from './JsonBlock-DvPUbwNJ.mjs';
import { _ as _sfc_main$1 } from './Modal-Dv48105F.mjs';
import { _ as _sfc_main$4 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$5 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$6 } from './Textarea-DeTQfUen.mjs';
import { _ as _sfc_main$7 } from './Checkbox-BOWf4Iqw.mjs';
import { v as vueExports, s as ssrRenderComponent_1, d as ssrRenderList_1, b as ssrRenderClass_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';
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
import './display-CyQec-Wd.mjs';
import '../_/FocusScope.mjs';
import '../_/useId.mjs';
import '../_/isValueEqualOrExist.mjs';
import '../_/VisuallyHiddenInput.mjs';
import '../_/RovingFocusItem.mjs';
import '../_/utils.mjs';
import '../_/RovingFocusGroup.mjs';
import 'node:stream';

function useMarketplaceApi() {
  const client = useApiClient();
  return {
    create(body) {
      return client.request("/api/marketplace/banners", {
        body,
        method: "POST",
        successMessage: "Баннер создан"
      });
    },
    detail(id) {
      return client.request(`/api/marketplace/banners/${id}`);
    },
    list() {
      return client.request("/api/marketplace/banners");
    },
    toggleActive(id, isActive) {
      return client.request(`/api/marketplace/banners/${id}`, {
        body: { is_active: isActive },
        method: "DELETE",
        successMessage: isActive ? "Баннер активирован" : "Баннер деактивирован"
      });
    },
    update(id, body) {
      return client.request(`/api/marketplace/banners/${id}`, {
        body,
        method: "PUT",
        successMessage: "Баннер обновлен"
      });
    }
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "banners",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const marketplaceApi = useMarketplaceApi();
    const bannerModalOpen = vueExports.ref(false);
    const form = vueExports.reactive({
      description: "",
      id: "",
      is_active: true,
      locale: "uz",
      title: ""
    });
    const selectedFile = vueExports.ref(null);
    const selectedBannerId = vueExports.ref("");
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("marketplace-banners", async () => {
      const banners = await marketplaceApi.list();
      return Array.isArray(banners) ? banners : banners?.items || [];
    })), __temp = await __temp, __restore(), __temp);
    vueExports.watch(
      () => data.value || [],
      (items) => {
        if (!items.length) {
          selectedBannerId.value = "";
          return;
        }
        if (!items.some((item) => String(item.id) === selectedBannerId.value)) {
          selectedBannerId.value = String(items[0].id);
        }
      },
      { immediate: true }
    );
    vueExports.watch(bannerModalOpen, (open) => {
      if (!open) {
        resetForm();
      }
    });
    const selectedBanner = vueExports.computed(
      () => (data.value || []).find((item) => String(item.id) === selectedBannerId.value) || null
    );
    const modalTitle = vueExports.computed(
      () => form.id ? "Редактировать баннер" : "Создать баннер"
    );
    const modalDescription = vueExports.computed(
      () => form.id ? "Обновите данные выбранного баннера." : "Заполните форму, чтобы добавить новый баннер в маркетплейс."
    );
    function openCreateModal() {
      resetForm();
      bannerModalOpen.value = true;
    }
    function editBanner(item) {
      form.description = item.description || "";
      form.id = String(item.id);
      form.is_active = Boolean(item.is_active ?? true);
      form.locale = item.locale || "uz";
      form.title = item.title || "";
      selectedBannerId.value = String(item.id);
      bannerModalOpen.value = true;
    }
    function resetForm() {
      form.description = "";
      form.id = "";
      form.is_active = true;
      form.locale = "uz";
      form.title = "";
      selectedFile.value = null;
    }
    function onFileChange(event) {
      const target = event.target;
      selectedFile.value = target.files?.[0] || null;
    }
    async function submitBanner() {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("locale", form.locale);
      formData.append("is_active", String(form.is_active));
      if (selectedFile.value) {
        formData.append("file", selectedFile.value);
      }
      if (form.id) {
        await marketplaceApi.update(form.id, formData);
      } else {
        await marketplaceApi.create(formData);
      }
      resetForm();
      await refresh();
      bannerModalOpen.value = false;
    }
    async function toggleBanner(item) {
      await marketplaceApi.toggleActive(String(item.id), !item.is_active);
      await refresh();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$8;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_SharedStatusBadge = __nuxt_component_7;
      const _component_SharedEmptyState = __nuxt_component_9;
      const _component_SharedJsonBlock = __nuxt_component_10;
      const _component_UModal = _sfc_main$1;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UTextarea = _sfc_main$6;
      const _component_UCheckbox = _sfc_main$7;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "marketplace-banners" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Баннеры маркетплейса",
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
                title: "Баннеры маркетплейса",
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
            _push2(`<div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Список баннеров </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Создание, редактирование и активация </h2></div>`);
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-plus",
                    onClick: openCreateModal
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Создать баннер `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Создать баннер ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Список баннеров "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Создание, редактирование и активация ")
                      ]),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-plus",
                        onClick: openCreateModal
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Создать баннер ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(data)?.length) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList_1(vueExports.unref(data), (item) => {
                      _push3(`<button class="${ssrRenderClass_1([
                        String(item.id) === vueExports.unref(selectedBannerId) ? "border-brass-300 bg-brass-50" : "border-charcoal-200 bg-white/80",
                        "w-full rounded-[1.25rem] border p-4 text-left transition"
                      ])}" type="button"${_scopeId2}><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId2}><div class="space-y-1"${_scopeId2}><p class="font-medium text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(item.title || "Баннер без названия")}</p><p class="text-sm text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(item.locale || "Локаль не указана")}</p></div><div class="flex flex-wrap gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent_1(_component_SharedStatusBadge, {
                        label: item.is_active ? "active" : "inactive"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        color: "neutral",
                        size: "xs",
                        variant: "outline",
                        onClick: ($event) => editBanner(item)
                      }, {
                        default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Редактировать `);
                          } else {
                            return [
                              vueExports.createTextVNode(" Редактировать ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        color: "neutral",
                        size: "xs",
                        variant: "outline",
                        onClick: ($event) => toggleBanner(item)
                      }, {
                        default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate_1(item.is_active ? "Деактивировать" : "Активировать")}`);
                          } else {
                            return [
                              vueExports.createTextVNode(vueExports.toDisplayString(item.is_active ? "Деактивировать" : "Активировать"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div></button>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                      description: "Эндпоинт баннеров маркетплейса не вернул ни одного баннера.",
                      icon: "i-lucide-image-up",
                      title: "Баннеров нет"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vueExports.unref(data)?.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(data), (item) => {
                        return vueExports.openBlock(), vueExports.createBlock("button", {
                          key: String(item.id),
                          class: [
                            String(item.id) === vueExports.unref(selectedBannerId) ? "border-brass-300 bg-brass-50" : "border-charcoal-200 bg-white/80",
                            "w-full rounded-[1.25rem] border p-4 text-left transition"
                          ],
                          type: "button",
                          onClick: ($event) => selectedBannerId.value = String(item.id)
                        }, [
                          vueExports.createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                            vueExports.createVNode("div", { class: "space-y-1" }, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(item.title || "Баннер без названия"), 1),
                              vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, vueExports.toDisplayString(item.locale || "Локаль не указана"), 1)
                            ]),
                            vueExports.createVNode("div", { class: "flex flex-wrap gap-2" }, [
                              vueExports.createVNode(_component_SharedStatusBadge, {
                                label: item.is_active ? "active" : "inactive"
                              }, null, 8, ["label"]),
                              vueExports.createVNode(_component_UButton, {
                                color: "neutral",
                                size: "xs",
                                variant: "outline",
                                onClick: vueExports.withModifiers(($event) => editBanner(item), ["stop"])
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createTextVNode(" Редактировать ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              vueExports.createVNode(_component_UButton, {
                                color: "neutral",
                                size: "xs",
                                variant: "outline",
                                onClick: vueExports.withModifiers(($event) => toggleBanner(item), ["stop"])
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(item.is_active ? "Деактивировать" : "Активировать"), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Эндпоинт баннеров маркетплейса не вернул ни одного баннера.",
                      icon: "i-lucide-image-up",
                      title: "Баннеров нет"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Выбранные данные </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Детали баннера </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Выбранные данные "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Детали баннера ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(selectedBanner)) {
                    _push3(ssrRenderComponent_1(_component_SharedJsonBlock, {
                      label: "Баннер",
                      value: vueExports.unref(selectedBanner)
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                      description: "Выберите баннер из списка, чтобы посмотреть его сырые данные.",
                      icon: "i-lucide-gallery-vertical-end",
                      title: "Баннер не выбран"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vueExports.unref(selectedBanner) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedJsonBlock, {
                      key: 0,
                      label: "Баннер",
                      value: vueExports.unref(selectedBanner)
                    }, null, 8, ["value"])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Выберите баннер из списка, чтобы посмотреть его сырые данные.",
                      icon: "i-lucide-gallery-vertical-end",
                      title: "Баннер не выбран"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_UModal, {
              open: vueExports.unref(bannerModalOpen),
              "onUpdate:open": ($event) => vueExports.isRef(bannerModalOpen) ? bannerModalOpen.value = $event : null,
              class: "sm:max-w-xl",
              description: vueExports.unref(modalDescription),
              title: vueExports.unref(modalTitle)
            }, {
              body: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Заголовок" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).title,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).title,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Описание" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UTextarea, {
                          modelValue: vueExports.unref(form).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                          rows: 4
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).description,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                            rows: 4
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Локаль" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).locale,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).locale = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).locale,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).locale = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UCheckbox, {
                    modelValue: vueExports.unref(form).is_active,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                    label: "Баннер активен"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Файл изображения" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          type: "file",
                          onChange: onFileChange
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            type: "file",
                            onChange: onFileChange
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Заголовок" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).title,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Описание" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).description,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                            rows: 4
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UFormField, { label: "Локаль" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).locale,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).locale = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UCheckbox, {
                        modelValue: vueExports.unref(form).is_active,
                        "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                        label: "Баннер активен"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      vueExports.createVNode(_component_UFormField, { label: "Файл изображения" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UInput, {
                            type: "file",
                            onChange: onFileChange
                          })
                        ]),
                        _: 1
                      })
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
                    onClick: submitBanner
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate_1(vueExports.unref(form).id ? "Обновить баннер" : "Создать баннер")}`);
                      } else {
                        return [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить баннер" : "Создать баннер"), 1)
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
                        onClick: submitBanner
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить баннер" : "Создать баннер"), 1)
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
              vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" }, [
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  header: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Список баннеров "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Создание, редактирование и активация ")
                      ]),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-plus",
                        onClick: openCreateModal
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Создать баннер ")
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.unref(data)?.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(data), (item) => {
                        return vueExports.openBlock(), vueExports.createBlock("button", {
                          key: String(item.id),
                          class: [
                            String(item.id) === vueExports.unref(selectedBannerId) ? "border-brass-300 bg-brass-50" : "border-charcoal-200 bg-white/80",
                            "w-full rounded-[1.25rem] border p-4 text-left transition"
                          ],
                          type: "button",
                          onClick: ($event) => selectedBannerId.value = String(item.id)
                        }, [
                          vueExports.createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                            vueExports.createVNode("div", { class: "space-y-1" }, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(item.title || "Баннер без названия"), 1),
                              vueExports.createVNode("p", { class: "text-sm text-charcoal-500" }, vueExports.toDisplayString(item.locale || "Локаль не указана"), 1)
                            ]),
                            vueExports.createVNode("div", { class: "flex flex-wrap gap-2" }, [
                              vueExports.createVNode(_component_SharedStatusBadge, {
                                label: item.is_active ? "active" : "inactive"
                              }, null, 8, ["label"]),
                              vueExports.createVNode(_component_UButton, {
                                color: "neutral",
                                size: "xs",
                                variant: "outline",
                                onClick: vueExports.withModifiers(($event) => editBanner(item), ["stop"])
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createTextVNode(" Редактировать ")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              vueExports.createVNode(_component_UButton, {
                                color: "neutral",
                                size: "xs",
                                variant: "outline",
                                onClick: vueExports.withModifiers(($event) => toggleBanner(item), ["stop"])
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(item.is_active ? "Деактивировать" : "Активировать"), 1)
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ])
                          ])
                        ], 10, ["onClick"]);
                      }), 128))
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Эндпоинт баннеров маркетплейса не вернул ни одного баннера.",
                      icon: "i-lucide-image-up",
                      title: "Баннеров нет"
                    }))
                  ]),
                  _: 1
                }),
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  header: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Выбранные данные "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Детали баннера ")
                    ])
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.unref(selectedBanner) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedJsonBlock, {
                      key: 0,
                      label: "Баннер",
                      value: vueExports.unref(selectedBanner)
                    }, null, 8, ["value"])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Выберите баннер из списка, чтобы посмотреть его сырые данные.",
                      icon: "i-lucide-gallery-vertical-end",
                      title: "Баннер не выбран"
                    }))
                  ]),
                  _: 1
                })
              ]),
              vueExports.createVNode(_component_UModal, {
                open: vueExports.unref(bannerModalOpen),
                "onUpdate:open": ($event) => vueExports.isRef(bannerModalOpen) ? bannerModalOpen.value = $event : null,
                class: "sm:max-w-xl",
                description: vueExports.unref(modalDescription),
                title: vueExports.unref(modalTitle)
              }, {
                body: vueExports.withCtx(() => [
                  vueExports.createVNode("div", { class: "space-y-4" }, [
                    vueExports.createVNode(_component_UFormField, { label: "Заголовок" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).title,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).title = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, { label: "Описание" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UTextarea, {
                          modelValue: vueExports.unref(form).description,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).description = $event,
                          rows: 4
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UFormField, { label: "Локаль" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          modelValue: vueExports.unref(form).locale,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).locale = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCheckbox, {
                      modelValue: vueExports.unref(form).is_active,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).is_active = $event,
                      label: "Баннер активен"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    vueExports.createVNode(_component_UFormField, { label: "Файл изображения" }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_component_UInput, {
                          type: "file",
                          onChange: onFileChange
                        })
                      ]),
                      _: 1
                    })
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
                      onClick: submitBanner
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(form).id ? "Обновить баннер" : "Создать баннер"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/marketplace/banners.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/banners-CQ0UsfPq');
//# sourceMappingURL=banners-CQ0UsfPq.mjs.map
