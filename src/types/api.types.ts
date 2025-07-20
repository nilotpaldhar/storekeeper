import type {
	CartLineItem,
	CartSummary,
	OrderSummary,
	OrderLineItem,
	AddressRecord,
} from "@/types/domain.types";
import type { Address, PaymentMethod } from "@commercelayer/sdk";

export type APIResponse<T> = {
	status: boolean;
	message?: string;
	data?: T;
};

export type CartResponseData = {
	summary: CartSummary;
	items: CartLineItem[];
};

export type OrderResponseData = {
	summary: OrderSummary;
	items: OrderLineItem[];
};

export type ConfirmedOrderResponseData = {
	summary: OrderSummary;
	paymentMethod?: PaymentMethod | null | undefined;
	address?: {
		billing?: AddressRecord | null | undefined;
		shipping?: AddressRecord | null | undefined;
	};
	items: OrderLineItem[];
};
