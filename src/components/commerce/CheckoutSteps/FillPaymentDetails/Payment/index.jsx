import PropTypes from 'prop-types';
import { PAYMENT_GATEWAYS } from '@constants';

import Radio from '@ui/data-entry/Radio';
import * as PaymentGateways from '@ui/commerce/PaymentGateways';

/**
 * Render the Payment component.
 *
 * @return {Element} The Payment component.
 */
const Payment = ({ activeGateway, onGatewayChange, onComplete }) => {
	/** Maps payment gateway component */
	const mapPaymentGateway = (id = '') => {
		const PaymentGatewayMap = {
			test_gateway: PaymentGateways.TestGateway,
			stripe: PaymentGateways.PlaceHolder,
			upi: PaymentGateways.PlaceHolder,
			net_banking: PaymentGateways.PlaceHolder,
		};

		if (id in PaymentGatewayMap) {
			return PaymentGatewayMap[id];
		}

		return null;
	};

	return (
		<Radio
			orientation="vertical"
			className="!max-w-full !space-y-8"
			value={activeGateway}
			onValueChange={onGatewayChange}
		>
			{PAYMENT_GATEWAYS.map(({ id, title, description }) => {
				const PaymentGateway = mapPaymentGateway(id);

				return (
					<Radio.Item
						key={id}
						id={id}
						value={id}
						labelClassName="flex-1"
						parentClassName="!items-start"
						label={
							<div className="flex flex-col space-y-6">
								<div className="flex flex-col space-y-1">
									<span className="font-medium">{title}</span>
									<span className="text-xs font-light">{description}</span>
								</div>
								{id === activeGateway && PaymentGateway && (
									<PaymentGateway onComplete={onComplete} />
								)}
							</div>
						}
					/>
				);
			})}
		</Radio>
	);
};

/**
 * Default Props.
 */
Payment.defaultProps = {
	activeGateway: PAYMENT_GATEWAYS[0].id,
	onGatewayChange: () => {},
	onComplete: () => {},
};

/**
 * Prop Types.
 */
Payment.propTypes = {
	activeGateway: PropTypes.string,
	onGatewayChange: PropTypes.func,
	onComplete: PropTypes.func,
};

export default Payment;
