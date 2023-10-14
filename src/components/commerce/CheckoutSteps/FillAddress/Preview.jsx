import { useSelector } from 'react-redux';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';

/**
 * Render the AddressPreview component.
 *
 * @return {Element} The AddressPreview component.
 */
const AddressPreview = () => {
	const shipping = useSelector(selectDetails)?.shipping;
	const { fullname, street1, street2, region, zip, country } = shipping || {};

	return (
		<div className="flex flex-col space-y-2">
			<div className="text-sm font-normal leading-snug">{fullname}</div>
			<div className="flex flex-wrap gap-1 font-light text-xs leading-relaxed">
				<div className="flex flex-wrap gap-1">
					<span>
						{street1}
						{!street2 && <>&#44;</>}
					</span>
					{street2 && <span>{street2}&#44;</span>}
				</div>
				<div>{region}</div>
				<div>{zip}&#44;</div>
				<div>{country}</div>
			</div>
		</div>
	);
};

export default AddressPreview;
