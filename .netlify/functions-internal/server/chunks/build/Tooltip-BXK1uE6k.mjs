globalThis.__timing__.logStart('Load chunks/build/Tooltip-BXK1uE6k');import { A as refAutoReset, ax as tryOnScopeDispose, ay as createEventHook, m as useForwardExpose, az as injectTooltipProviderContext, E as useVModel, aA as useTimeoutFn, F as createContext, aB as useEventListener, I as DismissableLayer_default, aq as VisuallyHidden_default, k as useForwardProps, J as useForwardPropsEmits, K as Presence_default, T as Teleport_default, P as Primitive, h as useAppConfig, i as useComponentUI, t as tv, L as reactivePick, M as usePortal, N as defu, aC as createSharedComposable } from './server.mjs';
import { c as PopperArrow_default, a as PopperRoot_default, b as PopperContent_default, P as PopperAnchor_default } from '../_/PopperArrow.mjs';
import { v as vueExports, s as ssrRenderComponent_1, a as ssrRenderSlot_1, c as ssrInterpolate_1, b as ssrRenderClass_1, d as ssrRenderList_1 } from '../routes/renderer.mjs';
import { u as useId } from '../_/useId.mjs';

//#region src/shared/useGraceArea.ts
function useGraceArea(triggerElement, containerElement) {
	const isPointerInTransit = refAutoReset(false, 300);
	tryOnScopeDispose(() => {
		isPointerInTransit.value = false;
	});
	const pointerGraceArea = vueExports.ref(null);
	const pointerExit = createEventHook();
	function handleRemoveGraceArea() {
		pointerGraceArea.value = null;
		isPointerInTransit.value = false;
	}
	function handleCreateGraceArea(event, hoverTarget) {
		const currentTarget = event.currentTarget;
		const exitPoint = {
			x: event.clientX,
			y: event.clientY
		};
		const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
		const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide, 1);
		const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
		const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
		pointerGraceArea.value = graceArea;
		isPointerInTransit.value = true;
	}
	vueExports.watchEffect((cleanupFn) => {
		if (triggerElement.value && containerElement.value) {
			const handleTriggerLeave = (event) => handleCreateGraceArea(event, containerElement.value);
			const handleContentLeave = (event) => handleCreateGraceArea(event, triggerElement.value);
			triggerElement.value.addEventListener("pointerleave", handleTriggerLeave);
			containerElement.value.addEventListener("pointerleave", handleContentLeave);
			cleanupFn(() => {
				triggerElement.value?.removeEventListener("pointerleave", handleTriggerLeave);
				containerElement.value?.removeEventListener("pointerleave", handleContentLeave);
			});
		}
	});
	vueExports.watchEffect((cleanupFn) => {
		if (pointerGraceArea.value) {
			const handleTrackPointerGrace = (event) => {
				if (!pointerGraceArea.value || !(event.target instanceof Element)) return;
				const target = event.target;
				const pointerPosition = {
					x: event.clientX,
					y: event.clientY
				};
				const hasEnteredTarget = triggerElement.value?.contains(target) || containerElement.value?.contains(target);
				const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea.value);
				const isAnotherGraceAreaTrigger = !!target.closest("[data-grace-area-trigger]");
				if (hasEnteredTarget) handleRemoveGraceArea();
				else if (isPointerOutsideGraceArea || isAnotherGraceAreaTrigger) {
					handleRemoveGraceArea();
					pointerExit.trigger();
				}
			};
			triggerElement.value?.ownerDocument.addEventListener("pointermove", handleTrackPointerGrace);
			cleanupFn(() => triggerElement.value?.ownerDocument.removeEventListener("pointermove", handleTrackPointerGrace));
		}
	});
	return {
		isPointerInTransit,
		onPointerExit: pointerExit.on
	};
}
function getExitSideFromRect(point, rect) {
	const top = Math.abs(rect.top - point.y);
	const bottom = Math.abs(rect.bottom - point.y);
	const right = Math.abs(rect.right - point.x);
	const left = Math.abs(rect.left - point.x);
	switch (Math.min(top, bottom, right, left)) {
		case left: return "left";
		case right: return "right";
		case top: return "top";
		case bottom: return "bottom";
		default: throw new Error("unreachable");
	}
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
	const paddedExitPoints = [];
	switch (exitSide) {
		case "top":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "bottom":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			});
			break;
		case "left":
			paddedExitPoints.push({
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "right":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			});
			break;
	}
	return paddedExitPoints;
}
function getPointsFromRect(rect) {
	const { top, right, bottom, left } = rect;
	return [
		{
			x: left,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		}
	];
}
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const xi = polygon[i].x;
		const yi = polygon[i].y;
		const xj = polygon[j].x;
		const yj = polygon[j].y;
		const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
		if (intersect) inside = !inside;
	}
	return inside;
}
function getHull(points) {
	const newPoints = points.slice();
	newPoints.sort((a, b) => {
		if (a.x < b.x) return -1;
		else if (a.x > b.x) return 1;
		else if (a.y < b.y) return -1;
		else if (a.y > b.y) return 1;
		else return 0;
	});
	return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
	if (points.length <= 1) return points.slice();
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		while (upperHull.length >= 2) {
			const q = upperHull[upperHull.length - 1];
			const r = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p = points[i];
		while (lowerHull.length >= 2) {
			const q = lowerHull[lowerHull.length - 1];
			const r = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();
	if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
	else return upperHull.concat(lowerHull);
}

//#region src/Tooltip/TooltipArrow.vue?vue&type=script&setup=true&lang.ts
var TooltipArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipArrow",
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
//#region src/Tooltip/TooltipArrow.vue
var TooltipArrow_default = TooltipArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/utils.ts
const TOOLTIP_OPEN = "tooltip.open";

//#region src/Tooltip/TooltipRoot.vue?vue&type=script&setup=true&lang.ts
const [injectTooltipRootContext, provideTooltipRootContext] = createContext("TooltipRoot");
var TooltipRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipRoot",
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
		delayDuration: {
			type: Number,
			required: false,
			default: void 0
		},
		disableHoverableContent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disableClosingTrigger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		ignoreNonKeyboardFocus: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["update:open"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		useForwardExpose();
		const providerContext = injectTooltipProviderContext();
		const disableHoverableContent = vueExports.computed(() => props.disableHoverableContent ?? providerContext.disableHoverableContent.value);
		const disableClosingTrigger = vueExports.computed(() => props.disableClosingTrigger ?? providerContext.disableClosingTrigger.value);
		const disableTooltip = vueExports.computed(() => props.disabled ?? providerContext.disabled.value);
		const delayDuration = vueExports.computed(() => props.delayDuration ?? providerContext.delayDuration.value);
		const ignoreNonKeyboardFocus = vueExports.computed(() => props.ignoreNonKeyboardFocus ?? providerContext.ignoreNonKeyboardFocus.value);
		const open = useVModel(props, "open", emit, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		vueExports.watch(open, (isOpen) => {
			if (!providerContext.onClose) return;
			if (isOpen) {
				providerContext.onOpen();
				document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
			} else providerContext.onClose();
		});
		const wasOpenDelayedRef = vueExports.ref(false);
		const trigger = vueExports.ref();
		const stateAttribute = vueExports.computed(() => {
			if (!open.value) return "closed";
			return wasOpenDelayedRef.value ? "delayed-open" : "instant-open";
		});
		const { start: startTimer, stop: clearTimer } = useTimeoutFn(() => {
			wasOpenDelayedRef.value = true;
			open.value = true;
		}, delayDuration, { immediate: false });
		function handleOpen() {
			clearTimer();
			wasOpenDelayedRef.value = false;
			open.value = true;
		}
		function handleClose() {
			clearTimer();
			open.value = false;
		}
		function handleDelayedOpen() {
			startTimer();
		}
		provideTooltipRootContext({
			contentId: "",
			open,
			stateAttribute,
			trigger,
			onTriggerChange(el) {
				trigger.value = el;
			},
			onTriggerEnter() {
				if (providerContext.isOpenDelayed.value) handleDelayedOpen();
				else handleOpen();
			},
			onTriggerLeave() {
				if (disableHoverableContent.value) handleClose();
				else clearTimer();
			},
			onOpen: handleOpen,
			onClose: handleClose,
			disableHoverableContent,
			disableClosingTrigger,
			disabled: disableTooltip,
			ignoreNonKeyboardFocus
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
//#region src/Tooltip/TooltipRoot.vue
var TooltipRoot_default = TooltipRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/TooltipContentImpl.vue?vue&type=script&setup=true&lang.ts
var TooltipContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipContentImpl",
	props: {
		ariaLabel: {
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
		},
		side: {
			type: null,
			required: false,
			default: "top"
		},
		sideOffset: {
			type: Number,
			required: false,
			default: 0
		},
		align: {
			type: null,
			required: false,
			default: "center"
		},
		alignOffset: {
			type: Number,
			required: false
		},
		avoidCollisions: {
			type: Boolean,
			required: false,
			default: true
		},
		collisionBoundary: {
			type: null,
			required: false,
			default: () => []
		},
		collisionPadding: {
			type: [Number, Object],
			required: false,
			default: 0
		},
		arrowPadding: {
			type: Number,
			required: false,
			default: 0
		},
		sticky: {
			type: String,
			required: false,
			default: "partial"
		},
		hideWhenDetached: {
			type: Boolean,
			required: false,
			default: false
		},
		positionStrategy: {
			type: String,
			required: false
		},
		updatePositionStrategy: {
			type: String,
			required: false
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		const ariaLabel = vueExports.computed(() => props.ariaLabel || currentElement.value?.textContent);
		const popperContentProps = vueExports.computed(() => {
			const { ariaLabel: _,...restProps } = props;
			return restProps;
		});
		vueExports.onMounted(() => {
			useEventListener(window, "scroll", (event) => {
				const target = event.target;
				if (target?.contains(rootContext.trigger.value)) rootContext.onClose();
			});
			useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(DismissableLayer_default), {
				"as-child": "",
				"disable-outside-pointer-events": false,
				onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => emits("escapeKeyDown", $event)),
				onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
					if (vueExports.unref(rootContext).disableClosingTrigger.value && vueExports.unref(rootContext).trigger.value?.contains(event.target)) event.preventDefault();
					emits("pointerDownOutside", event);
				}),
				onFocusOutside: _cache[2] || (_cache[2] = vueExports.withModifiers(() => {}, ["prevent"])),
				onDismiss: _cache[3] || (_cache[3] = ($event) => vueExports.unref(rootContext).onClose())
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(PopperContent_default), vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					"data-state": vueExports.unref(rootContext).stateAttribute.value
				}, {
					..._ctx.$attrs,
					...popperContentProps.value
				}, { style: {
					"--reka-tooltip-content-transform-origin": "var(--reka-popper-transform-origin)",
					"--reka-tooltip-content-available-width": "var(--reka-popper-available-width)",
					"--reka-tooltip-content-available-height": "var(--reka-popper-available-height)",
					"--reka-tooltip-trigger-width": "var(--reka-popper-anchor-width)",
					"--reka-tooltip-trigger-height": "var(--reka-popper-anchor-height)"
				} }), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default"), vueExports.createVNode(vueExports.unref(VisuallyHidden_default), {
						id: vueExports.unref(rootContext).contentId,
						role: "tooltip"
					}, {
						default: vueExports.withCtx(() => [vueExports.createTextVNode(vueExports.toDisplayString(ariaLabel.value), 1)]),
						_: 1
					}, 8, ["id"])]),
					_: 3
				}, 16, ["data-state"])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Tooltip/TooltipContentImpl.vue
