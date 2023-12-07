import PropTypes from 'prop-types';

import Box from '@ui/data-display/Box';
import Tooltip from '@ui/feedback/Tooltip';
import RegularButton from '@ui/buttons/RegularButton';

import MoreIcon from '@icons/regular/More';

import { clsx } from 'clsx';

/**
 * Render the AddressBox component.
 *
 * @return {Element} The AddressBox component.
 */
const AddressBox = ({ editable, hideDefault, title, data, className, onEdit, onDelete }) => (
	<Box className={clsx('relative !border-solid', className)}>
		<Box.Block>
			{title && <h3 className="text-sm font-semibold text-neutral-900 mb-3">{title}</h3>}
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center text-sm font-medium text-neutral-900 mb-1">
				<span>{data?.fullname}</span>
				{data?.email && (
					<span className="sm:border-l sm:border-neutral-100 sm:pl-2">{data?.email}</span>
				)}
				{data?.phone && (
					<span className="sm:border-l sm:border-neutral-100 sm:pl-2">{data?.phone}</span>
				)}
			</div>
			<div className="flex flex-wrap gap-1 font-light text-neutral-900 text-sm leading-normal pr-3">
				<span>
					{data?.street1}
					{!data?.street2 && <>&#44;</>}
				</span>
				{data?.street2 && <span>{data?.street2}&#44;</span>}
				<span>{data?.city}&#44;</span>
				<span>{data?.region}</span>
				<span>{data?.zip}&#44;</span>
				<span>{data?.country}</span>
			</div>
			{!hideDefault && (data?.defaultShipping || data?.defaultBilling) && (
				<div className="flex items-center flex-wrap gap-2 mt-3">
					{data?.defaultShipping && (
						<span className="block whitespace-nowrap px-2 py-1 bg-success-100 text-success-600 text-xs font-semibold leading-none capitalize max-w-max">
							Default Shipping
						</span>
					)}
					{data?.defaultBilling && (
						<span className="block whitespace-nowrap px-2 py-1 bg-success-100 text-success-600 text-xs font-semibold leading-none capitalize max-w-max">
							Default Billing
						</span>
					)}
				</div>
			)}
		</Box.Block>
		{editable && (
			<div className="absolute top-5 right-5">
				<Tooltip
					trigger={
						<button
							type="button"
							className="flex items-center justify-center p-0 text-neutral-500 hover:text-neutral-500"
						>
							<MoreIcon className="!text-xl" />
							<span className="sr-only">More</span>
						</button>
					}
					side="left"
				>
					<RegularButton
						intent="primary-ghost"
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
						Edit
					</RegularButton>
					<RegularButton intent="error-ghost" onClick={() => onDelete(data?.id)}>
						Delete
					</RegularButton>
				</Tooltip>
			</div>
		)}
	</Box>
);

/**
 * Default Props.
 */
AddressBox.defaultProps = {
	editable: false,
	hideDefault: false,
	title: null,
	className: '',
	onEdit: () => {},
	onDelete: () => {},
};

/**
 * Prop Types.
 */
AddressBox.propTypes = {
	editable: PropTypes.bool,
	hideDefault: PropTypes.bool,
	title: PropTypes.node,
	data: PropTypes.shape({
		id: PropTypes.string,
		fullname: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
		street1: PropTypes.string,
		street2: PropTypes.string,
		city: PropTypes.string,
		region: PropTypes.string,
		zip: PropTypes.string,
		country: PropTypes.string,
		notes: PropTypes.string,
		defaultBilling: PropTypes.bool,
		defaultShipping: PropTypes.bool,
	}).isRequired,
	className: PropTypes.string,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

export default AddressBox;
