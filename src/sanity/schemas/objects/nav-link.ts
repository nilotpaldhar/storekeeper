import { LinkIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const navLink = defineType({
	name: "navLink",
	title: "Link",
	icon: LinkIcon,
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "required",
			validation: (rule) => rule.required().error("The label is required"),
		}),
		defineField({
			name: "isExternal",
			title: "Is External",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			description: "required",
			hidden: ({ parent }) => {
				const p = parent as { isExternal?: boolean };
				return !p?.isExternal;
			},
			validation: (rule) => {
				return rule.custom((value, context) => {
					const p = context.parent as { isExternal?: boolean };
					if (p?.isExternal && !value) {
						return "URL is required for external links";
					}
					return true;
				});
			},
		}),
		defineField({
			name: "path",
			title: "Path",
			type: "string",
			description:
				"Should be a relative slug like 'about' or 'about/mission'. Must not be a full URL.",
			hidden: ({ parent }) => {
				const p = parent as { isExternal?: boolean };
				return !!p?.isExternal;
			},
			validation: (rule) => {
				return rule.custom((value, context) => {
					const p = context.parent as { isExternal?: boolean };
					if (!p?.isExternal) {
						if (!value || value.trim() === "") {
							return "Path is required for internal links";
						}

						if (/^https?:\/\//.test(value)) {
							return "Path must not be a full URL. Use a relative slug like 'about' or 'about/mission'.";
						}

						if (/[^a-zA-Z0-9\-/#]/.test(value)) {
							return "Only lowercase letters, numbers, dashes, slashes, and hash symbols are allowed.";
						}
					}
					return true;
				});
			},
		}),
	],
	preview: {
		select: {
			label: "label",
			isExternal: "isExternal",
			url: "url",
			path: "path",
		},
		prepare({ label, isExternal, url, path }) {
			const subtitle = isExternal ? url : `${path || "(no link)"}`;
			return {
				title: label,
				subtitle: subtitle || "(no link)",
			};
		},
	},
});

export { navLink };
