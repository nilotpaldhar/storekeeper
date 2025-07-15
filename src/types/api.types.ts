import type { CartLineItem, CartSummary } from "@/types/domain.types";

export type APIResponse<T> = {
	status: boolean;
	message?: string;
	data?: T;
};

export type CartResponseData = {
	summary: CartSummary;
	items: CartLineItem[];
};
