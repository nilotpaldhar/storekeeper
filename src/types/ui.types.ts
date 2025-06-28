import type { FooterSettingsResult } from "@/types/sanity.types";

export type FooterMenuLink = NonNullable<
	Exclude<FooterSettingsResult, null>["blockOne"]["menus"]
>[number];

export type HeaderNavLinkType = {
	refKey: string;
	label: string;
	type: "navLink" | "navPage" | "navProduct" | "navTaxon" | "navTaxonomy";
	isExternal: boolean;
	href: string | null;
};

export type HeaderDropdownItem = {
	refKey: string;
	label: string;
	type: "navDropdown";
	isExternal: false;
	href: null;
	dropDownItems: HeaderNavLinkType[];
};

export type HeaderMegaDropdownItem = {
	refKey: string;
	label: string;
	type: "navMegaDropdown";
	isExternal: false;
	href: null;
	columns: {
		key: string;
		heading: string;
		items: HeaderNavLinkType[];
	}[];
};

export type HeaderMenu = {
	id: string;
	title: string;
	isMegaDropdown: boolean;
	megaDropdownItems: HeaderMegaDropdownItem[];
	menuItems: (HeaderNavLinkType | HeaderDropdownItem)[];
};
