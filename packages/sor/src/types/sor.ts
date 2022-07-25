import type { SorConfig, SwapInfo } from '@balancer-labs/sor';

export interface KoyoSorConfig extends Omit<SorConfig, 'staBal3Pool' | 'usdcConnectingPool' | 'wETHwstETH'> {}

export interface SwapInfoWithCalldata extends SwapInfo {
	calldata: string;
}
