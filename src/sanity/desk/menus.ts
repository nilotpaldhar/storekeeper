import type { StructureBuilder } from "sanity/structure";
import { ListTree } from "lucide-react";

const menus = (S: StructureBuilder) =>
	S.listItem().title("Menus").child(S.documentTypeList("menu").title("Menus")).icon(ListTree);

export { menus };
