import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';

/**
 * Render the LoadingBars component.
 *
 * @return {Element} The LoadingBars component.
 */
const LoadingBars = ({ width, height, color }) => (
	<Bars width={width} height={height} color={color} ariaLabel="loading" />
);

/**
 * Default Props.
 */
LoadingBars.defaultProps = {
	width: '32',
	height: '32',
	color: '#0059B3',
};

/**
 * Prop Types.
 */
LoadingBars.propTypes = {
	width: PropTypes.string,
	height: PropTypes.string,
	color: PropTypes.string,
};

export default LoadingBars;
