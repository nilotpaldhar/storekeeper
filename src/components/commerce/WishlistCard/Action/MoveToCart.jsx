import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { HTTP_STATUS } from '@constants';

import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '@store/slices/cartOps/cartOps.thunks';
import { selectCartOpsType, selectCartOpsStatus } from '@store/slices/cartOps/cartOps.selectors';

import Alert from '@ui/feedback/Alert';
import Quantity from '@ui/data-entry/Quantity';
import ScrollArea from '@ui/general/ScrollArea';
import RegularButton from '@ui/buttons/RegularButton';
import WishlistCardVariant from '@ui/commerce/WishlistCard/Variant';

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
 * Render the MoveToCart component.
 *
 * @return {Element} The MoveToCart component.
 */
const MoveToCart = ({ productId, variants, inventory, onComplete }) => {
	const dispatch = useDispatch();

	const type = useSelector(selectCartOpsType);
	const status = useSelector(selectCartOpsStatus);

	const [qty, setQty] = useState(1);
	const [options, setOptions] = useState({});

	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const hasVariants = variants?.length > 0;
	const maxQty = inventory?.isManaged ? inventory?.available : null;

	useEffect(() => {
		if (type === 'add_cart_item' && status === HTTP_STATUS.pending) {
			setLoading(true);
		}

		if (
			type === 'add_cart_item' &&
			(status === HTTP_STATUS.succeeded || status === HTTP_STATUS.failed)
		) {
			setLoading(false);
			onComplete();
		}
	}, [type, status, onComplete]);

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
		dispatch(addCartItem({ id: productId, quantity: qty, options }));
	};

	return (
		<div className="flex flex-col space-y-6">
			{errorMsg && (
				<div className="mb-6">
					<Alert type="error">{errorMsg}</Alert>
				</div>
			)}
			{hasVariants && (
				<ScrollArea height={variants?.length > 2 ? 140 : null}>
					<div className="flex flex-col space-y-4">
						{variants?.map((variant) => (
							<WishlistCardVariant
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
				</ScrollArea>
			)}
			<div className="flex items-center space-x-3">
				<Quantity
					min={1}
					max={maxQty}
					defaultValue={1}
					disabled={loading}
					onChange={(val) => setQty(val)}
				/>
				<RegularButton loading={loading} fullWidth onClick={handleAddToCart}>
					Done
				</RegularButton>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
MoveToCart.defaultProps = {
	variants: [],
	inventory: {},
	onComplete: () => {},
};

/**
 * Prop Types.
 */
MoveToCart.propTypes = {
	productId: PropTypes.string.isRequired,
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

export default MoveToCart;
