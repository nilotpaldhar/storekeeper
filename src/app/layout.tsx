import type { Metadata } from "next";

import { Nunito as FontSans } from "next/font/google";

import { TanstackQueryProvider } from "@/components/providers/tanstack-query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

import { env } from "@/lib/config/env";
import { cn } from "@/lib/utils/general/cn";

import "@/styles/global.css";

// Initializing the Nunito font with specific subsets and variable name
const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
	fallback: ["sans-serif"],
	style: ["normal", "italic"],
	weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: env.NEXT_PUBLIC_SITE_TITLE,
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body className={cn("min-h-screen antialiased", fontSans.variable)}>
				<TanstackQueryProvider>
					{children}
					<ToastProvider />
				</TanstackQueryProvider>
			</body>
		</html>
	);
};

export default RootLayout;
