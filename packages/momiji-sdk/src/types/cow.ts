import type { SupportedChainId } from '@cowprotocol/cow-sdk';
import type { ChainId } from '@koyofinance/core-sdk';
import type { Signer } from 'ethers';

export type Env = 'prod' | 'staging';

export interface Ipfs {
	uri?: string;
	writeUri?: string;
	readUri?: string;
	pinataApiKey?: string;
	pinataApiSecret?: string;
}

export interface SubgraphOptions {
	chainId?: ChainId;
	env?: Env;
}

export interface CowContext {
	appDataHash?: string;
	isDevEnvironment?: boolean;
	signer?: Signer;
	ipfs?: Ipfs;
}

export interface Context {
	updateContext: (cowContext: CowContext, chainId: SupportedChainId) => void;
	updateChainId: (chainId: SupportedChainId) => SupportedChainId;
	chainId: Promise<SupportedChainId>;
	appDataHash: string;
	env: Env;
	signer: Signer | undefined;
	ipfs: Ipfs;
}

export type SigningSchemeValue = 'eip712' | 'ethsign' | 'eip1271' | 'presign';

export interface SchemaInfo {
	libraryValue: number;
	apiValue: SigningSchemeValue;
}
