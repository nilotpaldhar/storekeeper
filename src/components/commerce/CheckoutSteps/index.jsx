import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { goTo } from '@store/slices/checkoutSteps';

/** Components */
import FillAddress from '@ui/commerce/CheckoutSteps/FillAddress';
import FillUserDetails from '@ui/commerce/CheckoutSteps/FillUserDetails';
import FillPaymentDetails from '@ui/commerce/CheckoutSteps/FillPaymentDetails';
import FillDeliveryOptions from '@ui/commerce/CheckoutSteps/FillDeliveryOptions';
import CheckoutStepsWrapper from '@ui/commerce/CheckoutSteps/CheckoutStepsWrapper';

/**
 * Render the CheckoutSteps component.
 *
 * @return {Element} The CheckoutSteps component.
 */
const CheckoutSteps = ({ steps, activeStep, onSubmit }) => {
	const dispatch = useDispatch();

	const stepComponents = [FillUserDetails, FillAddress, FillDeliveryOptions, FillPaymentDetails];
	const stepsWithComp = steps.map((step, index) => ({
		stepComponent: stepComponents[index],
		...step,
	}));

	return (
		<div className="flex flex-col space-y-5">
			{stepsWithComp.map(({ id, description, completed, stepComponent: StepComponent }, index) => (
				<CheckoutStepsWrapper
					key={id}
					title={description}
					open={id === activeStep.id || completed}
					disabled={id === activeStep.id || !completed}
					onOpenChange={() => dispatch(goTo(index))}
				>
					<StepComponent onSubmit={onSubmit} completed={id !== activeStep.id && completed} />
				</CheckoutStepsWrapper>
			))}
		</div>
	);
};

/**
 * Default Props.
 */
CheckoutSteps.defaultProps = {
	steps: [],
	activeStep: {},
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
CheckoutSteps.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			description: PropTypes.string,
			completed: PropTypes.bool,
		})
	),
	activeStep: PropTypes.shape({
		id: PropTypes.string,
		description: PropTypes.string,
		completed: PropTypes.bool,
	}),
	onSubmit: PropTypes.func,
};

export default CheckoutSteps;
