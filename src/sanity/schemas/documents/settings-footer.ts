import { defineField, defineType } from "sanity";
import { AlignHorizontalJustifyEnd } from "lucide-react";

const navBlock = ({ blockNumber, title }: { blockNumber: number; title: string }) => [
	defineField({
		title: "Title",
		name: `navBlockTitle${blockNumber}`,
		type: "string",
		initialValue: title,
		fieldset: `navBlock${blockNumber}`,
	}),
	defineField({
		title: "Menu Items",
		name: `navBlockMenuItems${blockNumber}`,
		type: "array",
		of: [{ type: "navLink" }, { type: "navPage" }],
		fieldset: `navBlock${blockNumber}`,
	}),
];

const footerSettings = defineType({
	name: "footerSettings",
	title: "Footer Configuration",
	icon: AlignHorizontalJustifyEnd,
	type: "document",
	fieldsets: [
		{
			name: "aboutBlock",
			title: "About Block",
			description: "Settings for the footer about block",
			options: { collapsible: true },
		},
		{
			name: "navBlock1",
			title: "Navigation Block One",
			description: "Settings for the first footer navigation block",
			options: { collapsible: true },
		},
		{
			name: "navBlock2",
			title: "Navigation Block Two",
			description: "Settings for the second footer navigation block",
			options: { collapsible: true },
		},
		{
			name: "navBlock3",
			title: "Navigation Block Three",
			description: "Settings for the third footer navigation block",
			options: { collapsible: true },
		},
		{
			name: "infoBlock",
			title: "Info Block",
			description: "Settings for the footer info block",
			options: { collapsible: true },
		},
	],
	fields: [
		// About Block.
		defineField({
			name: "aboutCompany",
			title: "About Your Company",
			type: "text",
			rows: 3,
			fieldset: "aboutBlock",
		}),
		defineField({
			name: "readMoreLink",
			title: "Read More Link",
			description: "Internal page link for extended About content",
			type: "navPage",
			fieldset: "aboutBlock",
		}),
		defineField({
			name: "copyrightText",
			title: "Copyright Text",
			type: "string",
			fieldset: "aboutBlock",
		}),

		// Navigation Block One
		...navBlock({ blockNumber: 1, title: "Company" }),

		// Navigation Block Two
		...navBlock({ blockNumber: 2, title: "Information" }),

		// Navigation Block Three
		...navBlock({ blockNumber: 3, title: "Account" }),

		// Info Block
		defineField({
			name: "infoBlockTitle",
			title: "Title",
			type: "string",
			initialValue: "Need Help?",
			fieldset: "infoBlock",
		}),
		defineField({
			name: "emailAddress",
			title: "Email Address",
			type: "string",
			validation: (rule) => rule.email().error("Must be a valid email address"),
			fieldset: "infoBlock",
		}),
		defineField({
			name: "phoneNumber",
			title: "Phone Number",
			type: "string",
			validation: (rule) =>
				rule
					.regex(/^\+?[0-9\s\-()]{7,20}$/, {
						name: "phone number",
						invert: false,
					})
					.error("Enter a valid phone number"),
			fieldset: "infoBlock",
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Footer Configuration",
			};
		},
	},
});

export { footerSettings };
