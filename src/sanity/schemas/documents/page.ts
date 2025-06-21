import { defineField, defineType } from "sanity";
import { Link2 } from "lucide-react";

import { noSlashSlugValidation } from "@/sanity/helpers/slug-validation";

const page = defineType({
	name: "page",
	title: "Pages",
	icon: Link2,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "required",
			validation: (rule) => rule.required().error("The title is required"),
		}),
		defineField({
			name: "slug",
			title: "URL Slug",
			type: "slug",
			description: "(required)",
			options: { source: "title", maxLength: 96 },
			validation: noSlashSlugValidation,
		}),
		defineField({
			name: "pageContent",
			title: "Page Content",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
		}),
	],
	preview: {
		select: { title: "title", slug: "slug" },
		prepare({ title = "Untitled", slug }) {
			const subtitle = slug?.current ? `/${slug?.current}` : "(missing slug)";
			return { title, subtitle };
		},
	},
});

export { page };
