import type { StructureBuilder } from "sanity/structure";

import { Home, Files, FileStack, OctagonX } from "lucide-react";

const homePageMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Home")
		.child(S.editor().id("homePage").schemaType("homePage").documentId("homePage"))
		.icon(Home);

const notFoundPageMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Not Found")
		.child(S.editor().id("notFoundPage").schemaType("notFoundPage").documentId("notFoundPage"))
		.icon(OctagonX);

const otherPagesMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Other Pages")
		.schemaType("page")
		.child(
			S.documentTypeList("page")
				.title("Other Pages")
				.child((documentId) => S.document().documentId(documentId).schemaType("page"))
		)
		.icon(Files);

const pages = (S: StructureBuilder) =>
	S.listItem()
		.title("Pages")
		.id("pages")
		.child(
			S.list()
				.title("Pages")
				.items([homePageMenu(S), notFoundPageMenu(S), otherPagesMenu(S)])
		)
		.icon(FileStack);

export { pages };
