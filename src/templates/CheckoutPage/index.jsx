import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { goTo, next, markAsComplete, fillDetails } from '@store/slices/checkoutSteps';
import { placeOrder } from '@store/slices/checkout/checkout.thunks';
import * as selectors from '@store/slices/checkoutSteps/checkoutSteps.selectors';

/** Components. */
import Container from '@ui/general/Container';
import LoadingUI from '@ui/feedback/LoadingUI';

const Stepper = dynamic(() => import('@ui/navigation/Stepper'));
const Disclaimer = dynamic(() => import('@templates/CheckoutPage/Disclaimer'));
const OrderRecap = dynamic(() => import('@ui/commerce/OrderRecap'), {
	loading: () => <LoadingUI loading />,
});
const CheckoutSteps = dynamic(() => import('@ui/commerce/CheckoutSteps'), {
	loading: () => <LoadingUI loading />,
});

/**
 * Render the CheckoutPageTmpl component.
 *
 * @return {Element} The CheckoutPageTmpl component.
 */
const CheckoutPageTmpl = ({ data, loading }) => {
	const dispatch = useDispatch();

	const steps = useSelector(selectors.selectSteps);
	const activeStep = useSelector(selectors.selectActiveStep);
	const isLastStep = useSelector(selectors.selectIsLastStep);

	/** Submit handler for each step. */
	const handleSubmit = useCallback(
		(formData) => {
			dispatch(fillDetails(formData));

			/** Place order if last step */
			if (isLastStep) {
				dispatch(placeOrder());
			}

			/** Proceed to next step */
			if (!isLastStep) {
				dispatch(markAsComplete(activeStep.id));
				dispatch(next());
			}
		},
		[activeStep.id, isLastStep, dispatch]
	);

	return (
		<main className="min-h-screen py-10 lg:py-14">
			<Container>
				<LoadingUI loading={loading}>
					<div className="max-w-3xl mx-auto">
						<div className="flex flex-col space-y-10 sm:space-y-14">
							<nav className="flex items-center justify-center overflow-hidden">
								<Stepper
									steps={steps.map((step, index) => ({
										id: step.id,
										label: step.label,
										active: step.id === activeStep.id,
										disabled: !step.completed && step.id !== activeStep.id,
										onChange: () => dispatch(goTo(index)),
									}))}
								/>
							</nav>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<section>
									<CheckoutSteps steps={steps} activeStep={activeStep} onSubmit={handleSubmit} />
								</section>
								<section>
									<div className="md:sticky top-6 flex flex-col space-y-6">
										<OrderRecap
											products={data?.items}
											subTotal={data?.subtotal?.formattedWithSymbol}
											tax={data?.tax?.amount?.formattedWithSymbol}
											discount={data?.discount?.amountSaved?.formattedWithSymbol}
											shipping={data?.shipping?.price?.formattedWithSymbol}
											grandTotal={data?.totalDue?.formattedWithSymbol}
										/>
										<Disclaimer />
									</div>
								</section>
							</div>
						</div>
					</div>
				</LoadingUI>
			</Container>
		</main>
	);
};

/**
 * Default Props.
 */
CheckoutPageTmpl.defaultProps = {
	loading: false,
};

/**
 * Prop Types.
 */
CheckoutPageTmpl.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		items: PropTypes.arrayOf(PropTypes.shape({})),
		subtotal: PropTypes.shape({
			formattedWithSymbol: PropTypes.string,
		}),
		tax: PropTypes.shape({
			amount: PropTypes.shape({
				raw: PropTypes.number,
				formattedWithSymbol: PropTypes.string,
			}),
		}),
		totalDue: PropTypes.shape({
			formattedWithSymbol: PropTypes.string,
		}),
		shipping: PropTypes.shape({
			price: PropTypes.shape({
				formattedWithSymbol: PropTypes.string,
			}),
		}),
		discount: PropTypes.shape({
			amountSaved: PropTypes.shape({
				formattedWithSymbol: PropTypes.string,
			}),
		}),
	}).isRequired,
	loading: PropTypes.bool,
};

export default CheckoutPageTmpl;
