import type { SupportedChainsList } from '../chains';
import type { Context, Env } from '../cow';

export interface BaseApiConstructorParams {
	context: Context;
	name: string;
	apiVersion?: string;
	// we want getApiUrl to accept any parameters but return a specific type
	getApiUrl: (...params: any[]) => Partial<Record<SupportedChainsList, string>>;
	defaultHeaders?: HeadersInit;
}

export interface ApiOptions {
	chainId?: SupportedChainsList;
	env?: Env;
	requestOptions?: RequestInit;
	apiUrlGetterParams?: unknown[];
}
