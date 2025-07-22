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
			name: "categorySection",
			title: "Shop by Category Section",
			type: "object",
			options: { collapsible: true, collapsed: true },
			fields: [
				defineField({
					name: "title",
					title: "Section Heading",
					type: "string",
					initialValue: "Shop by Category",
					description: "Main heading shown above the category carousel on the homepage.",
					validation: (Rule) => Rule.required().error("Section heading is required."),
				}),

				defineField({
					name: "items",
					title: "Displayed Categories",
					type: "array",
					of: [{ type: "reference", to: [{ type: "taxonomy" }] }],
					description: "Add taxonomies to display in the carousel.",
				}),

				defineField({
					name: "hidden",
					title: "Hide This Section",
					type: "boolean",
					initialValue: false,
					description: "Toggle visibility of the 'Shop by Category' section on the homepage.",
				}),
			],
		}),

		defineField({
			name: "promoSection",
			title: "Promo Blocks Section",
			type: "object",
			options: { collapsible: true, collapsed: true },
			fields: [
				defineField({
					name: "items",
					title: "Promo Blocks",
					type: "array",
					of: [{ type: "reference", to: [{ type: "promoBlock" }] }],
					description: "List of promotional banners or hero slides to be shown.",
				}),
				defineField({
					name: "hidden",
					title: "Hide Section",
					type: "boolean",
					initialValue: false,
					description: "Toggle visibility of the promo block section on the frontend.",
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
