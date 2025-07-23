import { BoxesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const productShowcase = defineType({
	name: "productShowcase",
	title: "Product Showcase",
	icon: BoxesIcon,
	type: "object",
	options: { collapsible: true, collapsed: true },
	fields: [
		defineField({
			name: "title",
			title: "Section Title",
			type: "string",
			validation: (Rule) => Rule.required().error("Section title is required"),
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [{ type: "reference", to: [{ type: "product" }] }],
			validation: (Rule) => Rule.required().min(1).error("At least one product is required"),
		}),
		defineField({
			name: "hidden",
			title: "Hide Section",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title }) {
			return {
				title: title || "Untitled Showcase",
				subtitle: "Product Showcase Section",
			};
		},
	},
});

export { productShowcase };
