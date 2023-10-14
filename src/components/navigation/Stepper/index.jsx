import PropTypes from 'prop-types';
import Step from '@ui/navigation/Stepper/Step';
import { clsx } from 'clsx';

/**
 * Render the Stepper component.
 *
 * @return {Element} The Stepper component.
 */
const Stepper = ({ as: Component, steps, className, ...props }) => (
	<Component className={clsx('flex items-center space-x-3 max-w-max', className)} {...props}>
		{steps?.map((step, index) => (
			<Step key={step?.id} lastStep={index === steps.length - 1} {...step} />
		))}
	</Component>
);

/**
 * Default Props.
 */
Stepper.defaultProps = {
	as: 'ol',
	steps: [],
	className: '',
};

/**
 * Prop Types.
 */
Stepper.propTypes = {
	as: PropTypes.oneOf(['ol', 'ul']),
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.node,
			active: PropTypes.bool,
			disabled: PropTypes.bool,
			onChange: PropTypes.func,
		})
	),
	className: PropTypes.string,
};

export default Stepper;
