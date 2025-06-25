"use client";

import { useRouter } from "next/navigation";

import { Heart, ShoppingCart, User } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HeaderAction } from "@/app/(storefront)/_components/header/header-action";
import { HeaderAccountPreview } from "@/app/(storefront)/_components/header/header-account-preview";

const HeaderToolbarProfile = ({ className }: { className?: string }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<HeaderAction label="profile" icon={User} className={className} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-64 rounded-xs p-0" align="center" sideOffset={12}>
				<div className="px-4 py-5">
					<HeaderAccountPreview />
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

const HeaderToolbarWishlist = ({ className }: { className?: string }) => {
	const router = useRouter();

	return (
		<HeaderAction
			label="wishlist"
			icon={Heart}
			onClick={() => router.push("/wishlist")}
			className={className}
		/>
	);
};

const HeaderToolbarCart = ({ className }: { className?: string }) => {
	const router = useRouter();

	return (
		<HeaderAction
			label="cart"
			icon={ShoppingCart}
			count={0}
			onClick={() => router.push("/cart")}
			className={className}
		/>
	);
};

export { HeaderToolbarCart, HeaderToolbarWishlist, HeaderToolbarProfile };
