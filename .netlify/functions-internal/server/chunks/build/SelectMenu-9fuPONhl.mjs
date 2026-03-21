globalThis.__timing__.logStart('Load chunks/build/SelectMenu-9fuPONhl');import { v as vueExports, s as ssrRenderComponent_1, b as ssrRenderClass_1, a as ssrRenderSlot_1, c as ssrInterpolate_1, d as ssrRenderList_1 } from '../routes/renderer.mjs';
import { A as refAutoReset, B as getActiveElement, m as useForwardExpose, P as Primitive, C as useCollection, D as usePrimitiveElement, E as useVModel, F as createContext, G as createEventHook, H as useParentElement, k as useForwardProps, I as DismissableLayer_default, J as useForwardPropsEmits, K as Presence_default, T as Teleport_default, l as useLocale, h as useAppConfig, i as useComponentUI, L as reactivePick, M as usePortal, N as defu, v as useFormField, w as useFieldGroup, x as useComponentIcons, t as tv, O as isArrayOfArray, Q as compare$1, R as get, j as _sfc_main$f, y as _sfc_main$d, S as _sfc_main$e, d as _sfc_main$a, z as looseToNumber, U as getDisplayValue } from './server.mjs';
import { u as useBodyScrollLock, a as useHideOthers, F as FocusScope_default } from '../_/FocusScope.mjs';
import { P as PopperAnchor_default, a as PopperRoot_default, b as PopperContent_default, c as PopperArrow_default } from '../_/PopperArrow.mjs';
import { u as useDirection, g as getFocusIntent, M as MAP_KEY_TO_FOCUS_INTENT } from '../_/utils.mjs';
import { I as isEqual } from '../_/nitro.mjs';
import { u as useFormControl, V as VisuallyHiddenInput_default } from '../_/VisuallyHiddenInput.mjs';
import { u as useId } from '../_/useId.mjs';
import { u as useVirtualizer } from '../_/index2.mjs';
import { c as createReusableTemplate } from './index-qsfWWCYt.mjs';
import { _ as _sfc_main$1 } from './Input-DcPP1NGC.mjs';

/**
* The function `findValuesBetween` takes an array and two values, then returns a subarray containing
* elements between the first occurrence of the start value and the first occurrence of the end value
* in the array.
* @param {T[]} array - The `array` parameter is an array of values of type `T`.
* @param {T} start - The `start` parameter is the value that marks the beginning of the range you want
* to find in the array.
* @param {T} end - The `end` parameter in the `findValuesBetween` function represents the end value
* that you want to find in the array. This function will return a subarray of values that are between
* the `start` and `end` values in the original array.
* @returns The `findValuesBetween` function returns an array of values from the input array that are
* between the `start` and `end` values (inclusive). If either the `start` or `end` values are not
* found in the input array, an empty array is returned.
*/
function findValuesBetween(array, start, end) {
	const startIndex = array.findIndex((i) => isEqual(i, start));
	const endIndex = array.findIndex((i) => isEqual(i, end));
	if (startIndex === -1 || endIndex === -1) return [];
	const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
	return array.slice(minIndex, maxIndex + 1);
}

//#region src/shared/handleAndDispatchCustomEvent.ts
function handleAndDispatchCustomEvent(name, handler, detail) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	target.dispatchEvent(event);
}

//#region src/shared/useFilter.ts
/**
* Provides locale-aware string filtering functions.
* Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
*
* @param options - Optional collator options to customize comparison behavior.
*   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
* @returns An object with methods to check if a string starts with, ends with, or contains a substring.
*
* @example
* const { startsWith, endsWith, contains } = useFilter();
*
* startsWith('hello', 'he'); // true
* endsWith('hello', 'lo'); // true
* contains('hello', 'ell'); // true
*/
function useFilter$1(options) {
	const computedOptions = vueExports.computed(() => vueExports.unref(options));
	const collator = vueExports.computed(() => new Intl.Collator("en", {
		usage: "search",
		...computedOptions.value
	}));
	const startsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(0, substring.length), substring) === 0;
	};
	const endsWith = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.value.compare(string.slice(-substring.length), substring) === 0;
	};
	const contains = (string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		const sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			const slice = string.slice(scan, scan + sliceLen);
			if (collator.value.compare(substring, slice) === 0) return true;
		}
		return false;
	};
	return {
		startsWith,
		endsWith,
		contains
	};
}

/**
* Injects a pair of focus guards at the edges of the whole DOM tree
* to ensure `focusin` & `focusout` events can be caught consistently.
*/
function useFocusGuards() {
	vueExports.watchEffect((cleanupFn) => {
		return;
	});
}

//#region src/shared/useKbd.ts
function useKbd() {
	return {
		ALT: "Alt",
		ARROW_DOWN: "ArrowDown",
		ARROW_LEFT: "ArrowLeft",
		ARROW_RIGHT: "ArrowRight",
		ARROW_UP: "ArrowUp",
		BACKSPACE: "Backspace",
		CAPS_LOCK: "CapsLock",
		CONTROL: "Control",
		DELETE: "Delete",
		END: "End",
		ENTER: "Enter",
		ESCAPE: "Escape",
		F1: "F1",
		F10: "F10",
		F11: "F11",
		F12: "F12",
		F2: "F2",
		F3: "F3",
		F4: "F4",
		F5: "F5",
		F6: "F6",
		F7: "F7",
		F8: "F8",
		F9: "F9",
		HOME: "Home",
		META: "Meta",
		PAGE_DOWN: "PageDown",
		PAGE_UP: "PageUp",
		SHIFT: "Shift",
		SPACE: " ",
		TAB: "Tab",
		CTRL: "Control",
		ASTERISK: "*",
		SPACE_CODE: "Space"
	};
}

//#region src/shared/useTypeahead.ts
function useTypeahead(callback) {
	const search = refAutoReset("", 1e3);
	const handleTypeaheadSearch = (key, items) => {
		search.value = search.value + key;
		{
			const currentItem = getActiveElement();
			const itemsWithTextValue = items.map((item) => ({
				...item,
				textValue: item.value?.textValue ?? item.ref.textContent?.trim() ?? ""
			}));
			const currentMatch = itemsWithTextValue.find((item) => item.ref === currentItem);
			const values = itemsWithTextValue.map((item) => item.textValue);
			const nextMatch = getNextMatch(values, search.value, currentMatch?.textValue);
			const newItem = itemsWithTextValue.find((item) => item.textValue === nextMatch);
			if (newItem) newItem.ref.focus();
			return newItem?.ref;
		}
	};
	const resetTypeahead = () => {
		search.value = "";
	};
	return {
		search,
		handleTypeaheadSearch,
		resetTypeahead
	};
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}
/**
* This is the "meat" of the typeahead matching logic. It takes in all the values,
* the search and the current match, and returns the next match (or `undefined`).
*
* We normalize the search because if a user has repeatedly pressed a character,
* we want the exact same behavior as if we only had that one character
* (ie. cycle through options starting with that character)
*
* We also reorder the values by wrapping the array around the current match.
* This is so we always look forward from the current match, and picking the first
* match will always be the correct one.
*
* Finally, if the normalized search is exactly one character, we exclude the
* current match from the values because otherwise it would be the first to match always
* and focus would never move. This is as opposed to the regular case, where we
* don't want focus to move if the current match still matches.
*/
function getNextMatch(values, search, currentMatch) {
	const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
	const normalizedSearch = isRepeated ? search[0] : search;
	const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
	let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
	const excludeCurrentMatch = normalizedSearch.length === 1;
	if (excludeCurrentMatch) wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
	const nextMatch = wrappedValues.find((value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase()));
	return nextMatch !== currentMatch ? nextMatch : void 0;
}

//#region src/Combobox/ComboboxAnchor.vue?vue&type=script&setup=true&lang.ts
var ComboboxAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxAnchor",
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
		const { forwardRef } = useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperAnchor_default), {
				"as-child": "",
				reference: _ctx.reference
			}, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({
					ref: vueExports.unref(forwardRef),
					"as-child": _ctx.asChild,
					as: _ctx.as
				}, _ctx.$attrs), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, ["as-child", "as"])]),
				_: 3
			}, 8, ["reference"]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxAnchor.vue
var ComboboxAnchor_default = ComboboxAnchor_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/utils.ts
function queryCheckedElement(parentEl) {
	return parentEl?.querySelector("[data-state=checked]");
}
function valueComparator(value, currentValue, comparator) {
	if (value === void 0) return false;
	else if (Array.isArray(value)) return value.some((val) => compare(val, currentValue, comparator));
	else return compare(value, currentValue, comparator);
}
function compare(value, currentValue, comparator) {
	if (value === void 0 || currentValue === void 0) return false;
	if (typeof value === "string") return value === currentValue;
	if (typeof comparator === "function") return comparator(value, currentValue);
	if (typeof comparator === "string") return value?.[comparator] === currentValue?.[comparator];
	return isEqual(value, currentValue);
}

