import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/resources/user/services";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	const user = await getCurrentUser();

	if (!user) {
		redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
	}

	return <>{children}</>;
};
export default DashboardLayout;
