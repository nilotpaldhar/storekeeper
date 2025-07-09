import { SlidersHorizontal } from "lucide-react";
import { defineField, defineType } from "sanity";

const generalSettings = defineType({
	name: "generalSettings",
	title: "General Settings",
	icon: SlidersHorizontal,
	type: "document",
	fields: [
		defineField({
			name: "siteTitle",
			title: "Site Title",
			type: "string",
			description: "The name of your site, usually your company/brand name",
		}),
		defineField({
			name: "siteDescription",
			title: "Site Description",
			type: "text",
			rows: 3,
		}),
		defineField({
			name: "siteURL",
			title: "Live Site URL",
			type: "url",
			description: "The root domain or subdomain of your website",
		}),
		defineField({
			name: "siteLogo",
			title: "Site Logo",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		prepare() {
			return {
				title: "General Settings",
			};
		},
	},
});

export { generalSettings };
