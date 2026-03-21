globalThis.__timing__.logStart('Load chunks/_/FocusScope');import { ad as tryOnBeforeUnmount, ae as createSharedComposable, af as injectConfigProviderContext, ag as unrefElement, ah as createGlobalState, m as useForwardExpose, B as getActiveElement, ai as AUTOFOCUS_ON_MOUNT, aj as focusFirst, ak as getTabbableCandidates, al as focus, am as AUTOFOCUS_ON_UNMOUNT, P as Primitive, an as EVENT_OPTIONS, ao as getTabbableEdges } from '../build/server.mjs';
import { v as vueExports } from '../routes/renderer.mjs';

//#region src/shared/useBodyScrollLock.ts
const useBodyLockStackCount = createSharedComposable(() => {
	const map = vueExports.ref(/* @__PURE__ */ new Map());
	vueExports.ref();
	const locked = vueExports.computed(() => {
		for (const value of map.value.values()) if (value) return true;
		return false;
	});
	injectConfigProviderContext({ scrollBody: vueExports.ref(true) });
	vueExports.watch(locked, (val, oldVal) => {
		return;
	}, {
		immediate: true,
		flush: "sync"
	});
	return map;
});
function useBodyScrollLock(initialState) {
	const id = Math.random().toString(36).substring(2, 7);
	const map = useBodyLockStackCount();
	map.value.set(id, initialState ?? false);
	const locked = vueExports.computed({
		get: () => map.value.get(id) ?? false,
		set: (value) => map.value.set(id, value)
	});
	tryOnBeforeUnmount(() => {
		map.value.delete(id);
	});
	return locked;
}

var es5 = {};