var TooltipContentImpl_default = TooltipContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/TooltipContentHoverable.vue?vue&type=script&setup=true&lang.ts
var TooltipContentHoverable_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipContentHoverable",
	props: {
		ariaLabel: {
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
		},
		side: {
			type: null,
			required: false
		},
		sideOffset: {
			type: Number,
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
		}
	},
	setup(__props) {
		const props = __props;
		const forwardedProps = useForwardProps(props);
		const { forwardRef, currentElement } = useForwardExpose();
		const { trigger, onClose } = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		const { isPointerInTransit, onPointerExit } = useGraceArea(trigger, currentElement);
		providerContext.isPointerInTransitRef = isPointerInTransit;
		onPointerExit(() => {
			onClose();
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(TooltipContentImpl_default, vueExports.mergeProps({ ref: vueExports.unref(forwardRef) }, vueExports.unref(forwardedProps)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Tooltip/TooltipContentHoverable.vue
var TooltipContentHoverable_default = TooltipContentHoverable_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/TooltipContent.vue?vue&type=script&setup=true&lang.ts
var TooltipContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		ariaLabel: {
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
		},
		side: {
			type: null,
			required: false,
			default: "top"
		},
		sideOffset: {
			type: Number,
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
		}
	},
	emits: ["escapeKeyDown", "pointerDownOutside"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectTooltipRootContext();
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
				default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(rootContext).disableHoverableContent.value ? TooltipContentImpl_default : TooltipContentHoverable_default), vueExports.mergeProps({ ref: vueExports.unref(forwardRef) }, vueExports.unref(forwarded)), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16))]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Tooltip/TooltipContent.vue
var TooltipContent_default = TooltipContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/TooltipPortal.vue?vue&type=script&setup=true&lang.ts
var TooltipPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipPortal",
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
//#region src/Tooltip/TooltipPortal.vue
var TooltipPortal_default = TooltipPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/Tooltip/TooltipTrigger.vue?vue&type=script&setup=true&lang.ts
var TooltipTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "TooltipTrigger",
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
			default: "button"
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectTooltipRootContext();
		const providerContext = injectTooltipProviderContext();
		rootContext.contentId ||= useId(void 0, "reka-tooltip-content");
		const { forwardRef, currentElement: triggerElement } = useForwardExpose();
		const isPointerDown = vueExports.ref(false);
		const hasPointerMoveOpened = vueExports.ref(false);
		const tooltipListeners = vueExports.computed(() => {
			if (rootContext.disabled.value) return {};
			return {
				click: handleClick,
				focus: handleFocus,
				pointermove: handlePointerMove,
				pointerleave: handlePointerLeave,
				pointerdown: handlePointerDown,
				blur: handleBlur
			};
		});
		vueExports.onMounted(() => {
			rootContext.onTriggerChange(triggerElement.value);
		});
		function handlePointerUp() {
			setTimeout(() => {
				isPointerDown.value = false;
			}, 1);
		}
		function handlePointerDown() {
			if (rootContext.open && !rootContext.disableClosingTrigger.value) rootContext.onClose();
			isPointerDown.value = true;
			document.addEventListener("pointerup", handlePointerUp, { once: true });
		}
		function handlePointerMove(event) {
			if (event.pointerType === "touch") return;
			if (!hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value) {
				rootContext.onTriggerEnter();
				hasPointerMoveOpened.value = true;
			}
		}
		function handlePointerLeave() {
			rootContext.onTriggerLeave();
			hasPointerMoveOpened.value = false;
		}
		function handleFocus(event) {
			if (isPointerDown.value) return;
			if (rootContext.ignoreNonKeyboardFocus.value && !event.target.matches?.(":focus-visible")) return;
			rootContext.onOpen();
		}
		function handleBlur() {
			rootContext.onClose();
		}
		function handleClick() {
			if (!rootContext.disableClosingTrigger.value) rootContext.onClose();
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					"aria-describedby": vueExports.unref(rootContext).open.value ? vueExports.unref(rootContext).contentId : void 0,
					"data-state": vueExports.unref(rootContext).stateAttribute.value,
					as: _ctx.as,
					"as-child": props.asChild,
					"data-grace-area-trigger": ""
				}, vueExports.toHandlers(tooltipListeners.value)), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"aria-describedby",
					"data-state",
					"as",
					"as-child"
				])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});

