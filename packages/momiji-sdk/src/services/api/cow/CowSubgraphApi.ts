import { CowError, SupportedChainId } from '@cowprotocol/cow-sdk';
import fetch from 'cross-fetch';
import type { DocumentNode } from 'graphql';
import { GraphQLClient, Variables } from 'graphql-request';
import log from 'loglevel';
import type { Context } from '../../../types';
import type { LastDaysVolumeQuery, LastHoursVolumeQuery, TotalsQuery } from './graphql';
import { LAST_DAYS_VOLUME_QUERY, LAST_HOURS_VOLUME_QUERY, TOTALS_QUERY } from './queries';

const subgraphUrls: Record<SupportedChainId, string> = {
	[SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/cowprotocol/cow',
	[SupportedChainId.RINKEBY]: 'https://api.thegraph.com/subgraphs/name/cowprotocol/cow-rinkeby',
	[SupportedChainId.GOERLI]: 'https://api.thegraph.com/subgraphs/name/cowprotocol/cow-goerli',
	[SupportedChainId.GNOSIS_CHAIN]: 'https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc'
};

export class CowSubgraphApi {
	public context: Context;
	public clients: Record<SupportedChainId, GraphQLClient>;

	public API_NAME = 'CoW Protocol Subgraph';

	public constructor(context: Context) {
		this.context = context;
		this.clients = this.createClients();
	}

	public async getBaseUrl(): Promise<string> {
		const chainId = await this.context.chainId;
		return subgraphUrls[chainId];
	}

	public async getTotals(): Promise<TotalsQuery['totals'][0]> {
		const chainId = await this.context.chainId;
		log.debug(`[subgraph:${this.API_NAME}] Get totals for:`, chainId);
		const response = await this.runQuery<TotalsQuery>(TOTALS_QUERY);
		return response.totals[0];
	}

	public async getLastDaysVolume(days: number): Promise<LastDaysVolumeQuery> {
		const chainId = await this.context.chainId;
		log.debug(`[subgraph:${this.API_NAME}] Get last ${days} days volume for:`, chainId);
		return this.runQuery<LastDaysVolumeQuery>(LAST_DAYS_VOLUME_QUERY, { days });
	}

	public async getLastHoursVolume(hours: number): Promise<LastHoursVolumeQuery> {
		const chainId = await this.context.chainId;
		log.debug(`[subgraph:${this.API_NAME}] Get last ${hours} hours volume for:`, chainId);
		return this.runQuery<LastHoursVolumeQuery>(LAST_HOURS_VOLUME_QUERY, { hours });
	}

	public async runQuery<T>(query: string | DocumentNode, variables?: Variables): Promise<T> {
		try {
			const chainId = await this.context.chainId;
			const client = this.clients[chainId];
			const response = await client.request(query, variables);
			return response;
		} catch (error) {
			log.error(error);
			const baseUrl = await this.getBaseUrl();
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			throw new CowError(`Error running query: ${query}. Variables: ${JSON.stringify(variables)}. API: ${baseUrl}. Inner Error: ${error}`);
		}
	}

	private createClients(): Record<SupportedChainId, GraphQLClient> {
		return {
			[SupportedChainId.MAINNET]: new GraphQLClient(subgraphUrls[SupportedChainId.MAINNET], { fetch }),
			[SupportedChainId.RINKEBY]: new GraphQLClient(subgraphUrls[SupportedChainId.RINKEBY], { fetch }),
			[SupportedChainId.GOERLI]: new GraphQLClient(subgraphUrls[SupportedChainId.GOERLI], { fetch }),
			[SupportedChainId.GNOSIS_CHAIN]: new GraphQLClient(subgraphUrls[SupportedChainId.GNOSIS_CHAIN], { fetch })
		};
	}
}