//#region src/Listbox/ListboxRoot.vue?vue&type=script&setup=true&lang.ts
const [injectListboxRootContext, provideListboxRootContext] = createContext("ListboxRoot");
var ListboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxRoot",
	props: {
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		orientation: {
			type: String,
			required: false,
			default: "vertical"
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		selectionBehavior: {
			type: String,
			required: false,
			default: "toggle"
		},
		highlightOnHover: {
			type: Boolean,
			required: false
		},
		by: {
			type: [String, Function],
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
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"entryFocus",
		"leave"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = vueExports.toRefs(props);
		const { getItems } = useCollection({ isProvider: true });
		const { handleTypeaheadSearch } = useTypeahead();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const kbd = useKbd();
		const dir = useDirection(propDir);
		const isFormControl = useFormControl(currentElement);
		const firstValue = vueExports.ref();
		const isUserAction = vueExports.ref(false);
		const focusable = vueExports.ref(true);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		function onValueChange(val) {
			isUserAction.value = true;
			if (props.multiple) {
				const modelArray = Array.isArray(modelValue.value) ? [...modelValue.value] : [];
				const index = modelArray.findIndex((i) => compare(i, val, props.by));
				if (props.selectionBehavior === "toggle") {
					index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
					modelValue.value = modelArray;
				} else {
					modelValue.value = [val];
					firstValue.value = val;
				}
			} else if (props.selectionBehavior === "toggle") if (compare(modelValue.value, val, props.by)) modelValue.value = void 0;
			else modelValue.value = val;
			else modelValue.value = val;
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		const highlightedElement = vueExports.ref(null);
		const previousElement = vueExports.ref(null);
		const isVirtual = vueExports.ref(false);
		const isComposing = vueExports.ref(false);
		const virtualFocusHook = createEventHook();
		const virtualKeydownHook = createEventHook();
		const virtualHighlightHook = createEventHook();
		function getCollectionItem() {
			return getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
		}
		function changeHighlight(el, scrollIntoView = true) {
			if (!el) return;
			highlightedElement.value = el;
			if (focusable.value) highlightedElement.value.focus();
			if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: "nearest" });
			const highlightedItem = getItems().find((i) => i.ref === el);
			emits("highlight", highlightedItem);
		}
		function highlightItem(value) {
			if (isVirtual.value) virtualHighlightHook.trigger(value);
			else {
				const item = getItems().find((i) => compare(i.value, value, props.by));
				if (item) {
					highlightedElement.value = item.ref;
					changeHighlight(item.ref);
				}
			}
		}
		function onKeydownEnter(event) {
			if (highlightedElement.value && highlightedElement.value.isConnected) {
				event.preventDefault();
				event.stopPropagation();
				if (!isComposing.value) highlightedElement.value.click();
			}
		}
		function onKeydownTypeAhead(event) {
			if (!focusable.value) return;
			isUserAction.value = true;
			if (isVirtual.value) virtualKeydownHook.trigger(event);
			else {
				const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
				if (isMetaKey && event.key === "a" && multiple.value) {
					const collection = getItems();
					const values = collection.map((i) => i.value);
					modelValue.value = [...values];
					event.preventDefault();
					changeHighlight(collection[collection.length - 1].ref);
				} else if (!isMetaKey) {
					const el = handleTypeaheadSearch(event.key, getItems());
					if (el) changeHighlight(el);
				}
			}
			setTimeout(() => {
				isUserAction.value = false;
			}, 1);
		}
		function onCompositionStart() {
			isComposing.value = true;
		}
		function onCompositionEnd() {
			vueExports.nextTick(() => {
				isComposing.value = false;
			});
		}
		function highlightFirstItem() {
			vueExports.nextTick(() => {
				const event = new KeyboardEvent("keydown", { key: "PageUp" });
				onKeydownNavigation(event);
			});
		}
		function onLeave(event) {
			const el = highlightedElement.value;
			if (el?.isConnected) previousElement.value = el;
			highlightedElement.value = null;
			emits("leave", event);
		}
		function onEnter(event) {
			const entryFocusEvent = new CustomEvent("listbox.entryFocus", {
				bubbles: false,
				cancelable: true
			});
			event.currentTarget?.dispatchEvent(entryFocusEvent);
			emits("entryFocus", entryFocusEvent);
			if (entryFocusEvent.defaultPrevented) return;
			if (previousElement.value) changeHighlight(previousElement.value);
			else {
				const el = getCollectionItem()?.[0];
				changeHighlight(el);
			}
		}
		function onKeydownNavigation(event) {
			const intent = getFocusIntent(event, orientation.value, dir.value);
			if (!intent) return;
			let collection = getCollectionItem();
			if (highlightedElement.value) {
				if (intent === "last") collection.reverse();
				else if (intent === "prev" || intent === "next") {
					if (intent === "prev") collection.reverse();
					const currentIndex = collection.indexOf(highlightedElement.value);
					collection = collection.slice(currentIndex + 1);
				}
				handleMultipleReplace(event, collection[0]);
			}
			if (collection.length) {
				const index = !highlightedElement.value && intent === "prev" ? collection.length - 1 : 0;
				changeHighlight(collection[index]);
			}
			if (isVirtual.value) return virtualKeydownHook.trigger(event);
		}
		function handleMultipleReplace(event, targetEl) {
			if (isVirtual.value || props.selectionBehavior !== "replace" || !multiple.value || !Array.isArray(modelValue.value)) return;
			const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
			if (isMetaKey && !event.shiftKey) return;
			if (event.shiftKey) {
				const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
				let lastValue = collection.find((i) => i.ref === targetEl)?.value;
				if (event.key === kbd.END) lastValue = collection[collection.length - 1].value;
				else if (event.key === kbd.HOME) lastValue = collection[0].value;
				if (!lastValue || !firstValue.value) return;
				const values = findValuesBetween(collection.map((i) => i.value), firstValue.value, lastValue);
				modelValue.value = values;
			}
		}
		async function highlightSelected(event) {
			await vueExports.nextTick();
			if (isVirtual.value) virtualFocusHook.trigger(event);
			else {
				const collection = getCollectionItem();
				const item = collection.find((i) => i.dataset.state === "checked");
				if (item) changeHighlight(item);
				else if (collection.length) changeHighlight(collection[0]);
			}
		}
		vueExports.watch(modelValue, () => {
			if (!isUserAction.value) vueExports.nextTick(() => {
				highlightSelected();
			});
		}, {
			immediate: true,
			deep: true
		});
		__expose({
			highlightedElement,
			highlightItem,
			highlightFirstItem,
			highlightSelected,
			getItems
		});
		provideListboxRootContext({
			modelValue,
			onValueChange,
			multiple,
			orientation,
			dir,
			disabled,
			highlightOnHover,
			highlightedElement,
			isVirtual,
			virtualFocusHook,
			virtualKeydownHook,
			virtualHighlightHook,
			by: props.by,
			firstValue,
			selectionBehavior,
			focusable,
			onLeave,
			onEnter,
			changeHighlight,
			onKeydownEnter,
			onKeydownNavigation,
			onKeydownTypeAhead,
			onCompositionStart,
			onCompositionEnd,
			highlightFirstItem
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				dir: vueExports.unref(dir),
				"data-disabled": vueExports.unref(disabled) ? "" : void 0,
				onPointerleave: onLeave,
				onFocusout: _cache[0] || (_cache[0] = async (event) => {
					const target = event.relatedTarget || event.target;
					await vueExports.nextTick();
					if (highlightedElement.value && vueExports.unref(currentElement) && !vueExports.unref(currentElement).contains(target)) onLeave(event);
				})
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) }), vueExports.unref(isFormControl) && _ctx.name ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(VisuallyHiddenInput_default), {
					key: 0,
					name: _ctx.name,
					value: vueExports.unref(modelValue),
					disabled: vueExports.unref(disabled),
					required: _ctx.required
				}, null, 8, [
					"name",
					"value",
					"disabled",
					"required"
				])) : vueExports.createCommentVNode("v-if", true)]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"dir",
				"data-disabled"
			]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxRoot.vue
