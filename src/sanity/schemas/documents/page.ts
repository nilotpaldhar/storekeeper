import { defineField, defineType } from "sanity";
import { Link2 } from "lucide-react";

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
			title: "URL Slug",
			name: "slug",
			type: "slug",
			description: "(required)",
			options: { source: "title", maxLength: 96 },
			validation: (rule) => rule.required().error("The slug is required"),
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
