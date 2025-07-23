"use client";

import { useCurrentUser } from "@/hooks/user/use-current-user";

import { LogoutButton } from "@/components/auth/logout-button";
import { Container } from "@/components/ui/container";

const DashboardPage = () => {
	const { data } = useCurrentUser();

	return (
		<Container className="py-10 text-center">
			<main>
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<h1 className="text-2xl">Logged in as {data?.data?.email}</h1>
					<LogoutButton />
				</div>
			</main>
		</Container>
	);
};

export default DashboardPage;
