import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';

/**
 * Render the ProductRecap component.
 *
 * @return {Element} The ProductRecap component.
 */
const ProductRecap = ({ products, ...props }) => (
	<ul className="flex flex-col space-y-6" {...props}>
		{products?.map((product) => (
			<li key={product?.id} className="flex flex-col space-y-1">
				<h3>
					<Anchor
						href={`/product/${product?.permalink}`}
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium text-neutral-900"
					>
						{product?.displayName ?? product?.name}
					</Anchor>
				</h3>
				<div className="flex items-center space-x-5">
					<span className="flex items-center space-x-2">
						<small className="text-[10px] text-neutral-500">Qty:</small>
						<small className="text-xs font-light">{product?.quantity}</small>
					</span>
					<span className="flex items-center space-x-2">
						<small className="text-[10px] text-neutral-500">Price:</small>
						<small className="text-xs font-light">{product?.total?.formattedWithSymbol}</small>
					</span>
				</div>
			</li>
		))}
	</ul>
);

/**
 * Default Props.
 */
ProductRecap.defaultProps = {
	products: [],
};

/**
 * Prop Types.
 */
ProductRecap.propTypes = {
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

export default ProductRecap;
