import PropTypes from 'prop-types';
import ProductCard from '@ui/commerce/ProductCard';
import ProductCollectionTitle from '@ui/commerce/ProductCollection/ProductCollectionTitle';
import styles, { wrapperStyles } from '@ui/commerce/ProductCollection/styles.cva';

/**
 * Render the ProductCollection component.
 *
 * @return {Element} The ProductCollection component.
 */
const ProductCollection = ({ products, grid, children, className, wrapperClassName }) => (
	<div className={styles({ className })}>
		<div>{children}</div>
		<div className={wrapperStyles({ className: wrapperClassName, grid })}>
			{products?.map((product) => (
				<ProductCard key={product?.id} layout={grid ? 'vertical' : 'horizontal'} data={product} />
			))}
		</div>
	</div>
);

/**
 * Sub-components.
 */
ProductCollection.Title = ProductCollectionTitle;

/**
 * Default Props.
 */
ProductCollection.defaultProps = {
	products: [],
	grid: true,
	children: '',
	className: '',
	wrapperClassName: '',
};

/**
 * Prop Types.
 */
ProductCollection.propTypes = {
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
		})
	),
	grid: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	wrapperClassName: PropTypes.string,
};

export default ProductCollection;
