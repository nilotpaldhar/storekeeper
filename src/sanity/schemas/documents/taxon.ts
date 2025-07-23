import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const taxon = defineType({
	name: "taxon",
	title: "Taxon",
	type: "document",
	icon: Tag,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "required",
			validation: (rule) =>
				rule.required().min(2).max(50).error("Title must be between 2 and 50 characters."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: { source: "title", maxLength: 96 },
			validation: noSlashSlugValidation,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Brief description of the taxonomy (max 160 characters)",
			validation: (rule) => rule.max(160).error("Description must not exceed 160 characters."),
		}),
		defineField({
			name: "media",
			title: "Taxon Image",
			type: "mediaImage",
			description: "Image representing the taxon",
		}),
		defineField({
			name: "taxonomy",
			title: "Belongs to Taxonomy",
			type: "reference",
			to: [{ type: "taxonomy" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "parent",
			title: "Parent Taxon",
			type: "reference",
			to: [{ type: "taxon" }],
			description: "Optional — link to a parent taxon to create a hierarchy",
			validation: (rule) =>
				rule.custom((parent, context) => {
					if (!parent) return true;

					// Normalize current document ID by removing "drafts." prefix if present
					const currentId = context.document?._id.replace(/^drafts\./, "");

					if (parent._ref === currentId) {
						return "A taxon cannot be its own parent.";
					}

					return true;
				}),
		}),
		defineField({
			name: "isLeaf",
			title: "Is Leaf Node",
			type: "boolean",
			description: "Check this if products can be assigned to this category.",
			initialValue: false,
		}),

		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
			description: "Configure SEO metadata and social sharing info for this taxon.",
		}),
	],
	preview: {
		select: {
			title: "title",
			taxonomy: "taxonomy.title",
			image: "media.image",
		},
		prepare({ title, taxonomy, image }) {
			return {
				title: title,
				subtitle: taxonomy,
				media: image,
			};
		},
	},
});

export { taxon };
