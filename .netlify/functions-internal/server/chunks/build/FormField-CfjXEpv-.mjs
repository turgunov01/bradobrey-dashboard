globalThis.__timing__.logStart('Load chunks/build/FormField-CfjXEpv-');import { m as useForwardExpose, P as Primitive, h as useAppConfig, i as useComponentUI, t as tv, o as formErrorsInjectionKey, p as formInputsInjectionKey, q as inputIdInjectionKey, s as formFieldInjectionKey } from './server.mjs';
import { v as vueExports, s as ssrRenderComponent_1, b as ssrRenderClass_1, a as ssrRenderSlot_1, c as ssrInterpolate_1, i as ssrRenderAttr_1 } from '../routes/renderer.mjs';

//#region src/Label/Label.vue?vue&type=script&setup=true&lang.ts
var Label_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "Label",
	props: {
		for: {
			type: String,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "label"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { onMousedown: _cache[0] || (_cache[0] = (event) => {
				if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
			}) }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Label/Label.vue
var Label_default = Label_vue_vue_type_script_setup_true_lang_default;

const theme = {
  "slots": {
    "root": "",
    "wrapper": "",
    "labelWrapper": "flex content-center items-center justify-between gap-1",
    "label": "block font-medium text-default",
    "container": "relative",
    "description": "text-muted",
    "error": "mt-2 text-error",
    "hint": "text-muted",
    "help": "mt-2 text-muted"
  },
  "variants": {
    "size": {
      "xs": {
        "root": "text-xs"
      },
      "sm": {
        "root": "text-xs"
      },
      "md": {
        "root": "text-sm"
      },
      "lg": {
        "root": "text-sm"
      },
      "xl": {
        "root": "text-base"
      }
    },
    "required": {
      "true": {
        "label": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    },
    "orientation": {
      "vertical": {
        "container": "mt-1"
      },
      "horizontal": {
        "root": "flex justify-between place-items-baseline gap-2"
      }
    }
  },
  "defaultVariants": {
    "size": "md",
    "orientation": "vertical"
  }
};
const _sfc_main = {
  __name: "UFormField",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    name: { type: String, required: false },
    errorPattern: { type: null, required: false },
    label: { type: String, required: false },
    description: { type: String, required: false },
    help: { type: String, required: false },
    error: { type: [Boolean, String], required: false, default: void 0 },
    hint: { type: String, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    eagerValidation: { type: Boolean, required: false },
    validateOnInputDelay: { type: Number, required: false },
    orientation: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("formField", props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.formField || {} })({
      size: props.size,
      required: props.required,
      orientation: props.orientation
    }));
    const formErrors = vueExports.inject(formErrorsInjectionKey, null);
    const error = vueExports.computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
    const id = vueExports.ref(vueExports.useId());
    const ariaId = id.value;
    const formInputs = vueExports.inject(formInputsInjectionKey, void 0);
    vueExports.watch(id, () => {
      if (formInputs && props.name) {
        formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
      }
    }, { immediate: true });
    vueExports.provide(inputIdInjectionKey, id);
    vueExports.provide(formFieldInjectionKey, vueExports.computed(() => ({
      error: error.value,
      name: props.name,
      size: props.size,
      eagerValidation: props.eagerValidation,
      validateOnInputDelay: props.validateOnInputDelay,
      errorPattern: props.errorPattern,
      hint: props.hint,
      description: props.description,
      help: props.help,
      ariaId
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        "data-orientation": __props.orientation,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper }))}"${_scopeId}>`);
            if (__props.label || !!slots.label) {
              _push2(`<div data-slot="labelWrapper" class="${ssrRenderClass_1(ui.value.labelWrapper({ class: vueExports.unref(uiProp)?.labelWrapper }))}"${_scopeId}>`);
              _push2(ssrRenderComponent_1(vueExports.unref(Label_default), {
                for: id.value,
                "data-slot": "label",
                class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "label", { label: __props.label }, () => {
                      _push3(`${ssrInterpolate_1(__props.label)}`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              if (__props.hint || !!slots.hint) {
                _push2(`<span${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-hint`)} data-slot="hint" class="${ssrRenderClass_1(ui.value.hint({ class: vueExports.unref(uiProp)?.hint }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, "hint", { hint: __props.hint }, () => {
                  _push2(`${ssrInterpolate_1(__props.hint)}`);
                }, _push2, _parent2, _scopeId);
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.description || !!slots.description) {
              _push2(`<p${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-description`)} data-slot="description" class="${ssrRenderClass_1(ui.value.description({ class: vueExports.unref(uiProp)?.description }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "description", { description: __props.description }, () => {
                _push2(`${ssrInterpolate_1(__props.description)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="${ssrRenderClass_1([(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: vueExports.unref(uiProp)?.container })])}"${_scopeId}>`);
            ssrRenderSlot_1(_ctx.$slots, "default", { error: error.value }, null, _push2, _parent2, _scopeId);
            if (props.error !== false && (typeof error.value === "string" && error.value || !!slots.error)) {
              _push2(`<div${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-error`)} data-slot="error" class="${ssrRenderClass_1(ui.value.error({ class: vueExports.unref(uiProp)?.error }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "error", { error: error.value }, () => {
                _push2(`${ssrInterpolate_1(error.value)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else if (__props.help || !!slots.help) {
              _push2(`<div${ssrRenderAttr_1("id", `${vueExports.unref(ariaId)}-help`)} data-slot="help" class="${ssrRenderClass_1(ui.value.help({ class: vueExports.unref(uiProp)?.help }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "help", { help: __props.help }, () => {
                _push2(`${ssrInterpolate_1(__props.help)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", {
                "data-slot": "wrapper",
                class: ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper })
              }, [
                __props.label || !!slots.label ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "labelWrapper",
                  class: ui.value.labelWrapper({ class: vueExports.unref(uiProp)?.labelWrapper })
                }, [
                  vueExports.createVNode(vueExports.unref(Label_default), {
                    for: id.value,
                    "data-slot": "label",
                    class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.renderSlot(_ctx.$slots, "label", { label: __props.label }, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(__props.label), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["for", "class"]),
                  __props.hint || !!slots.hint ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    id: `${vueExports.unref(ariaId)}-hint`,
                    "data-slot": "hint",
                    class: ui.value.hint({ class: vueExports.unref(uiProp)?.hint })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "hint", { hint: __props.hint }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(__props.hint), 1)
                    ])
                  ], 10, ["id"])) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                  key: 1,
                  id: `${vueExports.unref(ariaId)}-description`,
                  "data-slot": "description",
                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "description", { description: __props.description }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                  ])
                ], 10, ["id"])) : vueExports.createCommentVNode("", true)
              ], 2),
              vueExports.createVNode("div", {
                class: [(__props.label || !!slots.label || __props.description || !!slots.description) && ui.value.container({ class: vueExports.unref(uiProp)?.container })]
              }, [
                vueExports.renderSlot(_ctx.$slots, "default", { error: error.value }),
                props.error !== false && (typeof error.value === "string" && error.value || !!slots.error) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  id: `${vueExports.unref(ariaId)}-error`,
                  "data-slot": "error",
                  class: ui.value.error({ class: vueExports.unref(uiProp)?.error })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "error", { error: error.value }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(error.value), 1)
                  ])
                ], 10, ["id"])) : __props.help || !!slots.help ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  id: `${vueExports.unref(ariaId)}-help`,
                  "data-slot": "help",
                  class: ui.value.help({ class: vueExports.unref(uiProp)?.help })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "help", { help: __props.help }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(__props.help), 1)
                  ])
                ], 10, ["id"])) : vueExports.createCommentVNode("", true)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/FormField.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { Label_default as L, _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/FormField-CfjXEpv-');
//# sourceMappingURL=FormField-CfjXEpv-.mjs.map
