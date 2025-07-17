import { type QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cartKeys, orderKeys } from "@/constants/tanstack-query-keys";

import {
	getCart,
	getCartCount,
	addCartItem,
	updateCartItemQuantity,
	removeCartItem,
	applyCouponToCart,
	removeCouponFromCart,
} from "@/lib/requests/cart";

const invalidateCartAndOrderQueries = ({
	queryClient,
}: {
	orderId?: string;
	queryClient: QueryClient;
}) => {
	queryClient.invalidateQueries({ queryKey: cartKeys.base });
	queryClient.invalidateQueries({ queryKey: orderKeys.base });
};

const useCart = ({ enabled = true }: { enabled?: boolean } = {}) => {
	return useQuery({
		queryKey: cartKeys.base,
		queryFn: () => getCart(),
		enabled,
	});
};

const useCartCount = ({ enabled = true }: { enabled?: boolean } = {}) => {
	return useQuery({
		queryKey: cartKeys.count(),
		queryFn: () => getCartCount(),
		enabled,
	});
};

const useAddCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addCartItem,
		onSuccess: () => invalidateCartAndOrderQueries({ queryClient }),
	});
};

const useUpdateCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCartItemQuantity,
		onSuccess: () => invalidateCartAndOrderQueries({ queryClient }),
	});
};

const useRemoveCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeCartItem,
		onSuccess: () => invalidateCartAndOrderQueries({ queryClient }),
	});
};

const useApplyCouponToCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: applyCouponToCart,
		onSuccess: () => invalidateCartAndOrderQueries({ queryClient }),
	});
};

const useRemoveCouponFromCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeCouponFromCart,
		onSuccess: () => invalidateCartAndOrderQueries({ queryClient }),
	});
};

export {
	useCart,
	useCartCount,
	useAddCartItem,
	useUpdateCartItem,
	useRemoveCartItem,
	useApplyCouponToCart,
	useRemoveCouponFromCart,
};
