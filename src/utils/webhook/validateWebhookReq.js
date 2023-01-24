import { verifyWebhook } from '@chec/webhook-verifier';

/** Validates webhook request. */
const validateWebhookReq = (
	req,
	res,
	{ supportedMethods = [], supportedEvents = [] } = {},
	callback = () => {}
) => {
	const reqEvent = req?.body?.event;
	const reqMethod = req?.method;

	/** Check if the request is a POST, PUT, DELETE request. */
	if (!supportedMethods.includes(reqMethod)) {
		return res.status(400).json({
			method: reqMethod,
			error: 'The request method is not supported',
		});
	}

	/** Ensure that the webhook events are supported. */
	if (!['test.webhook', ...supportedEvents].includes(reqEvent)) {
		return res.status(422).json({
			method: reqMethod,
			error: 'The provided webhook event is not supported',
		});
	}

	/** Verify webhook authenticity. */
	try {
		verifyWebhook(req?.body, process.env.CHEC_WEBHOOK_SIGNING_KEY);
	} catch (error) {
		return res.status(500).json({
			method: reqMethod,
			error: 'Failed to verify webhook signature in payload',
		});
	}

	/** Handle test webhook events. */
	if (reqEvent === 'test.webhook') {
		return res.status(200).json({
			success: true,
			message: 'Test webhook event received',
		});
	}

	return callback({ method: reqMethod, event: reqEvent });
};

export default validateWebhookReq;
