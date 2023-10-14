import PropTypes from 'prop-types';
import EditIcon from '@icons/regular/Edit';

/**
 * Render the AddressItem component.
 *
 * @return {Element} The AddressItem component.
 */
const AddressItem = ({ data, onEdit }) => (
	<div className="relative flex flex-col space-y-4 text-sm">
		<div className="flex flex-wrap items-center justify-between">
			<div className="font-medium">{data?.fullname}</div>
			<button
				type="button"
				className="flex items-center space-x-2 text-sm"
				onClick={() =>
					onEdit({
						...data,
						street2: data?.street2 ?? '',
						notes: data?.notes ?? '',
						region: '',
						country: '',
					})
				}
			>
				<EditIcon className="!text-xs" />
				<span>Edit</span>
			</button>
		</div>
		<div className="flex flex-wrap gap-1 font-light leading-relaxed">
			<span>
				{data?.street1}
				{!data?.street2 && <>&#44;</>}
			</span>
			<span>{data?.street2}&#44;</span>
			<span>{data?.city}&#44;</span>
			<span>{data?.region}</span>
			<span>{data?.zip}&#44;</span>
			<span>{data?.country}</span>
		</div>
	</div>
);

/**
 * Default Props.
 */
AddressItem.defaultProps = {
	onEdit: () => {},
};

/**
 * Prop Types.
 */
AddressItem.propTypes = {
	data: PropTypes.shape({
		fullname: PropTypes.string,
		street1: PropTypes.string,
		street2: PropTypes.string,
		city: PropTypes.string,
		region: PropTypes.string,
		zip: PropTypes.string,
		country: PropTypes.string,
		notes: PropTypes.string,
	}).isRequired,
	onEdit: PropTypes.func,
};

export default AddressItem;
