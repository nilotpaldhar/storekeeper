import PropTypes from 'prop-types';
import EditIcon from '@icons/regular/Edit';

/**
 * Render the BillingPreview component.
 *
 * @return {Element} The BillingPreview component.
 */
const BillingPreview = ({ data, onEdit }) => {
	const { fullname, street1, street2, zip, region, country } = data || {};

	return (
		<div className="flex flex-col space-y-2 w-full">
			<div className="flex items-center justify-between px-0.5">
				<span className="font-medium">Billing Address</span>
				<button type="button" className="flex items-center space-x-2 text-sm" onClick={onEdit}>
					<EditIcon className="!text-xs" />
					<span>Edit</span>
				</button>
			</div>
			<div className="p-4 border border-neutral-100">
				<div className="text-sm font-normal leading-snug mb-2">{fullname}</div>
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
		</div>
	);
};

/**
 * Default Props.
 */
BillingPreview.defaultProps = {
	onEdit: () => {},
};

/**
 * Prop Types.
 */
BillingPreview.propTypes = {
	data: PropTypes.shape({
		fullname: PropTypes.string,
		street1: PropTypes.string,
		street2: PropTypes.string,
		zip: PropTypes.string,
		region: PropTypes.string,
		country: PropTypes.string,
	}).isRequired,
	onEdit: PropTypes.func,
};

export default BillingPreview;
