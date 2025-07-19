import type { OrderStatus } from "@/types/domain.types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { orderKeys } from "@/constants/tanstack-query-keys";

import { getOrder, attachCustomerToOrder, updateOrderAddresses } from "@/lib/requests/orders";

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

const useAttachCustomerToOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: attachCustomerToOrder,
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: orderKeys.byId(orderId) });
		},
	});
};

const useUpdateOrderAddresses = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateOrderAddresses,
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: orderKeys.byId(orderId) });
		},
	});
};

export { useOrder, useAttachCustomerToOrder, useUpdateOrderAddresses };
