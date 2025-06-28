import { defineField, defineType } from "sanity";
import { Globe } from "lucide-react";

const socialSettings = defineType({
	name: "socialSettings",
	title: "Social Links",
	icon: Globe,
	type: "document",
	fields: [
		defineField({
			name: "facebook",
			title: "Facebook",
			type: "url",
			description: "E.g. https://www.facebook.com/username",
		}),
		defineField({
			name: "twitter",
			title: "Twitter",
			type: "url",
			description: "E.g. https://twitter.com/username",
		}),
		defineField({
			name: "instagram",
			title: "Instagram",
			type: "url",
			description: "E.g. https://www.instagram.com/username",
		}),
		defineField({
			name: "youtube",
			title: "YouTube",
			type: "url",
			description: "E.g. https://www.youtube.com/username",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Social Links",
			};
		},
	},
});

export { socialSettings };
