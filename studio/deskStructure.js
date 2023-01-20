import S from '@sanity/desk-tool/structure-builder';
import shop from './desk/shop';
import pages from './desk/pages';
import users from './desk/users';
import menus from './desk/menus';
import settings from './desk/settings';

const hiddenDocTypes = (listItem) =>
	![
		'page',
		'user',
		'menu',
		'account',
		'product',
		'category',
		'homepage',
		'shoppage',
		'loginpage',
		'errorpage',
		'seoSettings',
		'promoSettings',
		'headerSettings',
		'footerSettings',
		'cookieSettings',
		'socialSettings',
		'generalSettings',
		'verificationToken',
	].includes(listItem.getId());

const deskStructure = () =>
	S.list()
		.title('Website')
		.items([
			pages,
			S.divider(),
			shop,
			S.divider(),
			users,
			S.divider(),
			menus,
			S.divider(),
			settings,
			S.divider(),

			// Filter out docs already defined above
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export default deskStructure;
