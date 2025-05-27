import { defineField, defineType } from "sanity";
import { Megaphone } from "lucide-react";

import { decodeAssetUrl } from "@/sanity/helpers/decode-asset-url";

const seoSettings = defineType({
	name: "seoSettings",
	title: "SEO & Social Sharing",
	icon: Megaphone,
	type: "document",
	fieldsets: [
		{ title: "Meta Information", name: "metaInfo" },
		{ title: "Social Share", name: "socialShare" },
		{ title: "Twitter Share", name: "twitterShare" },
		{ title: "Favicon", name: "favicon" },
	],
	fields: [
		// Meta Information
		defineField({
			title: "Meta Title",
			name: "metaTitle",
			type: "string",
			description: "Title used for search engines and browsers",
			validation: (rule) =>
				rule.max(50).warning("Longer titles may be truncated by search engines"),
			fieldset: "metaInfo",
		}),
		defineField({
			title: "Meta Description",
			name: "metaDesc",
			type: "text",
			rows: 3,
			description: "Description for search engines",
			validation: (rule) =>
				rule.max(150).warning("Longer descriptions may be truncated by search engines"),
			fieldset: "metaInfo",
		}),
		defineField({
			title: "Meta No Follow",
			name: "metaRobotsNofollow",
			type: "boolean",
			initialValue: true,
			fieldset: "metaInfo",
		}),
		defineField({
			title: "Meta No Index",
			name: "metaRobotsNoindex",
			type: "boolean",
			initialValue: true,
			fieldset: "metaInfo",
		}),

		// Social Share
		defineField({
			title: "Default Share Title",
			name: "shareTitle",
			type: "string",
			description: "Title used for social sharing cards",
			validation: (rule) => rule.max(50).warning("Longer titles may be truncated by social sites"),
			fieldset: "socialShare",
		}),
		defineField({
			title: "Default Share Description",
			name: "shareDesc",
			type: "text",
			rows: 3,
			description: "Description used for social sharing cards",
			validation: (rule) =>
				rule.max(150).warning("Longer descriptions may be truncated by social sites"),
			fieldset: "socialShare",
		}),
		defineField({
			title: "Default Share Graphic",
			name: "shareGraphic",
			type: "image",
			description: "Recommended size: 1200x630 (PNG or JPG)",
			fieldset: "socialShare",
		}),

		// Twitter Share
		defineField({
			title: "Username",
			name: "twitterUsername",
			type: "string",
			fieldset: "twitterShare",
		}),
		defineField({
			title: "Card Type",
			name: "twitterCardType",
			type: "string",
			options: {
				list: [
					{ title: "Summary", value: "summary" },
					{ title: "Summary Large", value: "summary_large_image" },
				],
				layout: "radio",
			},
			fieldset: "twitterShare",
		}),

		// Favicon
		defineField({
			title: "Browser Icon (Favicon)",
			name: "favicon",
			type: "image",
			description: "Upload a 16 x 16 SVG icon to use as the browser icon",
			options: {
				accept: "image/svg+xml",
			},
			validation: (rule) =>
				rule.custom((field) => {
					if (!field || !field.asset?._ref) return true;
					const { dimensions } = decodeAssetUrl(field.asset?._ref);
					if (dimensions?.width !== 16 || dimensions?.height !== 16)
						return "Favicon must be a 16x16 SVG";
					return true;
				}),
			fieldset: "favicon",
		}),
		defineField({
			title: "Legacy Browser Icon (.ico)",
			name: "faviconLegacy",
			type: "file",
			description: "Upload a 32 x 32 .ico file for older browsers",
			validation: (rule) =>
				rule.custom((field) => {
					if (!field || !field.asset?._ref) return true;
					const { format } = decodeAssetUrl(field.asset?._ref);
					if (format !== "ico") return "Legacy Favicon must be a 32x32 ICO file";
					return true;
				}),
			fieldset: "favicon",
		}),
		defineField({
			title: "Touch Icon",
			name: "touchIcon",
			type: "image",
			description: "Recommended size: 192x192 (PNG)",
			fieldset: "favicon",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "SEO & Social Sharing",
			};
		},
	},
});

export { seoSettings };
