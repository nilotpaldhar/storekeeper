"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddToCartButton = () => {
	return (
		<Button className="px-12 py-2">
			<ShoppingCart />
			<span>Add to Cart</span>
		</Button>
	);
};

export { AddToCartButton };
