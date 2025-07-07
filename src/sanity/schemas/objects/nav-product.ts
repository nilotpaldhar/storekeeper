import { Package } from "lucide-react";
import { defineField, defineType } from "sanity";

const navProduct = defineType({
	name: "navProduct",
	title: "Product",
	icon: Package,
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Optional. Overrides the product title in the menu",
			validation: (rule) => rule.max(100),
		}),
		defineField({
			name: "linkedProduct",
			title: "Linked Product",
			type: "reference",
			to: [{ type: "product" }],
			description: "Select the product this nav item should link to",
			validation: (rule) => rule.required().error("A product reference is required"),
			options: {
				disableNew: true, // prevents creating products inline
			},
		}),
	],
	preview: {
		select: {
			label: "label",
			productTitle: "linkedProduct.title",
		},
		prepare({ label, productTitle }) {
			return {
				title: label || productTitle || "(Untitled product)",
				subtitle: label && productTitle ? `→ ${productTitle}` : undefined,
			};
		},
	},
});

export { navProduct };
