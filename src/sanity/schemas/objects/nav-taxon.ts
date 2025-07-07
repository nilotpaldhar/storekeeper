import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

const navTaxon = defineType({
	name: "navTaxon",
	title: "Taxon",
	icon: Tag,
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Optional. Overrides the taxon title in the menu",
			validation: (rule) => rule.max(100),
		}),
		defineField({
			name: "linkedTaxon",
			title: "Linked Taxon",
			type: "reference",
			to: [{ type: "taxon" }],
			description: "Select the taxon this nav item should link to",
			validation: (rule) => rule.required().error("A taxon reference is required"),
			options: { disableNew: true },
		}),
	],
	preview: {
		select: {
			label: "label",
			taxonTitle: "linkedTaxon.title",
		},
		prepare({ label, taxonTitle }) {
			return {
				title: label || taxonTitle || "(Untitled product)",
				subtitle: label && taxonTitle ? `→ ${taxonTitle}` : undefined,
			};
		},
	},
});

export { navTaxon };