var ListboxRoot_default = ListboxRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxContent.vue?vue&type=script&setup=true&lang.ts
var ListboxContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxContent",
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
		const { CollectionSlot } = useCollection();
		const rootContext = injectListboxRootContext();
		const isClickFocus = refAutoReset(false, 10);
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionSlot), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(Primitive), {
					role: "listbox",
					as: _ctx.as,
					"as-child": _ctx.asChild,
					tabindex: vueExports.unref(rootContext).focusable.value ? vueExports.unref(rootContext).highlightedElement.value ? "-1" : "0" : "-1",
					"aria-orientation": vueExports.unref(rootContext).orientation.value,
					"aria-multiselectable": !!vueExports.unref(rootContext).multiple.value,
					"data-orientation": vueExports.unref(rootContext).orientation.value,
					onMousedown: _cache[0] || (_cache[0] = vueExports.withModifiers(($event) => isClickFocus.value = true, ["left"])),
					onFocus: _cache[1] || (_cache[1] = (ev) => {
						if (vueExports.unref(isClickFocus)) return;
						vueExports.unref(rootContext).onEnter(ev);
					}),
					onKeydown: [
						_cache[2] || (_cache[2] = vueExports.withKeys((event) => {
							if (vueExports.unref(rootContext).orientation.value === "vertical" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || vueExports.unref(rootContext).orientation.value === "horizontal" && (event.key === "ArrowUp" || event.key === "ArrowDown")) return;
							event.preventDefault();
							vueExports.unref(rootContext).focusable.value && vueExports.unref(rootContext).onKeydownNavigation(event);
						}, [
							"down",
							"up",
							"left",
							"right",
							"home",
							"end"
						])),
						vueExports.withKeys(vueExports.unref(rootContext).onKeydownEnter, ["enter"]),
						vueExports.unref(rootContext).onKeydownTypeAhead
					]
				}, {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 8, [
					"as",
					"as-child",
					"tabindex",
					"aria-orientation",
					"aria-multiselectable",
					"data-orientation",
					"onKeydown"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Listbox/ListboxContent.vue
var ListboxContent_default = ListboxContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxFilter.vue?vue&type=script&setup=true&lang.ts
var ListboxFilter_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxFilter",
	props: {
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
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
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: "",
			passive: props.modelValue === void 0
		});
		const rootContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const disabled = vueExports.computed(() => props.disabled || rootContext.disabled.value || false);
		const activedescendant = vueExports.ref();
		vueExports.watchSyncEffect(() => activedescendant.value = rootContext.highlightedElement.value?.id);
		vueExports.onMounted(() => {
			rootContext.focusable.value = false;
			setTimeout(() => {
				if (props.autoFocus) currentElement.value?.focus();
			}, 1);
		});
		vueExports.onUnmounted(() => {
			rootContext.focusable.value = true;
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				as: _ctx.as,
				"as-child": _ctx.asChild,
				value: vueExports.unref(modelValue),
				disabled: disabled.value ? "" : void 0,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				"aria-activedescendant": activedescendant.value,
				type: "text",
				onKeydown: [vueExports.withKeys(vueExports.withModifiers(vueExports.unref(rootContext).onKeydownNavigation, ["prevent"]), [
					"down",
					"up",
					"home",
					"end"
				]), vueExports.withKeys(vueExports.unref(rootContext).onKeydownEnter, ["enter"])],
				onInput: _cache[0] || (_cache[0] = (event) => {
					modelValue.value = event.target.value;
					vueExports.unref(rootContext).highlightFirstItem();
				}),
				onCompositionstart: vueExports.unref(rootContext).onCompositionStart,
				onCompositionend: vueExports.unref(rootContext).onCompositionEnd
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", { modelValue: vueExports.unref(modelValue) })]),
				_: 3
			}, 8, [
				"as",
				"as-child",
				"value",
				"disabled",
				"data-disabled",
				"aria-disabled",
				"aria-activedescendant",
				"onKeydown",
				"onCompositionstart",
				"onCompositionend"
			]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxFilter.vue
var ListboxFilter_default = ListboxFilter_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxGroup.vue?vue&type=script&setup=true&lang.ts
const [injectListboxGroupContext, provideListboxGroupContext] = createContext("ListboxGroup");
var ListboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxGroup",
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
		const id = useId(void 0, "reka-listbox-group");
		provideListboxGroupContext({ id });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ role: "group" }, props, { "aria-labelledby": vueExports.unref(id) }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["aria-labelledby"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxGroup.vue
var ListboxGroup_default = ListboxGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxItem.vue?vue&type=script&setup=true&lang.ts
const LISTBOX_SELECT = "listbox.select";
const [injectListboxItemContext, provideListboxItemContext] = createContext("ListboxItem");
var ListboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxItem",
	props: {
		value: {
			type: null,
			required: true
		},
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
			default: "div"
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-listbox-item");
		const { CollectionItem } = useCollection();
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectListboxRootContext();
		const isHighlighted = vueExports.computed(() => currentElement.value === rootContext.highlightedElement.value);
		const isSelected = vueExports.computed(() => valueComparator(rootContext.modelValue.value, props.value, rootContext.by));
		const disabled = vueExports.computed(() => rootContext.disabled.value || props.disabled);
		async function handleSelect(ev) {
			emits("select", ev);
			if (ev?.defaultPrevented) return;
			if (!disabled.value && ev) {
				rootContext.onValueChange(props.value);
				rootContext.changeHighlight(currentElement.value);
			}
		}
		function handleSelectCustomEvent(ev) {
			const eventDetail = {
				originalEvent: ev,
				value: props.value
			};
			handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, eventDetail);
		}
		provideListboxItemContext({ isSelected });
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(CollectionItem), { value: _ctx.value }, {
				default: vueExports.withCtx(() => [vueExports.withMemo([isHighlighted.value, isSelected.value], () => vueExports.createVNode(vueExports.unref(Primitive), vueExports.mergeProps({ id: vueExports.unref(id) }, _ctx.$attrs, {
					ref: vueExports.unref(forwardRef),
					role: "option",
					tabindex: vueExports.unref(rootContext).focusable.value ? isHighlighted.value ? "0" : "-1" : -1,
					"aria-selected": isSelected.value,
					as: _ctx.as,
					"as-child": _ctx.asChild,
					disabled: disabled.value ? "" : void 0,
					"data-disabled": disabled.value ? "" : void 0,
					"data-highlighted": isHighlighted.value ? "" : void 0,
					"data-state": isSelected.value ? "checked" : "unchecked",
					onClick: handleSelectCustomEvent,
					onKeydown: vueExports.withKeys(vueExports.withModifiers(handleSelectCustomEvent, ["prevent"]), ["space"]),
					onPointermove: _cache[0] || (_cache[0] = () => {
						if (vueExports.unref(rootContext).highlightedElement.value === vueExports.unref(currentElement)) return;
						if (vueExports.unref(rootContext).highlightOnHover.value && !vueExports.unref(rootContext).focusable.value) vueExports.unref(rootContext).changeHighlight(vueExports.unref(currentElement), false);
					})
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16, [
					"id",
					"tabindex",
					"aria-selected",
					"as",
					"as-child",
					"disabled",
					"data-disabled",
					"data-highlighted",
					"data-state",
					"onKeydown"
				]), _cache, 1)]),
				_: 3
			}, 8, ["value"]);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxItem.vue
var ListboxItem_default = ListboxItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxItemIndicator.vue?vue&type=script&setup=true&lang.ts
var ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxItemIndicator",
	props: {
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
		useForwardExpose();
		const itemContext = injectListboxItemContext();
		return (_ctx, _cache) => {
			return vueExports.unref(itemContext).isSelected.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({
				key: 0,
				"aria-hidden": "true"
			}, props), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxItemIndicator.vue
var ListboxItemIndicator_default = ListboxItemIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/Listbox/ListboxVirtualizer.vue?vue&type=script&setup=true&lang.ts
var ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ListboxVirtualizer",
	props: {
		options: {
			type: Array,
			required: true
		},
		overscan: {
			type: Number,
			required: false
		},
		estimateSize: {
			type: [Number, Function],
			required: false
		},
		textContent: {
			type: Function,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const slots = vueExports.useSlots();
		const rootContext = injectListboxRootContext();
		const parentEl = useParentElement();
		const { getItems } = useCollection();
		rootContext.isVirtual.value = true;
		const padding = vueExports.computed(() => {
			const el = parentEl.value;
			if (!el) return {
				start: 0,
				end: 0
			};
			else {
				const styles = window.getComputedStyle(el);
				return {
					start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
					end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
				};
			}
		});
		const virtualizer = useVirtualizer({
			get scrollPaddingStart() {
				return padding.value.start;
			},
			get scrollPaddingEnd() {
				return padding.value.end;
			},
			get count() {
				return props.options.length;
			},
			get horizontal() {
				return rootContext.orientation.value === "horizontal";
			},
			estimateSize(index) {
				if (typeof props.estimateSize === "function") return props.estimateSize(index);
				return props.estimateSize ?? 28;
			},
			getScrollElement() {
				return parentEl.value;
			},
			overscan: props.overscan ?? 12
		});
		const virtualizedItems = vueExports.computed(() => virtualizer.value.getVirtualItems().map((item) => {
			const defaultNode = slots.default({
				option: props.options[item.index],
				virtualizer: virtualizer.value,
				virtualItem: item
			})[0];
			const targetNode = defaultNode.type === vueExports.Fragment && Array.isArray(defaultNode.children) ? defaultNode.children[0] : defaultNode;
			return {
				item,
				is: vueExports.cloneVNode(targetNode, {
					"key": `${item.key}`,
					"data-index": item.index,
					"aria-setsize": props.options.length,
					"aria-posinset": item.index + 1,
					"style": {
						position: "absolute",
						top: 0,
						left: 0,
						transform: `translateY(${item.start}px)`,
						overflowAnchor: "none"
					}
				})
			};
		}));
		rootContext.virtualFocusHook.on((event) => {
			const index = props.options.findIndex((option) => {
				if (Array.isArray(rootContext.modelValue.value)) return compare(option, rootContext.modelValue.value[0], rootContext.by);
				else return compare(option, rootContext.modelValue.value, rootContext.by);
			});
			if (index !== -1) {
				event?.preventDefault();
				virtualizer.value.scrollToIndex(index, { align: "start" });
				requestAnimationFrame(() => {
					const item = queryCheckedElement(parentEl.value);
					if (item) {
						rootContext.changeHighlight(item);
						if (event) item?.focus();
					}
				});
			} else rootContext.highlightFirstItem();
		});
		rootContext.virtualHighlightHook.on((value) => {
			const index = props.options.findIndex((option) => {
				return compare(option, value, rootContext.by);
			});
			virtualizer.value.scrollToIndex(index, { align: "start" });
			requestAnimationFrame(() => {
				const item = queryCheckedElement(parentEl.value);
				if (item) rootContext.changeHighlight(item);
			});
		});
		const search = refAutoReset("", 1e3);
		const optionsWithMetadata = vueExports.computed(() => {
			const parseTextContent = (option) => {
				if (props.textContent) return props.textContent(option);
				else return option?.toString().toLowerCase();
			};
			return props.options.map((option, index) => ({
				index,
				textContent: parseTextContent(option)
			}));
		});
		function handleMultipleReplace(event, intent) {
			if (!rootContext.firstValue?.value || !rootContext.multiple.value || !Array.isArray(rootContext.modelValue.value)) return;
			const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
			const lastValue = collection.find((i) => i.ref === rootContext.highlightedElement.value)?.value;
			if (!lastValue) return;
			let value = null;
			switch (intent) {
				case "prev":
				case "next": {
					value = findValuesBetween(props.options, rootContext.firstValue.value, lastValue);
					break;
				}
				case "first": {
					value = findValuesBetween(props.options, rootContext.firstValue.value, props.options?.[0]);
					break;
				}
				case "last": {
					value = findValuesBetween(props.options, rootContext.firstValue.value, props.options?.[props.options.length - 1]);
					break;
				}
			}
			rootContext.modelValue.value = value;
		}
		rootContext.virtualKeydownHook.on((event) => {
			const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
			const isTabKey = event.key === "Tab" && !isMetaKey;
			if (isTabKey) return;
			let intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
			if (isMetaKey && event.key === "a" && rootContext.multiple.value) {
				event.preventDefault();
				rootContext.modelValue.value = [...props.options];
				intent = "last";
			} else if (event.shiftKey && intent) handleMultipleReplace(event, intent);
			if (["first", "last"].includes(intent)) {
				event.preventDefault();
				const index = intent === "first" ? 0 : props.options.length - 1;
				virtualizer.value.scrollToIndex(index);
				requestAnimationFrame(() => {
					const items = getItems();
					const item = intent === "first" ? items[0] : items[items.length - 1];
					if (item) rootContext.changeHighlight(item.ref);
				});
			} else if (!intent && !isMetaKey) {
				search.value += event.key;
				const currentIndex = Number(getActiveElement()?.getAttribute("data-index"));
				const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
				const filteredOptions = optionsWithMetadata.value.map((i) => i.textContent ?? "");
				const next = getNextMatch(filteredOptions, search.value, currentMatch);
				const nextMatch = optionsWithMetadata.value.find((option) => option.textContent === next);
				if (nextMatch) {
					virtualizer.value.scrollToIndex(nextMatch.index, { align: "start" });
					requestAnimationFrame(() => {
						const item = parentEl.value.querySelector(`[data-index="${nextMatch.index}"]`);
						if (item instanceof HTMLElement) rootContext.changeHighlight(item);
					});
				}
			}
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createElementBlock("div", {
				"data-reka-virtualizer": "",
				style: vueExports.normalizeStyle({
					position: "relative",
					width: "100%",
					height: `${vueExports.unref(virtualizer).getTotalSize()}px`
				})
			}, [(vueExports.openBlock(true), vueExports.createElementBlock(vueExports.Fragment, null, vueExports.renderList(virtualizedItems.value, ({ is, item }) => {
				return vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(is), { key: item.index });
			}), 128))], 4);
		};
	}
});

//#endregion
//#region src/Listbox/ListboxVirtualizer.vue
var ListboxVirtualizer_default = ListboxVirtualizer_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxRoot.vue?vue&type=script&setup=true&lang.ts
const [injectComboboxRootContext, provideComboboxRootContext] = createContext("ComboboxRoot");
var ComboboxRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxRoot",
	props: {
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false
		},
		resetSearchTermOnBlur: {
			type: Boolean,
			required: false,
			default: true
		},
		resetSearchTermOnSelect: {
			type: Boolean,
			required: false,
			default: true
		},
		openOnFocus: {
			type: Boolean,
			required: false,
			default: false
		},
		openOnClick: {
			type: Boolean,
			required: false,
			default: false
		},
		ignoreFilter: {
			type: Boolean,
			required: false
		},
		resetModelValueOnClear: {
			type: Boolean,
			required: false,
			default: false
		},
		modelValue: {
			type: null,
			required: false
		},
		defaultValue: {
			type: null,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false
		},
		dir: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false
		},
		highlightOnHover: {
			type: Boolean,
			required: false,
			default: true
		},
		by: {
			type: [String, Function],
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
		name: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	emits: [
		"update:modelValue",
		"highlight",
		"update:open"
	],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { primitiveElement, currentElement: parentElement } = usePrimitiveElement();
		const { multiple, disabled, ignoreFilter, resetSearchTermOnSelect, openOnFocus, openOnClick, dir: propDir, resetModelValueOnClear, highlightOnHover } = vueExports.toRefs(props);
		const dir = useDirection(propDir);
		const modelValue = useVModel(props, "modelValue", emits, {
			defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
			passive: props.modelValue === void 0,
			deep: true
		});
		const open = useVModel(props, "open", emits, {
			defaultValue: props.defaultOpen,
			passive: props.open === void 0
		});
		async function onOpenChange(val) {
			open.value = val;
			filterSearch.value = "";
			if (val) {
				await vueExports.nextTick();
				primitiveElement.value?.highlightSelected();
				isUserInputted.value = true;
				inputElement.value?.focus();
			} else {
				isUserInputted.value = false;
				setTimeout(() => {
					if (!val && props.resetSearchTermOnBlur) resetSearchTerm.trigger();
				}, 1);
			}
		}
		const resetSearchTerm = createEventHook();
		const isUserInputted = vueExports.ref(false);
		const isVirtual = vueExports.ref(false);
		const inputElement = vueExports.ref();
		const triggerElement = vueExports.ref();
		const highlightedElement = vueExports.computed(() => primitiveElement.value?.highlightedElement ?? void 0);
		const allItems = vueExports.ref(/* @__PURE__ */ new Map());
		const allGroups = vueExports.ref(/* @__PURE__ */ new Map());
		const { contains } = useFilter$1({ sensitivity: "base" });
		const filterSearch = vueExports.ref("");
		const filterState = vueExports.computed((oldValue) => {
			if (!filterSearch.value || props.ignoreFilter || isVirtual.value) return {
				count: allItems.value.size,
				items: oldValue?.items ?? /* @__PURE__ */ new Map(),
				groups: oldValue?.groups ?? new Set(allGroups.value.keys())
			};
			let itemCount = 0;
			const filteredItems = /* @__PURE__ */ new Map();
			const filteredGroups = /* @__PURE__ */ new Set();
			for (const [id, value] of allItems.value) {
				const score = contains(value, filterSearch.value);
				filteredItems.set(id, score ? 1 : 0);
				if (score) itemCount++;
			}
			for (const [groupId, group] of allGroups.value) for (const itemId of group) if (filteredItems.get(itemId) > 0) {
				filteredGroups.add(groupId);
				break;
			}
			return {
				count: itemCount,
				items: filteredItems,
				groups: filteredGroups
			};
		});
		const inst = vueExports.getCurrentInstance();
		vueExports.onMounted(() => {
			if (inst?.exposed) {
				inst.exposed.highlightItem = primitiveElement.value?.highlightItem;
				inst.exposed.highlightFirstItem = primitiveElement.value?.highlightFirstItem;
				inst.exposed.highlightSelected = primitiveElement.value?.highlightSelected;
			}
		});
		__expose({
			filtered: filterState,
			highlightedElement,
			highlightItem: primitiveElement.value?.highlightItem,
			highlightFirstItem: primitiveElement.value?.highlightFirstItem,
			highlightSelected: primitiveElement.value?.highlightSelected
		});
		provideComboboxRootContext({
			modelValue,
			multiple,
			disabled,
			open,
			onOpenChange,
			contentId: "",
			isUserInputted,
			isVirtual,
			inputElement,
			highlightedElement,
			onInputElementChange: (val) => inputElement.value = val,
			triggerElement,
			onTriggerElementChange: (val) => triggerElement.value = val,
			parentElement,
			resetSearchTermOnSelect,
			onResetSearchTerm: resetSearchTerm.on,
			allItems,
			allGroups,
			filterSearch,
			filterState,
			ignoreFilter,
			openOnFocus,
			openOnClick,
			resetModelValueOnClear
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperRoot_default), null, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(ListboxRoot_default), vueExports.mergeProps({
					ref_key: "primitiveElement",
					ref: primitiveElement
				}, _ctx.$attrs, {
					modelValue: vueExports.unref(modelValue),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(modelValue) ? modelValue.value = $event : null),
					style: { pointerEvents: vueExports.unref(open) ? "auto" : void 0 },
					as: _ctx.as,
					"as-child": _ctx.asChild,
					dir: vueExports.unref(dir),
					multiple: vueExports.unref(multiple),
					name: _ctx.name,
					required: _ctx.required,
					disabled: vueExports.unref(disabled),
					"highlight-on-hover": vueExports.unref(highlightOnHover),
					by: props.by,
					onHighlight: _cache[1] || (_cache[1] = ($event) => emits("highlight", $event))
				}), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {
						open: vueExports.unref(open),
						modelValue: vueExports.unref(modelValue)
					})]),
					_: 3
				}, 16, [
					"modelValue",
					"style",
					"as",
					"as-child",
					"dir",
					"multiple",
					"name",
					"required",
					"disabled",
					"highlight-on-hover",
					"by"
				])]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxRoot.vue
