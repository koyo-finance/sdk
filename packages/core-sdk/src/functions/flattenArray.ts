export function flattenArray<T = unknown>(arrays: T[][]) {
	return new Array<T>().concat(...arrays);
}
