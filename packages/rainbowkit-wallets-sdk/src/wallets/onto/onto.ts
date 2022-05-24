import type { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { ONTOConnector } from '../../core';

export interface OntoOptions {
	chains: Chain[];
	shimDisconnect?: boolean;
}

export const onto = ({ chains, shimDisconnect }: OntoOptions): Wallet => ({
	id: 'onto',
	name: 'ONTO',
	// @ts-expect-error .png imports are wild.
	iconUrl: async () => (await import('./onto.png')).default,
	iconBackground: '#fff',
	createConnector: () => ({
		connector: new ONTOConnector({
			chains,
			options: { shimDisconnect }
		})
	})
});
