"use client";

import { ShoppingCart, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";

type AddToCartButtonProps = {
	label?: string;
	icon?: LucideIcon;
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
};

const AddToCartButton = ({
	label = "Add To Cart",
	icon: Icon = ShoppingCart,
	disabled = false,
	onClick = () => {},
	className,
}: AddToCartButtonProps) => {
	return (
		<Button className={cn("px-12 py-2", className)} disabled={disabled} onClick={onClick}>
			<Icon />
			<span>{label}</span>
		</Button>
	);
};

export { AddToCartButton };
