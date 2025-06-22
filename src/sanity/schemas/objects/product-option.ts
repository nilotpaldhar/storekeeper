import { defineField, defineType } from "sanity";
import { List } from "lucide-react";

const productOption = defineType({
	name: "productOption",
	title: "Product Option",
	icon: List,
	type: "object",
	fields: [
		defineField({
			name: "name",
			title: "Option Name",
			type: "string",
			description: "e.g. Color, Size, Material",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "values",
			title: "Values",
			type: "array",
			of: [{ type: "string" }],
			validation: (rule) => rule.min(1).unique(),
		}),
	],
	preview: {
		select: {
			title: "name",
			values: "values",
		},
		prepare({ title, values }) {
			const subtitle = Array.isArray(values) ? values.join(" / ") : undefined;
			return { title, subtitle };
		},
	},
});

export { productOption };
