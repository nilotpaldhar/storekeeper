"use client";

import { Facebook, Instagram, Twitter, YouTube } from "@/components/icons/brand";

import { cn } from "@/lib/utils/general/cn";
import { openInNewTab } from "@/lib/utils/general/open-in-new-tab";

type SocialPlatform = "facebook" | "twitter" | "instagram" | "youtube";

type FooterSocialLinkProps = {
	platform: SocialPlatform;
	srText: string;
	url: string | null;
	className?: string;
};

const IconMap: Record<SocialPlatform, React.FC<React.SVGProps<SVGSVGElement>>> = {
	facebook: Facebook,
	instagram: Instagram,
	twitter: Twitter,
	youtube: YouTube,
};

const FooterSocialLink = ({ platform, srText, url, className }: FooterSocialLinkProps) => {
	const Icon = IconMap[platform];

	return (
		<button
			type="button"
			className={cn(
				"group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent leading-none focus-visible:rounded-full focus-visible:border-neutral-600 focus-visible:outline-none",
				className
			)}
			disabled={url === null}
			onClick={() => openInNewTab(url)}
		>
			<Icon className="size-4 fill-neutral-100 hover:fill-neutral-300" />
			<span className="sr-only">{srText}</span>
		</button>
	);
};

export { FooterSocialLink };
