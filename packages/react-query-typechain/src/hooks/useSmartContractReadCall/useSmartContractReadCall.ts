import type { Contract } from 'ethers';
import { QueryObserverResult, useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { Unpacked } from '../../base/Unpacked';
import type { ContractMethodArgs, ContractMethodName, StaticContractReturnType } from '../../types';

export interface UseSmartContractReadCallOptions<
	TContract extends Contract,
	TMethodName extends ContractMethodName<TContract>,
	TReturnType extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
	TSelect = TReturnType
> {
	callArgs?: ContractMethodArgs<TContract, TMethodName>;
	enabled?: boolean;
	staleTime?: number;
	chainId?: number;

	keepPreviousData?: boolean;
	select?: (data: TReturnType) => TSelect;
}

const IDENTITY_FN = (v: unknown) => v;

export function useSmartContractReadCall<
	TContract extends Contract,
	TMethodName extends ContractMethodName<TContract>,
	TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
	TData = TContractData
>(
	contract: TContract | undefined,
	methodName: TMethodName,
	options?: UseSmartContractReadCallOptions<TContract, TMethodName, TContractData, TData>
): QueryObserverResult<TData> {
	const queryOptions = makeSmartContractReadCallUseQueryOptions(contract, methodName, options);

	const queryResult = useQuery(queryOptions);

	return queryResult;
}

export function makeSmartContractReadCallUseQueryOptions<
	TContract extends Contract,
	TMethodName extends ContractMethodName<TContract>,
	TContractData extends Unpacked<StaticContractReturnType<TContract, TMethodName>>,
	TData = TContractData
>(
	contract: TContract | undefined,
	methodName: TMethodName,
	options?: UseSmartContractReadCallOptions<TContract, TMethodName, TContractData, TData>
): UseQueryOptions<TContractData, unknown, TData> {
	const { enabled = true, callArgs, staleTime, select, keepPreviousData } = options || {};

	const queryKey = makeSmartContractReadCallQueryKey<TContract, TMethodName>(contract?.address, methodName, callArgs, options?.chainId);

	const queryFn = async (): Promise<TContractData> => {
		const finalArgs = callArgs || [];
		// Read calls are by definition static, so we make sure to call the static method explicitly
		const result = await contract?.callStatic?.[methodName as string](...finalArgs);
		return result;
	};

	const queryOptions: UseQueryOptions<TContractData, unknown, TData> = {
		queryKey,
		queryFn,
		onError: () => {
			console.error(`Error calling ${methodName as string} on ${contract?.address} with arguments:`, callArgs);
		},
		select: select || (IDENTITY_FN as (v: TContractData) => TData),
		keepPreviousData,
		staleTime,
		enabled: Boolean(contract) && enabled
	};

	return queryOptions;
}

export function makeSmartContractReadCallQueryKey<TContract extends Contract, TMethodName extends ContractMethodName<TContract>>(
	contractAddress: string | undefined,
	methodName: TMethodName,
	callArgs: Parameters<TContract['functions'][TMethodName]> | undefined,
	chainId?: number
): [
	string,
	TMethodName,
	string | undefined,
	number | undefined,
	{
		callArgs: Parameters<TContract['functions'][TMethodName]> | undefined;
	}
] {
	return ['contractCall', methodName, contractAddress, chainId, { callArgs }];
}
