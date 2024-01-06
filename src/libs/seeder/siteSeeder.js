import getSanityClient from '@config/sanity';
import { createSanityAsset } from '@libs/seeder/helpers';

import site from '@libs/seeder/data/site';
import menus from '@libs/seeder/data/menus';
import footer from '@libs/seeder/data/footer';

const sanityClient = getSanityClient({ useCdn: false, useToken: true });

const createMenus = async (menu = {}) => {
	let sanityTransaction = sanityClient.transaction();
	sanityTransaction = sanityTransaction.createIfNotExists({ _id: menu?.id, _type: 'menu' });
	sanityTransaction = sanityTransaction.patch(menu?.id, (patch) =>
		patch.set({ title: menu?.title, slug: menu?.slug, items: menu?.items })
	);
	await sanityTransaction.commit();
};

const siteSeeder = async () => {
	let sanityTransaction = sanityClient.transaction();

	// General Settings
	const siteLogo = await createSanityAsset(site.general.siteLogo);
	const generalFields = {
		...site.general,
		siteLogo: {
			_type: 'image',
			asset: {
				_type: 'reference',
				_ref: siteLogo,
			},
		},
	};
	sanityTransaction = sanityTransaction.createIfNotExists({
		_id: 'generalSettings',
		_type: 'generalSettings',
	});
	sanityTransaction = sanityTransaction.patch('generalSettings', (patch) =>
		patch.set(generalFields)
	);

	// Header Settings
	await Promise.all([createMenus(menus.desktop), createMenus(menus.mobile)]);
	sanityTransaction = sanityTransaction.createIfNotExists({
		_id: 'headerSettings',
		_type: 'headerSettings',
	});
	sanityTransaction = sanityTransaction.patch('headerSettings', (patch) =>
		patch.set({
			menuDesktop: { _ref: menus.desktop.id, _type: 'reference' },
			menuMobile: { _ref: menus.mobile.id, _type: 'reference' },
		})
	);

	// Footer Settings
	sanityTransaction = sanityTransaction.createIfNotExists({
		_id: 'footerSettings',
		_type: 'footerSettings',
	});
	sanityTransaction = sanityTransaction.patch('footerSettings', (patch) =>
		patch.set({ ...footer })
	);

	// SEO Settings
	const [favicon, shareGraphic] = await Promise.all([
		createSanityAsset(site.seo.favicon),
		createSanityAsset(site.seo.shareGraphic),
	]);
	sanityTransaction = sanityTransaction.createIfNotExists({
		_id: 'seoSettings',
		_type: 'seoSettings',
	});
	sanityTransaction = sanityTransaction.patch('seoSettings', (patch) =>
		patch.set({
			...site.seo,
			favicon: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: favicon,
				},
			},
			shareGraphic: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: shareGraphic,
				},
			},
		})
	);

	// Social Profiles
	sanityTransaction = sanityTransaction.createIfNotExists({
		_id: 'socialSettings',
		_type: 'socialSettings',
	});
	sanityTransaction = sanityTransaction.patch('socialSettings', (patch) =>
		patch.set(site.socialProfiles)
	);

	await sanityTransaction.commit();
};

export default siteSeeder;
