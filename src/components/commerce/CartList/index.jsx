import PropTypes from 'prop-types';
import CartListItem from '@ui/commerce/CartList/CartListItem';
import CartListHeading from '@ui/commerce/CartList/CartListHeading';
import { clsx } from 'clsx';

/**
 * Render the CartList component.
 *
 * @return {Element} The CartList component.
 */
const CartList = ({ collection, currency, className, ...props }) => (
	<div className={clsx('border border-neutral-50', className)} {...props}>
		<CartListHeading symbol={currency?.symbol} />
		<div className="py-8">
			{collection?.map((item, index) => (
				<div key={item?.id}>
					<CartListItem data={item} />
					{index + 1 !== collection?.length && (
						<div role="separator" className="my-8 border-t border-neutral-50" />
					)}
				</div>
			))}
		</div>
	</div>
);

/**
 * Default Props.
 */
CartList.defaultProps = {
	currency: {},
	collection: [],
	className: '',
};

/**
 * Prop Types.
 */
CartList.propTypes = {
	currency: PropTypes.shape({
		code: PropTypes.string,
		symbol: PropTypes.string,
	}),
	collection: PropTypes.arrayOf(PropTypes.shape({})),
	className: PropTypes.string,
};

export default CartList;
