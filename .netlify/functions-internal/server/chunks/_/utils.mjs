globalThis.__timing__.logStart('Load chunks/_/utils');import { af as injectConfigProviderContext, B as getActiveElement } from '../build/server.mjs';
import { v as vueExports } from '../routes/renderer.mjs';

//#region src/shared/useDirection.ts
/**
* The `useDirection` function provides a way to access the current direction in your application.
* @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
* @returns  computed value that combines with the resolved direction.
*/
function useDirection(dir) {
	const context = injectConfigProviderContext({ dir: vueExports.ref("ltr") });
	return vueExports.computed(() => dir?.value || context.dir?.value || "ltr");
}

//#region src/RovingFocus/utils.ts
const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
const MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function getDirectionAwareKey(key, dir) {
	if (dir !== "rtl") return key;
	return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
	const key = getDirectionAwareKey(event.key, dir);
	if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
	if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
	const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
	for (const candidate of candidates) {
		if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
		candidate.focus({ preventScroll });
		if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
	}
}
/**
* Wraps an array around itself at a given start index
* Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
*/
function wrapArray(array, startIndex) {
	return array.map((_, index) => array[(startIndex + index) % array.length]);
}

export { ENTRY_FOCUS as E, MAP_KEY_TO_FOCUS_INTENT as M, EVENT_OPTIONS as a, focusFirst as f, getFocusIntent as g, useDirection as u, wrapArray as w };;globalThis.__timing__.logEnd('Load chunks/_/utils');
//# sourceMappingURL=utils.mjs.map
