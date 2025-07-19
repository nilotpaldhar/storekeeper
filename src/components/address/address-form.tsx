"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AddressInput } from "@/types/domain.types";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

import { AddressSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils/general/cn";

type AddressFormProps = {
	defaultValues?: Partial<AddressInput> | null;
	btnLabels?: {
		submit?: string;
		cancel?: string;
	};
	hideCancelBtn?: boolean;
	disabled?: boolean;
	onCancel?: () => void;
	onSubmit?: (data: AddressInput) => void;
};

const AddressForm = ({
	defaultValues,
	btnLabels = {
		submit: "Save",
		cancel: "Cancel",
	},
	hideCancelBtn = true,
	disabled,
	onSubmit = () => {},
	onCancel = () => {},
}: AddressFormProps) => {
	const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
	const [states, setStates] = useState<{ label: string; value: string }[]>([]);

	const form = useForm<AddressInput>({
		resolver: zodResolver(AddressSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			street: "",
			country: "",
			state: "",
			city: "",
			zip: "",
			notes: "",
		},
	});

	const selectedCountry = form.watch("country");

	// Submit handler
	const submitHandler = (values: AddressInput) => {
		onSubmit(values);
	};

	// Load country list once on mount
	useEffect(() => {
		const allCountries = Country.getAllCountries().map((c) => ({
			label: c.name,
			value: c.isoCode,
		}));
		setCountries(allCountries);
	}, []);

	// Update state list when selected country changes
	useEffect(() => {
		if (!selectedCountry) return;

		const stateOptions = State.getStatesOfCountry(selectedCountry).map((s) => ({
			label: s.name,
			value: s.isoCode,
		}));
		setStates(stateOptions);

		// only clear state if current value is invalid
		const currentState = form.getValues("state");
		const isValidState = stateOptions.some((s) => s.value === currentState);
		if (!isValidState) form.setValue("state", "");
	}, [selectedCountry, form]);

	// Preload states if defaultValues.country is present (on first mount or step revisit)
	useEffect(() => {
		if (!defaultValues?.country) return;

		const preloadStates = State.getStatesOfCountry(defaultValues.country).map((s) => ({
			label: s.name,
			value: s.isoCode,
		}));
		setStates(preloadStates);
	}, [defaultValues?.country]);

	// Reset form when defaultValues are available and options are loaded
	useEffect(() => {
		if (!defaultValues) return;
		if (countries.length === 0) return;

		// Wait until state list is ready (for default state)
		if (defaultValues.state && !states.find((s) => s.value === defaultValues.state)) return;

		form.reset({ ...defaultValues });
	}, [defaultValues, countries, states, form]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(submitHandler)} noValidate>
				<div className="grid grid-cols-2 items-start gap-x-2 gap-y-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input type="text" disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input type="text" disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input type="text" disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="street"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Textarea rows={3} disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									disabled={countries.length === 0 || disabled}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select Country" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{countries.map((country) => (
											<SelectItem key={country.value} value={country.value}>
												{country.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="state"
						render={({ field }) => (
							<FormItem>
								<FormLabel>State</FormLabel>
								<Select
									onValueChange={field.onChange}
									value={field.value}
									disabled={states.length === 0 || disabled}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select State" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{states.map((state) => (
											<SelectItem key={state.value} value={state.value}>
												{state.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input type="text" disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="zip"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postal / ZIP Code</FormLabel>
								<FormControl>
									<Input type="text" disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="notes"
						render={({ field }) => (
							<FormItem className="col-span-full">
								<FormLabel>Notes (optional)</FormLabel>
								<FormControl>
									<Textarea rows={3} disabled={disabled} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="col-span-full flex items-center justify-end space-x-2">
						{!hideCancelBtn ? (
							<Button type="button" variant="light" disabled={disabled} onClick={onCancel}>
								{btnLabels.cancel}
							</Button>
						) : null}
						<Button type="submit" className={cn(hideCancelBtn && "w-full")} disabled={disabled}>
							{btnLabels.submit}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
};

const AddressFormSkeleton = () => {
	return (
		<div className="grid grid-cols-2 items-start gap-x-2 gap-y-4">
			<Skeleton className="h-10" />
			<Skeleton className="h-10" />
			<Skeleton className="col-span-full h-10" />
			<Skeleton className="col-span-full h-16" />
			<Skeleton className="h-10" />
			<Skeleton className="h-10" />
			<Skeleton className="h-10" />
			<Skeleton className="h-10" />
			<Skeleton className="col-span-full h-16" />
			<Skeleton className="col-span-full h-10" />
		</div>
	);
};

export { AddressForm, AddressFormSkeleton };
