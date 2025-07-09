"use client";

import { HeartFill } from "@/components/icons/common";

import { notifyFeatureUnavailable } from "@/lib/utils/toast";

const WishlistButton = () => {
	return (
		<button
			type="button"
			onClick={() => notifyFeatureUnavailable({ featureName: "Wishlist" })}
			className="flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
		>
			<HeartFill className="size-5 fill-neutral-900/30" />
			<span className="sr-only">Add to wishlist</span>
		</button>
	);
};

export { WishlistButton };
