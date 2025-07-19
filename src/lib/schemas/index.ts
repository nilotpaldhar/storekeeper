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

export const AttachCustomerToOrderSchema = z.object({
	name: z.string().trim().optional(),
	email: z.string().trim().email({ message: "Please enter a valid email address" }),
});

export const UpdateOrderAddressesSchema = z
	.object({
		addressId: z.string().trim().min(1, { message: "Address ID is required." }),
		addressType: z.enum(["shipping", "billing"], {
			required_error: "Address type must be either 'shipping' or 'billing'.",
		}),
		shippingAddressSameAsBilling: z.boolean().optional(),
	})
	.refine(
		(data) => data.addressType === "shipping" || data.shippingAddressSameAsBilling === undefined,
		{
			message:
				"'shippingAddressSameAsBilling' should only be provided when addressType is 'shipping'.",
			path: ["shippingAddressSameAsBilling"],
		}
	);

export const UpdateOrderShippingMethodSchema = z.object({
	shippingMethodId: z.string().trim().min(1, { message: "Shipping method ID is required." }),
});

// export const UpdateOrderPaymentMethodSchema = z.object({});

// export const PlaceOrderSchema = z.object({});

export const AddressSchema = z.object({
	firstName: z
		.string()
		.min(2, "First name is required")
		.max(50, "First name can't exceed 50 characters"),
	lastName: z
		.string()
		.min(2, "Last name is required")
		.max(50, "Last name can't exceed 50 characters"),
	phone: z.string().regex(/^\+?\d{10,15}$/, "Enter a valid phone number (10-15 digits)"),
	street: z.string().min(5, "Street is required").max(100, "Street can't exceed 100 characters"),
	city: z.string().min(2, "City is required").max(50, "City can't exceed 50 characters"),
	zip: z.string().regex(/^\d{4,10}$/, "Enter a valid ZIP code (4-10 digits)"),
	country: z.string().min(2, "Country is required"),
	state: z.string().min(2, "State/Province is required"),
	notes: z.string().max(300, "Note can't exceed 300 characters").optional(),
});
