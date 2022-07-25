import type { SwapInfo, SwapTypes } from '@balancer-labs/sor';
import { Vault__factory } from '../types/contracts/exchange';
import { MaxUint256 } from '@ethersproject/constants';
import type { IVault } from '../types/contracts/exchange/Vault';

export function encodeBatchSwapCalldata(swapType: SwapTypes, swapInfo: SwapInfo, funds: IVault.FundManagementStruct, limits: string[]): string {
	const vaultInterface = Vault__factory.createInterface();

	return vaultInterface.encodeFunctionData(
		'batchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool),int256[],uint256)',
		[swapType, swapInfo.swaps, swapInfo.tokenAddresses, funds, limits, MaxUint256]
	);
}
