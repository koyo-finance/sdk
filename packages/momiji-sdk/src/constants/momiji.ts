import type { MomijiConfiguration } from '../types';

export const MOMIJI_DEFAULT_CONFIGURATION: Required<MomijiConfiguration> = {
	throwOnInsufficientBalance: true,
	throwOnInsufficientApproval: false,
	env: 'prod'
};
