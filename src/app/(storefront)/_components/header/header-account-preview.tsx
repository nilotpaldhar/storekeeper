"use client";

import { LayoutDashboard, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { useCallbackUrl } from "@/hooks/common/use-callback-url";
import { useCurrentUser } from "@/hooks/user/use-current-user";

import { LOGIN_ROUTE } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import { ThreeDotsLoader } from "@/components/ui/loader";

import { notifyFeatureUnavailable } from "@/lib/utils/toast";

const HeaderAccountPreviewContent = () => {
	const router = useRouter();
	const callbackUrl = useCallbackUrl();
	const { data, isLoading, isFetching } = useCurrentUser();

	const user = data?.data ?? null;
	const isAuthenticated = !isLoading && !!user;

	const handleDashboardClick = () => {
		notifyFeatureUnavailable({ featureName: "Dashboard" });
	};

	const handleLoginClick = () => {
		router.push(`${LOGIN_ROUTE}?callbackUrl=${callbackUrl}`);
	};

	return (
		<div>
			{isLoading || isFetching ? (
				<div className="flex h-20 items-center justify-center">
					<ThreeDotsLoader />
				</div>
			) : (
				<div className="flex flex-col space-y-3">
					<div className="flex flex-col space-y-2">
						<h4 className="text-sm leading-none font-semibold">
							<span>{isAuthenticated ? "Hello" : "Welcome"}</span>
							{isAuthenticated && (
								<span className="ml-1 inline-block">
									<span>{user.name ?? "Anonymous User"}</span>
								</span>
							)}
						</h4>
						<p className="text-xs leading-none font-light">
							{isAuthenticated ? (
								<span className="font-semibold">{user.email ?? `Email not provided`}</span>
							) : (
								<span>To access your account & manage orders</span>
							)}
						</p>
					</div>
					{isAuthenticated ? (
						<Button className="w-full" onClick={handleDashboardClick}>
							<LayoutDashboard />
							<span>Dashboard</span>
						</Button>
					) : (
						<Button className="w-full" onClick={handleLoginClick}>
							<Lock />
							<span>Login / Register</span>
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

const HeaderAccountPreview = () => {
	return (
		<Suspense fallback={null}>
			<HeaderAccountPreviewContent />
		</Suspense>
	);
};

export { HeaderAccountPreview };
