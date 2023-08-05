import indexer from 'sanity-algolia';
import algoliasearch from 'algoliasearch';
import getSanityClient from '@config/sanity';
import AlgoliaSyncQuery from '@libs/queries/AlgoliaSync';
import { ALGOLIA_INDEX } from '@constants';
import validateReqMethod from '@utils/api/validateReqMethod';

/** Initialize sanity client. */
const sanity = getSanityClient({ useCdn: false, useToken: true });

/** Initialize algolia search instance. */
const searchClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
	process.env.ALGOLIA_ADMIN_KEY
);

const handler = async (req, res) => {
	const supportedMethods = ['POST'];
	const secretToken = req.query?.token;

	return validateReqMethod(req, res, supportedMethods, async () => {
		/**
		 * Basic security to prevent unauthorized users
		 * from hitting this API endpoint.
		 * */
		if (secretToken !== process.env.SANITY_WEBHOOK_SECRET) {
			return res.status(401).json({ error: 'unauthorized' });
		}

		const productIndex = searchClient.initIndex(ALGOLIA_INDEX.product);
		const sanityAlgolia = indexer(
			{
				product: {
					index: productIndex,
					/**
					 * The projection is the piece of the GROQ query
					 * where we determine what data to fetch
					 */
					projection: `{${AlgoliaSyncQuery}}`,
				},
			},

			/** Serializer function for manipulating documents. */
			(document) => document,

			/** Visibility function to determine which document should be included. */
			(document) => {
				// eslint-disable-next-line no-prototype-builtins
				if (document.hasOwnProperty('isActive')) {
					return document.isActive;
				}
				return true;
			}
		);

		try {
			await sanityAlgolia.webhookSync(sanity, req.body);

			return res.status(200).json({
				success: true,
				message: 'Successfully synced changes with algolia',
			});
		} catch (error) {
			const statusCode = error?.status || 500;
			const message = error?.message || 'Something went wrong';
			return res.status(statusCode).json({ error: message });
		}
	});
};

export default handler;
