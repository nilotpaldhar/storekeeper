import { createClient } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

const config = {
	/**
	 * Find your project ID and dataset in `sanity.json` in your studio project.
	 * These are considered “public”, but you can use environment variables
	 * if you want differ between local dev and production.
	 *
	 * https://nextjs.org/docs/basic-features/environment-variables
	 **/
	dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET,
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-10-21',
	/**
	 * Set useCdn to `false` if your application require the freshest possible
	 * data always (potentially slightly slower and a bit more expensive).
	 * Authenticated request (like preview) will always bypass the CDN
	 **/
	useCdn: process.env.NODE_ENV === 'production',
	token: process.env.SANITY_API_TOKEN,
};

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

/** Helper function for easily switching between normal client and preview client. */
export const getClient = ({ useCdn = true }) => {
	config.useCdn = !!useCdn;

	if (!config.projectId) {
		throw Error('The Project ID is not set. Check your environment variables.');
	}

	if (!config.dataset) {
		throw Error('The dataset name is not set. Check your environment variables.');
	}

	return createClient(config);
};

export default getClient;
