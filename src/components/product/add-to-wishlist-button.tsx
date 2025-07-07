"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

const AddToWishlistButton = () => {
	return (
		<Button
			variant="light"
			className="border border-neutral-200 bg-white px-12 py-2 hover:bg-neutral-50 hover:shadow-none"
		>
			<Heart />
			<span>Add to Wishlist</span>
		</Button>
	);
};

export { AddToWishlistButton };
