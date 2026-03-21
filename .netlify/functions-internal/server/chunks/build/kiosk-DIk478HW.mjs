globalThis.__timing__.logStart('Load chunks/build/kiosk-DIk478HW');import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$7 } from './DashboardSidebarCollapse-DfgO2fN5.mjs';
import { m as useForwardExpose, E as useVModel, P as Primitive, F as createContext, K as Presence_default, aw as useResizeObserver, e as useApiClient, b as useAsyncData, c as _sfc_main$3, d as _sfc_main$a, h as useAppConfig, i as useComponentUI, J as useForwardPropsEmits, L as reactivePick, t as tv, R as get, j as _sfc_main$f, y as _sfc_main$d } from './server.mjs';
import { u as useDirection } from '../_/utils.mjs';
import { u as useId } from '../_/useId.mjs';
import { v as vueExports, s as ssrRenderComponent_1, c as ssrInterpolate_1, d as ssrRenderList_1, a as ssrRenderSlot_1, b as ssrRenderClass_1 } from '../routes/renderer.mjs';
import { R as RovingFocusGroup_default } from '../_/RovingFocusGroup.mjs';
import { R as RovingFocusItem_default } from '../_/RovingFocusItem.mjs';
import { _ as _sfc_main$8 } from './Badge-CHxj5N7w.mjs';
import { _ as _sfc_main$4 } from './Table-uigNOx9c.mjs';
import { _ as __nuxt_component_9 } from './EmptyState-Db7zOMDl.mjs';
import { _ as _sfc_main$5 } from './FormField-CfjXEpv-.mjs';
import { _ as _sfc_main$6 } from './Input-DcPP1NGC.mjs';
import { _ as __nuxt_component_10 } from './JsonBlock-DvPUbwNJ.mjs';
import { k as kioskBookingSchema, e as kioskRegisterSchema } from '../_/index.mjs';
import { f as flattenServicesPayload } from './services-D0S0WuHG.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { u as useKioskApi } from './useKioskApi-l3XfHmhL.mjs';
import { u as useRealtimeQueue } from './useRealtimeQueue-CK9yRiyf.mjs';
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
import 'node:stream';
import '../_/index2.mjs';

//#region src/Tabs/TabsRoot.vue?vue&type=script&setup=true&lang.ts
const [injectTabsRootContext, provideTabsRootContext] = createContext("TabsRoot");
var TabsRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TabsRoot",
	props: {
		defaultValue: {
			type: null,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		dir: {
			type: String,
			required: false
		},
		activationMode: {
			type: String,
			required: false,
			default: "automatic"
		},
		modelValue: {
			type: null,
			required: false
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { orientation, unmountOnHide, dir: propDir } = vueExports.toRefs(props);
		const dir = useDirection(propDir);
		useForwardExpose();
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue,
			passive: props.modelValue === void 0
		});
		const tabsList = vueExports.ref();
		const contentIds = vueExports.shallowRef(/* @__PURE__ */ new Set());
		provideTabsRootContext({
			modelValue,
			changeModelValue: (value) => {
				modelValue.value = value;
			},
			orientation,
			dir,
			unmountOnHide,
			activationMode: props.activationMode,
			baseId: useId(void 0, "reka-tabs"),
			tabsList,
			contentIds,
			registerContent: (value) => {
				contentIds.value = new Set([...contentIds.value, value]);
			},
			unregisterContent: (value) => {
				const newSet = new Set(contentIds.value);
				newSet.delete(value);
				contentIds.value = newSet;
			}
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				dir: vueExports.unref(dir),
				"data-orientation": vueExports.unref(orientation),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
				_: 3
			}, 8, [
				"dir",
				"data-orientation",
				"as-child",
				"as"
			]);
		};
	}
});

//#endregion
//#region src/Tabs/TabsRoot.vue
var TabsRoot_default = TabsRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Tabs/utils.ts
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}

//#region src/Tabs/TabsContent.vue?vue&type=script&setup=true&lang.ts
var TabsContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TabsContent",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		forceMount: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = vueExports.computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = vueExports.computed(() => makeContentId(rootContext.baseId, props.value));
		const isSelected = vueExports.computed(() => props.value === rootContext.modelValue.value);
		const isMountAnimationPreventedRef = vueExports.ref(isSelected.value);
		vueExports.onMounted(() => {
			rootContext.registerContent(props.value);
			requestAnimationFrame(() => {
				isMountAnimationPreventedRef.value = false;
			});
		});
		vueExports.onBeforeUnmount(() => {
			rootContext.unregisterContent(props.value);
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
				present: _ctx.forceMount || isSelected.value,
				"force-mount": ""
			}, {
				default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), {
					id: contentId.value,
					ref: vueExports.unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					role: "tabpanel",
					"data-state": isSelected.value ? "active" : "inactive",
					"data-orientation": vueExports.unref(rootContext).orientation.value,
					"aria-labelledby": triggerId.value,
					hidden: !present,
					tabindex: "0",
					style: vueExports.normalizeStyle({ animationDuration: isMountAnimationPreventedRef.value ? "0s" : void 0 })
				}, {
					default: vueExports.withCtx(() => [(vueExports.unref(rootContext).unmountOnHide.value ? present : true) ? vueExports.renderSlot(_ctx.$slots, "default", { key: 0 }) : vueExports.createCommentVNode("v-if", true)]),
					_: 2
				}, 1032, [
					"id",
					"as-child",
					"as",
					"data-state",
					"data-orientation",
					"aria-labelledby",
					"hidden",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Tabs/TabsContent.vue
var TabsContent_default = TabsContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Tabs/TabsIndicator.vue?vue&type=script&setup=true&lang.ts
var TabsIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TabsIndicator",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const context = injectTabsRootContext();
		__expose({ updateIndicatorStyle });
		useForwardExpose();
		const indicatorStyle = vueExports.ref({
			size: null,
			position: null
		});
		const tabs = vueExports.ref([]);
		vueExports.watch(() => [context.modelValue.value, context?.dir.value], () => {
			updateIndicatorStyle();
		}, {
			immediate: true,
			flush: "post"
		});
		vueExports.watchPostEffect(() => {
			tabs.value = Array.from(context.tabsList.value?.querySelectorAll("[role=\"tab\"]") || []);
		});
		useResizeObserver(vueExports.computed(() => [context.tabsList.value, ...tabs.value]), updateIndicatorStyle);
		function updateIndicatorStyle() {
			const activeTab = context.tabsList.value?.querySelector("[role=\"tab\"][data-state=\"active\"]");
			if (!activeTab) return;
			if (context.orientation.value === "horizontal") indicatorStyle.value = {
				size: activeTab.offsetWidth,
				position: activeTab.offsetLeft
			};
			else indicatorStyle.value = {
				size: activeTab.offsetHeight,
				position: activeTab.offsetTop
			};
		}
		return (_ctx, _cache) => {
			return typeof indicatorStyle.value.size === "number" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ key: 0 }, props, { style: {
				"--reka-tabs-indicator-size": `${indicatorStyle.value.size}px`,
				"--reka-tabs-indicator-position": `${indicatorStyle.value.position}px`
			} }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["style"])) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Tabs/TabsIndicator.vue
