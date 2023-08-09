import { useRefinementList } from 'react-instantsearch';
import { ALGOLIA_ATTRIBUTES } from '@constants';
import FilterCategoryItem from './FilterCategoryItem';

/**
 * Render the FilterCategoryList component.
 *
 * @return {Element} The FilterCategoryList component.
 */
const FilterCategoryList = () => {
	const { items, refine } = useRefinementList({ attribute: ALGOLIA_ATTRIBUTES.category });

	return (
		<ul className="flex flex-col space-y-3">
			{items.map(({ label, value, count, isRefined }) => (
				<li key={label}>
					<FilterCategoryItem
						id={`category-${value}`}
						value={value}
						label={label}
						count={count}
						isActive={isRefined}
						refine={refine}
					/>
				</li>
			))}
		</ul>
	);
};

export default FilterCategoryList;
