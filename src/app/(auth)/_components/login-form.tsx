"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginSchema } from "@/lib/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const LoginForm = () => {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		// eslint-disable-next-line no-console
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col space-y-6">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input type="email" placeholder="john@example.com" disabled={false} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full" type="submit">
						Continue
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { LoginForm };
