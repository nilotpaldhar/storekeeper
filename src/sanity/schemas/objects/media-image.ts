import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

const mediaImage = defineType({
	name: "mediaImage",
	title: "Media Image",
	type: "object",
	icon: Image,
	fields: [
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			validation: (rule) => rule.required().error("Image is required"),
		}),
		defineField({
			name: "altText",
			title: "Alt Text",
			type: "string",
			description: "Description for accessibility and SEO",
			validation: (rule) =>
				rule.min(10).max(150).error("Alt text should be between 10 and 150 characters."),
		}),
	],
});

export { mediaImage };
