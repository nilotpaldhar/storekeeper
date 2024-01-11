import {
	checApiUrl,
	checApiVersion,
	checPublicApiKey,
	checConfig,
} from '@config/commerce/constants';

/** Using edge runtime */
export const config = { runtime: 'edge' };

const CHEC_HEADERS = {
	'X-Authorization': checPublicApiKey,
	'Content-Type': 'application/json',
	...checConfig.axiosConfig.headers,
};

const BASE_URL = `https://${checApiUrl}/${checApiVersion}`;

/** Captures an order with payment. */
const handler = async (req) => {
	const body = await req.json();
	const reqMethod = req?.method;

	/** Checkout Token ID & Order Payload. */
	const tokenId = body?.id;
	const payload = body?.payload;

	/** Validate request method. */
	if (reqMethod !== 'POST') {
		return new Response(
			JSON.stringify({
				method: reqMethod,
				error: 'The request method is not supported',
			}),
			{
				status: '405',
				headers: { 'content-type': 'application/json' },
			}
		);
	}

	if (!tokenId || !payload) {
		return new Response(
			JSON.stringify({
				error: 'The given data was invalid.',
			}),
			{
				status: '422',
				headers: { 'content-type': 'application/json' },
			}
		);
	}

	try {
		const res = await fetch(`${BASE_URL}/checkouts/${tokenId}`, {
			method: 'POST',
			headers: CHEC_HEADERS,
			body: JSON.stringify({ ...payload }),
		});

		const data = await res.json();

		if (!res.ok) {
			const status = data?.status_code || 500;
			const message = data?.error?.message || 'Something went wrong';

			return new Response(JSON.stringify({ error: message }), {
				status,
				headers: { 'content-type': 'application/json' },
			});
		}

		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	} catch (error) {
		const message =
			'There seems to be a problem with the server at the moment. Please try again later';

		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { 'content-type': 'application/json' },
		});
	}
};

export default handler;
