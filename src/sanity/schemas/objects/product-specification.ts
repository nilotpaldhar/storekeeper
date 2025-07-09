import { List } from "lucide-react";
import { defineField, defineType } from "sanity";

const productSpecification = defineType({
	name: "productSpecification",
	title: "Product Specification",
	type: "object",
	icon: List,
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "The name of the specification (e.g., Material, Weight, Dimensions)",
			validation: (rule) =>
				rule.required().min(2).max(50).error("Label must be between 2 and 50 characters."),
		}),
		defineField({
			name: "value",
			title: "Value",
			type: "string",
			description: "The value of the specification (e.g., Cotton, 500g, 10x10x2 cm)",
			validation: (rule) =>
				rule.required().min(1).max(100).error("Value must be between 1 and 100 characters."),
		}),
	],
	preview: {
		select: {
			label: "label",
			value: "value",
		},
		prepare({ label, value }) {
			const truncatedValue = value?.length > 30 ? value.slice(0, 30) + "…" : value;
			return {
				title: label,
				subtitle: truncatedValue,
			};
		},
	},
});

export { productSpecification };
