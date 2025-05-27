import { defineField, defineType } from "sanity";
import { HomeIcon } from "lucide-react";

const homePage = defineType({
	name: "homePage",
	title: "Home Page",
	icon: HomeIcon,
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
			title: "URL Slug or Path",
			name: "slug",
			type: "string",
			initialValue: "/",
			readOnly: true,
		}),
		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
		}),
	],
	preview: {
		select: { title: "title" },
		prepare({ title = "Home Page" }) {
			return { title };
		},
	},
});

export { homePage };
