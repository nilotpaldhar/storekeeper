import S from '@sanity/desk-tool/structure-builder';
import shop from './desk/shop';
import menus from './desk/menus';
import settings from './desk/settings';

const hiddenDocTypes = (listItem) =>
	![
		'product',
		'category',
		'seoSettings',
		'promoSettings',
		'cookieSettings',
		'socialSettings',
		'generalSettings',
	].includes(listItem.getId());

const deskStructure = () =>
	S.list()
		.title('Website')
		.items([
			shop,
			S.divider(),
			menus,
			S.divider(),
			settings,
			S.divider(),

			// Filter out docs already defined above
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export default deskStructure;
