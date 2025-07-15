"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils/general/cn";

import { Button } from "./button";

type QuantityStepperProps = {
	min?: number;
	max?: number;
	value?: number;
	defaultValue?: number;
	disabled?: boolean;
	onChange?: (quantity: number) => void;
	className?: string;
};

const QuantityStepper = ({
	min = 1,
	max = Infinity,
	value,
	defaultValue = 1,
	disabled = false,
	onChange,
	className,
}: QuantityStepperProps) => {
	const isControlled = value !== undefined;

	const [internalQty, setInternalQty] = useState(defaultValue);
	const quantity = isControlled ? value : internalQty;

	const updateQuantity = (qty: number) => {
		if (isControlled) {
			onChange?.(qty);
		} else {
			setInternalQty(qty);
			onChange?.(qty); // Optional: call it for uncontrolled too if you want to sync up
		}
	};

	const decrease = () => {
		if (quantity > min) updateQuantity(quantity - 1);
	};

	const increase = () => {
		if (quantity < max) updateQuantity(quantity + 1);
	};

	return (
		<div
			className={cn(
				"flex min-h-[40px] items-center justify-center border border-neutral-200 px-6 py-2",
				disabled && "pointer-events-none opacity-50",
				className
			)}
		>
			<span
				aria-live="polite"
				title={`${quantity}`}
				className="block w-10 leading-none font-medium text-neutral-900"
			>
				{quantity}
			</span>
			<div className="flex items-center space-x-3">
				<Button
					size="icon"
					variant="light"
					onClick={decrease}
					disabled={quantity <= min}
					aria-label="Decrease quantity"
					className="size-6 rounded-full"
				>
					<Minus />
				</Button>
				<Button
					size="icon"
					variant="light"
					onClick={increase}
					disabled={quantity >= max}
					aria-label="Increase quantity"
					className="size-6 rounded-full"
				>
					<Plus />
				</Button>
			</div>
		</div>
	);
};

export { QuantityStepper };
