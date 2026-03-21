globalThis.__timing__.logStart('Load chunks/_/isValueEqualOrExist');import { av as isNullish } from '../build/server.mjs';
import { I as isEqual } from './nitro.mjs';

//#region src/shared/isValueEqualOrExist.ts
/**
* The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or
* array.
* @param {T | T[] | undefined} base - It represents the base value that you want to compare with the `current` value.
* @param {T | T[] | undefined} current - The `current` parameter represents the current value that you want to compare with the `base` value or values.
* @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value
* is equal to the `current` value or if the `current` value exists within the `base` value. The
* function handles cases where `base` can be a single value, an array of values, or undefined.
*/
function isValueEqualOrExist(base, current) {
	if (isNullish(base)) return false;
	if (Array.isArray(base)) return base.some((val) => isEqual(val, current));
	else return isEqual(base, current);
}

export { isValueEqualOrExist as i };;globalThis.__timing__.logEnd('Load chunks/_/isValueEqualOrExist');
//# sourceMappingURL=isValueEqualOrExist.mjs.map
