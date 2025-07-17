import type { CartLineItem, CartSummary, OrderSummary, OrderLineItem } from "@/types/domain.types";

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
