"use client";

import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { ILLUSTRATIONS } from "@/constants/media";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
	Empty,
	EmptyImage,
	EmptyTitle,
	EmptyContent,
	EmptyDescription,
} from "@/components/ui/empty";

type CheckoutErrorProps = {
	title?: string;
	message?: React.ReactNode;
};

const CheckoutError = ({
	title = "Something went wrong with your checkout!",
	message = "Please try again or contact support if the problem persists.",
}: CheckoutErrorProps) => {
	const router = useRouter();

	return (
		<main className="flex min-h-[80vh] items-center justify-center py-5">
			<Container className="flex justify-center">
				<Empty>
					<EmptyImage src={ILLUSTRATIONS.ORDERS.FAIL} alt="" width={200} height={200} />
					<EmptyTitle>{title}</EmptyTitle>
					<EmptyDescription>{message}</EmptyDescription>
					<EmptyContent>
						<Button className="px-8" onClick={() => router.push("/cart")}>
							<RefreshCcw />
							<span>Try Again</span>
						</Button>
					</EmptyContent>
				</Empty>
			</Container>
		</main>
	);
};

export { CheckoutError };
