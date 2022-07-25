import { CHAIN_EXPLORER } from '../constants';
import type { ChainId, ExplorerTarget } from '../enums';

export function getExplorerLink(chain: ChainId, target: ExplorerTarget, data: string): string {
	return CHAIN_EXPLORER[chain][target](data);
}
