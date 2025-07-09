/* eslint-disable @typescript-eslint/no-explicit-any */

import type { HeaderSettingsResult } from "@/types/sanity.types";
import type {
	HeaderDropdownItem,
	HeaderMegaDropdownItem,
	HeaderMenu,
	HeaderNavLinkType,
} from "@/types/ui.types";

export type RawHeaderMenu = NonNullable<NonNullable<HeaderSettingsResult>["menuDesktop"]>;

const normalizeLink = (item: any): HeaderNavLinkType => {
	return {
		refKey: item.refKey,
		label: item.label ?? "",
		type: item.type,
		isExternal: item.isExternal ?? false,
		href: item.href ?? null,
	};
};

/**
 * Normalize raw menu data from Sanity into HeaderMenu structure.
 * Works for both menuDesktop and menuMobile.
 */
const normalizeHeaderMenu = (rawMenu: RawHeaderMenu): HeaderMenu | null => {
	if (!rawMenu) return null;

	const megaDropdownItems = rawMenu?.megaDropdownItems ?? [];
	const menuItems = rawMenu.menuItems ?? [];

	return {
		id: rawMenu.id,
		title: rawMenu.title ?? "",
		isMegaDropdown: rawMenu.isMegaDropdown ?? false,

		megaDropdownItems: Array.isArray(megaDropdownItems)
			? megaDropdownItems.map(
					(item: any): HeaderMegaDropdownItem => ({
						refKey: item.refKey,
						label: item.label ?? "",
						type: "navMegaDropdown",
						isExternal: false,
						href: null,
						columns: (item.columns ?? []).map((col: any) => ({
							key: col.refKey,
							heading: col.heading ?? "",
							items: (col.items ?? []).map(normalizeLink),
						})),
					})
				)
			: [],

		menuItems: Array.isArray(menuItems)
			? menuItems.map((item: any): HeaderNavLinkType | HeaderDropdownItem => {
					if (item.type === "navDropdown") {
						return {
							refKey: item.refKey,
							label: item.label ?? "",
							type: "navDropdown",
							isExternal: false,
							href: null,
							dropDownItems: (item.dropDownItems ?? []).map(normalizeLink),
						};
					}
					return normalizeLink(item);
				})
			: [],
	};
};

export { normalizeHeaderMenu };
