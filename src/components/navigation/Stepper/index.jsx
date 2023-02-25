import PropTypes from 'prop-types';
import Step from '@ui/navigation/Stepper/Step';
import { clsx } from 'clsx';
import useControllableState from '@hooks/useControllableState';

/**
 * Render the Stepper component.
 *
 * @return {Element} The Stepper component.
 */
const Stepper = ({
	as: Component,
	steps,
	active: activeProp,
	defaultActive,
	className,
	...props
}) => {
	const [activeStep] = useControllableState({
		prop: activeProp,
		defaultProp: defaultActive,
	});

	/** Get step status. */
	const getStepStatus = (active, current) => {
		if (active === current) return 'process';
		if (active > current) return 'finish';
		return 'wait';
	};

	return (
		<Component
			className={clsx(
				'w-full flex flex-col md:flex-row md:items-center md:flex-wrap lg:flex-nowrap',
				className
			)}
			{...props}
		>
			{steps?.map((step, index) => (
				<Step
					key={step?.id}
					step={index + 1}
					label={step?.label}
					lastStep={index === steps.length - 1}
					status={getStepStatus(activeStep, index + 1)}
				/>
			))}
		</Component>
	);
};

/**
 * Default Props.
 */
Stepper.defaultProps = {
	as: 'ol',
	steps: [],
	active: undefined,
	defaultActive: undefined,
	className: '',
};

/**
 * Prop Types.
 */
Stepper.propTypes = {
	as: PropTypes.oneOf(['ol', 'ul']),
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.node,
		})
	),
	active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	defaultActive: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	className: PropTypes.string,
};

export default Stepper;
