"use client";

import { useAction } from "next-safe-action/hooks";

import { useCurrentUser } from "@/hooks/user/use-current-user";

import { logoutAction } from "@/actions/auth/logout";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const DashboardPage = () => {
	const { data } = useCurrentUser();
	const { execute, isPending } = useAction(logoutAction);

	return (
		<Container className="py-10 text-center">
			<main>
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<h1 className="text-2xl">Logged in as {data?.data?.email}</h1>
					<Button disabled={isPending} onClick={() => execute()}>
						{isPending ? "Logout..." : "Logout"}
					</Button>
				</div>
			</main>
		</Container>
	);
};

export default DashboardPage;
