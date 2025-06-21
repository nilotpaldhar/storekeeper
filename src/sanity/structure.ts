import type { ListItemBuilder, StructureResolver } from "sanity/structure";

import { pages } from "@/sanity/desk/pages";
import { menus } from "@/sanity/desk/menus";
import { commerce } from "@/sanity/desk/commerce";
import { settings } from "@/sanity/desk/settings";

// Define a function to hide specific document types from the default list
// This prevents them from showing up in the auto-generated document list at the root
const hiddenDocTypes = (listItem: ListItemBuilder) =>
	![
		"homePage",
		"notFoundPage",
		"page",
		"generalSettings",
		"seoSettings",
		"socialSettings",
		"headerSettings",
		"footerSettings",
		"menu",
		"product",
		"sku",
		"taxonomy",
		"taxon",
		"brand",
	].includes(listItem.getId() ?? "");

// Define the custom structure for the Sanity Studio
const structure: StructureResolver = (S) =>
	S.list()
		.title("Website") // Title shown at the top of the custom desk structure
		.items([
			// Pages section
			pages(S),
			S.divider(),

			// Menus section
			menus(S),
			S.divider(),

			// Commerce section (products, SKUs, etc.)
			commerce(S),
			S.divider(),

			// Site-wide settings (SEO, social, headers/footers)
			settings(S),
			S.divider(),

			// Include all other document types not explicitly handled above,
			// excluding those listed in `hiddenDocTypes`
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export { structure };
