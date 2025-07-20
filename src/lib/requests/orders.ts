import type { APIResponse, ConfirmedOrderResponseData, OrderResponseData } from "@/types/api.types";
import type { OrderStatus } from "@/types/domain.types";
import type { ShippingMethod, PaymentMethod } from "@commercelayer/sdk";

import { z } from "zod";

import { axios, handleAxiosError } from "@/lib/http/client";
import {
	AttachCustomerToOrderSchema,
	UpdateOrderAddressesSchema,
	UpdateOrderShippingMethodSchema,
	UpdateOrderPaymentMethodSchema,
} from "@/lib/schemas";

const getOrder = async ({ id, status }: { id: string; status?: OrderStatus }) => {
	try {
		const params = new URLSearchParams();
		if (status) params.append("status", `${status}`);
		const url = `/commerce/orders/${id}?${params.toString()}`;

		const res = await axios.get<APIResponse<OrderResponseData>>(url);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const getConfirmedOrder = async ({ id }: { id: string }) => {
	try {
		const res = await axios.get<APIResponse<ConfirmedOrderResponseData>>(
			`/commerce/orders/${id}/confirmation`
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const getOrderShippingMethods = async ({ id }: { id: string }) => {
	try {
		const res = await axios.get<APIResponse<ShippingMethod[]>>(
			`/commerce/orders/${id}/shipping-methods`
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const getOrderPaymentMethods = async ({ id }: { id: string }) => {
	try {
		const res = await axios.get<APIResponse<PaymentMethod[]>>(
			`/commerce/orders/${id}/payment-methods`
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const attachCustomerToOrder = async ({
	orderId,
	...data
}: {
	orderId: string;
} & z.infer<typeof AttachCustomerToOrderSchema>) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(
			`/commerce/orders/${orderId}/customer`,
			data
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const updateOrderAddresses = async ({
	orderId,
	...data
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderAddressesSchema>) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(
			`/commerce/orders/${orderId}/address`,
			data
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const updateOrderShippingMethod = async ({
	orderId,
	shippingMethodId,
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderShippingMethodSchema>) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(
			`/commerce/orders/${orderId}/shipping-methods`,
			{ shippingMethodId }
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const updateOrderPaymentMethod = async ({
	orderId,
	paymentMethodId,
}: {
	orderId: string;
} & z.infer<typeof UpdateOrderPaymentMethodSchema>) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(
			`/commerce/orders/${orderId}/payment-methods`,
			{ paymentMethodId }
		);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

const placeOrder = async ({ orderId }: { orderId: string }) => {
	try {
		const res = await axios.post<APIResponse<undefined>>(`/commerce/orders/${orderId}/place`);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export {
	getOrder,
	getConfirmedOrder,
	getOrderShippingMethods,
	getOrderPaymentMethods,
	attachCustomerToOrder,
	updateOrderAddresses,
	updateOrderShippingMethod,
	updateOrderPaymentMethod,
	placeOrder,
};
