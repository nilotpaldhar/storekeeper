import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	callbackUrl: z.string().optional(),
});

export const SocialLoginSchema = z.object({
	provider: z.enum(["google", "facebook"]),
	callbackUrl: z.string().optional(),
});

export const AddCartItemSchema = z.object({
	skuCode: z.string().min(1, { message: "Please enter a valid product SKU code" }),
	quantity: z.number().optional(),
});