(function (exports$1) {
	Object.defineProperty(exports$1, "__esModule", { value: true });
	exports$1.suppressOthers = exports$1.supportsInert = exports$1.inertOthers = exports$1.hideOthers = void 0;
	var getDefaultParent = function (originalTarget) {
	    if (typeof document === 'undefined') {
	        return null;
	    }
	    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
	    return sampleTarget.ownerDocument.body;
	};
	var counterMap = new WeakMap();
	var uncontrolledNodes = new WeakMap();
	var markerMap = {};
	var lockCount = 0;
	var unwrapHost = function (node) {
	    return node && (node.host || unwrapHost(node.parentNode));
	};
	var correctTargets = function (parent, targets) {
	    return targets
	        .map(function (target) {
	        if (parent.contains(target)) {
	            return target;
	        }
	        var correctedTarget = unwrapHost(target);
	        if (correctedTarget && parent.contains(correctedTarget)) {
	            return correctedTarget;
	        }
	        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
	        return null;
	    })
	        .filter(function (x) { return Boolean(x); });
	};
	/**
	 * Marks everything except given node(or nodes) as aria-hidden
	 * @param {Element | Element[]} originalTarget - elements to keep on the page
	 * @param [parentNode] - top element, defaults to document.body
	 * @param {String} [markerName] - a special attribute to mark every node
	 * @param {String} [controlAttribute] - html Attribute to control
	 * @return {Undo} undo command
	 */
	var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
	    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	    if (!markerMap[markerName]) {
	        markerMap[markerName] = new WeakMap();
	    }
	    var markerCounter = markerMap[markerName];
	    var hiddenNodes = [];
	    var elementsToKeep = new Set();
	    var elementsToStop = new Set(targets);
	    var keep = function (el) {
	        if (!el || elementsToKeep.has(el)) {
	            return;
	        }
	        elementsToKeep.add(el);
	        keep(el.parentNode);
	    };
	    targets.forEach(keep);
	    var deep = function (parent) {
	        if (!parent || elementsToStop.has(parent)) {
	            return;
	        }
	        Array.prototype.forEach.call(parent.children, function (node) {
	            if (elementsToKeep.has(node)) {
	                deep(node);
	            }
	            else {
	                try {
	                    var attr = node.getAttribute(controlAttribute);
	                    var alreadyHidden = attr !== null && attr !== 'false';
	                    var counterValue = (counterMap.get(node) || 0) + 1;
	                    var markerValue = (markerCounter.get(node) || 0) + 1;
	                    counterMap.set(node, counterValue);
	                    markerCounter.set(node, markerValue);
	                    hiddenNodes.push(node);
	                    if (counterValue === 1 && alreadyHidden) {
	                        uncontrolledNodes.set(node, true);
	                    }
	                    if (markerValue === 1) {
	                        node.setAttribute(markerName, 'true');
	                    }
	                    if (!alreadyHidden) {
	                        node.setAttribute(controlAttribute, 'true');
	                    }
	                }
	                catch (e) {
	                    console.error('aria-hidden: cannot operate on ', node, e);
	                }
	            }
	        });
	    };
	    deep(parentNode);
	    elementsToKeep.clear();
	    lockCount++;
	    return function () {
	        hiddenNodes.forEach(function (node) {
	            var counterValue = counterMap.get(node) - 1;
	            var markerValue = markerCounter.get(node) - 1;
	            counterMap.set(node, counterValue);
	            markerCounter.set(node, markerValue);
	            if (!counterValue) {
	                if (!uncontrolledNodes.has(node)) {
	                    node.removeAttribute(controlAttribute);
	                }
	                uncontrolledNodes.delete(node);
	            }
	            if (!markerValue) {
	                node.removeAttribute(markerName);
	            }
	        });
	        lockCount--;
	        if (!lockCount) {
	            // clear
	            counterMap = new WeakMap();
	            counterMap = new WeakMap();
	            uncontrolledNodes = new WeakMap();
	            markerMap = {};
	        }
	    };
	};
	/**
	 * Marks everything except given node(or nodes) as aria-hidden
	 * @param {Element | Element[]} originalTarget - elements to keep on the page
	 * @param [parentNode] - top element, defaults to document.body
	 * @param {String} [markerName] - a special attribute to mark every node
	 * @return {Undo} undo command
	 */
	var hideOthers = function (originalTarget, parentNode, markerName) {
	    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
	    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	    var activeParentNode = parentNode || getDefaultParent(originalTarget);
	    if (!activeParentNode) {
	        return function () { return null; };
	    }
	    // we should not hide aria-live elements - https://github.com/theKashey/aria-hidden/issues/10
	    // and script elements, as they have no impact on accessibility.
	    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live], script')));
	    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
	};
	exports$1.hideOthers = hideOthers;
	/**
	 * Marks everything except given node(or nodes) as inert
	 * @param {Element | Element[]} originalTarget - elements to keep on the page
	 * @param [parentNode] - top element, defaults to document.body
	 * @param {String} [markerName] - a special attribute to mark every node
	 * @return {Undo} undo command
	 */
	var inertOthers = function (originalTarget, parentNode, markerName) {
	    if (markerName === void 0) { markerName = 'data-inert-ed'; }
	    var activeParentNode = parentNode || getDefaultParent(originalTarget);
	    if (!activeParentNode) {
	        return function () { return null; };
	    }
	    return applyAttributeToOthers(originalTarget, activeParentNode, markerName, 'inert');
	};
	exports$1.inertOthers = inertOthers;
	/**
	 * @returns if current browser supports inert
	 */
	var supportsInert = function () {
	    return typeof HTMLElement !== 'undefined' && HTMLElement.prototype.hasOwnProperty('inert');
	};
	exports$1.supportsInert = supportsInert;
	/**
	 * Automatic function to "suppress" DOM elements - _hide_ or _inert_ in the best possible way
	 * @param {Element | Element[]} originalTarget - elements to keep on the page
	 * @param [parentNode] - top element, defaults to document.body
	 * @param {String} [markerName] - a special attribute to mark every node
	 * @return {Undo} undo command
	 */
	var suppressOthers = function (originalTarget, parentNode, markerName) {
	    if (markerName === void 0) { markerName = 'data-suppressed'; }
	    return ((0, exports$1.supportsInert)() ? exports$1.inertOthers : exports$1.hideOthers)(originalTarget, parentNode, markerName);
	};
	exports$1.suppressOthers = suppressOthers; 
} (es5));

