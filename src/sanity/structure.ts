/**
 * https://www.sanity.io/docs/structure-builder-cheat-sheet
 */

import type { ListItemBuilder, StructureResolver } from "sanity/structure";

import { pages } from "@/sanity/desk/pages";

const hiddenDocTypes = (listItem: ListItemBuilder) =>
	!["page", "homePage", "notFoundPage"].includes(listItem.getId() ?? "");

const structure: StructureResolver = (S) =>
	S.list()
		.title("Website")
		.items([
			pages(S),
			S.divider(),

			// Filter out docs already defined above
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export { structure };
