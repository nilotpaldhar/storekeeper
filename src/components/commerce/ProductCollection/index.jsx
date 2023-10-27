import PropTypes from 'prop-types';

import ProductCard from '@ui/commerce/ProductCard';
import ProductCollectionTitle from '@ui/commerce/ProductCollection/Title';

import styles, { wrapperStyles } from './styles.cva';

/**
 * Render the ProductCollection component.
 *
 * @return {Element} The ProductCollection component.
 */
const ProductCollection = ({
	grid,
	products,
	item: Item,
	itemProps,
	children,
	className,
	wrapperClassName,
}) => (
	<div className={styles({ className })}>
		<div>{children}</div>
		<div className={wrapperStyles({ className: wrapperClassName, grid })}>
			{products?.map((product) => (
				<Item key={product?.id} data={product} {...itemProps} />
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
	grid: true,
	products: [],
	item: ProductCard,
	itemProps: {},
	children: '',
	className: '',
	wrapperClassName: '',
};

/**
 * Prop Types.
 */
ProductCollection.propTypes = {
	grid: PropTypes.bool,
	products: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
		})
	),
	item: PropTypes.elementType,
	itemProps: PropTypes.shape({}),
	children: PropTypes.node,
	className: PropTypes.string,
	wrapperClassName: PropTypes.string,
};

export default ProductCollection;
