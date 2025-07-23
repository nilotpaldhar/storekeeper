import { SlidersHorizontal } from "lucide-react";
import { defineField, defineType } from "sanity";

const promoBlock = defineType({
	name: "promoBlock",
	title: "Promo Block",
	type: "document",
	icon: SlidersHorizontal,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Primary heading for the block (max 50 characters).",
			validation: (Rule) =>
				Rule.required().max(50).error("Title is required and must be under 50 characters."),
		}),

		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 4,
			description: "Optional supporting text (max 150 characters).",
			validation: (Rule) => Rule.max(150).error("Description must be under 150 characters."),
		}),

		defineField({
			name: "thumbnail",
			title: "Thumbnail Image (600x600)",
			type: "mediaImage",
			description:
				"Required image shown on the left or right of the promo block, typically used for the product being promoted (600x600 recommended).",
			validation: (Rule) => Rule.required().error("Thumbnail image is required."),
		}),

		defineField({
			name: "backdrop",
			title: "Backdrop Image (1500x600)",
			type: "mediaImage",
			description:
				"Optional full-width background image behind the content (1500x600 recommended). Ideal for desktop displays.",
		}),

		defineField({
			name: "contentAlignment",
			title: "Content Alignment",
			type: "string",
			description: "Align content to the left or right of the image (for layout purposes).",
			initialValue: "left",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
				layout: "radio",
				direction: "horizontal",
			},
		}),

		defineField({
			name: "price",
			title: "Price Display",
			type: "object",
			description: "Optional promotional pricing block.",
			fields: [
				defineField({
					name: "label",
					title: "Prefix Label",
					type: "string",
					initialValue: "Starts At",
					description: "Prefix before the price (e.g., 'Starts At').",
					validation: (Rule) =>
						Rule.required().max(20).error("Label is required and must be under 20 characters."),
				}),
				defineField({
					name: "amount",
					title: "Formatted Amount",
					type: "string",
					description: "Enter the amount along with currency symbol (e.g., ₹1999, $49.99).",
					validation: (Rule) =>
						Rule.required().max(20).error("Amount is required and must include currency symbol."),
				}),
			],
		}),

		defineField({
			title: "Link",
			name: "link",
			type: "object",
			fields: [
				defineField({
					title: "Label",
					name: "label",
					type: "string",
					initialValue: "Discover Now",
				}),
				defineField({
					title: "Resource",
					name: "resource",
					type: "reference",
					to: [{ type: "page" }, { type: "product" }, { type: "taxonomy" }, { type: "taxon" }],
					options: {
						disableNew: true,
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "thumbnail.image",
		},
		prepare({ title, media }) {
			return {
				title: title ?? "Untitled Promo Block",
				media,
			};
		},
	},
});

export { promoBlock };
