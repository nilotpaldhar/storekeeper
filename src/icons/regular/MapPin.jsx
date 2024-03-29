import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiMapPin } from 'react-icons/fi';

/**
 * Render the MapPin icon.
 *
 * @return {Element} The MapPin icon.
 */
const MapPin = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<FiMapPin />
	</span>
);

/**
 * Default Props.
 */
MapPin.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
MapPin.propTypes = {
	className: PropTypes.string,
};

export default MapPin;
