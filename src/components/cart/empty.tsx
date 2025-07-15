import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { ILLUSTRATIONS } from "@/constants/media";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyImage,
	EmptyTitle,
	EmptyDescription,
	EmptyContent,
} from "@/components/ui/empty";

const CartEmpty = ({ className }: { className?: string }) => {
	return (
		<Empty className={className}>
			<EmptyImage
				src={ILLUSTRATIONS.EMPTY_STATES.EMPTY_CART}
				alt="Empty Cart"
				width={146}
				height={174}
			/>
			<EmptyTitle>Your cart is empty!</EmptyTitle>
			<EmptyDescription>
				<p>Once you add something to your cart, it will appear here.</p>
				<p>Ready to get started?</p>
			</EmptyDescription>
			<EmptyContent>
				<Button className="px-8" asChild>
					<Link href="/">
						<ArrowLeft />
						<span>Continue Shopping</span>
					</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
};

export { CartEmpty };
