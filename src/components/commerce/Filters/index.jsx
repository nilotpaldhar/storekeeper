import PropTypes from 'prop-types';
import { useInstantSearch } from 'react-instantsearch';

/** Components. */
import FiltersHeader from '@ui/commerce/Filters/FiltersHeader';
import FilterCategory from '@ui/commerce/Filters/FilterCategory';
import FilterBrand from '@ui/commerce/Filters/FilterBrand';
import FilterColor from '@ui/commerce/Filters/FilterColor';
import FilterPrice from '@ui/commerce/Filters/FilterPrice';

/**
 * Render the Filters component.
 *
 * @return {Element} The Filters component.
 */
const Filters = ({ headerTitle, widgetTitles }) => {
	const { results } = useInstantSearch();

	return (
		<div>
			<FiltersHeader title={headerTitle} />
			{results.nbHits > 0 && (
				<div className="px-px py-6">
					<div className="flex flex-col px-px py-6 space-y-6">
						<FilterCategory title={widgetTitles.category} />
						<FilterBrand title={widgetTitles.brand} />
						<FilterColor title={widgetTitles.color} />
						<FilterPrice title={widgetTitles.price} hasDivider={false} />
					</div>
				</div>
			)}
		</div>
	);
};

/**
 * Default Props.
 */
Filters.defaultProps = {
	headerTitle: 'List of filters',
	widgetTitles: {
		category: 'Category',
		brand: 'Brand',
		color: 'Color',
		price: 'Price',
	},
};

/**
 * Prop Types.
 */
Filters.propTypes = {
	headerTitle: PropTypes.string,
	widgetTitles: PropTypes.shape({
		category: PropTypes.string,
		brand: PropTypes.string,
		color: PropTypes.string,
		price: PropTypes.string,
	}),
};

export default Filters;
