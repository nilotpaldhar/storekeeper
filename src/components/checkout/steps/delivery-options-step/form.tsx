"use client";

import type { ShippingMethod } from "@commercelayer/sdk";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCheckoutStepsStore, type CheckoutData } from "@/stores/use-checkout-steps-store";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const schema = z.object({
	shippingMethodId: z.string().min(1, "Please select a shipping method"),
});

type FormValues = z.infer<typeof schema>;

type DeliveryOptionsFormProps = {
	methods: ShippingMethod[];
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["shipping"]>) => void;
};

const DeliveryOptionsForm = ({
	methods,
	isLoading = false,
	onContinue,
}: DeliveryOptionsFormProps) => {
	const checkoutData = useCheckoutStepsStore().checkoutData;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { shippingMethodId: "" },
	});

	const onSubmit = ({ shippingMethodId }: z.infer<typeof schema>) => {
		const selectedShippingMethod = methods.find((m) => m.id === shippingMethodId) ?? null;
		onContinue(selectedShippingMethod);
	};

	useEffect(() => {
		if (checkoutData && checkoutData.shipping?.id) {
			form.reset({ shippingMethodId: checkoutData.shipping.id });
		}
	}, [checkoutData, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col space-y-4">
					<FormField
						control={form.control}
						name="shippingMethodId"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="sr-only">Select a shipping method</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										value={field.value}
										disabled={isLoading}
										className="space-y-4"
									>
										{methods.map((method) => (
											<FormItem key={method.id} className="flex items-center space-y-0 space-x-0">
												<FormControl>
													<RadioGroupItem value={method.id} />
												</FormControl>
												<div className="flex-1 space-y-1">
													<FormLabel className="flex w-full items-center justify-between space-x-1">
														<span className="">{method.name}</span>
														<span>{method.formatted_price_amount}</span>
													</FormLabel>
												</div>
											</FormItem>
										))}
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="mt-2 w-full" disabled={isLoading}>
						{isLoading ? "Continue..." : "Continue"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { DeliveryOptionsForm };
