import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/config";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await auth();

	if (!session) {
		redirect(`/login?callbackUrl=/dashboard`);
	}

	return <>{children}</>;
};
export default DashboardLayout;
