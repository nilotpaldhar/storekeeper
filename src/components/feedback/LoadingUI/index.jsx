import PropTypes from 'prop-types';
import LoadingDots from '@ui/Loaders/LoadingDots';

/**
 * Render the LoadingUI component.
 *
 * @return {Element} The LoadingUI component.
 */
const LoadingUI = ({ loading, height, children, ...props }) => (
	<div aria-busy={loading} {...props}>
		{loading ? (
			<div
				className="flex items-center justify-center animate-fade-in"
				style={{ height: height ? `${height}px` : '80vh' }}
			>
				<LoadingDots />
			</div>
		) : (
			children
		)}
	</div>
);

/**
 * Default Props.
 */
LoadingUI.defaultProps = {
	loading: false,
	height: null,
	children: '',
};

/**
 * Prop Types.
 */
LoadingUI.propTypes = {
	loading: PropTypes.bool,
	height: PropTypes.number,
	children: PropTypes.node,
};

export default LoadingUI;
