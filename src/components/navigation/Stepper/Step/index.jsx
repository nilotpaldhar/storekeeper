import PropTypes from 'prop-types';
import CheckIcon from '@icons/regular/Check';
import styles, {
	contentStyles,
	iconStyles,
	labelStyles,
	lineStyles,
} from '@ui/navigation/Stepper/Step/styles.cva';

/**
 * Render the Step component.
 *
 * @return {Element} The Step component.
 */
const Step = ({ step, status, lastStep, label, className, ...props }) => (
	<li className={styles({ className, lastStep })} {...props}>
		<div className={contentStyles()}>
			<div className={iconStyles({ status })}>
				{status === 'finish' ? <CheckIcon className="!text-xs" /> : <span>{step}</span>}
			</div>
			<div className={labelStyles({ status })}>{label}</div>
		</div>
		<span className={lineStyles({ lastStep, status })} />
	</li>
);

/**
 * Default Props.
 */
Step.defaultProps = {
	step: null,
	status: 'wait',
	lastStep: false,
	label: '',
	className: '',
};

/**
 * Prop Types.
 */
Step.propTypes = {
	step: PropTypes.number,
	status: PropTypes.oneOf(['finish', 'process', 'wait']),
	lastStep: PropTypes.bool,
	label: PropTypes.node,
	className: PropTypes.string,
};

export default Step;
