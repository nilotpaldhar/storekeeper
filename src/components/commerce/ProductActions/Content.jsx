import PropTypes from 'prop-types';
import { useState } from 'react';

import Alert from '@ui/feedback/Alert';
import Quantity from '@ui/data-entry/Quantity';
import RegularButton from '@ui/buttons/RegularButton';

import WishlistBtn from '@ui/commerce/ProductActions/WishlistBtn';
import VariantSelector from '@ui/commerce/ProductActions/VariantSelector';

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
 * Render the Content component.
 *
 * @return {Element} The Content component.
 */
const Content = ({
	productIds,
	inventory,
	variants,
	loading,
	variantOrientation,
	cartBtnIcon,
	cartBtnText,
	hideWishlistBtn,
	onAddToCart,
	onAddToWishlist,
}) => {
	const [qty, setQty] = useState(1);
	const [options, setOptions] = useState({});
	const [errorMsg, setErrorMsg] = useState('');

	const hasVariants = variants?.length > 0;
	const maxQty = inventory?.isManaged ? inventory?.available : null;

	const handleAddToCart = () => {
		if (hasVariants) {
			const { isValid, invalidItems } = isValidOptions(options, variants);
			if (!isValid) {
				const error = `Please select a ${invalidItems.map((i) => i.name).join(', ')}`;
				setErrorMsg(error);
				return;
			}
		}
		onAddToCart({ quantity: qty, options });
	};

	return (
		<div>
			{errorMsg && (
				<div className="mb-6">
					<Alert type="error">{errorMsg}</Alert>
				</div>
			)}
			{hasVariants && (
				<div className="flex flex-col space-y-6 mb-8">
					{variants?.map((variant) => (
						<VariantSelector
							id={variant?.id}
							key={variant?.id}
							disabled={loading}
							label={variant?.name}
							options={variant?.options}
							orientation={variantOrientation}
							onValueChange={(val) => {
								setErrorMsg('');
								setOptions({ ...options, [variant?.id]: val });
							}}
						/>
					))}
				</div>
			)}
			<div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-3 md:space-y-0">
				<div>
					<Quantity
						min={1}
						max={maxQty}
						defaultValue={1}
						disabled={loading}
						className="!max-w-full"
						onChange={(val) => setQty(val)}
					/>
				</div>
				<div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0 md:flex-1 md:max-w-md">
					<div className="flex-1 md:max-w-[240px]">
						<RegularButton
							fullWidth
							loading={loading}
							startIcon={cartBtnIcon}
							onClick={handleAddToCart}
						>
							<span className="w-full truncate font-semibold">{cartBtnText}</span>
						</RegularButton>
					</div>
					{!hideWishlistBtn && (
						<div className="flex-1">
							<WishlistBtn id={productIds?.sanity} onAddToWishlist={onAddToWishlist} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
Content.defaultProps = {
	inventory: {},
	variants: [],
	loading: false,
	variantOrientation: 'vertical',
	cartBtnIcon: null,
	cartBtnText: 'Add to Cart',
	hideWishlistBtn: false,
	onAddToCart: () => {},
	onAddToWishlist: () => {},
};

/**
 * Prop Types.
 */
Content.propTypes = {
	productIds: PropTypes.shape({
		sanity: PropTypes.string,
		chec: PropTypes.string,
	}).isRequired,
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
	loading: PropTypes.bool,
	variantOrientation: PropTypes.oneOf(['vertical', 'horizontal']),
	cartBtnIcon: PropTypes.elementType,
	cartBtnText: PropTypes.string,
	hideWishlistBtn: PropTypes.bool,
	onAddToCart: PropTypes.func,
	onAddToWishlist: PropTypes.func,
};

export default Content;
