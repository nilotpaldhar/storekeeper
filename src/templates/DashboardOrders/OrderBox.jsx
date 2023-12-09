import PropTypes from 'prop-types';

import Box from '@ui/data-display/Box';
import Anchor from '@ui/general/Anchor';
import ProductBox from '@ui/dashboard/ProductBox';

import BoxIcon from '@icons/regular/Box';
import CheckIcon from '@icons/regular/Check';
import CloseIcon from '@icons/regular/Close';
import ChevronRightIcon from '@icons/regular/ChevronRight';

import { format } from 'date-fns';
import { clsx } from 'clsx';

/**
 * Render the OrderBox component.
 *
 * @return {Element} The OrderBox component.
 */
const OrderBox = ({ data }) => {
	const cancelled = data?.status === 'cancelled';

	return (
		<Box className="!border-solid">
			<Box.Block className="flex flex-col space-y-5 !px-3 sm:!px-5">
				<div className="flex items-center gap-4">
					<div className=" relative shrink-0">
						<div className="flex items-center justify-center w-8 h-8 bg-neutral-900 text-white rounded-full">
							<BoxIcon className="!text-base" />
						</div>
						<span
							className={clsx(
								'absolute bottom-0 right-0 flex items-center justify-center w-3.5 h-3.5 text-white border border-white rounded-full',
								!cancelled ? 'bg-success-600' : 'bg-error-600'
							)}
						>
							{!cancelled ? (
								<CheckIcon className="!text-[8px]" />
							) : (
								<CloseIcon className="!text-[8px]" />
							)}
						</span>
					</div>
					<div className="flex-1">
						<div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-900 leading-none">
							<div className="whitespace-nowrap">Order Placed</div>
							{cancelled && (
								<div className="whitespace-nowrap px-2 py-1 bg-error-100 text-error-600 text-xs font-semibold leading-none capitalize max-w-max">
									Cancelled
								</div>
							)}
						</div>
						<div className="text-xs font-light text-neutral-500 leading-none mt-2">
							On {format(new Date(data?.placedAt), 'E, dd MMM yyyy')}
						</div>
					</div>
					<div className="shrink-0">
						<Anchor
							href={`/dashboard/orders/${data?.id}`}
							className="flex items-center space-x-1.5 px-2 py-1 focus-visible:outline-dashed focus-visible:outline-primary-600"
						>
							<span className="hidden sm:block text-xs font-semibold text-current">
								View Details
							</span>
							<ChevronRightIcon className="!text-sm sm:!text-[8px]" />
						</Anchor>
					</div>
				</div>
				<ul className="flex flex-col space-y-3">
					{data?.order?.items?.map((item) => (
						<li key={item?.id}>
							<ProductBox data={item} />
						</li>
					))}
				</ul>
			</Box.Block>
		</Box>
	);
};

/**
 * Default Props.
 */
OrderBox.defaultProps = {};

/**
 * Prop Types.
 */
OrderBox.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string,
		placedAt: PropTypes.string,
		status: PropTypes.string,
		order: PropTypes.shape({
			items: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
				})
			),
		}),
	}).isRequired,
};

export default OrderBox;
