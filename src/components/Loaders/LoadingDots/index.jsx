import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

/**
 * Render the LoadingDots component.
 *
 * @return {Element} The LoadingDots component.
 */
const LoadingDots = ({ width, height, radius, color }) => (
	<ThreeDots width={width} height={height} radius={radius} color={color} ariaLabel="loading" />
);

/**
 * Default Props.
 */
LoadingDots.defaultProps = {
	width: '40',
	height: '40',
	radius: '10',
	color: '#0059B3',
};

/**
 * Prop Types.
 */
LoadingDots.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	radius: PropTypes.string,
	color: PropTypes.string,
};

export default LoadingDots;
