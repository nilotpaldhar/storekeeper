import PropTypes from 'prop-types';
import { HTTP_STATUS } from '@constants';

/** Components. */
import BlockUI from '@ui/feedback/BlockUI';
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';

/** Hooks. */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user/user.selectors';
import { selectCheckoutOrder } from '@store/slices/checkout/checkout.selectors';

/**
 * Render the CheckoutStepOne component.
 *
 * @return {Element} The CheckoutStepOne component.
 */
const CheckoutStepOne = ({ onSubmit }) => {
	const user = useSelector(selectUser);
	const order = useSelector(selectCheckoutOrder);
	const customerFields = order?.customer;

	const { status, authStatus, about } = user || {};
	const authenticated = authStatus === 'authenticated';
	const loading = status === HTTP_STATUS.pending;

	/** User details. */
	const userEmail = authenticated ? about?.email : null;
	const userFirstname = authenticated ? about?.firstname : null;
	const userLastname = authenticated ? about?.lastname : null;
	const userPhone = authenticated ? about?.phone : null;

	/** Form fields. */
	const [firstname, setFirstname] = useState(customerFields?.firstname || userFirstname || '');
	const [lastname, setLastname] = useState(customerFields?.lastname || userLastname || '');
	const [email, setEmail] = useState(customerFields?.email || userEmail || '');
	const [phone, setPhone] = useState(customerFields?.phone || userPhone || '');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSubmit({ customer: { firstname, lastname, email: userEmail || email, phone } });
	};

	return (
		<div>
			<BlockUI blocking={loading}>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col space-y-6">
						<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
							<TextField
								required
								type="text"
								id="firstname"
								label="First Name"
								value={firstname}
								onChange={(evt) => setFirstname(evt.target.value)}
							/>
							<TextField
								required
								type="text"
								id="lastname"
								label="Last Name"
								value={lastname}
								onChange={(evt) => setLastname(evt.target.value)}
							/>
						</div>
						<TextField
							required
							id="email"
							type="email"
							label="Email"
							value={email}
							readOnly={authenticated}
							onChange={(evt) => setEmail(evt.target.value)}
						/>
						<TextField
							required
							id="phone"
							type="text"
							label="Phone"
							value={phone}
							onChange={(evt) => setPhone(evt.target.value)}
						/>
						<RegularButton type="submit" className="px-10 max-w-max">
							Continue
						</RegularButton>
					</div>
				</form>
			</BlockUI>
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutStepOne.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
CheckoutStepOne.propTypes = {
	onSubmit: PropTypes.func,
};

export default CheckoutStepOne;
