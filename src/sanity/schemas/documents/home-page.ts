import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

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
			description: "Internal label for the page. Not shown to users.",
			validation: (Rule) => Rule.required().error("The title is required."),
		}),

		defineField({
			name: "slug",
			title: "URL Slug or Path",
			type: "string",
			initialValue: "/",
			readOnly: true,
			description: "Path for the home page (fixed to '/').",
		}),

		defineField({
			name: "promoSection",
			title: "Promo Blocks",
			type: "object",
			options: { collapsible: true, collapsed: false },
			fields: [
				defineField({
					name: "hidden",
					title: "Hide Section",
					type: "boolean",
					initialValue: false,
					description: "Toggle visibility of the promo block section on the frontend.",
				}),
				defineField({
					name: "items",
					title: "Promo Blocks",
					type: "array",
					of: [{ type: "reference", to: [{ type: "promoBlock" }] }],
					description: "List of promotional banners or hero slides to be shown.",
					validation: (Rule) =>
						Rule.required().min(1).error("At least one promo block must be added."),
				}),
			],
		}),

		defineField({
			name: "productShowcases",
			title: "Product Showcases",
			type: "array",
			of: [{ type: "productShowcase" }],
		}),

		defineField({
			name: "seo",
			title: "SEO / Share Settings",
			type: "seo",
			description: "SEO metadata for search engines and social sharing.",
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
