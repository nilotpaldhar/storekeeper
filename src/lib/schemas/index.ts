import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().trim().email({ message: "Please enter a valid email address" }),
	callbackUrl: z.string().optional(),
});

export const SocialLoginSchema = z.object({
	provider: z.enum(["google", "facebook"]),
	callbackUrl: z.string().optional(),
});

export const AddCartItemSchema = z.object({
	skuCode: z.string().trim().min(1, { message: "Please enter a valid product SKU code" }),
	quantity: z.number().optional(),
});

export const UpdateCartItemQuantitySchema = z.object({
	quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export const AddCartCouponSchema = z.object({
	couponCode: z.string().trim().min(1, "Coupon code is required").max(50),
});
