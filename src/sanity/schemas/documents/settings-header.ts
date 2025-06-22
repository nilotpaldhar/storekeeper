import { defineField, defineType } from "sanity";
import { PanelTop } from "lucide-react";

const headerSettings = defineType({
	name: "headerSettings",
	title: "Header Configuration",
	icon: PanelTop,
	type: "document",
	fieldsets: [
		{
			name: "desktop",
			title: "Desktop",
			description: "Navigation settings for desktop view",
			options: { collapsed: false },
		},
		{
			name: "mobile",
			title: "Mobile",
			description: "Navigation settings for mobile view",
			options: { collapsed: false },
		},
	],
	fields: [
		defineField({
			name: "menuDesktop",
			title: "Desktop Menu",
			type: "reference",
			to: [{ type: "menu" }],
			fieldset: "desktop",
		}),
		defineField({
			name: "menuMobile",
			title: "Mobile Menu",
			type: "reference",
			to: [{ type: "menu" }],
			fieldset: "mobile",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Header Configuration",
			};
		},
	},
});

export { headerSettings };
