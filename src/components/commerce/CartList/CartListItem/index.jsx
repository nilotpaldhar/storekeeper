import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '@store/slices/cartOps/cartOps.thunks';

/** Components & Icons. */
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import Quantity from '@ui/data-entry/Quantity';

/**
 * Render the CartListItem component.
 *
 * @return {Element} The CartListItem component.
 */
const CartListItem = ({ data }) => {
	const dispatch = useDispatch();
	const title = data?.displayName ?? data?.name;
	const href = `/product/${data?.permalink}`;

	/** Increase/Decrease Quantity. */
	const handleQtyChange = (qty) => {
		dispatch(updateCartItem({ id: data?.id, quantity: qty }));
	};

	/** Remove item from cart. */
	const removeItem = () => {
		dispatch(removeCartItem(data?.id));
	};

	const getMaxInventory = ({ variant, inventory } = {}) => {
		if (variant) return variant?.inventory;
		if (!variant && inventory?.isManaged) return inventory?.available;
		return null;
	};

	return (
		<div className="text-neutral-900 pt-3 sm:pt-4 xl:pt-5 md:pb-4 xl:mb-5">
			<div className="flex items-stretch space-x-2 sm:space-x-4 px-3 sm:px-4 xl:px-5">
				<div className="flex-shrink-0 max-w-[100px] sm:max-w-[125px]">
					{data?.image?.url && (
						<Image src={data?.image?.url} alt={title} width={125} height={125} />
					)}
				</div>
				<div className="flex-1 flex flex-col gap-y-1.5">
					<div className="pt-1 sm:pt-2 sm:pb-1 max-w-[200px] lg:max-w-sm xxl:max-w-lg">
						<Anchor
							href={href}
							title={title}
							target="_blank"
							rel="noopener noreferrer"
							className="block text-sm lg:text-base font-medium text-neutral-900 hover:text-primary-600"
						>
							<span className="line-clamp-2">{title}</span>
						</Anchor>
					</div>
					{data?.selectedOptions?.length > 0 && (
						<div className="flex items-center flex-wrap gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-3">
							{data?.selectedOptions?.map((option) => (
								<div key={option?.id} className="flex items-center space-x-2 leading-none">
									<span className="text-[10px] sm:text-xs text-neutral-500">
										{option?.group?.name}:
									</span>
									<span className="block p-0.5 sm:p-1 text-[10px] sm:text-xs font-medium bg-neutral-50">
										{option?.name}
									</span>
								</div>
							))}
						</div>
					)}
					<div className="py-2 flex items-center flex-wrap gap-x-3 gap-y-1 md:gap-x-6 md:gap-y-3 leading-none">
						<div className="flex items-center space-x-2">
							<span className="text-[10px] sm:text-sm text-neutral-500">Price:</span>
							<span className="font-medium text-xs sm:text-sm">
								{data?.price?.formattedWithSymbol}
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<span className="text-[10px] sm:text-sm text-neutral-500">Total:</span>
							<span className="font-medium text-xs sm:text-sm">
								{data?.total?.formattedWithSymbol}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2 flex flex-col md:flex-row md:px-4 xl:px-5">
				<div className="w-full md:shrink-0 md:w-[125px] px-3 md:px-0">
					<Quantity
						min={1}
						className="!max-w-full"
						onChange={handleQtyChange}
						max={getMaxInventory(data)}
						defaultValue={data?.quantity}
					/>
				</div>
				<div className="mt-4 md:mt-0 md:ml-4 w-full">
					<div className="h-12 md:h-full border-t md:border-none border-dashed border-neutral-100">
						<div className="flex items-center h-full md:space-x-4">
							<button
								type="button"
								className="h-full flex-1 md:flex-none outline-none text-primary-600 hover:text-primary-500 opacity-40 pointer-events-none"
							>
								<span className="text-xs md:text-sm uppercase font-bold leading-none">
									Save for later
								</span>
							</button>
							<div
								role="separator"
								className="md:hidden w-px h-full border-r border-dashed border-neutral-100"
							/>
							<button
								type="button"
								className="h-full flex-1 md:flex-none outline-none text-error-600 hover:text-error-500"
								onClick={removeItem}
							>
								<span className="text-xs md:text-sm uppercase font-bold leading-none">Remove</span>
							</button>
						</div>
					</div>
				</div>
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
