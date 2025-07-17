import type { OrderStatus } from "@/types/domain.types";

import { useQuery } from "@tanstack/react-query";

import { orderKeys } from "@/constants/tanstack-query-keys";

import { getOrder } from "@/lib/requests/orders";

const useOrder = ({
	id,
	status,
	enabled = true,
}: {
	id: string;
	status?: OrderStatus;
	enabled?: boolean;
}) => {
	return useQuery({
		queryKey: orderKeys.byId(id),
		queryFn: () => getOrder({ id, status }),
		enabled,
	});
};

export { useOrder };
