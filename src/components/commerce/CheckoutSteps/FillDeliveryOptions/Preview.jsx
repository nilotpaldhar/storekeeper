import { useSelector } from 'react-redux';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

/**
 * Render the DeliveryPreview component.
 *
 * @return {Element} The DeliveryPreview component.
 */
const DeliveryPreview = () => {
	const delivery = useSelector(selectDetails)?.delivery;

	return (
		<div className="flex items-center justify-between text-sm font-normal">
			<span>{delivery?.label}</span>
			<span>{delivery?.price}</span>
		</div>
	);
};

export default DeliveryPreview;