var TabsIndicator_default = TabsIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/Tabs/TabsList.vue?vue&type=script&setup=true&lang.ts
var TabsList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TabsList",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: true
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const { loop } = vueExports.toRefs(props);
		const { forwardRef, currentElement } = useForwardExpose();
		const context = injectTabsRootContext();
		context.tabsList = currentElement;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(RovingFocusGroup_default), {
				"as-child": "",
				orientation: vueExports.unref(context).orientation.value,
				dir: vueExports.unref(context).dir.value,
				loop: vueExports.unref(loop)
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					ref: vueExports.unref(forwardRef),
					role: "tablist",
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"aria-orientation": vueExports.unref(context).orientation.value
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"aria-orientation"
				])]),
				_: 3
			}, 8, [
				"orientation",
				"dir",
				"loop"
			]);
		};
	}
});

//#endregion
//#region src/Tabs/TabsList.vue
var TabsList_default = TabsList_vue_vue_type_script_setup_true_lang_default;

//#region src/Tabs/TabsTrigger.vue?vue&type=script&setup=true&lang.ts
var TabsTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TabsTrigger",
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const { forwardRef } = useForwardExpose();
		const rootContext = injectTabsRootContext();
		const triggerId = vueExports.computed(() => makeTriggerId(rootContext.baseId, props.value));
		const contentId = vueExports.computed(() => rootContext.contentIds.value.has(props.value) ? makeContentId(rootContext.baseId, props.value) : void 0);
		const isSelected = vueExports.computed(() => props.value === rootContext.modelValue.value);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(RovingFocusItem_default), {
				"as-child": "",
				focusable: !_ctx.disabled,
				active: isSelected.value
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					id: triggerId.value,
					ref: vueExports.unref(forwardRef),
					role: "tab",
					type: _ctx.as === "button" ? "button" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-selected": isSelected.value ? "true" : "false",
					"aria-controls": contentId.value,
					"data-state": isSelected.value ? "active" : "inactive",
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-orientation": vueExports.unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = vueExports.withModifiers((event) => {
						if (!_ctx.disabled && event.ctrlKey === false) vueExports.unref(rootContext).changeModelValue(_ctx.value);
						else event.preventDefault();
					}, ["left"])),
					onKeydown: _cache[1] || (_cache[1] = vueExports.withKeys(($event) => vueExports.unref(rootContext).changeModelValue(_ctx.value), ["enter", "space"])),
					onFocus: _cache[2] || (_cache[2] = () => {
						const isAutomaticActivation = vueExports.unref(rootContext).activationMode !== "manual";
						if (!isSelected.value && !_ctx.disabled && isAutomaticActivation) vueExports.unref(rootContext).changeModelValue(_ctx.value);
					})
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as",
					"as-child",
					"aria-selected",
					"aria-controls",
					"data-state",
					"disabled",
					"data-disabled",
					"data-orientation"
				])]),
				_: 3
			}, 8, ["focusable", "active"]);
		};
	}
});

//#endregion
//#region src/Tabs/TabsTrigger.vue
var TabsTrigger_default = TabsTrigger_vue_vue_type_script_setup_true_lang_default;

