import PropTypes from 'prop-types';

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
const ProductContActions = ({ inventory, variants }) => {
	const maxQty = inventory?.isManaged ? inventory?.available : null;

	return (
		<div className="my-8 py-8 border-y border-neutral-100">
			{variants?.length > 0 && (
				<div className="mb-6 flex flex-col space-y-6">
					{variants?.map((variant) => (
						<ProductContVariant
							id={variant?.id}
							key={variant?.id}
							label={variant?.name}
							options={variant?.options}
						/>
					))}
				</div>
			)}
			<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-2">
				<Quantity min={1} max={maxQty} defaultValue={1} className="max-w-full shrink-0 xxl:w-52" />
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-2 md:flex-1">
					<RegularButton startIcon={CartIcon} className="px-4 shrink-0 flex-1">
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
