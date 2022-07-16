import type { SorConfig } from '@balancer-labs/sor';

export interface KoyoSorConfig extends Omit<SorConfig, 'staBal3Pool' | 'usdcConnectingPool' | 'wETHwstETH'> {}
