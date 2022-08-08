import type { Env } from '@cowprotocol/cow-sdk/dist/utils/context';

export interface MomijiConfiguration {
	throwOnInsufficientBalance?: boolean;
	throwOnInsufficientApproval?: boolean;
	env?: Env;
}
