globalThis.__timing__.logStart('Load chunks/_/RovingFocusItem');import { u as useId } from './useId.mjs';
import { C as useCollection, P as Primitive } from '../build/server.mjs';
import { g as getFocusIntent, w as wrapArray, f as focusFirst } from './utils.mjs';
import { i as injectRovingFocusGroupContext } from './RovingFocusGroup.mjs';
import { v as vueExports } from '../routes/renderer.mjs';

//#region src/RovingFocus/RovingFocusItem.vue?vue&type=script&setup=true&lang.ts
var RovingFocusItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "RovingFocusItem",
	props: {
		tabStopId: {
			type: String,
			required: false
		},
		focusable: {
			type: Boolean,
			required: false,
			default: true
		},
		active: {
			type: Boolean,
			required: false
		},
		allowShiftKey: {
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
		const props = __props;
		const context = injectRovingFocusGroupContext();
		const randomId = useId();
		const id = vueExports.computed(() => props.tabStopId || randomId);
		const isCurrentTabStop = vueExports.computed(() => context.currentTabStopId.value === id.value);
		const { getItems, CollectionItem } = useCollection();
		vueExports.onMounted(() => {
			if (props.focusable) context.onFocusableItemAdd();
		});
		vueExports.onUnmounted(() => {
			if (props.focusable) context.onFocusableItemRemove();
		});
		function handleKeydown(event) {
			if (event.key === "Tab" && event.shiftKey) {
				context.onItemShiftTab();
				return;
			}
			if (event.target !== event.currentTarget) return;
			const focusIntent = getFocusIntent(event, context.orientation.value, context.dir.value);
			if (focusIntent !== void 0) {
				if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey)) return;
				event.preventDefault();
				let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
				if (focusIntent === "last") candidateNodes.reverse();
				else if (focusIntent === "prev" || focusIntent === "next") {
					if (focusIntent === "prev") candidateNodes.reverse();
					const currentIndex = candidateNodes.indexOf(event.currentTarget);
					candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
				}
				vueExports.nextTick(() => focusFirst(candidateNodes));
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					tabindex: isCurrentTabStop.value ? 0 : -1,
					"data-orientation": vueExports.unref(context).orientation.value,
					"data-active": _ctx.active ? "" : void 0,
					"data-disabled": !_ctx.focusable ? "" : void 0,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					onMousedown: _cache[0] || (_cache[0] = (event) => {
						if (!_ctx.focusable) event.preventDefault();
						else vueExports.unref(context).onItemFocus(id.value);
					}),
					onFocus: _cache[1] || (_cache[1] = ($event) => vueExports.unref(context).onItemFocus(id.value)),
					onKeydown: handleKeydown
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"tabindex",
					"data-orientation",
					"data-active",
					"data-disabled",
					"as",
					"as-child"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/RovingFocus/RovingFocusItem.vue
var RovingFocusItem_default = RovingFocusItem_vue_vue_type_script_setup_true_lang_default;

export { RovingFocusItem_default as R };;globalThis.__timing__.logEnd('Load chunks/_/RovingFocusItem');
//# sourceMappingURL=RovingFocusItem.mjs.map
