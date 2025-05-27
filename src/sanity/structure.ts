import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
const structure: StructureResolver = (S) =>
	S.list().title("Website").items(S.documentTypeListItems());

export { structure };
