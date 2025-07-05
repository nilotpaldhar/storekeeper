"use client";

import { type LucideIcon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";

type AddToCartButtonProps = {
	label?: string;
	icon?: LucideIcon;
	disabled?: boolean;
	className?: string;
};

const AddToCartButton = ({
	label = "Add To Cart",
	icon: Icon = ShoppingCart,
	disabled = false,
	className,
}: AddToCartButtonProps) => {
	return (
		<Button className={cn("px-12 py-2", className)} disabled={disabled}>
			<Icon />
			<span>{label}</span>
		</Button>
	);
};

export { AddToCartButton };
