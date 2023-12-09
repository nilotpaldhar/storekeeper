import PropTypes from 'prop-types';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { fillOrderDetails } from '@store/slices/userOrder';
import { updateCollectionItem } from '@store/slices/userOrders';

import axios from 'axios';
import toast from 'react-hot-toast';

import Box from '@ui/data-display/Box';
import RegularButton from '@ui/buttons/RegularButton';
import CloseIcon from '@icons/regular/Close';

import { format } from 'date-fns';
import { cva } from 'class-variance-authority';

/** Styles */
const orderStatusStyles = cva('', {
	variants: {
		status: {
			open: 'bg-success-100 text-success-600',
			cancelled: 'bg-error-100 text-error-600',
		},
	},
	defaultVariants: {
		status: 'open',
	},
});

const paymentStatusStyles = cva('', {
	variants: {
		status: {
			paid: 'bg-success-100 text-success-600',
			not_paid: 'bg-error-100 text-error-600',
			partially_paid: 'bg-warning-100 text-warning-800',
			refunded: 'bg-primary-100 text-primary-600',
			authorized: 'bg-primary-100 text-primary-600',
		},
	},
	defaultVariants: {
		status: 'not_paid',
	},
});

const fulfillmentStatusStyles = cva('', {
	variants: {
		status: {
			fulfilled: 'bg-success-100 text-success-600',
			not_fulfilled: 'bg-error-100 text-error-600',
			partially_fulfilled: 'bg-warning-100 text-warning-800',
			returned: 'bg-primary-5bg-success-100 text-primary-600',
		},
	},
	defaultVariants: {
		status: 'not_fulfilled',
	},
});

/**
 * Render the MetaBox component.
 *
 * @return {Element} The MetaBox component.
 */
const MetaBox = ({ id, reference, placedAt, status }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const chipClassNames = 'py-1 px-2 text-xs font-semibold uppercase';

	/** Cancel order */
	const cancelOrder = async () => {
		setLoading(true);

		try {
			const res = await axios.post('/api/user/orders/cancel', { id });

			dispatch(updateCollectionItem(res.data.data));
			dispatch(fillOrderDetails(res.data.data));

			toast.success('The order has been canceled successfully.');
		} catch (error) {
			const message = error?.response?.data?.error;
			toast.error(message || 'The attempt to cancel the order was unsuccessful.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box className="!border-solid">
			<Box.Block>
				<div className="flex flex-col space-y-5">
					<div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col space-y-2">
							<span className="inline-block text-xs font-normal text-neutral-500 uppercase whitespace-nowrap">
								Reference
							</span>
							<span className="inline-block text-xs  sm:text-sm font-semibold text-neutral-900  whitespace-nowrap">
								{reference && reference}
							</span>
						</div>
						<div className="flex flex-col space-y-2 sm:items-end">
							<span className="inline-block text-xs font-normal text-neutral-500 uppercase whitespace-nowrap">
								Placed
							</span>
							<span className="inline-block text-sm font-semibold text-neutral-900 whitespace-nowrap">
								{placedAt && format(new Date(placedAt), 'E, dd MMM yyyy')}
							</span>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<Box className="flex-1">
							<Box.Block className="!p-2 leading-none text-center">
								<div className="text-xs font-semibold sm:text-sm mb-2 whitespace-nowrap">
									Order Status
								</div>
								<div
									className={orderStatusStyles({
										status: status?.order,
										className: chipClassNames,
									})}
								>
									{status?.order}
								</div>
							</Box.Block>
						</Box>
						<Box className="flex-1">
							<Box.Block className="!p-2 leading-none text-center">
								<div className="text-xs font-semibold sm:text-sm mb-2">Fulfillment</div>
								<div
									className={fulfillmentStatusStyles({
										status: 'partially_fulfilled',
										className: chipClassNames,
									})}
								>
									{status?.fulfillment}
								</div>
							</Box.Block>
						</Box>
						<Box className="flex-1">
							<Box.Block className="!p-2 leading-none text-center">
								<div className="text-xs font-semibold sm:text-sm mb-2">Payment</div>
								<div
									className={paymentStatusStyles({
										status: status?.payment,
										className: chipClassNames,
									})}
								>
									{status?.payment}
								</div>
							</Box.Block>
						</Box>
					</div>
					{status?.order === 'open' && (
						<RegularButton
							fullWidth
							startIcon={CloseIcon}
							intent="error"
							loading={loading}
							onClick={cancelOrder}
						>
							Cancel
						</RegularButton>
					)}
				</div>
			</Box.Block>
		</Box>
	);
};

/**
 * Default Props.
 */
MetaBox.defaultProps = {
	reference: null,
	placedAt: null,
};

/**
 * Prop Types.
 */
MetaBox.propTypes = {
	id: PropTypes.string.isRequired,
	reference: PropTypes.string,
	placedAt: PropTypes.string,
	status: PropTypes.shape({
		order: PropTypes.oneOf(['open', 'cancelled']),
		fulfillment: PropTypes.oneOf(['fulfilled', 'not_fulfilled', 'partially_fulfilled', 'returned']),
		payment: PropTypes.oneOf(['paid', 'not_paid', 'partially_paid', 'refunded', 'authorized']),
	}).isRequired,
};

export default MetaBox;
