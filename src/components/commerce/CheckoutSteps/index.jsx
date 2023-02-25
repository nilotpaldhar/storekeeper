import PropTypes from 'prop-types';
import { CHECKOUT_STEPS } from '@constants';
import { useDispatch, useSelector } from 'react-redux';
import { nextStep, prevStep, fillOrder } from '@store/slices/checkout';
import { placeOrder } from '@store/slices/checkout/checkout.thunks';
import { selectCheckoutActiveStep } from '@store/slices/checkout/checkout.selectors';

/** Components. */
import Stepper from '@ui/navigation/Stepper';
import Accordion from '@ui/data-display/Accordion';

/** Checkout steps components. */
import CheckoutStepOne from '@ui/commerce/CheckoutSteps/CheckoutStepOne';
import CheckoutStepTwo from '@ui/commerce/CheckoutSteps/CheckoutStepTwo';
import CheckoutStepThree from '@ui/commerce/CheckoutSteps/CheckoutStepThree';
import CheckoutStepFour from '@ui/commerce/CheckoutSteps/CheckoutStepFour';

/**
 * Render the CheckoutSteps component.
 *
 * @return {Element} The CheckoutSteps component.
 */
const CheckoutSteps = ({ tokenId }) => {
	const dispatch = useDispatch();
	const activeStep = useSelector(selectCheckoutActiveStep);
	const forms = [CheckoutStepOne, CheckoutStepTwo, CheckoutStepThree, CheckoutStepFour];

	/** Checkout steps. */
	const steps = CHECKOUT_STEPS.map((step, idx) => ({
		label: step?.description,
		StepForm: forms[idx],
		...step,
	}));

	/** Progress checkout steps & place order. */
	const handleSubmit = (data) => {
		const lastStepID = CHECKOUT_STEPS[CHECKOUT_STEPS.length - 1].id;
		const lastStep = activeStep?.id === lastStepID;

		dispatch(fillOrder(data));
		if (lastStep) dispatch(placeOrder());
		if (!lastStep) dispatch(nextStep());
	};

	return (
		<div>
			<Stepper active={activeStep?.sn} steps={steps} />
			<div className="mt-10 lg:mt-14">
				<Accordion value={activeStep?.sn}>
					{steps?.map(({ id, sn, label, StepForm }) => (
						<Accordion.Item key={id} value={sn} disabled={activeStep?.id !== id}>
							<Accordion.Label>
								<div className="flex items-center space-x-1">
									<span>{sn}.</span>
									<span>{label}</span>
								</div>
							</Accordion.Label>
							<Accordion.Content>
								<StepForm
									tokenId={tokenId}
									onSubmit={handleSubmit}
									onBack={() => dispatch(prevStep())}
								/>
							</Accordion.Content>
						</Accordion.Item>
					))}
				</Accordion>
			</div>
		</div>
	);
};

/**
 * Prop Types.
 */
CheckoutSteps.defaultProps = {
	tokenId: null,
};
/**
 * Prop Types.
 */
CheckoutSteps.propTypes = {
	tokenId: PropTypes.string,
};

export default CheckoutSteps;
