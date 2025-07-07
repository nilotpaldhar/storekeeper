import { XOctagon } from "lucide-react";
import { defineField, defineType } from "sanity";

const notFoundPage = defineType({
	name: "notFoundPage",
	title: "Not Found Page(404)",
	icon: XOctagon,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "required",
			initialValue: "Not Found",
			validation: (rule) => [
				rule.required().error("The title is required"),
				rule.max(30).error(`The title shouldn't be more than 30 characters`),
			],
		}),
		defineField({
			title: "Description",
			name: "description",
			rows: 5,
			type: "text",
			validation: (rule) =>
				rule.max(100).error(`The description shouldn't be more than 100 characters`),
		}),
		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title = "Not Found Page(404)" }) {
			return { title };
		},
	},
});

export { notFoundPage };
