import type { BigNumber, Contract, ContractTransaction, Overrides, PopulatedTransaction } from 'ethers';

export type ContractMethodReturnType<T extends Contract, U extends keyof T['callStatic']> = Awaited<ReturnType<T['callStatic'][U]>>;

export interface TransactionMethods<T = unknown> {
	buildTransaction: (overrides?: Overrides) => Promise<PopulatedTransaction>;
	callStatic: (overrides?: Overrides) => Promise<T>;
	estimateGas: (overrides?: Overrides) => Promise<BigNumber>;
	transact: (overrides?: Overrides) => Promise<ContractTransaction>;
}
