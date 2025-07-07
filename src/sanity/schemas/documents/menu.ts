import { ListTree } from "lucide-react";
import { defineField, defineType } from "sanity";

const menu = defineType({
	name: "menu",
	title: "Menu",
	icon: ListTree,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Menu Name",
			type: "string",
			description: "required",
			validation: (rule) => rule.required().error("Menu name is required"),
		}),
		defineField({
			name: "isMegaDropdown",
			title: "Use Mega Dropdown?",
			type: "boolean",
			initialValue: false,
			description: "Toggle between standard items and mega dropdown",
		}),
		defineField({
			name: "items",
			title: "Menu Items",
			type: "array",
			of: [
				{ type: "navLink" },
				{ type: "navPage" },
				{ type: "navProduct" },
				{ type: "navTaxon" },
				{ type: "navTaxonomy" },
				{ type: "navDropdown" },
			],
			hidden: ({ parent }) => parent?.isMegaDropdown === true,
		}),
		defineField({
			name: "megaDropdowns",
			title: "Mega Dropdown Items",
			type: "array",
			of: [{ type: "navMegaDropdown" }],
			hidden: ({ parent }) => parent?.isMegaDropdown !== true,
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title }) {
			return { title };
		},
	},
});

export { menu };
