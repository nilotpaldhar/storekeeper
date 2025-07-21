"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { NewsletterFormSchema } from "@/lib/schemas";

type FormValueType = z.infer<typeof NewsletterFormSchema>;

type NewsletterFormProps = {
	onSubmit?: (data: FormValueType) => void;
};

const NewsletterForm = ({ onSubmit }: NewsletterFormProps) => {
	const form = useForm<FormValueType>({
		resolver: zodResolver(NewsletterFormSchema),
		defaultValues: { email: "" },
	});

	const submitHandler = (values: FormValueType) => {
		onSubmit?.(values);
		form.reset();
	};

	return (
		<div className="bg-white p-1.5 shadow-[0px_9px_28px_8px_rgba(0,0,0,0.04),_0px_6px_16px_0px_rgba(0,0,0,0.04),_0px_3px_6px_-4px_rgba(0,0,0,0.04)]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitHandler)} noValidate>
					<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormLabel className="sr-only">Email Address</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="Subscribe with your email"
											{...field}
											className="h-10 !w-full border border-transparent bg-transparent py-2 focus:outline-none focus-visible:ring-transparent focus-visible:outline-none aria-invalid:ring-transparent sm:w-fit sm:px-4"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full px-8 sm:w-fit">
							Subscribe Now
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export { NewsletterForm };
