import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { PAYMENT_GATEWAYS } from '@constants';

import Payment from './Payment';
import Billing from './Billing';

/**
 * Render the FillPaymentDetails component.
 *
 * @return {Element} The FillPaymentDetails component.
 */
const FillPaymentDetails = ({ onSubmit }) => {
	const [showPayment, setShowPayment] = useState(true);
	const [activeGateway, setActiveGateway] = useState(PAYMENT_GATEWAYS[0].id);

	const handleBillingChange = useCallback(({ preview, shippingAsBilling }) => {
		setShowPayment(preview || shippingAsBilling);
	}, []);

	return (
		<div className="min-h-[400px]">
			<Billing onChange={handleBillingChange} />
			{showPayment && (
				<div className="mt-8">
					<Payment
						activeGateway={activeGateway}
						onGatewayChange={setActiveGateway}
						onComplete={onSubmit}
					/>
				</div>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
FillPaymentDetails.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
FillPaymentDetails.propTypes = {
	onSubmit: PropTypes.func,
};

export default FillPaymentDetails;
