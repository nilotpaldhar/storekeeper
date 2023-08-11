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
		'brand',
		'account',
		'product',
		'category',
		'homepage',
		'loginpage',
		'errorpage',
		'searchpage',
		'seoSettings',
		'productColor',
		'promoSettings',
		'headerSettings',
		'footerSettings',
		'cookieSettings',
		'socialSettings',
		'generalSettings',
		'verificationToken',
	].includes(listItem.getId());

const deskStructure = (S) =>
	S.list()
		.title('Website')
		.items([
			pages(S),
			S.divider(),
			shop(S),
			S.divider(),
			users(S),
			S.divider(),
			menus(S),
			S.divider(),
			settings(S),
			S.divider(),

			// Filter out docs already defined above
			...S.documentTypeListItems().filter(hiddenDocTypes),
		]);

export default deskStructure;
