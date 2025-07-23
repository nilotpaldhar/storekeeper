import { LayoutGrid } from "lucide-react";
import { defineType, defineField } from "sanity";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const collection = defineType({
	name: "collection",
	title: "Collection",
	type: "document",
	icon: LayoutGrid,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Short, unique name for this collection",
			validation: (rule) =>
				rule.required().min(2).max(20).error("Title must be between 2 and 20 characters."),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: noSlashSlugValidation,
		}),

		defineField({
			name: "description",
			title: "Short Description",
			type: "text",
			rows: 2,
			description: "One-liner to describe this collection (max 40 characters)",
			validation: (rule) => rule.max(50).error("Keep it concise. Recommended under 50 characters."),
		}),

		defineField({
			name: "thumbnail",
			title: "Thumbnail Image",
			type: "mediaImage",
			description: "Recommended: 400x200px.",
		}),

		defineField({
			name: "banner",
			title: "Banner Image",
			type: "mediaImage",
			description: "Recommended: 800x400px. Used for page headers or large promos.",
		}),

		defineField({
			name: "products",
			title: "Linked Products",
			type: "array",
			of: [{ type: "reference", to: [{ type: "product" }] }],
			description: "Select one or more products to include in this collection.",
		}),

		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
			description: "Configure SEO metadata and social sharing info for this collection.",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "slug.current",
			media: "thumbnail.image",
		},
	},
});

export { collection };
