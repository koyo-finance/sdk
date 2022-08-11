import type { SupportedChainId } from '@cowprotocol/cow-sdk';
import { ChainId } from '@koyofinance/core-sdk';
import fetch from 'cross-fetch';
import { GraphQLClient } from 'graphql-request';
import { CHAIN_MOMIJI_SUBGRAPH } from '../../constants';
import type { Context, SupportedChainsList } from '../../types';
import { CowSubgraphApi } from './cow';

export class MomijiSubgraphApi extends CowSubgraphApi {
	public readonly API_NAME = 'Momiji Protocol Subgraph';

	public constructor(chainId: ChainId) {
		super({ chainId } as unknown as Context);

		this.clients = this.createMomijiGraphQLClients() as unknown as Record<SupportedChainId, GraphQLClient>;
	}

	private createMomijiGraphQLClients(): { [C in SupportedChainsList]: GraphQLClient } {
		return {
			[ChainId.BOBA]: new GraphQLClient(CHAIN_MOMIJI_SUBGRAPH[ChainId.BOBA], { fetch })
		};
	}
}
