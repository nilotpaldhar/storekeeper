import { defineField, defineType } from "sanity";
import { ChevronDownCircle } from "lucide-react";

const navDropdown = defineType({
	name: "navDropdown",
	title: "Dropdown Menu",
	icon: ChevronDownCircle,
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
			title: "Items",
			name: "items",
			type: "array",
			of: [{ type: "navLink" }, { type: "navPage" }],
		}),
	],
	preview: {
		select: { label: "label" },
		prepare({ label }) {
			return { title: label };
		},
	},
});

export { navDropdown };