var ComboboxRoot_default = ComboboxRoot_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxContentImpl.vue?vue&type=script&setup=true&lang.ts
const [injectComboboxContentContext, provideComboboxContentContext] = createContext("ComboboxContent");
var ComboboxContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxContentImpl",
	props: {
		position: {
			type: String,
			required: false,
			default: "inline"
		},
		bodyLock: {
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
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { position } = vueExports.toRefs(props);
		const rootContext = injectComboboxRootContext();
		const { forwardRef, currentElement } = useForwardExpose();
		useBodyScrollLock(props.bodyLock);
		useFocusGuards();
		useHideOthers(rootContext.parentElement);
		const pickedProps = vueExports.computed(() => {
			if (props.position === "popper") return props;
			else return {};
		});
		const forwardedProps = useForwardProps(pickedProps.value);
		const popperStyle = {
			"boxSizing": "border-box",
			"--reka-combobox-content-transform-origin": "var(--reka-popper-transform-origin)",
			"--reka-combobox-content-available-width": "var(--reka-popper-available-width)",
			"--reka-combobox-content-available-height": "var(--reka-popper-available-height)",
			"--reka-combobox-trigger-width": "var(--reka-popper-anchor-width)",
			"--reka-combobox-trigger-height": "var(--reka-popper-anchor-height)"
		};
		provideComboboxContentContext({ position });
		const isInputWithinContent = vueExports.ref(false);
		vueExports.onMounted(() => {
			if (rootContext.inputElement.value) {
				isInputWithinContent.value = currentElement.value.contains(rootContext.inputElement.value);
				if (isInputWithinContent.value) rootContext.inputElement.value.focus();
			}
		});
		vueExports.onUnmounted(() => {
			const activeElement = getActiveElement();
			if (isInputWithinContent.value && (!activeElement || activeElement === document.body)) rootContext.triggerElement.value?.focus();
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxContent_default), { "as-child": "" }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(FocusScope_default), {
					"as-child": "",
					onMountAutoFocus: _cache[5] || (_cache[5] = vueExports.withModifiers(() => {}, ["prevent"])),
					onUnmountAutoFocus: _cache[6] || (_cache[6] = vueExports.withModifiers(() => {}, ["prevent"]))
				}, {
					default: vueExports.withCtx(() => [vueExports.createVNode(vueExports.unref(DismissableLayer_default), {
						"as-child": "",
						"disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
						onDismiss: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(false)),
						onFocusOutside: _cache[1] || (_cache[1] = (ev) => {
							if (vueExports.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
							emits("focusOutside", ev);
						}),
						onInteractOutside: _cache[2] || (_cache[2] = ($event) => emits("interactOutside", $event)),
						onEscapeKeyDown: _cache[3] || (_cache[3] = ($event) => emits("escapeKeyDown", $event)),
						onPointerDownOutside: _cache[4] || (_cache[4] = (ev) => {
							if (vueExports.unref(rootContext).parentElement.value?.contains(ev.target)) ev.preventDefault();
							emits("pointerDownOutside", ev);
						})
					}, {
						default: vueExports.withCtx(() => [(vueExports.openBlock(), vueExports.createBlock(vueExports.resolveDynamicComponent(vueExports.unref(position) === "popper" ? vueExports.unref(PopperContent_default) : vueExports.unref(Primitive)), vueExports.mergeProps({
							..._ctx.$attrs,
							...vueExports.unref(forwardedProps)
						}, {
							id: vueExports.unref(rootContext).contentId,
							ref: vueExports.unref(forwardRef),
							"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
							style: {
								display: "flex",
								flexDirection: "column",
								outline: "none",
								...vueExports.unref(position) === "popper" ? popperStyle : {}
							}
						}), {
							default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 16, [
							"id",
							"data-state",
							"style"
						]))]),
						_: 3
					}, 8, ["disable-outside-pointer-events"])]),
					_: 3
				})]),
				_: 3
			});
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxContentImpl.vue
var ComboboxContentImpl_default = ComboboxContentImpl_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxArrow.vue?vue&type=script&setup=true&lang.ts
var ComboboxArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxArrow",
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
		const rootContext = injectComboboxRootContext();
		const contentContext = injectComboboxContentContext();
		useForwardExpose();
		return (_ctx, _cache) => {
			return vueExports.unref(rootContext).open.value && vueExports.unref(contentContext).position.value === "popper" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(PopperArrow_default), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16)) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxArrow.vue
