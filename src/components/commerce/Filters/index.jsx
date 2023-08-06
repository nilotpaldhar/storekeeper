import PropTypes from 'prop-types';

/** Components. */
import FiltersHeader from '@ui/commerce/Filters/FiltersHeader';
import FilterCategory from '@ui/commerce/Filters/FilterCategory';
import FilterBrand from '@ui/commerce/Filters/FilterBrand';

/**
 * Render the Filters component.
 *
 * @return {Element} The Filters component.
 */
const Filters = ({ headerTitle, widgetTitles, defaultCollapsed }) => (
	<div>
		<FiltersHeader title={headerTitle} />
		<div className="px-px py-6">
			<div className="flex flex-col px-px py-6 space-y-6">
				<FilterCategory title={widgetTitles.category} defaultCollapsed={defaultCollapsed} />
				<FilterBrand
					title={widgetTitles.brand}
					defaultCollapsed={defaultCollapsed}
					hasDivider={false}
				/>
			</div>
		</div>
	</div>
);

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
	defaultCollapsed: false,
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
	defaultCollapsed: PropTypes.bool,
};

export default Filters;
