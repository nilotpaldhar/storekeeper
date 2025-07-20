"use client";

import type { PaymentMethod } from "@commercelayer/sdk";

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
	paymentMethodId: z.string().min(1, "Please select a payment method"),
});

type FormValues = z.infer<typeof schema>;

type PaymentDetailsFormProps = {
	methods: PaymentMethod[];
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["payment"]>) => void;
};

const PaymentDetailsForm = ({
	methods,
	isLoading = false,
	onContinue,
}: PaymentDetailsFormProps) => {
	const checkoutData = useCheckoutStepsStore().checkoutData;

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: { paymentMethodId: "" },
	});

	const onSubmit = ({ paymentMethodId }: z.infer<typeof schema>) => {
		const selectedPaymentMethod = methods.find((m) => m.id === paymentMethodId) ?? null;
		onContinue(selectedPaymentMethod);
	};

	useEffect(() => {
		if (checkoutData && checkoutData.payment?.id) {
			form.reset({ paymentMethodId: checkoutData.payment.id });
		}
	}, [checkoutData, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col space-y-4">
					<FormField
						control={form.control}
						name="paymentMethodId"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="sr-only">Select a payment method</FormLabel>
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
													<FormLabel>{method.name}</FormLabel>
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

export { PaymentDetailsForm };
