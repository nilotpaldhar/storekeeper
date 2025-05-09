import type { Metadata } from "next";
import { Nunito as FontSans } from "next/font/google";
import { cn } from "@/utils/general/cn";

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
	title: "StoreKeeper",
	description: "Headless E-commerce App",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body className={cn("antialiased", fontSans.variable)}>{children}</body>
		</html>
	);
};

export default RootLayout;
