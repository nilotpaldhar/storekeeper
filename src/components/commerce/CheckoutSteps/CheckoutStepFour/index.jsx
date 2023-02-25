import PropTypes from 'prop-types';
import { useState } from 'react';

/** Components. */
import Select from '@ui/data-entry/Select';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';
import ArrowLeftIcon from '@icons/regular/ArrowLeft';

import getExpiryMonths from '@utils/checkout/getExpiryMonths';
import getExpiryYears from '@utils/checkout/getExpiryYears';

/**
 * Render the CheckoutStepFour component.
 *
 * @return {Element} The CheckoutStepFour component.
 */
const CheckoutStepFour = ({ onSubmit, onBack }) => {
	const months = getExpiryMonths();
	const years = getExpiryYears(30);

	/** Form fields. */
	const [cardNum, setCardNum] = useState('');
	const [expiryMonth, setExpiryMonth] = useState(undefined);
	const [expiryYear, setExpiryYear] = useState(undefined);
	const [cvcNum, setCvcNum] = useState('');
	const [cardName, setCardName] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSubmit({
			payment: {
				number: cardNum,
				name: cardName,
				expiry_month: expiryMonth,
				expiry_year: expiryYear,
				cvc: cvcNum,
			},
		});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col space-y-6">
					<TextField
						required
						type="text"
						id="cardNum"
						label="Card Number"
						value={cardNum}
						onChange={(evt) => setCardNum(evt.target.value)}
					/>
					<div className="flex flex-col space-y-6 sm:space-y-0 sm:flex-row sm:space-x-5 sm:items-center">
						<div className="w-full">
							<Select
								required
								id="expiryMonth"
								placeholder="MM"
								label="Expiry Month"
								value={expiryMonth}
								onValueChange={setExpiryMonth}
							>
								{months?.map((m) => (
									<Select.Item key={m?.id} value={m?.twoDigit}>
										{`${m?.twoDigit} - ${m?.full}`}
									</Select.Item>
								))}
							</Select>
						</div>
						<div className="w-full">
							<Select
								required
								id="expiryYear"
								placeholder="YYYY"
								label="Expiry Year"
								value={expiryYear}
								onValueChange={setExpiryYear}
							>
								{years?.map((y) => (
									<Select.Item key={y?.id} value={y?.twoDigit}>
										{y?.full}
									</Select.Item>
								))}
							</Select>
						</div>
						<TextField
							required
							type="password"
							id="cvcNum"
							label="CVC"
							value={cvcNum}
							onChange={(evt) => setCvcNum(evt.target.value)}
						/>
					</div>
					<TextField
						required
						type="text"
						id="cardName"
						label="Card Holder Name"
						value={cardName}
						onChange={(evt) => setCardName(evt.target.value)}
					/>
					<div className="flex items-center space-x-2">
						<RegularButton
							onClick={onBack}
							type="button"
							intent="light"
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
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutStepFour.defaultProps = {
	onSubmit: () => {},
	onBack: () => {},
};

/**
 * Prop Types.
 */
CheckoutStepFour.propTypes = {
	onSubmit: PropTypes.func,
	onBack: PropTypes.func,
};

export default CheckoutStepFour;
