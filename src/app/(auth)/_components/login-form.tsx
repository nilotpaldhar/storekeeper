"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginAction } from "@/actions/auth/login";

import { Alert } from "@/components/ui/alert";
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

import { LoginSchema } from "@/lib/schemas";

const LoginForm = () => {
	const { execute, result, isPending, hasSucceeded, hasErrored } = useAction(loginAction);
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: { email: "" },
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		execute({
			email: values.email,
			callbackUrl: callbackUrl ?? "",
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col space-y-6">
					{hasErrored && result.serverError ? (
						<Alert variant="error">{result.serverError}</Alert>
					) : null}
					{hasSucceeded && result.data?.message ? (
						<Alert variant="success">{result.data?.message}</Alert>
					) : null}
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
										disabled={isPending}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? "Continue..." : "Continue"}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export { LoginForm };
