import type { APIResponse, OrderResponseData } from "@/types/api.types";
import type { OrderStatus } from "@/types/domain.types";

import { z } from "zod";

import { axios, handleAxiosError } from "@/lib/http/client";
import { AttachCustomerToOrderSchema } from "@/lib/schemas";

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

const attachCustomerToOrder = async ({
	orderId,
	name,
	email,
}: {
	orderId: string;
} & z.infer<typeof AttachCustomerToOrderSchema>) => {
	try {
		const res = await axios.patch<APIResponse<undefined>>(`/commerce/orders/${orderId}/customer`, {
			name,
			email,
		});
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { getOrder, attachCustomerToOrder };
