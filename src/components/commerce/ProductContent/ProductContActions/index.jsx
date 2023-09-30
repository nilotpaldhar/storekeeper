import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HTTP_STATUS } from '@constants';
import * as cart from '@store/slices/cartOps/cartOps.thunks';
import { selectCartOpsType, selectCartOpsStatus } from '@store/slices/cartOps/cartOps.selectors';

/** Components. */
import Alert from '@ui/feedback/Alert';
import Quantity from '@ui/data-entry/Quantity';
import RegularButton from '@ui/buttons/RegularButton';
import ProductContVariant from '@ui/commerce/ProductContent/ProductContVariant';

/** Icons. */
import CartIcon from '@icons/regular/Cart';
import HeartIcon from '@icons/regular/Heart';

/** Checks validity of options. */
const isValidOptions = (options = {}, variants = []) => {
	const invalidItems = [];
	const optionKeys = Object.keys(options);

	variants.forEach((variant) => {
		if (!optionKeys.includes(variant?.id)) {
			invalidItems.push(variant);
		}
	});

	return {
		isValid: invalidItems.length === 0,
		invalidItems,
	};
};

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
	const [errorMsg, setErrorMsg] = useState('');
	const [options, setOptions] = useState({});
	const [loading, setLoading] = useState(false);

	const hasVariants = variants?.length > 0;
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
		if (hasVariants) {
			const { isValid, invalidItems } = isValidOptions(options, variants);
			if (!isValid) {
				const error = `Please select a ${invalidItems.map((i) => i.name).join(', ')}`;
				setErrorMsg(error);
				return;
			}
		}

		dispatch(
			cart.addCartItem({
				id: productId,
				quantity: qty,
				options,
			})
		);
	};

	return (
		<div>
			{errorMsg && (
				<div className="mb-6">
					<Alert type="error">{errorMsg}</Alert>
				</div>
			)}
			{hasVariants && (
				<div className="flex flex-col mb-6 space-y-6">
					{variants?.map((variant) => (
						<ProductContVariant
							id={variant?.id}
							key={variant?.id}
							disabled={loading}
							label={variant?.name}
							options={variant?.options}
							onValueChange={(val) => {
								setErrorMsg('');
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
