"use client";

import type { VariantProps } from "class-variance-authority";

import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";

type GoBackButtonProps = VariantProps<typeof buttonVariants> & {
	children: React.ReactNode;
	className?: string;
};

const GoBackButton = ({ children, ...props }: GoBackButtonProps) => {
	const router = useRouter();

	const handleGoBack = () => {
		if (window.history.length > 1) router.back();
		else router.push("/");
	};

	return (
		<Button onClick={handleGoBack} {...props}>
			{children}
		</Button>
	);
};

export { GoBackButton };
