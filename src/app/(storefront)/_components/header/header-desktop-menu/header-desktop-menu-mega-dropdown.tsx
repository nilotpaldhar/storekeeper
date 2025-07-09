"use client";

import type { HeaderMegaDropdownItem } from "@/types/ui.types";

import {
	HeaderNavLink,
	headerNavLinkStyle,
} from "@/app/(storefront)/_components/header/header-nav-link";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils/general/cn";

type HeaderDesktopMenuMegaDropdownProps = {
	items: HeaderMegaDropdownItem[];
	className?: string;
};

const HeaderDesktopMenuMegaDropdown = ({ items }: HeaderDesktopMenuMegaDropdownProps) => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{items.map((item) => (
					<NavigationMenuItem key={item.refKey}>
						<NavigationMenuTrigger
							className={cn(headerNavLinkStyle(), "px-4 focus-visible:ring-0 xl:px-5")}
						>
							{item.label}
						</NavigationMenuTrigger>
						<NavigationMenuContent className="p-0">
							<div className="w-[600px]">
								<ScrollArea className="w-full overflow-x-auto p-5">
									<div className="flex w-max max-w-full space-x-4">
										{item.columns.map((column) => (
											<div
												key={column.key}
												className="flex shrink-0 flex-col space-y-3 overflow-hidden"
												style={{ width: 130 }} // ~4 columns in 600px
											>
												<h4 className="text-primary-600 text-sm font-semibold">{column.heading}</h4>
												<ul className="flex flex-col space-y-2">
													{column.items.map((columnItem) => (
														<li key={columnItem.refKey}>
															<HeaderNavLink {...columnItem} />
														</li>
													))}
												</ul>
											</div>
										))}
									</div>
									<ScrollBar orientation="horizontal" />
								</ScrollArea>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export { HeaderDesktopMenuMegaDropdown };
