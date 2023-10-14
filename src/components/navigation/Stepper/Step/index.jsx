import PropTypes from 'prop-types';
import styles, { btnStyles } from './styles.cva';

/**
 * Render the Step component.
 *
 * @return {Element} The Step component.
 */
const Step = ({ label, active, lastStep, disabled, onChange, className, ...props }) => (
	<li className={styles({ lastStep, className })} {...props}>
		<button
			type="button"
			className={btnStyles({ active, disabled })}
			onClick={onChange}
			disabled={disabled}
		>
			{label}
		</button>
	</li>
);

/**
 * Default Props.
 */
Step.defaultProps = {
	label: '',
	active: false,
	lastStep: false,
	disabled: false,
	onChange: () => {},
	className: '',
};

/**
 * Prop Types.
 */
Step.propTypes = {
	label: PropTypes.node,
	active: PropTypes.bool,
	lastStep: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	className: PropTypes.string,
};

export default Step;