var ComboboxArrow_default = ComboboxArrow_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxCancel.vue?vue&type=script&setup=true&lang.ts
var ComboboxCancel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxCancel",
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
		const rootContext = injectComboboxRootContext();
		function handleClick() {
			rootContext.filterSearch.value = "";
			if (rootContext.inputElement.value) {
				rootContext.inputElement.value.value = "";
				rootContext.inputElement.value.focus();
			}
			if (rootContext.resetModelValueOnClear?.value) rootContext.modelValue.value = rootContext.multiple.value ? [] : null;
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps({ type: _ctx.as === "button" ? "button" : void 0 }, props, {
				tabindex: "-1",
				onClick: handleClick
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["type"]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxCancel.vue
var ComboboxCancel_default = ComboboxCancel_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxContent.vue?vue&type=script&setup=true&lang.ts
var ComboboxContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxContent",
	props: {
		forceMount: {
			type: Boolean,
			required: false
		},
		position: {
			type: String,
			required: false
		},
		bodyLock: {
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
		"interactOutside"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const forwarded = useForwardPropsEmits(props, emits);
		const { forwardRef } = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		rootContext.contentId ||= useId(void 0, "reka-combobox-content");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Presence_default), { present: _ctx.forceMount || vueExports.unref(rootContext).open.value }, {
				default: vueExports.withCtx(() => [vueExports.createVNode(ComboboxContentImpl_default, vueExports.mergeProps({
					...vueExports.unref(forwarded),
					..._ctx.$attrs
				}, { ref: vueExports.unref(forwardRef) }), {
					default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
					_: 3
				}, 16)]),
				_: 3
			}, 8, ["present"]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxContent.vue
var ComboboxContent_default = ComboboxContent_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxEmpty.vue?vue&type=script&setup=true&lang.ts
var ComboboxEmpty_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxEmpty",
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
		const rootContext = injectComboboxRootContext();
		const isRender = vueExports.computed(() => rootContext.ignoreFilter.value ? rootContext.allItems.value.size === 0 : rootContext.filterState.value.count === 0);
		return (_ctx, _cache) => {
			return isRender.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.normalizeProps(vueExports.mergeProps({ key: 0 }, props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {}, () => [_cache[0] || (_cache[0] = vueExports.createTextVNode("No options"))])]),
				_: 3
			}, 16)) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxEmpty.vue
var ComboboxEmpty_default = ComboboxEmpty_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxGroup.vue?vue&type=script&setup=true&lang.ts
const [injectComboboxGroupContext, provideComboboxGroupContext] = createContext("ComboboxGroup");
var ComboboxGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxGroup",
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
		const id = useId(void 0, "reka-combobox-group");
		const rootContext = injectComboboxRootContext();
		const isRender = vueExports.computed(() => rootContext.ignoreFilter.value ? true : !rootContext.filterSearch.value ? true : rootContext.filterState.value.groups.has(id));
		const context = provideComboboxGroupContext({
			id,
			labelId: ""
		});
		vueExports.onMounted(() => {
			if (!rootContext.allGroups.value.has(id)) rootContext.allGroups.value.set(id, /* @__PURE__ */ new Set());
		});
		vueExports.onUnmounted(() => {
			rootContext.allGroups.value.delete(id);
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxGroup_default), vueExports.mergeProps({
				id: vueExports.unref(id),
				"aria-labelledby": vueExports.unref(context).labelId
			}, props, { hidden: isRender.value ? void 0 : true }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"id",
				"aria-labelledby",
				"hidden"
			]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxGroup.vue
var ComboboxGroup_default = ComboboxGroup_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxInput.vue?vue&type=script&setup=true&lang.ts
var ComboboxInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxInput",
	props: {
		displayValue: {
			type: Function,
			required: false
		},
		modelValue: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false
		},
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
			default: "input"
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const rootContext = injectComboboxRootContext();
		const listboxContext = injectListboxRootContext();
		const { primitiveElement, currentElement } = usePrimitiveElement();
		const modelValue = useVModel(props, "modelValue", emits, { passive: props.modelValue === void 0 });
		vueExports.onMounted(() => {
			if (currentElement.value) rootContext.onInputElementChange(currentElement.value);
		});
		function handleKeyDown(ev) {
			if (!rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleInput(event) {
			const target = event.target;
			if (!rootContext.open.value) {
				rootContext.onOpenChange(true);
				vueExports.nextTick(() => {
					if (target.value) {
						rootContext.filterSearch.value = target.value;
						listboxContext.highlightFirstItem();
					}
				});
			} else rootContext.filterSearch.value = target.value;
		}
		function handleFocus() {
			if (rootContext.openOnFocus.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function handleClick() {
			if (rootContext.openOnClick.value && !rootContext.open.value) rootContext.onOpenChange(true);
		}
		function resetSearchTerm() {
			const rootModelValue = rootContext.modelValue.value;
			if (props.displayValue) modelValue.value = props.displayValue(rootModelValue);
			else if (!rootContext.multiple.value && rootModelValue && !Array.isArray(rootModelValue)) if (typeof rootModelValue !== "object") modelValue.value = rootModelValue.toString();
			else modelValue.value = "";
			else modelValue.value = "";
			vueExports.nextTick(() => {
				modelValue.value = modelValue.value;
			});
		}
		rootContext.onResetSearchTerm(() => {
			resetSearchTerm();
		});
		vueExports.watch(rootContext.modelValue, async () => {
			if (!rootContext.isUserInputted.value && rootContext.resetSearchTermOnSelect.value) resetSearchTerm();
		}, {
			immediate: true,
			deep: true
		});
		vueExports.watch(rootContext.filterState, (_newValue, oldValue) => {
			if (!rootContext.isVirtual.value && oldValue.count === 0) listboxContext.highlightFirstItem();
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxFilter_default), {
				ref_key: "primitiveElement",
				ref: primitiveElement,
				modelValue: vueExports.unref(modelValue),
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vueExports.isRef(modelValue) ? modelValue.value = $event : null),
				as: _ctx.as,
				"as-child": _ctx.asChild,
				"auto-focus": _ctx.autoFocus,
				disabled: _ctx.disabled,
				"aria-expanded": vueExports.unref(rootContext).open.value,
				"aria-controls": vueExports.unref(rootContext).contentId,
				"aria-autocomplete": "list",
				role: "combobox",
				autocomplete: "off",
				onClick: handleClick,
				onInput: handleInput,
				onKeydown: vueExports.withKeys(vueExports.withModifiers(handleKeyDown, ["prevent"]), ["down", "up"]),
				onFocus: handleFocus
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"modelValue",
				"as",
				"as-child",
				"auto-focus",
				"disabled",
				"aria-expanded",
				"aria-controls",
				"onKeydown"
			]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxInput.vue
var ComboboxInput_default = ComboboxInput_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxItem.vue?vue&type=script&setup=true&lang.ts
var ComboboxItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxItem",
	props: {
		textValue: {
			type: String,
			required: false
		},
		value: {
			type: null,
			required: true
		},
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
			required: false
		}
	},
	emits: ["select"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const id = useId(void 0, "reka-combobox-item");
		const rootContext = injectComboboxRootContext();
		const groupContext = injectComboboxGroupContext(null);
		const { primitiveElement, currentElement } = usePrimitiveElement();
		if (props.value === "") throw new Error("A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.");
		const isRender = vueExports.computed(() => {
			if (rootContext.isVirtual.value || rootContext.ignoreFilter.value || !rootContext.filterSearch.value) return true;
			else {
				const filteredCurrentItem = rootContext.filterState.value.items.get(id);
				if (filteredCurrentItem === void 0) return true;
				return filteredCurrentItem > 0;
			}
		});
		vueExports.onMounted(() => {
			rootContext.allItems.value.set(id, props.textValue || currentElement.value.textContent || currentElement.value.innerText);
			const groupId = groupContext?.id;
			if (groupId) if (!rootContext.allGroups.value.has(groupId)) rootContext.allGroups.value.set(groupId, new Set([id]));
			else rootContext.allGroups.value.get(groupId)?.add(id);
		});
		vueExports.onUnmounted(() => {
			rootContext.allItems.value.delete(id);
		});
		return (_ctx, _cache) => {
			return isRender.value ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItem_default), vueExports.mergeProps({ key: 0 }, props, {
				id: vueExports.unref(id),
				ref_key: "primitiveElement",
				ref: primitiveElement,
				disabled: vueExports.unref(rootContext).disabled.value || _ctx.disabled,
				onSelect: _cache[0] || (_cache[0] = (event) => {
					emits("select", event);
					if (event.defaultPrevented) return;
					if (!vueExports.unref(rootContext).multiple.value && !_ctx.disabled && !vueExports.unref(rootContext).disabled.value) {
						event.preventDefault();
						vueExports.unref(rootContext).onOpenChange(false);
						vueExports.unref(rootContext).modelValue.value = props.value;
					}
				})
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default", {}, () => [vueExports.createTextVNode(vueExports.toDisplayString(_ctx.value), 1)])]),
				_: 3
			}, 16, ["id", "disabled"])) : vueExports.createCommentVNode("v-if", true);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxItem.vue
var ComboboxItem_default = ComboboxItem_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxItemIndicator.vue?vue&type=script&setup=true&lang.ts
var ComboboxItemIndicator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxItemIndicator",
	props: {
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
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ListboxItemIndicator_default), vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxItemIndicator.vue
var ComboboxItemIndicator_default = ComboboxItemIndicator_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxLabel.vue?vue&type=script&setup=true&lang.ts
var ComboboxLabel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxLabel",
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
		useForwardExpose();
		const groupContext = injectComboboxGroupContext({
			id: "",
			labelId: ""
		});
		groupContext.labelId ||= useId(void 0, "reka-combobox-group-label");
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { id: vueExports.unref(groupContext).labelId }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["id"]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxLabel.vue
var ComboboxLabel_default = ComboboxLabel_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxPortal.vue?vue&type=script&setup=true&lang.ts
var ComboboxPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxPortal",
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
//#region src/Combobox/ComboboxPortal.vue
var ComboboxPortal_default = ComboboxPortal_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxSeparator.vue?vue&type=script&setup=true&lang.ts
var ComboboxSeparator_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxSeparator",
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
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, { "aria-hidden": "true" }), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxSeparator.vue
var ComboboxSeparator_default = ComboboxSeparator_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxTrigger.vue?vue&type=script&setup=true&lang.ts
var ComboboxTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxTrigger",
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
		const { forwardRef, currentElement } = useForwardExpose();
		const rootContext = injectComboboxRootContext();
		const disabled = vueExports.computed(() => props.disabled || rootContext.disabled.value || false);
		vueExports.onMounted(() => {
			if (currentElement.value) rootContext.onTriggerElementChange(currentElement.value);
		});
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), vueExports.mergeProps(props, {
				ref: vueExports.unref(forwardRef),
				type: _ctx.as === "button" ? "button" : void 0,
				tabindex: "-1",
				"aria-label": "Show popup",
				"aria-haspopup": "listbox",
				"aria-expanded": vueExports.unref(rootContext).open.value,
				"aria-controls": vueExports.unref(rootContext).contentId,
				"data-state": vueExports.unref(rootContext).open.value ? "open" : "closed",
				disabled: disabled.value,
				"data-disabled": disabled.value ? "" : void 0,
				"aria-disabled": disabled.value ?? void 0,
				onClick: _cache[0] || (_cache[0] = ($event) => vueExports.unref(rootContext).onOpenChange(!vueExports.unref(rootContext).open.value))
			}), {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"type",
				"aria-expanded",
				"aria-controls",
				"data-state",
				"disabled",
				"data-disabled",
				"aria-disabled"
			]);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxTrigger.vue
var ComboboxTrigger_default = ComboboxTrigger_vue_vue_type_script_setup_true_lang_default;

//#region src/Combobox/ComboboxVirtualizer.vue?vue&type=script&setup=true&lang.ts
var ComboboxVirtualizer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "ComboboxVirtualizer",
	props: {
		options: {
			type: Array,
			required: true
		},
		overscan: {
			type: Number,
			required: false
		},
		estimateSize: {
			type: [Number, Function],
			required: false
		},
		textContent: {
			type: Function,
			required: false
		}
	},
	setup(__props) {
		const props = __props;
		const rootContext = injectComboboxRootContext();
		rootContext.isVirtual.value = true;
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(ListboxVirtualizer_default, vueExports.normalizeProps(vueExports.guardReactiveProps(props)), {
				default: vueExports.withCtx((slotProps) => [vueExports.renderSlot(_ctx.$slots, "default", vueExports.normalizeProps(vueExports.guardReactiveProps(slotProps)))]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
//#region src/Combobox/ComboboxVirtualizer.vue
var ComboboxVirtualizer_default = ComboboxVirtualizer_vue_vue_type_script_setup_true_lang_default;

function useFilter() {
  const { contains, startsWith } = useFilter$1({ sensitivity: "base" });
  function score(value, searchTerm) {
    if (!contains(value, searchTerm)) return null;
    if (contains(searchTerm, value)) return 0;
    if (startsWith(value, searchTerm)) return 1;
    return 2;
  }
  function scoreItem(item, searchTerm, fields) {
    if (typeof item !== "object" || item === null) {
      return score(String(item), searchTerm);
    }
    let bestScore = null;
    for (const field of fields) {
      const value = get(item, field);
      if (value == null) continue;
      const values = Array.isArray(value) ? value.map(String) : [String(value)];
      for (const v of values) {
        const s = score(v, searchTerm);
        if (s !== null && (bestScore === null || s < bestScore)) bestScore = s;
        if (bestScore === 0) return 0;
      }
    }
    return bestScore;
  }
  function filter(items, searchTerm, fields) {
    if (!searchTerm) return items;
    const scored = [];
    for (const item of items) {
      const s = scoreItem(item, searchTerm, fields);
      if (s !== null) {
        scored.push({ item, score: s });
      }
    }
    scored.sort((a, b) => a.score - b.score);
    return scored.map(({ item }) => item);
  }
  function filterGroups(groups, searchTerm, options) {
    if (!searchTerm) return groups;
    return groups.map((group) => {
      const result = [];
      for (const item of group) {
        if (item === void 0 || item === null) continue;
        if (options.isStructural?.(item)) {
          result.push({ item, score: -1 });
          continue;
        }
        const s = scoreItem(item, searchTerm, options.fields);
        if (s !== null) {
          result.push({ item, score: s });
        }
      }
      result.sort((a, b) => a.score - b.score);
      return result.map(({ item }) => item);
    }).filter((group) => group.some((item) => !options.isStructural?.(item)));
  }
  return { score, scoreItem, filter, filterGroups };
}
function itemHasDescription(item, descriptionKey) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const value = get(item, descriptionKey);
  return value !== void 0 && value !== null && value !== "";
}
function getSize(size, hasDescription) {
  if (hasDescription) {
    return {
      xs: 44,
      sm: 48,
      md: 52,
      lg: 56,
      xl: 60
    }[size];
  }
  return {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 36,
    xl: 40
  }[size];
}
function getEstimateSize(items, size, descriptionKey, hasDescriptionSlot) {
  const sizeWithDescription = getSize(size, true);
  const sizeWithoutDescription = getSize(size, false);
  if (hasDescriptionSlot) {
    return () => sizeWithDescription;
  }
  if (!descriptionKey) {
    return () => sizeWithoutDescription;
  }
  return (index) => {
    return itemHasDescription(items[index], descriptionKey) ? sizeWithDescription : sizeWithoutDescription;
  };
}
const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-bg stroke-default",
    "content": [
      "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0",
    "trailingClear": "p-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelectMenu",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ vueExports.mergeModels({
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    searchInput: { type: [Boolean, Object], required: false, default: true },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    required: { type: Boolean, required: false },
    trailingIcon: { type: null, required: false },
    selectedIcon: { type: null, required: false },
    clear: { type: [Boolean, Object], required: false },
    clearIcon: { type: null, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    virtualize: { type: [Boolean, Object], required: false, default: false },
    valueKey: { type: null, required: false },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    modelModifiers: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    createItem: { type: [Boolean, String, Object], required: false },
    filterFields: { type: Array, required: false },
    ignoreFilter: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: Object, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
    resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
    resetModelValueOnClear: { type: Boolean, required: false, default: true },
    highlightOnHover: { type: Boolean, required: false },
    by: { type: [String, Function], required: false },
    icon: { type: null, required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: null, required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: null, required: false }
  }, {
    "searchTerm": { type: String, ...{ default: "" } },
    "searchTermModifiers": {}
  }),
  emits: /* @__PURE__ */ vueExports.mergeModels(["change", "blur", "focus", "create", "clear", "highlight", "update:modelValue", "update:open"], ["update:searchTerm"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = vueExports.useSlots();
    const searchTerm = vueExports.useModel(__props, "searchTerm", { type: String, ...{ default: "" } });
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const uiProp = useComponentUI("selectMenu", props);
    const { filterGroups } = useFilter();
    const rootProps = useForwardPropsEmits(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "resetModelValueOnClear", "highlightOnHover", "by"), emits);
    const portalProps = usePortal(vueExports.toRef(() => props.portal));
    const contentProps = vueExports.toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = vueExports.toRef(() => defu(props.arrow, { rounded: true }));
    const clearProps = vueExports.computed(() => typeof props.clear === "object" ? props.clear : {});
    const virtualizerProps = vueExports.toRef(() => {
      if (!props.virtualize) return false;
      return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
        estimateSize: getEstimateSize(filteredItems.value, selectSize.value || "md", props.descriptionKey, !!slots["item-description"])
      });
    });
    const searchInputProps = vueExports.toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none" }));
    const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(vueExports.toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = vueExports.computed(() => fieldGroupSize.value || formGroupSize.value);
    const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: {
          type: [Object, String, Number, Boolean],
          required: true
        },
        index: {
          type: Number,
          required: false
        }
      }
    });
    const ui = vueExports.computed(() => tv({ extend: tv(theme), ...appConfig.ui?.selectMenu || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value,
      virtualize: !!props.virtualize
    }));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey,
          by: props.by
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey,
        by: props.by
      });
    }
    const groups = vueExports.computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = vueExports.computed(() => groups.value.flatMap((group) => group));
    const filteredGroups = vueExports.computed(() => {
      if (props.ignoreFilter || !searchTerm.value) {
        return groups.value;
      }
      const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
      return filterGroups(groups.value, searchTerm.value, {
        fields,
        isStructural: (item) => isSelectItem(item) && !!item.type && ["label", "separator"].includes(item.type)
      });
    });
    const filteredItems = vueExports.computed(() => filteredGroups.value.flatMap((group) => group));
    const createItem = vueExports.computed(() => {
      if (!props.createItem || !searchTerm.value) {
        return false;
      }
      const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
      if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
        return !filteredItems.value.find((item) => compare$1(item, newItem, props.by ?? props.valueKey));
      }
      return !filteredItems.value.length;
    });
    const createItemPosition = vueExports.computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
    const triggerRef = vueExports.useTemplateRef("triggerRef");
    function onUpdate(value) {
      if (vueExports.toRaw(props.modelValue) === value) {
        return;
      }
      if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
        value = value?.trim() ?? null;
      }
      if (props.modelModifiers?.number) {
        value = looseToNumber(value);
      }
      if (props.modelModifiers?.nullable) {
        value ??= null;
      }
      if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
        value ??= void 0;
      }
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
      if (props.resetSearchTermOnSelect) {
        searchTerm.value = "";
      }
    }
    function onUpdateOpen(value) {
      let timeoutId;
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
        if (props.resetSearchTermOnBlur) {
          const STATE_ANIMATION_DELAY_MS = 100;
          timeoutId = setTimeout(() => {
            searchTerm.value = "";
          }, STATE_ANIMATION_DELAY_MS);
        }
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
        clearTimeout(timeoutId);
      }
    }
    function onCreate(e) {
      e.preventDefault();
      e.stopPropagation();
      emits("create", searchTerm.value);
    }
    function onSelect(e, item) {
      if (!isSelectItem(item)) {
        return;
      }
      if (item.disabled) {
        e.preventDefault();
        return;
      }
      item.onSelect?.(e);
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    function isModelValueEmpty(modelValue) {
      if (props.multiple && Array.isArray(modelValue)) {
        return modelValue.length === 0;
      }
      return modelValue === void 0 || modelValue === null || modelValue === "";
    }
    function onClear() {
      emits("clear");
    }
    const viewportRef = vueExports.useTemplateRef("viewportRef");
    __expose({
      triggerRef: vueExports.toRef(() => triggerRef.value?.$el),
      viewportRef: vueExports.toRef(() => viewportRef.value)
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent_1(vueExports.unref(DefineCreateItemTemplate), null, {
        default: vueExports.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(vueExports.unref(ComboboxItem_default), {
              "data-slot": "item",
              class: ui.value.item({ class: vueExports.unref(uiProp)?.item }),
              value: searchTerm.value,
              onSelect: onCreate
            }, {
              default: vueExports.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-slot="itemLabel" class="${ssrRenderClass_1(ui.value.itemLabel({ class: vueExports.unref(uiProp)?.itemLabel }))}"${_scopeId2}>`);
                  ssrRenderSlot_1(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => {
                    _push3(`${ssrInterpolate_1(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value }))}`);
                  }, _push3, _parent3, _scopeId2);
                  _push3(`</span>`);
                } else {
                  return [
                    vueExports.createVNode("span", {
                      "data-slot": "itemLabel",
                      class: ui.value.itemLabel({ class: vueExports.unref(uiProp)?.itemLabel })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                        vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                      ])
                    ], 2)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              vueExports.createVNode(vueExports.unref(ComboboxItem_default), {
                "data-slot": "item",
                class: ui.value.item({ class: vueExports.unref(uiProp)?.item }),
                value: searchTerm.value,
                onSelect: onCreate
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode("span", {
                    "data-slot": "itemLabel",
                    class: ui.value.itemLabel({ class: vueExports.unref(uiProp)?.itemLabel })
                  }, [
                    vueExports.renderSlot(_ctx.$slots, "create-item-label", { item: searchTerm.value }, () => [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(t)("selectMenu.create", { label: searchTerm.value })), 1)
                    ])
                  ], 2)
                ]),
                _: 3
              }, 8, ["class", "value"])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(DefineItemTemplate), null, {
        default: vueExports.withCtx(({ item, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (isSelectItem(item) && item.type === "label") {
              _push2(ssrRenderComponent_1(vueExports.unref(ComboboxLabel_default), {
                "data-slot": "label",
                class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate_1(vueExports.unref(get)(item, props.labelKey))}`);
                  } else {
                    return [
                      vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else if (isSelectItem(item) && item.type === "separator") {
              _push2(ssrRenderComponent_1(vueExports.unref(ComboboxSeparator_default), {
                "data-slot": "separator",
                class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent_1(vueExports.unref(ComboboxItem_default), {
                "data-slot": "item",
                class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot_1(_ctx.$slots, "item", {
                      item,
                      index,
                      ui: ui.value
                    }, () => {
                      ssrRenderSlot_1(_ctx.$slots, "item-leading", {
                        item,
                        index,
                        ui: ui.value
                      }, () => {
                        if (isSelectItem(item) && item.icon) {
                          _push3(ssrRenderComponent_1(_sfc_main$f, {
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.avatar) {
                          _push3(ssrRenderComponent_1(_sfc_main$d, vueExports.mergeProps({
                            size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, _parent3, _scopeId2));
                        } else if (isSelectItem(item) && item.chip) {
                          _push3(ssrRenderComponent_1(_sfc_main$e, vueExports.mergeProps({
                            size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                      _push3(`<span data-slot="itemWrapper" class="${ssrRenderClass_1(ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] }))}"${_scopeId2}><span data-slot="itemLabel" class="${ssrRenderClass_1(ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] }))}"${_scopeId2}>`);
                      ssrRenderSlot_1(_ctx.$slots, "item-label", {
                        item,
                        index
                      }, () => {
                        _push3(`${ssrInterpolate_1(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item)}`);
                      }, _push3, _parent3, _scopeId2);
                      _push3(`</span>`);
                      if (isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"])) {
                        _push3(`<span data-slot="itemDescription" class="${ssrRenderClass_1(ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] }))}"${_scopeId2}>`);
                        ssrRenderSlot_1(_ctx.$slots, "item-description", {
                          item,
                          index
                        }, () => {
                          _push3(`${ssrInterpolate_1(vueExports.unref(get)(item, props.descriptionKey))}`);
                        }, _push3, _parent3, _scopeId2);
                        _push3(`</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</span><span data-slot="itemTrailing" class="${ssrRenderClass_1(ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId2}>`);
                      ssrRenderSlot_1(_ctx.$slots, "item-trailing", {
                        item,
                        index,
                        ui: ui.value
                      }, null, _push3, _parent3, _scopeId2);
                      _push3(ssrRenderComponent_1(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                        default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent_1(_sfc_main$f, {
                              name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                              "data-slot": "itemTrailingIcon",
                              class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              vueExports.createVNode(_sfc_main$f, {
                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</span>`);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      vueExports.renderSlot(_ctx.$slots, "item", {
                        item,
                        index,
                        ui: ui.value
                      }, () => [
                        vueExports.renderSlot(_ctx.$slots, "item-leading", {
                          item,
                          index,
                          ui: ui.value
                        }, () => [
                          isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                            key: 0,
                            name: item.icon,
                            "data-slot": "itemLeadingIcon",
                            class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                            key: 1,
                            size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, item.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                            key: 2,
                            size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                            inset: "",
                            standalone: ""
                          }, item.chip, {
                            "data-slot": "itemLeadingChip",
                            class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ]),
                        vueExports.createVNode("span", {
                          "data-slot": "itemWrapper",
                          class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                        }, [
                          vueExports.createVNode("span", {
                            "data-slot": "itemLabel",
                            class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "item-label", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                            ])
                          ], 2),
                          isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "itemDescription",
                            class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "item-description", {
                              item,
                              index
                            }, () => [
                              vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ], 2),
                        vueExports.createVNode("span", {
                          "data-slot": "itemTrailing",
                          class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                            item,
                            index,
                            ui: ui.value
                          }),
                          vueExports.createVNode(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$f, {
                                name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                                "data-slot": "itemTrailingIcon",
                                class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                              }, null, 8, ["name", "class"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 2)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            }
          } else {
            return [
              isSelectItem(item) && item.type === "label" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxLabel_default), {
                key: 0,
                "data-slot": "label",
                class: ui.value.label({ class: [vueExports.unref(uiProp)?.label, item.ui?.label, item.class] })
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.labelKey)), 1)
                ]),
                _: 2
              }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxSeparator_default), {
                key: 1,
                "data-slot": "separator",
                class: ui.value.separator({ class: [vueExports.unref(uiProp)?.separator, item.ui?.separator, item.class] })
              }, null, 8, ["class"])) : (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxItem_default), {
                key: 2,
                "data-slot": "item",
                class: ui.value.item({ class: [vueExports.unref(uiProp)?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                disabled: isSelectItem(item) && item.disabled,
                value: props.valueKey && isSelectItem(item) ? vueExports.unref(get)(item, props.valueKey) : item,
                onSelect: ($event) => onSelect($event, item)
              }, {
                default: vueExports.withCtx(() => [
                  vueExports.renderSlot(_ctx.$slots, "item", {
                    item,
                    index,
                    ui: ui.value
                  }, () => [
                    vueExports.renderSlot(_ctx.$slots, "item-leading", {
                      item,
                      index,
                      ui: ui.value
                    }, () => [
                      isSelectItem(item) && item.icon ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                        key: 0,
                        name: item.icon,
                        "data-slot": "itemLeadingIcon",
                        class: ui.value.itemLeadingIcon({ class: [vueExports.unref(uiProp)?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                      }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                        key: 1,
                        size: item.ui?.itemLeadingAvatarSize || vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, item.avatar, {
                        "data-slot": "itemLeadingAvatar",
                        class: ui.value.itemLeadingAvatar({ class: [vueExports.unref(uiProp)?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                      }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$e, vueExports.mergeProps({
                        key: 2,
                        size: item.ui?.itemLeadingChipSize || vueExports.unref(uiProp)?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                        inset: "",
                        standalone: ""
                      }, item.chip, {
                        "data-slot": "itemLeadingChip",
                        class: ui.value.itemLeadingChip({ class: [vueExports.unref(uiProp)?.itemLeadingChip, item.ui?.itemLeadingChip] })
                      }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                    ]),
                    vueExports.createVNode("span", {
                      "data-slot": "itemWrapper",
                      class: ui.value.itemWrapper({ class: [vueExports.unref(uiProp)?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })
                    }, [
                      vueExports.createVNode("span", {
                        "data-slot": "itemLabel",
                        class: ui.value.itemLabel({ class: [vueExports.unref(uiProp)?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "item-label", {
                          item,
                          index
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(isSelectItem(item) ? vueExports.unref(get)(item, props.labelKey) : item), 1)
                        ])
                      ], 2),
                      isSelectItem(item) && (vueExports.unref(get)(item, props.descriptionKey) || !!slots["item-description"]) ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        "data-slot": "itemDescription",
                        class: ui.value.itemDescription({ class: [vueExports.unref(uiProp)?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "item-description", {
                          item,
                          index
                        }, () => [
                          vueExports.createTextVNode(vueExports.toDisplayString(vueExports.unref(get)(item, props.descriptionKey)), 1)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true)
                    ], 2),
                    vueExports.createVNode("span", {
                      "data-slot": "itemTrailing",
                      class: ui.value.itemTrailing({ class: [vueExports.unref(uiProp)?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                    }, [
                      vueExports.renderSlot(_ctx.$slots, "item-trailing", {
                        item,
                        index,
                        ui: ui.value
                      }),
                      vueExports.createVNode(vueExports.unref(ComboboxItemIndicator_default), { "as-child": "" }, {
                        default: vueExports.withCtx(() => [
                          vueExports.createVNode(_sfc_main$f, {
                            name: __props.selectedIcon || vueExports.unref(appConfig).ui.icons.check,
                            "data-slot": "itemTrailingIcon",
                            class: ui.value.itemTrailingIcon({ class: [vueExports.unref(uiProp)?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                          }, null, 8, ["name", "class"])
                        ]),
                        _: 2
                      }, 1024)
                    ], 2)
                  ])
                ]),
                _: 2
              }, 1032, ["class", "disabled", "value", "onSelect"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent_1(vueExports.unref(ComboboxRoot_default), vueExports.mergeProps({ id: vueExports.unref(id) }, { ...vueExports.unref(rootProps), ..._ctx.$attrs, ...vueExports.unref(ariaAttrs) }, {
        "ignore-filter": "",
        "as-child": "",
        name: vueExports.unref(name),
        disabled: vueExports.unref(disabled),
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }), {
        default: vueExports.withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent_1(vueExports.unref(ComboboxAnchor_default), { "as-child": "" }, {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(ComboboxTrigger_default), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading) {
                          _push4(`<span data-slot="leading" class="${ssrRenderClass_1(ui.value.leading({ class: vueExports.unref(uiProp)?.leading }))}"${_scopeId3}>`);
                          ssrRenderSlot_1(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (vueExports.unref(isLeading) && vueExports.unref(leadingIconName)) {
                              _push4(ssrRenderComponent_1(_sfc_main$f, {
                                name: vueExports.unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                              }, null, _parent4, _scopeId3));
                            } else if (!!__props.avatar) {
                              _push4(ssrRenderComponent_1(_sfc_main$d, vueExports.mergeProps({
                                size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                              }), null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot_1(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => {
                          _push4(`<!--[-->`);
                          ssrRenderList_1([displayValue(modelValue)], (displayedModelValue) => {
                            _push4(`<!--[-->`);
                            if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                              _push4(`<span data-slot="value" class="${ssrRenderClass_1(ui.value.value({ class: vueExports.unref(uiProp)?.value }))}"${_scopeId3}>${ssrInterpolate_1(displayedModelValue)}</span>`);
                            } else {
                              _push4(`<span data-slot="placeholder" class="${ssrRenderClass_1(ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder }))}"${_scopeId3}>${ssrInterpolate_1(__props.placeholder ?? " ")}</span>`);
                            }
                            _push4(`<!--]-->`);
                          });
                          _push4(`<!--]-->`);
                        }, _push4, _parent4, _scopeId3);
                        if (vueExports.unref(isTrailing) || !!slots.trailing || !!__props.clear) {
                          _push4(`<span data-slot="trailing" class="${ssrRenderClass_1(ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing }))}"${_scopeId3}>`);
                          ssrRenderSlot_1(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => {
                            if (!!__props.clear && !isModelValueEmpty(modelValue)) {
                              _push4(ssrRenderComponent_1(vueExports.unref(ComboboxCancel_default), { "as-child": "" }, {
                                default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent_1(_sfc_main$a, vueExports.mergeProps({
                                      as: "span",
                                      icon: __props.clearIcon || vueExports.unref(appConfig).ui.icons.close,
                                      size: selectSize.value,
                                      variant: "link",
                                      color: "neutral",
                                      tabindex: "-1"
                                    }, clearProps.value, {
                                      "data-slot": "trailingClear",
                                      class: ui.value.trailingClear({ class: vueExports.unref(uiProp)?.trailingClear }),
                                      onClick: onClear
                                    }), null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({
                                        as: "span",
                                        icon: __props.clearIcon || vueExports.unref(appConfig).ui.icons.close,
                                        size: selectSize.value,
                                        variant: "link",
                                        color: "neutral",
                                        tabindex: "-1"
                                      }, clearProps.value, {
                                        "data-slot": "trailingClear",
                                        class: ui.value.trailingClear({ class: vueExports.unref(uiProp)?.trailingClear }),
                                        onClick: vueExports.withModifiers(onClear, ["stop"])
                                      }), null, 16, ["icon", "size", "class"])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else if (vueExports.unref(trailingIconName)) {
                              _push4(ssrRenderComponent_1(_sfc_main$f, {
                                name: vueExports.unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                              }, null, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                          }, _push4, _parent4, _scopeId3);
                          _push4(`</span>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 0,
                            "data-slot": "leading",
                            class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "leading", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                                key: 0,
                                name: vueExports.unref(leadingIconName),
                                "data-slot": "leadingIcon",
                                class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                              }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                                key: 1,
                                size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                              }, __props.avatar, {
                                "data-slot": "itemLeadingAvatar",
                                class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                              }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true),
                          vueExports.renderSlot(_ctx.$slots, "default", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                              return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                                displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 0,
                                  "data-slot": "value",
                                  class: ui.value.value({ class: vueExports.unref(uiProp)?.value })
                                }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                  key: 1,
                                  "data-slot": "placeholder",
                                  class: ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                                }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                              ], 64);
                            }), 128))
                          ]),
                          vueExports.unref(isTrailing) || !!slots.trailing || !!__props.clear ? (vueExports.openBlock(), vueExports.createBlock("span", {
                            key: 1,
                            "data-slot": "trailing",
                            class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                          }, [
                            vueExports.renderSlot(_ctx.$slots, "trailing", {
                              modelValue,
                              open,
                              ui: ui.value
                            }, () => [
                              !!__props.clear && !isModelValueEmpty(modelValue) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxCancel_default), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({
                                    as: "span",
                                    icon: __props.clearIcon || vueExports.unref(appConfig).ui.icons.close,
                                    size: selectSize.value,
                                    variant: "link",
                                    color: "neutral",
                                    tabindex: "-1"
                                  }, clearProps.value, {
                                    "data-slot": "trailingClear",
                                    class: ui.value.trailingClear({ class: vueExports.unref(uiProp)?.trailingClear }),
                                    onClick: vueExports.withModifiers(onClear, ["stop"])
                                  }), null, 16, ["icon", "size", "class"])
                                ]),
                                _: 1
                              })) : vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                                key: 1,
                                name: vueExports.unref(trailingIconName),
                                "data-slot": "trailingIcon",
                                class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                              }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                            ])
                          ], 2)) : vueExports.createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    vueExports.createVNode(vueExports.unref(ComboboxTrigger_default), {
                      ref_key: "triggerRef",
                      ref: triggerRef,
                      "data-slot": "base",
                      class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] }),
                      tabindex: "0"
                    }, {
                      default: vueExports.withCtx(() => [
                        vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 0,
                          "data-slot": "leading",
                          class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "leading", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                              key: 0,
                              name: vueExports.unref(leadingIconName),
                              "data-slot": "leadingIcon",
                              class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                            }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                              key: 1,
                              size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                            }, __props.avatar, {
                              "data-slot": "itemLeadingAvatar",
                              class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                            }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true),
                        vueExports.renderSlot(_ctx.$slots, "default", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                            return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                              displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 0,
                                "data-slot": "value",
                                class: ui.value.value({ class: vueExports.unref(uiProp)?.value })
                              }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                                key: 1,
                                "data-slot": "placeholder",
                                class: ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                              }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                            ], 64);
                          }), 128))
                        ]),
                        vueExports.unref(isTrailing) || !!slots.trailing || !!__props.clear ? (vueExports.openBlock(), vueExports.createBlock("span", {
                          key: 1,
                          "data-slot": "trailing",
                          class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                        }, [
                          vueExports.renderSlot(_ctx.$slots, "trailing", {
                            modelValue,
                            open,
                            ui: ui.value
                          }, () => [
                            !!__props.clear && !isModelValueEmpty(modelValue) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxCancel_default), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({
                                  as: "span",
                                  icon: __props.clearIcon || vueExports.unref(appConfig).ui.icons.close,
                                  size: selectSize.value,
                                  variant: "link",
                                  color: "neutral",
                                  tabindex: "-1"
                                }, clearProps.value, {
                                  "data-slot": "trailingClear",
                                  class: ui.value.trailingClear({ class: vueExports.unref(uiProp)?.trailingClear }),
                                  onClick: vueExports.withModifiers(onClear, ["stop"])
                                }), null, 16, ["icon", "size", "class"])
                              ]),
                              _: 1
                            })) : vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                              key: 1,
                              name: vueExports.unref(trailingIconName),
                              "data-slot": "trailingIcon",
                              class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                            }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                          ])
                        ], 2)) : vueExports.createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent_1(vueExports.unref(ComboboxPortal_default), vueExports.unref(portalProps), {
              default: vueExports.withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent_1(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent_1(vueExports.unref(FocusScope_default), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: vueExports.unref(uiProp)?.focusScope })
                        }, {
                          default: vueExports.withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              ssrRenderSlot_1(_ctx.$slots, "content-top", {}, null, _push5, _parent5, _scopeId4);
                              if (!!__props.searchInput) {
                                _push5(ssrRenderComponent_1(vueExports.unref(ComboboxInput_default), {
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent_1(_sfc_main$1, vueExports.mergeProps({
                                        autofocus: "",
                                        autocomplete: "off",
                                        size: selectSize.value
                                      }, searchInputProps.value, {
                                        "model-modifiers": {
                                          trim: __props.modelModifiers?.trim
                                        },
                                        "data-slot": "input",
                                        class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                        onChange: () => {
                                        }
                                      }), null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                          autofocus: "",
                                          autocomplete: "off",
                                          size: selectSize.value
                                        }, searchInputProps.value, {
                                          "model-modifiers": {
                                            trim: __props.modelModifiers?.trim
                                          },
                                          "data-slot": "input",
                                          class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                          onChange: vueExports.withModifiers(() => {
                                          }, ["stop"])
                                        }), null, 16, ["size", "model-modifiers", "class", "onChange"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(ssrRenderComponent_1(vueExports.unref(ComboboxEmpty_default), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                              }, {
                                default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    ssrRenderSlot_1(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => {
                                      _push6(`${ssrInterpolate_1(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData"))}`);
                                    }, _push6, _parent6, _scopeId5);
                                  } else {
                                    return [
                                      vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                        vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(`<div role="presentation" data-slot="viewport" class="${ssrRenderClass_1(ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport }))}"${_scopeId4}>`);
                              if (!!__props.virtualize) {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(ssrRenderComponent_1(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: vueExports.withCtx(({ option: item, virtualItem }, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              } else {
                                _push5(`<!--[-->`);
                                if (createItem.value && createItemPosition.value === "top") {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ComboboxGroup_default), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--[-->`);
                                ssrRenderList_1(filteredGroups.value, (group, groupIndex) => {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ComboboxGroup_default), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<!--[-->`);
                                        ssrRenderList_1(group, (item, index) => {
                                          _push6(ssrRenderComponent_1(vueExports.unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index}`,
                                            item,
                                            index
                                          }, null, _parent6, _scopeId5));
                                        });
                                        _push6(`<!--]-->`);
                                      } else {
                                        return [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index}`,
                                              item,
                                              index
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                                if (createItem.value && createItemPosition.value === "bottom") {
                                  _push5(ssrRenderComponent_1(vueExports.unref(ComboboxGroup_default), {
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent_1(vueExports.unref(ReuseCreateItemTemplate), null, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<!--]-->`);
                              }
                              _push5(`</div>`);
                              ssrRenderSlot_1(_ctx.$slots, "content-bottom", {}, null, _push5, _parent5, _scopeId4);
                            } else {
                              return [
                                vueExports.renderSlot(_ctx.$slots, "content-top"),
                                !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                                  key: 0,
                                  modelValue: searchTerm.value,
                                  "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                  "display-value": () => searchTerm.value,
                                  "as-child": ""
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                      autofocus: "",
                                      autocomplete: "off",
                                      size: selectSize.value
                                    }, searchInputProps.value, {
                                      "model-modifiers": {
                                        trim: __props.modelModifiers?.trim
                                      },
                                      "data-slot": "input",
                                      class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                      onChange: vueExports.withModifiers(() => {
                                      }, ["stop"])
                                    }), null, 16, ["size", "model-modifiers", "class", "onChange"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                                  "data-slot": "empty",
                                  class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                      vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"]),
                                vueExports.createVNode("div", {
                                  ref_key: "viewportRef",
                                  ref: viewportRef,
                                  role: "presentation",
                                  "data-slot": "viewport",
                                  class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                                }, [
                                  !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                    createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                    vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                      options: filteredItems.value,
                                      "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                    }, virtualizerProps.value), {
                                      default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                        vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                          item,
                                          index: virtualItem.index
                                        }, null, 8, ["item", "index"])
                                      ]),
                                      _: 1
                                    }, 16, ["options", "text-content"]),
                                    createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                                  ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                    createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: 0,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                        key: `group-${groupIndex}`,
                                        "data-slot": "group",
                                        class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                      }, {
                                        default: vueExports.withCtx(() => [
                                          (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                            return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                              key: `group-${groupIndex}-${index}`,
                                              item,
                                              index
                                            }, null, 8, ["item", "index"]);
                                          }), 128))
                                        ]),
                                        _: 2
                                      }, 1032, ["class"]);
                                    }), 128)),
                                    createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: 1,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                      ]),
                                      _: 1
                                    }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                  ], 64))
                                ], 2),
                                vueExports.renderSlot(_ctx.$slots, "content-bottom")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent_1(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps(arrowProps.value, {
                            "data-slot": "arrow",
                            class: ui.value.arrow({ class: vueExports.unref(uiProp)?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          vueExports.createVNode(vueExports.unref(FocusScope_default), {
                            trapped: "",
                            "data-slot": "focusScope",
                            class: ui.value.focusScope({ class: vueExports.unref(uiProp)?.focusScope })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "content-top"),
                              !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                                key: 0,
                                modelValue: searchTerm.value,
                                "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                                "display-value": () => searchTerm.value,
                                "as-child": ""
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                    autofocus: "",
                                    autocomplete: "off",
                                    size: selectSize.value
                                  }, searchInputProps.value, {
                                    "model-modifiers": {
                                      trim: __props.modelModifiers?.trim
                                    },
                                    "data-slot": "input",
                                    class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                    onChange: vueExports.withModifiers(() => {
                                    }, ["stop"])
                                  }), null, 16, ["size", "model-modifiers", "class", "onChange"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                                "data-slot": "empty",
                                class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                    vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"]),
                              vueExports.createVNode("div", {
                                ref_key: "viewportRef",
                                ref: viewportRef,
                                role: "presentation",
                                "data-slot": "viewport",
                                class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                              }, [
                                !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                  createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                  vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                    options: filteredItems.value,
                                    "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                  }, virtualizerProps.value), {
                                    default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                      vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                        item,
                                        index: virtualItem.index
                                      }, null, 8, ["item", "index"])
                                    ]),
                                    _: 1
                                  }, 16, ["options", "text-content"]),
                                  createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                                ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                  createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: 0,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                  (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                    return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                      key: `group-${groupIndex}`,
                                      "data-slot": "group",
                                      class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                    }, {
                                      default: vueExports.withCtx(() => [
                                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                          return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                            key: `group-${groupIndex}-${index}`,
                                            item,
                                            index
                                          }, null, 8, ["item", "index"]);
                                        }), 128))
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128)),
                                  createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: 1,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                    ]),
                                    _: 1
                                  }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                                ], 64))
                              ], 2),
                              vueExports.renderSlot(_ctx.$slots, "content-bottom")
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
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
                    vueExports.createVNode(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                      "data-slot": "content",
                      class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                    }, contentProps.value), {
                      default: vueExports.withCtx(() => [
                        vueExports.createVNode(vueExports.unref(FocusScope_default), {
                          trapped: "",
                          "data-slot": "focusScope",
                          class: ui.value.focusScope({ class: vueExports.unref(uiProp)?.focusScope })
                        }, {
                          default: vueExports.withCtx(() => [
                            vueExports.renderSlot(_ctx.$slots, "content-top"),
                            !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                              key: 0,
                              modelValue: searchTerm.value,
                              "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                              "display-value": () => searchTerm.value,
                              "as-child": ""
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                  autofocus: "",
                                  autocomplete: "off",
                                  size: selectSize.value
                                }, searchInputProps.value, {
                                  "model-modifiers": {
                                    trim: __props.modelModifiers?.trim
                                  },
                                  "data-slot": "input",
                                  class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                  onChange: vueExports.withModifiers(() => {
                                  }, ["stop"])
                                }), null, 16, ["size", "model-modifiers", "class", "onChange"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                            vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                              "data-slot": "empty",
                              class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                            }, {
                              default: vueExports.withCtx(() => [
                                vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                  vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                                ])
                              ]),
                              _: 3
                            }, 8, ["class"]),
                            vueExports.createVNode("div", {
                              ref_key: "viewportRef",
                              ref: viewportRef,
                              role: "presentation",
                              "data-slot": "viewport",
                              class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                            }, [
                              !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                                createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                                vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                  options: filteredItems.value,
                                  "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                                }, virtualizerProps.value), {
                                  default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                    vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                      item,
                                      index: virtualItem.index
                                    }, null, 8, ["item", "index"])
                                  ]),
                                  _: 1
                                }, 16, ["options", "text-content"]),
                                createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                              ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                                createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: 0,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                                (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                  return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                    key: `group-${groupIndex}`,
                                    "data-slot": "group",
                                    class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                  }, {
                                    default: vueExports.withCtx(() => [
                                      (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                        return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                          key: `group-${groupIndex}-${index}`,
                                          item,
                                          index
                                        }, null, 8, ["item", "index"]);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128)),
                                createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: 1,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                  ]),
                                  _: 1
                                }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                              ], 64))
                            ], 2),
                            vueExports.renderSlot(_ctx.$slots, "content-bottom")
                          ]),
                          _: 3
                        }, 8, ["class"]),
                        !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
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
              vueExports.createVNode(vueExports.unref(ComboboxAnchor_default), { "as-child": "" }, {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(ComboboxTrigger_default), {
                    ref_key: "triggerRef",
                    ref: triggerRef,
                    "data-slot": "base",
                    class: ui.value.base({ class: [vueExports.unref(uiProp)?.base, props.class] }),
                    tabindex: "0"
                  }, {
                    default: vueExports.withCtx(() => [
                      vueExports.unref(isLeading) || !!__props.avatar || !!slots.leading ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 0,
                        "data-slot": "leading",
                        class: ui.value.leading({ class: vueExports.unref(uiProp)?.leading })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "leading", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          vueExports.unref(isLeading) && vueExports.unref(leadingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                            key: 0,
                            name: vueExports.unref(leadingIconName),
                            "data-slot": "leadingIcon",
                            class: ui.value.leadingIcon({ class: vueExports.unref(uiProp)?.leadingIcon })
                          }, null, 8, ["name", "class"])) : !!__props.avatar ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$d, vueExports.mergeProps({
                            key: 1,
                            size: vueExports.unref(uiProp)?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                          }, __props.avatar, {
                            "data-slot": "itemLeadingAvatar",
                            class: ui.value.itemLeadingAvatar({ class: vueExports.unref(uiProp)?.itemLeadingAvatar })
                          }), null, 16, ["size", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true),
                      vueExports.renderSlot(_ctx.$slots, "default", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList([displayValue(modelValue)], (displayedModelValue) => {
                          return vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: displayedModelValue }, [
                            displayedModelValue !== void 0 && displayedModelValue !== null ? (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 0,
                              "data-slot": "value",
                              class: ui.value.value({ class: vueExports.unref(uiProp)?.value })
                            }, vueExports.toDisplayString(displayedModelValue), 3)) : (vueExports.openBlock(), vueExports.createBlock("span", {
                              key: 1,
                              "data-slot": "placeholder",
                              class: ui.value.placeholder({ class: vueExports.unref(uiProp)?.placeholder })
                            }, vueExports.toDisplayString(__props.placeholder ?? " "), 3))
                          ], 64);
                        }), 128))
                      ]),
                      vueExports.unref(isTrailing) || !!slots.trailing || !!__props.clear ? (vueExports.openBlock(), vueExports.createBlock("span", {
                        key: 1,
                        "data-slot": "trailing",
                        class: ui.value.trailing({ class: vueExports.unref(uiProp)?.trailing })
                      }, [
                        vueExports.renderSlot(_ctx.$slots, "trailing", {
                          modelValue,
                          open,
                          ui: ui.value
                        }, () => [
                          !!__props.clear && !isModelValueEmpty(modelValue) ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxCancel_default), {
                            key: 0,
                            "as-child": ""
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$a, vueExports.mergeProps({
                                as: "span",
                                icon: __props.clearIcon || vueExports.unref(appConfig).ui.icons.close,
                                size: selectSize.value,
                                variant: "link",
                                color: "neutral",
                                tabindex: "-1"
                              }, clearProps.value, {
                                "data-slot": "trailingClear",
                                class: ui.value.trailingClear({ class: vueExports.unref(uiProp)?.trailingClear }),
                                onClick: vueExports.withModifiers(onClear, ["stop"])
                              }), null, 16, ["icon", "size", "class"])
                            ]),
                            _: 1
                          })) : vueExports.unref(trailingIconName) ? (vueExports.openBlock(), vueExports.createBlock(_sfc_main$f, {
                            key: 1,
                            name: vueExports.unref(trailingIconName),
                            "data-slot": "trailingIcon",
                            class: ui.value.trailingIcon({ class: vueExports.unref(uiProp)?.trailingIcon })
                          }, null, 8, ["name", "class"])) : vueExports.createCommentVNode("", true)
                        ])
                      ], 2)) : vueExports.createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"])
                ]),
                _: 2
              }, 1024),
              vueExports.createVNode(vueExports.unref(ComboboxPortal_default), vueExports.unref(portalProps), {
                default: vueExports.withCtx(() => [
                  vueExports.createVNode(vueExports.unref(ComboboxContent_default), vueExports.mergeProps({
                    "data-slot": "content",
                    class: ui.value.content({ class: vueExports.unref(uiProp)?.content })
                  }, contentProps.value), {
                    default: vueExports.withCtx(() => [
                      vueExports.createVNode(vueExports.unref(FocusScope_default), {
                        trapped: "",
                        "data-slot": "focusScope",
                        class: ui.value.focusScope({ class: vueExports.unref(uiProp)?.focusScope })
                      }, {
                        default: vueExports.withCtx(() => [
                          vueExports.renderSlot(_ctx.$slots, "content-top"),
                          !!__props.searchInput ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxInput_default), {
                            key: 0,
                            modelValue: searchTerm.value,
                            "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                            "display-value": () => searchTerm.value,
                            "as-child": ""
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.createVNode(_sfc_main$1, vueExports.mergeProps({
                                autofocus: "",
                                autocomplete: "off",
                                size: selectSize.value
                              }, searchInputProps.value, {
                                "model-modifiers": {
                                  trim: __props.modelModifiers?.trim
                                },
                                "data-slot": "input",
                                class: ui.value.input({ class: vueExports.unref(uiProp)?.input }),
                                onChange: vueExports.withModifiers(() => {
                                }, ["stop"])
                              }), null, 16, ["size", "model-modifiers", "class", "onChange"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "display-value"])) : vueExports.createCommentVNode("", true),
                          vueExports.createVNode(vueExports.unref(ComboboxEmpty_default), {
                            "data-slot": "empty",
                            class: ui.value.empty({ class: vueExports.unref(uiProp)?.empty })
                          }, {
                            default: vueExports.withCtx(() => [
                              vueExports.renderSlot(_ctx.$slots, "empty", { searchTerm: searchTerm.value }, () => [
                                vueExports.createTextVNode(vueExports.toDisplayString(searchTerm.value ? vueExports.unref(t)("selectMenu.noMatch", { searchTerm: searchTerm.value }) : vueExports.unref(t)("selectMenu.noData")), 1)
                              ])
                            ]),
                            _: 3
                          }, 8, ["class"]),
                          vueExports.createVNode("div", {
                            ref_key: "viewportRef",
                            ref: viewportRef,
                            role: "presentation",
                            "data-slot": "viewport",
                            class: ui.value.viewport({ class: vueExports.unref(uiProp)?.viewport })
                          }, [
                            !!__props.virtualize ? (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 0 }, [
                              createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 0 })) : vueExports.createCommentVNode("", true),
                              vueExports.createVNode(vueExports.unref(ComboboxVirtualizer_default), vueExports.mergeProps({
                                options: filteredItems.value,
                                "text-content": (item2) => isSelectItem(item2) ? vueExports.unref(get)(item2, props.labelKey) : String(item2)
                              }, virtualizerProps.value), {
                                default: vueExports.withCtx(({ option: item, virtualItem }) => [
                                  vueExports.createVNode(vueExports.unref(ReuseItemTemplate), {
                                    item,
                                    index: virtualItem.index
                                  }, null, 8, ["item", "index"])
                                ]),
                                _: 1
                              }, 16, ["options", "text-content"]),
                              createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseCreateItemTemplate), { key: 1 })) : vueExports.createCommentVNode("", true)
                            ], 64)) : (vueExports.openBlock(), vueExports.createBlock(vueExports.Fragment, { key: 1 }, [
                              createItem.value && createItemPosition.value === "top" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                key: 0,
                                "data-slot": "group",
                                class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true),
                              (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(filteredGroups.value, (group, groupIndex) => {
                                return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                  key: `group-${groupIndex}`,
                                  "data-slot": "group",
                                  class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                                }, {
                                  default: vueExports.withCtx(() => [
                                    (vueExports.openBlock(true), vueExports.createBlock(vueExports.Fragment, null, vueExports.renderList(group, (item, index) => {
                                      return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ReuseItemTemplate), {
                                        key: `group-${groupIndex}-${index}`,
                                        item,
                                        index
                                      }, null, 8, ["item", "index"]);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128)),
                              createItem.value && createItemPosition.value === "bottom" ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxGroup_default), {
                                key: 1,
                                "data-slot": "group",
                                class: ui.value.group({ class: vueExports.unref(uiProp)?.group })
                              }, {
                                default: vueExports.withCtx(() => [
                                  vueExports.createVNode(vueExports.unref(ReuseCreateItemTemplate))
                                ]),
                                _: 1
                              }, 8, ["class"])) : vueExports.createCommentVNode("", true)
                            ], 64))
                          ], 2),
                          vueExports.renderSlot(_ctx.$slots, "content-bottom")
                        ]),
                        _: 3
                      }, 8, ["class"]),
                      !!__props.arrow ? (vueExports.openBlock(), vueExports.createBlock(vueExports.unref(ComboboxArrow_default), vueExports.mergeProps({ key: 0 }, arrowProps.value, {
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vueExports.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/.pnpm/@nuxt+ui@4.5.1_@tiptap+exte_d0faa0730db27155126639674f551f9c/node_modules/@nuxt/ui/dist/runtime/components/SelectMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { ListboxItem_default as L, _sfc_main as _, useTypeahead as a, ListboxItemIndicator_default as b, ListboxRoot_default as c, ListboxFilter_default as d, ListboxContent_default as e, ListboxVirtualizer_default as f, getEstimateSize as g, ListboxGroup_default as h, injectListboxGroupContext as i, useFocusGuards as u };;globalThis.__timing__.logEnd('Load chunks/build/SelectMenu-9fuPONhl');
//# sourceMappingURL=SelectMenu-9fuPONhl.mjs.map
