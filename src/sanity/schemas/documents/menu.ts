import { defineField, defineType } from "sanity";
import { ListTree } from "lucide-react";

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
			name: "items",
			title: "Menu Items",
			type: "array",
			of: [{ type: "navLink" }, { type: "navPage" }, { type: "navDropdown" }],
			validation: (rule) => rule.required().min(1).error("At least one menu item is required"),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title,
			};
		},
	},
});

export { menu };
