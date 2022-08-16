/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'cross-fetch';
import type { ApiOptions, BaseApiConstructorParams } from '../../../types';
import { MomijiError } from '../../../utils';

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' };
const DEFAULT_API_VERSION = 'v1';
export class BaseApi {
	public context;
	public API_NAME;
	public API_VERSION;
	public API_URL_GETTER;
	public DEFAULT_HEADERS;

	public constructor({ context, name, getApiUrl, defaultHeaders = DEFAULT_HEADERS, apiVersion = DEFAULT_API_VERSION }: BaseApiConstructorParams) {
		this.context = context;
		this.API_NAME = name;
		this.API_VERSION = apiVersion;
		this.API_URL_GETTER = getApiUrl;
		this.DEFAULT_HEADERS = defaultHeaders;
	}

	protected async getApiBaseUrl(...params: unknown[]): Promise<string> {
		const chainId = await this.context.chainId;
		const baseUrl = this.API_URL_GETTER(...params)[chainId];

		if (baseUrl) return `${baseUrl}/${this.API_VERSION}`;
		throw new MomijiError(`Unsupported Network. The ${this.API_NAME} API is not deployed in the Network ${chainId}`);
	}

	protected post(url: string, data: unknown, options: ApiOptions = {}): Promise<Response> {
		return this.handleMethod(url, 'POST', this.fetch.bind(this), this.API_URL_GETTER, options, data);
	}

	protected get(url: string, options: ApiOptions = {}): Promise<Response> {
		return this.handleMethod(url, 'GET', this.fetch.bind(this), this.API_URL_GETTER, options);
	}

	protected delete(url: string, data: unknown, options: ApiOptions = {}): Promise<Response> {
		return this.handleMethod(url, 'DELETE', this.fetch.bind(this), this.API_URL_GETTER, options, data);
	}

	protected async handleMethod(
		url: string,
		method: 'GET' | 'POST' | 'DELETE',
		fetchFn: BaseApi['fetch'],
		getApiUrl: BaseApi['API_URL_GETTER'],
		options: ApiOptions = {},
		data?: unknown
	): Promise<Response> {
		const { chainId: networkId, env, requestOptions } = options;
		const prodUri = getApiUrl('prod');
		const barnUri = getApiUrl('staging');

		const chainId = networkId || (await this.context.chainId);

		let response;
		if (env === undefined) {
			try {
				response = await fetchFn(url, method, `${prodUri[chainId]}/${this.API_VERSION}`, data, requestOptions);
			} catch (error) {
				response = await fetchFn(url, method, `${barnUri[chainId]}/${this.API_VERSION}`, data, requestOptions);
			}
		} else {
			const uri = getApiUrl(env);
			response = await fetchFn(url, method, `${uri[chainId]}/${this.API_VERSION}`, data, requestOptions);
		}

		return response;
	}

	protected async fetch(
		url: string,
		method: 'GET' | 'POST' | 'DELETE',
		baseUrl: string,
		data?: unknown,
		requestOptions?: RequestInit
	): Promise<Response> {
		return fetch(baseUrl + url, {
			headers: this.DEFAULT_HEADERS,
			...requestOptions,
			method,
			body: data === undefined ? data : JSON.stringify(data)
		});
	}
}
