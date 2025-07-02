import { Container } from "@/components/ui/container";
import { SiteLogo } from "@/components/ui/site-logo";

import { HeaderSearch } from "@/app/(storefront)/_components/header/header-search";
import { HeaderDesktopMenu } from "@/app/(storefront)/_components/header/header-desktop-menu";
import { HeaderMobileMenu } from "@/app/(storefront)/_components/header/header-mobile-menu";
import {
	HeaderToolbarProfile,
	HeaderToolbarWishlist,
	HeaderToolbarCart,
} from "@/app/(storefront)/_components/header/header-toolbar";

import { getGeneralSiteSettings, getHeaderSettings } from "@/lib/resources/settings/fetch";

import { cn } from "@/lib/utils/general/cn";
import { getImageUrl } from "@/lib/utils/sanity/get-image-url";
import { normalizeHeaderMenu } from "@/lib/utils/navigation/normalize-header-menu";

type HeaderProps = {
	className?: string;
};

const Header = async ({ className }: HeaderProps) => {
	const generalSettings = await getGeneralSiteSettings();
	const headerSettings = await getHeaderSettings();
	const { menuDesktop: menuDesktopRaw, menuMobile: menuMobileRaw } = headerSettings ?? {};

	const menuDesktop = menuDesktopRaw ? normalizeHeaderMenu(menuDesktopRaw) : null;
	const menuMobile = menuMobileRaw ? normalizeHeaderMenu(menuMobileRaw) : null;

	const logoSrc = generalSettings?.logo ? getImageUrl(generalSettings.logo).url() : null;
	const logoAlt = generalSettings?.title;

	return (
		<header className={cn("h-20 w-full border-b border-neutral-100", className)}>
			<Container className="flex h-full items-center justify-start 2xl:justify-between">
				<SiteLogo href="/" logoSrc={logoSrc} alt={logoAlt} className="shrink-0" />
				<div className="hidden items-center 2xl:flex">
					<HeaderDesktopMenu menu={menuDesktop} />
				</div>
				<HeaderSearch className="mr-2 ml-auto bg-green-600 sm:mr-4 lg:mx-auto xl:mr-14 xl:ml-auto 2xl:mx-0" />
				<div className="flex w-full justify-end space-x-4 lg:max-w-max lg:space-x-6">
					<HeaderToolbarProfile className="hidden lg:flex" />
					<HeaderToolbarWishlist />
					<HeaderToolbarCart />
				</div>
				<div className="order-first mr-4 2xl:hidden">
					<HeaderMobileMenu menu={menuMobile} logo={{ src: logoSrc, alt: logoAlt }} />
				</div>
			</Container>
		</header>
	);
};
export { Header };
