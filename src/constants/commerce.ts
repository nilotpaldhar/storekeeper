import type { CheckoutStep } from "@/types/domain.types";

export const CART_COOKIE_KEY = "sk_cart_id";

export const CHECKOUT_STEPS: CheckoutStep[] = [
	{
		id: "fill_user_details",
		label: "User",
		description: "User Details",
		completed: false,
	},
	{
		id: "fill_address",
		label: "Address",
		description: "Shipping Address",
		completed: false,
	},
	{
		id: "fill_shipping_options",
		label: "Delivery",
		description: "Delivery Methods",
		completed: false,
	},
	{
		id: "fill_payment_details",
		label: "Payment",
		description: "Payment Options",
		completed: false,
	},
];