const theme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "focus:outline-none w-full"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": "grow",
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "focus:outline-none"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": "data-[state=active]:text-primary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": "data-[state=active]:text-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": "data-[state=active]:text-success focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": "data-[state=active]:text-info focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": "data-[state=active]:text-warning focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": "data-[state=active]:text-error focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": "data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "UTabs",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    items: { type: Array, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    content: { type: Boolean, required: false, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultValue: { type: [String, Number], required: false, default: "0" },
    modelValue: { type: [String, Number], required: false },
    activationMode: { type: String, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("tabs", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "unmountOnHide"), emits);
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tabs || {} })({
      color: props.color,
      variant: props.variant,
      size: props.size,
      orientation: props.orientation
    }));
    const triggersRef = vueExports.ref([]);
    function setTriggerRef(index, el) {
      triggersRef.value[index] = el;
    }
    __expose({
      triggersRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(TabsRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        "activation-mode": __props.activationMode,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(vueExports.unref(TabsList_default), {
              "data-slot": "list",
              class: ui.value.list({ class: vueExports.unref(uiProp)?.list })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(TabsIndicator_default), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: vueExports.unref(uiProp)?.indicator })
                  }, null, _parent3, _scopeId2));
                  ssrRenderSlot_1(_ctx.$slots, "list-leading", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`<!--[-->`);
                  ssrRenderList_1(__props.items, (item, index) => {
                    _push3(ssrRenderComponent_1(vueExports.unref(TabsTrigger_default), {
                      key: index,
                      ref_for: true,
                      ref: (el) => setTriggerRef(index, el),
                      value: vueExports.unref(get)(item, props.valueKey) ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [vueExports.unref(uiProp)?.trigger, item.ui?.trigger] })
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot_1(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.icon) {
                              _push4(ssrRenderComponent_1(_sfc_main$f, {
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [vueExports.unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, _parent4, _scopeId3));
                            } else if (item.avatar) {
                              _push4(ssrRenderComponent_1(_sfc_main$d, vueExports.mergeProps({
                                size: item.ui?.leadingAvatarSize || vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [vueExports.unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          if (vueExports.unref(get)(item, props.labelKey) || !!slots.default) {
                            _push4(`<span data-slot="label" class="${ssrRenderClass_1(ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label] }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => {
                              _push4(`${ssrInterpolate_1(vueExports.unref(get)(item, props.labelKey))}`);
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          ssrRenderSlot_1(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => {
                            if (item.badge || item.badge === 0) {
                              _push4(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || vueExports.unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [vueExports.unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            vueExports.renderSlot(_ctx.$slots, "leading", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                                key: 0,
                                name: item.icon,
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: [vueExports.unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                              }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                                key: 1,
                                size: item.ui?.leadingAvatarSize || vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                              }, { ref_for: true }, item.avatar, {
                                "data-slot": "leadingAvatar",
                                class: ui.value.leadingAvatar({ class: [vueExports.unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ]),
                            vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label] })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "default", {
                                item,
                                index
                              }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.renderSlot(_ctx.$slots, "trailing", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                                key: 0,
                                color: "neutral",
                                variant: "outline",
                                size: item.ui?.trailingBadgeSize || vueExports.unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                              }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                                "data-slot": "trailingBadge",
                                class: ui.value.trailingBadge({ class: [vueExports.unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  ssrRenderSlot_1(_ctx.$slots, "list-trailing", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(TabsIndicator_default), {
                      "data-slot": "indicator",
                      class: ui.value.indicator({ class: vueExports.unref(uiProp)?.indicator })
                    }, null, 8, ["class"]),
                    vueExports.renderSlot(_ctx.$slots, "list-leading"),
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsTrigger_default), {
                        key: index,
                        ref_for: true,
                        ref: (el) => setTriggerRef(index, el),
                        value: vueExports.unref(get)(item, props.valueKey) ?? String(index),
                        disabled: item.disabled,
                        "data-slot": "trigger",
                        class: ui.value.trigger({ class: [vueExports.unref(uiProp)?.trigger, item.ui?.trigger] })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "leading", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                              key: 0,
                              name: item.icon,
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: [vueExports.unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                            }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                              key: 1,
                              size: item.ui?.leadingAvatarSize || vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                            }, { ref_for: true }, item.avatar, {
                              "data-slot": "leadingAvatar",
                              class: ui.value.leadingAvatar({ class: [vueExports.unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ]),
                          vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "default", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "trailing", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                              key: 0,
                              color: "neutral",
                              variant: "outline",
                              size: item.ui?.trailingBadgeSize || vueExports.unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                            }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                              "data-slot": "trailingBadge",
                              class: ui.value.trailingBadge({ class: [vueExports.unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["value", "disabled", "class"]);
                    }), 128)),
                    vueExports.renderSlot(_ctx.$slots, "list-trailing")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!__props.content) {
              _push2(`<!--[-->`);
              ssrRenderList_1(__props.items, (item, index) => {
                _push2(ssrRenderComponent_1(vueExports.unref(TabsContent_default), {
                  key: index,
                  value: vueExports.unref(get)(item, props.valueKey) ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content, item.class] })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, item.slot || "content", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        _push3(`${ssrInterpolate_1(item.content)}`);
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.createVNode(vueExports.unref(TabsList_default), {
                "data-slot": "list",
                class: ui.value.list({ class: vueExports.unref(uiProp)?.list })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(TabsIndicator_default), {
                    "data-slot": "indicator",
                    class: ui.value.indicator({ class: vueExports.unref(uiProp)?.indicator })
                  }, null, 8, ["class"]),
                  vueExports.renderSlot(_ctx.$slots, "list-leading"),
                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.items, (item, index) => {
                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsTrigger_default), {
                      key: index,
                      ref_for: true,
                      ref: (el) => setTriggerRef(index, el),
                      value: vueExports.unref(get)(item, props.valueKey) ?? String(index),
                      disabled: item.disabled,
                      "data-slot": "trigger",
                      class: ui.value.trigger({ class: [vueExports.unref(uiProp)?.trigger, item.ui?.trigger] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: [vueExports.unref(uiProp)?.leadingIcon, item.ui?.leadingIcon] })
                          }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                            key: 1,
                            size: item.ui?.leadingAvatarSize || vueExports.unref(uiProp)?.leadingAvatarSize || ui.value.leadingAvatarSize()
                          }, { ref_for: true }, item.avatar, {
                            "data-slot": "leadingAvatar",
                            class: ui.value.leadingAvatar({ class: [vueExports.unref(uiProp)?.leadingAvatar, item.ui?.leadingAvatar] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.unref(get)(item, props.labelKey) || !!slots.default ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "label",
                          class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label] })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "default", {
                            item,
                            index
                          }, () => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "trailing", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.trailingBadgeSize || vueExports.unref(uiProp)?.trailingBadgeSize || ui.value.trailingBadgeSize()
                          }, { ref_for: true }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "trailingBadge",
                            class: ui.value.trailingBadge({ class: [vueExports.unref(uiProp)?.trailingBadge, item.ui?.trailingBadge] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "class"]);
                  }), 128)),
                  vueExports.renderSlot(_ctx.$slots, "list-trailing")
                ]),
                _: 3
              }, 8, ["class"]),
              !!__props.content ? (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 0 }, vueExports.renderList(__props.items, (item, index) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TabsContent_default), {
                  key: index,
                  value: vueExports.unref(get)(item, props.valueKey) ?? String(index),
                  "data-slot": "content",
                  class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content, item.class] })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, item.slot || "content", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(item.content), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["value", "class"]);
              }), 128)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Tabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "kiosk",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const branchStore = useBranchStore();
    const client = useApiClient();
    const kioskApi = useKioskApi();
    [__temp, __restore] = vueExports.withAsyncContext(() => branchStore.ensureLoaded()), await __temp, __restore();
    useRealtimeQueue();
    const activeTab = vueExports.ref("barbers");
    const bookingForm = vueExports.reactive({
      certificate_code: "",
      customer_name: "",
      payment_method: "cash",
      phone_number: "",
      source: "dashboard-kiosk"
    });
    const deviceName = vueExports.ref("Планшет ресепшена");
    const selectedBarberId = vueExports.ref("");
    const selectedServiceIds = vueExports.ref([]);
    const certificateCode = vueExports.ref("");
    const certificateResult = vueExports.ref(null);
    const bookingPending = vueExports.ref(false);
    const baseTabs = [
      { label: "Барберы", value: "barbers" },
      { label: "Услуги", value: "services" },
      { label: "Бронирование", value: "booking" }
    ];
    const { data, pending, refresh } = ([__temp, __restore] = vueExports.withAsyncContext(async () => useAsyncData("kiosk-dashboard", async () => {
      const [services, barbers] = await Promise.all([
        kioskApi.services({ active: true, grouped: true }),
        branchStore.activeBranchId ? kioskApi.barbers(branchStore.activeBranchId) : Promise.resolve({ data: [] })
      ]);
      return {
        barbers: Array.isArray(barbers?.data) ? barbers.data : [],
        services
      };
    }, {
      watch: [() => branchStore.activeBranchId]
    })), __temp = await __temp, __restore(), __temp);
    const allServices = vueExports.computed(() => flattenServicesPayload(data.value?.services));
    const barberRows = vueExports.computed(
      () => (data.value?.barbers || []).map((barber, index) => ({
        barberId: barber.id !== void 0 ? String(barber.id) : "",
        currentClients: barber.current_clients || 0,
        id: String(barber.id ?? barber.user_id ?? barber.name ?? `barber-${index}`),
        name: barber.name || barber.user?.name || "Барбер без имени",
        waitTime: barber.estimated_waiting_time || 0
      }))
    );
    const hasBarbers = vueExports.computed(() => barberRows.value.length > 0);
    const tabs = vueExports.computed(
      () => baseTabs.map(
        (tab) => tab.value === "barbers" ? tab : { ...tab, disabled: !hasBarbers.value }
      )
    );
    const serviceRows = vueExports.computed(
      () => allServices.value.map((service, index) => ({
        category: service.category || service.category_name || "Без категории",
        duration: Number(service.duration || 0),
        id: String(service.id ?? `service-${index}`),
        name: service.name || "Услуга без названия",
        price: service.price ?? 0,
        serviceId: service.id !== void 0 ? String(service.id) : ""
      }))
    );
    const barberColumns = [
      { accessorKey: "name", header: "Барбер" },
      { accessorKey: "currentClients", header: "Клиенты" },
      { accessorKey: "waitTime", header: "Ожидание" },
      { id: "action", header: "" }
    ];
    const serviceColumns = [
      { accessorKey: "category", header: "Категория" },
      { accessorKey: "name", header: "Услуга" },
      { accessorKey: "duration", header: "Длительность" },
      { accessorKey: "price", header: "Цена" },
      { id: "action", header: "" }
    ];
    const selectedBarber = vueExports.computed(
      () => (data.value?.barbers || []).find((barber) => String(barber.id) === selectedBarberId.value) || null
    );
    const selectedServices = vueExports.computed(
      () => allServices.value.filter((service) => selectedServiceIds.value.includes(String(service.id)))
    );
    vueExports.watch(
      barberRows,
      (rows) => {
        if (!rows.length) {
          selectedBarberId.value = "";
          return;
        }
        if (!rows.some((row) => row.barberId === selectedBarberId.value) && rows[0]?.barberId) {
          selectedBarberId.value = rows[0].barberId;
        }
      },
      { immediate: true }
    );
    vueExports.watch(
      hasBarbers,
      (value) => {
        if (!value && activeTab.value !== "barbers") {
          activeTab.value = "barbers";
        }
      },
      { immediate: true }
    );
    function selectBarber(barberId) {
      selectedBarberId.value = barberId;
    }
    function toggleService(serviceId) {
      if (!serviceId) {
        return;
      }
      if (selectedServiceIds.value.includes(serviceId)) {
        selectedServiceIds.value = selectedServiceIds.value.filter((id) => id !== serviceId);
        return;
      }
      selectedServiceIds.value = [...selectedServiceIds.value, serviceId];
    }
    function handleBarberSelect(_, row) {
      if (!row.original.barberId) {
        return;
      }
      selectBarber(row.original.barberId);
    }
    function handleServiceSelect(_, row) {
      if (!row.original.serviceId) {
        return;
      }
      toggleService(row.original.serviceId);
    }
    async function registerDevice() {
      const payload = kioskRegisterSchema.safeParse({
        branch_id: branchStore.activeBranchId,
        device_name: deviceName.value
      });
      if (!payload.success) {
        client.notifyError(new Error(payload.error.issues[0]?.message || "Некорректные данные регистрации киоска"));
        return;
      }
      await kioskApi.register(payload.data);
    }
    async function lookupCertificate() {
      if (!certificateCode.value) {
        client.notifyError(new Error("Введите код сертификата"));
        return;
      }
      certificateResult.value = await kioskApi.certificate(certificateCode.value);
    }
    async function createBooking() {
      const payload = kioskBookingSchema.safeParse({
        barber_id: selectedBarberId.value,
        branch_id: branchStore.activeBranchId,
        certificate_code: bookingForm.certificate_code || void 0,
        customer_name: bookingForm.customer_name,
        payment_method: bookingForm.payment_method || void 0,
        phone_number: bookingForm.phone_number,
        service_ids: selectedServiceIds.value,
        source: bookingForm.source
      });
      if (!payload.success) {
        client.notifyError(new Error(payload.error.issues[0]?.message || "Некорректные данные записи через киоск"));
        return;
      }
      bookingPending.value = true;
      try {
        await kioskApi.book(payload.data);
        bookingForm.certificate_code = "";
        bookingForm.customer_name = "";
        bookingForm.phone_number = "";
        selectedServiceIds.value = [];
        activeTab.value = "barbers";
        await refresh();
      } finally {
        bookingPending.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardPanel = _sfc_main$2;
      const _component_UDashboardNavbar = _sfc_main$1$1;
      const _component_UDashboardSidebarCollapse = _sfc_main$7;
      const _component_UButton = _sfc_main$a;
      const _component_UCard = _sfc_main$3;
      const _component_UTabs = _sfc_main$1;
      const _component_UTable = _sfc_main$4;
      const _component_SharedEmptyState = __nuxt_component_9;
      const _component_UFormField = _sfc_main$5;
      const _component_UInput = _sfc_main$6;
      const _component_SharedJsonBlock = __nuxt_component_10;
      _push(ssrRenderComponent_1(_component_UDashboardPanel, vueExports.mergeProps({ id: "kiosk" }, _attrs), {
        header: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardNavbar, {
              title: "Симулятор киоска",
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
                title: "Симулятор киоска",
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
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"${_scopeId2}><div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Активный филиал </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(branchStore).activeBranch?.name || "Выберите филиал в боковой панели")}</h2></div><div class="overflow-x-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(_component_UTabs, {
                    modelValue: vueExports.unref(activeTab),
                    "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                    content: false,
                    items: vueExports.unref(tabs),
                    ui: {
                      root: "min-w-max items-start",
                      list: "inline-flex w-max rounded-[1.35rem] bg-charcoal-100 p-1.5",
                      indicator: "rounded-[0.95rem] bg-primary shadow-none",
                      trigger: "h-11 rounded-[0.95rem] px-4 text-sm font-semibold data-[state=active]:text-inverted sm:text-[15px]",
                      label: "whitespace-nowrap"
                    }
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Активный филиал "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(branchStore).activeBranch?.name || "Выберите филиал в боковой панели"), 1)
                      ]),
                      vueExports.createVNode("div", { class: "overflow-x-auto" }, [
                        vueExports.createVNode(_component_UTabs, {
                          modelValue: vueExports.unref(activeTab),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                          content: false,
                          items: vueExports.unref(tabs),
                          ui: {
                            root: "min-w-max items-start",
                            list: "inline-flex w-max rounded-[1.35rem] bg-charcoal-100 p-1.5",
                            indicator: "rounded-[0.95rem] bg-primary shadow-none",
                            trigger: "h-11 rounded-[0.95rem] px-4 text-sm font-semibold data-[state=active]:text-inverted sm:text-[15px]",
                            label: "whitespace-nowrap"
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (vueExports.unref(activeTab) === "barbers") {
              _push2(`<section class="space-y-4"${_scopeId}>`);
              if (vueExports.unref(barberRows).length) {
                _push2(`<div class="overflow-hidden rounded-[1.5rem] border border-charcoal-200 bg-white/90"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UTable, {
                  columns: barberColumns,
                  data: vueExports.unref(barberRows),
                  "get-row-id": (row) => row.id,
                  loading: vueExports.unref(pending),
                  meta: {
                    class: {
                      tr: (row) => row.original.barberId === vueExports.unref(selectedBarberId) ? "bg-primary/10 cursor-pointer" : "cursor-pointer"
                    }
                  },
                  "on-select": handleBarberSelect,
                  sticky: "header",
                  ui: {
                    root: "max-h-[32rem] overflow-auto",
                    base: "min-w-[44rem]",
                    thead: "bg-charcoal-50/90",
                    tbody: "divide-y divide-charcoal-100 [&>tr]:data-[selectable=true]:hover:bg-charcoal-50/80",
                    th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                    td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                  }
                }, {
                  "name-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div${_scopeId2}><p class="font-medium text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.original.name)}</p><p class="text-xs text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбранный барбер" : "Нажмите, чтобы назначить")}</p></div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.name), 1),
                          vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбранный барбер" : "Нажмите, чтобы назначить"), 1)
                        ])
                      ];
                    }
                  }),
                  "waitTime-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="font-medium"${_scopeId2}>${ssrInterpolate_1(row.original.waitTime)} мин</span>`);
                    } else {
                      return [
                        vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.waitTime) + " мин", 1)
                      ];
                    }
                  }),
                  "action-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        color: row.original.barberId === vueExports.unref(selectedBarberId) ? "primary" : "neutral",
                        variant: row.original.barberId === vueExports.unref(selectedBarberId) ? "solid" : "outline",
                        size: "xs",
                        onClick: ($event) => selectBarber(row.original.barberId)
                      }, {
                        default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate_1(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбран" : "Выбрать")}`);
                          } else {
                            return [
                              vueExports.createTextVNode(vueExports.toDisplayString(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбран" : "Выбрать"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UButton, {
                          color: row.original.barberId === vueExports.unref(selectedBarberId) ? "primary" : "neutral",
                          variant: row.original.barberId === vueExports.unref(selectedBarberId) ? "solid" : "outline",
                          size: "xs",
                          onClick: ($event) => selectBarber(row.original.barberId)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбран" : "Выбрать"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color", "variant", "onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(ssrRenderComponent_1(_component_SharedEmptyState, {
                  description: "Для текущего контекста филиала не получен список барберов.",
                  icon: "i-lucide-scissors",
                  title: "Барберы недоступны"
                }, null, _parent2, _scopeId));
              }
              _push2(`</section>`);
            } else if (vueExports.unref(activeTab) === "services") {
              _push2(`<section class="space-y-4"${_scopeId}>`);
              if (vueExports.unref(serviceRows).length) {
                _push2(`<div class="overflow-hidden rounded-[1.5rem] border border-charcoal-200 bg-white/90"${_scopeId}>`);
                _push2(ssrRenderComponent_1(_component_UTable, {
                  columns: serviceColumns,
                  data: vueExports.unref(serviceRows),
                  "get-row-id": (row) => row.id,
                  loading: vueExports.unref(pending),
                  meta: {
                    class: {
                      tr: (row) => vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "bg-primary/10 cursor-pointer" : "cursor-pointer"
                    }
                  },
                  "on-select": handleServiceSelect,
                  sticky: "header",
                  ui: {
                    root: "max-h-[36rem] overflow-auto",
                    base: "min-w-[56rem]",
                    thead: "bg-charcoal-50/90",
                    tbody: "divide-y divide-charcoal-100 [&>tr]:data-[selectable=true]:hover:bg-charcoal-50/80",
                    th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                    td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                  }
                }, {
                  "name-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div${_scopeId2}><p class="font-medium text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(row.original.name)}</p><p class="text-xs text-charcoal-500"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Добавлено в запись" : "Доступно для добавления")}</p></div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.name), 1),
                          vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Добавлено в запись" : "Доступно для добавления"), 1)
                        ])
                      ];
                    }
                  }),
                  "duration-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="font-medium"${_scopeId2}>${ssrInterpolate_1(row.original.duration)} мин</span>`);
                    } else {
                      return [
                        vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.duration) + " мин", 1)
                      ];
                    }
                  }),
                  "action-cell": vueExports.withCtx(({ row }, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent_1(_component_UButton, {
                        color: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "primary" : "neutral",
                        variant: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "solid" : "outline",
                        size: "xs",
                        onClick: ($event) => toggleService(row.original.serviceId)
                      }, {
                        default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate_1(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Убрать" : "Добавить")}`);
                          } else {
                            return [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Убрать" : "Добавить"), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        vueExports.createVNode(_component_UButton, {
                          color: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "primary" : "neutral",
                          variant: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "solid" : "outline",
                          size: "xs",
                          onClick: ($event) => toggleService(row.original.serviceId)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Убрать" : "Добавить"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color", "variant", "onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(ssrRenderComponent_1(_component_SharedEmptyState, {
                  description: "Бэкенд не вернул услуги для киоска.",
                  icon: "i-lucide-badge-dollar-sign",
                  title: "Услуги недоступны"
                }, null, _parent2, _scopeId));
              }
              _push2(`</section>`);
            } else {
              _push2(`<section class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Бронирование </p><h2 class="barbershop-heading text-3xl text-charcoal-950"${_scopeId2}> Оформление записи через киоск </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Бронирование "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Оформление записи через киоск ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Имя клиента" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UInput, {
                            modelValue: vueExports.unref(bookingForm).customer_name,
                            "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).customer_name = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).customer_name,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).customer_name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Телефон" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UInput, {
                            modelValue: vueExports.unref(bookingForm).phone_number,
                            "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).phone_number = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).phone_number,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).phone_number = $event
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
                            modelValue: vueExports.unref(bookingForm).payment_method,
                            "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).payment_method = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).payment_method,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).payment_method = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Код сертификата" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UInput, {
                            modelValue: vueExports.unref(bookingForm).certificate_code,
                            "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).certificate_code = $event
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).certificate_code,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).certificate_code = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex justify-end"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UButton, {
                      loading: vueExports.unref(bookingPending),
                      color: "primary",
                      icon: "i-lucide-receipt",
                      onClick: createBooking
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Создать запись `);
                        } else {
                          return [
                            vueExports.createTextVNode(" Создать запись ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-4" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Имя клиента" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).customer_name,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).customer_name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Телефон" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).phone_number,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).phone_number = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Способ оплаты" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).payment_method,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).payment_method = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Код сертификата" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).certificate_code,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).certificate_code = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode("div", { class: "flex justify-end" }, [
                          vueExports.createVNode(_component_UButton, {
                            loading: vueExports.unref(bookingPending),
                            color: "primary",
                            icon: "i-lucide-receipt",
                            onClick: createBooking
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Создать запись ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="space-y-6"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Сводка записи </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Выбранный набор </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Сводка записи "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Выбранный набор ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-3"${_scopeId2}><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Барбер</p><p class="mt-2 text-lg font-semibold text-charcoal-950"${_scopeId2}>${ssrInterpolate_1(vueExports.unref(selectedBarber)?.name || "Не выбран")}</p></div><div class="rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500"${_scopeId2}>Услуги</p>`);
                    if (vueExports.unref(selectedServices).length) {
                      _push3(`<div class="mt-3 space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList_1(vueExports.unref(selectedServices), (service) => {
                        _push3(`<div class="rounded-[1rem] bg-sand-100 px-3 py-2 text-sm text-charcoal-700"${_scopeId2}>${ssrInterpolate_1(service.name)} / ${ssrInterpolate_1(service.duration || 0)} мин / ${ssrInterpolate_1(service.price || 0)}</div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<p class="mt-2 text-sm text-charcoal-500"${_scopeId2}>Услуги пока не выбраны.</p>`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-3" }, [
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Барбер"),
                          vueExports.createVNode("p", { class: "mt-2 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(selectedBarber)?.name || "Не выбран"), 1)
                        ]),
                        vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Услуги"),
                          vueExports.unref(selectedServices).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            class: "mt-3 space-y-2"
                          }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(selectedServices), (service) => {
                              return vueExports.openBlock(), vueExports.createBlock("div", {
                                key: String(service.id),
                                class: "rounded-[1rem] bg-sand-100 px-3 py-2 text-sm text-charcoal-700"
                              }, vueExports.toDisplayString(service.name) + " / " + vueExports.toDisplayString(service.duration || 0) + " мин / " + vueExports.toDisplayString(service.price || 0), 1);
                            }), 128))
                          ])) : (vueExports.openBlock(), vueExports.createBlock("p", {
                            key: 1,
                            class: "mt-2 text-sm text-charcoal-500"
                          }, "Услуги пока не выбраны."))
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                header: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500"${_scopeId2}> Инструменты </p><h2 class="barbershop-heading text-2xl text-charcoal-950"${_scopeId2}> Регистрация и поиск </h2></div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Инструменты "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Регистрация и поиск ")
                      ])
                    ];
                  }
                }),
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Имя устройства" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UInput, {
                            modelValue: vueExports.unref(deviceName),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(deviceName) ? deviceName.value = $event : null
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(deviceName),
                              "onUpdate:modelValue": ($event) => vueExports.isRef(deviceName) ? deviceName.value = $event : null
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent_1(_component_UButton, {
                      color: "neutral",
                      icon: "i-lucide-tablet-smartphone",
                      variant: "outline",
                      onClick: registerDevice
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Зарегистрировать устройство киоска `);
                        } else {
                          return [
                            vueExports.createTextVNode(" Зарегистрировать устройство киоска ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="soft-divider border-t pt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(_component_UFormField, { label: "Поиск сертификата" }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(_component_UInput, {
                            modelValue: vueExports.unref(certificateCode),
                            "onUpdate:modelValue": ($event) => vueExports.isRef(certificateCode) ? certificateCode.value = $event : null,
                            placeholder: "Код сертификата"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(certificateCode),
                              "onUpdate:modelValue": ($event) => vueExports.isRef(certificateCode) ? certificateCode.value = $event : null,
                              placeholder: "Код сертификата"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent_1(_component_UButton, {
                      class: "mt-3",
                      color: "neutral",
                      icon: "i-lucide-search",
                      variant: "outline",
                      onClick: lookupCertificate
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Найти сертификат `);
                        } else {
                          return [
                            vueExports.createTextVNode(" Найти сертификат ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (vueExports.unref(certificateResult)) {
                      _push3(ssrRenderComponent_1(_component_SharedJsonBlock, {
                        label: "Ответ сертификата",
                        value: vueExports.unref(certificateResult)
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      vueExports.createVNode("div", { class: "space-y-4" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Имя устройства" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(deviceName),
                              "onUpdate:modelValue": ($event) => vueExports.isRef(deviceName) ? deviceName.value = $event : null
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UButton, {
                          color: "neutral",
                          icon: "i-lucide-tablet-smartphone",
                          variant: "outline",
                          onClick: registerDevice
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(" Зарегистрировать устройство киоска ")
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode("div", { class: "soft-divider border-t pt-4" }, [
                          vueExports.createVNode(_component_UFormField, { label: "Поиск сертификата" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UInput, {
                                modelValue: vueExports.unref(certificateCode),
                                "onUpdate:modelValue": ($event) => vueExports.isRef(certificateCode) ? certificateCode.value = $event : null,
                                placeholder: "Код сертификата"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          vueExports.createVNode(_component_UButton, {
                            class: "mt-3",
                            color: "neutral",
                            icon: "i-lucide-search",
                            variant: "outline",
                            onClick: lookupCertificate
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Найти сертификат ")
                            ]),
                            _: 1
                          })
                        ]),
                        vueExports.unref(certificateResult) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedJsonBlock, {
                          key: 0,
                          label: "Ответ сертификата",
                          value: vueExports.unref(certificateResult)
                        }, null, 8, ["value"])) : vueExports.createCommentVNode("", true)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></section>`);
            }
            _push2(`</div>`);
          } else {
            return [
              vueExports.createVNode("div", { class: "space-y-6" }, [
                vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("div", { class: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" }, [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Активный филиал "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(branchStore).activeBranch?.name || "Выберите филиал в боковой панели"), 1)
                      ]),
                      vueExports.createVNode("div", { class: "overflow-x-auto" }, [
                        vueExports.createVNode(_component_UTabs, {
                          modelValue: vueExports.unref(activeTab),
                          "onUpdate:modelValue": ($event) => vueExports.isRef(activeTab) ? activeTab.value = $event : null,
                          content: false,
                          items: vueExports.unref(tabs),
                          ui: {
                            root: "min-w-max items-start",
                            list: "inline-flex w-max rounded-[1.35rem] bg-charcoal-100 p-1.5",
                            indicator: "rounded-[0.95rem] bg-primary shadow-none",
                            trigger: "h-11 rounded-[0.95rem] px-4 text-sm font-semibold data-[state=active]:text-inverted sm:text-[15px]",
                            label: "whitespace-nowrap"
                          }
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                vueExports.unref(activeTab) === "barbers" ? (vueExports.openBlock(), vueExports.createBlock("section", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  vueExports.unref(barberRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "overflow-hidden rounded-[1.5rem] border border-charcoal-200 bg-white/90"
                  }, [
                    vueExports.createVNode(_component_UTable, {
                      columns: barberColumns,
                      data: vueExports.unref(barberRows),
                      "get-row-id": (row) => row.id,
                      loading: vueExports.unref(pending),
                      meta: {
                        class: {
                          tr: (row) => row.original.barberId === vueExports.unref(selectedBarberId) ? "bg-primary/10 cursor-pointer" : "cursor-pointer"
                        }
                      },
                      "on-select": handleBarberSelect,
                      sticky: "header",
                      ui: {
                        root: "max-h-[32rem] overflow-auto",
                        base: "min-w-[44rem]",
                        thead: "bg-charcoal-50/90",
                        tbody: "divide-y divide-charcoal-100 [&>tr]:data-[selectable=true]:hover:bg-charcoal-50/80",
                        th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                        td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                      }
                    }, {
                      "name-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.name), 1),
                          vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбранный барбер" : "Нажмите, чтобы назначить"), 1)
                        ])
                      ]),
                      "waitTime-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.waitTime) + " мин", 1)
                      ]),
                      "action-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode(_component_UButton, {
                          color: row.original.barberId === vueExports.unref(selectedBarberId) ? "primary" : "neutral",
                          variant: row.original.barberId === vueExports.unref(selectedBarberId) ? "solid" : "outline",
                          size: "xs",
                          onClick: ($event) => selectBarber(row.original.barberId)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(row.original.barberId === vueExports.unref(selectedBarberId) ? "Выбран" : "Выбрать"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color", "variant", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["data", "get-row-id", "loading", "meta"])
                  ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                    key: 1,
                    description: "Для текущего контекста филиала не получен список барберов.",
                    icon: "i-lucide-scissors",
                    title: "Барберы недоступны"
                  }))
                ])) : vueExports.unref(activeTab) === "services" ? (vueExports.openBlock(), vueExports.createBlock("section", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  vueExports.unref(serviceRows).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    class: "overflow-hidden rounded-[1.5rem] border border-charcoal-200 bg-white/90"
                  }, [
                    vueExports.createVNode(_component_UTable, {
                      columns: serviceColumns,
                      data: vueExports.unref(serviceRows),
                      "get-row-id": (row) => row.id,
                      loading: vueExports.unref(pending),
                      meta: {
                        class: {
                          tr: (row) => vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "bg-primary/10 cursor-pointer" : "cursor-pointer"
                        }
                      },
                      "on-select": handleServiceSelect,
                      sticky: "header",
                      ui: {
                        root: "max-h-[36rem] overflow-auto",
                        base: "min-w-[56rem]",
                        thead: "bg-charcoal-50/90",
                        tbody: "divide-y divide-charcoal-100 [&>tr]:data-[selectable=true]:hover:bg-charcoal-50/80",
                        th: "px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-500",
                        td: "px-4 py-4 text-sm text-charcoal-700 align-middle"
                      }
                    }, {
                      "name-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode("div", null, [
                          vueExports.createVNode("p", { class: "font-medium text-charcoal-950" }, vueExports.toDisplayString(row.original.name), 1),
                          vueExports.createVNode("p", { class: "text-xs text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Добавлено в запись" : "Доступно для добавления"), 1)
                        ])
                      ]),
                      "duration-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode("span", { class: "font-medium" }, vueExports.toDisplayString(row.original.duration) + " мин", 1)
                      ]),
                      "action-cell": vueExports.withCtx(({ row }) => [
                        vueExports.createVNode(_component_UButton, {
                          color: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "primary" : "neutral",
                          variant: vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "solid" : "outline",
                          size: "xs",
                          onClick: ($event) => toggleService(row.original.serviceId)
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(selectedServiceIds).includes(row.original.serviceId) ? "Убрать" : "Добавить"), 1)
                          ]),
                          _: 2
                        }, 1032, ["color", "variant", "onClick"])
                      ]),
                      _: 1
                    }, 8, ["data", "get-row-id", "loading", "meta"])
                  ])) : (vueExports.openBlock(), vueExports.createBlock(_component_SharedEmptyState, {
                    key: 1,
                    description: "Бэкенд не вернул услуги для киоска.",
                    icon: "i-lucide-badge-dollar-sign",
                    title: "Услуги недоступны"
                  }))
                ])) : (vueExports.openBlock(), vueExports.createBlock("section", {
                  key: 2,
                  class: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
                }, [
                  vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                    header: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-2" }, [
                        vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Бронирование "),
                        vueExports.createVNode("h2", { class: "barbershop-heading text-3xl text-charcoal-950" }, " Оформление записи через киоск ")
                      ])
                    ]),
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode("div", { class: "space-y-4" }, [
                        vueExports.createVNode(_component_UFormField, { label: "Имя клиента" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).customer_name,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).customer_name = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Телефон" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).phone_number,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).phone_number = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Способ оплаты" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).payment_method,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).payment_method = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode(_component_UFormField, { label: "Код сертификата" }, {
                          default: vueExports.withCtx(() => [
                            vueExports.createVNode(_component_UInput, {
                              modelValue: vueExports.unref(bookingForm).certificate_code,
                              "onUpdate:modelValue": ($event) => vueExports.unref(bookingForm).certificate_code = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        vueExports.createVNode("div", { class: "flex justify-end" }, [
                          vueExports.createVNode(_component_UButton, {
                            loading: vueExports.unref(bookingPending),
                            color: "primary",
                            icon: "i-lucide-receipt",
                            onClick: createBooking
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Создать запись ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  vueExports.createVNode("div", { class: "space-y-6" }, [
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Сводка записи "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Выбранный набор ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-3" }, [
                          vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                            vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Барбер"),
                            vueExports.createVNode("p", { class: "mt-2 text-lg font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(selectedBarber)?.name || "Не выбран"), 1)
                          ]),
                          vueExports.createVNode("div", { class: "rounded-[1.25rem] border border-charcoal-200 bg-white/80 p-4" }, [
                            vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.18em] text-charcoal-500" }, "Услуги"),
                            vueExports.unref(selectedServices).length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              class: "mt-3 space-y-2"
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(selectedServices), (service) => {
                                return vueExports.openBlock(), vueExports.createBlock("div", {
                                  key: String(service.id),
                                  class: "rounded-[1rem] bg-sand-100 px-3 py-2 text-sm text-charcoal-700"
                                }, vueExports.toDisplayString(service.name) + " / " + vueExports.toDisplayString(service.duration || 0) + " мин / " + vueExports.toDisplayString(service.price || 0), 1);
                              }), 128))
                            ])) : (vueExports.openBlock(), vueExports.createBlock("p", {
                              key: 1,
                              class: "mt-2 text-sm text-charcoal-500"
                            }, "Услуги пока не выбраны."))
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    vueExports.createVNode(_component_UCard, { class: "warm-card rounded-[1.9rem] border border-charcoal-200" }, {
                      header: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-2" }, [
                          vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.24em] text-charcoal-500" }, " Инструменты "),
                          vueExports.createVNode("h2", { class: "barbershop-heading text-2xl text-charcoal-950" }, " Регистрация и поиск ")
                        ])
                      ]),
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode("div", { class: "space-y-4" }, [
                          vueExports.createVNode(_component_UFormField, { label: "Имя устройства" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_component_UInput, {
                                modelValue: vueExports.unref(deviceName),
                                "onUpdate:modelValue": ($event) => vueExports.isRef(deviceName) ? deviceName.value = $event : null
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          vueExports.createVNode(_component_UButton, {
                            color: "neutral",
                            icon: "i-lucide-tablet-smartphone",
                            variant: "outline",
                            onClick: registerDevice
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(" Зарегистрировать устройство киоска ")
                            ]),
                            _: 1
                          }),
                          vueExports.createVNode("div", { class: "soft-divider border-t pt-4" }, [
                            vueExports.createVNode(_component_UFormField, { label: "Поиск сертификата" }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_component_UInput, {
                                  modelValue: vueExports.unref(certificateCode),
                                  "onUpdate:modelValue": ($event) => vueExports.isRef(certificateCode) ? certificateCode.value = $event : null,
                                  placeholder: "Код сертификата"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            vueExports.createVNode(_component_UButton, {
                              class: "mt-3",
                              color: "neutral",
                              icon: "i-lucide-search",
                              variant: "outline",
                              onClick: lookupCertificate
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(" Найти сертификат ")
                              ]),
                              _: 1
                            })
                          ]),
                          vueExports.unref(certificateResult) ? (vueExports.openBlock(), vueExports.createBlock(_component_SharedJsonBlock, {
                            key: 0,
                            label: "Ответ сертификата",
                            value: vueExports.unref(certificateResult)
                          }, null, 8, ["value"])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kiosk.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/kiosk-DIk478HW');
//# sourceMappingURL=kiosk-DIk478HW.mjs.map
