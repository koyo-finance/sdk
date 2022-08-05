import type { ContractTransaction } from 'ethers';
import type { ERC20 } from './contracts/util';
import type { UnsignedUserOrder } from './order';
import type { SigningResult } from './signatures';
import type { ContractMethodReturnType, TransactionMethods } from './tx';

export interface ApprovalAction {
	type: 'approval';
	asset: string;
	operator: string;
	transactionMethods: TransactionMethods<ContractMethodReturnType<ERC20, 'approve'>>;
}

export interface CreateOrderActionResult extends SigningResult {
	parameters: UnsignedUserOrder;
}

export interface CreateOrderAction {
	type: 'create';
	getMessageToSign: () => string;
	createOrder: () => Promise<CreateOrderActionResult>;
}

export interface CancelOrderAction {
	type: 'cancel';
	getMessageToSign: () => Promise<string>;
	// TODO: Add proper type
	cancelOrder: () => Promise<unknown>;
}

export type TransactionAction = ApprovalAction;

export type CreateOrderActions = readonly [...ApprovalAction[], CreateOrderAction];
export type CancelOrderActions = readonly [...ApprovalAction[], CancelOrderAction];

export interface OrderUseCase<T extends CreateOrderAction | CancelOrderAction> {
	actions: T extends CreateOrderAction ? CreateOrderActions : CancelOrderActions;
	executeAllActions: () => Promise<T extends CreateOrderAction ? CreateOrderActionResult : ContractTransaction>;
}
