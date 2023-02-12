import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_STATUS } from '@constants';
import * as cart from '@store/slices/cartOps/cartOps.thunks';
import { selectCartOpsType, selectCartOpsStatus } from '@store/slices/cartOps/cartOps.selectors';

/** Components. */
import Quantity from '@ui/data-entry/Quantity';
import RegularButton from '@ui/buttons/RegularButton';
import ProductContVariant from '@ui/commerce/ProductContent/ProductContVariant';

/** Icons. */
import CartIcon from '@icons/regular/Cart';
import HeartIcon from '@icons/regular/Heart';

/**
 * Render the ProductContActions component.
 *
 * @return {Element} The ProductContActions component.
 */
const ProductContActions = ({ productId, inventory, variants }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const type = useSelector(selectCartOpsType);
	const status = useSelector(selectCartOpsStatus);

	const [qty, setQty] = useState(1);
	const [options, setOptions] = useState({});
	const [loading, setLoading] = useState(false);

	const maxQty = inventory?.isManaged ? inventory?.available : null;

	useEffect(() => {
		if (type === 'add_cart_item' && status === HTTP_STATUS.pending) {
			setLoading(true);
		}
		if (type === 'add_cart_item' && status === HTTP_STATUS.succeeded) {
			router.push('/cart');
		}
	}, [type, status, router, dispatch]);

	/** Add product to cart. */
	const handleAddToCart = () => {
		dispatch(
			cart.addCartItem({
				id: productId,
				quantity: qty,
				options,
			})
		);
	};

	return (
		<div className="py-8 my-8 border-y border-neutral-100">
			{variants?.length > 0 && (
				<div className="flex flex-col mb-6 space-y-6">
					{variants?.map((variant) => (
						<ProductContVariant
							id={variant?.id}
							key={variant?.id}
							disabled={loading}
							label={variant?.name}
							options={variant?.options}
							onValueChange={(val) => {
								setOptions({ ...options, [variant?.id]: val });
							}}
						/>
					))}
				</div>
			)}
			<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
				<Quantity
					min={1}
					max={maxQty}
					defaultValue={1}
					disabled={loading}
					onChange={(val) => setQty(val)}
					className="!max-w-full shrink-0 xxl:w-52"
				/>
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2 md:flex-1">
					<RegularButton
						loading={loading}
						startIcon={CartIcon}
						onClick={handleAddToCart}
						className="flex-1 px-4 shrink-0"
					>
						Add to Cart
					</RegularButton>
					<RegularButton intent="dark-ghost" startIcon={HeartIcon} className="px-4 shrink-0">
						Add to Wishlist
					</RegularButton>
				</div>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
ProductContActions.defaultProps = {
	inventory: {},
	variants: [],
};

/**
 * Prop Types.
 */
ProductContActions.propTypes = {
	productId: PropTypes.string.isRequired,
	inventory: PropTypes.shape({
		available: PropTypes.number,
		isManaged: PropTypes.bool,
	}),
	variants: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			options: PropTypes.arrayOf(PropTypes.shape({})),
		})
	),
};

export default ProductContActions;
