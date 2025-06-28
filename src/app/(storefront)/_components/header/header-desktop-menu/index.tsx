import type { HeaderMenu } from "@/types/ui.types";

import { HeaderNavLink } from "@/app/(storefront)/_components/header/header-nav-link";
import { HeaderDesktopMenuDropdown } from "@/app/(storefront)/_components/header/header-desktop-menu/header-desktop-menu-dropdown";
import { HeaderDesktopMenuMegaDropdown } from "@/app/(storefront)/_components/header/header-desktop-menu/header-desktop-menu-mega-dropdown";

type HeaderDesktopMenuProps = {
	menu: HeaderMenu | null;
};

const HeaderDesktopMenu = ({ menu }: HeaderDesktopMenuProps) => {
	if (!menu) return null;

	return menu.isMegaDropdown ? (
		<HeaderDesktopMenuMegaDropdown items={menu.megaDropdownItems} />
	) : (
		<nav className=" ">
			<ul className="flex flex-wrap items-center space-x-8 xl:space-x-10">
				{menu.menuItems.map((item) => (
					<li key={item.refKey} className="flex items-center">
						{item.type === "navDropdown" ? (
							<HeaderDesktopMenuDropdown {...item} className="" />
						) : (
							<HeaderNavLink {...item} className="" />
						)}
					</li>
				))}
			</ul>
		</nav>
	);
};

export { HeaderDesktopMenu };
