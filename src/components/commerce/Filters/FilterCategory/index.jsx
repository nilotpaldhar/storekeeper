import PropTypes from 'prop-types';
import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterCategoryList from './FilterCategoryList';

/**
 * Render the FilterCategory component.
 *
 * @return {Element} The FilterCategory component.
 */
const FilterCategory = ({ title, hasDivider, defaultCollapsed }) => (
	<FilterWrapper title={title} hasDivider={hasDivider} defaultCollapsed={defaultCollapsed}>
		<FilterCategoryList />
	</FilterWrapper>
);

/**
 * Default Props.
 */
FilterCategory.defaultProps = {
	hasDivider: true,
	defaultCollapsed: false,
};

/**
 * Prop Types.
 */
FilterCategory.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
};

export default FilterCategory;
