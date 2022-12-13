import PropTypes from 'prop-types';
import styles from '@ui/general/Container/styles.cva';

/**
 * Render the Container component.
 *
 * @return {Element} The Container component.
 */
const Container = ({ children, fluid, className, ...props }) => (
	<div className={styles({ fluid, className })} {...props}>
		{children}
	</div>
);

/**
 * Default Props.
 */
Container.defaultProps = {
	children: '',
	fluid: false,
	className: '',
};

/**
 * Prop Types.
 */
Container.propTypes = {
	children: PropTypes.node,
	fluid: PropTypes.bool,
	className: PropTypes.string,
};

export default Container;
