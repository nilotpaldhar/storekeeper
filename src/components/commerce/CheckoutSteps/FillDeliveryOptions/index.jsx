import PropTypes from 'prop-types';

import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fillContents } from '@store/slices/checkout';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';
import { selectToken } from '@store/slices/checkout/checkout.selectors';

import { HTTP_STATUS } from '@constants';
import { fetchShippingOptions, addShippingOption } from '@libs/commerce/checkout/helpers';

import Alert from '@ui/feedback/Alert';
import Radio from '@ui/data-entry/Radio';
import LoadingUI from '@ui/feedback/LoadingUI';
import RegularButton from '@ui/buttons/RegularButton';

import DeliveryPreview from './Preview';

/**
 * Render the FillDeliveryOptions component.
 *
 * @return {Element} The FillDeliveryOptions component.
 */
const FillDeliveryOptions = ({ completed, onSubmit }) => {
	const dispatch = useDispatch();

	const tokenId = useSelector(selectToken);
	const shipping = useSelector(selectDetails)?.shipping;
	const selectedShippingId = useSelector(selectDetails)?.delivery?.id;

	const shippingRegion = shipping?.region;
	const shippingCountry = shipping?.country;

	const [options, setOptions] = useState([]);
	const [status, setStatus] = useState(HTTP_STATUS.idle);
	const [block, setBlock] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [shippingId, setShippingId] = useState(selectedShippingId ?? '');

	/** Fetch shipping options. */
	const fetchOptions = useCallback(async () => {
		setStatus(HTTP_STATUS.pending);
		setErrMsg(null);

		try {
			const shipOptions = await fetchShippingOptions(tokenId, shippingCountry, shippingRegion);
			setOptions(shipOptions);
			setStatus(HTTP_STATUS.succeeded);
		} catch (error) {
			setErrMsg(error?.response?.data?.error ?? 'Something went wrong');
			setStatus(HTTP_STATUS.failed);
		}
	}, [tokenId, shippingCountry, shippingRegion]);

	/** Submit handler. */
	const handleSubmit = async (evt) => {
		evt.preventDefault();

		setErrMsg(null);

		if (!shippingId) {
			setErrMsg('Delivery method is required');
			return;
		}

		try {
			setBlock(true);

			const contents = await addShippingOption(tokenId, {
				shippingId,
				region: shippingRegion,
				country: shippingCountry,
			});
			dispatch(fillContents(contents));
			onSubmit({ delivery: options.find((o) => o?.id === shippingId) });
		} catch (error) {
			setErrMsg(error?.response?.data?.error ?? 'Something went wrong');
		} finally {
			setBlock(false);
		}
	};

	useEffect(() => {
		if (status === HTTP_STATUS.idle) {
			fetchOptions();
		}
	}, [status, fetchOptions]);

	return (
		<div>
			{completed ? (
				<DeliveryPreview />
			) : (
				<LoadingUI loading={status === HTTP_STATUS.pending} height={150}>
					{errMsg && (
						<Alert type="error" className="mb-6">
							{errMsg}
						</Alert>
					)}
					<div>
						<form onSubmit={handleSubmit}>
							<Radio
								name="shipping"
								orientation="vertical"
								className="!max-w-full !space-y-4"
								value={shippingId}
								onValueChange={setShippingId}
							>
								{options?.map((option) => (
									<Radio.Item
										disabled={block}
										key={option?.id}
										id={option?.id}
										value={option?.id}
										label={
											<div className="flex-1 flex items-center justify-between text-sm font-normal">
												<span>{option?.label}</span>
												<span>{option?.price}</span>
											</div>
										}
										labelClassName="flex-1 flex items-center justify-between"
									/>
								))}
							</Radio>
							{shippingId && (
								<RegularButton type="submit" loading={block} fullWidth className="mt-4">
									Continue
								</RegularButton>
							)}
						</form>
					</div>
				</LoadingUI>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
FillDeliveryOptions.defaultProps = {
	completed: false,
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
FillDeliveryOptions.propTypes = {
	completed: PropTypes.bool,
	onSubmit: PropTypes.func,
};

export default FillDeliveryOptions;
