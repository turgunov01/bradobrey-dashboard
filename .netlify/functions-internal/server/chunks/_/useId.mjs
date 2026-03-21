globalThis.__timing__.logStart('Load chunks/_/useId');import { af as injectConfigProviderContext } from '../build/server.mjs';
import { j as vue, v as vueExports } from '../routes/renderer.mjs';

//#region src/shared/useId.ts
let count = 0;
/**
* The `useId` function generates a unique identifier using a provided deterministic ID or a default
* one prefixed with "reka-", or the provided one via `useId` props from `<ConfigProvider>`.
* @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
* optional parameter `deterministicId`, which can be a string, null, or undefined. If
* `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
* the `useId` function obtained
*/
function useId(deterministicId, prefix = "reka") {
	if (deterministicId) return deterministicId;
	if ("useId" in vue) return `${prefix}-${vueExports.useId?.()}`;
	const configProviderContext = injectConfigProviderContext({ useId: void 0 });
	if (configProviderContext.useId) return `${prefix}-${configProviderContext.useId()}`;
	return `${prefix}-${++count}`;
}

export { useId as u };;globalThis.__timing__.logEnd('Load chunks/_/useId');
//# sourceMappingURL=useId.mjs.map
