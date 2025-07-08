"use client";

import { type LucideIcon, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils/general/cn";
import { notifyFeatureUnavailable } from "@/lib/utils/toast";

type AddToWishlistButtonProps = {
	label?: string;
	icon?: LucideIcon;
	disabled?: boolean;
	className?: string;
};

const AddToWishlistButton = ({
	label = "Add To Wishlist",
	icon: Icon = Heart,
	disabled = false,
	className,
}: AddToWishlistButtonProps) => {
	return (
		<Button
			variant="light"
			disabled={disabled}
			onClick={() => notifyFeatureUnavailable({ featureName: "Wishlist" })}
			className={cn(
				"border border-neutral-200 bg-white px-12 py-2 hover:bg-neutral-50 hover:shadow-none",
				className
			)}
		>
			<Icon />
			<span>{label}</span>
		</Button>
	);
};

export { AddToWishlistButton };