//#endregion
//#region src/Tooltip/TooltipTrigger.vue
var TooltipTrigger_default = TooltipTrigger_vue_vue_type_script_setup_true_lang_default;

const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "⊞",
  command: "⌘",
  shift: "⇧",
  control: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌦",
  backspace: "⌫",
  escape: "Esc",
  tab: "⇥",
  capslock: "⇪",
  arrowup: "↑",
  arrowright: "→",
  arrowdown: "↓",
  arrowleft: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘"
};
const _useKbd = () => {
  const macOS = vueExports.computed(() => false);
  const kbdKeysSpecificMap = vueExports.reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value;
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme$1 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans uppercase",
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
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": ""
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": "solid",
      "class": "text-inverted bg-primary"
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": "text-inverted bg-secondary"
    },
    {
      "color": "success",
      "variant": "solid",
      "class": "text-inverted bg-success"
    },
    {
      "color": "info",
      "variant": "solid",
      "class": "text-inverted bg-info"
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": "text-inverted bg-warning"
    },
    {
      "color": "error",
      "variant": "solid",
      "class": "text-inverted bg-error"
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": "ring ring-inset ring-primary/50 text-primary"
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": "ring ring-inset ring-secondary/50 text-secondary"
    },
    {
      "color": "success",
      "variant": "outline",
      "class": "ring ring-inset ring-success/50 text-success"
    },
    {
      "color": "info",
      "variant": "outline",
      "class": "ring ring-inset ring-info/50 text-info"
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": "ring ring-inset ring-warning/50 text-warning"
    },
    {
      "color": "error",
      "variant": "outline",
      "class": "ring ring-inset ring-error/50 text-error"
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": "text-primary bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": "text-secondary bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "soft",
      "class": "text-success bg-success/10"
    },
    {
      "color": "info",
      "variant": "soft",
      "class": "text-info bg-info/10"
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": "text-warning bg-warning/10"
    },
    {
      "color": "error",
      "variant": "soft",
      "class": "text-error bg-error/10"
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": "text-primary ring ring-inset ring-primary/25 bg-primary/10"
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": "text-secondary ring ring-inset ring-secondary/25 bg-secondary/10"
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": "text-success ring ring-inset ring-success/25 bg-success/10"
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": "text-info ring ring-inset ring-info/25 bg-info/10"
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": "text-warning ring ring-inset ring-warning/25 bg-warning/10"
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": "text-error ring ring-inset ring-error/25 bg-error/10"
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": "text-inverted bg-inverted"
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": "ring ring-inset ring-accented text-default bg-default"
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": "text-default bg-elevated"
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": "ring ring-inset ring-accented text-default bg-elevated"
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "color": "neutral",
    "size": "md"
  }
};
const _sfc_main$1 = {
  __name: "UKbd",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("kbd", props);
    const ui = vueExports.computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.kbd || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(Primitive), vueExports.mergeProps({
        as: __props.as,
        class: ui.value({ class: [vueExports.unref(uiProp)?.base, props.class], color: props.color, variant: props.variant, size: props.size })
      }, _attrs), {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot_1(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate_1(vueExports.unref(getKbdKey)(__props.value))}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              vueExports.renderSlot(_ctx.$slots, "default", {}, () => [
                vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(getKbdKey)(__props.value)), 1)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-bg stroke-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
    "kbdsSize": "sm"
  }
};
const _sfc_main = {
  __name: "UTooltip",
  __ssrInlineRender: true,
  props: {
    text: { type: String, required: false },
    kbds: { type: Array, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    delayDuration: { type: Number, required: false },
    disableHoverableContent: { type: Boolean, required: false },
    disableClosingTrigger: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    ignoreNonKeyboardFocus: { type: Boolean, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("tooltip", props);
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = vueExports.toRef(() => defu(props.arrow, { rounded: true }));
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.tooltip || {} })({
      side: contentProps.value.side
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent_1(vueExports.unref(TooltipRoot_default), vueExports.mergeProps(vueExports.unref(rootProps), {
        disabled: !(__props.text || __props.kbds?.length || !!slots.content) || props.disabled
      }, _attrs), {
        default: vueExports.withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent_1(vueExports.unref(TooltipTrigger_default), vueExports.mergeProps(_ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
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
            _push2(ssrRenderComponent_1(vueExports.unref(TooltipPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(TooltipContent_default), vueExports.mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot_1(_ctx.$slots, "content", { ui: ui.value }, () => {
                          if (__props.text) {
                            _push4(`<span data-slot="text" class="${ssrRenderClass_1(ui.value.text({ class: vueExports.unref(uiProp)?.text }))}"${_scopeId3}>${ssrInterpolate_1(__props.text)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.kbds?.length) {
                            _push4(`<span data-slot="kbds" class="${ssrRenderClass_1(ui.value.kbds({ class: vueExports.unref(uiProp)?.kbds }))}"${_scopeId3}><!--[-->`);
                            ssrRenderList_1(__props.kbds, (kbd, index) => {
                              _push4(ssrRenderComponent_1(_sfc_main$1, vueExports.mergeProps({
                                key: index,
                                size: vueExports.unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent_1(vueExports.unref(TooltipArrow_default), vueExports.mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                            __props.text ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "text",
                              class: ui.value.text({ class: vueExports.unref(uiProp)?.text })
                            }, vueExports.toDisplayString(__props.text), 3)) : vueExports.createCommentVNode("", true),
                            __props.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              "data-slot": "kbds",
                              class: ui.value.kbds({ class: vueExports.unref(uiProp)?.kbds })
                            }, [
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.kbds, (kbd, index) => {
                                return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1, vueExports.mergeProps({
                                  key: index,
                                  size: vueExports.unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                                }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                              }), 128))
                            ], 2)) : vueExports.createCommentVNode("", true)
                          ]),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TooltipArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
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
                    vueExports.createVNode(vueExports.unref(TooltipContent_default), vueExports.mergeProps(contentProps.value, {
                      "data-slot": "content",
                      class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                    }), {
                      default: vueExports.withCtx(() => [
                        vueExports.renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                          __props.text ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "text",
                            class: ui.value.text({ class: vueExports.unref(uiProp)?.text })
                          }, vueExports.toDisplayString(__props.text), 3)) : vueExports.createCommentVNode("", true),
                          __props.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            "data-slot": "kbds",
                            class: ui.value.kbds({ class: vueExports.unref(uiProp)?.kbds })
                          }, [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.kbds, (kbd, index) => {
                              return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1, vueExports.mergeProps({
                                key: index,
                                size: vueExports.unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                            }), 128))
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ]),
                        !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TooltipArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                          "data-slot": "arrow",
                          class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                        }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TooltipTrigger_default), vueExports.mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1040, ["reference", "class"])) : vueExports.createCommentVNode("", true),
              vueExports.createVNode(vueExports.unref(TooltipPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(TooltipContent_default), vueExports.mergeProps(contentProps.value, {
                    "data-slot": "content",
                    class: ui.value.content({ class: [!slots.default && props.class, vueExports.unref(uiProp)?.content] })
                  }), {
                    default: vueExports.withCtx(() => [
                      vueExports.renderSlot(_ctx.$slots, "content", { ui: ui.value }, () => [
                        __props.text ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "text",
                          class: ui.value.text({ class: vueExports.unref(uiProp)?.text })
                        }, vueExports.toDisplayString(__props.text), 3)) : vueExports.createCommentVNode("", true),
                        __props.kbds?.length ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          "data-slot": "kbds",
                          class: ui.value.kbds({ class: vueExports.unref(uiProp)?.kbds })
                        }, [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(__props.kbds, (kbd, index) => {
                            return vueExports.openBlock(), vueExports.createBlock(_sfc_main$1, vueExports.mergeProps({
                              key: index,
                              size: vueExports.unref(uiProp)?.kbdsSize || ui.value.kbdsSize()
                            }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                          }), 128))
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ]),
                      !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(TooltipArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
                        "data-slot": "arrow",
                        class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                      }), null, 16, ["class"])) : vueExports.createCommentVNode("", true)
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
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a, useKbd as b, useGraceArea as u };;globalThis.__timing__.logEnd('Load chunks/build/Tooltip-BXK1uE6k');
//# sourceMappingURL=Tooltip-BXK1uE6k.mjs.map
