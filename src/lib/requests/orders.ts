import type { APIResponse, OrderResponseData } from "@/types/api.types";
import type { OrderStatus } from "@/types/domain.types";

import { axios, handleAxiosError } from "@/lib/http/client";

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

export { getOrder };
