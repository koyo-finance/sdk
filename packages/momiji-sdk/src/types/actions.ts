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

export interface CancelOrderActionResult extends SigningResult {}

export interface CancelOrderAction {
	type: 'cancel';
	getMessageToSign: () => Promise<string>;
	cancelOrder: () => Promise<CancelOrderActionResult>;
}

export interface SubmitAction {
	type: 'submit';
	submit: (signature: SigningResult) => Promise<void>;
}

export type TransactionAction = ApprovalAction;

export type CreateOrderActions = readonly [...ApprovalAction[], CreateOrderAction, SubmitAction];
export type CancelOrderActions = readonly [...ApprovalAction[], CancelOrderAction];

export interface OrderUseCase<T extends CreateOrderAction | CancelOrderAction | SubmitAction> {
	actions: T extends CreateOrderAction ? CreateOrderActions : CancelOrderActions;
	executeAllActions: () => Promise<T extends CreateOrderAction ? CreateOrderActionResult : ContractTransaction>;
}
