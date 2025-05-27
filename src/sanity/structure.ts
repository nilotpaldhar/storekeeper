/**
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */

import type { ListItemBuilder, StructureResolver } from "sanity/structure";

import { pages } from "@/sanity/desk/pages";
import { menus } from "@/sanity/desk/menus";
import { settings } from "@/sanity/desk/settings";

const hiddenDocTypes = (listItem: ListItemBuilder) =>
	![
		// Pages
		"homePage",
		"notFoundPage",
		"page",

		// Settings
		"generalSettings",
		"seoSettings",
		"socialSettings",
		"headerSettings",
		"footerSettings",

		// Navigation
		"menu",
	].includes(listItem.getId() ?? "");

const structure: StructureResolver = (S) =>
	S.list()
		.title("Website")
		.items([
			pages(S),
			S.divider(),
			menus(S),
			S.divider(),
			settings(S),
			S.divider(),

			// Filter out docs already defined above
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export { structure };
