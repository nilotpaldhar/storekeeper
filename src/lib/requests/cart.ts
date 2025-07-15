import type { APIResponse, CartResponseData } from "@/types/api.types";
import type { CartCount, CartLineItem } from "@/types/domain.types";

import { z } from "zod";

import { axios, handleAxiosError } from "@/lib/http/client";
import { AddCartItemSchema, UpdateCartItemQuantitySchema } from "@/lib/schemas";

const getCart = async () => {
	try {
		const res = await axios.get<APIResponse<CartResponseData>>(`/commerce/cart`);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const getCartCount = async () => {
	try {
		const res = await axios.get<APIResponse<CartCount>>(`/commerce/cart/count`);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const addCartItem = async ({ skuCode, quantity }: z.infer<typeof AddCartItemSchema>) => {
	try {
		const res = await axios.post<APIResponse<CartLineItem>>(`/commerce/cart/items`, {
			skuCode,
			quantity,
		});
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const updateCartItemQuantity = async ({
	lineItemId,
	quantity,
}: z.infer<typeof UpdateCartItemQuantitySchema> & { lineItemId: string }) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(`/commerce/cart/items/${lineItemId}`, {
			quantity,
		});
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const removeCartItem = async ({ lineItemId }: { lineItemId: string }) => {
	try {
		const res = await axios.delete<APIResponse<undefined>>(`/commerce/cart/items/${lineItemId}`);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { getCart, getCartCount, addCartItem, updateCartItemQuantity, removeCartItem };
