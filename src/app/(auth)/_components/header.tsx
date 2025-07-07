import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SiteLogo } from "@/components/ui/site-logo";

import { getGeneralSiteSettings } from "@/lib/resources/settings/fetch";
import { cn } from "@/lib/utils/general/cn";
import { getImageUrl } from "@/lib/utils/sanity/get-image-url";

const Header = async ({ className }: { className?: string }) => {
	const generalSettings = await getGeneralSiteSettings();

	const logoSrc = generalSettings?.logo ? getImageUrl(generalSettings.logo).url() : null;
	const logoAlt = generalSettings?.title;

	return (
		<header className={cn("h-20 w-full border-b border-neutral-100 bg-white", className)}>
			<Container className="flex h-full flex-wrap items-center justify-between space-x-4 xl:px-16">
				<SiteLogo href="/" logoSrc={logoSrc} alt={logoAlt} className="shrink-0" />
				<nav>
					<Button asChild variant="dark-ghost" className="font-semibold">
						<Link href="/">
							<ArrowLeft />
							<span>Back to home</span>
						</Link>
					</Button>
				</nav>
			</Container>
		</header>
	);
};
export { Header };
