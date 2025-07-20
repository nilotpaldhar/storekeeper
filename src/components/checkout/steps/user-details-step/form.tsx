"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCheckoutStepsStore, type CheckoutData } from "@/stores/use-checkout-steps-store";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
	name: z.string().trim().min(1, { message: "Please enter your name" }),
	email: z.string().trim().email({ message: "Please enter a valid email address" }),
});

type UserDetailsFormProps = {
	isLoading?: boolean;
	onContinue: (data: Partial<CheckoutData["customer"]>) => void;
};

const UserDetailsForm = ({ isLoading = false, onContinue }: UserDetailsFormProps) => {
	const checkoutData = useCheckoutStepsStore().checkoutData;

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: { name: "", email: "" },
	});

	const onSubmit = ({ name, email }: z.infer<typeof schema>) => {
		onContinue({ name, email });
	};

	useEffect(() => {
		if (checkoutData) {
			form.reset({
				name: checkoutData.customer.name ?? "",
				email: checkoutData.customer?.email ?? "",
			});
		}
	}, [checkoutData, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input type="text" placeholder="John Doe" disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="john@example.com"
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Continue..." : "Continue"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { UserDetailsForm };
