import type { APIResponse } from "@/types/api.types";
import type { AddressInput, AddressRecord } from "@/types/domain.types";

import { axios, handleAxiosError } from "@/lib/http/client";

const createAddress = async (address: AddressInput) => {
	try {
		const res = await axios.post<APIResponse<AddressRecord>>(`/commerce/addresses`, address);
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { createAddress };
