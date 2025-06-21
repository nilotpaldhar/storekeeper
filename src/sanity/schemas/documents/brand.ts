import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const brand = defineType({
	name: "brand",
	title: "Brand",
	type: "document",
	icon: Building2,
	fields: [
		defineField({
			name: "title",
			title: "Brand Name",
			type: "string",
			description: "required",
			validation: (rule) =>
				rule.required().min(2).max(50).error("Brand name must be between 2 and 50 characters."),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			description: "required",
			options: { source: "title", maxLength: 50 },
			validation: noSlashSlugValidation,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 3,
			validation: (rule) => rule.max(300).warning("Keep brand description under 300 characters."),
		}),
		defineField({
			name: "logo",
			title: "Brand Logo",
			type: "mediaImage",
			description: "Upload a square logo (preferably 1:1 aspect ratio)",
		}),
		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
			description: "Configure SEO metadata and social sharing info for this brand.",
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "logo.image",
		},
	},
});

export { brand };
