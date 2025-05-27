import { defineField, defineType } from "sanity";

const seo = defineType({
	name: "seo",
	title: "SEO / Share Settings",
	type: "object",
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		defineField({
			name: "metaTitle",
			title: "Meta Title",
			type: "string",
			description: "Title used for search engines and browsers",
			validation: (rule) =>
				rule.max(50).warning("Longer titles may be truncated by search engines"),
		}),
		defineField({
			name: "metaDesc",
			title: "Meta Description",
			type: "text",
			rows: 3,
			description: "Description for search engines",
			validation: (rule) =>
				rule.max(150).warning("Longer descriptions may be truncated by search engines"),
		}),
		defineField({
			name: "shareTitle",
			title: "Share Title",
			type: "string",
			description: "Title used for social sharing cards",
			validation: (rule) => rule.max(50).warning("Longer titles may be truncated by social sites"),
		}),
		defineField({
			name: "shareDesc",
			title: "Share Description",
			type: "text",
			rows: 3,
			description: "Description used for social sharing cards",
			validation: (rule) =>
				rule.max(150).warning("Longer descriptions may be truncated by social sites"),
		}),
		defineField({
			name: "shareGraphic",
			title: "Share Graphic",
			type: "image",
			description: "Recommended size: 1200x630 (PNG or JPG)",
		}),
	],
});

export { seo };
