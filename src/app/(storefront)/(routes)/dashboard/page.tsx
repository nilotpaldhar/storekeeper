import { auth } from "@/lib/auth/config";
import { Container } from "@/components/ui/container";

const DashboardPage = async () => {
	const session = await auth();

	return (
		<Container className="py-10 text-center">
			<main>
				{session?.user ? (
					<h1 className="text-2xl">Logged in as {session.user.email}</h1>
				) : (
					<div>
						<h1 className="text-2xl">Not authenticated</h1>
					</div>
				)}
			</main>
		</Container>
	);
};

export default DashboardPage;
