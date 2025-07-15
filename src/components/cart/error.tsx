import { RefreshCcw } from "lucide-react";

import { ILLUSTRATIONS } from "@/constants/media";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyImage,
	EmptyTitle,
	EmptyContent,
	EmptyDescription,
} from "@/components/ui/empty";

type CartErrorProps = {
	message?: string;
	onRetry?: () => void;
	className?: string;
};

const CartError = ({ message, onRetry = () => {}, className }: CartErrorProps) => {
	return (
		<Empty className={className}>
			<EmptyImage
				src={ILLUSTRATIONS.EMPTY_STATES.ERROR}
				alt="Empty Loading Cart"
				width={200}
				height={200}
			/>
			<EmptyTitle>Couldn&apos;t Load Your Cart!</EmptyTitle>
			<EmptyDescription>
				<p>{message ?? "Something went wrong while fetching your cart."}</p>
				<p>Click below to retry.</p>
			</EmptyDescription>
			<EmptyContent>
				<Button className="px-8" onClick={onRetry}>
					<RefreshCcw />
					<span>Try Again</span>
				</Button>
			</EmptyContent>
		</Empty>
	);
};

export { CartError };
