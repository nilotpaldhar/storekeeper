import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectProductCatalogLayout } from '@store/slices/layout/layout.selectors';
import ProductCard from '@ui/commerce/ProductCard';

/**
 * Render the HitWrapper component.
 *
 * @return {Element} The HitWrapper component.
 */
const HitWrapper = ({ hit }) => {
	const layout = useSelector(selectProductCatalogLayout);
	return <ProductCard data={hit} layout={layout === 'list' ? 'horizontal' : 'vertical'} />;
};

/**
 * Prop Types.
 */
HitWrapper.propTypes = {
	hit: PropTypes.shape({}).isRequired,
};

export default HitWrapper;
