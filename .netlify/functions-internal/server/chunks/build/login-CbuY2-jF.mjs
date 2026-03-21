globalThis.__timing__.logStart('Load chunks/build/login-CbuY2-jF');import { f as useSessionStore, c as _sfc_main$3, d as _sfc_main$a, e as useApiClient, n as navigateTo } from './server.mjs';
import { _ as _sfc_main$1 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$2 } from './Input-DcPP1NGC.mjs';
import { l as loginSchema } from '../_/index.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { v as vueExports, s as ssrRenderComponent_1 } from '../routes/renderer.mjs';
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
import './index-qsfWWCYt.mjs';
import './useKioskApi-l3XfHmhL.mjs';
import 'node:stream';

const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const branchStore = useBranchStore();
    const sessionStore = useSessionStore();
    const form = vueExports.reactive({
      branch_id: branchStore.activeBranchId || null,
      login: "",
      password: ""
    });
    const fieldErrors = vueExports.reactive({
      login: "",
      password: ""
    });
    const loading = vueExports.ref(false);
    function resetFieldErrors() {
      fieldErrors.login = "";
      fieldErrors.password = "";
    }
    function applyFieldErrors(issues) {
      resetFieldErrors();
      for (const issue of issues) {
        const field = String(issue.path[0] || "");
        if ((field === "login" || field === "password") && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
    }
    async function submit() {
      resetFieldErrors();
      const parsed = loginSchema.safeParse(form);
      if (!parsed.success) {
        applyFieldErrors(parsed.error.issues);
        useApiClient().notifyError(new Error(parsed.error.issues[0]?.message || "Некорректные данные для входа"));
        return;
      }
      loading.value = true;
      try {
        await sessionStore.login(parsed.data);
        const sessionBranchId = sessionStore.barber?.branch_id || parsed.data.branch_id || null;
        if (sessionBranchId) {
          branchStore.setActiveBranch(sessionBranchId);
        }
        await navigateTo("/");
      } catch (error) {
        fieldErrors.password = error?.statusMessage || error?.message || "Неверный логин или пароль.";
      } finally {
        loading.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$3;
      const _component_UFormField = _sfc_main$1;
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$a;
      _push(ssrRenderComponent_1(_component_UCard, vueExports.mergeProps({ class: "warm-card w-full max-w-md rounded-[2.25rem] border border-charcoal-200 shadow-[0_24px_70px_rgba(18,15,13,0.10)]" }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form class="space-y-5"${_scopeId}><div class="space-y-1"${_scopeId}><h1 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId}> Вход </h1></div>`);
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "Логин",
              name: "login",
              error: vueExports.unref(fieldErrors).login
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(form).login,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).login = $event,
                    autocomplete: "username",
                    autofocus: "",
                    class: "w-full",
                    placeholder: "Введите логин"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).login,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).login = $event,
                      autocomplete: "username",
                      autofocus: "",
                      class: "w-full",
                      placeholder: "Введите логин"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UFormField, {
              label: "Пароль",
              name: "password",
              error: vueExports.unref(fieldErrors).password
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UInput, {
                    modelValue: vueExports.unref(form).password,
                    "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                    autocomplete: "current-password",
                    class: "w-full",
                    placeholder: "Введите пароль",
                    type: "password"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                      autocomplete: "current-password",
                      class: "w-full",
                      placeholder: "Введите пароль",
                      type: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="pt-1"${_scopeId}>`);
            _push2(ssrRenderComponent_1(_component_UButton, {
              block: "",
              loading: vueExports.unref(loading),
              color: "primary",
              size: "lg",
              type: "submit"
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Войти `);
                } else {
                  return [
                    vueExports.createTextVNode(" Войти ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              vueExports.createVNode("form", {
                class: "space-y-5",
                onSubmit: vueExports.withModifiers(submit, ["prevent"])
              }, [
                vueExports.createVNode("div", { class: "space-y-1" }, [
                  vueExports.createVNode("h1", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Вход ")
                ]),
                vueExports.createVNode(_component_UFormField, {
                  label: "Логин",
                  name: "login",
                  error: vueExports.unref(fieldErrors).login
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).login,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).login = $event,
                      autocomplete: "username",
                      autofocus: "",
                      class: "w-full",
                      placeholder: "Введите логин"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                vueExports.createVNode(_component_UFormField, {
                  label: "Пароль",
                  name: "password",
                  error: vueExports.unref(fieldErrors).password
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode(_component_UInput, {
                      modelValue: vueExports.unref(form).password,
                      "onUpdate:modelValue": ($event) => vueExports.unref(form).password = $event,
                      autocomplete: "current-password",
                      class: "w-full",
                      placeholder: "Введите пароль",
                      type: "password"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }, 8, ["error"]),
                vueExports.createVNode("div", { class: "pt-1" }, [
                  vueExports.createVNode(_component_UButton, {
                    block: "",
                    loading: vueExports.unref(loading),
                    color: "primary",
                    size: "lg",
                    type: "submit"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createTextVNode(" Войти ")
                    ]),
                    _: 1
                  }, 8, ["loading"])
                ])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/login-CbuY2-jF');
//# sourceMappingURL=login-CbuY2-jF.mjs.map
