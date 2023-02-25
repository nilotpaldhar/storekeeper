import PropTypes from 'prop-types';

/** Components. */
import Alert from '@ui/feedback/Alert';
import BlockUI from '@ui/feedback/BlockUI';
import Select from '@ui/data-entry/Select';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

/** Hooks. */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Functions. */
import {
	addTaxZone,
	fetchShippingRegions,
	fetchShippingCountries,
} from '@libs/commerce/checkout/helpers';
import { fillCheckoutContents } from '@store/slices/checkout';
import { selectCheckoutOrder } from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutStepTwo component.
 *
 * @return {Element} The CheckoutStepTwo component.
 */
const CheckoutStepTwo = ({ tokenId, onSubmit, onBack }) => {
	const dispatch = useDispatch();
	const order = useSelector(selectCheckoutOrder);
	const shippingFields = order?.address?.shipping;

	const [countries, setCountries] = useState([]);
	const [regions, setRegions] = useState([]);
	const [block, setBlock] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const emptyCountries = countries?.length === 0;

	/** Form fields. */
	const [fullname, setFullname] = useState(shippingFields?.name || '');
	const [street1, setStreet1] = useState(shippingFields?.street || '');
	const [street2, setStreet2] = useState(shippingFields?.street_2 || '');
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState(regions[0]?.code);
	const [city, setCity] = useState(shippingFields?.town_city || '');
	const [zip, setZip] = useState(shippingFields?.postal_zip_code || '');
	const [notes, setNotes] = useState(shippingFields?.delivery_instructions || '');

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		setBlock(true);
		setErrMsg(null);
		const fullAddress = {
			region,
			country,
			name: fullname,
			street: street1,
			town_city: city,
			street_2: street2,
			postal_zip_code: zip,
			county_state: `${country}-${region}`,
		};

		try {
			const contents = await addTaxZone(tokenId, { region, country, zip });
			dispatch(fillCheckoutContents(contents));
			onSubmit({
				address: {
					billing: fullAddress,
					shipping: { delivery_instructions: notes, ...fullAddress },
				},
			});
		} catch (error) {
			setErrMsg(error?.response?.data?.error);
			setBlock(false);
		}
	};

	/** Fetch shipping countries. */
	useEffect(() => {
		if (emptyCountries && !country) {
			setBlock(true);
			(async () => {
				const shipCountries = await fetchShippingCountries(tokenId);
				setCountries(shipCountries);
				setBlock(false);
			})();
		}
	}, [tokenId, emptyCountries, country]);

	/** Fetch shipping regions based on shipping country. */
	useEffect(() => {
		if (country) {
			setBlock(true);
			(async () => {
				const shipRegions = await fetchShippingRegions(tokenId, country);
				setRegions(shipRegions);
				setRegion(shipRegions[0]?.code);
				setBlock(false);
			})();
		}
	}, [tokenId, country]);

	return (
		<div>
			<BlockUI blocking={block}>
				{errMsg && (
					<Alert type="error" align="center" className="mb-6">
						{errMsg}
					</Alert>
				)}
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-6">
						<TextField
							required
							type="text"
							id="fullname"
							label="Full Name"
							value={fullname}
							onChange={(evt) => setFullname(evt.target.value)}
						/>
						<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
							<TextField
								required
								type="text"
								id="street1"
								label="Street"
								value={street1}
								onChange={(evt) => setStreet1(evt.target.value)}
							/>
							<TextField
								type="text"
								id="street2"
								label="Street Line 2"
								value={street2}
								onChange={(evt) => setStreet2(evt.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
							<div className="w-full">
								<Select required id="country" label="Country" onValueChange={setCountry}>
									{countries?.map((c) => (
										<Select.Item key={c?.code} value={c?.code}>
											{c?.name}
										</Select.Item>
									))}
								</Select>
							</div>
							<div className="w-full">
								<Select
									required
									id="region"
									label="State / Region"
									value={region}
									onValueChange={(val) => {
										if (val) setRegion(val);
									}}
								>
									{regions?.map((r) => (
										<Select.Item key={r?.code} value={r?.code}>
											{r?.name}
										</Select.Item>
									))}
								</Select>
							</div>
						</div>
						<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
							<TextField
								required
								id="city"
								type="text"
								label="City"
								value={city}
								onChange={(evt) => setCity(evt.target.value)}
							/>
							<TextField
								required
								id="zip"
								type="text"
								label="Postal / ZIP Code"
								value={zip}
								onChange={(evt) => setZip(evt.target.value)}
							/>
						</div>
						<TextField
							type="text"
							id="notes"
							label="Order Notes (optional)"
							value={notes}
							onChange={(evt) => setNotes(evt.target.value)}
						/>
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
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutStepTwo.defaultProps = {
	tokenId: null,
	onSubmit: () => {},
	onBack: () => {},
};

/**
 * Prop Types.
 */
CheckoutStepTwo.propTypes = {
	tokenId: PropTypes.string,
	onSubmit: PropTypes.func,
	onBack: PropTypes.func,
};

export default CheckoutStepTwo;
