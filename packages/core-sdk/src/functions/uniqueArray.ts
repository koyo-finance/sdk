export default function uniqueArray<T = unknown>(array: T[]) {
	return Array.from(new Set(array).values());
}
