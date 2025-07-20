import type { OrderStatus } from "@/types/domain.types";

const isValidOrderStatus = (value: string | null): value is OrderStatus => {
	return ["draft", "pending", "editing", "placing", "placed", "approved", "cancelled"].includes(
		value ?? ""
	);
};

export { isValidOrderStatus };
