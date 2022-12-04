import S from '@sanity/desk-tool/structure-builder';
import shop from './desk/shop';
import pages from './desk/pages';
import menus from './desk/menus';
import settings from './desk/settings';

const hiddenDocTypes = (listItem) =>
	![
		'page',
		'menu',
		'product',
		'category',
		'homepage',
		'shoppage',
		'errorpage',
		'seoSettings',
		'promoSettings',
		'headerSettings',
		'footerSettings',
		'cookieSettings',
		'socialSettings',
		'generalSettings',
	].includes(listItem.getId());

const deskStructure = () =>
	S.list()
		.title('Website')
		.items([
			pages,
			S.divider(),
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
