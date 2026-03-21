globalThis.__timing__.logStart('Load chunks/build/api-debug-B1XsfMBp');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$7 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { u as useRoute, e as useApiClient, g as useUiStore, c as _sfc_main$3, d as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$1 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$4 } from './SelectMenu-9fuPONhl.mjs';
import { _ as _sfc_main$5 } from './Input-DcPP1NGC.mjs';
import { _ as _sfc_main$6 } from './Textarea-DeTQfUen.mjs';
import { _ as __nuxt_component_10 } from './JsonBlock-DvPUbwNJ.mjs';
import { _ as __nuxt_component_7 } from './StatusBadge-CYCC6qth.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { v as vueExports, s as ssrRenderComponent_1, d as ssrRenderList_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';
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
import './display-CyQec-Wd.mjs';
import '../_/index.mjs';
import './useKioskApi-l3XfHmhL.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "api-debug",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const apiClient = useApiClient();
    const uiStore = useUiStore();
    const branchStore = useBranchStore();
    [__temp, __restore] = vueExports.withAsyncContext(() => branchStore.ensureLoaded()), await __temp, __restore();
    const presets = vueExports.computed(() => [
      { body: "", label: "Проверка API", method: "GET", path: "/api/health", value: "health" },
      { body: "", label: "Конфиг киоска", method: "GET", path: "/api/kiosk/config", value: "kiosk-config" },
      { body: "", label: "Профиль барбера", method: "GET", path: "/api/barbers/me", value: "barber-me" },
      { body: "", label: "Активная очередь", method: "GET", path: "/api/barbers/queue", value: "queue" },
      { body: "", label: "Услуги", method: "GET", path: "/api/services", value: "services" },
      { body: "", label: "Статистика", method: "GET", path: "/api/statistics", value: "statistics" },
      { body: '{"code":"TEST"}', label: "Проверка промокода", method: "POST", path: "/api/promo-code/validate", value: "promo-validate" },
      { body: '{"code":"CERT-001"}', label: "Проверка сертификата", method: "GET", path: "/api/kiosk/certificate/CERT-001", value: "certificate" }
    ]);
    const selectedPreset = vueExports.ref(String(route.query.preset || presets.value[0]?.value || "health"));
    const form = vueExports.reactive({
      body: "",
      method: "GET",
      path: "/api/health"
    });
    const result = vueExports.ref(null);
    vueExports.watch(
      selectedPreset,
      (presetValue) => {
        const preset = presets.value.find((item) => item.value === presetValue);
        if (!preset) {
          return;
        }
        form.body = preset.body;
        form.method = preset.method;
        form.path = preset.path;
      },
      { immediate: true }
    );
    async function executeRequest() {
      let body;
      if (form.body.trim()) {
        try {
          body = JSON.parse(form.body);
        } catch {
          apiClient.notifyError(new Error("Тело запроса должно быть валидным JSON"));
          return;
        }
      }
      const response = await apiClient.rawRequest(form.path, {
        body,
        method: form.method
      });
      result.value = {
        headers: Object.fromEntries(response.headers.entries()),
        payload: response.data,
        status: response.status
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$7;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_UFormField = _sfc_main$1;
      const _component_USelectMenu = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UTextarea = _sfc_main$6;
      const _component_SharedJsonBlock = __nuxt_component_10;
      const _component_SharedStatusBadge = __nuxt_component_7;
      const _component_SharedEmptyState = __nuxt_component_9;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "api-debug" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Отладка API",
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
                    icon: "i-lucide-trash-2",
                    variant: "outline",
                    onClick: ($event) => vueExports.unref(uiStore).clearDebug()
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Очистить лог `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Очистить лог ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UButton, {
                      color: "neutral",
                      icon: "i-lucide-trash-2",
                      variant: "outline",
                      onClick: ($event) => vueExports.unref(uiStore).clearDebug()
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createTextVNode(" Очистить лог ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UDashboardNavbar, {
                title: "Отладка API",
                ui: { right: "gap-3" }
              }, {
                leading: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UDashboardSidebarCollapse)
                ]),
                right: vueExports.withCtx(() => [
                  vueExports.createVNode(_component_UButton, {
                    color: "neutral",
                    icon: "i-lucide-trash-2",
                    variant: "outline",
                    onClick: ($event) => vueExports.unref(uiStore).clearDebug()
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Очистить лог ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]"${_scopeId}><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Запуск запросов </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Проверка Nuxt BFF </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Запуск запросов "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Проверка Nuxt BFF ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Пресет" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(selectedPreset),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(selectedPreset) ? selectedPreset.value = $event : null,
                          items: vueExports.unref(presets),
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(selectedPreset),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(selectedPreset) ? selectedPreset.value = $event : null,
                            items: vueExports.unref(presets),
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid gap-4 sm:grid-cols-[0.3fr_0.7fr]"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Метод" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_USelectMenu, {
                          modelValue: vueExports.unref(form).method,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).method = $event,
                          items: [
                            { label: "GET", value: "GET" },
                            { label: "POST", value: "POST" },
                            { label: "PATCH", value: "PATCH" },
                            { label: "PUT", value: "PUT" },
                            { label: "DELETE", value: "DELETE" }
                          ],
                          "value-key": "value"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(form).method,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).method = $event,
                            items: [
                              { label: "GET", value: "GET" },
                              { label: "POST", value: "POST" },
                              { label: "PATCH", value: "PATCH" },
                              { label: "PUT", value: "PUT" },
                              { label: "DELETE", value: "DELETE" }
                            ],
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Путь" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UInput, {
                          modelValue: vueExports.unref(form).path,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).path = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UInput, {
                            modelValue: vueExports.unref(form).path,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).path = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent_1(_component_UFormField, { label: "Тело JSON" }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_component_UTextarea, {
                          modelValue: vueExports.unref(form).body,
                          "onUpdate:modelValue": ($event) => vueExports.unref(form).body = $event,
                          rows: 8
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).body,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).body = $event,
                            rows: 8
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UButton, {
                    color: "primary",
                    icon: "i-lucide-play",
                    onClick: executeRequest
                  }, {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Выполнить запрос `);
                      } else {
                        return [
                          vueExports.createTextVNode(" Выполнить запрос ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-4" }, [
                      vueExports.createVNode(_component_UFormField, { label: "Пресет" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_USelectMenu, {
                            modelValue: vueExports.unref(selectedPreset),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(selectedPreset) ? selectedPreset.value = $event : null,
                            items: vueExports.unref(presets),
                            "value-key": "value"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-[0.3fr_0.7fr]" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Метод" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(form).method,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).method = $event,
                              items: [
                                { label: "GET", value: "GET" },
                                { label: "POST", value: "POST" },
                                { label: "PATCH", value: "PATCH" },
                                { label: "PUT", value: "PUT" },
                                { label: "DELETE", value: "DELETE" }
                              ],
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Путь" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(form).path,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).path = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      vueExports.createVNode(_component_UFormField, { label: "Тело JSON" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_component_UTextarea, {
                            modelValue: vueExports.unref(form).body,
                            "onUpdate:modelValue": ($event) => vueExports.unref(form).body = $event,
                            rows: 8
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      vueExports.createVNode(_component_UButton, {
                        color: "primary",
                        icon: "i-lucide-play",
                        onClick: executeRequest
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createTextVNode(" Выполнить запрос ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (vueExports.unref(result)) {
              _push2(ssrRenderComponent_1(_component_SharedJsonBlock, {
                label: "Последний ответ",
                value: vueExports.unref(result)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
              header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Последние клиентские запросы </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Поток отладки </h2></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Последние клиентские запросы "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Поток отладки ")
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (vueExports.unref(uiStore).apiDebugEntries.length) {
                    _push3(`<div class="space-y-3"${_scopeId2}><!--[-->`);
                    ssrRenderList_1(vueExports.unref(uiStore).apiDebugEntries, (entry) => {
                      _push3(`<div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><div class="flex flex-wrap items-center justify-between gap-3"${_scopeId2}><div${_scopeId2}><p class="font-medium text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(entry.method)} ${ssrInterpolate_1(entry.url)}</p><p class="text-xs uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(entry.at)}</p></div>`);
                      _push3(ssrRenderComponent_1(_component_SharedStatusBadge, {
                        label: entry.status
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><pre class="mt-4 overflow-auto text-xs leading-6 text-charcoal-700"${_scopeId2}>${ssrInterpolate_1(JSON.stringify(entry.response || entry.error, null, 2))}</pre></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(ssrRenderComponent_1(_component_SharedEmptyState, {
                      description: "Здесь будут отображаться последние клиентские запросы панели после использования интерфейса или запуска запроса с этой страницы.",
                      icon: "i-lucide-terminal",
                      title: "Записей отладки пока нет"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    vueExports.unref(uiStore).apiDebugEntries.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(uiStore).apiDebugEntries, (entry) => {
                        return vueExports.openBlock(), vueExports.createBlock("div", {
                          key: `${entry.at}-${entry.url}`,
                          class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"
                        }, [
                          vueExports.createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
                            vueExports.createVNode("div", null, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(entry.method) + " " + vueExports.toDisplayString(entry.url), 1),
                              vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.18em] text-charcoal-500" }, vueExports.toDisplayString(entry.at), 1)
                            ]),
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: entry.status
                            }, null, 8, ["label"])
                          ]),
                          vueExports.createVNode("pre", { class: "mt-4 overflow-auto text-xs leading-6 text-charcoal-700" }, vueExports.toDisplayString(JSON.stringify(entry.response || entry.error, null, 2)), 1)
                        ]);
                      }), 128))
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Здесь будут отображаться последние клиентские запросы панели после использования интерфейса или запуска запроса с этой страницы.",
                      icon: "i-lucide-terminal",
                      title: "Записей отладки пока нет"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "grid gap-6 xl:grid-cols-[0.9fr_1.1fr]" }, [
                vueExports.createVNode("div", { class: "space-y-6" }, [
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Запуск запросов "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Проверка Nuxt BFF ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-4" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Пресет" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_USelectMenu, {
                              modelValue: vueExports.unref(selectedPreset),
                              "onUpdate:modelValue": ($event) => vueExports.isRef(selectedPreset) ? selectedPreset.value = $event : null,
                              items: vueExports.unref(presets),
                              "value-key": "value"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode("div", { class: "grid gap-4 sm:grid-cols-[0.3fr_0.7fr]" }, [
                          vueExports.createVNode(_component_UFormField, { label: "Метод" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_USelectMenu, {
                                modelValue: vueExports.unref(form).method,
                                "onUpdate:modelValue": ($event) => vueExports.unref(form).method = $event,
                                items: [
                                  { label: "GET", value: "GET" },
                                  { label: "POST", value: "POST" },
                                  { label: "PATCH", value: "PATCH" },
                                  { label: "PUT", value: "PUT" },
                                  { label: "DELETE", value: "DELETE" }
                                ],
                                "value-key": "value"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          vueExports.createVNode(_component_UFormField, { label: "Путь" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UInput, {
                                modelValue: vueExports.unref(form).path,
                                "onUpdate:modelValue": ($event) => vueExports.unref(form).path = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        vueExports.createVNode(_component_UFormField, { label: "Тело JSON" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UTextarea, {
                              modelValue: vueExports.unref(form).body,
                              "onUpdate:modelValue": ($event) => vueExports.unref(form).body = $event,
                              rows: 8
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "primary",
                          icon: "i-lucide-play",
                          onClick: executeRequest
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Выполнить запрос ")
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.unref(result) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedJsonBlock, {
                    key: 0,
                    label: "Последний ответ",
                    value: vueExports.unref(result)
                  }, null, 8, ["value"])) : vueExports.createCommentVNode("", true)
                ]),
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  header: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "space-y-2" }, [
                      vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Последние клиентские запросы "),
                      vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Поток отладки ")
                    ])
                  ]),
                  default: vueExports.withCtx(() => [
                    vueExports.unref(uiStore).apiDebugEntries.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      class: "space-y-3"
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(uiStore).apiDebugEntries, (entry) => {
                        return vueExports.openBlock(), vueExports.createBlock("div", {
                          key: `${entry.at}-${entry.url}`,
                          class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"
                        }, [
                          vueExports.createVNode("div", { class: "flex flex-wrap items-center justify-between gap-3" }, [
                            vueExports.createVNode("div", null, [
                              vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(entry.method) + " " + vueExports.toDisplayString(entry.url), 1),
                              vueExports.createVNode("p", { class: "text-xs uppercase tracking-[0.18em] text-charcoal-500" }, vueExports.toDisplayString(entry.at), 1)
                            ]),
                            vueExports.createVNode(_component_SharedStatusBadge, {
                              label: entry.status
                            }, null, 8, ["label"])
                          ]),
                          vueExports.createVNode("pre", { class: "mt-4 overflow-auto text-xs leading-6 text-charcoal-700" }, vueExports.toDisplayString(JSON.stringify(entry.response || entry.error, null, 2)), 1)
                        ]);
                      }), 128))
                    ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                      key: 1,
                      description: "Здесь будут отображаться последние клиентские запросы панели после использования интерфейса или запуска запроса с этой страницы.",
                      icon: "i-lucide-terminal",
                      title: "Записей отладки пока нет"
                    }))
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/api-debug.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/api-debug-B1XsfMBp');
//# sourceMappingURL=api-debug-B1XsfMBp.mjs.map
