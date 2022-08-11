export function objectToQueryString(o: { [key: string]: string | number | undefined }): string {
	if (!o) {
		return '';
	}

	const qs = new URLSearchParams();

	for (const key of Object.keys(o)) {
		const value = o[key];
		if (value) {
			qs.append(key, value.toString());
		}
	}

	const qsResult = qs.toString();

	return qsResult ? `?${qsResult}` : '';
}
