import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetCartOps } from '@store/slices/cartOps';
import { addCartItem } from '@store/slices/cartOps/cartOps.thunks';
import * as wishlistOpsActions from '@store/slices/wishlistOps/wishlistOps.thunks';

import { selectIsWishlisted } from '@store/slices/wishlist/wishlist.selectors';
import { selectStatus, selectIsPending } from '@store/slices/cartOps/cartOps.selectors';

import Alert from '@ui/feedback/Alert';
import LoadingUI from '@ui/feedback/LoadingUI';
import Content from '@ui/commerce/ProductActions/Content';

import CartIcon from '@icons/regular/Cart';

import checkInventory from '@utils/product/checkInventory';
import { HTTP_STATUS } from '@constants';

/**
 * Render the ProductActions component.
 *
 * @return {Element} The ProductActions component.
 */
const ProductActions = ({
	productIds,
	variants,
	cartBtnIcon,
	cartBtnText,
	hideWishlistBtn,
	variantOrientation,
	onSuccessAddToCart,
}) => {
	const dispatch = useDispatch();

	const status = useSelector((state) => selectStatus(state, productIds?.chec));
	const isPending = useSelector((state) => selectIsPending(state, productIds?.chec));
	const isWishlisted = useSelector((state) => selectIsWishlisted(state, productIds?.sanity));

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const [inventory, setInventory] = useState('');
	const [stockStatus, setStockStatus] = useState('');

	/** Check inventory status. */
	const fetchInventory = useCallback(async () => {
		setLoading(true);
		const data = await checkInventory(productIds.chec);

		setLoading(false);
		setErrorMsg(data.error);

		setInventory(data.inventory);
		setStockStatus(data.status);
	}, [productIds.chec]);

	/** Add product to cart */
	const addToCart = useCallback(
		async (data) => {
			dispatch(
				addCartItem({
					id: productIds?.chec,
					...data,
				})
			);
		},
		[productIds?.chec, dispatch]
	);

	/** Add product to wishlist */
	const addToWishlist = useCallback(async () => {
		if (isWishlisted) {
			dispatch(wishlistOpsActions.removeWishlistItem(productIds?.sanity));
			return;
		}
		dispatch(wishlistOpsActions.addWishlistItem(productIds?.sanity));
	}, [isWishlisted, productIds?.sanity, dispatch]);

	useEffect(() => {
		fetchInventory();
	}, [fetchInventory]);

	useEffect(() => {
		if (status === HTTP_STATUS.succeeded) {
			dispatch(resetCartOps());
			onSuccessAddToCart();
		}
	}, [status, onSuccessAddToCart, dispatch]);

	return (
		<LoadingUI loading={loading || !stockStatus} height={120}>
			{errorMsg && <Alert type="error">{errorMsg}</Alert>}
			{stockStatus === 'OUT_OF_STOCK' && (
				<div className="flex flex-col space-y-1 text-error-600">
					<h2 className="text-xl lg:text-2xl font-semibold leading-normal">Sold Out</h2>
					<p className="text-sm lg:text-base font-light">This item is currently out of stock</p>
				</div>
			)}
			{stockStatus === 'IN_STOCK' && (
				<Content
					productIds={productIds}
					loading={isPending}
					variants={variants}
					inventory={inventory}
					cartBtnIcon={cartBtnIcon}
					cartBtnText={cartBtnText}
					hideWishlistBtn={hideWishlistBtn}
					variantOrientation={variantOrientation}
					onAddToCart={addToCart}
					onAddToWishlist={addToWishlist}
				/>
			)}
		</LoadingUI>
	);
};

/**
 * Default Props.
 */
ProductActions.defaultProps = {
	variants: [],
	cartBtnIcon: CartIcon,
	cartBtnText: 'Add to Cart',
	hideWishlistBtn: false,
	variantOrientation: 'vertical',
	onSuccessAddToCart: () => {},
};

/**
 * Prop Types.
 */
ProductActions.propTypes = {
	productIds: PropTypes.shape({
		sanity: PropTypes.string,
		chec: PropTypes.string,
	}).isRequired,
	variants: PropTypes.arrayOf(PropTypes.shape({})),
	cartBtnIcon: PropTypes.elementType,
	cartBtnText: PropTypes.string,
	hideWishlistBtn: PropTypes.bool,
	variantOrientation: PropTypes.oneOf(['vertical', 'horizontal']),
	onSuccessAddToCart: PropTypes.func,
};

export default ProductActions;
