import S from '@sanity/desk-tool/structure-builder';
import { BsGear, BsFlag, BsGlobe } from 'react-icons/bs';
import { TbCookie } from 'react-icons/tb';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

// General Settings Menu
const generalSettingsMenu = S.listItem()
	.title('General')
	.child(
		S.editor().id('generalSettings').schemaType('generalSettings').documentId('generalSettings')
	)
	.icon(BsGear);

// Cookie Consent Settings Menu
const cookieConsentSettingsMenu = S.listItem()
	.title('Cookie Consent')
	.child(S.editor().id('cookieSettings').schemaType('cookieSettings').documentId('cookieSettings'))
	.icon(TbCookie);

// Promo Bar Settings Menu
const promoBarSettingsMenu = S.listItem()
	.title('Promo Bar')
	.child(S.editor().id('promoSettings').schemaType('promoSettings').documentId('promoSettings'))
	.icon(BsFlag);

// Default SEO Settings Menu
const defaultSeoSettingsMenu = S.listItem()
	.title('Default SEO / Share')
	.child(S.editor().id('seoSettings').schemaType('seoSettings').documentId('seoSettings'))
	.icon(BsGlobe);

// Social Profiles Settings Menu
const socialProfilesSettingsMenu = S.listItem()
	.title('Social Profiles')
	.child(S.editor().id('socialSettings').schemaType('socialSettings').documentId('socialSettings'))
	.icon(AiOutlineUsergroupAdd);

// Settings Menu
export const settingsMenu = S.listItem()
	.title('Settings')
	.id('settings')
	.child(
		S.list()
			.title('Settings')
			.items([
				generalSettingsMenu,
				S.divider(),
				cookieConsentSettingsMenu,
				promoBarSettingsMenu,
				S.divider(),
				defaultSeoSettingsMenu,
				socialProfilesSettingsMenu,
			])
	)
	.icon(BsGear);

export default settingsMenu;
