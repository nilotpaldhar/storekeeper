import PropTypes from 'prop-types';
import Summary from '@ui/data-display/Summary';
import Anchor from '@ui/general/Anchor';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the OrderSummaryProducts component.
 *
 * @return {Element} The OrderSummaryProducts component.
 */
const OrderSummaryProducts = ({ title, products, ...props }) => (
	<section {...props}>
		<Summary.SubTitle>{title}</Summary.SubTitle>
		<Summary.List className="mb-6">
			{products?.map((product) => (
				<Summary.ListItem key={product?.id}>
					<h3 className="flex items-center justify-between">
						<div className="flex flex-wrap items-center space-x-2">
							<Anchor
								href={`/product/${product?.permalink}`}
								title={product?.displayName ?? product?.name}
								className="text-neutral-900 hover:text-current font-medium max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis"
							>
								{product?.displayName ?? product?.name}
							</Anchor>
							<CloseIcon aria-label="times" className="!text-xs" />
							<span aria-label="quantity">{product?.quantity}</span>
						</div>
						<div>{product?.total?.formattedWithSymbol}</div>
					</h3>
				</Summary.ListItem>
			))}
		</Summary.List>
	</section>
);

/**
 * Default Props.
 */
OrderSummaryProducts.defaultProps = {
	title: 'Product(s)',
	products: [],
};

/**
 * Prop Types.
 */
OrderSummaryProducts.propTypes = {
	title: PropTypes.node,
	products: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			quantity: PropTypes.number,
			permalink: PropTypes.string,
			displayName: PropTypes.string,
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
		})
	),
};

export default OrderSummaryProducts;
