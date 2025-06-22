import { defineField, defineType } from "sanity";
import { Layers } from "lucide-react";

const navTaxonomy = defineType({
	name: "navTaxonomy",
	title: "Taxonomy",
	icon: Layers,
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Optional. Overrides the taxonomy title in the menu",
			validation: (rule) => rule.max(100),
		}),
		defineField({
			name: "linkedTaxonomy",
			title: "Linked Taxonomy",
			type: "reference",
			to: [{ type: "taxonomy" }],
			description: "Select the taxonomy this nav item should link to",
			validation: (rule) => rule.required().error("A taxonomy reference is required"),
			options: { disableNew: true },
		}),
	],
	preview: {
		select: {
			label: "label",
			taxonomyTitle: "linkedTaxonomy.title",
		},
		prepare({ label, taxonomyTitle }) {
			return {
				title: label || taxonomyTitle || "(Untitled product)",
				subtitle: label && taxonomyTitle ? `→ ${taxonomyTitle}` : undefined,
			};
		},
	},
});

export { navTaxonomy };
