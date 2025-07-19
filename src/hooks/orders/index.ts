import type { OrderStatus } from "@/types/domain.types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { orderKeys } from "@/constants/tanstack-query-keys";

import {
	getOrder,
	getOrderShippingMethods,
	getOrderPaymentMethods,
	attachCustomerToOrder,
	updateOrderAddresses,
	updateOrderShippingMethod,
	updateOrderPaymentMethod,
} from "@/lib/requests/orders";

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

const useOrderShippingMethods = ({ id, enabled = true }: { id: string; enabled?: boolean }) => {
	return useQuery({
		queryKey: orderKeys.shippingMethods(id),
		queryFn: () => getOrderShippingMethods({ id }),
		enabled,
	});
};

const useOrderPaymentMethods = ({ id, enabled = true }: { id: string; enabled?: boolean }) => {
	return useQuery({
		queryKey: orderKeys.paymentMethods(id),
		queryFn: () => getOrderPaymentMethods({ id }),
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

const useUpdateOrderShippingMethod = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateOrderShippingMethod,
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: orderKeys.byId(orderId) });
		},
	});
};

const useUpdateOrderPaymentMethod = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateOrderPaymentMethod,
		onSuccess: (_data, { orderId }) => {
			queryClient.invalidateQueries({ queryKey: orderKeys.byId(orderId) });
		},
	});
};

export {
	useOrder,
	useOrderShippingMethods,
	useOrderPaymentMethods,
	useAttachCustomerToOrder,
	useUpdateOrderAddresses,
	useUpdateOrderShippingMethod,
	useUpdateOrderPaymentMethod,
};
