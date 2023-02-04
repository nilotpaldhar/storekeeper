import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import Quantity from '@ui/data-entry/Quantity';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the CartListItem component.
 *
 * @return {Element} The CartListItem component.
 */
const CartListItem = ({ data }) => {
	const title = data?.displayName ?? data?.name;
	const href = `/product/${data?.permalink}`;
	const getMaxInventory = ({ variant, inventory } = {}) => {
		if (variant) return variant?.inventory;
		if (!variant && inventory?.isManaged) return inventory?.available;
		return null;
	};

	return (
		<div className="relative flex flex-col space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 px-5">
			<div className="flex flex-col items-center space-y-5 lg:flex-row lg:col-span-4 lg:space-y-0 lg:space-x-5">
				{data?.image?.url && <Image src={data?.image?.url} alt={title} width={60} height={60} />}
				<Anchor
					href={href}
					title={title}
					className="block overflow-hidden text-neutral-900 text-base font-normal text-center hover:text-current hover:opacity-80"
				>
					<span className="block w-full lg:whitespace-nowrap lg:text-ellipsis lg:overflow-hidden">
						{title}
					</span>
				</Anchor>
			</div>
			<div className="lg:col-span-2 lg:flex lg:items-center">
				<span
					title={data?.price?.formattedWithSymbol}
					className="block text-base text-center lg:text-left overflow-hidden text-ellipsis"
				>
					{data?.price?.formattedWithSymbol}
				</span>
			</div>
			<div className="flex justify-center items-center lg:col-span-2 lg:justify-start">
				<Quantity
					min={1}
					controls="vertical"
					max={getMaxInventory(data)}
					defaultValue={data?.quantity}
				/>
			</div>
			<div className="lg:col-span-2 lg:flex lg:items-center">
				<span
					title={data?.total?.formattedWithSymbol}
					className="block text-base text-center lg:text-left overflow-hidden text-ellipsis"
				>
					{data?.total?.formattedWithSymbol}
				</span>
			</div>
			<div className="absolute -top-7 right-4 lg:static lg:col-span-2 lg:flex lg:items-center">
				<button
					type="button"
					className="flex items-center justify-center w-6 h-6 rounded-full text-neutral-800 border border-neutral-200 transition duration-300 hover:text-current"
				>
					<span className="sr-only">Remove cart item</span>
					<CloseIcon className="!text-xs" />
				</button>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
CartListItem.defaultProps = {
	data: {},
};

/**
 * Prop Types.
 */
CartListItem.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string,
		quantity: PropTypes.number,
		permalink: PropTypes.string,
		displayName: PropTypes.string,
		variant: PropTypes.shape({}),
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
		inventory: PropTypes.shape({
			isManaged: PropTypes.bool,
			available: PropTypes.number,
		}),
		price: PropTypes.shape({
			raw: PropTypes.number,
			formatted: PropTypes.string,
			formattedWithCode: PropTypes.string,
			formattedWithSymbol: PropTypes.string,
		}),
		total: PropTypes.shape({
			raw: PropTypes.number,
			formatted: PropTypes.string,
			formattedWithCode: PropTypes.string,
			formattedWithSymbol: PropTypes.string,
		}),
	}),
};

export default CartListItem;
