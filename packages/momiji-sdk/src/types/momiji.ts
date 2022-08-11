import type { Env } from './cow';

export interface MomijiConfiguration {
	throwOnInsufficientBalance?: boolean;
	throwOnInsufficientApproval?: boolean;
	env?: Env;
}
