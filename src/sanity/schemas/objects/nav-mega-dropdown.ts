import { defineField, defineType } from "sanity";
import { PanelBottom } from "lucide-react";

const navMegaDropdown = defineType({
	name: "navMegaDropdown",
	title: "Mega Dropdown Menu",
	icon: PanelBottom,
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "required",
			validation: (rule) => rule.required().error("The label is required"),
		}),
		defineField({
			title: "Columns",
			name: "columns",
			type: "array",
			of: [{ type: "navMegaDropdownColumn" }],
		}),
	],
	preview: {
		select: { label: "label" },
		prepare({ label }) {
			return { title: label };
		},
	},
});

export { navMegaDropdown };
