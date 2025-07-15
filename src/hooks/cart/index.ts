import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cartKeys } from "@/constants/tanstack-query-keys";

import {
	getCart,
	getCartCount,
	addCartItem,
	updateCartItemQuantity,
	removeCartItem,
	applyCouponToCart,
	removeCouponFromCart,
} from "@/lib/requests/cart";

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
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartKeys.base,
			});
		},
	});
};

const useUpdateCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCartItemQuantity,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartKeys.base,
			});
		},
	});
};

const useRemoveCartItem = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartKeys.base,
			});
		},
	});
};

const useApplyCouponToCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: applyCouponToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartKeys.base,
			});
		},
	});
};

const useRemoveCouponFromCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeCouponFromCart,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartKeys.base,
			});
		},
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
