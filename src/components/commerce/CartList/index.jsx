import PropTypes from 'prop-types';
import Box from '@ui/data-display/Box';
import CartListItem from '@ui/commerce/CartList/CartListItem';

/**
 * Render the CartList component.
 *
 * @return {Element} The CartList component.
 */
const CartList = ({ collection, currency, className, ...props }) => (
	<Box className={className} {...props}>
		<div className="flex flex-col space-y-4">
			{collection?.map((item, index) => (
				<div key={item?.id}>
					<CartListItem data={item} />
					{index + 1 !== collection?.length && <Box.Divider />}
				</div>
			))}
		</div>
	</Box>
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
