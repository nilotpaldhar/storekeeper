import { defineField, defineType } from "sanity";
import { Columns3 } from "lucide-react";

const navMegaDropdownColumn = defineType({
	name: "navMegaDropdownColumn",
	title: "Mega Dropdown Column",
	icon: Columns3,
	type: "object",
	fields: [
		defineField({
			name: "heading",
			title: "Column Heading",
			type: "string",
			description: "required",
			validation: (rule) => rule.required().error("The heading is required"),
		}),
		defineField({
			name: "items",
			title: "Items",
			type: "array",
			of: [{ type: "navLink" }, { type: "navPage" }],
		}),
	],
});

export { navMegaDropdownColumn };
