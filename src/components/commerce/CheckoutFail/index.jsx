import PropTypes from 'prop-types';

import Empty from '@ui/feedback/Empty';
import Container from '@ui/general/Container';
import RegularButton from '@ui/buttons/RegularButton';

import ReloadIcon from '@icons/regular/Reload';
import orderFailImg from '@public/order-fail.svg';

/**
 * Render the CheckoutFail component.
 *
 * @return {Element} The CheckoutFail component.
 */
const CheckoutFail = ({ title, description, defaultError, ...props }) => (
	<div className="min-h-[80vh] flex items-center justify-center" {...props}>
		<Container>
			<Empty
				imgSrc={orderFailImg}
				imgProps={{ alt: 'fail', width: 200, height: 200 }}
				title={defaultError ? 'Oh no, payment failed!' : title}
				description={
					defaultError ? (
						<div>
							<span className="font-semibold mr-1">Don&quot;t worry your money is safe!</span>
							<span>
								If any money was deducted from your account, it will be refunded automatically.
							</span>
						</div>
					) : (
						description
					)
				}
			>
				<RegularButton as="anchor" href="/cart" startIcon={ReloadIcon} className="px-8">
					Try Again
				</RegularButton>
			</Empty>
		</Container>
	</div>
);

/**
 * Default Props.
 */
CheckoutFail.defaultProps = {
	title: '',
	description: '',
	defaultError: false,
};

/**
 * Prop Types.
 */
CheckoutFail.propTypes = {
	title: PropTypes.node,
	description: PropTypes.node,
	defaultError: PropTypes.bool,
};

export default CheckoutFail;
