import { Layers } from "lucide-react";
import { defineField, defineType } from "sanity";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const taxonomy = defineType({
	name: "taxonomy",
	title: "Taxonomy",
	type: "document",
	icon: Layers,
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
			description: "required",
			options: { source: "title", maxLength: 50 },
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
			title: "Taxonomy Image",
			type: "mediaImage",
			description: "Image representing the taxonomy",
		}),
	],
	preview: {
		select: {
			title: "title",
			image: "media.image",
		},
		prepare({ title, image }) {
			return {
				title: title,
				media: image,
			};
		},
	},
});

export { taxonomy };
