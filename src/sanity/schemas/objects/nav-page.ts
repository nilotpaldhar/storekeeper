import { File } from "lucide-react";
import { defineField, defineType } from "sanity";

const navPage = defineType({
	name: "navPage",
	title: "Page",
	icon: File,
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
			name: "page",
			title: "Page",
			type: "reference",
			to: [{ type: "homePage" }, { type: "page" }],
			validation: (rule) => rule.required().error("The page is required"),
			options: { disableNew: true },
		}),
	],
	preview: {
		select: { label: "label" },
		prepare({ label }) {
			return { title: label };
		},
	},
});

export { navPage };
