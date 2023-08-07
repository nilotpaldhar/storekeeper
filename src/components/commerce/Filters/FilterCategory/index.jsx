import PropTypes from 'prop-types';
import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterCategoryList from './FilterCategoryList';

/**
 * Render the FilterCategory component.
 *
 * @return {Element} The FilterCategory component.
 */
const FilterCategory = ({ title, hasDivider }) => (
	<FilterWrapper title={title} hasDivider={hasDivider}>
		<FilterCategoryList />
	</FilterWrapper>
);

/**
 * Default Props.
 */
FilterCategory.defaultProps = {
	hasDivider: true,
};

/**
 * Prop Types.
 */
FilterCategory.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
};

export default FilterCategory;
