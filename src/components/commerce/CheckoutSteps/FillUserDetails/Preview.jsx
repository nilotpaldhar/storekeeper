import { useSelector } from 'react-redux';
import { selectDetails } from '@store/slices/checkoutSteps/checkoutSteps.selectors';
import DashIcon from '@icons/regular/Dash';

/**
 * Render the UserPreview component.
 *
 * @return {Element} The UserPreview component.
 */
const UserPreview = () => {
	const details = useSelector(selectDetails)?.customer;

	return (
		<div className="flex flex-col space-y-1">
			<div>
				{(details?.firstname || details?.lastname) && (
					<div className="flex items-center space-x-1 text-sm font-normal leading-snug">
						{details?.firstname && <span>{details?.firstname}</span>}
						{details?.lastname && <span>{details?.lastname}</span>}
					</div>
				)}
				{!details?.firstname && !details?.lastname && <DashIcon />}
			</div>
			<div className="flex items-center space-x-1 text-xs">
				<span>Email:</span>
				<span>{details?.email}</span>
			</div>
			<div className="flex items-center space-x-1 text-xs">
				<span>Phone:</span>
				<span className="flex items-center justify-center">{details?.phone || <DashIcon />}</span>
			</div>
		</div>
	);
};

export default UserPreview;
