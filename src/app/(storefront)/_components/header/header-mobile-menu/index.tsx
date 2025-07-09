"use client";

import type { HeaderMenu } from "@/types/ui.types";

import { Menu, XIcon } from "lucide-react";
import { useState } from "react";

import { HeaderAccountPreview } from "@/app/(storefront)/_components/header/header-account-preview";
import { HeaderMobileMenuDropdown } from "@/app/(storefront)/_components/header/header-mobile-menu/header-mobile-menu-dropdown";
import { HeaderMobileMenuMegaDropdown } from "@/app/(storefront)/_components/header/header-mobile-menu/header-mobile-menu-mega-dropdown";
import { HeaderNavLink } from "@/app/(storefront)/_components/header/header-nav-link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { SiteLogo } from "@/components/ui/site-logo";

import { cn } from "@/lib/utils/general/cn";

type HeaderMobileMenuProps = {
	menu: HeaderMenu | null;
	logo: {
		src: string | null;
		alt?: string | null;
	};
};

const Divider = ({ className }: { className?: string }) => (
	<hr className={cn("my-6 border-neutral-100", className)} />
);

const HeaderMobileMenu = ({ menu, logo }: HeaderMobileMenuProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				size="icon"
				variant="dark-ghost"
				className="hover:text-primary-600 w-min"
				onClick={() => setOpen(true)}
			>
				<Menu />
				<span className="sr-only">toggle mobile menu</span>
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-[300px]" closeClassName="hidden">
					<SheetHeader className="sr-only">
						<SheetTitle>Mobile Menu</SheetTitle>
						<SheetDescription>Mobile Menu</SheetDescription>
					</SheetHeader>
					<ScrollArea className="h-full">
						<div className="flex items-center justify-between px-5 pt-4">
							<SiteLogo href="/" logoSrc={logo.src} alt={logo.alt} />
							<button
								type="button"
								onClick={() => setOpen(false)}
								className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-neutral-50 text-neutral-900 hover:bg-neutral-100 hover:text-current"
							>
								<XIcon size={14} />
								<span className="sr-only">close mobile menu</span>
							</button>
						</div>
						<Divider className="mt-4 mb-6" />
						<div className="px-5">
							<HeaderAccountPreview />
						</div>
						<Divider className="mt-6 mb-4" />
						{menu ? (
							<nav className="pb-4">
								{menu.isMegaDropdown ? (
									<HeaderMobileMenuMegaDropdown items={menu.megaDropdownItems} />
								) : (
									<ul>
										{menu.menuItems.map((item) => (
											<li key={item.refKey} className="flex items-center">
												{item.type === "navDropdown" ? (
													<HeaderMobileMenuDropdown {...item} className="" />
												) : (
													<HeaderNavLink
														{...item}
														className="block w-full px-5 py-2 text-sm font-medium hover:bg-neutral-50 hover:text-current"
													/>
												)}
											</li>
										))}
									</ul>
								)}
							</nav>
						) : null}
					</ScrollArea>
				</SheetContent>
			</Sheet>
		</>
	);
};

export { HeaderMobileMenu };
