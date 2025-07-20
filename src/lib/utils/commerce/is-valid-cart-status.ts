import type { Order } from "@commercelayer/sdk";

import { VALID_CART_STATUS } from "@/constants/commerce";

type ValidCartStatus = (typeof VALID_CART_STATUS)[number];

/**
 * Determines if the given status is considered a valid cart state.
 */
const isValidCartStatus = (status: Order["status"]): boolean => {
	return VALID_CART_STATUS.includes(status as ValidCartStatus);
};

export { isValidCartStatus };
