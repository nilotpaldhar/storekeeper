import PropTypes from 'prop-types';
import clsx from 'clsx';
import { TbTruckDelivery } from 'react-icons/tb';

/**
 * Render the TruckDelivery icon.
 *
 * @return {Element} The TruckDelivery icon.
 */
const TruckDelivery = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<TbTruckDelivery />
	</span>
);

/**
 * Default Props.
 */
TruckDelivery.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
TruckDelivery.propTypes = {
	className: PropTypes.string,
};

export default TruckDelivery;
