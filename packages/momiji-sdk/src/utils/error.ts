export class MomijiError extends Error {
	public error_code?: string;

	public constructor(message: string, error_code?: string) {
		super(message);
		this.error_code = error_code;
	}
}
