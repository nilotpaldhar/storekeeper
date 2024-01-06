import { nanoid } from 'nanoid';
import { groq } from 'next-sanity';
import getSanityClient from '@config/sanity';
import { createSanityAsset } from '@libs/seeder/helpers';

import homepage from '@libs/seeder/data/homepage';

const sanityClient = getSanityClient({ useCdn: false, useToken: true });

const homepageSeeder = async () => {
	const modelId = `homepage`;
	let sanityTransaction = sanityClient.transaction();

	const mapDoc = ({ _id }) => ({
		_ref: _id,
		_key: nanoid(),
		_type: 'reference',
	});

	const categories = await sanityClient.fetch(
		groq`*[_type == "category" && count(children) > 0]{ _id, slug }`
	);
	const products = await sanityClient.fetch(groq`*[_type == "product"]{ _id, name }`);
	const specialOfferThumbnail = await createSanityAsset(homepage.specialOffer.thumbnail);
	const bannerCollection = await Promise.all(
		homepage.banners.map(async (banner) => {
			const [backdrop, thumbnail] = await Promise.all([
				createSanityAsset(banner.backdrop),
				createSanityAsset(banner.thumbnail),
			]);
			const category = categories?.find((c) => c?.slug === banner.category);

			return {
				_key: nanoid(),
				_type: 'banner',
				backdrop: {
					_type: 'image',
					asset: {
						_ref: backdrop,
						_type: 'reference',
					},
				},
				thumbnail: {
					_type: 'image',
					asset: {
						_ref: thumbnail,
						_type: 'reference',
					},
				},
				link: {
					resource: {
						// eslint-disable-next-line no-underscore-dangle
						_ref: category?._id,
						_type: 'reference',
					},
					text: 'Discover Now',
				},
				title: banner.title,
				description: banner.description,
				price: banner.price,
				contentAlignment: banner.contentAlignment,
			};
		})
	);

	const homepageFields = {
		title: 'Home',
		slug: '/',
		categories: {
			hidden: false,
			title: 'Shop By Categories',
			collection: categories?.map(mapDoc),
		},
		newProducts: {
			title: 'New Arrivals',
			hidden: false,
			products: products?.filter((p) => homepage.newProducts.includes(p?.name))?.map(mapDoc),
			_type: 'pageSection',
		},
		topRatedProducts: {
			title: 'Top Rated Products',
			hidden: false,
			products: products?.filter((p) => homepage.topRatedProducts.includes(p?.name))?.map(mapDoc),
			_type: 'pageSection',
		},
		featuredProducts: {
			hidden: false,
			products: products?.filter((p) => homepage.featuredProducts.includes(p?.name))?.map(mapDoc),
		},
		specialOffer: {
			hidden: false,
			title: homepage.specialOffer.title,
			description: homepage.specialOffer.description,
			date: homepage.specialOffer.date,
			price: homepage.specialOffer.price,
			product: mapDoc(products?.find((p) => p?.name === homepage.specialOffer.product)),
			thumbnail: {
				_type: 'image',
				asset: {
					_type: 'reference',
					_ref: specialOfferThumbnail,
				},
			},
			_type: 'specialOffer',
		},
		banners: {
			hidden: false,
			collection: bannerCollection,
		},
		offers: {
			hidden: true,
			collection: [],
		},
		seo: {
			_type: 'seo',
			...homepage.seo,
		},
	};

	sanityTransaction = sanityTransaction.createIfNotExists({ _id: modelId, _type: 'homepage' });
	sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.set(homepageFields));
	await sanityTransaction.commit();
};

export default homepageSeeder;
