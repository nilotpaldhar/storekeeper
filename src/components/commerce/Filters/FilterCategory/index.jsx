import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterSkeleton from '@ui/commerce/Filters/FilterSkeleton';
import FilterCategoryList from './FilterCategoryList';

/**
 * Render the FilterCategory component.
 *
 * @return {Element} The FilterCategory component.
 */
const FilterCategory = ({ title, hasDivider }) => {
	const { items, refine, hasExhaustiveItems } = useRefinementList({
		attribute: ALGOLIA_ATTRIBUTES.category,
	});

	if (!hasExhaustiveItems && items.length === 0) return null;

	return (
		<FilterWrapper hasDivider={hasDivider}>
			{hasExhaustiveItems && items.length === 0 ? (
				<FilterSkeleton />
			) : (
				<>
					<FilterWrapper.Title>{title}</FilterWrapper.Title>
					<FilterWrapper.Body>
						<FilterCategoryList items={items} refine={refine} />
					</FilterWrapper.Body>
				</>
			)}
		</FilterWrapper>
	);
};

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
