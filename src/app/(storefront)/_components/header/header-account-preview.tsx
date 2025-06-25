"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThreeDotsLoader } from "@/components/ui/loader";
import { LayoutDashboard, Lock } from "lucide-react";

const HeaderAccountPreview = () => {
	const router = useRouter();

	const [isLoading] = useState(false);
	const [isAuthenticated] = useState(true);

	return (
		<div>
			{isLoading ? (
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
									<span>{`John`}</span>
									<span className="ml-1">{`Doe`}</span>
								</span>
							)}
						</h4>
						<p className="text-xs leading-none font-light">
							{isAuthenticated ? (
								<span className="font-semibold">{`john@example.com`}</span>
							) : (
								<span>To access your account & manage orders</span>
							)}
						</p>
					</div>
					{isAuthenticated ? (
						<Button className="w-full" onClick={() => router.push("/dashboard")}>
							<LayoutDashboard />
							<span>Dashboard</span>
						</Button>
					) : (
						<Button className="w-full" onClick={() => router.push("/login")}>
							<Lock />
							<span>Login / Register</span>
						</Button>
					)}
				</div>
			)}
		</div>
	);
};

export { HeaderAccountPreview };
