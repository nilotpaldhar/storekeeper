import "server-only";

import type { Cart, UserProfile } from "@/types/domain.types";

import { cookies } from "next/headers";

import { CART_COOKIE_KEY } from "@/constants/commerce";

import { getCartById, getCartByUserEmail } from "@/lib/resources/cart/fetch";
import { createCart, attachCartToUser } from "@/lib/resources/cart/mutations";

const getCartCookie = async ({ key = CART_COOKIE_KEY }: { key?: string } = {}) => {
	const cookieStore = await cookies();
	return cookieStore.get(key)?.value || null;
};

const setCartCookie = async ({ key = CART_COOKIE_KEY, value }: { key?: string; value: string }) => {
	const cookieStore = await cookies();
	cookieStore.set({ name: key, value, httpOnly: true, path: "/" });
};

/**
 * Resolves the correct cart for the current user or guest session.
 */
const getOrCreateCart = async ({ user }: { user: UserProfile | null }): Promise<Cart | null> => {
	// Read guest cart ID from cookie (if it exists)
	const cartId = await getCartCookie();

	// If user is logged in
	if (user) {
		// Try to find an existing cart for this user
		const userCart = await getCartByUserEmail({ email: user.email });

		// If both guest cart AND user cart exist, prefer it user cart
		if (cartId && userCart) {
			await Promise.all([
				setCartCookie({ value: userCart.id }), // Update cookie to user cart ID
			]);
			return userCart;
		}

		// If guest cart exists but no user cart -> attach guest cart to user
		if (cartId && !userCart) {
			await attachCartToUser({ cartId, userEmail: user.email });
			return await getCartById({ id: cartId });
		}

		// If no guest cart but user cart exists -> use user cart
		if (!cartId && userCart) {
			await setCartCookie({ value: userCart.id }); // Update cookie to user cart ID
			return userCart;
		}

		// If nothing exists -> create new Order attached to user
		const newCart = await createCart();
		if (!newCart) return null;

		await Promise.all([
			attachCartToUser({ cartId: newCart.id, userEmail: user.email }),
			setCartCookie({ value: newCart.id }),
		]);
		return newCart;
	}

	// If user is NOT logged in (guest)
	if (cartId) {
		// Validate guest cart still exists in Commerce Layer
		const cart = await getCartById({ id: cartId });
		if (cart) return cart;
	}

	// If cart cookie doesn't exist -> create a new guest cart
	const newGuestCart = await createCart();
	if (!newGuestCart) return null;

	// Store the new guest cart ID in the cookie
	await setCartCookie({ value: newGuestCart.id });

	return newGuestCart;
};

/**
 * Resets the current cart.
 */
const resetCart = async ({ user }: { user: UserProfile | null }): Promise<Cart | null> => {
	// Attempt to create a new cart
	const newCart = await createCart();
	if (!newCart) return null;

	// If the user is logged in, associate the cart with the user
	if (user) {
		await attachCartToUser({ cartId: newCart.id, userEmail: user.email });
	}

	// Persist the cart ID to cookies
	await setCartCookie({ value: newCart.id });

	return newCart;
};

export { getOrCreateCart, resetCart };
