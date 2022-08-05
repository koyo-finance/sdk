export const EMPTY_ERROR_STRING = '';

export function getErrorMessage(error: string | Error | undefined): string {
	if (error === undefined) {
		return EMPTY_ERROR_STRING;
	} else if (typeof error === 'string') {
		return error;
	}

	return error.message;
}
