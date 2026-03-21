globalThis.__timing__.logStart('Load chunks/build/default-PVvTKQMr');import { E as useVModel, m as useForwardExpose, P as Primitive, F as createContext, aB as useEventListener, K as Presence_default, ae as createSharedComposable, I as DismissableLayer_default, B as getActiveElement, C as useCollection, aE as reactiveOmit, k as useForwardProps, J as useForwardPropsEmits, T as Teleport_default, aF as reactiveOmit$1, au as useEmitAsProps, aG as syncRef, aH as refAutoReset, aI as useDebounceFn, aJ as isClient, aw as useResizeObserver, aq as VisuallyHidden_default, ag as unrefElement, f as useSessionStore, u as useRoute, W as useNuxtApp, h as useAppConfig, i as useComponentUI, t as tv, l as useLocale, N as defu, r as reactiveOmit$2, d as _sfc_main$a$1, aK as transformUI, L as reactivePick, O as isArrayOfArray, y as _sfc_main$d$1, S as _sfc_main$e$1, j as _sfc_main$f$1, R as get$1, aL as _sfc_main$b$1, aM as pickLinkProps, aN as _sfc_main$c$1, aO as useColorMode, aP as omit, as as useState, M as usePortal, n as navigateTo, aQ as useDebounceFn$1, aR as refThrottled } from './server.mjs';
import { u as useDirection } from '../_/utils.mjs';
import { i as isValueEqualOrExist } from '../_/isValueEqualOrExist.mjs';
import { v as vueExports, s as ssrRenderComponent_1, a as ssrRenderSlot_1, h as ssrRenderAttrs_1, b as ssrRenderClass_1, d as ssrRenderList_1, c as ssrInterpolate_1, e as ssrRenderVNode } from '../routes/renderer.mjs';
import { I as isEqual } from '../_/nitro.mjs';
import { u as useId } from '../_/useId.mjs';
import { g as getOpenState$1, i as isPointerInGraceArea, a as isMouseEvent, F as FIRST_LAST_KEYS, L as LAST_KEYS, f as focusFirst$1, S as SELECTION_KEYS, I as ITEM_SELECT, b as isIndeterminate, c as getCheckedState, d as SUB_CLOSE_KEYS, e as SUB_OPEN_KEYS, D as DialogRoot_default, h as DialogOverlay_default, j as DialogContent_default, _ as _sfc_main$f, p as pointerDownOutside, k as DialogTrigger_default, l as DialogPortal_default, m as DialogTitle_default, n as DialogDescription_default, o as DialogClose_default } from './Modal-Dv48105F.mjs';
import { i as injectListboxGroupContext, u as useFocusGuards, a as useTypeahead, _ as _sfc_main$i, g as getEstimateSize, L as ListboxItem_default, b as ListboxItemIndicator_default, c as ListboxRoot_default, d as ListboxFilter_default, e as ListboxContent_default, f as ListboxVirtualizer_default, h as ListboxGroup_default } from './SelectMenu-9fuPONhl.mjs';
import { P as PopperAnchor_default, c as PopperArrow_default, a as PopperRoot_default, b as PopperContent_default, d as PopperContentPropsDefaultValue } from '../_/PopperArrow.mjs';
import { p as provideDashboardContext, u as useDashboard, a as useResizable, c as _sfc_main$1$1, b as _sfc_main$2$1, _ as _sfc_main$h } from './Badge-CHxj5N7w.mjs';
import { c as createReusableTemplate, b as useEventListener$1, d as useActiveElement } from './index-qsfWWCYt.mjs';
import { u as useGraceArea, a as _sfc_main$1$2, _ as _sfc_main$g, b as useKbd } from './Tooltip-BXK1uE6k.mjs';
import { u as useBodyScrollLock, F as FocusScope_default, a as useHideOthers } from '../_/FocusScope.mjs';
import { R as RovingFocusGroup_default } from '../_/RovingFocusGroup.mjs';
import { u as useBranchStore } from './branch-nC1tN9Zp.mjs';
import { u as useRealtimeQueue } from './useRealtimeQueue-CK9yRiyf.mjs';
import { _ as _sfc_main$j } from './Input-DcPP1NGC.mjs';
import 'node:crypto';
import '../_/shared.cjs.prod.mjs';
import '../virtual/_commonjsHelpers.mjs';
import 'node:stream';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:fs';
import '../_/VisuallyHiddenInput.mjs';
import '../_/index2.mjs';
import '../_/index.mjs';
import './useKioskApi-l3XfHmhL.mjs';

//#region src/shared/useArrowNavigation.ts
const ignoredElement = ["INPUT", "TEXTAREA"];
/**
* Allow arrow navigation for every html element with data-reka-collection-item tag
*
* @param e               Keyboard event
* @param currentElement  Event initiator element or any element that wants to handle the navigation
* @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
* @param options         further options
* @returns               the navigated html element or null if none
*/
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
	if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
	const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
	const [right, left, up, down, home, end] = [
		e.key === "ArrowRight",
		e.key === "ArrowLeft",
		e.key === "ArrowUp",
		e.key === "ArrowDown",
		e.key === "Home",
		e.key === "End"
	];
	const goingVertical = up || down;
	const goingHorizontal = right || left;
	if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
	const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
	if (!allCollectionItems.length) return null;
	if (preventScroll) e.preventDefault();
	let item = null;
	if (goingHorizontal || goingVertical) {
		const goForward = goingVertical ? down : dir === "ltr" ? right : left;
		item = findNextFocusableElement(allCollectionItems, currentElement, {
			goForward,
			loop
		});
	} else if (home) item = allCollectionItems.at(0) || null;
	else if (end) item = allCollectionItems.at(-1) || null;
	if (focus) item?.focus();
	return item;
}
/**
* Recursive function to find the next focusable element to avoid disabled elements
*
* @param elements Elements to navigate
* @param currentElement Current active element
* @param options
* @returns next focusable element
*/
function findNextFocusableElement(elements, currentElement, options, iterations = elements.length) {
	if (--iterations === 0) return null;
	const index = elements.indexOf(currentElement);
	const newIndex = options.goForward ? index + 1 : index - 1;
	if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
	const adjustedNewIndex = (newIndex + elements.length) % elements.length;
	const candidate = elements[adjustedNewIndex];
	if (!candidate) return null;
	const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
	if (isDisabled) return findNextFocusableElement(elements, candidate, options, iterations);
	return candidate;
}

//#region src/Collapsible/CollapsibleRoot.vue?vue&type=script&setup=true&lang.ts
const [injectCollapsibleRootContext, provideCollapsibleRootContext] = createContext("CollapsibleRoot");
var CollapsibleRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "CollapsibleRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
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
	emits: ["update:open"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const { disabled, unmountOnHide } = vueExports.toRefs(props);
		provideCollapsibleRootContext({
			contentId: "",
			disabled,
			open,
			unmountOnHide,
			onOpenToggle: () => {
				if (disabled.value) return;
				open.value = !open.value;
			}
		});
		__expose({ open });
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				as: _ctx.as,
				"as-child": props.asChild,
				"data-state": vueExports.unref(open) ? "open" : "closed",
				"data-disabled": vueExports.unref(disabled) ? "" : void 0
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"data-state",
				"data-disabled"
			]);
		};
	}
});

//#endregion
//#region src/Collapsible/CollapsibleRoot.vue
var CollapsibleRoot_default = CollapsibleRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Collapsible/CollapsibleContent.vue?vue&type=script&setup=true&lang.ts
var CollapsibleContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "CollapsibleContent",
	props: {
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
	emits: ["contentFound"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectCollapsibleRootContext();
		rootContext.contentId ||= useId(void 0, "reka-collapsible-content");
		const presentRef = vueExports.ref();
		const { forwardRef, currentElement } = useForwardExpose();
		const width = vueExports.ref(0);
		const height = vueExports.ref(0);
		const isOpen = vueExports.computed(() => rootContext.open.value);
		const isMountAnimationPrevented = vueExports.ref(isOpen.value);
		const currentStyle = vueExports.ref();
		vueExports.watch(() => [isOpen.value, presentRef.value?.present], async () => {
			await vueExports.nextTick();
			const node = currentElement.value;
			if (!node) return;
			currentStyle.value = currentStyle.value || {
				transitionDuration: node.style.transitionDuration,
				animationName: node.style.animationName
			};
			node.style.transitionDuration = "0s";
			node.style.animationName = "none";
			const rect = node.getBoundingClientRect();
			height.value = rect.height;
			width.value = rect.width;
			if (!isMountAnimationPrevented.value) {
				node.style.transitionDuration = currentStyle.value.transitionDuration;
				node.style.animationName = currentStyle.value.animationName;
			}
		}, { immediate: true });
		const skipAnimation = vueExports.computed(() => isMountAnimationPrevented.value && rootContext.open.value);
		vueExports.onMounted(() => {
			requestAnimationFrame(() => {
				isMountAnimationPrevented.value = false;
			});
		});
		useEventListener(currentElement, "beforematch", (ev) => {
			requestAnimationFrame(() => {
				rootContext.onOpenToggle();
				emits("contentFound");
			});
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
				ref_key: "presentRef",
				ref: presentRef,
				present: _ctx.forceMount || vueExports.unref(rootContext).open.value,
				"force-mount": true
			}, {
				default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
					id: vueExports.unref(rootContext).contentId,
					ref: vueExports.unref(forwardRef),
					"as-child": props.asChild,
					as: _ctx.as,
					hidden: !present ? vueExports.unref(rootContext).unmountOnHide.value ? "" : "until-found" : void 0,
					"data-state": skipAnimation.value ? void 0 : vueExports.unref(rootContext).open.value ? "open" : "closed",
					"data-disabled": vueExports.unref(rootContext).disabled?.value ? "" : void 0,
					style: {
						[`--reka-collapsible-content-height`]: `${height.value}px`,
						[`--reka-collapsible-content-width`]: `${width.value}px`
					}
				}), {
					default: vueExports.withCtx(() => [(vueExports.unref(rootContext).unmountOnHide.value ? present : true) ? vueExports.renderSlot(_ctx.$slots, "default", { key: 0 }) : vueExports.createCommentVNode("v-if", true)]),
					_: 2
				}, 1040, [
					"id",
					"as-child",
					"as",
					"hidden",
					"data-state",
					"data-disabled",
					"style"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Collapsible/CollapsibleContent.vue
var CollapsibleContent_default = CollapsibleContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Collapsible/CollapsibleTrigger.vue?vue&type=script&setup=true&lang.ts
var CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "CollapsibleTrigger",
	props: {
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
		useForwardExpose();
		const rootContext = injectCollapsibleRootContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				"aria-controls": vueExports.unref(rootContext).contentId,
				"aria-expanded": vueExports.unref(rootContext).open.value,
				"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
				"data-disabled": vueExports.unref(rootContext).disabled?.value ? "" : void 0,
				disabled: vueExports.unref(rootContext).disabled?.value,
				onClick: vueExports.unref(rootContext).onOpenToggle
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child",
				"aria-controls",
				"aria-expanded",
				"data-state",
				"data-disabled",
				"disabled",
				"onClick"
			]);
		};
	}
});

//#endregion
//#region src/Collapsible/CollapsibleTrigger.vue
var CollapsibleTrigger_default = CollapsibleTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/shared/useSingleOrMultipleValue.ts
/**
* Validates the props and it makes sure that the types are coherent with each other
*
* 1. If type, defaultValue, and modelValue are all undefined, throw an error.
* 2. If modelValue and defaultValue are defined and not of the same type, throw an error.
* 3. If type is defined:
*    a. If type is 'single' and either modelValue or defaultValue is an array, log an error and return 'multiple'.
*    b. If type is 'multiple' and neither modelValue nor defaultValue is an array, log an error and return 'single'.
* 4. Return 'multiple' if modelValue is an array, else return 'single'.
*/
function validateProps({ type, defaultValue, modelValue }) {
	const value = modelValue || defaultValue;
	const canTypeBeInferred = modelValue !== void 0 || defaultValue !== void 0;
	if (canTypeBeInferred) return Array.isArray(value) ? "multiple" : "single";
	else return type ?? "single";
}
function getDefaultType({ type, defaultValue, modelValue }) {
	if (type) return type;
	return validateProps({
		type,
		defaultValue,
		modelValue
	});
}
function getDefaultValue({ type, defaultValue }) {
	if (defaultValue !== void 0) return defaultValue;
	return type === "single" ? void 0 : [];
}
function useSingleOrMultipleValue(props, emits) {
	const type = vueExports.computed(() => getDefaultType(props));
	const modelValue = useVModel(props, "modelValue", emits, {
		defaultValue: getDefaultValue(props),
		passive: props.modelValue === void 0,
		deep: true
	});
	function changeModelValue(value) {
		if (type.value === "single") modelValue.value = isEqual(value, modelValue.value) ? void 0 : value;
		else {
			const modelValueArray = Array.isArray(modelValue.value) ? [...modelValue.value || []] : [modelValue.value].filter(Boolean);
			if (isValueEqualOrExist(modelValueArray, value)) {
				const index = modelValueArray.findIndex((i) => isEqual(i, value));
				modelValueArray.splice(index, 1);
			} else modelValueArray.push(value);
			modelValue.value = modelValueArray;
		}
	}
	const isSingle = vueExports.computed(() => type.value === "single");
	return {
		modelValue,
		changeModelValue,
		isSingle
	};
}

//#region src/Accordion/AccordionRoot.vue?vue&type=script&setup=true&lang.ts
const [injectAccordionRootContext, provideAccordionRootContext] = createContext("AccordionRoot");
var AccordionRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "AccordionRoot",
	props: {
		collapsible: {
			type: Boolean,
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
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
		},
		type: {
			type: String,
			required: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { dir, disabled, unmountOnHide } = vueExports.toRefs(props);
		const direction = useDirection(dir);
		const { modelValue, changeModelValue, isSingle } = useSingleOrMultipleValue(props, emits);
		const { forwardRef, currentElement: parentElement } = useForwardExpose();
		provideAccordionRootContext({
			disabled,
			direction,
			orientation: props.orientation,
			parentElement,
			isSingle,
			collapsible: props.collapsible,
			modelValue,
			changeModelValue,
			unmountOnHide
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref: vueExports.unref(forwardRef),
				"as-child": _ctx.asChild,
				as: _ctx.as
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});

//#endregion
//#region src/Accordion/AccordionRoot.vue
var AccordionRoot_default = AccordionRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Accordion/AccordionItem.vue?vue&type=script&setup=true&lang.ts
var AccordionItemState = /* @__PURE__ */ function(AccordionItemState$1) {
	AccordionItemState$1["Open"] = "open";
	AccordionItemState$1["Closed"] = "closed";
	return AccordionItemState$1;
}(AccordionItemState || {});
const [injectAccordionItemContext, provideAccordionItemContext] = createContext("AccordionItem");
var AccordionItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "AccordionItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		value: {
			type: String,
			required: true
		},
		unmountOnHide: {
			type: Boolean,
			required: false,
			default: void 0
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
	setup(__props, { expose: __expose }) {
		const props = __props;
		const rootContext = injectAccordionRootContext();
		const open = vueExports.computed(() => rootContext.isSingle.value ? props.value === rootContext.modelValue.value : Array.isArray(rootContext.modelValue.value) && rootContext.modelValue.value.includes(props.value));
		const disabled = vueExports.computed(() => {
			return rootContext.disabled.value || props.disabled;
		});
		const dataDisabled = vueExports.computed(() => disabled.value ? "" : void 0);
		const dataState = vueExports.computed(() => open.value ? AccordionItemState.Open : AccordionItemState.Closed);
		__expose({
			open,
			dataDisabled
		});
		const { currentRef, currentElement } = useForwardExpose();
		provideAccordionItemContext({
			open,
			dataState,
			disabled,
			dataDisabled,
			triggerId: "",
			currentRef,
			currentElement,
			value: vueExports.computed(() => props.value)
		});
		function handleArrowKey(e) {
			const target = e.target;
			const allCollectionItems = Array.from(rootContext.parentElement.value?.querySelectorAll("[data-reka-collection-item]") ?? []);
			const collectionItemIndex = allCollectionItems.findIndex((item) => item === target);
			if (collectionItemIndex === -1) return null;
			useArrowNavigation(e, target, rootContext.parentElement.value, {
				arrowKeyOptions: rootContext.orientation,
				dir: rootContext.direction.value,
				focus: true
			});
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollapsibleRoot_default), {
				"data-orientation": vueExports.unref(rootContext).orientation,
				"data-disabled": dataDisabled.value,
				"data-state": dataState.value,
				disabled: disabled.value,
				open: open.value,
				as: props.as,
				"as-child": props.asChild,
				"unmount-on-hide": props.unmountOnHide ?? vueExports.unref(rootContext).unmountOnHide.value,
				onKeydown: vueExports.withKeys(handleArrowKey, [
					"up",
					"down",
					"left",
					"right",
					"home",
					"end"
				])
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: open.value })]),
				_: 3
			}, 8, [
				"data-orientation",
				"data-disabled",
				"data-state",
				"disabled",
				"open",
				"as",
				"as-child",
				"unmount-on-hide"
			]);
		};
	}
});

//#endregion
//#region src/Accordion/AccordionItem.vue
var AccordionItem_default = AccordionItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Accordion/AccordionContent.vue?vue&type=script&setup=true&lang.ts
var AccordionContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "AccordionContent",
	props: {
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
		const rootContext = injectAccordionRootContext();
		const itemContext = injectAccordionItemContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollapsibleContent_default), {
				role: "region",
				"as-child": props.asChild,
				as: _ctx.as,
				"force-mount": props.forceMount,
				"aria-labelledby": vueExports.unref(itemContext).triggerId,
				"data-state": vueExports.unref(itemContext).dataState.value,
				"data-disabled": vueExports.unref(itemContext).dataDisabled.value,
				"data-orientation": vueExports.unref(rootContext).orientation,
				style: {
					"--reka-accordion-content-width": "var(--reka-collapsible-content-width)",
					"--reka-accordion-content-height": "var(--reka-collapsible-content-height)"
				},
				onContentFound: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).changeModelValue(vueExports.unref(itemContext).value.value))
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"as-child",
				"as",
				"force-mount",
				"aria-labelledby",
				"data-state",
				"data-disabled",
				"data-orientation"
			]);
		};
	}
});

//#endregion
//#region src/Accordion/AccordionContent.vue
var AccordionContent_default = AccordionContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Accordion/AccordionTrigger.vue?vue&type=script&setup=true&lang.ts
var AccordionTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "AccordionTrigger",
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
	setup(__props) {
		const props = __props;
		const rootContext = injectAccordionRootContext();
		const itemContext = injectAccordionItemContext();
		itemContext.triggerId ||= useId(void 0, "reka-accordion-trigger");
		function changeItem() {
			const triggerDisabled = rootContext.isSingle.value && itemContext.open.value && !rootContext.collapsible;
			if (itemContext.disabled.value || triggerDisabled) return;
			rootContext.changeModelValue(itemContext.value.value);
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollapsibleTrigger_default), {
				id: vueExports.unref(itemContext).triggerId,
				ref: vueExports.unref(itemContext).currentRef,
				"data-reka-collection-item": "",
				as: props.as,
				"as-child": props.asChild,
				"aria-disabled": vueExports.unref(itemContext).disabled.value || void 0,
				"aria-expanded": vueExports.unref(itemContext).open.value || false,
				"data-disabled": vueExports.unref(itemContext).dataDisabled.value,
				"data-orientation": vueExports.unref(rootContext).orientation,
				"data-state": vueExports.unref(itemContext).dataState.value,
				disabled: vueExports.unref(itemContext).disabled.value,
				onClick: changeItem
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"id",
				"as",
				"as-child",
				"aria-disabled",
				"aria-expanded",
				"data-disabled",
				"data-orientation",
				"data-state",
				"disabled"
			]);
		};
	}
});

//#endregion
//#region src/Accordion/AccordionTrigger.vue
var AccordionTrigger_default = AccordionTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxGroupLabel.vue?vue&type=script&setup=true&lang.ts
var ListboxGroupLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxGroupLabel",
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
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		const groupContext = injectListboxGroupContext({ id: "" });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(groupContext).id }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxGroupLabel.vue
var ListboxGroupLabel_default = ListboxGroupLabel_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuAnchor.vue?vue&type=script&setup=true&lang.ts
var MenuAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuAnchor",
	props: {
		reference: {
			type: null,
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
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuAnchor.vue
var MenuAnchor_default = MenuAnchor_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuArrow.vue?vue&type=script&setup=true&lang.ts
var MenuArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuArrow",
	props: {
		width: {
			type: Number,
			required: false
		},
		height: {
			type: Number,
			required: false
		},
		rounded: {
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
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuArrow.vue
var MenuArrow_default = MenuArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/shared/useIsUsingKeyboard.ts
function useIsUsingKeyboardImpl() {
	const isUsingKeyboard = vueExports.ref(false);
	vueExports.onMounted(() => {
		useEventListener("keydown", () => {
			isUsingKeyboard.value = true;
		}, {
			capture: true,
			passive: true
		});
		useEventListener(["pointerdown", "pointermove"], () => {
			isUsingKeyboard.value = false;
		}, {
			capture: true,
			passive: true
		});
	});
	return isUsingKeyboard;
}
const useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);

//#region src/Menu/MenuRoot.vue?vue&type=script&setup=true&lang.ts
const [injectMenuContext, provideMenuContext] = createContext(["MenuRoot", "MenuSub"], "MenuContext");
const [injectMenuRootContext, provideMenuRootContext] = createContext("MenuRoot");
var MenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: false
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { modal, dir: propDir } = vueExports.toRefs(props);
		const dir = useDirection(propDir);
		const open = useVModel(props, "open", emits);
		const content = vueExports.ref();
		const isUsingKeyboardRef = useIsUsingKeyboard();
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuRootContext({
			onClose: () => {
				open.value = false;
			},
			isUsingKeyboardRef,
			dir,
			modal
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Menu/MenuRoot.vue
var MenuRoot_default = MenuRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuContentImpl.vue?vue&type=script&setup=true&lang.ts
const [injectMenuContentContext, provideMenuContentContext] = createContext("MenuContent");
var MenuContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuContentImpl",
	props: /* @__PURE__ */ vueExports.mergeDefaults({
		loop: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		},
		disableOutsideScroll: {
			type: Boolean,
			required: false
		},
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	}, { ...PopperContentPropsDefaultValue }),
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus",
		"dismiss"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const { trapFocus, disableOutsidePointerEvents, loop } = vueExports.toRefs(props);
		useFocusGuards();
		useBodyScrollLock(disableOutsidePointerEvents.value);
		const searchRef = vueExports.ref("");
		const timerRef = vueExports.ref(0);
		const pointerGraceTimerRef = vueExports.ref(0);
		const pointerGraceIntentRef = vueExports.ref(null);
		const pointerDirRef = vueExports.ref("right");
		const lastPointerXRef = vueExports.ref(0);
		const currentItemId = vueExports.ref(null);
		const rovingFocusGroupRef = vueExports.ref();
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const { handleTypeaheadSearch } = useTypeahead();
		vueExports.watch(contentElement, (el) => {
			menuContext.onContentChange(el);
		});
		vueExports.onUnmounted(() => {
			window.clearTimeout(timerRef.value);
		});
		function isPointerMovingToSubmenu(event) {
			const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;
			return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
		}
		async function handleMountAutoFocus(event) {
			emits("openAutoFocus", event);
			if (event.defaultPrevented) return;
			event.preventDefault();
			contentElement.value?.focus({ preventScroll: true });
		}
		function handleKeyDown(event) {
			if (event.defaultPrevented) return;
			const target = event.target;
			const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
			const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
			const isCharacterKey = event.key.length === 1;
			const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
				loop: loop.value,
				arrowKeyOptions: "vertical",
				dir: rootContext?.dir.value,
				focus: true,
				attributeName: "[data-reka-collection-item]:not([data-disabled])"
			});
			if (el) return el?.focus();
			if (event.code === "Space") return;
			const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
			if (isKeyDownInside) {
				if (event.key === "Tab") event.preventDefault();
				if (!isModifierKey && isCharacterKey) handleTypeaheadSearch(event.key, collectionItems);
			}
			if (event.target !== contentElement.value) return;
			if (!FIRST_LAST_KEYS.includes(event.key)) return;
			event.preventDefault();
			const candidateNodes = [...collectionItems.map((item) => item.ref)];
			if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
			focusFirst$1(candidateNodes);
		}
		function handleBlur(event) {
			if (!event?.currentTarget?.contains?.(event.target)) {
				window.clearTimeout(timerRef.value);
				searchRef.value = "";
			}
		}
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const target = event.target;
			const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
			if ((event?.currentTarget)?.contains(target) && pointerXHasChanged) {
				const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
				pointerDirRef.value = newDir;
				lastPointerXRef.value = event.clientX;
			}
		}
		provideMenuContentContext({
			onItemEnter: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			onItemLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return;
				contentElement.value?.focus();
				currentItemId.value = null;
			},
			onTriggerLeave: (event) => {
				if (isPointerMovingToSubmenu(event)) return true;
				else return false;
			},
			searchRef,
			pointerGraceTimerRef,
			onPointerGraceIntentChange: (intent) => {
				pointerGraceIntentRef.value = intent;
			}
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(FocusScope_default), {
				"as-child": "",
				trapped: vueExports.unref(trapFocus),
				onMountAutoFocus: handleMountAutoFocus,
				onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": vueExports.unref(disableOutsidePointerEvents),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
					onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
				}, {
					default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(RovingFocusGroup_default), {
						ref_key: "rovingFocusGroupRef",
						ref: rovingFocusGroupRef,
						"current-tab-stop-id": currentItemId.value,
						"onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
						"as-child": "",
						orientation: "vertical",
						dir: vueExports.unref(rootContext).dir.value,
						loop: vueExports.unref(loop),
						onEntryFocus: _cache[1] || (_cache[1] = (event) => {
							emits("entryFocus", event);
							if (!vueExports.unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
						})
					}, {
						default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(PopperContent_default), {
							ref: vueExports.unref(forwardRef),
							role: "menu",
							as: _ctx.as,
							"as-child": _ctx.asChild,
							"aria-orientation": "vertical",
							"data-reka-menu-content": "",
							"data-state": vueExports.unref(getOpenState$1)(vueExports.unref(menuContext).open.value),
							dir: vueExports.unref(rootContext).dir.value,
							side: _ctx.side,
							"side-offset": _ctx.sideOffset,
							align: _ctx.align,
							"align-offset": _ctx.alignOffset,
							"avoid-collisions": _ctx.avoidCollisions,
							"collision-boundary": _ctx.collisionBoundary,
							"collision-padding": _ctx.collisionPadding,
							"arrow-padding": _ctx.arrowPadding,
							"prioritize-position": _ctx.prioritizePosition,
							"position-strategy": _ctx.positionStrategy,
							"update-position-strategy": _ctx.updatePositionStrategy,
							sticky: _ctx.sticky,
							"hide-when-detached": _ctx.hideWhenDetached,
							reference: _ctx.reference,
							onKeydown: handleKeyDown,
							onBlur: handleBlur,
							onPointermove: handlePointerMove
						}, {
							default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, [
							"as",
							"as-child",
							"data-state",
							"dir",
							"side",
							"side-offset",
							"align",
							"align-offset",
							"avoid-collisions",
							"collision-boundary",
							"collision-padding",
							"arrow-padding",
							"prioritize-position",
							"position-strategy",
							"update-position-strategy",
							"sticky",
							"hide-when-detached",
							"reference"
						])]),
						_: 3
					}, 8, [
						"current-tab-stop-id",
						"dir",
						"loop"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuContentImpl.vue
var MenuContentImpl_default = MenuContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuItemImpl.vue?vue&type=script&setup=true&lang.ts
var MenuItemImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "MenuItemImpl",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		const contentContext = injectMenuContentContext();
		const { forwardRef } = useForwardExpose();
		const { CollectionItem } = useCollection();
		const isFocused = vueExports.ref(false);
		async function handlePointerMove(event) {
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			if (props.disabled) contentContext.onItemLeave(event);
			else {
				const defaultPrevented = contentContext.onItemEnter(event);
				if (!defaultPrevented) {
					const item = event.currentTarget;
					item?.focus({ preventScroll: true });
				}
			}
		}
		async function handlePointerLeave(event) {
			await vueExports.nextTick();
			if (event.defaultPrevented) return;
			if (!isMouseEvent(event)) return;
			contentContext.onItemLeave(event);
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					role: "menuitem",
					tabindex: "-1"
				}, _ctx.$attrs, {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"aria-disabled": _ctx.disabled || void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-highlighted": isFocused.value ? "" : void 0,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onFocus: _cache[0] || (_cache[0] = async (event) => {
						await vueExports.nextTick();
						if (event.defaultPrevented || _ctx.disabled) return;
						isFocused.value = true;
					}),
					onBlur: _cache[1] || (_cache[1] = async (event) => {
						await vueExports.nextTick();
						if (event.defaultPrevented) return;
						isFocused.value = false;
					})
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as",
					"as-child",
					"aria-disabled",
					"data-disabled",
					"data-highlighted"
				])]),
				_: 3
			}, 8, ["value"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuItemImpl.vue
var MenuItemImpl_default = MenuItemImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuItem.vue?vue&type=script&setup=true&lang.ts
var MenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectMenuRootContext();
		const contentContext = injectMenuContentContext();
		const isPointerDownRef = vueExports.ref(false);
		async function handleSelect() {
			const menuItem = currentElement.value;
			if (!props.disabled && menuItem) {
				const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
					bubbles: true,
					cancelable: true
				});
				emits("select", itemSelectEvent);
				await vueExports.nextTick();
				if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
				else rootContext.onClose();
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuItemImpl_default, vueExports.mergeProps(props, {
				ref: vueExports.unref(forwardRef),
				onClick: handleSelect,
				onPointerdown: _cache[0] || (_cache[0] = () => {
					isPointerDownRef.value = true;
				}),
				onPointerup: _cache[1] || (_cache[1] = async (event) => {
					await vueExports.nextTick();
					if (event.defaultPrevented) return;
					if (!isPointerDownRef.value) event.currentTarget?.click();
				}),
				onKeydown: _cache[2] || (_cache[2] = async (event) => {
					const isTypingAhead = vueExports.unref(contentContext).searchRef.value !== "";
					if (_ctx.disabled || isTypingAhead && event.key === " ") return;
					if (vueExports.unref(SELECTION_KEYS).includes(event.key)) {
						event.currentTarget.click();
						/**
						* We prevent default browser behaviour for selection keys as they should trigger
						* a selection only:
						* - prevents space from scrolling the page.
						* - if keydown causes focus to move, prevents keydown from firing on the new target.
						*/
						event.preventDefault();
					}
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuItem.vue
var MenuItem_default = MenuItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuItemIndicator.vue?vue&type=script&setup=true&lang.ts
const [injectMenuItemIndicatorContext, provideMenuItemIndicatorContext] = createContext(["MenuCheckboxItem", "MenuRadioItem"], "MenuItemIndicatorContext");
var MenuItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuItemIndicator",
	props: {
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
			required: false,
			default: "span"
		}
	},
	setup(__props) {
		const indicatorContext = injectMenuItemIndicatorContext({ modelValue: vueExports.ref(false) });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(isIndeterminate)(vueExports.unref(indicatorContext).modelValue.value) || vueExports.unref(indicatorContext).modelValue.value === true }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": vueExports.unref(getCheckedState)(vueExports.unref(indicatorContext).modelValue.value)
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-state"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuItemIndicator.vue
var MenuItemIndicator_default = MenuItemIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuCheckboxItem.vue?vue&type=script&setup=true&lang.ts
var MenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false,
			default: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuItem_default, vueExports.mergeProps({ role: "menuitemcheckbox" }, vueExports.unref(forwarded), {
				"aria-checked": vueExports.unref(isIndeterminate)(vueExports.unref(modelValue)) ? "mixed" : vueExports.unref(modelValue),
				"data-state": vueExports.unref(getCheckedState)(vueExports.unref(modelValue)),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					if (vueExports.unref(isIndeterminate)(vueExports.unref(modelValue))) modelValue.value = true;
					else modelValue.value = !vueExports.unref(modelValue);
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuCheckboxItem.vue
var MenuCheckboxItem_default = MenuCheckboxItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuRootContentModal.vue?vue&type=script&setup=true&lang.ts
var MenuRootContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuRootContentModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
				ref: vueExports.unref(forwardRef),
				"trap-focus": vueExports.unref(menuContext).open.value,
				"disable-outside-pointer-events": vueExports.unref(menuContext).open.value,
				"disable-outside-scroll": true,
				onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onOpenChange(false)),
				onFocusOutside: _cache[1] || (_cache[1] = vueExports.withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus", "disable-outside-pointer-events"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuRootContentModal.vue
var MenuRootContentModal_default = MenuRootContentModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuRootContentNonModal.vue?vue&type=script&setup=true&lang.ts
var MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuRootContentNonModal",
	props: {
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				"disable-outside-scroll": false,
				onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onOpenChange(false))
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuRootContentNonModal.vue
var MenuRootContentNonModal_default = MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuContent.vue?vue&type=script&setup=true&lang.ts
var MenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(menuContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.unref(rootContext).modal.value ? (vueExports.openBlock(), vueExports.createBlock(MenuRootContentModal_default, vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, {
					..._ctx.$attrs,
					...vueExports.unref(forwarded)
				})), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (vueExports.openBlock(), vueExports.createBlock(MenuRootContentNonModal_default, vueExports.normalizeProps(vueExports.mergeProps({ key: 1 }, {
					..._ctx.$attrs,
					...vueExports.unref(forwarded)
				})), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuContent.vue
var MenuContent_default = MenuContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuGroup.vue?vue&type=script&setup=true&lang.ts
var MenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuGroup",
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
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuGroup.vue
var MenuGroup_default = MenuGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuLabel.vue?vue&type=script&setup=true&lang.ts
var MenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuLabel",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "div"
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuLabel.vue
var MenuLabel_default = MenuLabel_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuPortal.vue?vue&type=script&setup=true&lang.ts
var MenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuPortal.vue
var MenuPortal_default = MenuPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuRadioGroup.vue?vue&type=script&setup=true&lang.ts
const [injectMenuRadioGroupContext, provideMenuRadioGroupContext] = createContext("MenuRadioGroup");
var MenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuRadioGroup",
	props: {
		modelValue: {
			type: null,
			required: false,
			default: ""
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
		const delegatedProps = reactiveOmit(props, ["modelValue"]);
		const forwarded = useForwardProps(delegatedProps);
		const modelValue = useVModel(props, "modelValue", emits);
		provideMenuRadioGroupContext({
			modelValue,
			onValueChange: (payload) => {
				modelValue.value = payload;
			}
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuGroup_default, vueExports.normalizeProps(vueExports.guardReactiveProps(vueExports.unref(forwarded))), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuRadioGroup.vue
var MenuRadioGroup_default = MenuRadioGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuRadioItem.vue?vue&type=script&setup=true&lang.ts
var MenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const delegatedProps = reactiveOmit$1(props, ["value"]);
		const forwarded = useForwardProps(delegatedProps);
		const { value } = vueExports.toRefs(props);
		const radioGroupContext = injectMenuRadioGroupContext();
		const modelValue = vueExports.computed(() => radioGroupContext.modelValue.value === value?.value);
		provideMenuItemIndicatorContext({ modelValue });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuItem_default, vueExports.mergeProps({ role: "menuitemradio" }, vueExports.unref(forwarded), {
				"aria-checked": modelValue.value,
				"data-state": vueExports.unref(getCheckedState)(modelValue.value),
				onSelect: _cache[0] || (_cache[0] = async (event) => {
					emits("select", event);
					vueExports.unref(radioGroupContext).onValueChange(vueExports.unref(value));
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-checked", "data-state"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuRadioItem.vue
var MenuRadioItem_default = MenuRadioItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuSeparator.vue?vue&type=script&setup=true&lang.ts
var MenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuSeparator",
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
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
				role: "separator",
				"aria-orientation": "horizontal"
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Menu/MenuSeparator.vue
var MenuSeparator_default = MenuSeparator_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuSub.vue?vue&type=script&setup=true&lang.ts
const [injectMenuSubContext, provideMenuSubContext] = createContext("MenuSub");
var MenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuSub",
	props: { open: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const open = useVModel(props, "open", emits, {
			defaultValue: false,
			passive: props.open === void 0
		});
		const parentMenuContext = injectMenuContext();
		const trigger = vueExports.ref();
		const content = vueExports.ref();
		vueExports.watchEffect((cleanupFn) => {
			if (parentMenuContext?.open.value === false) open.value = false;
			cleanupFn(() => open.value = false);
		});
		provideMenuContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			content,
			onContentChange: (element) => {
				content.value = element;
			}
		});
		provideMenuSubContext({
			triggerId: "",
			contentId: "",
			trigger,
			onTriggerChange: (element) => {
				trigger.value = element;
			}
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Menu/MenuSub.vue
var MenuSub_default = MenuSub_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuSubContent.vue?vue&type=script&setup=true&lang.ts
var MenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false,
			default: true
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const menuSubContext = injectMenuSubContext();
		const { forwardRef, currentElement: subContentElement } = useForwardExpose();
		menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(menuContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(MenuContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
					id: vueExports.unref(menuSubContext).contentId,
					ref: vueExports.unref(forwardRef),
					"aria-labelledby": vueExports.unref(menuSubContext).triggerId,
					align: "start",
					side: vueExports.unref(rootContext).dir.value === "rtl" ? "left" : "right",
					"disable-outside-pointer-events": false,
					"disable-outside-scroll": false,
					"trap-focus": false,
					onOpenAutoFocus: _cache[0] || (_cache[0] = vueExports.withModifiers((event) => {
						if (vueExports.unref(rootContext).isUsingKeyboardRef.value) vueExports.unref(subContentElement)?.focus();
					}, ["prevent"])),
					onCloseAutoFocus: _cache[1] || (_cache[1] = vueExports.withModifiers(() => {}, ["prevent"])),
					onFocusOutside: _cache[2] || (_cache[2] = (event) => {
						if (event.defaultPrevented) return;
						if (event.target !== vueExports.unref(menuSubContext).trigger.value) vueExports.unref(menuContext).onOpenChange(false);
					}),
					onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
						vueExports.unref(rootContext).onClose();
						event.preventDefault();
					}),
					onKeydown: _cache[4] || (_cache[4] = (event) => {
						const isKeyDownInside = event.currentTarget?.contains(event.target);
						const isCloseKey = vueExports.unref(SUB_CLOSE_KEYS)[vueExports.unref(rootContext).dir.value].includes(event.key);
						if (isKeyDownInside && isCloseKey) {
							vueExports.unref(menuContext).onOpenChange(false);
							vueExports.unref(menuSubContext).trigger.value?.focus();
							event.preventDefault();
						}
					})
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-labelledby",
					"side"
				])]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Menu/MenuSubContent.vue
var MenuSubContent_default = MenuSubContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Menu/MenuSubTrigger.vue?vue&type=script&setup=true&lang.ts
var MenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "MenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		const menuContext = injectMenuContext();
		const rootContext = injectMenuRootContext();
		const subContext = injectMenuSubContext();
		const contentContext = injectMenuContentContext();
		const openTimerRef = vueExports.ref(null);
		subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
		function clearOpenTimer() {
			if (openTimerRef.value) window.clearTimeout(openTimerRef.value);
			openTimerRef.value = null;
		}
		vueExports.onUnmounted(() => {
			clearOpenTimer();
		});
		function handlePointerMove(event) {
			if (!isMouseEvent(event)) return;
			const defaultPrevented = contentContext.onItemEnter(event);
			if (defaultPrevented) return;
			if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
				contentContext.onPointerGraceIntentChange(null);
				openTimerRef.value = window.setTimeout(() => {
					menuContext.onOpenChange(true);
					clearOpenTimer();
				}, 100);
			}
		}
		async function handlePointerLeave(event) {
			if (!isMouseEvent(event)) return;
			clearOpenTimer();
			const contentRect = menuContext.content.value?.getBoundingClientRect();
			if (contentRect?.width) {
				const side = menuContext.content.value?.dataset.side;
				const rightSide = side === "right";
				const bleed = rightSide ? -5 : 5;
				const contentNearEdge = contentRect[rightSide ? "left" : "right"];
				const contentFarEdge = contentRect[rightSide ? "right" : "left"];
				contentContext.onPointerGraceIntentChange({
					area: [
						{
							x: event.clientX + bleed,
							y: event.clientY
						},
						{
							x: contentNearEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.top
						},
						{
							x: contentFarEdge,
							y: contentRect.bottom
						},
						{
							x: contentNearEdge,
							y: contentRect.bottom
						}
					],
					side
				});
				window.clearTimeout(contentContext.pointerGraceTimerRef.value);
				contentContext.pointerGraceTimerRef.value = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
			} else {
				const defaultPrevented = contentContext.onTriggerLeave(event);
				if (defaultPrevented) return;
				contentContext.onPointerGraceIntentChange(null);
			}
		}
		async function handleKeyDown(event) {
			const isTypingAhead = contentContext.searchRef.value !== "";
			if (props.disabled || isTypingAhead && event.key === " ") return;
			if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
				menuContext.onOpenChange(true);
				await vueExports.nextTick();
				menuContext.content.value?.focus();
				event.preventDefault();
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(MenuAnchor_default, { "as-child": "" }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(MenuItemImpl_default, vueExports.mergeProps(props, {
					id: vueExports.unref(subContext).triggerId,
					ref: (vnode) => {
						vueExports.unref(subContext)?.onTriggerChange(vnode?.$el);
						return void 0;
					},
					"aria-haspopup": "menu",
					"aria-expanded": vueExports.unref(menuContext).open.value,
					"aria-controls": vueExports.unref(subContext).contentId,
					"data-state": vueExports.unref(getOpenState$1)(vueExports.unref(menuContext).open.value),
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (props.disabled || event.defaultPrevented) return;
						/**
						* We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
						* and we rely heavily on `onFocusOutside` for submenus to close when switching
						* between separate submenus.
						*/
						event.currentTarget.focus();
						if (!vueExports.unref(menuContext).open.value) vueExports.unref(menuContext).onOpenChange(true);
					}),
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onKeydown: handleKeyDown
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"aria-expanded",
					"aria-controls",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Menu/MenuSubTrigger.vue
var MenuSubTrigger_default = MenuSubTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverRoot.vue?vue&type=script&setup=true&lang.ts
const [injectPopoverRootContext, providePopoverRootContext] = createContext("PopoverRoot");
var PopoverRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		modal: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { modal } = vueExports.toRefs(props);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = vueExports.ref();
		const hasCustomAnchor = vueExports.ref(false);
		providePopoverRootContext({
			contentId: "",
			triggerId: "",
			modal,
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerElement,
			hasCustomAnchor
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
					open: vueExports.unref(open),
					close: () => open.value = false
				})]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Popover/PopoverRoot.vue
var PopoverRoot_default = PopoverRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverAnchor.vue?vue&type=script&setup=true&lang.ts
var PopoverAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverAnchor",
	props: {
		reference: {
			type: null,
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
		useForwardExpose();
		const rootContext = injectPopoverRootContext();
		vueExports.onBeforeMount(() => {
			rootContext.hasCustomAnchor.value = true;
		});
		vueExports.onUnmounted(() => {
			rootContext.hasCustomAnchor.value = false;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Popover/PopoverAnchor.vue
var PopoverAnchor_default = PopoverAnchor_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverArrow.vue?vue&type=script&setup=true&lang.ts
var PopoverArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Popover/PopoverArrow.vue
var PopoverArrow_default = PopoverArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverClose.vue?vue&type=script&setup=true&lang.ts
var PopoverClose_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverClose",
	props: {
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
		useForwardExpose();
		const rootContext = injectPopoverRootContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				type: _ctx.as === "button" ? "button" : void 0,
				as: _ctx.as,
				"as-child": props.asChild,
				onClick: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(false))
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"type",
				"as",
				"as-child"
			]);
		};
	}
});

//#endregion
//#region src/Popover/PopoverClose.vue
var PopoverClose_default = PopoverClose_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverContentImpl.vue?vue&type=script&setup=true&lang.ts
var PopoverContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverContentImpl",
	props: {
		trapFocus: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(reactiveOmit$1(props, "trapFocus", "disableOutsidePointerEvents"));
		const { forwardRef } = useForwardExpose();
		const rootContext = injectPopoverRootContext();
		useFocusGuards();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(FocusScope_default), {
				"as-child": "",
				loop: "",
				trapped: _ctx.trapFocus,
				onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
				onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
					"as-child": "",
					"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
					onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
					onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
					onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onDismiss: _cache[4] || (_cache[4] = ($event) => vueExports.unref(rootContext).onOpenChange(false))
				}, {
					default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(PopperContent_default), vueExports.mergeProps(vueExports.unref(forwarded), {
						id: vueExports.unref(rootContext).contentId,
						ref: vueExports.unref(forwardRef),
						"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
						"aria-labelledby": vueExports.unref(rootContext).triggerId,
						style: {
							"--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
							"--reka-popover-content-available-width": "var(--reka-popper-available-width)",
							"--reka-popover-content-available-height": "var(--reka-popper-available-height)",
							"--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
							"--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
						},
						role: "dialog"
					}), {
						default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 16, [
						"id",
						"data-state",
						"aria-labelledby"
					])]),
					_: 3
				}, 8, ["disable-outside-pointer-events"])]),
				_: 3
			}, 8, ["trapped"]);
		};
	}
});

//#endregion
//#region src/Popover/PopoverContentImpl.vue
var PopoverContentImpl_default = PopoverContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverContentModal.vue?vue&type=script&setup=true&lang.ts
var PopoverContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverContentModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const isRightClickOutsideRef = vueExports.ref(false);
		useBodyScrollLock(true);
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef, currentElement } = useForwardExpose();
		useHideOthers(currentElement);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(PopoverContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
				ref: vueExports.unref(forwardRef),
				"trap-focus": vueExports.unref(rootContext).open.value,
				"disable-outside-pointer-events": "",
				onCloseAutoFocus: _cache[0] || (_cache[0] = vueExports.withModifiers((event) => {
					emits("closeAutoFocus", event);
					if (!isRightClickOutsideRef.value) vueExports.unref(rootContext).triggerElement.value?.focus();
				}, ["prevent"])),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					emits("pointerDownOutside", event);
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					isRightClickOutsideRef.value = isRightClick;
				}),
				onFocusOutside: _cache[2] || (_cache[2] = vueExports.withModifiers(() => {}, ["prevent"]))
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["trap-focus"]);
		};
	}
});

//#endregion
//#region src/Popover/PopoverContentModal.vue
var PopoverContentModal_default = PopoverContentModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverContentNonModal.vue?vue&type=script&setup=true&lang.ts
var PopoverContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverContentNonModal",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const hasInteractedOutsideRef = vueExports.ref(false);
		const hasPointerDownOutsideRef = vueExports.ref(false);
		const forwarded = useForwardPropsEmits(props, emits);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(PopoverContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
				"trap-focus": false,
				"disable-outside-pointer-events": false,
				onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
					emits("closeAutoFocus", event);
					if (!event.defaultPrevented) {
						if (!hasInteractedOutsideRef.value) vueExports.unref(rootContext).triggerElement.value?.focus();
						event.preventDefault();
					}
					hasInteractedOutsideRef.value = false;
					hasPointerDownOutsideRef.value = false;
				}),
				onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
					emits("interactOutside", event);
					if (!event.defaultPrevented) {
						hasInteractedOutsideRef.value = true;
						if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
					}
					const target = event.target;
					const targetIsTrigger = vueExports.unref(rootContext).triggerElement.value?.contains(target);
					if (targetIsTrigger) event.preventDefault();
					if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Popover/PopoverContentNonModal.vue
var PopoverContentNonModal_default = PopoverContentNonModal_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverContent.vue?vue&type=script&setup=true&lang.ts
var PopoverContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false
		},
		disableOutsidePointerEvents: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectPopoverRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		rootContext.contentId ||= useId(void 0, "reka-popover-content");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.unref(rootContext).modal.value ? (vueExports.openBlock(), vueExports.createBlock(PopoverContentModal_default, vueExports.mergeProps({ key: 0 }, vueExports.unref(forwarded), { ref: vueExports.unref(forwardRef) }), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)) : (vueExports.openBlock(), vueExports.createBlock(PopoverContentNonModal_default, vueExports.mergeProps({ key: 1 }, vueExports.unref(forwarded), { ref: vueExports.unref(forwardRef) }), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Popover/PopoverContent.vue
var PopoverContent_default = PopoverContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverPortal.vue?vue&type=script&setup=true&lang.ts
var PopoverPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Popover/PopoverPortal.vue
var PopoverPortal_default = PopoverPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/Popover/PopoverTrigger.vue?vue&type=script&setup=true&lang.ts
var PopoverTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "PopoverTrigger",
	props: {
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
		const rootContext = injectPopoverRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		rootContext.triggerId ||= useId(void 0, "reka-popover-trigger");
		vueExports.onMounted(() => {
			rootContext.triggerElement.value = triggerElement.value;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(rootContext).hasCustomAnchor.value ? vueExports.unref(Primitive) : vueExports.unref(PopperAnchor_default)), { "as-child": "" }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					id: vueExports.unref(rootContext).triggerId,
					ref: vueExports.unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"aria-haspopup": "dialog",
					"aria-expanded": vueExports.unref(rootContext).open.value,
					"aria-controls": vueExports.unref(rootContext).contentId,
					"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
					as: _ctx.as,
					"as-child": props.asChild,
					onClick: vueExports.unref(rootContext).onOpenToggle
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"aria-expanded",
					"aria-controls",
					"data-state",
					"as",
					"as-child",
					"onClick"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Popover/PopoverTrigger.vue
var PopoverTrigger_default = PopoverTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuArrow.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuArrow.vue
var DropdownMenuArrow_default = DropdownMenuArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuCheckboxItem.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuCheckboxItem",
	props: {
		modelValue: {
			type: [Boolean, String],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select", "update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const emitsAsProps = useEmitAsProps(emits);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuCheckboxItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
				...props,
				...vueExports.unref(emitsAsProps)
			})), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuCheckboxItem.vue
var DropdownMenuCheckboxItem_default = DropdownMenuCheckboxItem_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuRoot.vue?vue&type=script&setup=true&lang.ts
const [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = createContext("DropdownMenuRoot");
var DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dir: {
			type: String,
			required: false
		},
		modal: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const triggerElement = vueExports.ref();
		const { modal, dir: propDir } = vueExports.toRefs(props);
		const dir = useDirection(propDir);
		provideDropdownMenuRootContext({
			open,
			onOpenChange: (value) => {
				open.value = value;
			},
			onOpenToggle: () => {
				open.value = !open.value;
			},
			triggerId: "",
			triggerElement,
			contentId: "",
			modal,
			dir
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRoot_default), {
				open: vueExports.unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(open) ? open.value = $event : null),
				dir: vueExports.unref(dir),
				modal: vueExports.unref(modal)
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
				_: 3
			}, 8, [
				"open",
				"dir",
				"modal"
			]);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuRoot.vue
var DropdownMenuRoot_default = DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuContent.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		useForwardExpose();
		const rootContext = injectDropdownMenuRootContext();
		const hasInteractedOutsideRef = vueExports.ref(false);
		function handleCloseAutoFocus(event) {
			if (event.defaultPrevented) return;
			if (!hasInteractedOutsideRef.value) setTimeout(() => {
				rootContext.triggerElement.value?.focus();
			}, 0);
			hasInteractedOutsideRef.value = false;
			event.preventDefault();
		}
		rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuContent_default), vueExports.mergeProps(vueExports.unref(forwarded), {
				id: vueExports.unref(rootContext).contentId,
				"aria-labelledby": vueExports.unref(rootContext)?.triggerId,
				style: {
					"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
					"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
					"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
				},
				onCloseAutoFocus: handleCloseAutoFocus,
				onInteractOutside: _cache[0] || (_cache[0] = (event) => {
					if (event.defaultPrevented) return;
					const originalEvent = event.detail.originalEvent;
					const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
					const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
					if (!vueExports.unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
					if (vueExports.unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id", "aria-labelledby"]);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuContent.vue
var DropdownMenuContent_default = DropdownMenuContent_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuGroup.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuGroup",
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
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuGroup_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuGroup.vue
var DropdownMenuGroup_default = DropdownMenuGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuItem.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuItem",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const emitsAsProps = useEmitAsProps(emits);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
				...props,
				...vueExports.unref(emitsAsProps)
			})), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuItem.vue
var DropdownMenuItem_default = DropdownMenuItem_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuItemIndicator.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuItemIndicator",
	props: {
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuItemIndicator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuItemIndicator.vue
var DropdownMenuItemIndicator_default = DropdownMenuItemIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuLabel.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuLabel",
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
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuLabel_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuLabel.vue
var DropdownMenuLabel_default = DropdownMenuLabel_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuPortal.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuPortal_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuPortal.vue
var DropdownMenuPortal_default = DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuRadioGroup.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuRadioGroup",
	props: {
		modelValue: {
			type: null,
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
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const emitsAsProps = useEmitAsProps(emits);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRadioGroup_default), vueExports.normalizeProps(vueExports.guardReactiveProps({
				...props,
				...vueExports.unref(emitsAsProps)
			})), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuRadioGroup.vue
var DropdownMenuRadioGroup_default = DropdownMenuRadioGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuRadioItem.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuRadioItem",
	props: {
		value: {
			type: null,
			required: true
		},
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuRadioItem_default), vueExports.normalizeProps(vueExports.guardReactiveProps(vueExports.unref(forwarded))), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuRadioItem.vue
var DropdownMenuRadioItem_default = DropdownMenuRadioItem_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuSeparator.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuSeparator",
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
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSeparator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuSeparator.vue
var DropdownMenuSeparator_default = DropdownMenuSeparator_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuSub.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuSub",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const open = useVModel(props, "open", emit, {
			passive: props.open === void 0,
			defaultValue: props.defaultOpen ?? false
		});
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSub_default), {
				open: vueExports.unref(open),
				"onUpdate:open": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(open) ? open.value = $event : null)
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
				_: 3
			}, 8, ["open"]);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuSub.vue
var DropdownMenuSub_default = DropdownMenuSub_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuSubContent.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuSubContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		loop: {
			type: Boolean,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside",
		"entryFocus",
		"openAutoFocus",
		"closeAutoFocus"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSubContent_default), vueExports.mergeProps(vueExports.unref(forwarded), { style: {
				"--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
				"--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
				"--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
				"--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
				"--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
			} }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuSubContent.vue
var DropdownMenuSubContent_default = DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuSubTrigger.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuSubTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
		},
		textValue: {
			type: String,
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
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuSubTrigger_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuSubTrigger.vue
var DropdownMenuSubTrigger_default = DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/DropdownMenu/DropdownMenuTrigger.vue?vue&type=script&setup=true&lang.ts
var DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "DropdownMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
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
		const rootContext = injectDropdownMenuRootContext();
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		vueExports.onMounted(() => {
			rootContext.triggerElement = triggerElement;
		});
		rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(MenuAnchor_default), { "as-child": "" }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					id: vueExports.unref(rootContext).triggerId,
					ref: vueExports.unref(forwardRef),
					type: _ctx.as === "button" ? "button" : void 0,
					"as-child": props.asChild,
					as: _ctx.as,
					"aria-haspopup": "menu",
					"aria-expanded": vueExports.unref(rootContext).open.value,
					"aria-controls": vueExports.unref(rootContext).open.value ? vueExports.unref(rootContext).contentId : void 0,
					"data-disabled": _ctx.disabled ? "" : void 0,
					disabled: _ctx.disabled,
					"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
					onClick: _cache[0] || (_cache[0] = async (event) => {
						if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
							vueExports.unref(rootContext)?.onOpenToggle();
							await vueExports.nextTick();
							if (vueExports.unref(rootContext).open.value) event.preventDefault();
						}
					}),
					onKeydown: _cache[1] || (_cache[1] = vueExports.withKeys((event) => {
						if (_ctx.disabled) return;
						if (["Enter", " "].includes(event.key)) vueExports.unref(rootContext).onOpenToggle();
						if (event.key === "ArrowDown") vueExports.unref(rootContext).onOpenChange(true);
						if ([
							"Enter",
							" ",
							"ArrowDown"
						].includes(event.key)) event.preventDefault();
					}, [
						"enter",
						"space",
						"arrow-down"
					]))
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"id",
					"type",
					"as-child",
					"as",
					"aria-expanded",
					"aria-controls",
					"data-disabled",
					"disabled",
					"data-state"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/DropdownMenu/DropdownMenuTrigger.vue
var DropdownMenuTrigger_default = DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/HoverCardArrow.vue?vue&type=script&setup=true&lang.ts
var HoverCardArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardArrow",
	props: {
		width: {
			type: Number,
			required: false,
			default: 10
		},
		height: {
			type: Number,
			required: false,
			default: 5
		},
		rounded: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "svg"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardArrow.vue
var HoverCardArrow_default = HoverCardArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/HoverCardRoot.vue?vue&type=script&setup=true&lang.ts
const [injectHoverCardRootContext, provideHoverCardRootContext] = createContext("HoverCardRoot");
var HoverCardRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardRoot",
	props: {
		defaultOpen: {
			type: Boolean,
			required: false,
			default: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		openDelay: {
			type: Number,
			required: false,
			default: 700
		},
		closeDelay: {
			type: Number,
			required: false,
			default: 300
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { openDelay, closeDelay } = vueExports.toRefs(props);
		useForwardExpose();
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		const openTimerRef = vueExports.ref(0);
		const closeTimerRef = vueExports.ref(0);
		const hasSelectionRef = vueExports.ref(false);
		const isPointerDownOnContentRef = vueExports.ref(false);
		const isPointerInTransitRef = vueExports.ref(false);
		const triggerElement = vueExports.ref();
		function handleOpen() {
			clearTimeout(closeTimerRef.value);
			openTimerRef.value = window.setTimeout(() => open.value = true, openDelay.value);
		}
		function handleClose() {
			clearTimeout(openTimerRef.value);
			if (!hasSelectionRef.value && !isPointerDownOnContentRef.value) closeTimerRef.value = window.setTimeout(() => open.value = false, closeDelay.value);
		}
		function handleDismiss() {
			open.value = false;
		}
		provideHoverCardRootContext({
			open,
			onOpenChange(value) {
				open.value = value;
			},
			onOpen: handleOpen,
			onClose: handleClose,
			onDismiss: handleDismiss,
			hasSelectionRef,
			isPointerDownOnContentRef,
			isPointerInTransitRef,
			triggerElement
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { open: vueExports.unref(open) })]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardRoot.vue
var HoverCardRoot_default = HoverCardRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/utils.ts
function excludeTouch(eventHandler) {
	return (event) => event.pointerType === "touch" ? void 0 : eventHandler();
}
/**
* Returns a list of nodes that can be in the tab sequence.
* @see: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
*/
function getTabbableNodes(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}

//#region src/HoverCard/HoverCardContentImpl.vue?vue&type=script&setup=true&lang.ts
var HoverCardContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardContentImpl",
	props: {
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardProps(props);
		const { forwardRef, currentElement: contentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement);
		syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: "rtl" });
		onPointerExit(() => {
			rootContext.onClose();
		});
		const containSelection = vueExports.ref(false);
		let originalBodyUserSelect;
		vueExports.watchEffect((cleanupFn) => {
			if (containSelection.value) {
				const body = document.body;
				originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;
				body.style.userSelect = "none";
				body.style.webkitUserSelect = "none";
				cleanupFn(() => {
					body.style.userSelect = originalBodyUserSelect;
					body.style.webkitUserSelect = originalBodyUserSelect;
				});
			}
		});
		function handlePointerUp() {
			containSelection.value = false;
			rootContext.isPointerDownOnContentRef.value = false;
			vueExports.nextTick(() => {
				const hasSelection = document.getSelection()?.toString() !== "";
				if (hasSelection) rootContext.hasSelectionRef.value = true;
			});
		}
		vueExports.onMounted(() => {
			if (contentElement.value) {
				document.addEventListener("pointerup", handlePointerUp);
				const tabbables = getTabbableNodes(contentElement.value);
				tabbables.forEach((tabbable) => tabbable.setAttribute("tabindex", "-1"));
			}
		});
		vueExports.onUnmounted(() => {
			document.removeEventListener("pointerup", handlePointerUp);
			rootContext.hasSelectionRef.value = false;
			rootContext.isPointerDownOnContentRef.value = false;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
				onFocusOutside: _cache[3] || (_cache[3] = vueExports.withModifiers(($event) => emits("focusOutside", $event), ["prevent"])),
				onDismiss: vueExports.unref(rootContext).onDismiss
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(PopperContent_default), vueExports.mergeProps({
					...vueExports.unref(forwarded),
					..._ctx.$attrs
				}, {
					ref: vueExports.unref(forwardRef),
					"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
					style: {
						"userSelect": containSelection.value ? "text" : void 0,
						"WebkitUserSelect": containSelection.value ? "text" : void 0,
						"--reka-hover-card-content-transform-origin": "var(--reka-popper-transform-origin)",
						"--reka-hover-card-content-available-width": "var(--reka-popper-available-width)",
						"--reka-hover-card-content-available-height": "var(--reka-popper-available-height)",
						"--reka-hover-card-trigger-width": "var(--reka-popper-anchor-width)",
						"--reka-hover-card-trigger-height": "var(--reka-popper-anchor-height)"
					},
					onPointerdown: _cache[0] || (_cache[0] = (event) => {
						if (event.currentTarget.contains(event.target)) containSelection.value = true;
						vueExports.unref(rootContext).hasSelectionRef.value = false;
						vueExports.unref(rootContext).isPointerDownOnContentRef.value = true;
					})
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["data-state", "style"])]),
				_: 3
			}, 8, ["onDismiss"]);
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardContentImpl.vue
var HoverCardContentImpl_default = HoverCardContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/HoverCardContent.vue?vue&type=script&setup=true&lang.ts
var HoverCardContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
			required: false
		},
		sideFlip: {
			type: Boolean,
			required: false
		},
		align: {
			type: null,
			required: false
		},
		alignOffset: {
			type: Number,
			required: false
		},
		alignFlip: {
			type: Boolean,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false
		},
		collisionBoundary: {
			type: null,
			required: false
		},
		collisionPadding: {
			type: [Number, Object],
			required: false
		},
		arrowPadding: {
			type: Number,
			required: false
		},
		hideShiftedArrow: {
			type: Boolean,
			required: false
		},
		sticky: {
			type: String,
			required: false
		},
		hideWhenDetached: {
			type: Boolean,
			required: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		},
		disableUpdateOnLayoutShift: {
			type: Boolean,
			required: false
		},
		prioritizePosition: {
			type: Boolean,
			required: false
		},
		reference: {
			type: null,
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(HoverCardContentImpl_default, vueExports.mergeProps(vueExports.unref(forwarded), {
					ref: vueExports.unref(forwardRef),
					onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(excludeTouch)(vueExports.unref(rootContext).onOpen)($event))
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardContent.vue
var HoverCardContent_default = HoverCardContent_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/HoverCardPortal.vue?vue&type=script&setup=true&lang.ts
var HoverCardPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardPortal",
	props: {
		to: {
			type: null,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		defer: {
			type: Boolean,
			required: false
		},
		forceMount: {
			type: Boolean,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Teleport_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardPortal.vue
var HoverCardPortal_default = HoverCardPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/HoverCard/HoverCardTrigger.vue?vue&type=script&setup=true&lang.ts
var HoverCardTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "HoverCardTrigger",
	props: {
		reference: {
			type: null,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "a"
		}
	},
	setup(__props) {
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectHoverCardRootContext();
		rootContext.triggerElement = currentElement;
		function handleLeave() {
			setTimeout(() => {
				if (!rootContext.isPointerInTransitRef.value && !rootContext.open.value) rootContext.onClose();
			}, 0);
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					ref: vueExports.unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as,
					"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
					"data-grace-area-trigger": "",
					onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(excludeTouch)(vueExports.unref(rootContext).onOpen)($event)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => vueExports.unref(excludeTouch)(handleLeave)($event)),
					onFocus: _cache[2] || (_cache[2] = ($event) => vueExports.unref(rootContext).onOpen()),
					onBlur: _cache[3] || (_cache[3] = ($event) => vueExports.unref(rootContext).onClose())
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as-child",
					"as",
					"data-state"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});

//#endregion
//#region src/HoverCard/HoverCardTrigger.vue
var HoverCardTrigger_default = HoverCardTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/utils.ts
function getOpenState(open) {
	return open ? "open" : "closed";
}
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
const LINK_SELECT = "navigationMenu.linkSelect";
const EVENT_ROOT_CONTENT_DISMISS = "navigationMenu.rootContentDismiss";
/**
* Returns a list of potential tabbable candidates.
*
* NOTE: This is only a close approximation. For example it doesn't take into account cases like when
* elements are not visible. This cannot be worked out easily by just reading a property, but rather
* necessitate runtime knowledge (computed styles, etc). We deal with these cases separately.
*
* See: https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
* Credit: https://github.com/discord/focus-layers/blob/master/src/util/wrapFocus.tsx#L1
*/
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
function focusFirst(candidates) {
	const previouslyFocusedElement = getActiveElement();
	return candidates.some((candidate) => {
		if (candidate === previouslyFocusedElement) return true;
		candidate.focus();
		return getActiveElement() !== previouslyFocusedElement;
	});
}
function removeFromTabOrder(candidates) {
	candidates.forEach((candidate) => {
		candidate.dataset.tabindex = candidate.getAttribute("tabindex") || "";
		candidate.setAttribute("tabindex", "-1");
	});
	return () => {
		candidates.forEach((candidate) => {
			const prevTabIndex = candidate.dataset.tabindex;
			candidate.setAttribute("tabindex", prevTabIndex);
		});
	};
}
function whenMouse(handler) {
	return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}

//#region src/NavigationMenu/NavigationMenuRoot.vue?vue&type=script&setup=true&lang.ts
const [injectNavigationMenuContext, provideNavigationMenuContext] = createContext(["NavigationMenuRoot", "NavigationMenuSub"], "NavigationMenuContext");
var NavigationMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "NavigationMenuRoot",
	props: {
		modelValue: {
			type: String,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: String,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "horizontal"
		},
		delayDuration: {
			type: Number,
			required: false,
			default: 200
		},
		skipDelayDuration: {
			type: Number,
			required: false,
			default: 300
		},
		disableClickTrigger: {
			type: Boolean,
			required: false,
			default: false
		},
		disableHoverTrigger: {
			type: Boolean,
			required: false,
			default: false
		},
		disablePointerLeaveClose: {
			type: Boolean,
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
			required: false,
			default: "nav"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? "",
			passive: props.modelValue === void 0
		});
		const previousValue = vueExports.ref("");
		const { forwardRef, currentElement: rootNavigationMenu } = useForwardExpose();
		const indicatorTrack = vueExports.ref();
		const viewport = vueExports.ref();
		const activeTrigger = vueExports.ref();
		const { getItems, CollectionSlot } = useCollection({
			key: "NavigationMenu",
			isProvider: true
		});
		const { delayDuration, skipDelayDuration, dir: propDir, disableClickTrigger, disableHoverTrigger, unmountOnHide } = vueExports.toRefs(props);
		const dir = useDirection(propDir);
		const isDelaySkipped = refAutoReset(false, skipDelayDuration);
		const computedDelay = vueExports.computed(() => {
			const isOpen = modelValue.value !== "";
			if (isOpen || isDelaySkipped.value) return 150;
			else return delayDuration.value;
		});
		const debouncedFn = useDebounceFn((val) => {
			if (typeof val === "string") {
				previousValue.value = modelValue.value;
				modelValue.value = val;
			}
		}, computedDelay);
		vueExports.watchEffect(() => {
			if (!modelValue.value) return;
			const items = getItems().map((i) => i.ref);
			activeTrigger.value = items.find((item) => item.id.includes(modelValue.value));
		});
		useEventListener(rootNavigationMenu, EVENT_ROOT_CONTENT_DISMISS, onItemDismiss);
		provideNavigationMenuContext({
			isRootMenu: true,
			modelValue,
			previousValue,
			baseId: useId(void 0, "reka-navigation-menu"),
			disableClickTrigger,
			disableHoverTrigger,
			dir,
			unmountOnHide,
			orientation: props.orientation,
			rootNavigationMenu,
			indicatorTrack,
			activeTrigger,
			onIndicatorTrackChange: (val) => {
				indicatorTrack.value = val;
			},
			viewport,
			onViewportChange: (val) => {
				viewport.value = val;
			},
			onTriggerEnter: (val) => {
				debouncedFn(val);
			},
			onTriggerLeave: () => {
				isDelaySkipped.value = true;
				debouncedFn("");
			},
			onContentEnter: () => {
				debouncedFn();
			},
			onContentLeave: () => {
				if (!props.disablePointerLeaveClose) debouncedFn("");
			},
			onItemSelect: (val) => {
				previousValue.value = modelValue.value;
				modelValue.value = val;
			},
			onItemDismiss
		});
		function onItemDismiss() {
			previousValue.value = modelValue.value;
			modelValue.value = "";
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					ref: vueExports.unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-orientation": _ctx.orientation,
					dir: vueExports.unref(dir),
					"data-reka-navigation-menu": ""
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"data-orientation",
					"dir"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuRoot.vue
var NavigationMenuRoot_default = NavigationMenuRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuItem.vue?vue&type=script&setup=true&lang.ts
const [injectNavigationMenuItemContext, provideNavigationMenuItemContext] = createContext("NavigationMenuItem");
var NavigationMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "NavigationMenuItem",
	props: {
		value: {
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
			default: "li"
		}
	},
	setup(__props) {
		const props = __props;
		useForwardExpose();
		const { getItems } = useCollection({ key: "NavigationMenu" });
		const context = injectNavigationMenuContext();
		const value = useId(props.value);
		const triggerRef = vueExports.ref();
		const focusProxyRef = vueExports.ref();
		const contentId = makeContentId(context.baseId, value);
		let restoreContentTabOrderRef = () => ({});
		const wasEscapeCloseRef = vueExports.ref(false);
		async function handleContentEntry(side = "start") {
			const el = document.getElementById(contentId);
			if (el) {
				restoreContentTabOrderRef();
				const candidates = getTabbableCandidates(el);
				if (candidates.length) focusFirst(side === "start" ? candidates : candidates.reverse());
			}
		}
		function handleContentExit() {
			const el = document.getElementById(contentId);
			if (el) {
				const candidates = getTabbableCandidates(el);
				if (candidates.length) restoreContentTabOrderRef = removeFromTabOrder(candidates);
			}
		}
		provideNavigationMenuItemContext({
			value,
			contentId,
			triggerRef,
			focusProxyRef,
			wasEscapeCloseRef,
			onEntryKeyDown: handleContentEntry,
			onFocusProxyEnter: handleContentEntry,
			onContentFocusOutside: handleContentExit,
			onRootContentClose: handleContentExit
		});
		function handleClose() {
			context.onItemDismiss();
			triggerRef.value?.focus();
		}
		function handleKeydown(ev) {
			const currentFocus = getActiveElement();
			if (ev.keyCode === 32 || ev.key === "Enter") if (context.modelValue.value === value) {
				handleClose();
				ev.preventDefault();
				return;
			} else {
				ev.target.click();
				ev.preventDefault();
				return;
			}
			const itemsArray = getItems().filter((i) => i.ref.parentElement?.hasAttribute("data-menu-item")).map((i) => i.ref);
			if (!itemsArray.includes(currentFocus)) return;
			const newSelectedElement = useArrowNavigation(ev, currentFocus, void 0, {
				itemsArray,
				loop: false
			});
			if (newSelectedElement) newSelectedElement?.focus();
			ev.preventDefault();
			ev.stopPropagation();
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				"as-child": _ctx.asChild,
				as: _ctx.as,
				"data-menu-item": "",
				onKeydown: vueExports.withKeys(handleKeydown, [
					"up",
					"down",
					"left",
					"right",
					"home",
					"end",
					"space"
				])
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuItem.vue
var NavigationMenuItem_default = NavigationMenuItem_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuContentImpl.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "NavigationMenuContentImpl",
	props: {
		disableOutsidePointerEvents: {
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { getItems } = useCollection({ key: "NavigationMenu" });
		const { forwardRef, currentElement } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const triggerId = makeTriggerId(menuContext.baseId, itemContext.value);
		const contentId = makeContentId(menuContext.baseId, itemContext.value);
		const prevMotionAttributeRef = vueExports.ref(null);
		const motionAttribute = vueExports.computed(() => {
			const values = getItems().map((i) => i.ref.id.split("trigger-")[1]);
			if (menuContext.dir.value === "rtl") values.reverse();
			const index = values.indexOf(menuContext.modelValue.value);
			const prevIndex = values.indexOf(menuContext.previousValue.value);
			const isSelected = itemContext.value === menuContext.modelValue.value;
			const wasSelected = prevIndex === values.indexOf(itemContext.value);
			if (!isSelected && !wasSelected) return prevMotionAttributeRef.value;
			const attribute = (() => {
				if (index !== prevIndex) {
					if (isSelected && prevIndex !== -1) return index > prevIndex ? "from-end" : "from-start";
					if (wasSelected && index !== -1) return index > prevIndex ? "to-start" : "to-end";
				}
				return null;
			})();
			prevMotionAttributeRef.value = attribute;
			return attribute;
		});
		function handleFocusOutside(ev) {
			emits("focusOutside", ev);
			emits("interactOutside", ev);
			const target = ev.detail.originalEvent.target;
			if (target.hasAttribute("data-navigation-menu-trigger")) ev.preventDefault();
			if (!ev.defaultPrevented) {
				itemContext.onContentFocusOutside();
				const target$1 = ev.target;
				if (menuContext.rootNavigationMenu?.value?.contains(target$1)) ev.preventDefault();
			}
		}
		function handlePointerDownOutside(ev) {
			emits("pointerDownOutside", ev);
			if (!ev.defaultPrevented) {
				const target = ev.target;
				const isTrigger = getItems().some((i) => i.ref.contains(target));
				const isRootViewport = menuContext.isRootMenu && menuContext.viewport.value?.contains(target);
				if (isTrigger || isRootViewport || !menuContext.isRootMenu) ev.preventDefault();
			}
		}
		vueExports.watchEffect((cleanupFn) => {
			const content = currentElement.value;
			if (menuContext.isRootMenu && content) {
				const handleClose = () => {
					menuContext.onItemDismiss();
					itemContext.onRootContentClose();
					if (content.contains(getActiveElement())) itemContext.triggerRef.value?.focus();
				};
				content.addEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose);
				cleanupFn(() => content.removeEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose));
			}
		});
		function handleEscapeKeyDown(ev) {
			emits("escapeKeyDown", ev);
			if (!ev.defaultPrevented) {
				menuContext.onItemDismiss();
				itemContext.triggerRef?.value?.focus();
				itemContext.wasEscapeCloseRef.value = true;
			}
		}
		function handleKeydown(ev) {
			if (ev.target.closest("[data-reka-navigation-menu]") !== menuContext.rootNavigationMenu.value) return;
			const isMetaKey = ev.altKey || ev.ctrlKey || ev.metaKey;
			const isTabKey = ev.key === "Tab" && !isMetaKey;
			const candidates = getTabbableCandidates(ev.currentTarget);
			if (isTabKey) {
				const focusedElement = getActiveElement();
				const index = candidates.findIndex((candidate) => candidate === focusedElement);
				const isMovingBackwards = ev.shiftKey;
				const nextCandidates = isMovingBackwards ? candidates.slice(0, index).reverse() : candidates.slice(index + 1, candidates.length);
				if (focusFirst(nextCandidates)) ev.preventDefault();
				else {
					itemContext.focusProxyRef.value?.focus();
					return;
				}
			}
			const newSelectedElement = useArrowNavigation(ev, getActiveElement(), void 0, {
				itemsArray: candidates,
				loop: false,
				enableIgnoredElement: true
			});
			newSelectedElement?.focus();
		}
		function handleDismiss() {
			const rootContentDismissEvent = new Event(EVENT_ROOT_CONTENT_DISMISS, {
				bubbles: true,
				cancelable: true
			});
			currentElement.value?.dispatchEvent(rootContentDismissEvent);
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DismissableLayer_default), vueExports.mergeProps({
				id: vueExports.unref(contentId),
				ref: vueExports.unref(forwardRef),
				"aria-labelledby": vueExports.unref(triggerId),
				"data-motion": motionAttribute.value,
				"data-state": vueExports.unref(getOpenState)(vueExports.unref(menuContext).modelValue.value === vueExports.unref(itemContext).value),
				"data-orientation": vueExports.unref(menuContext).orientation
			}, props, {
				onKeydown: handleKeydown,
				onEscapeKeyDown: handleEscapeKeyDown,
				onPointerDownOutside: handlePointerDownOutside,
				onFocusOutside: handleFocusOutside,
				onDismiss: handleDismiss
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"aria-labelledby",
				"data-motion",
				"data-state",
				"data-orientation"
			]);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuContentImpl.vue
var NavigationMenuContentImpl_default = NavigationMenuContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuContent.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		disableOutsidePointerEvents: {
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
	emits: [
		"escapeKeyDown",
		"pointerDownOutside",
		"focusOutside",
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(reactiveOmit$1(props, "forceMount"), emits);
		const { forwardRef } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const open = vueExports.computed(() => itemContext.value === menuContext.modelValue.value);
		const isLastActiveValue = vueExports.computed(() => {
			if (menuContext.viewport.value) {
				if (!menuContext.modelValue.value && menuContext.previousValue.value) return menuContext.previousValue.value === itemContext.value;
			}
			return false;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, {
				to: vueExports.unref(isClient) && vueExports.unref(menuContext).viewport.value ? vueExports.unref(menuContext).viewport.value : "body",
				disabled: vueExports.unref(isClient) && vueExports.unref(menuContext).viewport.value ? !vueExports.unref(menuContext).viewport.value : true
			}, [vueExports.createVNode(vueExports.unref(Presence_default), {
				present: _ctx.forceMount || open.value || isLastActiveValue.value,
				"force-mount": !vueExports.unref(menuContext).unmountOnHide.value
			}, {
				default: vueExports.withCtx(({ present }) => [vueExports.createVNode(NavigationMenuContentImpl_default, vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					"data-state": vueExports.unref(getOpenState)(open.value),
					style: { pointerEvents: !open.value && vueExports.unref(menuContext).isRootMenu ? "none" : void 0 }
				}, {
					..._ctx.$attrs,
					...vueExports.unref(forwarded)
				}, {
					hidden: !present,
					onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onContentEnter(vueExports.unref(itemContext).value)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => vueExports.unref(whenMouse)(() => vueExports.unref(menuContext).onContentLeave())($event)),
					onPointerDownOutside: _cache[2] || (_cache[2] = ($event) => emits("pointerDownOutside", $event)),
					onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
					onInteractOutside: _cache[4] || (_cache[4] = ($event) => emits("interactOutside", $event))
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, [
					"data-state",
					"style",
					"hidden"
				])]),
				_: 3
			}, 8, ["present", "force-mount"])], 8, ["to", "disabled"]);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuContent.vue
var NavigationMenuContent_default = NavigationMenuContent_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuIndicator.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuIndicator",
	props: {
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
		const menuContext = injectNavigationMenuContext();
		const indicatorStyle = vueExports.ref();
		const isHorizontal = vueExports.computed(() => menuContext.orientation === "horizontal");
		const isVisible = vueExports.computed(() => !!menuContext.modelValue.value);
		const { activeTrigger } = menuContext;
		function handlePositionChange() {
			if (!activeTrigger.value) return;
			indicatorStyle.value = {
				size: isHorizontal.value ? activeTrigger.value.offsetWidth : activeTrigger.value.offsetHeight,
				position: isHorizontal.value ? activeTrigger.value.offsetLeft : activeTrigger.value.offsetTop
			};
		}
		vueExports.watchEffect(() => {
			if (!menuContext.modelValue.value) return;
			handlePositionChange();
		});
		useResizeObserver(activeTrigger, handlePositionChange);
		useResizeObserver(menuContext.indicatorTrack, handlePositionChange);
		return (_ctx, _cache) => {
			return vueExports.unref(menuContext).indicatorTrack.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Teleport, {
				key: 0,
				to: vueExports.unref(menuContext).indicatorTrack.value
			}, [vueExports.createVNode(vueExports.unref(Presence_default), { present: _ctx.forceMount || isVisible.value }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					"aria-hidden": "true",
					"data-state": isVisible.value ? "visible" : "hidden",
					"data-orientation": vueExports.unref(menuContext).orientation,
					"as-child": props.asChild,
					as: _ctx.as,
					style: { ...indicatorStyle.value ? {
						"--reka-navigation-menu-indicator-size": `${indicatorStyle.value.size}px`,
						"--reka-navigation-menu-indicator-position": `${indicatorStyle.value.position}px`
					} : {} }
				}, _ctx.$attrs), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"data-state",
					"data-orientation",
					"as-child",
					"as",
					"style"
				])]),
				_: 3
			}, 8, ["present"])], 8, ["to"])) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuIndicator.vue
var NavigationMenuIndicator_default = NavigationMenuIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuLink.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuLink_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "NavigationMenuLink",
	props: {
		active: {
			type: Boolean,
			required: false
		},
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "a"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { CollectionItem } = useCollection({ key: "NavigationMenu" });
		useForwardExpose();
		async function handleClick(ev) {
			const linkSelectEvent = new CustomEvent(LINK_SELECT, {
				bubbles: true,
				cancelable: true,
				detail: { originalEvent: ev }
			});
			emits("select", linkSelectEvent);
			if (!linkSelectEvent.defaultPrevented && !ev.metaKey) {
				const rootContentDismissEvent = new CustomEvent(EVENT_ROOT_CONTENT_DISMISS, {
					bubbles: true,
					cancelable: true
				});
				ev.target?.dispatchEvent(rootContentDismissEvent);
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					as: _ctx.as,
					"data-active": _ctx.active ? "" : void 0,
					"aria-current": _ctx.active ? "page" : void 0,
					"as-child": props.asChild,
					onClick: handleClick
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"data-active",
					"aria-current",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuLink.vue
var NavigationMenuLink_default = NavigationMenuLink_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuList.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuList_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuList",
	props: {
		asChild: {
			type: Boolean,
			required: false
		},
		as: {
			type: null,
			required: false,
			default: "ul"
		}
	},
	setup(__props) {
		const props = __props;
		const menuContext = injectNavigationMenuContext();
		const { forwardRef, currentElement } = useForwardExpose();
		vueExports.onMounted(() => {
			menuContext.onIndicatorTrackChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref: vueExports.unref(forwardRef),
				style: { "position": "relative" }
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
					"as-child": props.asChild,
					as: _ctx.as,
					"data-orientation": vueExports.unref(menuContext).orientation
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"as-child",
					"as",
					"data-orientation"
				])]),
				_: 3
			}, 512);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuList.vue
var NavigationMenuList_default = NavigationMenuList_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuTrigger.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-owns"];
var NavigationMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuTrigger",
	props: {
		disabled: {
			type: Boolean,
			required: false
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
		const menuContext = injectNavigationMenuContext();
		const itemContext = injectNavigationMenuItemContext();
		const { CollectionItem } = useCollection({ key: "NavigationMenu" });
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const triggerId = vueExports.ref("");
		const contentId = vueExports.ref("");
		const hasPointerMoveOpenedRef = refAutoReset(false, 300);
		const wasClickCloseRef = vueExports.ref(false);
		const open = vueExports.computed(() => itemContext.value === menuContext.modelValue.value);
		vueExports.onMounted(() => {
			itemContext.triggerRef = triggerElement;
			triggerId.value = makeTriggerId(menuContext.baseId, itemContext.value);
			contentId.value = makeContentId(menuContext.baseId, itemContext.value);
		});
		function handlePointerEnter() {
			if (menuContext.disableHoverTrigger.value) return;
			wasClickCloseRef.value = false;
			itemContext.wasEscapeCloseRef.value = false;
		}
		function handlePointerMove(ev) {
			if (menuContext.disableHoverTrigger.value) return;
			if (ev.pointerType === "mouse") {
				if (props.disabled || wasClickCloseRef.value || itemContext.wasEscapeCloseRef.value || hasPointerMoveOpenedRef.value) return;
				menuContext.onTriggerEnter(itemContext.value);
				hasPointerMoveOpenedRef.value = true;
			}
		}
		function handlePointerLeave(ev) {
			if (menuContext.disableHoverTrigger.value) return;
			if (ev.pointerType === "mouse") {
				if (props.disabled) return;
				menuContext.onTriggerLeave();
				hasPointerMoveOpenedRef.value = false;
			}
		}
		function handleClick(event) {
			if ((!("pointerType" in event) || event.pointerType === "mouse") && menuContext.disableClickTrigger.value) return;
			if (hasPointerMoveOpenedRef.value) return;
			if (open.value) menuContext.onItemSelect("");
			else menuContext.onItemSelect(itemContext.value);
			wasClickCloseRef.value = open.value;
		}
		function handleKeydown(ev) {
			const verticalEntryKey = menuContext.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight";
			const entryKey = {
				horizontal: "ArrowDown",
				vertical: verticalEntryKey
			}[menuContext.orientation];
			if (open.value && ev.key === entryKey) {
				itemContext.onEntryKeyDown();
				ev.preventDefault();
				ev.stopPropagation();
			}
		}
		function setFocusProxyRef(node) {
			itemContext.focusProxyRef.value = unrefElement(node);
			return void 0;
		}
		function handleVisuallyHiddenFocus(ev) {
			const content = document.getElementById(itemContext.contentId);
			const prevFocusedElement = ev.relatedTarget;
			const wasTriggerFocused = prevFocusedElement === triggerElement.value;
			const wasFocusFromContent = content?.contains(prevFocusedElement);
			if (wasTriggerFocused || !wasFocusFromContent) itemContext.onFocusProxyEnter(wasTriggerFocused ? "start" : "end");
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, null, [vueExports.createVNode(vueExports.unref(CollectionItem), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
					id: triggerId.value,
					ref: vueExports.unref(forwardRef),
					disabled: _ctx.disabled,
					"data-disabled": _ctx.disabled ? "" : void 0,
					"data-state": vueExports.unref(getOpenState)(open.value),
					"data-navigation-menu-trigger": "",
					"aria-expanded": open.value,
					"aria-controls": contentId.value,
					"as-child": props.asChild,
					as: _ctx.as
				}, _ctx.$attrs, {
					onPointerenter: handlePointerEnter,
					onPointermove: handlePointerMove,
					onPointerleave: handlePointerLeave,
					onClick: handleClick,
					onKeydown: handleKeydown
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"disabled",
					"data-disabled",
					"data-state",
					"aria-expanded",
					"aria-controls",
					"as-child",
					"as"
				])]),
				_: 3
			}), open.value ? (vueExports.openBlock(), vueExports.createElementBlock(vueExports.Fragment, { key: 0 }, [vueExports.createVNode(vueExports.unref(VisuallyHidden_default), {
				ref: setFocusProxyRef,
				"aria-hidden": "true",
				tabindex: 0,
				onFocus: handleVisuallyHiddenFocus
			}), vueExports.unref(menuContext).viewport ? (vueExports.openBlock(), vueExports.createElementBlock("span", {
				key: 0,
				"aria-owns": contentId.value
			}, null, 8, _hoisted_1)) : vueExports.createCommentVNode("v-if", true)], 64)) : vueExports.createCommentVNode("v-if", true)], 64);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuTrigger.vue
var NavigationMenuTrigger_default = NavigationMenuTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/NavigationMenu/NavigationMenuViewport.vue?vue&type=script&setup=true&lang.ts
var NavigationMenuViewport_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	inheritAttrs: false,
	__name: "NavigationMenuViewport",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		align: {
			type: String,
			required: false,
			default: "center"
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
		const { forwardRef, currentElement } = useForwardExpose();
		const menuContext = injectNavigationMenuContext();
		const { activeTrigger, rootNavigationMenu, modelValue } = menuContext;
		const size = vueExports.ref();
		const position = vueExports.ref();
		const open = vueExports.computed(() => !!menuContext.modelValue.value);
		vueExports.watch(currentElement, () => {
			menuContext.onViewportChange(currentElement.value);
		});
		const content = vueExports.ref();
		vueExports.watch([modelValue, open], () => {
			vueExports.nextTick(() => {
				if (!currentElement.value) return;
				requestAnimationFrame(() => {
					const el = currentElement.value?.querySelector("[data-state=open]");
					content.value = el;
				});
			});
		}, { immediate: true });
		function updatePosition() {
			if (content.value && activeTrigger.value && rootNavigationMenu.value) {
				const bodyWidth = document.documentElement.offsetWidth;
				const bodyHeight = document.documentElement.offsetHeight;
				const rootRect = rootNavigationMenu.value.getBoundingClientRect();
				const rect = activeTrigger.value.getBoundingClientRect();
				const { offsetWidth, offsetHeight } = content.value;
				const startPositionLeft = rect.left - rootRect.left;
				const startPositionTop = rect.top - rootRect.top;
				let posLeft = null;
				let posTop = null;
				switch (props.align) {
					case "start":
						posLeft = startPositionLeft;
						posTop = startPositionTop;
						break;
					case "end":
						posLeft = startPositionLeft - offsetWidth + rect.width;
						posTop = startPositionTop - offsetHeight + rect.height;
						break;
					default:
						posLeft = startPositionLeft - offsetWidth / 2 + rect.width / 2;
						posTop = startPositionTop - offsetHeight / 2 + rect.height / 2;
				}
				const screenOffset = 10;
				if (posLeft + rootRect.left < screenOffset) posLeft = screenOffset - rootRect.left;
				const rightOffset = posLeft + rootRect.left + offsetWidth;
				if (rightOffset > bodyWidth - screenOffset) {
					posLeft -= rightOffset - bodyWidth + screenOffset;
					if (posLeft < screenOffset - rootRect.left) posLeft = screenOffset - rootRect.left;
				}
				if (posTop + rootRect.top < screenOffset) posTop = screenOffset - rootRect.top;
				const bottomOffset = posTop + rootRect.top + offsetHeight;
				if (bottomOffset > bodyHeight - screenOffset) {
					posTop -= bottomOffset - bodyHeight + screenOffset;
					if (posTop < screenOffset - rootRect.top) posTop = screenOffset - rootRect.top;
				}
				posLeft = Math.round(posLeft);
				posTop = Math.round(posTop);
				position.value = {
					left: posLeft,
					top: posTop
				};
			}
		}
		useResizeObserver(content, () => {
			if (content.value) {
				size.value = {
					width: content.value.offsetWidth,
					height: content.value.offsetHeight
				};
				updatePosition();
			}
		});
		useResizeObserver([globalThis.document?.body, rootNavigationMenu], () => {
			updatePosition();
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), {
				present: _ctx.forceMount || open.value,
				"force-mount": !vueExports.unref(menuContext).unmountOnHide.value,
				onAfterLeave: _cache[2] || (_cache[2] = () => {
					size.value = void 0;
					position.value = void 0;
				})
			}, {
				default: vueExports.withCtx(({ present }) => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps(_ctx.$attrs, {
					ref: vueExports.unref(forwardRef),
					as: _ctx.as,
					"as-child": _ctx.asChild,
					"data-state": vueExports.unref(getOpenState)(open.value),
					"data-orientation": vueExports.unref(menuContext).orientation,
					style: {
						pointerEvents: !open.value && vueExports.unref(menuContext).isRootMenu ? "none" : void 0,
						["--reka-navigation-menu-viewport-width"]: size.value ? `${size.value?.width}px` : void 0,
						["--reka-navigation-menu-viewport-height"]: size.value ? `${size.value?.height}px` : void 0,
						["--reka-navigation-menu-viewport-left"]: position.value ? `${position.value?.left}px` : void 0,
						["--reka-navigation-menu-viewport-top"]: position.value ? `${position.value?.top}px` : void 0
					},
					hidden: !present,
					onPointerenter: _cache[0] || (_cache[0] = ($event) => vueExports.unref(menuContext).onContentEnter(vueExports.unref(menuContext).modelValue.value)),
					onPointerleave: _cache[1] || (_cache[1] = ($event) => vueExports.unref(whenMouse)(() => vueExports.unref(menuContext).onContentLeave())($event))
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 2
				}, 1040, [
					"as",
					"as-child",
					"data-state",
					"data-orientation",
					"style",
					"hidden"
				])]),
				_: 3
			}, 8, ["present", "force-mount"]);
		};
	}
});

//#endregion
//#region src/NavigationMenu/NavigationMenuViewport.vue
var NavigationMenuViewport_default = NavigationMenuViewport_vue_vue_type_script_setup_true_lang_default;

(function(){var t;try{if(typeof document<"u"){var a=document.createElement("style");a.nonce=(t=document.head.querySelector("meta[property=csp-nonce]"))==null?void 0:t.content,a.appendChild(document.createTextNode('[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32,.72,0,1);animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform, 100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform, 100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height, 0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left],[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height, 0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32,.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true]):after{content:"";position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]:after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]:after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]:after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]:after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not([data-state=closed]){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:hover,[data-vaul-handle]:active{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover: hover) and (pointer: fine){[data-vaul-drawer]{-webkit-user-select:none;user-select:none}}@media (pointer: fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{0%{transform:translate3d(0,var(--initial-transform, 100%),0)}to{transform:translateZ(0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform, 100%),0)}}@keyframes slideFromTop{0%{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}to{transform:translateZ(0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}}@keyframes slideFromLeft{0%{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}to{transform:translateZ(0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}}@keyframes slideFromRight{0%{transform:translate3d(var(--initial-transform, 100%),0,0)}to{transform:translateZ(0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform, 100%),0,0)}}')),document.head.appendChild(a);}}catch(r){console.error("vite-plugin-css-injected-by-js",r);}})();
const rt = "undefined" < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ut = (e) => typeof e < "u";
function st(e) {
  return JSON.parse(JSON.stringify(e));
}
function $e(e, n, s, i = {}) {
  var t, w, d;
  const {
    clone: v = false,
    passive: D = false,
    eventName: $,
    deep: T = false,
    defaultValue: r,
    shouldEmit: l
  } = i, h = vueExports.getCurrentInstance(), m = s || (h == null ? void 0 : h.emit) || ((t = h == null ? void 0 : h.$emit) == null ? void 0 : t.bind(h)) || ((d = (w = h == null ? void 0 : h.proxy) == null ? void 0 : w.$emit) == null ? void 0 : d.bind(h == null ? void 0 : h.proxy));
  let u = $;
  n || (n = "modelValue"), u = u || `update:${n.toString()}`;
  const L = (a) => v ? typeof v == "function" ? v(a) : st(a) : a, H = () => ut(e[n]) ? L(e[n]) : r, p = (a) => {
    l ? l(a) && m(u, a) : m(u, a);
  };
  if (D) {
    const a = H(), c = vueExports.ref(a);
    let f = false;
    return vueExports.watch(
      () => e[n],
      (y) => {
        f || (f = true, c.value = L(y), vueExports.nextTick(() => f = false));
      }
    ), vueExports.watch(
      c,
      (y) => {
        !f && (y !== e[n] || T) && p(y);
      },
      { deep: T }
    ), c;
  } else
    return vueExports.computed({
      get() {
        return H();
      },
      set(a) {
        p(a);
      }
    });
}
const [ee, ct] = createContext("DrawerRoot"), Ee = /* @__PURE__ */ new WeakMap();
function C(e, n, s = false) {
  if (!e || !(e instanceof HTMLElement) || !n)
    return;
  const i = {};
  Object.entries(n).forEach(([t, w]) => {
    if (t.startsWith("--")) {
      e.style.setProperty(t, w);
      return;
    }
    i[t] = e.style[t], e.style[t] = w;
  }), !s && Ee.set(e, i);
}
function ie(e, n) {
  const s = window.getComputedStyle(e), i = s.transform || s.webkitTransform || s.mozTransform;
  let t = i.match(/^matrix3d\((.+)\)$/);
  return t ? Number.parseFloat(t[1].split(", ")[_(n) ? 13 : 12]) : (t = i.match(/^matrix\((.+)\)$/), t ? Number.parseFloat(t[1].split(", ")[_(n) ? 5 : 4]) : null);
}
function vt(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function _(e) {
  switch (e) {
    case "top":
    case "bottom":
      return true;
    case "left":
    case "right":
      return false;
    default:
      return e;
  }
}
function de(e, n) {
  if (!e)
    return () => {
    };
  const s = e.style.cssText;
  return Object.assign(e.style, n), () => {
    e.style.cssText = s;
  };
}
function ft(...e) {
  return (...n) => {
    for (const s of e)
      typeof s == "function" && s(...n);
  };
}
const O = {
  DURATION: 0.5,
  EASE: [0.32, 0.72, 0, 1]
}, _e = 0.4, pt = 0.25, gt = 100, Be = 8, re = 16, Ce = 26, Oe = "vaul-dragging";
function mt({
  activeSnapPoint: e,
  snapPoints: n,
  drawerRef: s,
  overlayRef: i,
  fadeFromIndex: t,
  onSnapPointChange: w,
  direction: d
}) {
  const v = vueExports.ref(void 0);
  vueExports.onMounted(() => {
  }), vueExports.onBeforeUnmount(() => {
  });
  const $ = vueExports.computed(
    () => (n.value && e.value === n.value[n.value.length - 1]) ?? null
  ), T = vueExports.computed(
    () => n.value && n.value.length > 0 && ((t == null ? void 0 : t.value) || (t == null ? void 0 : t.value) === 0) && !Number.isNaN(t == null ? void 0 : t.value) && n.value[(t == null ? void 0 : t.value) ?? -1] === e.value || !n.value
  ), r = vueExports.computed(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.findIndex((a) => a === e.value)) ?? null;
    }
  ), l = vueExports.computed(
    () => {
      var p;
      return ((p = n.value) == null ? void 0 : p.map((a) => {
        const c = typeof a == "string";
        let f = 0;
        if (c && (f = Number.parseInt(a, 10)), _(d.value)) {
          const P = c ? f : v.value ? a * v.value.innerHeight : 0;
          return v.value ? d.value === "bottom" ? v.value.innerHeight - P : -v.value.innerHeight + P : P;
        }
        const y = c ? f : v.value ? a * v.value.innerWidth : 0;
        return v.value ? d.value === "right" ? v.value.innerWidth - y : -v.value.innerWidth + y : y;
      })) ?? [];
    }
  ), h = vueExports.computed(
    () => {
      var p;
      return r.value !== null ? (p = l.value) == null ? void 0 : p[r.value] : null;
    }
  ), m = (p) => {
    var c, f, y, P;
    const a = ((c = l.value) == null ? void 0 : c.findIndex((x) => x === p)) ?? null;
    vueExports.nextTick(() => {
      var x;
      w(a, l.value), C((x = s.value) == null ? void 0 : x.$el, {
        transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
        transform: _(d.value) ? `translate3d(0, ${p}px, 0)` : `translate3d(${p}px, 0, 0)`
      });
    }), l.value && a !== l.value.length - 1 && a !== (t == null ? void 0 : t.value) ? C((f = i.value) == null ? void 0 : f.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "0"
    }) : C((y = i.value) == null ? void 0 : y.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), e.value = a !== null ? ((P = n.value) == null ? void 0 : P[a]) ?? null : null;
  };
  vueExports.watch(
    [e, l, n],
    () => {
      var p;
      if (e.value) {
        const a = ((p = n.value) == null ? void 0 : p.findIndex((c) => c === e.value)) ?? -1;
        l.value && a !== -1 && typeof l.value[a] == "number" && m(l.value[a]);
      }
    },
    {
      immediate: true
      // if you want to run the effect immediately as well
    }
  );
  function u({
    draggedDistance: p,
    closeDrawer: a,
    velocity: c,
    dismissible: f
  }) {
    var j, G, z;
    if (t.value === void 0)
      return;
    const y = d.value === "bottom" || d.value === "right" ? (h.value ?? 0) - p : (h.value ?? 0) + p, P = r.value === t.value - 1, x = r.value === 0, W = p > 0;
    if (P && C((j = i.value) == null ? void 0 : j.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), c > 2 && !W) {
      f ? a() : m(l.value[0]);
      return;
    }
    if (c > 2 && W && l && n.value) {
      m(l.value[n.value.length - 1]);
      return;
    }
    const te = (G = l.value) == null ? void 0 : G.reduce((M, g) => typeof M != "number" || typeof g != "number" ? M : Math.abs(g - y) < Math.abs(M - y) ? g : M), V = _(d.value) ? window.innerHeight : window.innerWidth;
    if (c > _e && Math.abs(p) < V * 0.4) {
      const M = W ? 1 : -1;
      if (M > 0 && $) {
        m(l.value[(((z = n.value) == null ? void 0 : z.length) ?? 0) - 1]);
        return;
      }
      if (x && M < 0 && f && a(), r.value === null)
        return;
      m(l.value[r.value + M]);
      return;
    }
    m(te);
  }
  function L({ draggedDistance: p }) {
    var c;
    if (h.value === null)
      return;
    const a = d.value === "bottom" || d.value === "right" ? h.value - p : h.value + p;
    (d.value === "bottom" || d.value === "right") && a < l.value[l.value.length - 1] || (d.value === "top" || d.value === "left") && a > l.value[l.value.length - 1] || C((c = s.value) == null ? void 0 : c.$el, {
      transform: _(d.value) ? `translate3d(0, ${a}px, 0)` : `translate3d(${a}px, 0, 0)`
    });
  }
  function H(p, a) {
    if (!n.value || typeof r.value != "number" || !l.value || t.value === void 0)
      return null;
    const c = r.value === t.value - 1;
    if (r.value >= t.value && a)
      return 0;
    if (c && !a)
      return 1;
    if (!T.value && !c)
      return null;
    const y = c ? r.value + 1 : r.value - 1, P = c ? l.value[y] - l.value[y - 1] : l.value[y + 1] - l.value[y], x = p / Math.abs(P);
    return c ? 1 - x : x;
  }
  return {
    isLastSnapPoint: $,
    shouldFade: T,
    getPercentageDragged: H,
    activeSnapPointIndex: r,
    onRelease: u,
    onDrag: L,
    snapPointsOffset: l
  };
}
function Te() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
let Q = null;
function wt(e) {
  const { isOpen: n, modal: s, nested: i, hasBeenOpened: t, preventScrollRestoration: w, noBodyStyles: d } = e, v = vueExports.ref(""), D = vueExports.ref(0);
  function $() {
    if (Te() && Q === null && n.value && !d.value) {
      Q = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height
      };
      const { scrollX: r, innerHeight: l } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-D.value}px`,
        left: `${-r}px`,
        right: "0px",
        height: "auto"
      }), setTimeout(() => {
        requestAnimationFrame(() => {
          const h = l - window.innerHeight;
          h && D.value >= l && (document.body.style.top = `-${D.value + h}px`);
        });
      }, 300);
    }
  }
  function T() {
    if (Te() && Q !== null && !d.value) {
      const r = -Number.parseInt(document.body.style.top, 10), l = -Number.parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, Q), window.requestAnimationFrame(() => {
        if (w.value && v.value !== window.location.href) {
          v.value = window.location.href;
          return;
        }
        window.scrollTo(l, r);
      }), Q = null;
    }
  }
  return vueExports.onMounted(() => {
    function r() {
      D.value = window.scrollY;
    }
    r(), window.addEventListener("scroll", r), vueExports.onUnmounted(() => {
      window.removeEventListener("scroll", r);
    });
  }), vueExports.watch([n, t, v], () => {
    i.value || !t.value || (n.value ? (window.matchMedia("(display-mode: standalone)").matches || $(), s.value || setTimeout(() => {
      T();
    }, 500)) : T());
  }), { restorePositionSetting: T };
}
function ht(e, n) {
  return e && e.value ? e : n;
}
function yt(e) {
  const {
    emitDrag: n,
    emitRelease: s,
    emitClose: i,
    emitOpenChange: t,
    open: w,
    dismissible: d,
    nested: v,
    modal: D,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    scrollLockTimeout: r,
    closeThreshold: l,
    activeSnapPoint: h,
    fadeFromIndex: m,
    direction: u,
    noBodyStyles: L,
    handleOnly: H,
    preventScrollRestoration: p
  } = e, a = vueExports.ref(w.value ?? false), c = vueExports.ref(false), f = vueExports.ref(false), y = vueExports.ref(false), P = vueExports.ref(null), x = vueExports.ref(null), W = vueExports.ref(null), te = vueExports.ref(null), V = vueExports.ref(null), j = vueExports.ref(false), G = vueExports.ref(null), z = vueExports.ref(0), M = vueExports.ref(false);
  vueExports.ref(0);
  const g = vueExports.ref(null);
  vueExports.ref(0);
  const pe = vueExports.computed(() => {
    var o;
    return ((o = g.value) == null ? void 0 : o.$el.getBoundingClientRect().height) || 0;
  }), U = ht(
    e.snapPoints,
    vueExports.ref(void 0)
  ), Ne = vueExports.computed(() => {
    var o;
    return U && (((o = U.value) == null ? void 0 : o.length) ?? 0) > 0;
  }), Ae = vueExports.ref(null), {
    activeSnapPointIndex: ge,
    onRelease: xe,
    snapPointsOffset: He,
    onDrag: Ue,
    shouldFade: me,
    getPercentageDragged: Le
  } = mt({
    snapPoints: U,
    activeSnapPoint: h,
    drawerRef: g,
    fadeFromIndex: m,
    overlayRef: P,
    onSnapPointChange: Me,
    direction: u
  });
  function Me(o, R) {
    U.value && o === R.length - 1 && (x.value = /* @__PURE__ */ new Date());
  }
  wt({
    isOpen: a,
    modal: D,
    nested: v,
    hasBeenOpened: c,
    noBodyStyles: L,
    preventScrollRestoration: p
  });
  function ne() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  function we(o, R) {
    var k;
    if (!o)
      return false;
    let b = o;
    const B = (k = window.getSelection()) == null ? void 0 : k.toString(), E = g.value ? ie(g.value.$el, u.value) : null, A = /* @__PURE__ */ new Date();
    if (b.hasAttribute("data-vaul-no-drag") || b.closest("[data-vaul-no-drag]"))
      return false;
    if (u.value === "right" || u.value === "left")
      return true;
    if (x.value && A.getTime() - x.value.getTime() < 500)
      return false;
    if (E !== null && (u.value === "bottom" ? E > 0 : E < 0))
      return true;
    if (B && B.length > 0)
      return false;
    if (V.value && A.getTime() - V.value.getTime() < r.value && E === 0 || R)
      return V.value = A, false;
    for (; b; ) {
      if (b.scrollHeight > b.clientHeight) {
        if (b.scrollTop !== 0)
          return V.value = /* @__PURE__ */ new Date(), false;
        if (b.getAttribute("role") === "dialog")
          return true;
      }
      b = b.parentNode;
    }
    return true;
  }
  function ke(o) {
    !d.value && !U.value || g.value && !g.value.$el.contains(o.target) || (f.value = true, W.value = /* @__PURE__ */ new Date(), o.target.setPointerCapture(o.pointerId), z.value = _(u.value) ? o.clientY : o.clientX);
  }
  function Ie(o) {
    var R, b, B, E, A, k;
    if (g.value && f.value) {
      const X = u.value === "bottom" || u.value === "right" ? 1 : -1, ae = (z.value - (_(u.value) ? o.clientY : o.clientX)) * X, le = ae > 0, ye = U.value && !d.value && !le;
      if (ye && ge.value === 0)
        return;
      const ce = Math.abs(ae), Se = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      let q = ce / pe.value;
      const De = Le(ce, le);
      if (De !== null && (q = De), ye && q >= 1 || !j.value && !we(o.target, le))
        return;
      if ((R = g == null ? void 0 : g.value) == null || R.$el.classList.add(Oe), j.value = true, C((b = g.value) == null ? void 0 : b.$el, {
        transition: "none"
      }), C((B = P.value) == null ? void 0 : B.$el, {
        transition: "none"
      }), U.value && Ue({ draggedDistance: ae }), le && !U.value) {
        const Y = vt(ae), oe = Math.min(Y * -1, 0) * X;
        C((E = g.value) == null ? void 0 : E.$el, {
          transform: _(u.value) ? `translate3d(0, ${oe}px, 0)` : `translate3d(${oe}px, 0, 0)`
        });
        return;
      }
      const qe = 1 - q;
      if ((me.value || m.value && ge.value === m.value - 1) && (n(q), C(
        (A = P.value) == null ? void 0 : A.$el,
        {
          opacity: `${qe}`,
          transition: "none"
        },
        true
      )), Se && P.value && $.value) {
        const Y = Math.min(ne() + q * (1 - ne()), 1), oe = 8 - q * 8, be = Math.max(0, 14 - q * 14);
        C(
          Se,
          {
            borderRadius: `${oe}px`,
            transform: _(u.value) ? `scale(${Y}) translate3d(0, ${be}px, 0)` : `scale(${Y}) translate3d(${be}px, 0, 0)`,
            transition: "none"
          },
          true
        );
      }
      if (!U.value) {
        const Y = ce * X;
        C((k = g.value) == null ? void 0 : k.$el, {
          transform: _(u.value) ? `translate3d(0, ${Y}px, 0)` : `translate3d(${Y}px, 0, 0)`
        });
      }
    }
  }
  function he() {
    var b;
    if (!g.value)
      return;
    const o = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]"), R = ie(g.value.$el, u.value);
    C(g.value.$el, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`
    }), C((b = P.value) == null ? void 0 : b.$el, {
      transition: `opacity ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      opacity: "1"
    }), $.value && R && R > 0 && a.value && C(
      o,
      {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(u.value) ? {
          transform: `scale(${ne()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
          transformOrigin: "top"
        } : {
          transform: `scale(${ne()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
          transformOrigin: "left"
        },
        transitionProperty: "transform, border-radius",
        transitionDuration: `${O.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
      },
      true
    );
  }
  function K(o) {
    g.value && (i(), o || (a.value = false), window.setTimeout(() => {
      U.value && (h.value = U.value[0]);
    }, O.DURATION * 1e3));
  }
  vueExports.watchEffect(() => {
    if (!a.value && $.value && rt) ;
  }), vueExports.watch(w, () => {
    a.value = w.value, w.value || K();
  });
  function We(o) {
    if (!f.value || !g.value)
      return;
    g.value.$el.classList.remove(Oe), j.value = false, f.value = false, te.value = /* @__PURE__ */ new Date();
    const R = ie(g.value.$el, u.value);
    if (!we(o.target, false) || !R || Number.isNaN(R) || W.value === null)
      return;
    const b = te.value.getTime() - W.value.getTime(), B = z.value - (_(u.value) ? o.clientY : o.clientX), E = Math.abs(B) / b;
    if (E > 0.05 && (y.value = true, window.setTimeout(() => {
      y.value = false;
    }, 200)), U.value) {
      const k = u.value === "bottom" || u.value === "right" ? 1 : -1;
      xe({
        draggedDistance: B * k,
        closeDrawer: K,
        velocity: E,
        dismissible: d.value
      }), s(true);
      return;
    }
    if (u.value === "bottom" || u.value === "right" ? B > 0 : B < 0) {
      he(), s(true);
      return;
    }
    if (E > _e) {
      K(), s(false);
      return;
    }
    const A = Math.min(
      g.value.$el.getBoundingClientRect().height ?? 0,
      window.innerHeight
    );
    if (R >= A * l.value) {
      K(), s(false);
      return;
    }
    s(true), he();
  }
  vueExports.watch(a, (o) => {
    o && (x.value = /* @__PURE__ */ new Date()), t(o);
  }, { immediate: true });
  function Ve(o) {
    var B, E;
    const R = o ? (window.innerWidth - re) / window.innerWidth : 1, b = o ? -16 : 0;
    G.value && window.clearTimeout(G.value), C((B = g.value) == null ? void 0 : B.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: `scale(${R}) translate3d(0, ${b}px, 0)`
    }), !o && ((E = g.value) != null && E.$el) && (G.value = window.setTimeout(() => {
      var k, X;
      const A = ie((k = g.value) == null ? void 0 : k.$el, u.value);
      C((X = g.value) == null ? void 0 : X.$el, {
        transition: "none",
        transform: _(u.value) ? `translate3d(0, ${A}px, 0)` : `translate3d(${A}px, 0, 0)`
      });
    }, 500));
  }
  function je(o) {
    var A;
    if (o < 0)
      return;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = (R - re) / R, B = b + o * (1 - b), E = -16 + o * re;
    C((A = g.value) == null ? void 0 : A.$el, {
      transform: _(u.value) ? `scale(${B}) translate3d(0, ${E}px, 0)` : `scale(${B}) translate3d(${E}px, 0, 0)`,
      transition: "none"
    });
  }
  function ze(o) {
    var E;
    const R = _(u.value) ? window.innerHeight : window.innerWidth, b = o ? (R - re) / R : 1, B = o ? -16 : 0;
    o && C((E = g.value) == null ? void 0 : E.$el, {
      transition: `transform ${O.DURATION}s cubic-bezier(${O.EASE.join(",")})`,
      transform: _(u.value) ? `scale(${b}) translate3d(0, ${B}px, 0)` : `scale(${b}) translate3d(${B}px, 0, 0)`
    });
  }
  return {
    open: w,
    isOpen: a,
    modal: D,
    keyboardIsOpen: M,
    hasBeenOpened: c,
    drawerRef: g,
    drawerHeightRef: pe,
    overlayRef: P,
    handleRef: Ae,
    isDragging: f,
    dragStartTime: W,
    isAllowedToDrag: j,
    snapPoints: U,
    activeSnapPoint: h,
    hasSnapPoints: Ne,
    pointerStart: z,
    dismissible: d,
    snapPointsOffset: He,
    direction: u,
    shouldFade: me,
    fadeFromIndex: m,
    shouldScaleBackground: $,
    setBackgroundColorOnScale: T,
    onPress: ke,
    onDrag: Ie,
    onRelease: We,
    closeDrawer: K,
    onNestedDrag: je,
    onNestedRelease: ze,
    onNestedOpenChange: Ve,
    emitClose: i,
    emitDrag: n,
    emitRelease: s,
    emitOpenChange: t,
    nested: v,
    handleOnly: H,
    noBodyStyles: L
  };
}
const St = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerRoot",
  props: {
    activeSnapPoint: { default: void 0 },
    closeThreshold: { default: pt },
    shouldScaleBackground: { type: Boolean, default: void 0 },
    setBackgroundColorOnScale: { type: Boolean, default: true },
    scrollLockTimeout: { default: gt },
    fixed: { type: Boolean, default: void 0 },
    dismissible: { type: Boolean, default: true },
    modal: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: void 0 },
    nested: { type: Boolean, default: false },
    direction: { default: "bottom" },
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean, default: false },
    preventScrollRestoration: { type: Boolean },
    snapPoints: { default: void 0 },
    fadeFromIndex: { default: void 0 }
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { expose: n, emit: s }) {
    const i = e, t = s;
    vueExports.useSlots();
    const w = vueExports.computed(() => i.fadeFromIndex ?? (i.snapPoints && i.snapPoints.length - 1)), d = $e(i, "open", t, {
      defaultValue: i.defaultOpen,
      passive: i.open === void 0
    }), v = $e(i, "activeSnapPoint", t, {
      passive: i.activeSnapPoint === void 0
    }), D = {
      emitDrag: (m) => t("drag", m),
      emitRelease: (m) => t("release", m),
      emitClose: () => t("close"),
      emitOpenChange: (m) => {
        t("update:open", m), setTimeout(() => {
          t("animationEnd", m);
        }, O.DURATION * 1e3);
      }
    }, { closeDrawer: $, hasBeenOpened: T, modal: r, isOpen: l } = ct(
      yt({
        ...D,
        ...vueExports.toRefs(i),
        activeSnapPoint: v,
        fadeFromIndex: w,
        open: d
      })
    );
    function h(m) {
      if (d.value !== void 0) {
        D.emitOpenChange(m);
        return;
      }
      l.value = m, m ? T.value = true : $();
    }
    return n({
      open: l
    }), (m, u) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogRoot_default), {
      open: vueExports.unref(l),
      modal: vueExports.unref(r),
      "onUpdate:open": h
    }, {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(m.$slots, "default", { open: vueExports.unref(l) })
      ]),
      _: 3
    }, 8, ["open", "modal"]));
  }
}), _t = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerRootNested",
  props: {
    activeSnapPoint: {},
    closeThreshold: {},
    shouldScaleBackground: { type: Boolean },
    setBackgroundColorOnScale: { type: Boolean },
    scrollLockTimeout: {},
    fixed: { type: Boolean },
    dismissible: { type: Boolean },
    modal: { type: Boolean },
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    nested: { type: Boolean },
    direction: {},
    noBodyStyles: { type: Boolean },
    handleOnly: { type: Boolean },
    preventScrollRestoration: { type: Boolean },
    snapPoints: {},
    fadeFromIndex: {}
  },
  emits: ["drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(e, { emit: n }) {
    const s = e, i = n, { onNestedDrag: t, onNestedOpenChange: w, onNestedRelease: d } = ee();
    function v() {
      w(false);
    }
    function D(r) {
      t(r);
    }
    function $(r) {
      r && w(r), i("update:open", r);
    }
    const T = useForwardPropsEmits(s, i);
    return (r, l) => (vueExports.openBlock(), vueExports.createBlock(St, vueExports.mergeProps(vueExports.unref(T), {
      nested: "",
      onClose: v,
      onDrag: D,
      onRelease: vueExports.unref(d),
      "onUpdate:open": $
    }), {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["onRelease"]));
  }
}), Bt = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerOverlay",
  setup(e) {
    const { overlayRef: n, hasSnapPoints: s, isOpen: i, shouldFade: t } = ee();
    return (w, d) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
      ref_key: "overlayRef",
      ref: n,
      "data-vaul-overlay": "",
      "data-vaul-snap-points": vueExports.unref(i) && vueExports.unref(s) ? "true" : "false",
      "data-vaul-snap-points-overlay": vueExports.unref(i) && vueExports.unref(t) ? "true" : "false"
    }, null, 8, ["data-vaul-snap-points", "data-vaul-snap-points-overlay"]));
  }
}), Dt = () => () => {
};
function bt() {
  const { direction: e, isOpen: n, shouldScaleBackground: s, setBackgroundColorOnScale: i, noBodyStyles: t } = ee(), w = vueExports.ref(null), d = vueExports.ref(document.body.style.backgroundColor);
  function v() {
    return (window.innerWidth - Ce) / window.innerWidth;
  }
  vueExports.watchEffect((D) => {
    if (n.value && s.value) {
      w.value && clearTimeout(w.value);
      const $ = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!$)
        return;
      ft(
        i.value && !t.value ? de(document.body, { background: "black" }) : Dt,
        de($, {
          transformOrigin: _(e.value) ? "top" : "left",
          transitionProperty: "transform, border-radius",
          transitionDuration: `${O.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${O.EASE.join(",")})`
        })
      );
      const T = de($, {
        borderRadius: `${Be}px`,
        overflow: "hidden",
        ..._(e.value) ? {
          transform: `scale(${v()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${v()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      D(() => {
        T(), w.value = window.setTimeout(() => {
          d.value ? document.body.style.background = d.value : document.body.style.removeProperty("background");
        }, O.DURATION * 1e3);
      });
    }
  }, { flush: "pre" });
}
const Ct = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerContent",
  setup(e) {
    const {
      open: n,
      isOpen: s,
      snapPointsOffset: i,
      hasSnapPoints: t,
      drawerRef: w,
      onPress: d,
      onDrag: v,
      onRelease: D,
      modal: $,
      emitOpenChange: T,
      dismissible: r,
      keyboardIsOpen: l,
      closeDrawer: h,
      direction: m,
      handleOnly: u
    } = ee();
    bt();
    const L = vueExports.ref(false), H = vueExports.computed(() => i.value && i.value.length > 0 ? `${i.value[0]}px` : "0");
    function p(f) {
      if (!$.value || f.defaultPrevented) {
        f.preventDefault();
        return;
      }
      l.value && (l.value = false), r.value ? T(false) : f.preventDefault();
    }
    function a(f) {
      u.value || d(f);
    }
    function c(f) {
      u.value || v(f);
    }
    return vueExports.watchEffect(() => {
      t.value && window.requestAnimationFrame(() => {
        L.value = true;
      });
    }), (f, y) => (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogContent_default), {
      ref_key: "drawerRef",
      ref: w,
      "data-vaul-drawer": "",
      "data-vaul-drawer-direction": vueExports.unref(m),
      "data-vaul-delayed-snap-points": L.value ? "true" : "false",
      "data-vaul-snap-points": vueExports.unref(s) && vueExports.unref(t) ? "true" : "false",
      style: vueExports.normalizeStyle({ "--snap-point-height": H.value }),
      onPointerdown: a,
      onPointermove: c,
      onPointerup: vueExports.unref(D),
      onPointerDownOutside: p,
      onOpenAutoFocus: y[0] || (y[0] = vueExports.withModifiers(() => {
      }, ["prevent"])),
      onEscapeKeyDown: y[1] || (y[1] = (P) => {
        vueExports.unref(r) || P.preventDefault();
      })
    }, {
      default: vueExports.withCtx(() => [
        vueExports.renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-vaul-drawer-direction", "data-vaul-delayed-snap-points", "data-vaul-snap-points", "style", "onPointerup"]));
  }
}), $t = ["data-vaul-drawer-visible"], Ot = {
  "data-vaul-handle-hitarea": "",
  "aria-hidden": "true"
}, Tt = 250, Pt = 120, Nt = /* @__PURE__ */ vueExports.defineComponent({
  __name: "DrawerHandle",
  props: {
    preventCycle: { type: Boolean, default: false }
  },
  setup(e) {
    const n = e, { onPress: s, onDrag: i, handleRef: t, handleOnly: w, isOpen: d, snapPoints: v, activeSnapPoint: D, isDragging: $, dismissible: T, closeDrawer: r } = ee(), l = vueExports.ref(null), h = vueExports.ref(false);
    function m() {
      if (h.value) {
        H();
        return;
      }
      window.setTimeout(() => {
        u();
      }, Pt);
    }
    function u() {
      if ($.value || n.preventCycle || h.value) {
        H();
        return;
      }
      if (H(), !v.value || v.value.length === 0) {
        T.value || r();
        return;
      }
      const c = D.value === v.value[v.value.length - 1];
      if (c && T.value) {
        r();
        return;
      }
      const f = v.value.findIndex((P) => P === D.value);
      if (f === -1)
        return;
      const y = c ? 0 : f + 1;
      D.value = v.value[y];
    }
    function L() {
      l.value = window.setTimeout(() => {
        h.value = true;
      }, Tt);
    }
    function H() {
      l.value && window.clearTimeout(l.value), h.value = false;
    }
    function p(c) {
      w.value && s(c), L();
    }
    function a(c) {
      w.value && i(c);
    }
    return (c, f) => (vueExports.openBlock(), vueExports.createElementBlock("div", {
      ref_key: "handleRef",
      ref: t,
      "data-vaul-drawer-visible": vueExports.unref(d) ? "true" : "false",
      "data-vaul-handle": "",
      "aria-hidden": "true",
      onClick: m,
      onPointercancel: H,
      onPointerdown: p,
      onPointermove: a
    }, [
      vueExports.createElementVNode("span", Ot, [
        vueExports.renderSlot(c.$slots, "default")
      ])
    ], 40, $t));
  }
});

const DropdownMenu = {
  Root: DropdownMenuRoot_default,
  Trigger: DropdownMenuTrigger_default,
  Portal: DropdownMenuPortal_default,
  Content: DropdownMenuContent_default,
  Arrow: DropdownMenuArrow_default,
  Item: DropdownMenuItem_default,
  Group: DropdownMenuGroup_default,
  Separator: DropdownMenuSeparator_default,
  CheckboxItem: DropdownMenuCheckboxItem_default,
  ItemIndicator: DropdownMenuItemIndicator_default,
  Label: DropdownMenuLabel_default,
  RadioGroup: DropdownMenuRadioGroup_default,
  RadioItem: DropdownMenuRadioItem_default,
  Sub: DropdownMenuSub_default,
  SubContent: DropdownMenuSubContent_default,
  SubTrigger: DropdownMenuSubTrigger_default
};
const HoverCard = {
  Root: HoverCardRoot_default,
  Trigger: HoverCardTrigger_default,
  Portal: HoverCardPortal_default,
  Content: HoverCardContent_default,
  Arrow: HoverCardArrow_default
};
const Popover = {
  Root: PopoverRoot_default,
  Trigger: PopoverTrigger_default,
  Portal: PopoverPortal_default,
  Content: PopoverContent_default,
  Arrow: PopoverArrow_default,
  Close: PopoverClose_default,
  Anchor: PopoverAnchor_default
};

/**
 * Fuse.js v7.1.0 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2025 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

function isArray(value) {
  return !Array.isArray
    ? getTag(value) === '[object Array]'
    : Array.isArray(value)
}
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value
  }
  let result = value + '';
  return result == '0' && 1 / value == -Infinity ? '-0' : result
}

function toString(value) {
  return value == null ? '' : baseToString(value)
}

function isString(value) {
  return typeof value === 'string'
}

function isNumber(value) {
  return typeof value === 'number'
}

// Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
function isBoolean(value) {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
  )
}

function isObject(value) {
  return typeof value === 'object'
}

// Checks if `value` is object-like.
function isObjectLike(value) {
  return isObject(value) && value !== null
}

function isDefined(value) {
  return value !== undefined && value !== null
}

function isBlank(value) {
  return !value.trim().length
}

// Gets the `toStringTag` of `value`.
// Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function getTag(value) {
  return value == null
    ? value === undefined
      ? '[object Undefined]'
      : '[object Null]'
    : Object.prototype.toString.call(value)
}

const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";

const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) =>
  `Invalid value for key ${key}`;

const PATTERN_LENGTH_TOO_LARGE = (max) =>
  `Pattern length exceeds max of ${max}.`;

const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;

const INVALID_KEY_WEIGHT_VALUE = (key) =>
  `Property 'weight' in key '${key}' must be a positive integer`;

const hasOwn = Object.prototype.hasOwnProperty;

class KeyStore {
  constructor(keys) {
    this._keys = [];
    this._keyMap = {};

    let totalWeight = 0;

    keys.forEach((key) => {
      let obj = createKey(key);

      this._keys.push(obj);
      this._keyMap[obj.id] = obj;

      totalWeight += obj.weight;
    });

    // Normalize weights so that their sum is equal to 1
    this._keys.forEach((key) => {
      key.weight /= totalWeight;
    });
  }
  get(keyId) {
    return this._keyMap[keyId]
  }
  keys() {
    return this._keys
  }
  toJSON() {
    return JSON.stringify(this._keys)
  }
}

function createKey(key) {
  let path = null;
  let id = null;
  let src = null;
  let weight = 1;
  let getFn = null;

  if (isString(key) || isArray(key)) {
    src = key;
    path = createKeyPath(key);
    id = createKeyId(key);
  } else {
    if (!hasOwn.call(key, 'name')) {
      throw new Error(MISSING_KEY_PROPERTY('name'))
    }

    const name = key.name;
    src = name;

    if (hasOwn.call(key, 'weight')) {
      weight = key.weight;

      if (weight <= 0) {
        throw new Error(INVALID_KEY_WEIGHT_VALUE(name))
      }
    }

    path = createKeyPath(name);
    id = createKeyId(name);
    getFn = key.getFn;
  }

  return { path, id, weight, src, getFn }
}

function createKeyPath(key) {
  return isArray(key) ? key : key.split('.')
}

function createKeyId(key) {
  return isArray(key) ? key.join('.') : key
}

function get(obj, path) {
  let list = [];
  let arr = false;

  const deepGet = (obj, path, index) => {
    if (!isDefined(obj)) {
      return
    }
    if (!path[index]) {
      // If there's no path left, we've arrived at the object we care about.
      list.push(obj);
    } else {
      let key = path[index];

      const value = obj[key];

      if (!isDefined(value)) {
        return
      }

      // If we're at the last value in the path, and if it's a string/number/bool,
      // add it to the list
      if (
        index === path.length - 1 &&
        (isString(value) || isNumber(value) || isBoolean(value))
      ) {
        list.push(toString(value));
      } else if (isArray(value)) {
        arr = true;
        // Search each item in the array.
        for (let i = 0, len = value.length; i < len; i += 1) {
          deepGet(value[i], path, index + 1);
        }
      } else if (path.length) {
        // An object. Recurse further.
        deepGet(value, path, index + 1);
      }
    }
  };

  // Backwards compatibility (since path used to be a string)
  deepGet(obj, isString(path) ? path.split('.') : path, 0);

  return arr ? list : list[0]
}

const MatchOptions = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: false,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: false,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
};

const BasicOptions = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: false,
  // When `true`, the algorithm will ignore diacritics (accents) in comparisons
  ignoreDiacritics: false,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: false,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: true,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (a, b) =>
    a.score === b.score ? (a.idx < b.idx ? -1 : 1) : a.score < b.score ? -1 : 1
};

const FuzzyOptions = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
};

const AdvancedOptions = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: false,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: get,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: false,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: false,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};

var Config = {
  ...BasicOptions,
  ...MatchOptions,
  ...FuzzyOptions,
  ...AdvancedOptions
};

const SPACE = /[^ ]+/g;

// Field-length norm: the shorter the field, the higher the weight.
// Set to 3 decimals to reduce index size.
function norm(weight = 1, mantissa = 3) {
  const cache = new Map();
  const m = Math.pow(10, mantissa);

  return {
    get(value) {
      const numTokens = value.match(SPACE).length;

      if (cache.has(numTokens)) {
        return cache.get(numTokens)
      }

      // Default function is 1/sqrt(x), weight makes that variable
      const norm = 1 / Math.pow(numTokens, 0.5 * weight);

      // In place of `toFixed(mantissa)`, for faster computation
      const n = parseFloat(Math.round(norm * m) / m);

      cache.set(numTokens, n);

      return n
    },
    clear() {
      cache.clear();
    }
  }
}

class FuseIndex {
  constructor({
    getFn = Config.getFn,
    fieldNormWeight = Config.fieldNormWeight
  } = {}) {
    this.norm = norm(fieldNormWeight, 3);
    this.getFn = getFn;
    this.isCreated = false;

    this.setIndexRecords();
  }
  setSources(docs = []) {
    this.docs = docs;
  }
  setIndexRecords(records = []) {
    this.records = records;
  }
  setKeys(keys = []) {
    this.keys = keys;
    this._keysMap = {};
    keys.forEach((key, idx) => {
      this._keysMap[key.id] = idx;
    });
  }
  create() {
    if (this.isCreated || !this.docs.length) {
      return
    }

    this.isCreated = true;

    // List is Array<String>
    if (isString(this.docs[0])) {
      this.docs.forEach((doc, docIndex) => {
        this._addString(doc, docIndex);
      });
    } else {
      // List is Array<Object>
      this.docs.forEach((doc, docIndex) => {
        this._addObject(doc, docIndex);
      });
    }

    this.norm.clear();
  }
  // Adds a doc to the end of the index
  add(doc) {
    const idx = this.size();

    if (isString(doc)) {
      this._addString(doc, idx);
    } else {
      this._addObject(doc, idx);
    }
  }
  // Removes the doc at the specified index of the index
  removeAt(idx) {
    this.records.splice(idx, 1);

    // Change ref index of every subsquent doc
    for (let i = idx, len = this.size(); i < len; i += 1) {
      this.records[i].i -= 1;
    }
  }
  getValueForItemAtKeyId(item, keyId) {
    return item[this._keysMap[keyId]]
  }
  size() {
    return this.records.length
  }
  _addString(doc, docIndex) {
    if (!isDefined(doc) || isBlank(doc)) {
      return
    }

    let record = {
      v: doc,
      i: docIndex,
      n: this.norm.get(doc)
    };

    this.records.push(record);
  }
  _addObject(doc, docIndex) {
    let record = { i: docIndex, $: {} };

    // Iterate over every key (i.e, path), and fetch the value at that key
    this.keys.forEach((key, keyIndex) => {
      let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);

      if (!isDefined(value)) {
        return
      }

      if (isArray(value)) {
        let subRecords = [];
        const stack = [{ nestedArrIndex: -1, value }];

        while (stack.length) {
          const { nestedArrIndex, value } = stack.pop();

          if (!isDefined(value)) {
            continue
          }

          if (isString(value) && !isBlank(value)) {
            let subRecord = {
              v: value,
              i: nestedArrIndex,
              n: this.norm.get(value)
            };

            subRecords.push(subRecord);
          } else if (isArray(value)) {
            value.forEach((item, k) => {
              stack.push({
                nestedArrIndex: k,
                value: item
              });
            });
          } else ;
        }
        record.$[keyIndex] = subRecords;
      } else if (isString(value) && !isBlank(value)) {
        let subRecord = {
          v: value,
          n: this.norm.get(value)
        };

        record.$[keyIndex] = subRecord;
      }
    });

    this.records.push(record);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    }
  }
}

function createIndex(
  keys,
  docs,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys.map(createKey));
  myIndex.setSources(docs);
  myIndex.create();
  return myIndex
}

function parseIndex(
  data,
  { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}
) {
  const { keys, records } = data;
  const myIndex = new FuseIndex({ getFn, fieldNormWeight });
  myIndex.setKeys(keys);
  myIndex.setIndexRecords(records);
  return myIndex
}

function computeScore$1(
  pattern,
  {
    errors = 0,
    currentLocation = 0,
    expectedLocation = 0,
    distance = Config.distance,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  const accuracy = errors / pattern.length;

  if (ignoreLocation) {
    return accuracy
  }

  const proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy
  }

  return accuracy + proximity / distance
}

function convertMaskToIndices(
  matchmask = [],
  minMatchCharLength = Config.minMatchCharLength
) {
  let indices = [];
  let start = -1;
  let end = -1;
  let i = 0;

  for (let len = matchmask.length; i < len; i += 1) {
    let match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        indices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    indices.push([start, i - 1]);
  }

  return indices
}

// Machine word size
const MAX_BITS = 32;

function search(
  text,
  pattern,
  patternAlphabet,
  {
    location = Config.location,
    distance = Config.distance,
    threshold = Config.threshold,
    findAllMatches = Config.findAllMatches,
    minMatchCharLength = Config.minMatchCharLength,
    includeMatches = Config.includeMatches,
    ignoreLocation = Config.ignoreLocation
  } = {}
) {
  if (pattern.length > MAX_BITS) {
    throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS))
  }

  const patternLen = pattern.length;
  // Set starting location at beginning text and initialize the alphabet.
  const textLen = text.length;
  // Handle the case when location > text.length
  const expectedLocation = Math.max(0, Math.min(location, textLen));
  // Highest score beyond which we give up.
  let currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  let bestLocation = expectedLocation;

  // Performance: only computer matches when the minMatchCharLength > 1
  // OR if `includeMatches` is true.
  const computeMatches = minMatchCharLength > 1 || includeMatches;
  // A mask of the matches, used for building the indices
  const matchMask = computeMatches ? Array(textLen) : [];

  let index;

  // Get all exact matches, here for speed up
  while ((index = text.indexOf(pattern, bestLocation)) > -1) {
    let score = computeScore$1(pattern, {
      currentLocation: index,
      expectedLocation,
      distance,
      ignoreLocation
    });

    currentThreshold = Math.min(score, currentThreshold);
    bestLocation = index + patternLen;

    if (computeMatches) {
      let i = 0;
      while (i < patternLen) {
        matchMask[index + i] = 1;
        i += 1;
      }
    }
  }

  // Reset the best location
  bestLocation = -1;

  let lastBitArr = [];
  let finalScore = 1;
  let binMax = patternLen + textLen;

  const mask = 1 << (patternLen - 1);

  for (let i = 0; i < patternLen; i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    let binMin = 0;
    let binMid = binMax;

    while (binMin < binMid) {
      const score = computeScore$1(pattern, {
        errors: i,
        currentLocation: expectedLocation + binMid,
        expectedLocation,
        distance,
        ignoreLocation
      });

      if (score <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    let start = Math.max(1, expectedLocation - binMid + 1);
    let finish = findAllMatches
      ? textLen
      : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    let bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << i) - 1;

    for (let j = finish; j >= start; j -= 1) {
      let currentLocation = j - 1;
      let charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (computeMatches) {
        // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
        matchMask[currentLocation] = +!!charMatch;
      }

      // First pass: exact match
      bitArr[j] = ((bitArr[j + 1] << 1) | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (i) {
        bitArr[j] |=
          ((lastBitArr[j + 1] | lastBitArr[j]) << 1) | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = computeScore$1(pattern, {
          errors: i,
          currentLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    const score = computeScore$1(pattern, {
      errors: i + 1,
      currentLocation: expectedLocation,
      expectedLocation,
      distance,
      ignoreLocation
    });

    if (score > currentThreshold) {
      break
    }

    lastBitArr = bitArr;
  }

  const result = {
    isMatch: bestLocation >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(0.001, finalScore)
  };

  if (computeMatches) {
    const indices = convertMaskToIndices(matchMask, minMatchCharLength);
    if (!indices.length) {
      result.isMatch = false;
    } else if (includeMatches) {
      result.indices = indices;
    }
  }

  return result
}

function createPatternAlphabet(pattern) {
  let mask = {};

  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern.charAt(i);
    mask[char] = (mask[char] || 0) | (1 << (len - i - 1));
  }

  return mask
}

const stripDiacritics = String.prototype.normalize
    ? ((str) => str.normalize('NFD').replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, ''))
    : ((str) => str);

class BitapSearch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreDiacritics = Config.ignoreDiacritics,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    this.options = {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreDiacritics,
      ignoreLocation
    };

    pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
    this.pattern = pattern;

    this.chunks = [];

    if (!this.pattern.length) {
      return
    }

    const addChunk = (pattern, startIndex) => {
      this.chunks.push({
        pattern,
        alphabet: createPatternAlphabet(pattern),
        startIndex
      });
    };

    const len = this.pattern.length;

    if (len > MAX_BITS) {
      let i = 0;
      const remainder = len % MAX_BITS;
      const end = len - remainder;

      while (i < end) {
        addChunk(this.pattern.substr(i, MAX_BITS), i);
        i += MAX_BITS;
      }

      if (remainder) {
        const startIndex = len - MAX_BITS;
        addChunk(this.pattern.substr(startIndex), startIndex);
      }
    } else {
      addChunk(this.pattern, 0);
    }
  }

  searchIn(text) {
    const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;

    text = isCaseSensitive ? text : text.toLowerCase();
    text = ignoreDiacritics ? stripDiacritics(text) : text;

    // Exact match
    if (this.pattern === text) {
      let result = {
        isMatch: true,
        score: 0
      };

      if (includeMatches) {
        result.indices = [[0, text.length - 1]];
      }

      return result
    }

    // Otherwise, use Bitap algorithm
    const {
      location,
      distance,
      threshold,
      findAllMatches,
      minMatchCharLength,
      ignoreLocation
    } = this.options;

    let allIndices = [];
    let totalScore = 0;
    let hasMatches = false;

    this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
      const { isMatch, score, indices } = search(text, pattern, alphabet, {
        location: location + startIndex,
        distance,
        threshold,
        findAllMatches,
        minMatchCharLength,
        includeMatches,
        ignoreLocation
      });

      if (isMatch) {
        hasMatches = true;
      }

      totalScore += score;

      if (isMatch && indices) {
        allIndices = [...allIndices, ...indices];
      }
    });

    let result = {
      isMatch: hasMatches,
      score: hasMatches ? totalScore / this.chunks.length : 1
    };

    if (hasMatches && includeMatches) {
      result.indices = allIndices;
    }

    return result
  }
}

class BaseMatch {
  constructor(pattern) {
    this.pattern = pattern;
  }
  static isMultiMatch(pattern) {
    return getMatch(pattern, this.multiRegex)
  }
  static isSingleMatch(pattern) {
    return getMatch(pattern, this.singleRegex)
  }
  search(/*text*/) {}
}

function getMatch(pattern, exp) {
  const matches = pattern.match(exp);
  return matches ? matches[1] : null
}

// Token: 'file

class ExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'exact'
  }
  static get multiRegex() {
    return /^="(.*)"$/
  }
  static get singleRegex() {
    return /^=(.*)$/
  }
  search(text) {
    const isMatch = text === this.pattern;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !fire

class InverseExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"$/
  }
  static get singleRegex() {
    return /^!(.*)$/
  }
  search(text) {
    const index = text.indexOf(this.pattern);
    const isMatch = index === -1;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: ^file

class PrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'prefix-exact'
  }
  static get multiRegex() {
    return /^\^"(.*)"$/
  }
  static get singleRegex() {
    return /^\^(.*)$/
  }
  search(text) {
    const isMatch = text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    }
  }
}

// Token: !^fire

class InversePrefixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-prefix-exact'
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/
  }
  static get singleRegex() {
    return /^!\^(.*)$/
  }
  search(text) {
    const isMatch = !text.startsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

// Token: .file$

class SuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'suffix-exact'
  }
  static get multiRegex() {
    return /^"(.*)"\$$/
  }
  static get singleRegex() {
    return /^(.*)\$$/
  }
  search(text) {
    const isMatch = text.endsWith(this.pattern);

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [text.length - this.pattern.length, text.length - 1]
    }
  }
}

// Token: !.file$

class InverseSuffixExactMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'inverse-suffix-exact'
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/
  }
  static get singleRegex() {
    return /^!(.*)\$$/
  }
  search(text) {
    const isMatch = !text.endsWith(this.pattern);
    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices: [0, text.length - 1]
    }
  }
}

class FuzzyMatch extends BaseMatch {
  constructor(
    pattern,
    {
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance,
      includeMatches = Config.includeMatches,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      isCaseSensitive = Config.isCaseSensitive,
      ignoreDiacritics = Config.ignoreDiacritics,
      ignoreLocation = Config.ignoreLocation
    } = {}
  ) {
    super(pattern);
    this._bitapSearch = new BitapSearch(pattern, {
      location,
      threshold,
      distance,
      includeMatches,
      findAllMatches,
      minMatchCharLength,
      isCaseSensitive,
      ignoreDiacritics,
      ignoreLocation
    });
  }
  static get type() {
    return 'fuzzy'
  }
  static get multiRegex() {
    return /^"(.*)"$/
  }
  static get singleRegex() {
    return /^(.*)$/
  }
  search(text) {
    return this._bitapSearch.searchIn(text)
  }
}

// Token: 'file

class IncludeMatch extends BaseMatch {
  constructor(pattern) {
    super(pattern);
  }
  static get type() {
    return 'include'
  }
  static get multiRegex() {
    return /^'"(.*)"$/
  }
  static get singleRegex() {
    return /^'(.*)$/
  }
  search(text) {
    let location = 0;
    let index;

    const indices = [];
    const patternLen = this.pattern.length;

    // Get all exact matches
    while ((index = text.indexOf(this.pattern, location)) > -1) {
      location = index + patternLen;
      indices.push([index, location - 1]);
    }

    const isMatch = !!indices.length;

    return {
      isMatch,
      score: isMatch ? 0 : 1,
      indices
    }
  }
}

// ❗Order is important. DO NOT CHANGE.
const searchers = [
  ExactMatch,
  IncludeMatch,
  PrefixExactMatch,
  InversePrefixExactMatch,
  InverseSuffixExactMatch,
  SuffixExactMatch,
  InverseExactMatch,
  FuzzyMatch
];

const searchersLen = searchers.length;

// Regex to split by spaces, but keep anything in quotes together
const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
const OR_TOKEN = '|';

// Return a 2D array representation of the query, for simpler parsing.
// Example:
// "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
function parseQuery(pattern, options = {}) {
  return pattern.split(OR_TOKEN).map((item) => {
    let query = item
      .trim()
      .split(SPACE_RE)
      .filter((item) => item && !!item.trim());

    let results = [];
    for (let i = 0, len = query.length; i < len; i += 1) {
      const queryItem = query[i];

      // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
      let found = false;
      let idx = -1;
      while (!found && ++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isMultiMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          found = true;
        }
      }

      if (found) {
        continue
      }

      // 2. Handle single query matches (i.e, once that are *not* quoted)
      idx = -1;
      while (++idx < searchersLen) {
        const searcher = searchers[idx];
        let token = searcher.isSingleMatch(queryItem);
        if (token) {
          results.push(new searcher(token, options));
          break
        }
      }
    }

    return results
  })
}

// These extended matchers can return an array of matches, as opposed
// to a singl match
const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);

/**
 * Command-like searching
 * ======================
 *
 * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
 * search in a given text.
 *
 * Search syntax:
 *
 * | Token       | Match type                 | Description                            |
 * | ----------- | -------------------------- | -------------------------------------- |
 * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
 * | `=scheme`   | exact-match                | Items that are `scheme`                |
 * | `'python`   | include-match              | Items that include `python`            |
 * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
 * | `^java`     | prefix-exact-match         | Items that start with `java`           |
 * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
 * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
 * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
 *
 * A single pipe character acts as an OR operator. For example, the following
 * query matches entries that start with `core` and end with either`go`, `rb`,
 * or`py`.
 *
 * ```
 * ^core go$ | rb$ | py$
 * ```
 */
class ExtendedSearch {
  constructor(
    pattern,
    {
      isCaseSensitive = Config.isCaseSensitive,
      ignoreDiacritics = Config.ignoreDiacritics,
      includeMatches = Config.includeMatches,
      minMatchCharLength = Config.minMatchCharLength,
      ignoreLocation = Config.ignoreLocation,
      findAllMatches = Config.findAllMatches,
      location = Config.location,
      threshold = Config.threshold,
      distance = Config.distance
    } = {}
  ) {
    this.query = null;
    this.options = {
      isCaseSensitive,
      ignoreDiacritics,
      includeMatches,
      minMatchCharLength,
      findAllMatches,
      ignoreLocation,
      location,
      threshold,
      distance
    };

    pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
    pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
    this.pattern = pattern;
    this.query = parseQuery(this.pattern, this.options);
  }

  static condition(_, options) {
    return options.useExtendedSearch
  }

  searchIn(text) {
    const query = this.query;

    if (!query) {
      return {
        isMatch: false,
        score: 1
      }
    }

    const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;

    text = isCaseSensitive ? text : text.toLowerCase();
    text = ignoreDiacritics ? stripDiacritics(text) : text;

    let numMatches = 0;
    let allIndices = [];
    let totalScore = 0;

    // ORs
    for (let i = 0, qLen = query.length; i < qLen; i += 1) {
      const searchers = query[i];

      // Reset indices
      allIndices.length = 0;
      numMatches = 0;

      // ANDs
      for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
        const searcher = searchers[j];
        const { isMatch, indices, score } = searcher.search(text);

        if (isMatch) {
          numMatches += 1;
          totalScore += score;
          if (includeMatches) {
            const type = searcher.constructor.type;
            if (MultiMatchSet.has(type)) {
              allIndices = [...allIndices, ...indices];
            } else {
              allIndices.push(indices);
            }
          }
        } else {
          totalScore = 0;
          numMatches = 0;
          allIndices.length = 0;
          break
        }
      }

      // OR condition, so if TRUE, return
      if (numMatches) {
        let result = {
          isMatch: true,
          score: totalScore / numMatches
        };

        if (includeMatches) {
          result.indices = allIndices;
        }

        return result
      }
    }

    // Nothing was matched
    return {
      isMatch: false,
      score: 1
    }
  }
}

const registeredSearchers = [];

function register(...args) {
  registeredSearchers.push(...args);
}

function createSearcher(pattern, options) {
  for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
    let searcherClass = registeredSearchers[i];
    if (searcherClass.condition(pattern, options)) {
      return new searcherClass(pattern, options)
    }
  }

  return new BitapSearch(pattern, options)
}

const LogicalOperator = {
  AND: '$and',
  OR: '$or'
};

const KeyType = {
  PATH: '$path',
  PATTERN: '$val'
};

const isExpression = (query) =>
  !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);

const isPath = (query) => !!query[KeyType.PATH];

const isLeaf = (query) =>
  !isArray(query) && isObject(query) && !isExpression(query);

const convertToExplicit = (query) => ({
  [LogicalOperator.AND]: Object.keys(query).map((key) => ({
    [key]: query[key]
  }))
});

// When `auto` is `true`, the parse function will infer and initialize and add
// the appropriate `Searcher` instance
function parse(query, options, { auto = true } = {}) {
  const next = (query) => {
    let keys = Object.keys(query);

    const isQueryPath = isPath(query);

    if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
      return next(convertToExplicit(query))
    }

    if (isLeaf(query)) {
      const key = isQueryPath ? query[KeyType.PATH] : keys[0];

      const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];

      if (!isString(pattern)) {
        throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key))
      }

      const obj = {
        keyId: createKeyId(key),
        pattern
      };

      if (auto) {
        obj.searcher = createSearcher(pattern, options);
      }

      return obj
    }

    let node = {
      children: [],
      operator: keys[0]
    };

    keys.forEach((key) => {
      const value = query[key];

      if (isArray(value)) {
        value.forEach((item) => {
          node.children.push(next(item));
        });
      }
    });

    return node
  };

  if (!isExpression(query)) {
    query = convertToExplicit(query);
  }

  return next(query)
}

// Practical scoring function
function computeScore(
  results,
  { ignoreFieldNorm = Config.ignoreFieldNorm }
) {
  results.forEach((result) => {
    let totalScore = 1;

    result.matches.forEach(({ key, norm, score }) => {
      const weight = key ? key.weight : null;

      totalScore *= Math.pow(
        score === 0 && weight ? Number.EPSILON : score,
        (weight || 1) * (ignoreFieldNorm ? 1 : norm)
      );
    });

    result.score = totalScore;
  });
}

function transformMatches(result, data) {
  const matches = result.matches;
  data.matches = [];

  if (!isDefined(matches)) {
    return
  }

  matches.forEach((match) => {
    if (!isDefined(match.indices) || !match.indices.length) {
      return
    }

    const { indices, value } = match;

    let obj = {
      indices,
      value
    };

    if (match.key) {
      obj.key = match.key.src;
    }

    if (match.idx > -1) {
      obj.refIndex = match.idx;
    }

    data.matches.push(obj);
  });
}

function transformScore(result, data) {
  data.score = result.score;
}

function format(
  results,
  docs,
  {
    includeMatches = Config.includeMatches,
    includeScore = Config.includeScore
  } = {}
) {
  const transformers = [];

  if (includeMatches) transformers.push(transformMatches);
  if (includeScore) transformers.push(transformScore);

  return results.map((result) => {
    const { idx } = result;

    const data = {
      item: docs[idx],
      refIndex: idx
    };

    if (transformers.length) {
      transformers.forEach((transformer) => {
        transformer(result, data);
      });
    }

    return data
  })
}

class Fuse {
  constructor(docs, options = {}, index) {
    this.options = { ...Config, ...options };

    if (
      this.options.useExtendedSearch &&
      false
    ) ;

    this._keyStore = new KeyStore(this.options.keys);

    this.setCollection(docs, index);
  }

  setCollection(docs, index) {
    this._docs = docs;

    if (index && !(index instanceof FuseIndex)) {
      throw new Error(INCORRECT_INDEX_TYPE)
    }

    this._myIndex =
      index ||
      createIndex(this.options.keys, this._docs, {
        getFn: this.options.getFn,
        fieldNormWeight: this.options.fieldNormWeight
      });
  }

  add(doc) {
    if (!isDefined(doc)) {
      return
    }

    this._docs.push(doc);
    this._myIndex.add(doc);
  }

  remove(predicate = (/* doc, idx */) => false) {
    const results = [];

    for (let i = 0, len = this._docs.length; i < len; i += 1) {
      const doc = this._docs[i];
      if (predicate(doc, i)) {
        this.removeAt(i);
        i -= 1;
        len -= 1;

        results.push(doc);
      }
    }

    return results
  }

  removeAt(idx) {
    this._docs.splice(idx, 1);
    this._myIndex.removeAt(idx);
  }

  getIndex() {
    return this._myIndex
  }

  search(query, { limit = -1 } = {}) {
    const {
      includeMatches,
      includeScore,
      shouldSort,
      sortFn,
      ignoreFieldNorm
    } = this.options;

    let results = isString(query)
      ? isString(this._docs[0])
        ? this._searchStringList(query)
        : this._searchObjectList(query)
      : this._searchLogical(query);

    computeScore(results, { ignoreFieldNorm });

    if (shouldSort) {
      results.sort(sortFn);
    }

    if (isNumber(limit) && limit > -1) {
      results = results.slice(0, limit);
    }

    return format(results, this._docs, {
      includeMatches,
      includeScore
    })
  }

  _searchStringList(query) {
    const searcher = createSearcher(query, this.options);
    const { records } = this._myIndex;
    const results = [];

    // Iterate over every string in the index
    records.forEach(({ v: text, i: idx, n: norm }) => {
      if (!isDefined(text)) {
        return
      }

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        results.push({
          item: text,
          idx,
          matches: [{ score, value: text, norm, indices }]
        });
      }
    });

    return results
  }

  _searchLogical(query) {

    const expression = parse(query, this.options);

    const evaluate = (node, item, idx) => {
      if (!node.children) {
        const { keyId, searcher } = node;

        const matches = this._findMatches({
          key: this._keyStore.get(keyId),
          value: this._myIndex.getValueForItemAtKeyId(item, keyId),
          searcher
        });

        if (matches && matches.length) {
          return [
            {
              idx,
              item,
              matches
            }
          ]
        }

        return []
      }

      const res = [];
      for (let i = 0, len = node.children.length; i < len; i += 1) {
        const child = node.children[i];
        const result = evaluate(child, item, idx);
        if (result.length) {
          res.push(...result);
        } else if (node.operator === LogicalOperator.AND) {
          return []
        }
      }
      return res
    };

    const records = this._myIndex.records;
    const resultMap = {};
    const results = [];

    records.forEach(({ $: item, i: idx }) => {
      if (isDefined(item)) {
        let expResults = evaluate(expression, item, idx);

        if (expResults.length) {
          // Dedupe when adding
          if (!resultMap[idx]) {
            resultMap[idx] = { idx, item, matches: [] };
            results.push(resultMap[idx]);
          }
          expResults.forEach(({ matches }) => {
            resultMap[idx].matches.push(...matches);
          });
        }
      }
    });

    return results
  }

  _searchObjectList(query) {
    const searcher = createSearcher(query, this.options);
    const { keys, records } = this._myIndex;
    const results = [];

    // List is Array<Object>
    records.forEach(({ $: item, i: idx }) => {
      if (!isDefined(item)) {
        return
      }

      let matches = [];

      // Iterate over every key (i.e, path), and fetch the value at that key
      keys.forEach((key, keyIndex) => {
        matches.push(
          ...this._findMatches({
            key,
            value: item[keyIndex],
            searcher
          })
        );
      });

      if (matches.length) {
        results.push({
          idx,
          item,
          matches
        });
      }
    });

    return results
  }
  _findMatches({ key, value, searcher }) {
    if (!isDefined(value)) {
      return []
    }

    let matches = [];

    if (isArray(value)) {
      value.forEach(({ v: text, i: idx, n: norm }) => {
        if (!isDefined(text)) {
          return
        }

        const { isMatch, score, indices } = searcher.searchIn(text);

        if (isMatch) {
          matches.push({
            score,
            key,
            value: text,
            idx,
            norm,
            indices
          });
        }
      });
    } else {
      const { v: text, n: norm } = value;

      const { isMatch, score, indices } = searcher.searchIn(text);

      if (isMatch) {
        matches.push({ score, key, value: text, norm, indices });
      }
    }

    return matches
  }
}

Fuse.version = '7.1.0';
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;

{
  Fuse.parseQuery = parse;
}

{
  register(ExtendedSearch);
}

//#region useFuse/index.ts
function useFuse(search, data, options) {
	const createFuse = () => {
		var _toValue, _toValue2;
		return new Fuse((_toValue = vueExports.toValue(data)) !== null && _toValue !== void 0 ? _toValue : [], (_toValue2 = vueExports.toValue(options)) === null || _toValue2 === void 0 ? void 0 : _toValue2.fuseOptions);
	};
	const fuse = vueExports.ref(createFuse());
	vueExports.watch(() => {
		var _toValue3;
		return (_toValue3 = vueExports.toValue(options)) === null || _toValue3 === void 0 ? void 0 : _toValue3.fuseOptions;
	}, () => {
		fuse.value = createFuse();
	}, { deep: true });
	vueExports.watch(() => vueExports.toValue(data), (newData) => {
		fuse.value.setCollection(newData);
	}, { deep: true });
	return {
		fuse,
		results: vueExports.computed(() => {
			const resolved = vueExports.toValue(options);
			if ((resolved === null || resolved === void 0 ? void 0 : resolved.matchAllWhenSearchEmpty) && !vueExports.toValue(search)) return vueExports.toValue(data).map((item, index) => ({
				item,
				refIndex: index
			}));
			const limit = resolved === null || resolved === void 0 ? void 0 : resolved.resultLimit;
			return fuse.value.search(vueExports.toValue(search), limit ? { limit } : void 0);
		})
	};
}

function useRuntimeHook(name, fn) {
  const nuxtApp = useNuxtApp();
  const unregister = nuxtApp.hook(name, fn);
  vueExports.onScopeDispose(unregister);
}
const theme$9 = {
  "base": "fixed inset-0 flex overflow-hidden"
};
const _sfc_main$e = {
  __name: "UDashboardGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    storage: { type: String, required: false, default: "cookie" },
    storageKey: { type: String, required: false, default: "dashboard" },
    persistent: { type: Boolean, required: false, default: true },
    unit: { type: String, required: false, default: "%" }
  },
  setup(__props) {
    const props = __props;
    const nuxtApp = useNuxtApp();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardGroup", props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$9), ...appConfig.ui?.dashboardGroup || {} }));
    const sidebarOpen = vueExports.ref(false);
    const sidebarCollapsed = vueExports.ref(false);
    provideDashboardContext({
      storage: props.storage,
      storageKey: props.storageKey,
      persistent: props.persistent,
      unit: props.unit,
      sidebarOpen,
      toggleSidebar: () => {
        nuxtApp.hooks.callHook("dashboard:sidebar:toggle");
      },
      sidebarCollapsed,
      collapseSidebar: (collapsed) => {
        nuxtApp.hooks.callHook("dashboard:sidebar:collapse", collapsed);
      },
      toggleSearch: () => {
        nuxtApp.hooks.callHook("dashboard:search:toggle");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        class: ui.value({ class: [vueExports.unref(uiProp)?.base, props.class] })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardGroup.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const theme$8 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "side": {
      "top": {
        "content": ""
      },
      "right": {
        "content": "max-w-md"
      },
      "bottom": {
        "content": ""
      },
      "left": {
        "content": "max-w-md"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg"
      }
    },
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      }
    }
  },
  "compoundVariants": [
    {
      "side": "top",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 top-4"
      }
    },
    {
      "side": "top",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 top-0"
      }
    },
    {
      "side": "right",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 right-4"
      }
    },
    {
      "side": "right",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 right-0"
      }
    },
    {
      "side": "bottom",
      "inset": true,
      "class": {
        "content": "max-h-[calc(100%-2rem)] inset-x-4 bottom-4"
      }
    },
    {
      "side": "bottom",
      "inset": false,
      "class": {
        "content": "max-h-full inset-x-0 bottom-0"
      }
    },
    {
      "side": "left",
      "inset": true,
      "class": {
        "content": "w-[calc(100%-2rem)] inset-y-4 left-4"
      }
    },
    {
      "side": "left",
      "inset": false,
      "class": {
        "content": "w-full inset-y-0 left-0"
      }
    },
    {
      "transition": true,
      "side": "top",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "right",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "bottom",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "left",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]"
      }
    }
  ]
};
const _sfc_main$d = {
  __name: "USlideover",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    side: { type: null, required: false, default: "right" },
    inset: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("slideover", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => props.content);
    const contentEvents = vueExports.computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$8), ...appConfig.ui?.slideover || {} })({
      transition: props.transition,
      side: props.side,
      inset: props.inset
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(DialogRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent_1(vueExports.unref(DialogTrigger_default), {
                "as-child": "",
                class: props.class
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent_1(vueExports.unref(DialogOverlay_default), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent_1(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                    "data-side": __props.side,
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent_1(vueExports.unref(VisuallyHidden_default), null, {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate_1(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate_1(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true),
                                  __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot_1(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div data-slot="wrapper" class="${ssrRenderClass_1(ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                }, {
                                  default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate_1(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                }, {
                                  default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate_1(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot_1(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogClose_default), { "as-child": "" }, {
                                  default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "close", { ui: ui.value }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({
                                            icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": vueExports.unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: vueExports.unref(uiProp)?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                          props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": vueExports.unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            "data-slot": "close",
                                            class: ui.value.close({ class: vueExports.unref(uiProp)?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(uiProp)?.body }))}"${_scopeId3}>`);
                          ssrRenderSlot_1(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                          _push4(`</div>`);
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                            default: vueExports.withCtx(() => [
                              __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                                vueExports.createVNode("div", {
                                  "data-slot": "wrapper",
                                  class: ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ], 2),
                                vueExports.renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                      props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": vueExports.unref(t)("slideover.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        "data-slot": "close",
                                        class: ui.value.close({ class: vueExports.unref(uiProp)?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : vueExports.createCommentVNode("", true)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode("div", {
                              "data-slot": "body",
                              class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "body", { close })
                            ], 2),
                            !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : vueExports.createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                    vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                      "data-side": __props.side,
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, vueExports.toHandlers(contentEvents.value)), {
                      default: vueExports.withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                          default: vueExports.withCtx(() => [
                            __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true),
                            __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                              vueExports.createVNode("div", {
                                "data-slot": "wrapper",
                                class: ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                              ], 2),
                              vueExports.renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                    props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": vueExports.unref(t)("slideover.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      "data-slot": "close",
                                      class: ui.value.close({ class: vueExports.unref(uiProp)?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode("div", {
                            "data-slot": "body",
                            class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "body", { close })
                          ], 2),
                          !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 1,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  __props.overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogOverlay_default), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                  }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode(vueExports.unref(DialogContent_default), vueExports.mergeProps({
                    "data-side": __props.side,
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 0 }, {
                        default: vueExports.withCtx(() => [
                          __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : vueExports.createCommentVNode("", true),
                      vueExports.renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 0,
                          "data-slot": "header",
                          class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "header", { close }, () => [
                            vueExports.createVNode("div", {
                              "data-slot": "wrapper",
                              class: ui.value.wrapper({ class: vueExports.unref(uiProp)?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                              __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                            ], 2),
                            vueExports.renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogClose_default), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                  props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": vueExports.unref(t)("slideover.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    "data-slot": "close",
                                    class: ui.value.close({ class: vueExports.unref(uiProp)?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : vueExports.createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : vueExports.createCommentVNode("", true)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.createVNode("div", {
                          "data-slot": "body",
                          class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "body", { close })
                        ], 2),
                        !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                          key: 1,
                          "data-slot": "footer",
                          class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const theme$7 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default ring ring-default flex focus:outline-none",
    "handle": [
      "shrink-0 !bg-accented",
      "transition-opacity"
    ],
    "container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
    "header": "",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "body": "flex-1",
    "footer": "flex flex-col gap-1.5"
  },
  "variants": {
    "direction": {
      "top": {
        "content": "mb-24 flex-col-reverse",
        "handle": "mb-4"
      },
      "right": {
        "content": "flex-row",
        "handle": "!ml-4"
      },
      "bottom": {
        "content": "mt-24 flex-col",
        "handle": "mt-4"
      },
      "left": {
        "content": "flex-row-reverse",
        "handle": "!mr-4"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]"
      }
    },
    "snapPoints": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "direction": [
        "top",
        "bottom"
      ],
      "class": {
        "content": "h-auto max-h-[96%]",
        "handle": "!w-12 !h-1.5 mx-auto"
      }
    },
    {
      "direction": [
        "top",
        "bottom"
      ],
      "snapPoints": true,
      "class": {
        "content": "h-full"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "class": {
        "content": "w-auto max-w-[calc(100%-2rem)]",
        "handle": "!h-12 !w-1.5 mt-auto mb-auto"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "snapPoints": true,
      "class": {
        "content": "w-full"
      }
    },
    {
      "direction": "top",
      "inset": true,
      "class": {
        "content": "inset-x-4 top-4"
      }
    },
    {
      "direction": "top",
      "inset": false,
      "class": {
        "content": "inset-x-0 top-0 rounded-b-lg"
      }
    },
    {
      "direction": "bottom",
      "inset": true,
      "class": {
        "content": "inset-x-4 bottom-4"
      }
    },
    {
      "direction": "bottom",
      "inset": false,
      "class": {
        "content": "inset-x-0 bottom-0 rounded-t-lg"
      }
    },
    {
      "direction": "left",
      "inset": true,
      "class": {
        "content": "inset-y-4 left-4"
      }
    },
    {
      "direction": "left",
      "inset": false,
      "class": {
        "content": "inset-y-0 left-0 rounded-r-lg"
      }
    },
    {
      "direction": "right",
      "inset": true,
      "class": {
        "content": "inset-y-4 right-4"
      }
    },
    {
      "direction": "right",
      "inset": false,
      "class": {
        "content": "inset-y-0 right-0 rounded-l-lg"
      }
    }
  ]
};
const _sfc_main$c = {
  __name: "UDrawer",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    inset: { type: Boolean, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    handle: { type: Boolean, required: false, default: true },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    nested: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    activeSnapPoint: { type: [Number, String, null], required: false },
    closeThreshold: { type: Number, required: false },
    shouldScaleBackground: { type: Boolean, required: false },
    setBackgroundColorOnScale: { type: Boolean, required: false },
    scrollLockTimeout: { type: Number, required: false },
    fixed: { type: Boolean, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    modal: { type: Boolean, required: false, default: true },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    direction: { type: String, required: false, default: "bottom" },
    noBodyStyles: { type: Boolean, required: false },
    handleOnly: { type: Boolean, required: false },
    preventScrollRestoration: { type: Boolean, required: false },
    snapPoints: { type: Array, required: false }
  },
  emits: ["close:prevent", "drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("drawer", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => props.content);
    const contentEvents = vueExports.computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$7), ...appConfig.ui?.drawer || {} })({
      direction: props.direction,
      inset: props.inset,
      snapPoints: props.snapPoints && props.snapPoints.length > 0
    }));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.nested ? vueExports.unref(_t) : vueExports.unref(St)), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent_1(vueExports.unref(DialogTrigger_default), {
                "as-child": "",
                class: props.class
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default")
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent_1(vueExports.unref(Bt), {
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent_1(vueExports.unref(Ct), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (__props.handle) {
                          _push4(ssrRenderComponent_1(vueExports.unref(Nt), {
                            "data-slot": "handle",
                            class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle })
                          }, null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent_1(vueExports.unref(VisuallyHidden_default), null, {
                            default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), null, {
                                    default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate_1(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 3
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), null, {
                                    default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate_1(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                            vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 3
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true),
                                  __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : vueExports.createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 3
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot_1(_ctx.$slots, "content", {}, () => {
                          _push4(`<div data-slot="container" class="${ssrRenderClass_1(ui.value.container({ class: vueExports.unref(uiProp)?.container }))}"${_scopeId3}>`);
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description)) {
                            _push4(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(uiProp)?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "header", {}, () => {
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogTitle_default), {
                                  "data-slot": "title",
                                  class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                }, {
                                  default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate_1(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 3
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent_1(vueExports.unref(DialogDescription_default), {
                                  "data-slot": "description",
                                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                }, {
                                  default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot_1(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate_1(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                          vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 3
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.body) {
                            _push4(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(uiProp)?.body }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "body", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (!!slots.footer) {
                            _push4(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(uiProp)?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot_1(_ctx.$slots, "footer", {}, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          __props.handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                            key: 0,
                            "data-slot": "handle",
                            class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle })
                          }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                            default: vueExports.withCtx(() => [
                              __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true),
                              __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : vueExports.createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                            vueExports.createVNode("div", {
                              "data-slot": "container",
                              class: ui.value.container({ class: vueExports.unref(uiProp)?.container })
                            }, [
                              !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 0,
                                "data-slot": "header",
                                class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                  __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                    key: 0,
                                    "data-slot": "title",
                                    class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                    key: 1,
                                    "data-slot": "description",
                                    class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ])
                              ], 2)) : vueExports.createCommentVNode("", true),
                              !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 1,
                                "data-slot": "body",
                                class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "body")
                              ], 2)) : vueExports.createCommentVNode("", true),
                              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                                key: 2,
                                "data-slot": "footer",
                                class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, "footer")
                              ], 2)) : vueExports.createCommentVNode("", true)
                            ], 2)
                          ])
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Bt), {
                      key: 0,
                      "data-slot": "overlay",
                      class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                    }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                    vueExports.createVNode(vueExports.unref(Ct), vueExports.mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                    }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                      default: vueExports.withCtx(() => [
                        __props.handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                          key: 0,
                          "data-slot": "handle",
                          class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle })
                        }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                          default: vueExports.withCtx(() => [
                            __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true),
                            __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : vueExports.createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                          vueExports.createVNode("div", {
                            "data-slot": "container",
                            class: ui.value.container({ class: vueExports.unref(uiProp)?.container })
                          }, [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 0,
                              "data-slot": "header",
                              class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                                __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                  key: 0,
                                  "data-slot": "title",
                                  class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                  key: 1,
                                  "data-slot": "description",
                                  class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                              ])
                            ], 2)) : vueExports.createCommentVNode("", true),
                            !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 1,
                              "data-slot": "body",
                              class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "body")
                            ], 2)) : vueExports.createCommentVNode("", true),
                            !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                              key: 2,
                              "data-slot": "footer",
                              class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, "footer")
                            ], 2)) : vueExports.createCommentVNode("", true)
                          ], 2)
                        ])
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(DialogPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  __props.overlay ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Bt), {
                    key: 0,
                    "data-slot": "overlay",
                    class: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay })
                  }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                  vueExports.createVNode(vueExports.unref(Ct), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, contentProps.value, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx(() => [
                      __props.handle ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Nt), {
                        key: 0,
                        "data-slot": "handle",
                        class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle })
                      }, null, 8, ["class"])) : vueExports.createCommentVNode("", true),
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHidden_default), { key: 1 }, {
                        default: vueExports.withCtx(() => [
                          __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), { key: 0 }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true),
                          __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), { key: 1 }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : vueExports.createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : vueExports.createCommentVNode("", true),
                      vueExports.renderSlot(_ctx.$slots, "content", {}, () => [
                        vueExports.createVNode("div", {
                          "data-slot": "container",
                          class: ui.value.container({ class: vueExports.unref(uiProp)?.container })
                        }, [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 0,
                            "data-slot": "header",
                            class: ui.value.header({ class: vueExports.unref(uiProp)?.header })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "header", {}, () => [
                              __props.title || !!slots.title ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogTitle_default), {
                                key: 0,
                                "data-slot": "title",
                                class: ui.value.title({ class: vueExports.unref(uiProp)?.title })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "title", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                              __props.description || !!slots.description ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DialogDescription_default), {
                                key: 1,
                                "data-slot": "description",
                                class: ui.value.description({ class: vueExports.unref(uiProp)?.description })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "description", {}, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          !!slots.body ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 1,
                            "data-slot": "body",
                            class: ui.value.body({ class: vueExports.unref(uiProp)?.body })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "body")
                          ], 2)) : vueExports.createCommentVNode("", true),
                          !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                            key: 2,
                            "data-slot": "footer",
                            class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "footer")
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ], 2)
                      ])
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Drawer.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const theme$6 = {
  "slots": {
    "root": "relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0",
    "header": "h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4",
    "body": "flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2",
    "footer": "shrink-0 flex items-center gap-1.5 px-4 py-2",
    "toggle": "",
    "handle": "",
    "content": "lg:hidden",
    "overlay": "lg:hidden"
  },
  "variants": {
    "menu": {
      "true": {
        "header": "sm:px-6",
        "body": "sm:px-6",
        "footer": "sm:px-6"
      }
    },
    "side": {
      "left": {
        "root": "border-e border-default"
      },
      "right": {
        "root": ""
      }
    },
    "toggleSide": {
      "left": {
        "toggle": ""
      },
      "right": {
        "toggle": "ms-auto"
      }
    }
  }
};
const _sfc_main$b = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardSidebar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    mode: { type: null, required: false, default: "slideover" },
    menu: { type: null, required: false },
    toggle: { type: [Boolean, Object], required: false, default: true },
    toggleSide: { type: String, required: false, default: "left" },
    autoClose: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    id: { type: String, required: false },
    side: { type: String, required: false, default: "left" },
    minSize: { type: Number, required: false, default: 10 },
    maxSize: { type: Number, required: false, default: 20 },
    defaultSize: { type: Number, required: false, default: 15 },
    resizable: { type: Boolean, required: false, default: false },
    collapsible: { type: Boolean, required: false, default: false },
    collapsedSize: { type: Number, required: false, default: 0 }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {},
    "collapsed": { type: Boolean, ...{ default: false } },
    "collapsedModifiers": {}
  }),
  emits: ["update:open", "update:collapsed"],
  setup(__props) {
    const props = __props;
    const slots = vueExports.useSlots();
    const open = vueExports.useModel(__props, "open", { type: Boolean, ...{ default: false } });
    const collapsed = vueExports.useModel(__props, "collapsed", { type: Boolean, ...{ default: false } });
    const route = useRoute();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardSidebar", props);
    const dashboardContext = useDashboard({
      storageKey: "dashboard",
      unit: "%",
      sidebarOpen: vueExports.ref(false),
      sidebarCollapsed: vueExports.ref(false)
    });
    const id = `${dashboardContext.storageKey}-sidebar-${props.id || vueExports.useId()}`;
    const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, vueExports.toRef(() => ({ ...dashboardContext, ...props })), { collapsed });
    const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
    const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();
    useRuntimeHook("dashboard:sidebar:toggle", () => {
      open.value = !open.value;
    });
    useRuntimeHook("dashboard:sidebar:collapse", (value) => {
      isCollapsed.value = value;
    });
    vueExports.watch(open, () => dashboardContext.sidebarOpen.value = open.value, { immediate: true });
    vueExports.watch(isCollapsed, () => dashboardContext.sidebarCollapsed.value = isCollapsed.value, { immediate: true });
    vueExports.watch(() => route.fullPath, () => {
      if (!props.autoClose) return;
      open.value = false;
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$6), ...appConfig.ui?.dashboardSidebar || {} })({
      side: props.side
    }));
    const Menu = vueExports.computed(() => ({
      slideover: _sfc_main$d,
      modal: _sfc_main$f,
      drawer: _sfc_main$c
    })[props.mode]);
    const menuProps = vueExports.toRef(() => defu(props.menu, {
      content: {
        onOpenAutoFocus: (e) => e.preventDefault()
      }
    }, props.mode === "modal" ? { fullscreen: true, transition: false } : props.mode === "slideover" ? { side: "left" } : {}));
    function toggleOpen() {
      open.value = !open.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineToggleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "toggle", {
              open: open.value,
              toggle: toggleOpen,
              ui: ui.value
            }, () => {
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
              vueExports.renderSlot(_ctx.$slots, "toggle", {
                open: open.value,
                toggle: toggleOpen,
                ui: ui.value
              }, () => [
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
      _push(ssrRenderComponent_1(vueExports.unref(DefineResizeHandleTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "resize-handle", {
              onMouseDown: vueExports.unref(onMouseDown),
              onTouchStart: vueExports.unref(onTouchStart),
              onDoubleClick: vueExports.unref(onDoubleClick),
              ui: ui.value
            }, () => {
              if (__props.resizable) {
                _push2(ssrRenderComponent_1(_sfc_main$2$1, {
                  "aria-controls": id,
                  "data-slot": "handle",
                  class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle }),
                  onMousedown: vueExports.unref(onMouseDown),
                  onTouchstart: vueExports.unref(onTouchStart),
                  onDblclick: vueExports.unref(onDoubleClick)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "resize-handle", {
                onMouseDown: vueExports.unref(onMouseDown),
                onTouchStart: vueExports.unref(onTouchStart),
                onDoubleClick: vueExports.unref(onDoubleClick),
                ui: ui.value
              }, () => [
                __props.resizable ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$2$1, {
                  key: 0,
                  "aria-controls": id,
                  "data-slot": "handle",
                  class: ui.value.handle({ class: vueExports.unref(uiProp)?.handle }),
                  onMousedown: vueExports.unref(onMouseDown),
                  onTouchstart: vueExports.unref(onTouchStart),
                  onDblclick: vueExports.unref(onDoubleClick)
                }, null, 8, ["class", "onMousedown", "onTouchstart", "onDblclick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      if (__props.side === "right") {
        _push(ssrRenderComponent_1(vueExports.unref(ReuseResizeHandleTemplate), null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({
        id,
        ref_key: "el",
        ref: el
      }, _ctx.$attrs, {
        "data-collapsed": vueExports.unref(isCollapsed),
        "data-dragging": vueExports.unref(isDragging),
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] }),
        style: { "--width": `${vueExports.unref(size) || 0}${vueExports.unref(dashboardContext).unit}` }
      }))}>`);
      if (!!slots.header) {
        _push(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(uiProp)?.header }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "header", {
          collapsed: vueExports.unref(isCollapsed),
          collapse: vueExports.unref(collapse)
        }, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(uiProp)?.body }))}">`);
      ssrRenderSlot_1(_ctx.$slots, "default", {
        collapsed: vueExports.unref(isCollapsed),
        collapse: vueExports.unref(collapse)
      }, null, _push, _parent);
      _push(`</div>`);
      if (!!slots.footer) {
        _push(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(uiProp)?.footer }))}">`);
        ssrRenderSlot_1(_ctx.$slots, "footer", {
          collapsed: vueExports.unref(isCollapsed),
          collapse: vueExports.unref(collapse)
        }, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.side === "left") {
        _push(ssrRenderComponent_1(vueExports.unref(ReuseResizeHandleTemplate), null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent_1(vueExports.unref(Menu), vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: vueExports.unref(t)("dashboardSidebar.title"),
        description: vueExports.unref(t)("dashboardSidebar.description")
      }, menuProps.value, {
        ui: {
          overlay: ui.value.overlay({ class: vueExports.unref(uiProp)?.overlay }),
          content: ui.value.content({ class: vueExports.unref(uiProp)?.content })
        }
      }), {
        content: vueExports.withCtx((contentData, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "content", contentData, () => {
              if (!!slots.header || __props.mode !== "drawer") {
                _push2(`<div data-slot="header" class="${ssrRenderClass_1(ui.value.header({ class: vueExports.unref(uiProp)?.header, menu: true }))}"${_scopeId}>`);
                if (__props.mode !== "drawer" && __props.toggleSide === "left") {
                  _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                ssrRenderSlot_1(_ctx.$slots, "header", {
                  collapsed: vueExports.unref(isCollapsed),
                  collapse: vueExports.unref(collapse)
                }, null, _push2, _parent2, _scopeId);
                if (__props.mode !== "drawer" && __props.toggleSide === "right") {
                  _push2(ssrRenderComponent_1(vueExports.unref(ReuseToggleTemplate), null, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-slot="body" class="${ssrRenderClass_1(ui.value.body({ class: vueExports.unref(uiProp)?.body, menu: true }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "default", {
                collapsed: vueExports.unref(isCollapsed),
                collapse: vueExports.unref(collapse)
              }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
              if (!!slots.footer) {
                _push2(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(uiProp)?.footer, menu: true }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, "footer", {
                  collapsed: vueExports.unref(isCollapsed),
                  collapse: vueExports.unref(collapse)
                }, null, _push2, _parent2, _scopeId);
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "content", contentData, () => [
                !!slots.header || __props.mode !== "drawer" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 0,
                  "data-slot": "header",
                  class: ui.value.header({ class: vueExports.unref(uiProp)?.header, menu: true })
                }, [
                  __props.mode !== "drawer" && __props.toggleSide === "left" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                  vueExports.renderSlot(_ctx.$slots, "header", {
                    collapsed: vueExports.unref(isCollapsed),
                    collapse: vueExports.unref(collapse)
                  }),
                  __props.mode !== "drawer" && __props.toggleSide === "right" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseToggleTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("div", {
                  "data-slot": "body",
                  class: ui.value.body({ class: vueExports.unref(uiProp)?.body, menu: true })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "default", {
                    collapsed: vueExports.unref(isCollapsed),
                    collapse: vueExports.unref(collapse)
                  })
                ], 2),
                !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                  key: 1,
                  "data-slot": "footer",
                  class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer, menu: true })
                }, [
                  vueExports.renderSlot(_ctx.$slots, "footer", {
                    collapsed: vueExports.unref(isCollapsed),
                    collapse: vueExports.unref(collapse)
                  })
                ], 2)) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardSidebar.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const theme$5 = {
  "slots": {
    "base": "",
    "label": "",
    "trailing": "hidden lg:flex items-center gap-0.5 ms-auto"
  },
  "variants": {
    "collapsed": {
      "true": {
        "label": "hidden",
        "trailing": "lg:hidden"
      }
    }
  }
};
const _sfc_main$a = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UDashboardSearchButton",
  __ssrInlineRender: true,
  props: {
    icon: { type: null, required: false },
    label: { type: String, required: false },
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false },
    collapsed: { type: Boolean, required: false, default: false },
    tooltip: { type: [Boolean, Object], required: false, default: false },
    kbds: { type: Array, required: false, default: () => ["meta", "k"] },
    ui: { type: Object, required: false },
    class: { type: null, required: false },
    activeColor: { type: null, required: false },
    activeVariant: { type: null, required: false },
    size: { type: null, required: false },
    square: { type: Boolean, required: false },
    block: { type: Boolean, required: false },
    loadingAuto: { type: Boolean, required: false },
    onClick: { type: [Function, Array], required: false },
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
    const slots = vueExports.useSlots();
    const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();
    const getProxySlots = () => omit(slots, ["trailing"]);
    const buttonProps = useForwardProps(reactiveOmit$2(props, "icon", "label", "variant", "collapsed", "tooltip", "kbds", "class", "ui"));
    const tooltipProps = vueExports.toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { delayDuration: 0, content: { side: "right" } }));
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardSearchButton", props);
    const { toggleSearch } = useDashboard({ toggleSearch: () => {
    } });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$5), ...appConfig.ui?.dashboardSearchButton || {} })({
      collapsed: props.collapsed
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineButtonTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({
              icon: __props.icon || vueExports.unref(appConfig).ui.icons.search,
              label: __props.label || vueExports.unref(t)("dashboardSearchButton.label"),
              variant: __props.variant || (__props.collapsed ? "ghost" : "outline")
            }, {
              ...vueExports.unref(buttonProps),
              ...__props.collapsed ? {
                "square": true,
                "aria-label": __props.label || vueExports.unref(t)("dashboardSearchButton.label")
              } : {},
              ..._ctx.$attrs
            }, {
              class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] }),
              ui: vueExports.unref(transformUI)(ui.value, vueExports.unref(uiProp)),
              onClick: vueExports.unref(toggleSearch)
            }), vueExports.createSlots({
              trailing: vueExports.withCtx(({ ui: uiProxy }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-slot="trailing" class="${ssrRenderClass_1(ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "trailing", { ui: uiProxy }, () => {
                    if (__props.kbds?.length) {
                      _push3(`<!--[-->`);
                      ssrRenderList_1(__props.kbds, (kbd, index) => {
                        _push3(ssrRenderComponent_1(_sfc_main$1$2, vueExports.mergeProps({
                          key: index,
                          variant: "subtle"
                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", {
                      "data-slot": "trailing",
                      class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "trailing", { ui: uiProxy }, () => [
                        __props.kbds?.length ? (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 0 }, vueExports.renderList(__props.kbds, (kbd, index) => {
                          return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                            key: index,
                            variant: "subtle"
                          }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16);
                        }), 128)) : vueExports.createCommentVNode("", true)
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 2
            }, [
              vueExports.renderList(getProxySlots(), (_2, name) => {
                return {
                  name,
                  fn: vueExports.withCtx((slotData, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, name, slotData)
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({
                icon: __props.icon || vueExports.unref(appConfig).ui.icons.search,
                label: __props.label || vueExports.unref(t)("dashboardSearchButton.label"),
                variant: __props.variant || (__props.collapsed ? "ghost" : "outline")
              }, {
                ...vueExports.unref(buttonProps),
                ...__props.collapsed ? {
                  "square": true,
                  "aria-label": __props.label || vueExports.unref(t)("dashboardSearchButton.label")
                } : {},
                ..._ctx.$attrs
              }, {
                class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] }),
                ui: vueExports.unref(transformUI)(ui.value, vueExports.unref(uiProp)),
                onClick: vueExports.unref(toggleSearch)
              }), vueExports.createSlots({
                trailing: vueExports.withCtx(({ ui: uiProxy }) => [
                  vueExports.createVNode("div", {
                    "data-slot": "trailing",
                    class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "trailing", { ui: uiProxy }, () => [
                      __props.kbds?.length ? (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 0 }, vueExports.renderList(__props.kbds, (kbd, index) => {
                        return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                          key: index,
                          variant: "subtle"
                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16);
                      }), 128)) : vueExports.createCommentVNode("", true)
                    ])
                  ], 2)
                ]),
                _: 2
              }, [
                vueExports.renderList(getProxySlots(), (_2, name) => {
                  return {
                    name,
                    fn: vueExports.withCtx((slotData) => [
                      vueExports.renderSlot(_ctx.$slots, name, slotData)
                    ])
                  };
                })
              ]), 1040, ["icon", "label", "variant", "class", "ui", "onClick"])
            ];
          }
        }),
        _: 3
      }, _parent));
      if (__props.collapsed && __props.tooltip) {
        _push(ssrRenderComponent_1(_sfc_main$g, vueExports.mergeProps({
          text: __props.label || vueExports.unref(t)("dashboardSearchButton.label")
        }, tooltipProps.value), {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent_1(vueExports.unref(ReuseButtonTemplate), null, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(vueExports.unref(ReuseButtonTemplate))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent_1(vueExports.unref(ReuseButtonTemplate), null, null, _parent));
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearchButton.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
function useCalculatorModal() {
  const calculatorOpen = useState("dashboard-calculator-open", () => false);
  function openCalculator() {
    calculatorOpen.value = true;
  }
  function closeCalculator() {
    calculatorOpen.value = false;
  }
  function toggleCalculator() {
    calculatorOpen.value = !calculatorOpen.value;
  }
  return {
    calculatorOpen,
    closeCalculator,
    openCalculator,
    toggleCalculator
  };
}
const ERROR_VALUE = "Ошибка";
const _sfc_main$9 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "CalculatorModal",
  __ssrInlineRender: true,
  props: {
    collapsed: { type: Boolean, default: false },
    showModal: { type: Boolean, default: true },
    showTrigger: { type: Boolean, default: true }
  },
  setup(__props) {
    const { calculatorOpen, openCalculator } = useCalculatorModal();
    const currentValue = vueExports.ref("0");
    const previousValue = vueExports.ref(null);
    const operator = vueExports.ref(null);
    const waitingForOperand = vueExports.ref(false);
    const lastExpression = vueExports.ref("");
    const buttonRows = [
      [
        { color: "error", kind: "action", label: "AC", variant: "soft" },
        { color: "neutral", kind: "action", label: "⌫", value: "backspace", variant: "outline" },
        { color: "neutral", kind: "action", label: "%", value: "percent", variant: "outline" },
        { color: "primary", kind: "operator", label: "÷", value: "÷", variant: "outline" }
      ],
      [
        { color: "neutral", kind: "digit", label: "7", value: "7", variant: "outline" },
        { color: "neutral", kind: "digit", label: "8", value: "8", variant: "outline" },
        { color: "neutral", kind: "digit", label: "9", value: "9", variant: "outline" },
        { color: "primary", kind: "operator", label: "×", value: "×", variant: "outline" }
      ],
      [
        { color: "neutral", kind: "digit", label: "4", value: "4", variant: "outline" },
        { color: "neutral", kind: "digit", label: "5", value: "5", variant: "outline" },
        { color: "neutral", kind: "digit", label: "6", value: "6", variant: "outline" },
        { color: "primary", kind: "operator", label: "-", value: "-", variant: "outline" }
      ],
      [
        { color: "neutral", kind: "digit", label: "1", value: "1", variant: "outline" },
        { color: "neutral", kind: "digit", label: "2", value: "2", variant: "outline" },
        { color: "neutral", kind: "digit", label: "3", value: "3", variant: "outline" },
        { color: "primary", kind: "operator", label: "+", value: "+", variant: "outline" }
      ],
      [
        { color: "neutral", kind: "action", label: "+/-", value: "sign", variant: "outline" },
        { color: "neutral", kind: "digit", label: "0", value: "0", variant: "outline" },
        { color: "neutral", kind: "decimal", label: ",", value: ".", variant: "outline" },
        { color: "primary", kind: "equals", label: "=", variant: "solid" }
      ]
    ];
    const buttons = buttonRows.flat();
    const hasError = vueExports.computed(() => currentValue.value === ERROR_VALUE);
    const displayValue = vueExports.computed(() => {
      if (hasError.value) {
        return ERROR_VALUE;
      }
      return formatDisplay(currentValue.value);
    });
    const secondaryValue = vueExports.computed(() => {
      if (hasError.value) {
        return "Сбросьте вычисление и попробуйте снова";
      }
      if (previousValue.value !== null && operator.value) {
        const leftValue = formatDisplay(serializeNumber(previousValue.value));
        const rightValue = waitingForOperand.value ? "" : ` ${formatDisplay(currentValue.value)}`;
        return `${leftValue} ${operator.value}${rightValue}`;
      }
      if (lastExpression.value) {
        return lastExpression.value;
      }
      return "Быстрые вычисления прямо в панели";
    });
    function clearAll() {
      currentValue.value = "0";
      previousValue.value = null;
      operator.value = null;
      waitingForOperand.value = false;
      lastExpression.value = "";
    }
    function setError() {
      currentValue.value = ERROR_VALUE;
      previousValue.value = null;
      operator.value = null;
      waitingForOperand.value = false;
    }
    function serializeNumber(value) {
      if (!Number.isFinite(value)) {
        return ERROR_VALUE;
      }
      const normalized = Math.abs(value) < 1e-10 ? 0 : Number(value.toFixed(10));
      return String(normalized);
    }
    function formatDisplay(value) {
      if (!value || value === ERROR_VALUE) {
        return ERROR_VALUE;
      }
      if (value.includes("e")) {
        return value.replace(".", ",");
      }
      const negative = value.startsWith("-");
      const normalized = negative ? value.slice(1) : value;
      const [integerPart, decimalPart] = normalized.split(".");
      const groupedInteger = (integerPart || "0").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      return `${negative ? "-" : ""}${groupedInteger}${decimalPart !== void 0 ? `,${decimalPart}` : ""}`;
    }
    function performCalculation(left, right, currentOperator) {
      switch (currentOperator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "×":
          return left * right;
        case "÷":
          if (right === 0) {
            return null;
          }
          return left / right;
      }
    }
    function inputDigit(digit) {
      if (hasError.value) {
        clearAll();
      }
      const digitsCount = currentValue.value.replace(/[-.]/g, "").length;
      if (!waitingForOperand.value && digitsCount >= 14) {
        return;
      }
      if (waitingForOperand.value) {
        currentValue.value = digit;
        waitingForOperand.value = false;
        return;
      }
      if (currentValue.value === "0") {
        currentValue.value = digit;
        return;
      }
      if (currentValue.value === "-0") {
        currentValue.value = `-${digit}`;
        return;
      }
      currentValue.value += digit;
    }
    function inputDecimal() {
      if (hasError.value) {
        clearAll();
      }
      if (waitingForOperand.value) {
        currentValue.value = "0.";
        waitingForOperand.value = false;
        return;
      }
      if (!currentValue.value.includes(".")) {
        currentValue.value += ".";
      }
    }
    function toggleSign() {
      if (hasError.value) {
        clearAll();
        return;
      }
      if (currentValue.value === "0") {
        return;
      }
      currentValue.value = currentValue.value.startsWith("-") ? currentValue.value.slice(1) : `-${currentValue.value}`;
    }
    function applyPercent() {
      if (hasError.value) {
        clearAll();
        return;
      }
      currentValue.value = serializeNumber(Number(currentValue.value) / 100);
      waitingForOperand.value = false;
    }
    function backspace() {
      if (hasError.value) {
        clearAll();
        return;
      }
      if (waitingForOperand.value) {
        return;
      }
      const nextValue = currentValue.value.slice(0, -1);
      if (!nextValue || nextValue === "-") {
        currentValue.value = "0";
        return;
      }
      currentValue.value = nextValue;
    }
    function applyOperator(nextOperator) {
      if (hasError.value) {
        clearAll();
      }
      const inputValue = Number(currentValue.value);
      if (previousValue.value === null) {
        previousValue.value = inputValue;
      } else if (operator.value && !waitingForOperand.value) {
        const result = performCalculation(previousValue.value, inputValue, operator.value);
        if (result === null) {
          setError();
          return;
        }
        previousValue.value = result;
        currentValue.value = serializeNumber(result);
      }
      operator.value = nextOperator;
      waitingForOperand.value = true;
      lastExpression.value = "";
    }
    function applyEquals() {
      if (hasError.value || previousValue.value === null || operator.value === null || waitingForOperand.value) {
        return;
      }
      const leftValue = previousValue.value;
      const rightValue = Number(currentValue.value);
      const currentOperator = operator.value;
      const result = performCalculation(leftValue, rightValue, currentOperator);
      if (result === null) {
        setError();
        return;
      }
      lastExpression.value = `${formatDisplay(serializeNumber(leftValue))} ${currentOperator} ${formatDisplay(serializeNumber(rightValue))}`;
      currentValue.value = serializeNumber(result);
      previousValue.value = null;
      operator.value = null;
      waitingForOperand.value = false;
    }
    function handleAction(action) {
      switch (action) {
        case "backspace":
          backspace();
          return;
        case "percent":
          applyPercent();
          return;
        case "sign":
          toggleSign();
          return;
        default:
          clearAll();
      }
    }
    function handleButtonPress(button) {
      switch (button.kind) {
        case "digit":
          inputDigit(button.value || button.label);
          return;
        case "decimal":
          inputDecimal();
          return;
        case "operator":
          applyOperator(button.value || button.label);
          return;
        case "equals":
          applyEquals();
          return;
        case "action":
          handleAction(button.value);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTooltip = _sfc_main$g;
      const _component_UButton = _sfc_main$a$1;
      const _component_UModal = _sfc_main$f;
      _push(`<!--[-->`);
      if (__props.showTrigger) {
        _push(`<div class="mt-3">`);
        _push(ssrRenderComponent_1(_component_UTooltip, {
          disabled: !__props.collapsed,
          text: "Калькулятор"
        }, {
          default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent_1(_component_UButton, {
                block: !__props.collapsed,
                icon: __props.collapsed ? "i-lucide-calculator" : void 0,
                label: __props.collapsed ? void 0 : "Калькулятор",
                square: __props.collapsed,
                class: "justify-start",
                color: "neutral",
                title: "Калькулятор",
                variant: "outline",
                onClick: vueExports.unref(openCalculator)
              }, null, _parent2, _scopeId));
            } else {
              return [
                vueExports.createVNode(_component_UButton, {
                  block: !__props.collapsed,
                  icon: __props.collapsed ? "i-lucide-calculator" : void 0,
                  label: __props.collapsed ? void 0 : "Калькулятор",
                  square: __props.collapsed,
                  class: "justify-start",
                  color: "neutral",
                  title: "Калькулятор",
                  variant: "outline",
                  onClick: vueExports.unref(openCalculator)
                }, null, 8, ["block", "icon", "label", "square", "onClick"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showModal) {
        _push(ssrRenderComponent_1(_component_UModal, {
          open: vueExports.unref(calculatorOpen),
          "onUpdate:open": ($event) => vueExports.isRef(calculatorOpen) ? calculatorOpen.value = $event : null,
          class: "sm:max-w-md",
          description: "Быстрые вычисления без перехода на другую страницу.",
          title: "Калькулятор"
        }, {
          body: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="rounded-[1.5rem] border border-charcoal-200 bg-[var(--dashboard-shell)] p-4 shadow-sm"${_scopeId}><p class="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-500"${_scopeId}>${ssrInterpolate_1(vueExports.unref(secondaryValue))}</p><p class="mt-4 break-all text-right text-4xl font-semibold text-charcoal-950"${_scopeId}>${ssrInterpolate_1(vueExports.unref(displayValue))}</p></div><div class="grid grid-cols-4 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList_1(vueExports.unref(buttons), (button) => {
                _push2(ssrRenderComponent_1(_component_UButton, {
                  key: button.label,
                  color: button.color,
                  label: button.label,
                  variant: button.variant,
                  class: "h-14 justify-center text-lg font-semibold",
                  onClick: ($event) => handleButtonPress(button)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "space-y-4" }, [
                  vueExports.createVNode("div", { class: "rounded-[1.5rem] border border-charcoal-200 bg-[var(--dashboard-shell)] p-4 shadow-sm" }, [
                    vueExports.createVNode("p", { class: "text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-500" }, vueExports.toDisplayString(vueExports.unref(secondaryValue)), 1),
                    vueExports.createVNode("p", { class: "mt-4 break-all text-right text-4xl font-semibold text-charcoal-950" }, vueExports.toDisplayString(vueExports.unref(displayValue)), 1)
                  ]),
                  vueExports.createVNode("div", { class: "grid grid-cols-4 gap-3" }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(vueExports.unref(buttons), (button) => {
                      return vueExports.openBlock(), vueExports.createBlock(_component_UButton, {
                        key: button.label,
                        color: button.color,
                        label: button.label,
                        variant: button.variant,
                        class: "h-14 justify-center text-lg font-semibold",
                        onClick: ($event) => handleButtonPress(button)
                      }, null, 8, ["color", "label", "variant", "onClick"]);
                    }), 128))
                  ])
                ])
              ];
            }
          }),
          footer: vueExports.withCtx(({ close }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex w-full items-center justify-between gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent_1(_component_UButton, {
                color: "neutral",
                variant: "outline",
                onClick: clearAll
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Сбросить `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Сбросить ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent_1(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                onClick: close
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Закрыть `);
                  } else {
                    return [
                      vueExports.createTextVNode(" Закрыть ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                vueExports.createVNode("div", { class: "flex w-full items-center justify-between gap-3" }, [
                  vueExports.createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: clearAll
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
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/CalculatorModal.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$9, { __name: "AppCalculatorModal" });
const theme$4 = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-bg stroke-default"
  }
};
const _sfc_main$8 = {
  __name: "UPopover",
  __ssrInlineRender: true,
  props: {
    mode: { type: null, required: false, default: "click" },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false },
    openDelay: { type: Number, required: false, default: 0 },
    closeDelay: { type: Number, required: false, default: 0 }
  },
  emits: ["close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("popover", props);
    const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
    const rootProps = useForwardPropsEmits(pick, emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const contentEvents = vueExports.computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {
        pointerDownOutside
      };
    });
    const arrowProps = vueExports.toRef(() => defu(props.arrow, { rounded: true }));
    const ui = vueExports.computed(() => tv({ extend: tv(theme$4), ...appConfig.ui?.popover || {} })({
      side: contentProps.value.side
    }));
    const Component = vueExports.computed(() => props.mode === "hover" ? HoverCard : Popover);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Component).Root, vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent_1(vueExports.unref(Component).Trigger, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if ("Anchor" in Component.value && !!slots.anchor) {
              _push2(ssrRenderComponent_1(vueExports.unref(Component).Anchor, { "as-child": "" }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "anchor", close ? { close } : {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(Component).Portal, vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(Component).Content, vueExports.mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot_1(_ctx.$slots, "content", close ? { close } : {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent_1(vueExports.unref(Component).Arrow, vueExports.mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Component).Arrow, vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                          }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(Component).Content, vueExports.mergeProps(contentProps.value, {
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                    }, vueExports.toHandlers(contentEvents.value)), {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                        !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Component).Arrow, vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                        }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Component).Trigger, {
                key: 0,
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["reference", "class"])) : vueExports.createCommentVNode("", true),
              "Anchor" in Component.value && !!slots.anchor ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Component).Anchor, {
                key: 1,
                "as-child": ""
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "anchor", close ? { close } : {})
                ]),
                _: 2
              }, 1024)) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(Component).Portal, vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(Component).Content, vueExports.mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }, vueExports.toHandlers(contentEvents.value)), {
                    default: vueExports.withCtx(() => [
                      vueExports.renderSlot(_ctx.$slots, "content", close ? { close } : {}),
                      !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Component).Arrow, vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                      }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040, ["class"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const theme$3 = {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkLeadingChipSize": "sm",
    "linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childList": "isolate",
    "childLabel": "text-xs text-highlighted",
    "childItem": "",
    "childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "childLinkWrapper": "min-w-0",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "truncate",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childLinkDescription": "text-muted",
    "separator": "px-2 h-px bg-border",
    "viewportWrapper": "absolute top-full left-0 flex w-full",
    "viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]",
    "content": "",
    "indicator": "absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-[1] rounded-xs"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-primary",
        "childLink": "focus-visible:before:ring-primary"
      },
      "secondary": {
        "link": "focus-visible:before:ring-secondary",
        "childLink": "focus-visible:before:ring-secondary"
      },
      "success": {
        "link": "focus-visible:before:ring-success",
        "childLink": "focus-visible:before:ring-success"
      },
      "info": {
        "link": "focus-visible:before:ring-info",
        "childLink": "focus-visible:before:ring-info"
      },
      "warning": {
        "link": "focus-visible:before:ring-warning",
        "childLink": "focus-visible:before:ring-warning"
      },
      "error": {
        "link": "focus-visible:before:ring-error",
        "childLink": "focus-visible:before:ring-error"
      },
      "neutral": {
        "link": "focus-visible:before:ring-inverted",
        "childLink": "focus-visible:before:ring-inverted"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2",
        "childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
        "childLinkLabel": "font-medium",
        "content": "absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
        "childLabel": "px-1.5 py-0.5",
        "childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)"
      }
    },
    "active": {
      "true": {
        "childLink": "before:bg-elevated text-highlighted",
        "childLinkIcon": "text-default"
      },
      "false": {
        "link": "text-muted",
        "linkLeadingIcon": "text-dimmed",
        "childLink": [
          "hover:before:bg-elevated/50 text-default hover:text-highlighted",
          "transition-colors before:transition-colors"
        ],
        "childLinkIcon": [
          "text-dimmed group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "contentOrientation": "horizontal",
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal",
      "contentOrientation": "vertical",
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-default",
        "childItem": "ps-1.5 -ms-px",
        "content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": true,
      "class": {
        "link": "px-1.5",
        "linkLabel": "hidden",
        "linkTrailing": "hidden",
        "content": "shadow-sm rounded-sm min-h-6 p-1"
      }
    },
    {
      "orientation": "horizontal",
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical",
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "class": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": true,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": false,
      "active": false,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-elevated"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": true,
      "disabled": false,
      "class": {
        "link": [
          "hover:before:bg-elevated/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "class": {
        "link": [
          "hover:text-highlighted",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "highlightColor": "primary",
    "variant": "pill"
  }
};
const _sfc_main$7 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UNavigationMenu",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    type: { type: null, required: false, default: "multiple" },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    items: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    collapsed: { type: Boolean, required: false },
    tooltip: { type: [Boolean, Object], required: false },
    popover: { type: [Boolean, Object], required: false },
    highlight: { type: Boolean, required: false },
    highlightColor: { type: null, required: false },
    content: { type: Object, required: false },
    contentOrientation: { type: null, required: false, default: "horizontal" },
    arrow: { type: Boolean, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    delayDuration: { type: Number, required: false, default: 0 },
    disableClickTrigger: { type: Boolean, required: false },
    disableHoverTrigger: { type: Boolean, required: false },
    skipDelayDuration: { type: Number, required: false },
    disablePointerLeaveClose: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false },
    collapsible: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("navigationMenu", props);
    const rootProps = useForwardPropsEmits(vueExports.computed(() => ({
      as: props.as,
      delayDuration: props.delayDuration,
      skipDelayDuration: props.skipDelayDuration,
      orientation: props.orientation,
      disableClickTrigger: props.disableClickTrigger,
      disableHoverTrigger: props.disableHoverTrigger,
      disablePointerLeaveClose: props.disablePointerLeaveClose,
      unmountOnHide: props.unmountOnHide
    })), emits);
    const accordionProps = useForwardPropsEmits(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
    const contentProps = vueExports.toRef(() => props.content);
    const tooltipProps = vueExports.toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { ...props.orientation === "vertical" && { delayDuration: 0, content: { side: "right" } } }));
    const popoverProps = vueExports.toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, { mode: "hover", content: { side: "right", align: "start", alignOffset: 2 } }));
    const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: Object,
        index: Number,
        level: Number,
        listIndex: Number
      }
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.navigationMenu || {} })({
      orientation: props.orientation,
      contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
      collapsed: props.collapsed,
      color: props.color,
      variant: props.variant,
      highlight: props.highlight,
      highlightColor: props.highlightColor || props.color
    }));
    const lists = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    function getItemValue(item, index, level, listIndex) {
      const prefix = lists.value.length > 1 ? `group-${listIndex}-` : "";
      return get$1(item, props.valueKey) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
    }
    function getAccordionDefaultValue(list, level = 0, listIndex = 0) {
      const indexes = list.reduce((acc, item, index) => {
        if (item.defaultOpen || item.open) {
          acc.push(getItemValue(item, index, level, listIndex));
        }
        return acc;
      }, []);
      return props.type === "single" ? indexes[0] : indexes;
    }
    function onLinkTrailingClick(e, item) {
      if (!item.children?.length) {
        return;
      }
      if (props.orientation === "horizontal") {
        e.preventDefault();
      } else if (props.orientation === "vertical" && !props.collapsed) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineLinkTemplate), null, {
        default: vueExports.withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, item.slot || "item", {
              item,
              index,
              active,
              ui: ui.value
            }, () => {
              ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index,
                ui: ui.value
              }, () => {
                if (item.avatar) {
                  _push2(ssrRenderComponent_1(_sfc_main$d$1, vueExports.mergeProps({
                    size: item.ui?.linkLeadingAvatarSize || vueExports.unref(uiProp)?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "linkLeadingAvatar",
                    class: ui.value.linkLeadingAvatar({ class: [vueExports.unref(uiProp)?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, _parent2, _scopeId));
                } else if (item.icon && item.chip) {
                  _push2(ssrRenderComponent_1(_sfc_main$e$1, vueExports.mergeProps({
                    size: item.ui?.linkLeadingChipSize || vueExports.unref(uiProp)?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
                    inset: ""
                  }, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
                    default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent_1(_sfc_main$f$1, {
                          name: item.icon,
                          "data-slot": "linkLeadingIcon",
                          class: ui.value.linkLeadingIcon({ class: [vueExports.unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          vueExports.createVNode(_sfc_main$f$1, {
                            name: item.icon,
                            "data-slot": "linkLeadingIcon",
                            class: ui.value.linkLeadingIcon({ class: [vueExports.unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                          }, null, 8, ["name", "class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: item.icon,
                    "data-slot": "linkLeadingIcon",
                    class: ui.value.linkLeadingIcon({ class: [vueExports.unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if (vueExports.unref(get$1)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) {
                _push2(`<span data-slot="linkLabel" class="${ssrRenderClass_1(ui.value.linkLabel({ class: [vueExports.unref(uiProp)?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate_1(vueExports.unref(get$1)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && __props.externalIcon !== false) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "linkLabelExternalIcon",
                    class: ui.value.linkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if (item.badge || item.badge === 0 || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) {
                ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? vueExports.unref(AccordionTrigger_default) : "span"), {
                  as: __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? "span" : void 0,
                  "data-slot": "linkTrailing",
                  class: ui.value.linkTrailing({ class: [vueExports.unref(uiProp)?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: (e) => onLinkTrailingClick(e, item)
                }, {
                  default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                        item,
                        active,
                        index,
                        ui: ui.value
                      }, () => {
                        if (item.badge || item.badge === 0) {
                          _push3(ssrRenderComponent_1(_sfc_main$h, vueExports.mergeProps({
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || vueExports.unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "linkTrailingBadge",
                            class: ui.value.linkTrailingBadge({ class: [vueExports.unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length) {
                          _push3(ssrRenderComponent_1(_sfc_main$f$1, {
                            name: item.trailingIcon || __props.trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else if (item.trailingIcon) {
                          _push3(ssrRenderComponent_1(_sfc_main$f$1, {
                            name: item.trailingIcon,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                          item,
                          active,
                          index,
                          ui: ui.value
                        }, () => [
                          item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$h, vueExports.mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || vueExports.unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            "data-slot": "linkTrailingBadge",
                            class: ui.value.linkTrailingBadge({ class: [vueExports.unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true),
                          __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                            key: 1,
                            name: item.trailingIcon || __props.trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : item.trailingIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                            key: 2,
                            name: item.trailingIcon,
                            "data-slot": "linkTrailingIcon",
                            class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                active,
                ui: ui.value
              }, () => [
                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index,
                  ui: ui.value
                }, () => [
                  item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                    key: 0,
                    size: item.ui?.linkLeadingAvatarSize || vueExports.unref(uiProp)?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "linkLeadingAvatar",
                    class: ui.value.linkLeadingAvatar({ class: [vueExports.unref(uiProp)?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, 16, ["size", "class"])) : item.icon && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e$1, vueExports.mergeProps({
                    key: 1,
                    size: item.ui?.linkLeadingChipSize || vueExports.unref(uiProp)?.linkLeadingChipSize || ui.value.linkLeadingChipSize(),
                    inset: ""
                  }, typeof item.chip === "object" ? item.chip : {}, { "data-slot": "linkLeadingChip" }), {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_sfc_main$f$1, {
                        name: item.icon,
                        "data-slot": "linkLeadingIcon",
                        class: ui.value.linkLeadingIcon({ class: [vueExports.unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1040, ["size"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                    key: 2,
                    name: item.icon,
                    "data-slot": "linkLeadingIcon",
                    class: ui.value.linkLeadingIcon({ class: [vueExports.unref(uiProp)?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ]),
                vueExports.unref(get$1)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                  key: 0,
                  "data-slot": "linkLabel",
                  class: ui.value.linkLabel({ class: [vueExports.unref(uiProp)?.linkLabel, item.ui?.linkLabel] })
                }, [
                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                    item,
                    active,
                    index
                  }, () => [
                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 1)
                  ]),
                  item.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                    key: 0,
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "linkLabelExternalIcon",
                    class: ui.value.linkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                item.badge || item.badge === 0 || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"] ? (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? vueExports.unref(AccordionTrigger_default) : "span"), {
                  key: 1,
                  as: __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? "span" : void 0,
                  "data-slot": "linkTrailing",
                  class: ui.value.linkTrailing({ class: [vueExports.unref(uiProp)?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: (e) => onLinkTrailingClick(e, item)
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                      item,
                      active,
                      index,
                      ui: ui.value
                    }, () => [
                      item.badge || item.badge === 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$h, vueExports.mergeProps({
                        key: 0,
                        color: "neutral",
                        variant: "outline",
                        size: item.ui?.linkTrailingBadgeSize || vueExports.unref(uiProp)?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                      }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                        "data-slot": "linkTrailingBadge",
                        class: ui.value.linkTrailingBadge({ class: [vueExports.unref(uiProp)?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true),
                      __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                        key: 1,
                        name: item.trailingIcon || __props.trailingIcon || vueExports.unref(appConfig).ui.icons.chevronDown,
                        "data-slot": "linkTrailingIcon",
                        class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : item.trailingIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                        key: 2,
                        name: item.trailingIcon,
                        "data-slot": "linkTrailingIcon",
                        class: ui.value.linkTrailingIcon({ class: [vueExports.unref(uiProp)?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["as", "class", "onClick"])) : vueExports.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, index, level = 0, listIndex = 0 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? vueExports.unref(AccordionItem_default) : vueExports.unref(NavigationMenuItem_default)), {
              as: "li",
              value: getItemValue(item, index, level, listIndex)
            }, {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.orientation === "vertical" && item.type === "label" && !__props.collapsed) {
                    _push3(`<div data-slot="label" class="${ssrRenderClass_1(ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (item.type !== "label") {
                    _push3(ssrRenderComponent_1(_sfc_main$b$1, vueExports.mergeProps(__props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                      default: vueExports.withCtx(({ active, ...slotProps }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: vueExports.withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover)) {
                                  _push5(ssrRenderComponent_1(_sfc_main$8, vueExports.mergeProps({ ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] }) }
                                  }), {
                                    content: vueExports.withCtx(({ close }, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                          item,
                                          active: active || item.active,
                                          index,
                                          ui: ui.value,
                                          close
                                        }, () => {
                                          _push6(`<ul data-slot="childList" class="${ssrRenderClass_1(ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] }))}"${_scopeId5}><li data-slot="childLabel" class="${ssrRenderClass_1(ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] }))}"${_scopeId5}>${ssrInterpolate_1(vueExports.unref(get$1)(item, props.labelKey))}</li><!--[-->`);
                                          ssrRenderList_1(item.children, (childItem, childIndex) => {
                                            _push6(`<li data-slot="childItem" class="${ssrRenderClass_1(ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] }))}"${_scopeId5}>`);
                                            _push6(ssrRenderComponent_1(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent_1(vueExports.unref(NavigationMenuLink_default), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: vueExports.withCtx((_3, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                          "data-slot": "childLink",
                                                          class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: vueExports.withCtx((_4, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              if (childItem.icon) {
                                                                _push9(ssrRenderComponent_1(_sfc_main$f$1, {
                                                                  name: childItem.icon,
                                                                  "data-slot": "childLinkIcon",
                                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`<span data-slot="childLinkLabel" class="${ssrRenderClass_1(ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId8}>${ssrInterpolate_1(vueExports.unref(get$1)(childItem, props.labelKey))} `);
                                                              if (childItem.target === "_blank" && __props.externalIcon !== false) {
                                                                _push9(ssrRenderComponent_1(_sfc_main$f$1, {
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`</span>`);
                                                            } else {
                                                              return [
                                                                childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                  key: 0,
                                                                  name: childItem.icon,
                                                                  "data-slot": "childLinkIcon",
                                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                                vueExports.createVNode("span", {
                                                                  "data-slot": "childLinkLabel",
                                                                  class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                                }, [
                                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                                  childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                    key: 0,
                                                                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                    "data-slot": "childLinkLabelExternalIcon",
                                                                    class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                                ], 2)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                            "data-slot": "childLink",
                                                            class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: vueExports.withCtx(() => [
                                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                "data-slot": "childLinkIcon",
                                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                              vueExports.createVNode("span", {
                                                                "data-slot": "childLinkLabel",
                                                                class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                  key: 0,
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                      "as-child": "",
                                                      active: childActive,
                                                      onSelect: childItem.onSelect
                                                    }, {
                                                      default: vueExports.withCtx(() => [
                                                        vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                          "data-slot": "childLink",
                                                          class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: vueExports.withCtx(() => [
                                                            childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                              key: 0,
                                                              name: childItem.icon,
                                                              "data-slot": "childLinkIcon",
                                                              class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                            vueExports.createVNode("span", {
                                                              "data-slot": "childLinkLabel",
                                                              class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                key: 0,
                                                                name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                "data-slot": "childLinkLabelExternalIcon",
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                            ], 2)
                                                          ]),
                                                          _: 2
                                                        }, 1040, ["class"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["active", "onSelect"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</li>`);
                                          });
                                          _push6(`<!--]--></ul>`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                            item,
                                            active: active || item.active,
                                            index,
                                            ui: ui.value,
                                            close
                                          }, () => [
                                            vueExports.createVNode("ul", {
                                              "data-slot": "childList",
                                              class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                            }, [
                                              vueExports.createVNode("li", {
                                                "data-slot": "childLabel",
                                                class: ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] })
                                              }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3),
                                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                                return vueExports.openBlock(), vueExports.createBlock("li", {
                                                  key: childIndex,
                                                  "data-slot": "childItem",
                                                  class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                                }, [
                                                  vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                                    default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                      vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                        "as-child": "",
                                                        active: childActive,
                                                        onSelect: childItem.onSelect
                                                      }, {
                                                        default: vueExports.withCtx(() => [
                                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                            "data-slot": "childLink",
                                                            class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: vueExports.withCtx(() => [
                                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                "data-slot": "childLinkIcon",
                                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                              vueExports.createVNode("span", {
                                                                "data-slot": "childLinkLabel",
                                                                class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                  key: 0,
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                  "data-slot": "childLinkLabelExternalIcon",
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["active", "onSelect"])
                                                    ]),
                                                    _: 2
                                                  }, 1040)
                                                ], 2);
                                              }), 128))
                                            ], 2)
                                          ])
                                        ];
                                      }
                                    }),
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                          "data-slot": "link",
                                          class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: vueExports.withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                            "data-slot": "link",
                                            class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else if (__props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip) {
                                  _push5(ssrRenderComponent_1(_sfc_main$g, vueExports.mergeProps({
                                    text: vueExports.unref(get$1)(item, props.labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                          "data-slot": "link",
                                          class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: vueExports.withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                            "data-slot": "link",
                                            class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                    "data-slot": "link",
                                    class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] }) }
                                  }), {
                                    content: vueExports.withCtx(({ close }) => [
                                      vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                        item,
                                        active: active || item.active,
                                        index,
                                        ui: ui.value,
                                        close
                                      }, () => [
                                        vueExports.createVNode("ul", {
                                          "data-slot": "childList",
                                          class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                        }, [
                                          vueExports.createVNode("li", {
                                            "data-slot": "childLabel",
                                            class: ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] })
                                          }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3),
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                            return vueExports.openBlock(), vueExports.createBlock("li", {
                                              key: childIndex,
                                              "data-slot": "childItem",
                                              class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                            }, [
                                              vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                                default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                  vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: vueExports.withCtx(() => [
                                                      vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                        "data-slot": "childLink",
                                                        class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                      }), {
                                                        default: vueExports.withCtx(() => [
                                                          childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                          vueExports.createVNode("span", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2)
                                                        ]),
                                                        _: 2
                                                      }, 1040, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["active", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040)
                                            ], 2);
                                          }), 128))
                                        ], 2)
                                      ])
                                    ]),
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                        "data-slot": "link",
                                        class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$g, vueExports.mergeProps({
                                    key: 1,
                                    text: vueExports.unref(get$1)(item, props.labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                        "data-slot": "link",
                                        class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                                    "data-slot": "link",
                                    class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, 8, ["item", "active", "index"])
                                    ]),
                                    _: 2
                                  }, 1040, ["class"]))
                                ];
                              }
                            }),
                            _: 2
                          }), _parent4, _scopeId3);
                          if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) {
                            _push4(ssrRenderComponent_1(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps(contentProps.value, {
                              "data-slot": "content",
                              class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                            }), {
                              default: vueExports.withCtx((_2, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                    item,
                                    active: active || item.active,
                                    index,
                                    ui: ui.value
                                  }, () => {
                                    _push5(`<ul data-slot="childList" class="${ssrRenderClass_1(ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] }))}"${_scopeId4}><!--[-->`);
                                    ssrRenderList_1(item.children, (childItem, childIndex) => {
                                      _push5(`<li data-slot="childItem" class="${ssrRenderClass_1(ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] }))}"${_scopeId4}>`);
                                      _push5(ssrRenderComponent_1(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: vueExports.withCtx(({ active: childActive, ...childSlotProps }, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent_1(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx((_3, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                    "data-slot": "childLink",
                                                    class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: vueExports.withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        if (childItem.icon) {
                                                          _push8(ssrRenderComponent_1(_sfc_main$f$1, {
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`<div data-slot="childLinkWrapper" class="${ssrRenderClass_1(ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] }))}"${_scopeId7}><p data-slot="childLinkLabel" class="${ssrRenderClass_1(ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId7}>${ssrInterpolate_1(vueExports.unref(get$1)(childItem, props.labelKey))} `);
                                                        if (childItem.target === "_blank" && __props.externalIcon !== false) {
                                                          _push8(ssrRenderComponent_1(_sfc_main$f$1, {
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</p>`);
                                                        if (childItem.description) {
                                                          _push8(`<p data-slot="childLinkDescription" class="${ssrRenderClass_1(ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive }))}"${_scopeId7}>${ssrInterpolate_1(childItem.description)}</p>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</div>`);
                                                      } else {
                                                        return [
                                                          childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            "data-slot": "childLinkIcon",
                                                            class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                          vueExports.createVNode("div", {
                                                            "data-slot": "childLinkWrapper",
                                                            class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                          }, [
                                                            vueExports.createVNode("p", {
                                                              "data-slot": "childLinkLabel",
                                                              class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                                key: 0,
                                                                name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                                "data-slot": "childLinkLabelExternalIcon",
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                              key: 0,
                                                              "data-slot": "childLinkDescription",
                                                              class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                            }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("div", {
                                                          "data-slot": "childLinkWrapper",
                                                          class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          vueExports.createVNode("p", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                            key: 0,
                                                            "data-slot": "childLinkDescription",
                                                            class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                "as-child": "",
                                                active: childActive,
                                                onSelect: childItem.onSelect
                                              }, {
                                                default: vueExports.withCtx(() => [
                                                  vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                    "data-slot": "childLink",
                                                    class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: vueExports.withCtx(() => [
                                                      childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                        key: 0,
                                                        name: childItem.icon,
                                                        "data-slot": "childLinkIcon",
                                                        class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                      vueExports.createVNode("div", {
                                                        "data-slot": "childLinkWrapper",
                                                        class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                      }, [
                                                        vueExports.createVNode("p", {
                                                          "data-slot": "childLinkLabel",
                                                          class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                            key: 0,
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                        ], 2),
                                                        childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                          key: 0,
                                                          "data-slot": "childLinkDescription",
                                                          class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                        }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                      ], 2)
                                                    ]),
                                                    _: 2
                                                  }, 1040, ["class"])
                                                ]),
                                                _: 2
                                              }, 1032, ["active", "onSelect"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</li>`);
                                    });
                                    _push5(`<!--]--></ul>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index,
                                      ui: ui.value
                                    }, () => [
                                      vueExports.createVNode("ul", {
                                        "data-slot": "childList",
                                        class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                      }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                          return vueExports.openBlock(), vueExports.createBlock("li", {
                                            key: childIndex,
                                            "data-slot": "childItem",
                                            class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                          }, [
                                            vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("div", {
                                                          "data-slot": "childLinkWrapper",
                                                          class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          vueExports.createVNode("p", {
                                                            "data-slot": "childLinkLabel",
                                                            class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                              "data-slot": "childLinkLabelExternalIcon",
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                            key: 0,
                                                            "data-slot": "childLinkDescription",
                                                            class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                              "as-child": "",
                              active: active || item.active,
                              disabled: item.disabled,
                              onSelect: item.onSelect
                            }, {
                              default: vueExports.withCtx(() => [
                                __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                  ui: { content: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] }) }
                                }), {
                                  content: vueExports.withCtx(({ close }) => [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index,
                                      ui: ui.value,
                                      close
                                    }, () => [
                                      vueExports.createVNode("ul", {
                                        "data-slot": "childList",
                                        class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                      }, [
                                        vueExports.createVNode("li", {
                                          "data-slot": "childLabel",
                                          class: ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] })
                                        }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3),
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                          return vueExports.openBlock(), vueExports.createBlock("li", {
                                            key: childIndex,
                                            "data-slot": "childItem",
                                            class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                          }, [
                                            vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                                vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: vueExports.withCtx(() => [
                                                    vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                      "data-slot": "childLink",
                                                      class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: vueExports.withCtx(() => [
                                                        childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          "data-slot": "childLinkIcon",
                                                          class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                        vueExports.createVNode("span", {
                                                          "data-slot": "childLinkLabel",
                                                          class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                            key: 0,
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                            "data-slot": "childLinkLabelExternalIcon",
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ]),
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                      "data-slot": "link",
                                      class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$g, vueExports.mergeProps({
                                  key: 1,
                                  text: vueExports.unref(get$1)(item, props.labelKey)
                                }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                      "data-slot": "link",
                                      class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"]))
                              ]),
                              _: 2
                            }, 1064, ["active", "disabled", "onSelect"])),
                            __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                              "data-slot": "content",
                              class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                            }), {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  vueExports.createVNode("ul", {
                                    "data-slot": "childList",
                                    class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                  }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock("li", {
                                        key: childIndex,
                                        "data-slot": "childItem",
                                        class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                      }, [
                                        vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                            vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                  "data-slot": "childLink",
                                                  class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: vueExports.withCtx(() => [
                                                    childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      "data-slot": "childLinkIcon",
                                                      class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                    vueExports.createVNode("div", {
                                                      "data-slot": "childLinkWrapper",
                                                      class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                    }, [
                                                      vueExports.createVNode("p", {
                                                        "data-slot": "childLinkLabel",
                                                        class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                      }, [
                                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                        childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                          key: 0,
                                                          name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                          "data-slot": "childLinkLabelExternalIcon",
                                                          class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                      ], 2),
                                                      childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                        key: 0,
                                                        "data-slot": "childLinkDescription",
                                                        class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                      }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              _: 2
                            }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.orientation === "vertical" && item.children?.length && !__props.collapsed) {
                    _push3(ssrRenderComponent_1(vueExports.unref(AccordionContent_default), {
                      "data-slot": "content",
                      class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                    }, {
                      default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent_1(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                            ...vueExports.unref(accordionProps),
                            defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                          }, {
                            as: "ul",
                            "data-slot": "childList",
                            class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                          }), {
                            default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList_1(item.children, (childItem, childIndex) => {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    "list-index": listIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, childItem.ui?.childItem] })
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                      key: childIndex,
                                      item: childItem,
                                      index: childIndex,
                                      level: level + 1,
                                      "list-index": listIndex,
                                      "data-slot": "childItem",
                                      class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, childItem.ui?.childItem] })
                                    }, null, 8, ["item", "index", "level", "list-index", "class"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                              ...vueExports.unref(accordionProps),
                              defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                            }, {
                              as: "ul",
                              "data-slot": "childList",
                              class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                            }), {
                              default: vueExports.withCtx(() => [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    "list-index": listIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, childItem.ui?.childItem] })
                                  }, null, 8, ["item", "index", "level", "list-index", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1040, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      "data-slot": "label",
                      class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                    }, [
                      vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                        item,
                        index
                      }, null, 8, ["item", "index"])
                    ], 2)) : item.type !== "label" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b$1, vueExports.mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                      default: vueExports.withCtx(({ active, ...slotProps }) => [
                        (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                          "as-child": "",
                          active: active || item.active,
                          disabled: item.disabled,
                          onSelect: item.onSelect
                        }, {
                          default: vueExports.withCtx(() => [
                            __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                              ui: { content: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] }) }
                            }), {
                              content: vueExports.withCtx(({ close }) => [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index,
                                  ui: ui.value,
                                  close
                                }, () => [
                                  vueExports.createVNode("ul", {
                                    "data-slot": "childList",
                                    class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                  }, [
                                    vueExports.createVNode("li", {
                                      "data-slot": "childLabel",
                                      class: ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] })
                                    }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3),
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock("li", {
                                        key: childIndex,
                                        "data-slot": "childItem",
                                        class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                      }, [
                                        vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                            vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                  "data-slot": "childLink",
                                                  class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: vueExports.withCtx(() => [
                                                    childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      "data-slot": "childLinkIcon",
                                                      class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                    vueExports.createVNode("span", {
                                                      "data-slot": "childLinkLabel",
                                                      class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                    }, [
                                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                      childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                        key: 0,
                                                        name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                        "data-slot": "childLinkLabelExternalIcon",
                                                        class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$g, vueExports.mergeProps({
                              key: 1,
                              text: vueExports.unref(get$1)(item, props.labelKey)
                            }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                  "data-slot": "link",
                                  class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                              "data-slot": "link",
                              class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                            }), {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                  item,
                                  active: active || item.active,
                                  index
                                }, null, 8, ["item", "active", "index"])
                              ]),
                              _: 2
                            }, 1040, ["class"]))
                          ]),
                          _: 2
                        }, 1064, ["active", "disabled", "onSelect"])),
                        __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                          "data-slot": "content",
                          class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                        }), {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                              item,
                              active: active || item.active,
                              index,
                              ui: ui.value
                            }, () => [
                              vueExports.createVNode("ul", {
                                "data-slot": "childList",
                                class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                              }, [
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock("li", {
                                    key: childIndex,
                                    "data-slot": "childItem",
                                    class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                  }, [
                                    vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                      default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                        vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                          "as-child": "",
                                          active: childActive,
                                          onSelect: childItem.onSelect
                                        }, {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                              "data-slot": "childLink",
                                              class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                            }), {
                                              default: vueExports.withCtx(() => [
                                                childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                  key: 0,
                                                  name: childItem.icon,
                                                  "data-slot": "childLinkIcon",
                                                  class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                vueExports.createVNode("div", {
                                                  "data-slot": "childLinkWrapper",
                                                  class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                }, [
                                                  vueExports.createVNode("p", {
                                                    "data-slot": "childLinkLabel",
                                                    class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                      key: 0,
                                                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                      "data-slot": "childLinkLabelExternalIcon",
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                  ], 2),
                                                  childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                    key: 0,
                                                    "data-slot": "childLinkDescription",
                                                    class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                  }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                                ], 2)
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["active", "onSelect"])
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ], 2);
                                }), 128))
                              ], 2)
                            ])
                          ]),
                          _: 2
                        }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040)) : vueExports.createCommentVNode("", true),
                    __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                      key: 2,
                      "data-slot": "content",
                      class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                          ...vueExports.unref(accordionProps),
                          defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                        }, {
                          as: "ul",
                          "data-slot": "childList",
                          class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                        }), {
                          default: vueExports.withCtx(() => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                key: childIndex,
                                item: childItem,
                                index: childIndex,
                                level: level + 1,
                                "list-index": listIndex,
                                "data-slot": "childItem",
                                class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, childItem.ui?.childItem] })
                              }, null, 8, ["item", "index", "level", "list-index", "class"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1040, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }), _parent2, _scopeId);
          } else {
            return [
              (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? vueExports.unref(AccordionItem_default) : vueExports.unref(NavigationMenuItem_default)), {
                as: "li",
                value: getItemValue(item, index, level, listIndex)
              }, {
                default: vueExports.withCtx(() => [
                  __props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "label",
                    class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
                  }, [
                    vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, 8, ["item", "index"])
                  ], 2)) : item.type !== "label" ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b$1, vueExports.mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                    default: vueExports.withCtx(({ active, ...slotProps }) => [
                      (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? vueExports.unref(NavigationMenuTrigger_default) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? vueExports.unref(AccordionTrigger_default) : vueExports.unref(NavigationMenuLink_default)), {
                        "as-child": "",
                        active: active || item.active,
                        disabled: item.disabled,
                        onSelect: item.onSelect
                      }, {
                        default: vueExports.withCtx(() => [
                          __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$8, vueExports.mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                            ui: { content: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] }) }
                          }), {
                            content: vueExports.withCtx(({ close }) => [
                              vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                item,
                                active: active || item.active,
                                index,
                                ui: ui.value,
                                close
                              }, () => [
                                vueExports.createVNode("ul", {
                                  "data-slot": "childList",
                                  class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                                }, [
                                  vueExports.createVNode("li", {
                                    "data-slot": "childLabel",
                                    class: ui.value.childLabel({ class: [vueExports.unref(uiProp)?.childLabel, item.ui?.childLabel] })
                                  }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3),
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock("li", {
                                      key: childIndex,
                                      "data-slot": "childItem",
                                      class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                    }, [
                                      vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                          vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                            "as-child": "",
                                            active: childActive,
                                            onSelect: childItem.onSelect
                                          }, {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                                "data-slot": "childLink",
                                                class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                              }), {
                                                default: vueExports.withCtx(() => [
                                                  childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                    key: 0,
                                                    name: childItem.icon,
                                                    "data-slot": "childLinkIcon",
                                                    class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                                  vueExports.createVNode("span", {
                                                    "data-slot": "childLinkLabel",
                                                    class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                      key: 0,
                                                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                      "data-slot": "childLinkLabelExternalIcon",
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                  ], 2)
                                                ]),
                                                _: 2
                                              }, 1040, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["active", "onSelect"])
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ], 2);
                                  }), 128))
                                ], 2)
                              ])
                            ]),
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                "data-slot": "link",
                                class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) || __props.orientation === "horizontal" && !!item.tooltip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$g, vueExports.mergeProps({
                            key: 1,
                            text: vueExports.unref(get$1)(item, props.labelKey)
                          }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                                "data-slot": "link",
                                class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["text"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$c$1, vueExports.mergeProps({ key: 2 }, slotProps, {
                            "data-slot": "link",
                            class: ui.value.link({ class: [vueExports.unref(uiProp)?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                          }), {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(vueExports.unref(ReuseLinkTemplate), {
                                item,
                                active: active || item.active,
                                index
                              }, null, 8, ["item", "active", "index"])
                            ]),
                            _: 2
                          }, 1040, ["class"]))
                        ]),
                        _: 2
                      }, 1064, ["active", "disabled", "onSelect"])),
                      __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuContent_default), vueExports.mergeProps({ key: 0 }, contentProps.value, {
                        "data-slot": "content",
                        class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                      }), {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                            item,
                            active: active || item.active,
                            index,
                            ui: ui.value
                          }, () => [
                            vueExports.createVNode("ul", {
                              "data-slot": "childList",
                              class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                                return vueExports.openBlock(), vueExports.createBlock("li", {
                                  key: childIndex,
                                  "data-slot": "childItem",
                                  class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, item.ui?.childItem] })
                                }, [
                                  vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(childItem), { custom: "" }), {
                                    default: vueExports.withCtx(({ active: childActive, ...childSlotProps }) => [
                                      vueExports.createVNode(vueExports.unref(NavigationMenuLink_default), {
                                        "as-child": "",
                                        active: childActive,
                                        onSelect: childItem.onSelect
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, childSlotProps, {
                                            "data-slot": "childLink",
                                            class: ui.value.childLink({ class: [vueExports.unref(uiProp)?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              childItem.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                key: 0,
                                                name: childItem.icon,
                                                "data-slot": "childLinkIcon",
                                                class: ui.value.childLinkIcon({ class: [vueExports.unref(uiProp)?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true),
                                              vueExports.createVNode("div", {
                                                "data-slot": "childLinkWrapper",
                                                class: ui.value.childLinkWrapper({ class: [vueExports.unref(uiProp)?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                              }, [
                                                vueExports.createVNode("p", {
                                                  "data-slot": "childLinkLabel",
                                                  class: ui.value.childLinkLabel({ class: [vueExports.unref(uiProp)?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                }, [
                                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(childItem, props.labelKey)) + " ", 1),
                                                  childItem.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                                    key: 0,
                                                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                                                    "data-slot": "childLinkLabelExternalIcon",
                                                    class: ui.value.childLinkLabelExternalIcon({ class: [vueExports.unref(uiProp)?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                                ], 2),
                                                childItem.description ? (vueExports.openBlock(), vueExports.createBlock("p", {
                                                  key: 0,
                                                  "data-slot": "childLinkDescription",
                                                  class: ui.value.childLinkDescription({ class: [vueExports.unref(uiProp)?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                }, vueExports.toDisplayString(childItem.description), 3)) : vueExports.createCommentVNode("", true)
                                              ], 2)
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["active", "onSelect"])
                                    ]),
                                    _: 2
                                  }, 1040)
                                ], 2);
                              }), 128))
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1040, ["class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)) : vueExports.createCommentVNode("", true),
                  __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(AccordionContent_default), {
                    key: 2,
                    "data-slot": "content",
                    class: ui.value.content({ class: [vueExports.unref(uiProp)?.content, item.ui?.content] })
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(AccordionRoot_default), vueExports.mergeProps({
                        ...vueExports.unref(accordionProps),
                        defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
                      }, {
                        as: "ul",
                        "data-slot": "childList",
                        class: ui.value.childList({ class: [vueExports.unref(uiProp)?.childList, item.ui?.childList] })
                      }), {
                        default: vueExports.withCtx(() => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.children, (childItem, childIndex) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                              key: childIndex,
                              item: childItem,
                              index: childIndex,
                              level: level + 1,
                              "list-index": listIndex,
                              "data-slot": "childItem",
                              class: ui.value.childItem({ class: [vueExports.unref(uiProp)?.childItem, childItem.ui?.childItem] })
                            }, null, 8, ["item", "index", "level", "list-index", "class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1040, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"])) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["value"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(NavigationMenuRoot_default), vueExports.mergeProps({
        ...vueExports.unref(rootProps),
        ...__props.orientation === "horizontal" ? {
          modelValue: __props.modelValue,
          defaultValue: __props.defaultValue
        } : {},
        ..._ctx.$attrs
      }, {
        "data-collapsed": __props.collapsed,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "list-leading", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList_1(lists.value, (list, listIndex) => {
              _push2(`<!--[-->`);
              ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.orientation === "vertical" ? vueExports.unref(AccordionRoot_default) : vueExports.unref(NavigationMenuList_default)), vueExports.mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
                ...vueExports.unref(accordionProps),
                modelValue: __props.modelValue,
                defaultValue: __props.defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
              } : {}, {
                as: "ul",
                "data-slot": "list",
                class: ui.value.list({ class: vueExports.unref(uiProp)?.list })
              }), {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList_1(list, (item, index) => {
                      _push3(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                        key: `list-${listIndex}-${index}`,
                        item,
                        index,
                        "list-index": listIndex,
                        "data-slot": "item",
                        class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item] })
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(list, (item, index) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          "list-index": listIndex,
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "list-index", "class"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              if (__props.orientation === "vertical" && listIndex < lists.value.length - 1) {
                _push2(`<div data-slot="separator" class="${ssrRenderClass_1(ui.value.separator({ class: vueExports.unref(uiProp)?.separator }))}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            ssrRenderSlot_1(_ctx.$slots, "list-trailing", {}, null, _push2, _parent2, _scopeId);
            if (__props.orientation === "horizontal") {
              _push2(`<div data-slot="viewportWrapper" class="${ssrRenderClass_1(ui.value.viewportWrapper({ class: vueExports.unref(uiProp)?.viewportWrapper }))}"${_scopeId}>`);
              if (__props.arrow) {
                _push2(ssrRenderComponent_1(vueExports.unref(NavigationMenuIndicator_default), {
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: vueExports.unref(uiProp)?.indicator })
                }, {
                  default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div data-slot="arrow" class="${ssrRenderClass_1(ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow }))}"${_scopeId2}></div>`);
                    } else {
                      return [
                        vueExports.createVNode("div", {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent_1(vueExports.unref(NavigationMenuViewport_default), {
                "data-slot": "viewport",
                class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "list-leading"),
              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(lists.value, (list, listIndex) => {
                return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                  key: `list-${listIndex}`
                }, [
                  (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.orientation === "vertical" ? vueExports.unref(AccordionRoot_default) : vueExports.unref(NavigationMenuList_default)), vueExports.mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
                    ...vueExports.unref(accordionProps),
                    modelValue: __props.modelValue,
                    defaultValue: __props.defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
                  } : {}, {
                    as: "ul",
                    "data-slot": "list",
                    class: ui.value.list({ class: vueExports.unref(uiProp)?.list })
                  }), {
                    default: vueExports.withCtx(() => [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(list, (item, index) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          "list-index": listIndex,
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "list-index", "class"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1040, ["class"])),
                  __props.orientation === "vertical" && listIndex < lists.value.length - 1 ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    "data-slot": "separator",
                    class: ui.value.separator({ class: vueExports.unref(uiProp)?.separator })
                  }, null, 2)) : vueExports.createCommentVNode("", true)
                ], 64);
              }), 128)),
              vueExports.renderSlot(_ctx.$slots, "list-trailing"),
              __props.orientation === "horizontal" ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 0,
                "data-slot": "viewportWrapper",
                class: ui.value.viewportWrapper({ class: vueExports.unref(uiProp)?.viewportWrapper })
              }, [
                __props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(NavigationMenuIndicator_default), {
                  key: 0,
                  "data-slot": "indicator",
                  class: ui.value.indicator({ class: vueExports.unref(uiProp)?.indicator })
                }, {
                  default: vueExports.withCtx(() => [
                    vueExports.createVNode("div", {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                    }, null, 2)
                  ]),
                  _: 1
                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                vueExports.createVNode(vueExports.unref(NavigationMenuViewport_default), {
                  "data-slot": "viewport",
                  class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                }, null, 8, ["class"])
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {
  __name: "UDropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    items: { type: null, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true },
    sub: { type: Boolean, required: false },
    labelKey: { type: null, required: true },
    descriptionKey: { type: null, required: true },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
    class: { type: null, required: false },
    ui: { type: null, required: true },
    uiOverride: { type: null, required: false },
    loop: { type: Boolean, required: false },
    side: { type: null, required: false },
    sideOffset: { type: Number, required: false },
    sideFlip: { type: Boolean, required: false },
    align: { type: null, required: false },
    alignOffset: { type: Number, required: false },
    alignFlip: { type: Boolean, required: false },
    avoidCollisions: { type: Boolean, required: false },
    collisionBoundary: { type: null, required: false },
    collisionPadding: { type: [Number, Object], required: false },
    arrowPadding: { type: Number, required: false },
    hideShiftedArrow: { type: Boolean, required: false },
    sticky: { type: String, required: false },
    hideWhenDetached: { type: Boolean, required: false },
    positionStrategy: { type: String, required: false },
    updatePositionStrategy: { type: String, required: false },
    disableUpdateOnLayoutShift: { type: Boolean, required: false },
    prioritizePosition: { type: Boolean, required: false },
    reference: { type: null, required: false }
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = useForwardPropsEmits(reactiveOmit$2(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
    const getProxySlots = () => omit(slots, ["default"]);
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
    const childrenIcon = vueExports.computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, item.slot || "item", {
              item,
              index,
              ui: __props.ui
            }, () => {
              ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.loading) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.avatar) {
                  _push2(ssrRenderComponent_1(_sfc_main$d$1, vueExports.mergeProps({
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if (vueExports.unref(get$1)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"])) {
                _push2(`<span data-slot="itemWrapper" class="${ssrRenderClass_1(__props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId}><span data-slot="itemLabel" class="${ssrRenderClass_1(__props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active }))}"${_scopeId}>`);
                ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate_1(vueExports.unref(get$1)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && __props.externalIcon !== false) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                    "data-slot": "itemLabelExternalIcon",
                    class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
                if (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) {
                  _push2(`<span data-slot="itemDescription" class="${ssrRenderClass_1(__props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId}>`);
                  ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                    item,
                    active,
                    index
                  }, () => {
                    _push2(`${ssrInterpolate_1(vueExports.unref(get$1)(item, props.descriptionKey))}`);
                  }, _push2, _parent2, _scopeId);
                  _push2(`</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span data-slot="itemTrailing" class="${ssrRenderClass_1(__props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                item,
                active,
                index,
                ui: __props.ui
              }, () => {
                if (item.children?.length) {
                  _push2(ssrRenderComponent_1(_sfc_main$f$1, {
                    name: childrenIcon.value,
                    "data-slot": "itemTrailingIcon",
                    class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                  }, null, _parent2, _scopeId));
                } else if (item.kbds?.length) {
                  _push2(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass_1(__props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId}><!--[-->`);
                  ssrRenderList_1(item.kbds, (kbd, kbdIndex) => {
                    _push2(ssrRenderComponent_1(_sfc_main$1$2, vueExports.mergeProps({
                      key: kbdIndex,
                      size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                    }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></span>`);
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              _push2(ssrRenderComponent_1(vueExports.unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_sfc_main$f$1, {
                      name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_sfc_main$f$1, {
                        name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</span>`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                ui: __props.ui
              }, () => [
                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index,
                  ui: __props.ui
                }, () => [
                  item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                    key: 0,
                    name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })
                  }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                    key: 1,
                    name: item.icon,
                    "data-slot": "itemLeadingIcon",
                    class: __props.ui.itemLeadingIcon({ class: [__props.uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })
                  }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                    key: 2,
                    size: item.ui?.itemLeadingAvatarSize || __props.uiOverride?.itemLeadingAvatarSize || __props.ui.itemLeadingAvatarSize()
                  }, item.avatar, {
                    "data-slot": "itemLeadingAvatar",
                    class: __props.ui.itemLeadingAvatar({ class: [__props.uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })
                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                ]),
                vueExports.unref(get$1)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                  key: 0,
                  "data-slot": "itemWrapper",
                  class: __props.ui.itemWrapper({ class: [__props.uiOverride?.itemWrapper, item.ui?.itemWrapper] })
                }, [
                  vueExports.createVNode("span", {
                    "data-slot": "itemLabel",
                    class: __props.ui.itemLabel({ class: [__props.uiOverride?.itemLabel, item.ui?.itemLabel], active })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                      item,
                      active,
                      index
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 1)
                    ]),
                    item.target === "_blank" && __props.externalIcon !== false ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                      key: 0,
                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : vueExports.unref(appConfig).ui.icons.external,
                      "data-slot": "itemLabelExternalIcon",
                      class: __props.ui.itemLabelExternalIcon({ class: [__props.uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                  ], 2),
                  vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : "item-description"] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                    key: 0,
                    "data-slot": "itemDescription",
                    class: __props.ui.itemDescription({ class: [__props.uiOverride?.itemDescription, item.ui?.itemDescription] })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : "item-description", {
                      item,
                      active,
                      index
                    }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.descriptionKey)), 1)
                    ])
                  ], 2)) : vueExports.createCommentVNode("", true)
                ], 2)) : vueExports.createCommentVNode("", true),
                vueExports.createVNode("span", {
                  "data-slot": "itemTrailing",
                  class: __props.ui.itemTrailing({ class: [__props.uiOverride?.itemTrailing, item.ui?.itemTrailing] })
                }, [
                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                    item,
                    active,
                    index,
                    ui: __props.ui
                  }, () => [
                    item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                      key: 0,
                      name: childrenIcon.value,
                      "data-slot": "itemTrailingIcon",
                      class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })
                    }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                      key: 1,
                      "data-slot": "itemTrailingKbds",
                      class: __props.ui.itemTrailingKbds({ class: [__props.uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                        return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                          key: kbdIndex,
                          size: item.ui?.itemTrailingKbdsSize || __props.uiOverride?.itemTrailingKbdsSize || __props.ui.itemTrailingKbdsSize()
                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                      }), 128))
                    ], 2)) : vueExports.createCommentVNode("", true)
                  ]),
                  vueExports.createVNode(vueExports.unref(DropdownMenu).ItemIndicator, { "as-child": "" }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_sfc_main$f$1, {
                        name: __props.checkedIcon || vueExports.unref(appConfig).ui.icons.check,
                        "data-slot": "itemTrailingIcon",
                        class: __props.ui.itemTrailingIcon({ class: [__props.uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })
                      }, null, 8, ["name", "class"])
                    ]),
                    _: 2
                  }, 1024)
                ], 2)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Portal, vueExports.unref(portalProps), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, vueExports.createVNode(vueExports.resolveDynamicComponent(__props.sub ? vueExports.unref(DropdownMenu).SubContent : vueExports.unref(DropdownMenu).Content), vueExports.mergeProps({
              "data-slot": "content",
              class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
            }, vueExports.unref(contentProps)), {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot_1(_ctx.$slots, "content-top", {
                    sub: __props.sub ?? false
                  }, null, _push3, _parent3, _scopeId2);
                  _push3(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass_1(__props.ui.viewport({ class: __props.uiOverride?.viewport }))}"${_scopeId2}><!--[-->`);
                  ssrRenderList_1(groups.value, (group, groupIndex) => {
                    _push3(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Group, {
                      key: `group-${groupIndex}`,
                      "data-slot": "group",
                      class: __props.ui.group({ class: __props.uiOverride?.group })
                    }, {
                      default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList_1(group, (item, index) => {
                            _push4(`<!--[-->`);
                            if (item.type === "label") {
                              _push4(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Label, {
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else if (item.type === "separator") {
                              _push4(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Separator, {
                                "data-slot": "separator",
                                class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                              }, null, _parent4, _scopeId3));
                            } else if (item?.children?.length) {
                              _push4(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Sub, {
                                open: item.open,
                                "default-open": item.defaultOpen
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent_1(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            index
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              index
                                            }, null, 8, ["item", "index"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                    _push5(ssrRenderComponent_1(_sfc_main$6, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_5, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData, _push6, _parent6, _scopeId5) => {
                                            if (_push6) {
                                              ssrRenderSlot_1(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData), null, _push6, _parent6, _scopeId5);
                                            } else {
                                              return [
                                                vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                              ];
                                            }
                                          })
                                        };
                                      })
                                    ]), _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                        as: "button",
                                        type: "button",
                                        disabled: item.disabled,
                                        "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            index
                                          }, null, 8, ["item", "index"])
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "text-value", "class"]),
                                      vueExports.createVNode(_sfc_main$6, vueExports.mergeProps({
                                        sub: "",
                                        class: item.ui?.content,
                                        ui: __props.ui,
                                        "ui-override": __props.uiOverride,
                                        portal: __props.portal,
                                        items: item.children,
                                        align: "start",
                                        "align-offset": -4,
                                        "side-offset": 3,
                                        "label-key": __props.labelKey,
                                        "description-key": __props.descriptionKey,
                                        "checked-icon": __props.checkedIcon,
                                        "loading-icon": __props.loadingIcon,
                                        "external-icon": __props.externalIcon
                                      }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                        vueExports.renderList(getProxySlots(), (_5, name) => {
                                          return {
                                            name,
                                            fn: vueExports.withCtx((slotData) => [
                                              vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                            ])
                                          };
                                        })
                                      ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else if (item.type === "checkbox") {
                              _push4(ssrRenderComponent_1(vueExports.unref(DropdownMenu).CheckboxItem, {
                                "model-value": item.checked,
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                "data-slot": "item",
                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                "onUpdate:modelValue": item.onUpdateChecked,
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(ssrRenderComponent_1(_sfc_main$b$1, vueExports.mergeProps({ ref_for: true }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                default: vueExports.withCtx(({ active, ...slotProps }, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent_1(vueExports.unref(DropdownMenu).Item, {
                                      "as-child": "",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      onSelect: item.onSelect
                                    }, {
                                      default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                          }), {
                                            default: vueExports.withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                                  item,
                                                  active,
                                                  index
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                    item,
                                                    active,
                                                    index
                                                  }, null, 8, ["item", "active", "index"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                              "data-slot": "item",
                                              class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                            }), {
                                              default: vueExports.withCtx(() => [
                                                vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                  item,
                                                  active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(vueExports.unref(DropdownMenu).Item, {
                                        "as-child": "",
                                        disabled: item.disabled,
                                        "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                        onSelect: item.onSelect
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                            "data-slot": "item",
                                            class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                          }), {
                                            default: vueExports.withCtx(() => [
                                              vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                                item,
                                                active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "text-value", "onSelect"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                  key: 2,
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "class"]),
                                    vueExports.createVNode(_sfc_main$6, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_4, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData) => [
                                            vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                          ])
                                        };
                                      })
                                    ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                  ]),
                                  _: 2
                                }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                  key: 3,
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b$1, vueExports.mergeProps({
                                  key: 4,
                                  ref_for: true
                                }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                  default: vueExports.withCtx(({ active, ...slotProps }) => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).Item, {
                                      "as-child": "",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      onSelect: item.onSelect
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              active,
                                              index
                                            }, null, 8, ["item", "active", "index"])
                                          ]),
                                          _: 2
                                        }, 1040, ["class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "onSelect"])
                                  ]),
                                  _: 2
                                }, 1040))
                              ], 64);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                  ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  ssrRenderSlot_1(_ctx.$slots, "content-bottom", {
                    sub: __props.sub ?? false
                  }, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    vueExports.renderSlot(_ctx.$slots, "content-top", {
                      sub: __props.sub ?? false
                    }),
                    vueExports.createVNode("div", {
                      role: "presentation",
                      "data-slot": "viewport",
                      class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                    }, [
                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Group, {
                          key: `group-${groupIndex}`,
                          "data-slot": "group",
                          class: __props.ui.group({ class: __props.uiOverride?.group })
                        }, {
                          default: vueExports.withCtx(() => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                                key: `group-${groupIndex}-${index}`
                              }, [
                                item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                  key: 0,
                                  "data-slot": "label",
                                  class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                  key: 1,
                                  "data-slot": "separator",
                                  class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                                }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                  key: 2,
                                  open: item.open,
                                  "default-open": item.defaultOpen
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                      as: "button",
                                      type: "button",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      "data-slot": "item",
                                      class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "class"]),
                                    vueExports.createVNode(_sfc_main$6, vueExports.mergeProps({
                                      sub: "",
                                      class: item.ui?.content,
                                      ui: __props.ui,
                                      "ui-override": __props.uiOverride,
                                      portal: __props.portal,
                                      items: item.children,
                                      align: "start",
                                      "align-offset": -4,
                                      "side-offset": 3,
                                      "label-key": __props.labelKey,
                                      "description-key": __props.descriptionKey,
                                      "checked-icon": __props.checkedIcon,
                                      "loading-icon": __props.loadingIcon,
                                      "external-icon": __props.externalIcon
                                    }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                      vueExports.renderList(getProxySlots(), (_3, name) => {
                                        return {
                                          name,
                                          fn: vueExports.withCtx((slotData) => [
                                            vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                          ])
                                        };
                                      })
                                    ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                  ]),
                                  _: 2
                                }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                  key: 3,
                                  "model-value": item.checked,
                                  disabled: item.disabled,
                                  "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                  "data-slot": "item",
                                  class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                  "onUpdate:modelValue": item.onUpdateChecked,
                                  onSelect: item.onSelect
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 2
                                }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b$1, vueExports.mergeProps({
                                  key: 4,
                                  ref_for: true
                                }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                  default: vueExports.withCtx(({ active, ...slotProps }) => [
                                    vueExports.createVNode(vueExports.unref(DropdownMenu).Item, {
                                      "as-child": "",
                                      disabled: item.disabled,
                                      "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                      onSelect: item.onSelect
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                          "data-slot": "item",
                                          class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                        }), {
                                          default: vueExports.withCtx(() => [
                                            vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                              item,
                                              active,
                                              index
                                            }, null, 8, ["item", "active", "index"])
                                          ]),
                                          _: 2
                                        }, 1040, ["class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["disabled", "text-value", "onSelect"])
                                  ]),
                                  _: 2
                                }, 1040))
                              ], 64);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ], 2),
                    vueExports.renderSlot(_ctx.$slots, "default"),
                    vueExports.renderSlot(_ctx.$slots, "content-bottom", {
                      sub: __props.sub ?? false
                    })
                  ];
                }
              }),
              _: 3
            }), _parent2, _scopeId);
          } else {
            return [
              (vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(__props.sub ? vueExports.unref(DropdownMenu).SubContent : vueExports.unref(DropdownMenu).Content), vueExports.mergeProps({
                "data-slot": "content",
                class: __props.ui.content({ class: [__props.uiOverride?.content, props.class] })
              }, vueExports.unref(contentProps)), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "content-top", {
                    sub: __props.sub ?? false
                  }),
                  vueExports.createVNode("div", {
                    role: "presentation",
                    "data-slot": "viewport",
                    class: __props.ui.viewport({ class: __props.uiOverride?.viewport })
                  }, [
                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(groups.value, (group, groupIndex) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Group, {
                        key: `group-${groupIndex}`,
                        "data-slot": "group",
                        class: __props.ui.group({ class: __props.uiOverride?.group })
                      }, {
                        default: vueExports.withCtx(() => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, {
                              key: `group-${groupIndex}-${index}`
                            }, [
                              item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Label, {
                                key: 0,
                                "data-slot": "label",
                                class: __props.ui.label({ class: [__props.uiOverride?.label, item.ui?.label, item.class] })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["class"])) : item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Separator, {
                                key: 1,
                                "data-slot": "separator",
                                class: __props.ui.separator({ class: [__props.uiOverride?.separator, item.ui?.separator, item.class] })
                              }, null, 8, ["class"])) : item?.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).Sub, {
                                key: 2,
                                open: item.open,
                                "default-open": item.defaultOpen
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(DropdownMenu).SubTrigger, {
                                    as: "button",
                                    type: "button",
                                    disabled: item.disabled,
                                    "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                    "data-slot": "item",
                                    class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "text-value", "class"]),
                                  vueExports.createVNode(_sfc_main$6, vueExports.mergeProps({
                                    sub: "",
                                    class: item.ui?.content,
                                    ui: __props.ui,
                                    "ui-override": __props.uiOverride,
                                    portal: __props.portal,
                                    items: item.children,
                                    align: "start",
                                    "align-offset": -4,
                                    "side-offset": 3,
                                    "label-key": __props.labelKey,
                                    "description-key": __props.descriptionKey,
                                    "checked-icon": __props.checkedIcon,
                                    "loading-icon": __props.loadingIcon,
                                    "external-icon": __props.externalIcon
                                  }, { ref_for: true }, item.content), vueExports.createSlots({ _: 2 }, [
                                    vueExports.renderList(getProxySlots(), (_2, name) => {
                                      return {
                                        name,
                                        fn: vueExports.withCtx((slotData) => [
                                          vueExports.renderSlot(_ctx.$slots, name, vueExports.mergeProps({ ref_for: true }, slotData))
                                        ])
                                      };
                                    })
                                  ]), 1040, ["class", "ui", "ui-override", "portal", "items", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
                                ]),
                                _: 2
                              }, 1032, ["open", "default-open"])) : item.type === "checkbox" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenu).CheckboxItem, {
                                key: 3,
                                "model-value": item.checked,
                                disabled: item.disabled,
                                "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                "data-slot": "item",
                                class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color }),
                                "onUpdate:modelValue": item.onUpdateChecked,
                                onSelect: item.onSelect
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 2
                              }, 1032, ["model-value", "disabled", "text-value", "class", "onUpdate:modelValue", "onSelect"])) : (vueExports.openBlock(), vueExports.createBlock(_sfc_main$b$1, vueExports.mergeProps({
                                key: 4,
                                ref_for: true
                              }, vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                                default: vueExports.withCtx(({ active, ...slotProps }) => [
                                  vueExports.createVNode(vueExports.unref(DropdownMenu).Item, {
                                    "as-child": "",
                                    disabled: item.disabled,
                                    "text-value": vueExports.unref(get$1)(item, props.labelKey),
                                    onSelect: item.onSelect
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps({ ref_for: true }, slotProps, {
                                        "data-slot": "item",
                                        class: __props.ui.item({ class: [__props.uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })
                                      }), {
                                        default: vueExports.withCtx(() => [
                                          vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                            item,
                                            active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["disabled", "text-value", "onSelect"])
                                ]),
                                _: 2
                              }, 1040))
                            ], 64);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"]);
                    }), 128))
                  ], 2),
                  vueExports.renderSlot(_ctx.$slots, "default"),
                  vueExports.renderSlot(_ctx.$slots, "content-bottom", {
                    sub: __props.sub ?? false
                  })
                ]),
                _: 3
              }, 16, ["class"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenuContent.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "content": "min-w-32 bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "arrow": "fill-bg stroke-default",
    "group": "p-1 isolate",
    "label": "w-full flex items-center font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemLabelExternalIcon": "inline-block size-3 align-top text-dimmed"
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
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:text-highlighted data-[state=open]:text-highlighted data-highlighted:before:bg-elevated/50 data-[state=open]:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:text-default group-data-[state=open]:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    },
    "size": {
      "xs": {
        "label": "p-1 text-xs gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemTrailingIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "label": "p-1.5 text-sm gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemTrailingIcon": "size-5",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "label": "p-2 text-base gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemTrailingIcon": "size-6",
        "itemTrailingKbds": "gap-1",
        "itemTrailingKbdsSize": "lg"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "active": false,
      "class": {
        "item": "text-primary data-highlighted:text-primary data-highlighted:before:bg-primary/10 data-[state=open]:before:bg-primary/10",
        "itemLeadingIcon": "text-primary/75 group-data-highlighted:text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "active": false,
      "class": {
        "item": "text-secondary data-highlighted:text-secondary data-highlighted:before:bg-secondary/10 data-[state=open]:before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary/75 group-data-highlighted:text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "active": false,
      "class": {
        "item": "text-success data-highlighted:text-success data-highlighted:before:bg-success/10 data-[state=open]:before:bg-success/10",
        "itemLeadingIcon": "text-success/75 group-data-highlighted:text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "active": false,
      "class": {
        "item": "text-info data-highlighted:text-info data-highlighted:before:bg-info/10 data-[state=open]:before:bg-info/10",
        "itemLeadingIcon": "text-info/75 group-data-highlighted:text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "active": false,
      "class": {
        "item": "text-warning data-highlighted:text-warning data-highlighted:before:bg-warning/10 data-[state=open]:before:bg-warning/10",
        "itemLeadingIcon": "text-warning/75 group-data-highlighted:text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "active": false,
      "class": {
        "item": "text-error data-highlighted:text-error data-highlighted:before:bg-error/10 data-[state=open]:before:bg-error/10",
        "itemLeadingIcon": "text-error/75 group-data-highlighted:text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "primary",
      "active": true,
      "class": {
        "item": "text-primary before:bg-primary/10",
        "itemLeadingIcon": "text-primary"
      }
    },
    {
      "color": "secondary",
      "active": true,
      "class": {
        "item": "text-secondary before:bg-secondary/10",
        "itemLeadingIcon": "text-secondary"
      }
    },
    {
      "color": "success",
      "active": true,
      "class": {
        "item": "text-success before:bg-success/10",
        "itemLeadingIcon": "text-success"
      }
    },
    {
      "color": "info",
      "active": true,
      "class": {
        "item": "text-info before:bg-info/10",
        "itemLeadingIcon": "text-info"
      }
    },
    {
      "color": "warning",
      "active": true,
      "class": {
        "item": "text-warning before:bg-warning/10",
        "itemLeadingIcon": "text-warning"
      }
    },
    {
      "color": "error",
      "active": true,
      "class": {
        "item": "text-error before:bg-error/10",
        "itemLeadingIcon": "text-error"
      }
    }
  ],
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$5 = {
  __name: "UDropdownMenu",
  __ssrInlineRender: true,
  props: {
    size: { type: null, required: false },
    items: { type: null, required: false },
    checkedIcon: { type: null, required: false },
    loadingIcon: { type: null, required: false },
    externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    disabled: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dropdownMenu", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "modal"), emits);
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = vueExports.toRef(() => defu(props.arrow, { rounded: true }));
    const getProxySlots = () => omit(slots, ["default"]);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.dropdownMenu || {} })({
      size: props.size
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(DropdownMenuRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), _attrs), {
        default: vueExports.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent_1(vueExports.unref(DropdownMenuTrigger_default), {
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(_sfc_main$6, vueExports.mergeProps({
              class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] }),
              ui: ui.value,
              "ui-override": vueExports.unref(uiProp)
            }, contentProps.value, {
              items: __props.items,
              portal: __props.portal,
              "label-key": __props.labelKey,
              "description-key": __props.descriptionKey,
              "checked-icon": __props.checkedIcon,
              "loading-icon": __props.loadingIcon,
              "external-icon": __props.externalIcon
            }), vueExports.createSlots({
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!__props.arrow) {
                    _push3(ssrRenderComponent_1(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps(arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                    }), null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                      "data-slot": "arrow",
                      class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                    }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, [
              vueExports.renderList(getProxySlots(), (_, name) => {
                return {
                  name,
                  fn: vueExports.withCtx((slotData, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot_1(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        vueExports.renderSlot(_ctx.$slots, name, slotData)
                      ];
                    }
                  })
                };
              })
            ]), _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuTrigger_default), {
                key: 0,
                "as-child": "",
                class: props.class,
                disabled: __props.disabled
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class", "disabled"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(_sfc_main$6, vueExports.mergeProps({
                class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] }),
                ui: ui.value,
                "ui-override": vueExports.unref(uiProp)
              }, contentProps.value, {
                items: __props.items,
                portal: __props.portal,
                "label-key": __props.labelKey,
                "description-key": __props.descriptionKey,
                "checked-icon": __props.checkedIcon,
                "loading-icon": __props.loadingIcon,
                "external-icon": __props.externalIcon
              }), vueExports.createSlots({
                default: vueExports.withCtx(() => [
                  !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DropdownMenuArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                    "data-slot": "arrow",
                    class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                  }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                ]),
                _: 2
              }, [
                vueExports.renderList(getProxySlots(), (_, name) => {
                  return {
                    name,
                    fn: vueExports.withCtx((slotData) => [
                      vueExports.renderSlot(_ctx.$slots, name, slotData)
                    ])
                  };
                })
              ]), 1040, ["class", "ui", "ui-override", "items", "portal", "label-key", "description-key", "checked-icon", "loading-icon", "external-icon"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DropdownMenu.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "UserMenu",
  __ssrInlineRender: true,
  props: {
    collapsed: { type: Boolean }
  },
  setup(__props) {
    const sessionStore = useSessionStore();
    const branchStore = useBranchStore();
    const { isConnected } = useRealtimeQueue();
    const items = vueExports.computed(
      () => [
        [
          {
            type: "label",
            label: sessionStore.user?.name || "Гостевой барбер"
          }
        ],
        [
          {
            label: branchStore.activeBranch?.name || "Филиал не выбран",
            icon: "i-lucide-map-pinned"
          },
          {
            label: isConnected.value ? "Онлайн-синхронизация активна" : "Онлайн-синхронизация недоступна",
            icon: isConnected.value ? "i-lucide-broadcast" : "i-lucide-wifi-off"
          }
        ],
        [
          {
            label: "Отладка API",
            icon: "i-lucide-code-xml",
            to: "/api-debug"
          }
        ],
        [
          {
            label: "Выйти",
            icon: "i-lucide-log-out",
            onSelect: async () => {
              await sessionStore.logout({
                barber_id: sessionStore.barber?.id
              });
              await navigateTo("/login");
            }
          }
        ]
      ]
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDropdownMenu = _sfc_main$5;
      const _component_UButton = _sfc_main$a$1;
      _push(ssrRenderComponent_1(_component_UDropdownMenu, vueExports.mergeProps({
        content: { align: "center", collisionPadding: 12 },
        items: vueExports.unref(items),
        ui: { content: __props.collapsed ? "w-48" : "w-(--reka-dropdown-menu-trigger-width)" }
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UButton, {
              block: !__props.collapsed,
              class: [!__props.collapsed && "py-2.5"],
              icon: __props.collapsed ? "i-lucide-user-round" : void 0,
              label: __props.collapsed ? void 0 : vueExports.unref(sessionStore).user?.name || "Сессия барбера",
              square: __props.collapsed,
              color: "neutral",
              "trailing-icon": "i-lucide-chevrons-up-down",
              variant: "ghost"
            }, null, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_component_UButton, {
                block: !__props.collapsed,
                class: [!__props.collapsed && "py-2.5"],
                icon: __props.collapsed ? "i-lucide-user-round" : void 0,
                label: __props.collapsed ? void 0 : vueExports.unref(sessionStore).user?.name || "Сессия барбера",
                square: __props.collapsed,
                color: "neutral",
                "trailing-icon": "i-lucide-chevrons-up-down",
                variant: "ghost"
              }, null, 8, ["block", "class", "icon", "label", "square"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/UserMenu.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$4, { __name: "AppUserMenu" });
const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}
function isAlreadyEscaped(str) {
  return /&(?:amp|lt|gt|quot|#39);/.test(str);
}
function sanitize(str) {
  if (isAlreadyEscaped(str)) {
    return str;
  }
  return escapeHTML(str);
}
function truncateHTMLFromStart(html, maxLength) {
  let truncated = "";
  let totalLength = 0;
  let insideTag = false;
  for (let i = html.length - 1; i >= 0; i--) {
    if (html[i] === ">") {
      insideTag = true;
    } else if (html[i] === "<") {
      insideTag = false;
      truncated = html[i] + truncated;
      continue;
    }
    if (!insideTag) {
      totalLength++;
    }
    if (totalLength <= maxLength) {
      truncated = html[i] + truncated;
    } else {
      truncated = "..." + truncated;
      break;
    }
  }
  return truncated;
}
function highlight(item, searchTerm, forceKey, omitKeys) {
  function generateHighlightedText(value, indices = []) {
    value = value || "";
    let content = "";
    let nextUnhighlightedRegionStartingIndex = 0;
    indices.forEach((region) => {
      if (region.length === 2 && region[0] === region[1]) {
        return;
      }
      const lastIndiceNextIndex = region[1] + 1;
      const isMatched = lastIndiceNextIndex - region[0] >= searchTerm.length;
      content += [
        sanitize(value.substring(nextUnhighlightedRegionStartingIndex, region[0])),
        isMatched && `<mark>`,
        sanitize(value.substring(region[0], lastIndiceNextIndex)),
        isMatched && "</mark>"
      ].filter(Boolean).join("");
      nextUnhighlightedRegionStartingIndex = lastIndiceNextIndex;
    });
    content += sanitize(value.substring(nextUnhighlightedRegionStartingIndex));
    const markIndex = content.indexOf("<mark>");
    if (markIndex !== -1) {
      content = truncateHTMLFromStart(content, content.length - markIndex);
    }
    return content;
  }
  if (!item.matches?.length) {
    return;
  }
  for (const match of item.matches) {
    if (forceKey && match.key !== forceKey) {
      continue;
    }
    if (omitKeys?.includes(match.key)) {
      continue;
    }
    return generateHighlightedText(match.value, match.indices);
  }
}
const theme$1 = {
  "slots": {
    "root": "flex flex-col min-h-0 min-w-0 divide-y divide-default",
    "input": "",
    "close": "",
    "back": "p-0",
    "content": "relative overflow-hidden flex flex-col",
    "footer": "p-1",
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1 focus:outline-none",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingHighlightedIcon": "shrink-0 text-dimmed hidden group-data-highlighted:inline-flex",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate space-x-1 text-dimmed",
    "itemDescription": "truncate text-muted",
    "itemLabelBase": "text-highlighted [&>mark]:text-inverted [&>mark]:bg-primary",
    "itemLabelPrefix": "text-default",
    "itemLabelSuffix": "text-dimmed [&>mark]:text-inverted [&>mark]:bg-primary"
  },
  "variants": {
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    },
    "size": {
      "xs": {
        "input": "[&>input]:h-10",
        "empty": "py-3 text-xs",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "input": "[&>input]:h-11",
        "empty": "py-4 text-xs",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "input": "[&>input]:h-12",
        "empty": "py-6 text-sm",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "input": "[&>input]:h-13",
        "empty": "py-7 text-sm",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "input": "[&>input]:h-14",
        "empty": "py-8 text-base",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-6",
        "itemTrailingHighlightedIcon": "size-6",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "lg"
      }
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UCommandPalette",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    as: { type: null, required: false },
    size: { type: null, required: false },
    icon: { type: null, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    childrenIcon: { type: null, required: false },
    placeholder: { type: String, required: false },
    autofocus: { type: Boolean, required: false, default: true },
    close: { type: [Boolean, Object], required: false },
    closeIcon: { type: null, required: false },
    back: { type: [Boolean, Object], required: false, default: true },
    backIcon: { type: null, required: false },
    input: { type: [Boolean, Object], required: false, default: true },
    groups: { type: Array, required: false },
    fuse: { type: Object, required: false },
    virtualize: { type: [Boolean, Object], required: false, default: false },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    preserveGroupOrder: { type: Boolean, required: false, default: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    multiple: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    highlightOnHover: { type: Boolean, required: false, default: true },
    selectionBehavior: { type: String, required: false },
    by: { type: [String, Function], required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["update:modelValue", "highlight", "entryFocus", "leave", "update:open"], ["update:searchTerm"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const searchTerm = vueExports.useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("commandPalette", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "disabled", "multiple", "modelValue", "defaultValue", "highlightOnHover", "by"), emits);
    const virtualizerProps = vueExports.toRef(() => {
      if (!props.virtualize) return false;
      return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
        estimateSize: getEstimateSize(filteredItems.value, "md", props.descriptionKey, !!slots["item-description"])
      });
    });
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: {
          type: Object,
          required: true
        },
        group: {
          type: Object,
          required: false
        },
        index: {
          type: Number,
          required: false
        }
      }
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.commandPalette || {} })({
      size: props.size,
      virtualize: !!props.virtualize
    }));
    const fuse = vueExports.computed(() => defu({}, props.fuse, {
      fuseOptions: {
        ignoreLocation: true,
        threshold: 0.1,
        keys: [props.labelKey, "suffix"]
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }));
    const history = vueExports.ref([]);
    const placeholder = vueExports.computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t("commandPalette.placeholder"));
    const groups = vueExports.computed(() => history.value?.length ? [history.value[history.value.length - 1]] : props.groups);
    const items = vueExports.computed(() => groups.value?.filter((group) => {
      if (!group.id) {
        console.warn(`[@nuxt/ui] CommandPalette group is missing an \`id\` property`);
        return false;
      }
      if (group.ignoreFilter) {
        return false;
      }
      return true;
    })?.flatMap((group) => group.items?.map((item) => ({ ...item, group: group.id })) || []) || []);
    const { results: fuseResults } = useFuse(searchTerm, items, fuse);
    const throttledFuseResults = refThrottled(fuseResults, 16, true);
    function processGroupItems(group, items2) {
      let processedItems = items2;
      if (group?.postFilter && typeof group.postFilter === "function") {
        processedItems = group.postFilter(searchTerm.value, processedItems);
      }
      return {
        ...group,
        items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
          return {
            ...item,
            labelHtml: highlight(item, searchTerm.value, props.labelKey),
            suffixHtml: highlight(item, searchTerm.value, void 0, [props.labelKey])
          };
        })
      };
    }
    const filteredGroups = vueExports.computed(() => {
      const currentGroups = groups.value;
      const groupsById = throttledFuseResults.value.reduce((acc, result) => {
        const { item, matches } = result;
        if (!item.group) {
          return acc;
        }
        acc[item.group] ||= [];
        acc[item.group]?.push({ ...item, matches });
        return acc;
      }, {});
      if (props.preserveGroupOrder) {
        const processedGroups = [];
        for (const group of currentGroups || []) {
          if (!group.items?.length) {
            continue;
          }
          const items2 = group.ignoreFilter ? group.items : groupsById[group.id];
          if (!items2?.length) {
            continue;
          }
          const processedGroup = processGroupItems(group, items2);
          if (processedGroup.items?.length) {
            processedGroups.push(processedGroup);
          }
        }
        return processedGroups;
      }
      const fuseGroups = Object.entries(groupsById).map(([id, items2]) => {
        const group = currentGroups?.find((group2) => group2.id === id);
        if (!group) {
          return;
        }
        const processedGroup = processGroupItems(group, items2);
        return processedGroup.items?.length ? processedGroup : void 0;
      }).filter((group) => !!group);
      const nonFuseGroups = currentGroups?.map((group, index) => ({ ...group, index }))?.filter((group) => group.ignoreFilter && group.items?.length)?.map((group) => {
        const processedGroup = processGroupItems(group, group.items || []);
        return { ...processedGroup, index: group.index };
      })?.filter((group) => group.items?.length) || [];
      return nonFuseGroups.reduce((acc, group) => {
        acc.splice(group.index, 0, group);
        return acc;
      }, [...fuseGroups]);
    });
    const filteredItems = vueExports.computed(() => filteredGroups.value.flatMap((group) => group.items || []));
    const rootRef = vueExports.useTemplateRef("rootRef");
    function navigate(item) {
      if (!item.children?.length) {
        return;
      }
      history.value.push({
        id: `history-${history.value.length}`,
        label: item.label,
        slot: item.slot,
        placeholder: item.placeholder,
        items: item.children
      });
      searchTerm.value = "";
      rootRef.value?.highlightFirstItem();
    }
    function navigateBack() {
      if (!history.value.length) {
        return;
      }
      history.value.pop();
      searchTerm.value = "";
      rootRef.value?.highlightFirstItem();
    }
    function onBackspace() {
      if (!searchTerm.value) {
        navigateBack();
      }
    }
    function onSelect(e, item) {
      if (item.children?.length) {
        e.preventDefault();
        navigate(item);
      } else {
        item.onSelect?.(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, index, group }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_sfc_main$b$1, vueExports.mergeProps(vueExports.unref(pickLinkProps)(item), { custom: "" }), {
              default: vueExports.withCtx(({ active, ...slotProps }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(ListboxItem_default), {
                    value: props.valueKey ? vueExports.unref(get$1)(item, props.valueKey) : vueExports.unref(omit)(item, ["matches", "group", "onSelect", "labelHtml", "suffixHtml", "children"]),
                    disabled: item.disabled,
                    "as-child": "",
                    onSelect: ($event) => onSelect($event, item)
                  }, {
                    default: vueExports.withCtx((_, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item, item.class], active: active || item.active })
                        }), {
                          default: vueExports.withCtx((_2, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot_1(_ctx.$slots, item.slot || group?.slot || "item", {
                                item,
                                index,
                                ui: ui.value
                              }, () => {
                                ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => {
                                  if (item.loading) {
                                    _push5(ssrRenderComponent_1(_sfc_main$f$1, {
                                      name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                    }, null, _parent5, _scopeId4));
                                  } else if (item.icon) {
                                    _push5(ssrRenderComponent_1(_sfc_main$f$1, {
                                      name: item.icon,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                    }, null, _parent5, _scopeId4));
                                  } else if (item.avatar) {
                                    _push5(ssrRenderComponent_1(_sfc_main$d$1, vueExports.mergeProps({
                                      size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                    }, item.avatar, {
                                      "data-slot": "itemLeadingAvatar",
                                      class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                    }), null, _parent5, _scopeId4));
                                  } else if (item.chip) {
                                    _push5(ssrRenderComponent_1(_sfc_main$e$1, vueExports.mergeProps({
                                      size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                      inset: "",
                                      standalone: ""
                                    }, item.chip, {
                                      "data-slot": "itemLeadingChip",
                                      class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                    }), null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                                if (item.prefix || (item.labelHtml || vueExports.unref(get$1)(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])) {
                                  _push5(`<span data-slot="itemWrapper" class="${ssrRenderClass_1(ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, item.ui?.itemWrapper] }))}"${_scopeId4}><span data-slot="itemLabel" class="${ssrRenderClass_1(ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, item.ui?.itemLabel], active: active || item.active }))}"${_scopeId4}>`);
                                  ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                    item,
                                    index,
                                    ui: ui.value
                                  }, () => {
                                    if (item.prefix) {
                                      _push5(`<span data-slot="itemLabelPrefix" class="${ssrRenderClass_1(ui.value.itemLabelPrefix({ class: [vueExports.unref(uiProp)?.itemLabelPrefix, item.ui?.itemLabelPrefix] }))}"${_scopeId4}>${ssrInterpolate_1(item.prefix)}</span>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (item.labelHtml) {
                                      _push5(`<span data-slot="itemLabelBase" class="${ssrRenderClass_1(ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }))}"${_scopeId4}>${item.labelHtml ?? ""}</span>`);
                                    } else {
                                      _push5(`<span data-slot="itemLabelBase" class="${ssrRenderClass_1(ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }))}"${_scopeId4}>${ssrInterpolate_1(vueExports.unref(get$1)(item, props.labelKey))}</span>`);
                                    }
                                    if (item.suffixHtml) {
                                      _push5(`<span data-slot="itemLabelSuffix" class="${ssrRenderClass_1(ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }))}"${_scopeId4}>${item.suffixHtml ?? ""}</span>`);
                                    } else if (item.suffix) {
                                      _push5(`<span data-slot="itemLabelSuffix" class="${ssrRenderClass_1(ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }))}"${_scopeId4}>${ssrInterpolate_1(item.suffix)}</span>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                  }, _push5, _parent5, _scopeId4);
                                  _push5(`</span>`);
                                  if (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) {
                                    _push5(`<span data-slot="itemDescription" class="${ssrRenderClass_1(ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, item.ui?.itemDescription] }))}"${_scopeId4}>`);
                                    ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                      item,
                                      index,
                                      ui: ui.value
                                    }, () => {
                                      _push5(`${ssrInterpolate_1(vueExports.unref(get$1)(item, props.descriptionKey))}`);
                                    }, _push5, _parent5, _scopeId4);
                                    _push5(`</span>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<span data-slot="itemTrailing" class="${ssrRenderClass_1(ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, item.ui?.itemTrailing] }))}"${_scopeId4}>`);
                                ssrRenderSlot_1(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => {
                                  if (item.children && item.children.length > 0) {
                                    _push5(ssrRenderComponent_1(_sfc_main$f$1, {
                                      name: __props.childrenIcon || vueExports.unref(appConfig).ui.icons.chevronRight,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, _parent5, _scopeId4));
                                  } else if (item.kbds?.length) {
                                    _push5(`<span data-slot="itemTrailingKbds" class="${ssrRenderClass_1(ui.value.itemTrailingKbds({ class: [vueExports.unref(uiProp)?.itemTrailingKbds, item.ui?.itemTrailingKbds] }))}"${_scopeId4}><!--[-->`);
                                    ssrRenderList_1(item.kbds, (kbd, kbdIndex) => {
                                      _push5(ssrRenderComponent_1(_sfc_main$1$2, vueExports.mergeProps({
                                        key: kbdIndex,
                                        size: item.ui?.itemTrailingKbdsSize || vueExports.unref(uiProp)?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                      }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent5, _scopeId4));
                                    });
                                    _push5(`<!--]--></span>`);
                                  } else if (group?.highlightedIcon) {
                                    _push5(ssrRenderComponent_1(_sfc_main$f$1, {
                                      name: group.highlightedIcon,
                                      "data-slot": "itemTrailingHighlightedIcon",
                                      class: ui.value.itemTrailingHighlightedIcon({ class: [vueExports.unref(uiProp)?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                                if (!item.children?.length) {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ListboxItemIndicator_default), { "as-child": "" }, {
                                    default: vueExports.withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(_sfc_main$f$1, {
                                          name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                          "data-slot": "itemTrailingIcon",
                                          class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(_sfc_main$f$1, {
                                            name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                            "data-slot": "itemTrailingIcon",
                                            class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                          }, null, 8, ["name", "class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</span>`);
                              }, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                vueExports.renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                                    item,
                                    index,
                                    ui: ui.value
                                  }, () => [
                                    item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                      key: 0,
                                      name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                    }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                      key: 1,
                                      name: item.icon,
                                      "data-slot": "itemLeadingIcon",
                                      class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                    }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                                      key: 2,
                                      size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                    }, item.avatar, {
                                      "data-slot": "itemLeadingAvatar",
                                      class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                    }), null, 16, ["size", "class"])) : item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e$1, vueExports.mergeProps({
                                      key: 3,
                                      size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                      inset: "",
                                      standalone: ""
                                    }, item.chip, {
                                      "data-slot": "itemLeadingChip",
                                      class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                    }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                  ]),
                                  item.prefix || (item.labelHtml || vueExports.unref(get$1)(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 0,
                                    "data-slot": "itemWrapper",
                                    class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, item.ui?.itemWrapper] })
                                  }, [
                                    vueExports.createVNode("span", {
                                      "data-slot": "itemLabel",
                                      class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                    }, [
                                      vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                        item,
                                        index,
                                        ui: ui.value
                                      }, () => [
                                        item.prefix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                          key: 0,
                                          "data-slot": "itemLabelPrefix",
                                          class: ui.value.itemLabelPrefix({ class: [vueExports.unref(uiProp)?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                        }, vueExports.toDisplayString(item.prefix), 3)) : vueExports.createCommentVNode("", true),
                                        item.labelHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                          key: 1,
                                          "data-slot": "itemLabelBase",
                                          class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                          innerHTML: item.labelHtml
                                        }, null, 10, ["innerHTML"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                          key: 2,
                                          "data-slot": "itemLabelBase",
                                          class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                        }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3)),
                                        item.suffixHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                          key: 3,
                                          "data-slot": "itemLabelSuffix",
                                          class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                          innerHTML: item.suffixHtml
                                        }, null, 10, ["innerHTML"])) : item.suffix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                          key: 4,
                                          "data-slot": "itemLabelSuffix",
                                          class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                        }, vueExports.toDisplayString(item.suffix), 3)) : vueExports.createCommentVNode("", true)
                                      ])
                                    ], 2),
                                    vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 0,
                                      "data-slot": "itemDescription",
                                      class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, item.ui?.itemDescription] })
                                    }, [
                                      vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                        item,
                                        index,
                                        ui: ui.value
                                      }, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.descriptionKey)), 1)
                                      ])
                                    ], 2)) : vueExports.createCommentVNode("", true)
                                  ], 2)) : vueExports.createCommentVNode("", true),
                                  vueExports.createVNode("span", {
                                    "data-slot": "itemTrailing",
                                    class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, item.ui?.itemTrailing] })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                      item,
                                      index,
                                      ui: ui.value
                                    }, () => [
                                      item.children && item.children.length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                        key: 0,
                                        name: __props.childrenIcon || vueExports.unref(appConfig).ui.icons.chevronRight,
                                        "data-slot": "itemTrailingIcon",
                                        class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                      }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 1,
                                        "data-slot": "itemTrailingKbds",
                                        class: ui.value.itemTrailingKbds({ class: [vueExports.unref(uiProp)?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                      }, [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                                          return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                                            key: kbdIndex,
                                            size: item.ui?.itemTrailingKbdsSize || vueExports.unref(uiProp)?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                          }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                        }), 128))
                                      ], 2)) : group?.highlightedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                        key: 2,
                                        name: group.highlightedIcon,
                                        "data-slot": "itemTrailingHighlightedIcon",
                                        class: ui.value.itemTrailingHighlightedIcon({ class: [vueExports.unref(uiProp)?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                      }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                    ]),
                                    !item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), {
                                      key: 0,
                                      "as-child": ""
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(_sfc_main$f$1, {
                                          name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                          "data-slot": "itemTrailingIcon",
                                          class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                        }, null, 8, ["name", "class"])
                                      ]),
                                      _: 2
                                    }, 1024)) : vueExports.createCommentVNode("", true)
                                  ], 2)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                            "data-slot": "item",
                            class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item, item.class], active: active || item.active })
                          }), {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
                                item,
                                index,
                                ui: ui.value
                              }, () => [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                    key: 0,
                                    name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                                    "data-slot": "itemLeadingIcon",
                                    class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                  }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                    key: 1,
                                    name: item.icon,
                                    "data-slot": "itemLeadingIcon",
                                    class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                  }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                                    key: 2,
                                    size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                  }, item.avatar, {
                                    "data-slot": "itemLeadingAvatar",
                                    class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                  }), null, 16, ["size", "class"])) : item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e$1, vueExports.mergeProps({
                                    key: 3,
                                    size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                    inset: "",
                                    standalone: ""
                                  }, item.chip, {
                                    "data-slot": "itemLeadingChip",
                                    class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                  }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                                ]),
                                item.prefix || (item.labelHtml || vueExports.unref(get$1)(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 0,
                                  "data-slot": "itemWrapper",
                                  class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, item.ui?.itemWrapper] })
                                }, [
                                  vueExports.createVNode("span", {
                                    "data-slot": "itemLabel",
                                    class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                      item,
                                      index,
                                      ui: ui.value
                                    }, () => [
                                      item.prefix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 0,
                                        "data-slot": "itemLabelPrefix",
                                        class: ui.value.itemLabelPrefix({ class: [vueExports.unref(uiProp)?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                      }, vueExports.toDisplayString(item.prefix), 3)) : vueExports.createCommentVNode("", true),
                                      item.labelHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 1,
                                        "data-slot": "itemLabelBase",
                                        class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                        innerHTML: item.labelHtml
                                      }, null, 10, ["innerHTML"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 2,
                                        "data-slot": "itemLabelBase",
                                        class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                      }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3)),
                                      item.suffixHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 3,
                                        "data-slot": "itemLabelSuffix",
                                        class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                        innerHTML: item.suffixHtml
                                      }, null, 10, ["innerHTML"])) : item.suffix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                        key: 4,
                                        "data-slot": "itemLabelSuffix",
                                        class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                      }, vueExports.toDisplayString(item.suffix), 3)) : vueExports.createCommentVNode("", true)
                                    ])
                                  ], 2),
                                  vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 0,
                                    "data-slot": "itemDescription",
                                    class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, item.ui?.itemDescription] })
                                  }, [
                                    vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                      item,
                                      index,
                                      ui: ui.value
                                    }, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.descriptionKey)), 1)
                                    ])
                                  ], 2)) : vueExports.createCommentVNode("", true)
                                ], 2)) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode("span", {
                                  "data-slot": "itemTrailing",
                                  class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, item.ui?.itemTrailing] })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                    item,
                                    index,
                                    ui: ui.value
                                  }, () => [
                                    item.children && item.children.length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                      key: 0,
                                      name: __props.childrenIcon || vueExports.unref(appConfig).ui.icons.chevronRight,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 1,
                                      "data-slot": "itemTrailingKbds",
                                      class: ui.value.itemTrailingKbds({ class: [vueExports.unref(uiProp)?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                    }, [
                                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                                        return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                                          key: kbdIndex,
                                          size: item.ui?.itemTrailingKbdsSize || vueExports.unref(uiProp)?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                        }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                      }), 128))
                                    ], 2)) : group?.highlightedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                      key: 2,
                                      name: group.highlightedIcon,
                                      "data-slot": "itemTrailingHighlightedIcon",
                                      class: ui.value.itemTrailingHighlightedIcon({ class: [vueExports.unref(uiProp)?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                    }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                  ]),
                                  !item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), {
                                    key: 0,
                                    "as-child": ""
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(_sfc_main$f$1, {
                                        name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                        "data-slot": "itemTrailingIcon",
                                        class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                      }, null, 8, ["name", "class"])
                                    ]),
                                    _: 2
                                  }, 1024)) : vueExports.createCommentVNode("", true)
                                ], 2)
                              ])
                            ]),
                            _: 2
                          }, 1040, ["class"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(ListboxItem_default), {
                      value: props.valueKey ? vueExports.unref(get$1)(item, props.valueKey) : vueExports.unref(omit)(item, ["matches", "group", "onSelect", "labelHtml", "suffixHtml", "children"]),
                      disabled: item.disabled,
                      "as-child": "",
                      onSelect: ($event) => onSelect($event, item)
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                          "data-slot": "item",
                          class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item, item.class], active: active || item.active })
                        }), {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                                item,
                                index,
                                ui: ui.value
                              }, () => [
                                item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                  key: 0,
                                  name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                                }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                  key: 1,
                                  name: item.icon,
                                  "data-slot": "itemLeadingIcon",
                                  class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                                }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                                  key: 2,
                                  size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                }, item.avatar, {
                                  "data-slot": "itemLeadingAvatar",
                                  class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                                }), null, 16, ["size", "class"])) : item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e$1, vueExports.mergeProps({
                                  key: 3,
                                  size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                  inset: "",
                                  standalone: ""
                                }, item.chip, {
                                  "data-slot": "itemLeadingChip",
                                  class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                                }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                              ]),
                              item.prefix || (item.labelHtml || vueExports.unref(get$1)(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                "data-slot": "itemWrapper",
                                class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, item.ui?.itemWrapper] })
                              }, [
                                vueExports.createVNode("span", {
                                  "data-slot": "itemLabel",
                                  class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                    item,
                                    index,
                                    ui: ui.value
                                  }, () => [
                                    item.prefix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 0,
                                      "data-slot": "itemLabelPrefix",
                                      class: ui.value.itemLabelPrefix({ class: [vueExports.unref(uiProp)?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                    }, vueExports.toDisplayString(item.prefix), 3)) : vueExports.createCommentVNode("", true),
                                    item.labelHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 1,
                                      "data-slot": "itemLabelBase",
                                      class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                      innerHTML: item.labelHtml
                                    }, null, 10, ["innerHTML"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 2,
                                      "data-slot": "itemLabelBase",
                                      class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                    }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3)),
                                    item.suffixHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 3,
                                      "data-slot": "itemLabelSuffix",
                                      class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                      innerHTML: item.suffixHtml
                                    }, null, 10, ["innerHTML"])) : item.suffix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                      key: 4,
                                      "data-slot": "itemLabelSuffix",
                                      class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                    }, vueExports.toDisplayString(item.suffix), 3)) : vueExports.createCommentVNode("", true)
                                  ])
                                ], 2),
                                vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 0,
                                  "data-slot": "itemDescription",
                                  class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, item.ui?.itemDescription] })
                                }, [
                                  vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                    item,
                                    index,
                                    ui: ui.value
                                  }, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.descriptionKey)), 1)
                                  ])
                                ], 2)) : vueExports.createCommentVNode("", true)
                              ], 2)) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode("span", {
                                "data-slot": "itemTrailing",
                                class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, item.ui?.itemTrailing] })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  item.children && item.children.length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                    key: 0,
                                    name: __props.childrenIcon || vueExports.unref(appConfig).ui.icons.chevronRight,
                                    "data-slot": "itemTrailingIcon",
                                    class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                  }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 1,
                                    "data-slot": "itemTrailingKbds",
                                    class: ui.value.itemTrailingKbds({ class: [vueExports.unref(uiProp)?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                  }, [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                                        key: kbdIndex,
                                        size: item.ui?.itemTrailingKbdsSize || vueExports.unref(uiProp)?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                      }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                    }), 128))
                                  ], 2)) : group?.highlightedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                    key: 2,
                                    name: group.highlightedIcon,
                                    "data-slot": "itemTrailingHighlightedIcon",
                                    class: ui.value.itemTrailingHighlightedIcon({ class: [vueExports.unref(uiProp)?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                  }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                                ]),
                                !item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$f$1, {
                                      name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                      "data-slot": "itemTrailingIcon",
                                      class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                    }, null, 8, ["name", "class"])
                                  ]),
                                  _: 2
                                }, 1024)) : vueExports.createCommentVNode("", true)
                              ], 2)
                            ])
                          ]),
                          _: 2
                        }, 1040, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["value", "disabled", "onSelect"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(_sfc_main$b$1, vueExports.mergeProps(vueExports.unref(pickLinkProps)(item), { custom: "" }), {
                default: vueExports.withCtx(({ active, ...slotProps }) => [
                  vueExports.createVNode(vueExports.unref(ListboxItem_default), {
                    value: props.valueKey ? vueExports.unref(get$1)(item, props.valueKey) : vueExports.unref(omit)(item, ["matches", "group", "onSelect", "labelHtml", "suffixHtml", "children"]),
                    disabled: item.disabled,
                    "as-child": "",
                    onSelect: ($event) => onSelect($event, item)
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(_sfc_main$c$1, vueExports.mergeProps(slotProps, {
                        "data-slot": "item",
                        class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, item.ui?.item, item.class], active: active || item.active })
                      }), {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, item.slot || group?.slot || "item", {
                            item,
                            index,
                            ui: ui.value
                          }, () => [
                            vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`, {
                              item,
                              index,
                              ui: ui.value
                            }, () => [
                              item.loading ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                key: 0,
                                name: __props.loadingIcon || vueExports.unref(appConfig).ui.icons.loading,
                                "data-slot": "itemLeadingIcon",
                                class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })
                              }, null, 8, ["name", "class"])) : item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                key: 1,
                                name: item.icon,
                                "data-slot": "itemLeadingIcon",
                                class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })
                              }, null, 8, ["name", "class"])) : item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d$1, vueExports.mergeProps({
                                key: 2,
                                size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, item.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })
                              }), null, 16, ["size", "class"])) : item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e$1, vueExports.mergeProps({
                                key: 3,
                                size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                inset: "",
                                standalone: ""
                              }, item.chip, {
                                "data-slot": "itemLeadingChip",
                                class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ]),
                            item.prefix || (item.labelHtml || vueExports.unref(get$1)(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "itemWrapper",
                              class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, item.ui?.itemWrapper] })
                            }, [
                              vueExports.createVNode("span", {
                                "data-slot": "itemLabel",
                                class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, item.ui?.itemLabel], active: active || item.active })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  item.prefix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 0,
                                    "data-slot": "itemLabelPrefix",
                                    class: ui.value.itemLabelPrefix({ class: [vueExports.unref(uiProp)?.itemLabelPrefix, item.ui?.itemLabelPrefix] })
                                  }, vueExports.toDisplayString(item.prefix), 3)) : vueExports.createCommentVNode("", true),
                                  item.labelHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 1,
                                    "data-slot": "itemLabelBase",
                                    class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active }),
                                    innerHTML: item.labelHtml
                                  }, null, 10, ["innerHTML"])) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 2,
                                    "data-slot": "itemLabelBase",
                                    class: ui.value.itemLabelBase({ class: [vueExports.unref(uiProp)?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })
                                  }, vueExports.toDisplayString(vueExports.unref(get$1)(item, props.labelKey)), 3)),
                                  item.suffixHtml ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 3,
                                    "data-slot": "itemLabelSuffix",
                                    class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active }),
                                    innerHTML: item.suffixHtml
                                  }, null, 10, ["innerHTML"])) : item.suffix ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                    key: 4,
                                    "data-slot": "itemLabelSuffix",
                                    class: ui.value.itemLabelSuffix({ class: [vueExports.unref(uiProp)?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })
                                  }, vueExports.toDisplayString(item.suffix), 3)) : vueExports.createCommentVNode("", true)
                                ])
                              ], 2),
                              vueExports.unref(get$1)(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`] ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                "data-slot": "itemDescription",
                                class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, item.ui?.itemDescription] })
                              }, [
                                vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`, {
                                  item,
                                  index,
                                  ui: ui.value
                                }, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(item, props.descriptionKey)), 1)
                                ])
                              ], 2)) : vueExports.createCommentVNode("", true)
                            ], 2)) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode("span", {
                              "data-slot": "itemTrailing",
                              class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, item.ui?.itemTrailing] })
                            }, [
                              vueExports.renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`, {
                                item,
                                index,
                                ui: ui.value
                              }, () => [
                                item.children && item.children.length > 0 ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                  key: 0,
                                  name: __props.childrenIcon || vueExports.unref(appConfig).ui.icons.chevronRight,
                                  "data-slot": "itemTrailingIcon",
                                  class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                }, null, 8, ["name", "class"])) : item.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 1,
                                  "data-slot": "itemTrailingKbds",
                                  class: ui.value.itemTrailingKbds({ class: [vueExports.unref(uiProp)?.itemTrailingKbds, item.ui?.itemTrailingKbds] })
                                }, [
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(item.kbds, (kbd, kbdIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1$2, vueExports.mergeProps({
                                      key: kbdIndex,
                                      size: item.ui?.itemTrailingKbdsSize || vueExports.unref(uiProp)?.itemTrailingKbdsSize || ui.value.itemTrailingKbdsSize()
                                    }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                  }), 128))
                                ], 2)) : group?.highlightedIcon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f$1, {
                                  key: 2,
                                  name: group.highlightedIcon,
                                  "data-slot": "itemTrailingHighlightedIcon",
                                  class: ui.value.itemTrailingHighlightedIcon({ class: [vueExports.unref(uiProp)?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })
                                }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                              ]),
                              !item.children?.length ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_sfc_main$f$1, {
                                    name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                    "data-slot": "itemTrailingIcon",
                                    class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, item.ui?.itemTrailingIcon] })
                                  }, null, 8, ["name", "class"])
                                ]),
                                _: 2
                              }, 1024)) : vueExports.createCommentVNode("", true)
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1040, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["value", "disabled", "onSelect"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(ListboxRoot_default), vueExports.mergeProps({ ...vueExports.unref(rootProps), ..._ctx.$attrs }, {
        ref_key: "rootRef",
        ref: rootRef,
        "selection-behavior": __props.selectionBehavior,
        "data-slot": "root",
        class: ui.value.root({ class: [vueExports.unref(uiProp)?.root, props.class] })
      }), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.input) {
              _push2(ssrRenderComponent_1(vueExports.unref(ListboxFilter_default), {
                modelValue: searchTerm.value,
                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                "as-child": ""
              }, {
                default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent_1(_sfc_main$j, vueExports.mergeProps({
                      variant: "none",
                      size: __props.size
                    }, typeof props.input === "object" ? props.input : {}, {
                      placeholder: placeholder.value,
                      autofocus: __props.autofocus,
                      loading: __props.loading,
                      "loading-icon": __props.loadingIcon,
                      "trailing-icon": __props.trailingIcon,
                      icon: __props.icon || vueExports.unref(appConfig).ui.icons.search,
                      "data-slot": "input",
                      class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                      onKeydown: onBackspace
                    }), vueExports.createSlots({ _: 2 }, [
                      history.value?.length && (__props.back || !!slots.back) ? {
                        name: "leading",
                        fn: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot_1(_ctx.$slots, "back", { ui: ui.value }, () => {
                              _push4(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({
                                size: __props.size,
                                icon: __props.backIcon || vueExports.unref(appConfig).ui.icons.arrowLeft,
                                color: "neutral",
                                variant: "link",
                                "aria-label": vueExports.unref(t)("commandPalette.back")
                              }, typeof __props.back === "object" ? __props.back : {}, {
                                "data-slot": "back",
                                class: ui.value.back({ class: vueExports.unref(uiProp)?.back }),
                                onClick: navigateBack
                              }), null, _parent4, _scopeId3));
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              vueExports.renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                                vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({
                                  size: __props.size,
                                  icon: __props.backIcon || vueExports.unref(appConfig).ui.icons.arrowLeft,
                                  color: "neutral",
                                  variant: "link",
                                  "aria-label": vueExports.unref(t)("commandPalette.back")
                                }, typeof __props.back === "object" ? __props.back : {}, {
                                  "data-slot": "back",
                                  class: ui.value.back({ class: vueExports.unref(uiProp)?.back }),
                                  onClick: navigateBack
                                }), null, 16, ["size", "icon", "aria-label", "class"])
                              ])
                            ];
                          }
                        }),
                        key: "0"
                      } : void 0,
                      __props.close || !!slots.close ? {
                        name: "trailing",
                        fn: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot_1(_ctx.$slots, "close", { ui: ui.value }, () => {
                              if (__props.close) {
                                _push4(ssrRenderComponent_1(_sfc_main$a$1, vueExports.mergeProps({
                                  size: __props.size,
                                  icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                  color: "neutral",
                                  variant: "ghost",
                                  "aria-label": vueExports.unref(t)("commandPalette.close")
                                }, typeof __props.close === "object" ? __props.close : {}, {
                                  "data-slot": "close",
                                  class: ui.value.close({ class: vueExports.unref(uiProp)?.close }),
                                  onClick: ($event) => emits("update:open", false)
                                }), null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                                __props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                  key: 0,
                                  size: __props.size,
                                  icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                  color: "neutral",
                                  variant: "ghost",
                                  "aria-label": vueExports.unref(t)("commandPalette.close")
                                }, typeof __props.close === "object" ? __props.close : {}, {
                                  "data-slot": "close",
                                  class: ui.value.close({ class: vueExports.unref(uiProp)?.close }),
                                  onClick: ($event) => emits("update:open", false)
                                }), null, 16, ["size", "icon", "aria-label", "class", "onClick"])) : vueExports.createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        key: "1"
                      } : void 0
                    ]), _parent3, _scopeId2));
                  } else {
                    return [
                      vueExports.createVNode(_sfc_main$j, vueExports.mergeProps({
                        variant: "none",
                        size: __props.size
                      }, typeof props.input === "object" ? props.input : {}, {
                        placeholder: placeholder.value,
                        autofocus: __props.autofocus,
                        loading: __props.loading,
                        "loading-icon": __props.loadingIcon,
                        "trailing-icon": __props.trailingIcon,
                        icon: __props.icon || vueExports.unref(appConfig).ui.icons.search,
                        "data-slot": "input",
                        class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                        onKeydown: vueExports.withKeys(onBackspace, ["backspace"])
                      }), vueExports.createSlots({ _: 2 }, [
                        history.value?.length && (__props.back || !!slots.back) ? {
                          name: "leading",
                          fn: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                              vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({
                                size: __props.size,
                                icon: __props.backIcon || vueExports.unref(appConfig).ui.icons.arrowLeft,
                                color: "neutral",
                                variant: "link",
                                "aria-label": vueExports.unref(t)("commandPalette.back")
                              }, typeof __props.back === "object" ? __props.back : {}, {
                                "data-slot": "back",
                                class: ui.value.back({ class: vueExports.unref(uiProp)?.back }),
                                onClick: navigateBack
                              }), null, 16, ["size", "icon", "aria-label", "class"])
                            ])
                          ]),
                          key: "0"
                        } : void 0,
                        __props.close || !!slots.close ? {
                          name: "trailing",
                          fn: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                              __props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                                key: 0,
                                size: __props.size,
                                icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                                color: "neutral",
                                variant: "ghost",
                                "aria-label": vueExports.unref(t)("commandPalette.close")
                              }, typeof __props.close === "object" ? __props.close : {}, {
                                "data-slot": "close",
                                class: ui.value.close({ class: vueExports.unref(uiProp)?.close }),
                                onClick: ($event) => emits("update:open", false)
                              }), null, 16, ["size", "icon", "aria-label", "class", "onClick"])) : vueExports.createCommentVNode("", true)
                            ])
                          ]),
                          key: "1"
                        } : void 0
                      ]), 1040, ["size", "placeholder", "autofocus", "loading", "loading-icon", "trailing-icon", "icon", "class"])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent_1(vueExports.unref(ListboxContent_default), {
              "data-slot": "content",
              class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (filteredGroups.value?.length) {
                    _push3(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass_1(ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport }))}"${_scopeId2}>`);
                    if (!!__props.virtualize) {
                      _push3(ssrRenderComponent_1(vueExports.unref(ListboxVirtualizer_default), vueExports.mergeProps({
                        options: filteredItems.value,
                        "text-content": (item2) => vueExports.unref(get$1)(item2, props.labelKey)
                      }, virtualizerProps.value), {
                        default: vueExports.withCtx(({ option: item, virtualItem }, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                              item,
                              index: virtualItem.index
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                item,
                                index: virtualItem.index
                              }, null, 8, ["item", "index"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList_1(filteredGroups.value, (group) => {
                        _push3(ssrRenderComponent_1(vueExports.unref(ListboxGroup_default), {
                          key: `group-${group.id}`,
                          "data-slot": "group",
                          class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                        }, {
                          default: vueExports.withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              if (vueExports.unref(get$1)(group, props.labelKey)) {
                                _push4(ssrRenderComponent_1(vueExports.unref(ListboxGroupLabel_default), {
                                  "data-slot": "label",
                                  class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                                }, {
                                  default: vueExports.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`${ssrInterpolate_1(vueExports.unref(get$1)(group, props.labelKey))}`);
                                    } else {
                                      return [
                                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(group, props.labelKey)), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<!--[-->`);
                              ssrRenderList_1(group.items, (item, index) => {
                                _push4(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                  key: `group-${group.id}-${index}`,
                                  item,
                                  index,
                                  group
                                }, null, _parent4, _scopeId3));
                              });
                              _push4(`<!--]-->`);
                            } else {
                              return [
                                vueExports.unref(get$1)(group, props.labelKey) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroupLabel_default), {
                                  key: 0,
                                  "data-slot": "label",
                                  class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(group, props.labelKey)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["class"])) : vueExports.createCommentVNode("", true),
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group.items, (item, index) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                    key: `group-${group.id}-${index}`,
                                    item,
                                    index,
                                    group
                                  }, null, 8, ["item", "index", "group"]);
                                }), 128))
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<div data-slot="empty" class="${ssrRenderClass_1(ui.value.empty({ class: vueExports.unref(uiProp)?.empty }))}"${_scopeId2}>`);
                    ssrRenderSlot_1(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                      _push3(`${ssrInterpolate_1(searchTerm.value ? vueExports.unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("commandPalette.noData"))}`);
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    filteredGroups.value?.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 0,
                      role: "presentation",
                      "data-slot": "viewport",
                      class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                    }, [
                      !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxVirtualizer_default), vueExports.mergeProps({
                        key: 0,
                        options: filteredItems.value,
                        "text-content": (item2) => vueExports.unref(get$1)(item2, props.labelKey)
                      }, virtualizerProps.value), {
                        default: vueExports.withCtx(({ option: item, virtualItem }) => [
                          vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                            item,
                            index: virtualItem.index
                          }, null, 8, ["item", "index"])
                        ]),
                        _: 1
                      }, 16, ["options", "text-content"])) : (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 1 }, vueExports.renderList(filteredGroups.value, (group) => {
                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroup_default), {
                          key: `group-${group.id}`,
                          "data-slot": "group",
                          class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.unref(get$1)(group, props.labelKey) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroupLabel_default), {
                              key: 0,
                              "data-slot": "label",
                              class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(group, props.labelKey)), 1)
                              ]),
                              _: 2
                            }, 1032, ["class"])) : vueExports.createCommentVNode("", true),
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group.items, (item, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                key: `group-${group.id}-${index}`,
                                item,
                                index,
                                group
                              }, null, 8, ["item", "index", "group"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ], 2)) : (vueExports.openBlock(), vueExports.createBlock("div", {
                      key: 1,
                      "data-slot": "empty",
                      class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("commandPalette.noData")), 1)
                      ])
                    ], 2))
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            if (!!slots.footer) {
              _push2(`<div data-slot="footer" class="${ssrRenderClass_1(ui.value.footer({ class: vueExports.unref(uiProp)?.footer }))}"${_scopeId}>`);
              ssrRenderSlot_1(_ctx.$slots, "footer", { ui: ui.value }, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.input ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxFilter_default), {
                key: 0,
                modelValue: searchTerm.value,
                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                "as-child": ""
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(_sfc_main$j, vueExports.mergeProps({
                    variant: "none",
                    size: __props.size
                  }, typeof props.input === "object" ? props.input : {}, {
                    placeholder: placeholder.value,
                    autofocus: __props.autofocus,
                    loading: __props.loading,
                    "loading-icon": __props.loadingIcon,
                    "trailing-icon": __props.trailingIcon,
                    icon: __props.icon || vueExports.unref(appConfig).ui.icons.search,
                    "data-slot": "input",
                    class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                    onKeydown: vueExports.withKeys(onBackspace, ["backspace"])
                  }), vueExports.createSlots({ _: 2 }, [
                    history.value?.length && (__props.back || !!slots.back) ? {
                      name: "leading",
                      fn: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "back", { ui: ui.value }, () => [
                          vueExports.createVNode(_sfc_main$a$1, vueExports.mergeProps({
                            size: __props.size,
                            icon: __props.backIcon || vueExports.unref(appConfig).ui.icons.arrowLeft,
                            color: "neutral",
                            variant: "link",
                            "aria-label": vueExports.unref(t)("commandPalette.back")
                          }, typeof __props.back === "object" ? __props.back : {}, {
                            "data-slot": "back",
                            class: ui.value.back({ class: vueExports.unref(uiProp)?.back }),
                            onClick: navigateBack
                          }), null, 16, ["size", "icon", "aria-label", "class"])
                        ])
                      ]),
                      key: "0"
                    } : void 0,
                    __props.close || !!slots.close ? {
                      name: "trailing",
                      fn: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "close", { ui: ui.value }, () => [
                          __props.close ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$a$1, vueExports.mergeProps({
                            key: 0,
                            size: __props.size,
                            icon: __props.closeIcon || vueExports.unref(appConfig).ui.icons.close,
                            color: "neutral",
                            variant: "ghost",
                            "aria-label": vueExports.unref(t)("commandPalette.close")
                          }, typeof __props.close === "object" ? __props.close : {}, {
                            "data-slot": "close",
                            class: ui.value.close({ class: vueExports.unref(uiProp)?.close }),
                            onClick: ($event) => emits("update:open", false)
                          }), null, 16, ["size", "icon", "aria-label", "class", "onClick"])) : vueExports.createCommentVNode("", true)
                        ])
                      ]),
                      key: "1"
                    } : void 0
                  ]), 1040, ["size", "placeholder", "autofocus", "loading", "loading-icon", "trailing-icon", "icon", "class"])
                ]),
                _: 3
              }, 8, ["modelValue", "onUpdate:modelValue"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(ListboxContent_default), {
                "data-slot": "content",
                class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
              }, {
                default: vueExports.withCtx(() => [
                  filteredGroups.value?.length ? (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 0,
                    role: "presentation",
                    "data-slot": "viewport",
                    class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                  }, [
                    !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxVirtualizer_default), vueExports.mergeProps({
                      key: 0,
                      options: filteredItems.value,
                      "text-content": (item2) => vueExports.unref(get$1)(item2, props.labelKey)
                    }, virtualizerProps.value), {
                      default: vueExports.withCtx(({ option: item, virtualItem }) => [
                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                          item,
                          index: virtualItem.index
                        }, null, 8, ["item", "index"])
                      ]),
                      _: 1
                    }, 16, ["options", "text-content"])) : (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, { key: 1 }, vueExports.renderList(filteredGroups.value, (group) => {
                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroup_default), {
                        key: `group-${group.id}`,
                        "data-slot": "group",
                        class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.unref(get$1)(group, props.labelKey) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroupLabel_default), {
                            key: 0,
                            "data-slot": "label",
                            class: ui.value.label({ class: vueExports.unref(uiProp)?.label })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get$1)(group, props.labelKey)), 1)
                            ]),
                            _: 2
                          }, 1032, ["class"])) : vueExports.createCommentVNode("", true),
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group.items, (item, index) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                              key: `group-${group.id}-${index}`,
                              item,
                              index,
                              group
                            }, null, 8, ["item", "index", "group"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"]);
                    }), 128))
                  ], 2)) : (vueExports.openBlock(), vueExports.createBlock("div", {
                    key: 1,
                    "data-slot": "empty",
                    class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("commandPalette.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("commandPalette.noData")), 1)
                    ])
                  ], 2))
                ]),
                _: 3
              }, 8, ["class"]),
              !!slots.footer ? (vueExports.openBlock(), vueExports.createBlock("div", {
                key: 1,
                "data-slot": "footer",
                class: ui.value.footer({ class: vueExports.unref(uiProp)?.footer })
              }, [
                vueExports.renderSlot(_ctx.$slots, "footer", { ui: ui.value })
              ], 2)) : vueExports.createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/CommandPalette.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "modal": "",
    "input": ""
  },
  "variants": {
    "fullscreen": {
      "false": {
        "modal": "sm:max-w-3xl h-full sm:h-[28rem]"
      }
    },
    "size": {
      "xs": {},
      "sm": {},
      "md": {},
      "lg": {},
      "xl": {}
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;
const shiftableKeys = ["arrowleft", "arrowright", "arrowup", "arrowright", "tab", "escape", "enter", "backspace"];
function convertKeyToCode(key) {
  if (/^[a-z]$/i.test(key)) {
    return `Key${key.toUpperCase()}`;
  }
  if (/^\d$/.test(key)) {
    return `Digit${key}`;
  }
  if (/^f\d+$/i.test(key)) {
    return key.toUpperCase();
  }
  const specialKeys = {
    space: "Space",
    enter: "Enter",
    escape: "Escape",
    tab: "Tab",
    backspace: "Backspace",
    delete: "Delete",
    arrowup: "ArrowUp",
    arrowdown: "ArrowDown",
    arrowleft: "ArrowLeft",
    arrowright: "ArrowRight"
  };
  return specialKeys[key.toLowerCase()] || key;
}
function defineShortcuts(config, options = {}) {
  const chainedInputs = vueExports.ref([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn$1(clearChainedInput, options.chainDelay ?? 800);
  const { macOS } = useKbd();
  const activeElement = useActiveElement();
  const layoutIndependent = options.layoutIndependent ?? false;
  const shiftableCodes = shiftableKeys.map((k) => convertKeyToCode(k));
  const onKeyDown = (e) => {
    if (!e.key) {
      return;
    }
    const alphabetKey = layoutIndependent ? /^Key[A-Z]$/i.test(e.code) : /^[a-z]{1}$/i.test(e.key);
    const shiftableKey = layoutIndependent ? shiftableCodes.includes(e.code) : shiftableKeys.includes(e.key.toLowerCase());
    let chainedKey;
    chainedInputs.value.push(layoutIndependent ? e.code : e.key);
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join("-");
      for (const shortcut of shortcuts.value.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }
        if (shortcut.enabled) {
          e.preventDefault();
          shortcut.handler(e);
        }
        clearChainedInput();
        return;
      }
    }
    for (const shortcut of shortcuts.value.filter((s) => !s.chained)) {
      if (layoutIndependent) {
        if (e.code !== shortcut.key) {
          continue;
        }
      } else {
        if (e.key.toLowerCase() !== shortcut.key) {
          continue;
        }
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      if (e.altKey !== shortcut.altKey) {
        continue;
      }
      if ((alphabetKey || shiftableKey || shortcut.shiftKey || e.shiftKey && (e.metaKey || e.ctrlKey)) && e.shiftKey !== shortcut.shiftKey) {
        continue;
      }
      if (shortcut.enabled) {
        e.preventDefault();
        shortcut.handler(e);
      }
      clearChainedInput();
      return;
    }
    debouncedClearChainedInput();
  };
  const usingInput = vueExports.computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;
    const usingInput2 = !!(tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable === "true" || contentEditable === "plaintext-only");
    if (usingInput2) {
      return activeElement.value?.name || true;
    }
    return false;
  });
  const shortcuts = vueExports.computed(() => {
    return Object.entries(vueExports.toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null;
      }
      let shortcut;
      if (key.includes("-") && key !== "-" && !key.includes("_") && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      const chained = key.includes("-") && key !== "-" && !key.includes("_");
      if (chained) {
        if (layoutIndependent) {
          const parts = key.split("-").map((p) => convertKeyToCode(p));
          shortcut = {
            key: parts.join("-"),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        } else {
          shortcut = {
            key: key.toLowerCase(),
            metaKey: false,
            ctrlKey: false,
            shiftKey: false,
            altKey: false
          };
        }
      } else {
        const keySplit = key.toLowerCase().split("_").map((k) => k);
        let baseKey = keySplit.filter((k) => !["meta", "command", "ctrl", "shift", "alt", "option"].includes(k)).join("_");
        if (layoutIndependent) {
          baseKey = convertKeyToCode(baseKey);
        }
        shortcut = {
          key: baseKey,
          metaKey: keySplit.includes("meta") || keySplit.includes("command"),
          ctrlKey: keySplit.includes("ctrl"),
          shiftKey: keySplit.includes("shift"),
          altKey: keySplit.includes("alt") || keySplit.includes("option")
        };
      }
      shortcut.chained = chained;
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false;
        shortcut.ctrlKey = true;
      }
      if (typeof shortcutConfig === "function") {
        shortcut.handler = shortcutConfig;
      } else if (typeof shortcutConfig === "object") {
        shortcut = { ...shortcut, handler: shortcutConfig.handler };
      }
      if (!shortcut.handler) {
        console.trace("[Shortcut] Invalid value");
        return null;
      }
      let enabled = true;
      if (!shortcutConfig.usingInput) {
        enabled = !usingInput.value;
      } else if (typeof shortcutConfig.usingInput === "string") {
        enabled = usingInput.value === shortcutConfig.usingInput;
      }
      shortcut.enabled = enabled;
      return shortcut;
    }).filter(Boolean);
  });
  return useEventListener$1("keydown", onKeyDown);
}
const _sfc_main$2 = {
  __name: "UDashboardSearch",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    size: { type: null, required: false },
    icon: { type: null, required: false },
    placeholder: { type: String, required: false },
    autofocus: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: null, required: false },
    shortcut: { type: String, required: false, default: "meta_k" },
    groups: { type: Array, required: false },
    fuse: { type: Object, required: false },
    colorMode: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    title: { type: String, required: false },
    description: { type: String, required: false },
    overlay: { type: Boolean, required: false },
    transition: { type: Boolean, required: false },
    content: { type: Object, required: false },
    dismissible: { type: Boolean, required: false },
    fullscreen: { type: Boolean, required: false, default: false },
    modal: { type: Boolean, required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {},
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: ["update:open", "update:searchTerm"],
  setup(__props, { expose: __expose }) {
    const props = __props;
    const slots = vueExports.useSlots();
    const open = vueExports.useModel(__props, "open", { type: Boolean, ...{ default: false } });
    const searchTerm = vueExports.useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    useRuntimeHook("dashboard:search:toggle", () => {
      open.value = !open.value;
    });
    const { t } = useLocale();
    const colorMode = useColorMode();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("dashboardSearch", props);
    const commandPaletteProps = useForwardProps(reactivePick(props, "size", "icon", "placeholder", "autofocus", "loading", "loadingIcon", "close", "closeIcon"));
    const modalProps = useForwardProps(reactivePick(props, "overlay", "transition", "content", "dismissible", "fullscreen", "modal", "portal"));
    const getProxySlots = () => omit(slots, ["content"]);
    const fuse = vueExports.computed(() => defu({}, props.fuse, {
      fuseOptions: {}
    }));
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.dashboardSearch || {} })({
      size: props.size,
      fullscreen: props.fullscreen
    }));
    const groups = vueExports.computed(() => {
      const groups2 = [];
      groups2.push(...props.groups || []);
      if (props.colorMode && !colorMode?.forced) {
        groups2.push({
          id: "theme",
          label: t("dashboardSearch.theme"),
          items: [{
            label: t("colorMode.system"),
            icon: appConfig.ui.icons.system,
            active: colorMode.preference === "system",
            onSelect: () => {
              colorMode.preference = "system";
            }
          }, {
            label: t("colorMode.light"),
            icon: appConfig.ui.icons.light,
            active: colorMode.preference === "light",
            onSelect: () => {
              colorMode.preference = "light";
            }
          }, {
            label: t("colorMode.dark"),
            icon: appConfig.ui.icons.dark,
            active: colorMode.preference === "dark",
            onSelect: () => {
              colorMode.preference = "dark";
            }
          }]
        });
      }
      return groups2;
    });
    const commandPaletteRef = vueExports.useTemplateRef("commandPaletteRef");
    function onSelect(item) {
      if (item.disabled) {
        return;
      }
      open.value = false;
      searchTerm.value = "";
    }
    defineShortcuts({
      [props.shortcut]: {
        usingInput: true,
        handler: () => open.value = !open.value
      }
    });
    __expose({
      commandPaletteRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(_sfc_main$f, vueExports.mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: __props.title || vueExports.unref(t)("dashboardSearch.title"),
        description: __props.description || vueExports.unref(t)("dashboardSearch.description")
      }, vueExports.unref(modalProps), {
        "data-slot": "modal",
        class: ui.value.modal({ class: [vueExports.unref(uiProp)?.modal, props.class] })
      }, _attrs), {
        content: vueExports.withCtx((contentData, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "content", contentData, () => {
              _push2(ssrRenderComponent_1(_sfc_main$3, vueExports.mergeProps({
                ref_key: "commandPaletteRef",
                ref: commandPaletteRef,
                "search-term": searchTerm.value,
                "onUpdate:searchTerm": ($event) => searchTerm.value = $event
              }, vueExports.unref(commandPaletteProps), {
                groups: groups.value,
                fuse: fuse.value,
                input: { fixed: true },
                ui: vueExports.unref(transformUI)(vueExports.unref(omit)(ui.value, ["modal"]), vueExports.unref(uiProp)),
                "onUpdate:modelValue": onSelect,
                "onUpdate:open": ($event) => open.value = $event
              }), vueExports.createSlots({ _: 2 }, [
                vueExports.renderList(getProxySlots(), (_, name) => {
                  return {
                    name,
                    fn: vueExports.withCtx((slotData, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        ssrRenderSlot_1(_ctx.$slots, name, slotData, null, _push3, _parent3, _scopeId2);
                      } else {
                        return [
                          vueExports.renderSlot(_ctx.$slots, name, slotData)
                        ];
                      }
                    })
                  };
                })
              ]), _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "content", contentData, () => [
                vueExports.createVNode(_sfc_main$3, vueExports.mergeProps({
                  ref_key: "commandPaletteRef",
                  ref: commandPaletteRef,
                  "search-term": searchTerm.value,
                  "onUpdate:searchTerm": ($event) => searchTerm.value = $event
                }, vueExports.unref(commandPaletteProps), {
                  groups: groups.value,
                  fuse: fuse.value,
                  input: { fixed: true },
                  ui: vueExports.unref(transformUI)(vueExports.unref(omit)(ui.value, ["modal"]), vueExports.unref(uiProp)),
                  "onUpdate:modelValue": onSelect,
                  "onUpdate:open": ($event) => open.value = $event
                }), vueExports.createSlots({ _: 2 }, [
                  vueExports.renderList(getProxySlots(), (_, name) => {
                    return {
                      name,
                      fn: vueExports.withCtx((slotData) => [
                        vueExports.renderSlot(_ctx.$slots, name, slotData)
                      ])
                    };
                  })
                ]), 1040, ["search-term", "onUpdate:searchTerm", "groups", "fuse", "ui", "onUpdate:open"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/DashboardSearch.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ vueExports.defineComponent({
  __name: "BranchSelector",
  __ssrInlineRender: true,
  props: {
    collapsed: { type: Boolean }
  },
  async setup(__props) {
    let __temp, __restore;
    const branchStore = useBranchStore();
    [__temp, __restore] = vueExports.withAsyncContext(() => branchStore.ensureLoaded()), await __temp, __restore();
    const options = vueExports.computed(
      () => branchStore.branches.map((branch) => ({
        label: branch.name,
        value: branch.id
      }))
    );
    const activeBranchId = vueExports.computed({
      get: () => branchStore.activeBranchId ?? void 0,
      set: (value) => branchStore.setActiveBranch(value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = _sfc_main$i;
      _push(`<div${ssrRenderAttrs_1(vueExports.mergeProps({ class: "w-full" }, _attrs))}>`);
      _push(ssrRenderComponent_1(_component_USelectMenu, {
        modelValue: vueExports.unref(activeBranchId),
        "onUpdate:modelValue": ($event) => vueExports.isRef(activeBranchId) ? activeBranchId.value = $event : null,
        class: "w-full",
        color: "neutral",
        items: vueExports.unref(options),
        placeholder: __props.collapsed ? "Филиал" : "Выберите филиал",
        "value-key": "value"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/app/BranchSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BranchSelector = Object.assign(_sfc_main$1, { __name: "AppBranchSelector" });
function useDashboardNavigation() {
  const route = useRoute();
  const { openCalculator } = useCalculatorModal();
  const primaryLinks = [[
    { icon: "i-lucide-layout-dashboard", label: "Обзор", to: "/" },
    { icon: "i-lucide-monitor-smartphone", label: "Киоск", to: "/kiosk" },
    { icon: "i-lucide-badge-dollar-sign", label: "Услуги", to: "/services" },
    { icon: "i-lucide-history", label: "История", to: "/history" },
    { icon: "i-lucide-scroll-text", label: "История барбера", to: "/history/barber" },
    { icon: "i-lucide-chart-column-big", label: "Статистика", to: "/statistics" },
    { icon: "i-lucide-ticket-percent", label: "Промокоды", to: "/promo-codes" },
    { icon: "i-lucide-id-card", label: "Сертификаты", to: "/certificates" },
    { icon: "i-lucide-image-up", label: "Баннеры маркетплейса", to: "/marketplace/banners" },
    { icon: "i-lucide-code-xml", label: "Отладка API", to: "/api-debug" }
  ]];
  const supportLinks = [[
    { icon: "i-lucide-heart-pulse", label: "Проверка API", to: "/api-debug?preset=health" },
    { icon: "i-lucide-book-open", label: "Шаблон панели Nuxt UI", target: "_blank", to: "https://dashboard-template.nuxt.dev/" }
  ]];
  const searchGroups = vueExports.computed(() => [
    {
      id: "dashboard",
      items: primaryLinks.flat(),
      label: "Панель"
    },
    {
      id: "tools",
      items: [{
        description: "Открыть модальный калькулятор для быстрых вычислений",
        icon: "i-lucide-calculator",
        label: "Калькулятор",
        onSelect: () => openCalculator()
      }],
      label: "Инструменты"
    },
    {
      id: "support",
      items: [
        {
          icon: "i-lucide-file-code-2",
          label: "Открыть исходник текущей страницы",
          target: "_blank",
          to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === "/" ? "/index" : route.path}.vue`
        },
        ...supportLinks.flat()
      ],
      label: "Поддержка"
    }
  ]);
  return {
    primaryLinks,
    searchGroups,
    supportLinks
  };
}
const _sfc_main = /* @__PURE__ */ vueExports.defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const open = vueExports.ref(false);
    const branchStore = useBranchStore();
    const sessionStore = useSessionStore();
    const { primaryLinks, searchGroups, supportLinks } = useDashboardNavigation();
    [__temp, __restore] = vueExports.withAsyncContext(() => Promise.all([
      branchStore.ensureLoaded(),
      sessionStore.ensureLoaded()
    ])), await __temp, __restore();
    function closeSidebar() {
      open.value = false;
    }
    const mainLinks = vueExports.computed(
      () => (primaryLinks[0] || []).map((item) => ({
        ...item,
        onSelect: closeSidebar
      }))
    );
    const utilityLinks = vueExports.computed(
      () => (supportLinks[0] || []).map((item) => ({
        ...item,
        onSelect: closeSidebar
      }))
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UDashboardGroup = _sfc_main$e;
      const _component_UDashboardSidebar = _sfc_main$b;
      const _component_UDashboardSearchButton = _sfc_main$a;
      const _component_AppCalculatorModal = __nuxt_component_3;
      const _component_UNavigationMenu = _sfc_main$7;
      const _component_AppUserMenu = __nuxt_component_5;
      const _component_UDashboardSearch = _sfc_main$2;
      _push(ssrRenderComponent_1(_component_UDashboardGroup, vueExports.mergeProps({ unit: "rem" }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(_component_UDashboardSidebar, {
              id: "main",
              open: vueExports.unref(open),
              "onUpdate:open": ($event) => vueExports.isRef(open) ? open.value = $event : null,
              collapsible: "",
              resizable: "",
              class: "bg-white/70 backdrop-blur-xl",
              ui: {
                footer: "lg:border-t lg:border-default/70",
                header: "border-b border-default/70"
              }
            }, {
              header: vueExports.withCtx(({ collapsed }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent_1(BranchSelector, { collapsed }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    vueExports.createVNode("div", { class: "w-full space-y-4" }, [
                      vueExports.createVNode(BranchSelector, { collapsed }, null, 8, ["collapsed"])
                    ])
                  ];
                }
              }),
              default: vueExports.withCtx(({ collapsed }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_UDashboardSearchButton, {
                    collapsed,
                    class: "bg-transparent ring-default"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_AppCalculatorModal, {
                    collapsed,
                    "show-modal": false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UNavigationMenu, {
                    collapsed,
                    items: vueExports.unref(mainLinks),
                    class: "mt-4",
                    orientation: "vertical",
                    tooltip: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent_1(_component_UNavigationMenu, {
                    collapsed,
                    items: vueExports.unref(utilityLinks),
                    class: "mt-auto",
                    orientation: "vertical",
                    tooltip: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_UDashboardSearchButton, {
                      collapsed,
                      class: "bg-transparent ring-default"
                    }, null, 8, ["collapsed"]),
                    vueExports.createVNode(_component_AppCalculatorModal, {
                      collapsed,
                      "show-modal": false
                    }, null, 8, ["collapsed"]),
                    vueExports.createVNode(_component_UNavigationMenu, {
                      collapsed,
                      items: vueExports.unref(mainLinks),
                      class: "mt-4",
                      orientation: "vertical",
                      tooltip: ""
                    }, null, 8, ["collapsed", "items"]),
                    vueExports.createVNode(_component_UNavigationMenu, {
                      collapsed,
                      items: vueExports.unref(utilityLinks),
                      class: "mt-auto",
                      orientation: "vertical",
                      tooltip: ""
                    }, null, 8, ["collapsed", "items"])
                  ];
                }
              }),
              footer: vueExports.withCtx(({ collapsed }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(_component_AppUserMenu, { collapsed }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(_component_AppUserMenu, { collapsed }, null, 8, ["collapsed"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_UDashboardSearch, {
              groups: vueExports.unref(searchGroups),
              description: "Быстрый переход по разделам и действиям панели.",
              title: "Поиск по панели"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(_component_AppCalculatorModal, { "show-trigger": false }, null, _parent2, _scopeId));
            ssrRenderSlot_1(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.createVNode(_component_UDashboardSidebar, {
                id: "main",
                open: vueExports.unref(open),
                "onUpdate:open": ($event) => vueExports.isRef(open) ? open.value = $event : null,
                collapsible: "",
                resizable: "",
                class: "bg-white/70 backdrop-blur-xl",
                ui: {
                  footer: "lg:border-t lg:border-default/70",
                  header: "border-b border-default/70"
                }
              }, {
                header: vueExports.withCtx(({ collapsed }) => [
                  vueExports.createVNode("div", { class: "w-full space-y-4" }, [
                    vueExports.createVNode(BranchSelector, { collapsed }, null, 8, ["collapsed"])
                  ])
                ]),
                default: vueExports.withCtx(({ collapsed }) => [
                  vueExports.createVNode(_component_UDashboardSearchButton, {
                    collapsed,
                    class: "bg-transparent ring-default"
                  }, null, 8, ["collapsed"]),
                  vueExports.createVNode(_component_AppCalculatorModal, {
                    collapsed,
                    "show-modal": false
                  }, null, 8, ["collapsed"]),
                  vueExports.createVNode(_component_UNavigationMenu, {
                    collapsed,
                    items: vueExports.unref(mainLinks),
                    class: "mt-4",
                    orientation: "vertical",
                    tooltip: ""
                  }, null, 8, ["collapsed", "items"]),
                  vueExports.createVNode(_component_UNavigationMenu, {
                    collapsed,
                    items: vueExports.unref(utilityLinks),
                    class: "mt-auto",
                    orientation: "vertical",
                    tooltip: ""
                  }, null, 8, ["collapsed", "items"])
                ]),
                footer: vueExports.withCtx(({ collapsed }) => [
                  vueExports.createVNode(_component_AppUserMenu, { collapsed }, null, 8, ["collapsed"])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"]),
              vueExports.createVNode(_component_UDashboardSearch, {
                groups: vueExports.unref(searchGroups),
                description: "Быстрый переход по разделам и действиям панели.",
                title: "Поиск по панели"
              }, null, 8, ["groups"]),
              vueExports.createVNode(_component_AppCalculatorModal, { "show-trigger": false }),
              vueExports.renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/default-PVvTKQMr');
//# sourceMappingURL=default-PVvTKQMr.mjs.map
