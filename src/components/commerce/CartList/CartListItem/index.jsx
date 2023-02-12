import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '@store/slices/cartOps/cartOps.thunks';

/** Components & Icons. */
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
	const dispatch = useDispatch();

	/** Increase/Decrease Quantity. */
	const handleQtyChange = (qty) => {
		dispatch(updateCartItem({ id: data?.id, quantity: qty }));
	};

	/** Remove item from cart. */
	const removeItem = () => {
		dispatch(removeCartItem(data?.id));
	};

	const title = data?.displayName ?? data?.name;
	const href = `/product/${data?.permalink}`;
	const getMaxInventory = ({ variant, inventory } = {}) => {
		if (variant) return variant?.inventory;
		if (!variant && inventory?.isManaged) return inventory?.available;
		return null;
	};

	return (
		<div className="relative flex flex-col px-5 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6">
			<div className="flex flex-col items-center space-y-5 lg:flex-row lg:col-span-4 lg:space-y-0 lg:space-x-5">
				{data?.image?.url && <Image src={data?.image?.url} alt={title} width={60} height={60} />}
				<div className="flex flex-col space-y-1 overflow-hidden">
					<Anchor
						href={href}
						title={title}
						className="block text-base font-normal text-center text-neutral-900 hover:text-current hover:opacity-80"
					>
						<span className="block w-full lg:whitespace-nowrap lg:text-ellipsis lg:overflow-hidden">
							{title}
						</span>
					</Anchor>
					<div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
						{data?.selectedOptions?.map((option) => (
							<div
								key={option?.id}
								className="flex space-x-1 font-medium text-xs text-neutral-900 bg-neutral-50 px-1 py-px rounded-sm"
							>
								<span>{option?.group?.name}:</span>
								<span>{option?.name}</span>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="lg:col-span-2 lg:flex lg:items-center">
				<span
					title={data?.price?.formattedWithSymbol}
					className="block overflow-hidden text-base text-center lg:text-left text-ellipsis"
				>
					{data?.price?.formattedWithSymbol}
				</span>
			</div>
			<div className="flex items-center justify-center lg:col-span-2 lg:justify-start">
				<Quantity
					min={1}
					controls="vertical"
					onChange={handleQtyChange}
					max={getMaxInventory(data)}
					defaultValue={data?.quantity}
				/>
			</div>
			<div className="lg:col-span-2 lg:flex lg:items-center">
				<span
					title={data?.total?.formattedWithSymbol}
					className="block overflow-hidden text-base text-center lg:text-left text-ellipsis"
				>
					{data?.total?.formattedWithSymbol}
				</span>
			</div>
			<div className="absolute -top-7 right-4 lg:static lg:col-span-2 lg:flex lg:items-center">
				<button
					type="button"
					onClick={removeItem}
					className="flex items-center justify-center w-6 h-6 transition duration-300 border rounded-full text-neutral-800 border-neutral-200 hover:text-current"
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
		id: PropTypes.string,
		name: PropTypes.string,
		quantity: PropTypes.number,
		productId: PropTypes.string,
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
		selectedOptions: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				name: PropTypes.string,
				group: PropTypes.shape({
					id: PropTypes.string,
					name: PropTypes.string,
				}),
			})
		),
	}),
};

export default CartListItem;
