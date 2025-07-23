"use client";

import type { VariantProps } from "class-variance-authority";

import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { logoutAction } from "@/actions/auth/logout";
import { LOGIN_ROUTE } from "@/constants/routes";
import { userKeys } from "@/constants/tanstack-query-keys";

import { Button, buttonVariants } from "@/components/ui/button";

type LogoutButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

const LogoutButton = ({ children, ...props }: LogoutButtonProps) => {
	const queryClient = useQueryClient();
	const { executeAsync, isPending } = useAction(logoutAction);

	const handleLogout = async () => {
		try {
			await executeAsync();

			queryClient.invalidateQueries({ queryKey: userKeys.current() });
			await queryClient.refetchQueries({ queryKey: userKeys.current() });

			if (window) window.location.href = LOGIN_ROUTE;
		} catch (error) {
			toast.error("Logout failed. Please try again.");
		}
	};

	return (
		<Button disabled={isPending} onClick={handleLogout} {...props}>
			{children ?? "Logout"}
		</Button>
	);
};

export { LogoutButton };
