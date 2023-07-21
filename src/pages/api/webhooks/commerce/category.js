import { nanoid } from 'nanoid';
import getSanityClient from '@config/sanity';
import validateWebhookReq from '@utils/webhook/validateWebhookReq';

/** Initialize sanity client. */
const sanity = getSanityClient({ useCdn: false, useToken: true });

/** Map children. */
const mapChildren = (child) => ({
	_key: nanoid(),
	id: child?.id,
	title: child?.name,
	slug: child?.slug,
});

/** Map assets. */
const mapAsset = (asset) => ({
	_key: nanoid(),
	_type: 'asset',
	id: asset?.id,
	url: asset?.url,
	width: asset?.image_dimensions?.width ?? 0,
	height: asset?.image_dimensions?.height ?? 0,
	isImage: asset?.is_image,
	filename: asset?.filename,
	fileSize: asset?.file_size,
	description: asset?.description ?? '',
	fileExtension: asset?.file_extension,
});

/** Map breadcrumbs. */
const mapBreadcrumbs = ({ id, permalink, name } = {}) => ({
	id,
	permalink,
	title: name,
	_key: nanoid(),
	_type: 'breadcrumb',
});

const handler = async (req, res) => {
	/** Supported methods & events. */
	const options = {
		supportedMethods: ['POST', 'PUT', 'DELETE'],
		supportedEvents: ['categories.create', 'categories.update', 'categories.delete'],
	};

	return validateWebhookReq(req, res, options, async ({ event: reqEvent }) => {
		/** Initiate sanity transaction to perform the following chained mutations. */
		let sanityTransaction = sanity.transaction();

		/** Handle event: "categories.delete". */
		if (reqEvent === 'categories.delete' && req.body?.model_ids?.length > 0) {
			sanityTransaction.delete(`category-${req.body?.model_ids[0]}`);
			const result = await sanityTransaction.commit();

			return res.status(200).json({
				success: true,
				data: result,
				message: 'Category webhook delete event received',
			});
		}

		/** Handle events: "categories.create" | "categories.update". */
		const categoryPayload = req.body?.payload;

		/* ----------------------------------------------- */
		/* Construct category and category fields object
    /* ----------------------------------------------- */
		const modelId = `category-${categoryPayload?.id}`;
		const assets = categoryPayload?.assets?.map(mapAsset);
		const children = categoryPayload?.children?.map(mapChildren);
		const breadcrumbs = categoryPayload?.breadcrumbs?.map(mapBreadcrumbs);

		const category = { _id: modelId, _type: 'category' };
		const categoryFields = {
			assets,
			children,
			breadcrumbs,
			slug: categoryPayload?.slug,
			title: categoryPayload?.name,
			categoryID: categoryPayload?.id,
			parentID: categoryPayload?.parent_id || '',
			description: categoryPayload?.description || '',
		};

		/* ------------------------------ */
		/* Begin Sanity category sync
    /* ------------------------------ */
		sanityTransaction = sanityTransaction.createIfNotExists(category);

		/** Unset assets field, to avoid patch set issues. */
		sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.unset(['assets']));

		/** Patch (update) category document with core commerce data. */
		sanityTransaction = sanityTransaction.patch(modelId, (patch) => patch.set(categoryFields));

		const result = await sanityTransaction.commit();

		return res.status(200).json({
			success: true,
			data: result,
			message: 'Category webhook event received',
		});
	});
};

export default handler;
