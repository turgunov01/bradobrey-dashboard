globalThis.__timing__.logStart('Load chunks/build/DashboardSidebarCollapse-DfgO2fN5');import { h as useAppConfig, i as useComponentUI, t as tv, P as Primitive, j as _sfc_main$f, k as useForwardProps, r as reactiveOmit, l as useLocale, d as _sfc_main$a } from './server.mjs';
import { u as useDashboard, a as useResizable, b as _sfc_main$2$1, c as _sfc_main$1$1 } from './Badge-CHxj5N7w.mjs';
import { c as createReusableTemplate } from './index-qsfWWCYt.mjs';
import { v as vueExports, h as ssrRenderAttrs_1, a as ssrRenderSlot_1, b as ssrRenderClass_1, s as ssrRenderComponent_1, c as ssrInterpolate_1 } from '../routes/renderer.mjs';

const theme$2 = {
  "slots": {
    "root": "relative flex flex-col min-w-0 min-h-svh lg:not-last:border-e lg:not-last:border-default shrink-0",
    "body": "flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6",
    "handle": ""
  },
  "variants": {
    "size": {
      "true": {
        "root": "w-full lg:w-(--width)"
      },
      "false": {
        "root": "flex-1"
      }
    }
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardPanel",
  __ssrInlineRender: true,
  props: {
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    id: { type: String, required: false },
    minSize: { type: Number, required: false, default: 15 },
    maxSize: { type: Number, required: false },
    defaultSize: { type: Number, required: false },
    resizable: { type: Boolean, required: false, default: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardPanel", props);
    const dashboardContext = useDashboard({ storageKey: "dashboard", unit: "%" });
    const id = `${dashboardContext.storageKey}-panel-${props.id || vueExports.useId()}`;
    const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, vueExports.toRef(() => ({ ...dashboardContext, ...props })));
    const ui = vueExports.computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.dashboardPanel || {} })({
      size: !!size.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div${ssrRenderAttrs_1(vueExports.mergeProps({
        id,
        ref_key: "el",
        ref: el
      }, _ctx.$attrs, {
        "data-dragging": vueExports.unref(isDragging),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] }),
        style: [vueExports.unref(size) ? { "--width": `${vueExports.unref(size)}${vueExports.unref(dashboardContext).unit}` } : void 0]
      }))}>`);
      ssrRenderSlot_1(_ctx.$slots, "default", {}, () => {
        ssrRenderSlot_1(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(uiProp)?.body }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push, _parent);
        _push(`</div>`);
        ssrRenderSlot_1(_ctx.$slots, "footer", {}, null, _push, _parent);
      }, _push, _parent);
      _push(`</div>`);
      ssrRenderSlot_1(_ctx.$slots, "resize-handle", {
        onMouseDown: vueExports.unref(onMouseDown),
        onTouchStart: vueExports.unref(onTouchStart),
        onDoubleClick: vueExports.unref(onDoubleClick)
      }, () => {
        if (__props.resizable) {
          _push(ssrRenderComponent_1(_sfc_main$2$1, {
            "aria-controls": id,
            "data-slot": "handle",
            class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle }),
            onMousedown: vueExports.unref(onMouseDown),
            onTouchstart: vueExports.unref(onTouchStart),
            onDblclick: vueExports.unref(onDoubleClick)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardPanel.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "root": "h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5",
    "left": "flex items-center gap-1.5 min-w-0",
    "icon": "shrink-0 size-5 self-center me-1.5",
    "title": "flex items-center gap-1.5 font-semibold text-highlighted truncate",
    "center": "hidden lg:flex",
    "right": "flex items-center shrink-0 gap-1.5",
    "toggle": ""
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": ""
      }
    }
  }
};
const _sfc_main$1 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardNavbar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    icon: { type: null, required: false },
    title: { type: String, required: false },
    toggle: { type: [Boolean, Object], required: false, default: true },
    toggleSide: { type: String, required: false, default: "left" },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardNavbar", props);
    const dashboardContext = useDashboard({});
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.dashboardNavbar || {} })());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineToggleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "toggle", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => {
              if (__props.toggle) {
                _push2(ssrRenderComponent_1(_sfc_main$1$1, vueExports.mergeProps(typeof __props.toggle === "object" ? __props.toggle : {}, {
                  side: __props.toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(uiProp)?.toggle, toggleSide: __props.toggleSide })
                }), null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "toggle", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => [
                __props.toggle ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$1, vueExports.mergeProps({ key: 0 }, typeof __props.toggle === "object" ? __props.toggle : {}, {
                  side: __props.toggleSide,
                  "data-slot": "toggle",
                  class: ui.value.toggle({ class: vueExports.unref(uiProp)?.toggle, toggleSide: __props.toggleSide })
                }), null, 16, ["side", "class"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({ as: __props.as }, _ctx.$attrs, {
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="left" class="${ssrRenderClass_1(ui.value.left({ class: vueExports.unref(uiProp)?.left }))}"${_scopeId}>`);
            if (__props.toggleSide === "left") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot_1(_ctx.$slots, "left", vueExports.unref(dashboardContext), () => {
              ssrRenderSlot_1(_ctx.$slots, "leading", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => {
                if (__props.icon) {
                  _push2(ssrRenderComponent_1(_sfc_main$f, {
                    name: __props.icon,
                    "data-slot": "icon",
                    class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(`<h1 data-slot="title" class="${ssrRenderClass_1(ui.value.title({ class: vueExports.unref(uiProp)?.title }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                _push2(`${ssrInterpolate_1(__props.title)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</h1>`);
              ssrRenderSlot_1(_ctx.$slots, "trailing", { ...vueExports.unref(dashboardContext), ui: ui.value }, null, _push2, _parent2, _scopeId);
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            if (!!slots.default) {
              _push2(`<div data-slot="center" class="${ssrRenderClass_1(ui.value.center({ class: vueExports.unref(uiProp)?.center }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "default", vueExports.unref(dashboardContext), null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-slot="right" class="${ssrRenderClass_1(ui.value.right({ class: vueExports.unref(uiProp)?.right }))}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "right", vueExports.unref(dashboardContext), null, _push2, _parent2, _scopeId);
            if (__props.toggleSide === "right") {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "left",
                class: ui.value.left({ class: vueExports.unref(uiProp)?.left })
              }, [
                __props.toggleSide === "left" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                vueExports.renderSlot(_ctx.$slots, "left", vueExports.unref(dashboardContext), () => [
                  vueExports.renderSlot(_ctx.$slots, "leading", { ...vueExports.unref(dashboardContext), ui: ui.value }, () => [
                    __props.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                      key: 0,
                      name: __props.icon,
                      "data-slot": "icon",
                      class: ui.value.icon({ class: vueExports.unref(uiProp)?.icon })
                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.createVNode("h1", {
                    "data-slot": "title",
                    class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                    ])
                  ], 2),
                  vueExports.renderSlot(_ctx.$slots, "trailing", { ...vueExports.unref(dashboardContext), ui: ui.value })
                ])
              ], 2),
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "center",
                class: ui.value.center({ class: vueExports.unref(uiProp)?.center })
              }, [
                vueExports.renderSlot(_ctx.$slots, "default", vueExports.unref(dashboardContext))
              ], 2)) : vueExports.createCommentVNode("", true),
              vueExports.createVNode("div", {
                "data-slot": "right",
                class: ui.value.right({ class: vueExports.unref(uiProp)?.right })
              }, [
                vueExports.renderSlot(_ctx.$slots, "right", vueExports.unref(dashboardContext)),
                __props.toggleSide === "right" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardNavbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "base": "hidden lg:flex",
  "variants": {
    "side": {
      "left": "",
      "right": ""
    }
  }
};
const _sfc_main = {
  __name: "UDashboardSidebarCollapse",
  __ssrInlineRender: true,
  props: {
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "ghost" },
    side: { type: String, required: false, default: "left" },
    ui: { type: Object, required: false },
    label: { type: String, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
    class: { type: null, required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    as: { type: null, required: false },
    type: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    exactActiveClass: { type: String, required: false },
    viewTransition: { type: Boolean, required: false }
  },
  setup(__props) {
    const props = __props;
    const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardSidebarCollapse", props);
    const { sidebarCollapsed, collapseSidebar } = useDashboard({ sidebarCollapsed: vueExports.ref(false), collapseSidebar: () => {
    } });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dashboardSidebarCollapse || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(_sfc_main$a, vueExports.mergeProps({
        ...vueExports.unref(buttonProps),
        "icon": props.icon || (vueExports.unref(sidebarCollapsed) ? vueExports.unref(appConfig).ui.icons.panelOpen : vueExports.unref(appConfig).ui.icons.panelClose),
        "aria-label": vueExports.unref(sidebarCollapsed) ? vueExports.unref(t)("dashboardSidebarCollapse.expand") : vueExports.unref(t)("dashboardSidebarCollapse.collapse"),
        ..._ctx.$attrs
      }, {
        class: ui.value({ class: [vueExports.unref(uiProp)?.base, props.class], side: props.side }),
        onClick: ($event) => vueExports.unref(collapseSidebar)?.(!vueExports.unref(sidebarCollapsed))
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebarCollapse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main$1 as a, _sfc_main as b };;globalThis.__timing__.logEnd('Load chunks/build/DashboardSidebarCollapse-DfgO2fN5');
//# sourceMappingURL=DashboardSidebarCollapse-DfgO2fN5.mjs.map
