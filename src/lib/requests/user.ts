import type { APIResponse } from "@/types/api.types";
import type { UserProfile } from "@/types/domain.types";

import { axios, handleAxiosError } from "@/lib/http/client";

const getCurrentUser = async () => {
	try {
		const res = await axios.get<APIResponse<UserProfile>>("/users/me");
		return res.data;
	} catch (error) {
		const errMsg = handleAxiosError(error);
		throw new Error(errMsg);
	}
};

export { getCurrentUser };
