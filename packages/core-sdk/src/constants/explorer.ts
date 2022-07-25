import { ChainId, ExplorerTarget } from '../enums';

export interface ExplorerDefinition {
	[ExplorerTarget.TRANSACTION]: (txHash: string) => string;
	[ExplorerTarget.TOKEN]: (tokenAddress: string) => string;
	[ExplorerTarget.BLOCK]: (blockNumber: string) => string;
	[ExplorerTarget.ADDRESS]: (address: string) => string;
	fallback?: (data: string) => string;
}

export const CHAIN_EXPLORER: { [C in ChainId]: ExplorerDefinition } = {
	[ChainId.ETHEREUM]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://etherscan.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://etherscan.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://etherscan.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://etherscan.io/address/${address}`
	},
	[ChainId.MOONRIVER]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://moonriver.moonscan.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://moonriver.moonscan.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://moonriver.moonscan.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://moonriver.moonscan.io/address/${address}`
	},
	[ChainId.MOONBEAM]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://moonscan.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://moonscan.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://moonscan.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://moonscan.io/address/${address}`
	},
	[ChainId.RINKEBY]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://rinkeby.etherscan.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://rinkeby.etherscan.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://rinkeby.etherscan.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://rinkeby.etherscan.io/address/${address}`
	},
	[ChainId.MOONBASE]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://moonbase.moonscan.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://moonbase.moonscan.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://moonbase.moonscan.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://moonbase.moonscan.io/address/${address}`
	},
	[ChainId.BOBA]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://bobascan.com/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://bobascan.com/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://bobascan.com/tx/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://bobascan.com/address/${address}`
	},
	[ChainId.BOBABEAM]: {
		[ExplorerTarget.TRANSACTION]: () => ``,
		[ExplorerTarget.TOKEN]: () => ``,
		[ExplorerTarget.BLOCK]: () => ``,
		[ExplorerTarget.ADDRESS]: () => ``
	},
	[ChainId.BOBA_RINKEBY]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://testnet.bobascan.com/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://testnet.bobascan.com/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://testnet.bobascan.com/tx/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://testnet.bobascan.com/address/${address}`
	},
	[ChainId.BOBABASE]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://blockexplorer.bobabase.boba.network/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://blockexplorer.bobabase.boba.network/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://blockexplorer.bobabase.boba.network/blocks/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://blockexplorer.bobabase.boba.network/address/${address}`
	},
	[ChainId.AURORA]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://aurorascan.dev/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://aurorascan.dev/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://aurorascan.dev/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://aurorascan.dev/address/${address}`
	},
	[ChainId.POLYGON]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://polygonscan.com/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://polygonscan.com/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://polygonscan.com/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://polygonscan.com/address/${address}`
	},
	[ChainId.FANTOM]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://ftmscan.com/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://ftmscan.com/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://ftmscan.com/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://ftmscan.com/address/${address}`
	},
	[ChainId.BOBAOPERA]: {
		[ExplorerTarget.TRANSACTION]: () => ``,
		[ExplorerTarget.TOKEN]: () => ``,
		[ExplorerTarget.BLOCK]: () => ``,
		[ExplorerTarget.ADDRESS]: () => ``
	},
	[ChainId.AVALANCHE]: {
		[ExplorerTarget.TRANSACTION]: (txHash: string) => `https://snowtrace.io/tx/${txHash}`,
		[ExplorerTarget.TOKEN]: (tokenAddress: string) => `https://snowtrace.io/token/${tokenAddress}`,
		[ExplorerTarget.BLOCK]: (blockNumber: string) => `https://snowtrace.io/block/${blockNumber}`,
		[ExplorerTarget.ADDRESS]: (address: string) => `https://snowtrace.io/address/${address}`
	}
};
