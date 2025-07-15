"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, TagsIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useApplyCouponToCart, useRemoveCouponFromCart } from "@/hooks/cart";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AddCartCouponSchema } from "@/lib/schemas";

type PromotionBlockProps = {
	couponCode: string | null | undefined;
};

const PromotionBlock = ({ couponCode }: PromotionBlockProps) => {
	const applyCouponMutation = useApplyCouponToCart();
	const removeCouponMutation = useRemoveCouponFromCart();

	const form = useForm<z.infer<typeof AddCartCouponSchema>>({
		resolver: zodResolver(AddCartCouponSchema),
		defaultValues: { couponCode: "" },
	});

	const onSubmit = (values: z.infer<typeof AddCartCouponSchema>) => {
		applyCouponMutation.mutate(
			{ couponCode: values.couponCode },
			{
				onSuccess: (data) => toast.success(data.message ?? "Coupon applied successfully."),
				onError: (error) => toast.error(error.message ?? "Could not apply coupon."),
				onSettled: () => form.reset(),
			}
		);
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="flex items-center space-x-1">
				<TagsIcon size={16} />
				<span className="text-sm font-semibold">Promotions</span>
			</div>

			{couponCode ? (
				<div className="flex items-center space-x-2">
					<button
						type="button"
						disabled={removeCouponMutation.isPending}
						onClick={() => removeCouponMutation.mutate()}
						className="flex cursor-pointer items-center rounded-full text-neutral-900 hover:text-current hover:opacity-80 disabled:opacity-50"
					>
						{removeCouponMutation.isPending ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<XIcon size={16} />
						)}
						<span className="sr-only">Remove Coupon</span>
					</button>
					<div className="flex items-center space-x-1 text-xs">
						<span className="font-normal">{couponCode}</span>
						<span className="text-neutral-500">is applied</span>
					</div>
				</div>
			) : (
				<div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
							<div className="flex max-w-xs items-start space-x-1">
								<FormField
									control={form.control}
									name="couponCode"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													type="text"
													className="h-8"
													placeholder="Apply coupon code.."
													disabled={applyCouponMutation.isPending}
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="h-8" disabled={applyCouponMutation.isPending}>
									{applyCouponMutation.isPending ? "Apply..." : "Apply"}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			)}
		</div>
	);
};

export { PromotionBlock };
