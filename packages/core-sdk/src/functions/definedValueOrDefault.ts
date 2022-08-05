export function definedValueOrDefault<T>(value: T | undefined, defaultValue: T): T {
	return value || defaultValue;
}

export function definedValueOrDefaultNullish<T>(value: T | undefined, defaultValue: T): T {
	return value ?? defaultValue;
}
