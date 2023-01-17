import PropTypes from 'prop-types';

/** Component Styles. */
import styles, { textStyles } from '@ui/data-display/Divider/styles.cva';

/**
 * Render the Divider component.
 *
 * @return {Element} The Divider component.
 */
const Divider = ({ type, textAlign, className, children, ...props }) => (
	<div className={styles({ className, type, textAlign })} role="separator" {...props}>
		{children && <span className={textStyles({ textAlign })}>{children}</span>}
	</div>
);

/**
 * Default Props.
 */
Divider.defaultProps = {
	children: '',
	className: '',
	type: 'dashed',
	textAlign: 'center',
};

/**
 * Prop Types.
 */
Divider.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['dashed', 'solid', 'dotted']),
	textAlign: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Divider;
