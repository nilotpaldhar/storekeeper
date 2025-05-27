import type { StructureBuilder } from "sanity/structure";
import {
	AlignHorizontalJustifyEnd,
	Globe,
	Megaphone,
	PanelTop,
	Settings,
	SlidersHorizontal,
} from "lucide-react";

const generalSettingsMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("General")
		.child(
			S.editor().id("generalSettings").schemaType("generalSettings").documentId("generalSettings")
		)
		.icon(SlidersHorizontal);

const headerSettingsMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Header Configuration")
		.child(
			S.editor().id("headerSettings").schemaType("headerSettings").documentId("headerSettings")
		)
		.icon(PanelTop);

const footerSettingsMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Footer Configuration")
		.child(
			S.editor().id("footerSettings").schemaType("footerSettings").documentId("footerSettings")
		)
		.icon(AlignHorizontalJustifyEnd);

const defaultSeoSettingsMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("SEO & Social Sharing")
		.child(S.editor().id("seoSettings").schemaType("seoSettings").documentId("seoSettings"))
		.icon(Megaphone);

const socialSettingsMenu = (S: StructureBuilder) =>
	S.listItem()
		.title("Social Links")
		.child(
			S.editor().id("socialSettings").schemaType("socialSettings").documentId("socialSettings")
		)
		.icon(Globe);

const settings = (S: StructureBuilder) =>
	S.listItem()
		.title("Settings")
		.id("settings")
		.child(
			S.list()
				.title("Settings")
				.items([
					generalSettingsMenu(S),
					S.divider(),
					headerSettingsMenu(S),
					footerSettingsMenu(S),
					S.divider(),
					defaultSeoSettingsMenu(S),
					socialSettingsMenu(S),
				])
		)
		.icon(Settings);

export { settings };
