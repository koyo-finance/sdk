import { Momiji, Signer, SupportedChainsList, SUPPORTED_CHAINS, UnsignedUserOrder } from '@koyofinance/momiji-sdk';
import { useMutation } from 'react-query';

export interface OrderCreationVariables {
	order: UnsignedUserOrder;
}

export function useCreateOrder(signer?: Signer, chainId?: SupportedChainsList) {
	const defaultedChain = chainId || SUPPORTED_CHAINS[0];

	return useMutation({
		mutationFn: async (variables: OrderCreationVariables): Promise<string> => {
			if (!signer) {
				return '';
			}

			const momiji = new Momiji(defaultedChain, signer);

			const order = await momiji.createOrder(variables.order);
			const actionExecution = await order.executeAllActions();

			return actionExecution.id || '';
		}
	});
}
