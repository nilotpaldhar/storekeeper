import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import MoveToCart from '@ui/commerce/WishlistCard/Action/MoveToCart';
import checkInventory from '@utils/product/checkInventory';

/**
 * Render the WishlistCardAction component.
 *
 * @return {Element} The WishlistCardRemove component.
 */
const WishlistCardAction = ({ productIds, variants, inventory, onComplete }) => {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [stockStatus, setStockStatus] = useState('');
	const [updatedInventory, setUpdatedInventory] = useState(null);

	/** Check inventory status. */
	const fetchInventory = useCallback(async () => {
		setLoading(true);
		const data = await checkInventory(productIds?.chec);

		setLoading(false);
		setStockStatus(data.status);
		setUpdatedInventory(data.inventory);
		setErrorMsg(data.error);
	}, [productIds?.chec]);

	useEffect(() => {
		fetchInventory();
	}, [fetchInventory]);

	return (
		<LoadingUI loading={loading} height={80}>
			<div className="min-h-[80px]">
				{errorMsg && <Alert type="error">{errorMsg}</Alert>}
				{stockStatus === 'OUT_OF_STOCK' && (
					<div className="flex flex-col space-y-1 text-error-600">
						<h2 className="text-xl lg:text-2xl font-semibold leading-normal">Sold Out</h2>
						<p className="text-sm lg:text-base font-light">This item is currently out of stock</p>
					</div>
				)}
				{stockStatus === 'IN_STOCK' && (
					<MoveToCart
						productId={productIds.chec}
						variants={variants}
						inventory={updatedInventory || inventory}
						onComplete={onComplete}
					/>
				)}
			</div>
		</LoadingUI>
	);
};

/**
 * Default Props.
 */
WishlistCardAction.defaultProps = {
	variants: [],
	inventory: {},
	onComplete: () => {},
};

/**
 * Prop Types.
 */
WishlistCardAction.propTypes = {
	productIds: PropTypes.shape({
		sanity: PropTypes.string,
		chec: PropTypes.string,
	}).isRequired,
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			options: PropTypes.arrayOf(PropTypes.shape({})),
		})
	),
	inventory: PropTypes.shape({
		available: PropTypes.number,
		isManaged: PropTypes.bool,
	}),
	onComplete: PropTypes.func,
};

export default WishlistCardAction;
