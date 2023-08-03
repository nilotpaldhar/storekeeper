import algoliasearch from 'algoliasearch';
import getSanityClient from '@config/sanity';
import { groq } from 'next-sanity';
import AlgoliaSyncQuery from '@libs/queries/AlgoliaSync';
import { ALGOLIA_PRODUCT_INDEX } from '@constants';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Initialize sanity client. */
const sanity = getSanityClient({ useCdn: false, useToken: true });

/** Initialize algolia search instance. */
const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	process.env.ALGOLIA_ADMIN_KEY
);

const handler = async (req, res) => {
	const supportedMethods = ['GET'];
	const secretToken = req.query?.token;

	const query = groq`*[ _type == "product" && isActive == true  && !(_id in path('drafts.**'))] {
		${AlgoliaSyncQuery}
	}`;

	return validateReqMethod(req, res, supportedMethods, async () => {
		/**
		 * Basic security to prevent unauthorized users
		 * from hitting this API endpoint.
		 * */
		if (secretToken !== process.env.ALGOLIA_WEBHOOK_SECRET) {
			return res.status(401).json({ error: 'unauthorized' });
		}

		try {
			/** Saving algolia index with products data. */
			const products = await sanity.fetch(query);
			const productIndex = searchClient.initIndex(ALGOLIA_PRODUCT_INDEX);
			await productIndex.saveObjects(products);

			return res.status(200).json({
				success: true,
				message: 'Successfully synced products with algolia',
			});
		} catch (error) {
			const statusCode = error?.status || 500;
			const message = error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
