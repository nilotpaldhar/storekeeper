import PropTypes from 'prop-types';

/** Components. */
import Alert from '@ui/feedback/Alert';
import Radio from '@ui/data-entry/Radio';
import BlockUI from '@ui/feedback/BlockUI';
import LoadingUI from '@ui/feedback/LoadingUI';
import RegularButton from '@ui/buttons/RegularButton';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

/** Hooks. */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import { fillCheckoutContents } from '@store/slices/checkout';
import { selectCheckoutOrder } from '@store/slices/checkout/checkout.selectors';
import { fetchShippingOptions, addShippingOption } from '@libs/commerce/checkout/helpers';

/**
 * Render the CheckoutStepThree component.
 *
 * @return {Element} The CheckoutStepThree component.
 */
const CheckoutStepThree = ({ tokenId, onSubmit, onBack }) => {
	const dispatch = useDispatch();
	const order = useSelector(selectCheckoutOrder);

	const [options, setOptions] = useState([]);
	const [shippingId, setShippingId] = useState('');
	const [loading, setLoading] = useState(false);
	const [block, setBlock] = useState(false);
	const [errMsg, setErrMsg] = useState(null);

	const emptyOptions = options?.length === 0;
	const shippingCountry = order?.address?.shipping?.country;
	const shippingRegion = order?.address?.shipping?.region;

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		setBlock(true);
		setErrMsg(null);

		try {
			const contents = await addShippingOption(tokenId, {
				shippingId,
				region: shippingRegion,
				country: shippingCountry,
			});
			dispatch(fillCheckoutContents(contents));
			onSubmit({ shippingMethod: shippingId });
		} catch (error) {
			setErrMsg(error?.response?.data?.error);
			setBlock(false);
		}
	};

	/** Fetch shipping options. */
	useEffect(() => {
		if (emptyOptions && shippingCountry && shippingRegion) {
			setLoading(true);
			(async () => {
				const shipOptions = await fetchShippingOptions(tokenId, shippingCountry, shippingRegion);
				setOptions(shipOptions);
				setShippingId(shipOptions[0]?.id);
				setLoading(false);
			})();
		}
	}, [tokenId, emptyOptions, shippingCountry, shippingRegion]);

	return (
		<div>
			<LoadingUI loading={loading} height={200}>
				<BlockUI blocking={block}>
					{errMsg && (
						<Alert type="error" align="center" className="mb-6">
							{errMsg}
						</Alert>
					)}
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col space-y-6">
							<Radio
								name="shipping"
								orientation="vertical"
								className="!max-w-xs !space-y-6"
								value={shippingId}
								onValueChange={setShippingId}
							>
								{options?.map((option) => (
									<Radio.Item
										key={option?.id}
										id={option?.id}
										value={option?.id}
										label={
											<>
												<span>{option?.label}</span>
												<span>{option?.price}</span>
											</>
										}
										labelClassName="flex-1 flex items-center justify-between"
									/>
								))}
							</Radio>
							<div className="flex items-center space-x-2">
								<RegularButton
									type="button"
									intent="light"
									onClick={onBack}
									className="shrink-0"
									startIcon={ArrowLeftIcon}
								>
									Go Back
								</RegularButton>
								<RegularButton type="submit" className="w-full sm:max-w-max sm:px-10">
									Continue
								</RegularButton>
							</div>
						</div>
					</form>
				</BlockUI>
			</LoadingUI>
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutStepThree.defaultProps = {
	tokenId: null,
	onSubmit: () => {},
	onBack: () => {},
};

/**
 * Prop Types.
 */
CheckoutStepThree.propTypes = {
	tokenId: PropTypes.string,
	onSubmit: PropTypes.func,
	onBack: PropTypes.func,
};

export default CheckoutStepThree;
