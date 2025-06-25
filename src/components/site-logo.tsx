import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/general/cn";

type SiteLogoProps = {
	href?: string;
	logoSrc: string | null;
	alt?: string | null;
	width?: number;
	height?: number;
	className?: string;
};

const SiteLogo = ({ href = "/", logoSrc, alt, width, height, className }: SiteLogoProps) => {
	return (
		<Link
			href={href}
			className={cn(
				"focus-visible:border-primary-600 border border-transparent py-1 transition focus-visible:rounded focus-visible:outline-none",
				className
			)}
		>
			{logoSrc ? (
				<Image src={logoSrc} alt={alt ?? "Site Logo"} width={width ?? 140} height={height ?? 20} />
			) : (
				<span className="text-primary-600 text-lg font-bold">{alt ?? "Site Logo"}</span>
			)}
		</Link>
	);
};

export { SiteLogo };