//#region src/shared/useHideOthers.ts
/**
* The `useHideOthers` function is a TypeScript function that takes a target element reference and
* hides all other elements in ARIA when the target element is present, and restores the visibility of the
* hidden elements when the target element is removed.
* @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
* to hide other elements when it is clicked or focused.
*/
function useHideOthers(target) {
	let undo;
	vueExports.watch(() => unrefElement(target), (el) => {
		if (el) undo = es5.hideOthers(el);
		else if (undo) undo();
	});
	vueExports.onUnmounted(() => {
		if (undo) undo();
	});
}

//#region src/FocusScope/stack.ts
const useFocusStackState = createGlobalState(() => {
	const stack = vueExports.ref([]);
	return stack;
});
function createFocusScopesStack() {
	/** A stack of focus scopes, with the active one at the top */
	const stack = useFocusStackState();
	return {
		add(focusScope) {
			const activeFocusScope = stack.value[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value.unshift(focusScope);
		},
		remove(focusScope) {
			stack.value = arrayRemove(stack.value, focusScope);
			stack.value[0]?.resume();
		}
	};
}
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}

//#region src/FocusScope/FocusScope.vue?vue&type=script&setup=true&lang.ts
var FocusScope_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vueExports.defineComponent({
	__name: "FocusScope",
	props: {
		loop: {
			type: Boolean,
			required: false,
			default: false
		},
		trapped: {
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
			required: false
		}
	},
	emits: ["mountAutoFocus", "unmountAutoFocus"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emits = __emit;
		const { currentRef, currentElement } = useForwardExpose();
		vueExports.ref(null);
		const focusScopesStack = createFocusScopesStack();
		const focusScope = vueExports.reactive({
			paused: false,
			pause() {
				this.paused = true;
			},
			resume() {
				this.paused = false;
			}
		});
		vueExports.watchEffect((cleanupFn) => {
			return;
		});
		vueExports.watchEffect(async (cleanupFn) => {
			const container = currentElement.value;
			await vueExports.nextTick();
			if (!container) return;
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = getActiveElement();
			const hasFocusedCandidate = container.contains(previouslyFocusedElement);
			if (!hasFocusedCandidate) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst(getTabbableCandidates(container), { select: true });
					if (getActiveElement() === previouslyFocusedElement) focus(container);
				}
			}
			cleanupFn(() => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev) => emits("mountAutoFocus", ev));
				const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
				const unmountEventHandler = (ev) => {
					emits("unmountAutoFocus", ev);
				};
				container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
				container.dispatchEvent(unmountEvent);
				setTimeout(() => {
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
					focusScopesStack.remove(focusScope);
				}, 0);
			});
		});
		function handleKeyDown(event) {
			if (!props.loop && !props.trapped) return;
			if (focusScope.paused) return;
			const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
			const focusedElement = getActiveElement();
			if (isTabKey && focusedElement) {
				const container = event.currentTarget;
				const [first, last] = getTabbableEdges(container);
				const hasTabbableElementsInside = first && last;
				if (!hasTabbableElementsInside) {
					if (focusedElement === container) event.preventDefault();
				} else if (!event.shiftKey && focusedElement === last) {
					event.preventDefault();
					if (props.loop) focus(first, { select: true });
				} else if (event.shiftKey && focusedElement === first) {
					event.preventDefault();
					if (props.loop) focus(last, { select: true });
				}
			}
		}
		return (_ctx, _cache) => {
			return vueExports.openBlock(), vueExports.createBlock(vueExports.unref(Primitive), {
				ref_key: "currentRef",
				ref: currentRef,
				tabindex: "-1",
				"as-child": _ctx.asChild,
				as: _ctx.as,
				onKeydown: handleKeyDown
			}, {
				default: vueExports.withCtx(() => [vueExports.renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["as-child", "as"]);
		};
	}
});

//#endregion
//#region src/FocusScope/FocusScope.vue
var FocusScope_default = FocusScope_vue_vue_type_script_setup_true_lang_default;

export { FocusScope_default as F, useHideOthers as a, useBodyScrollLock as u };;globalThis.__timing__.logEnd('Load chunks/_/FocusScope');
//# sourceMappingURL=FocusScope.mjs.map
