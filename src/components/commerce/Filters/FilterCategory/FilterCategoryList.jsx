import PropTypes from 'prop-types';
import FilterCategoryItem from './FilterCategoryItem';

/**
 * Render the FilterCategoryList component.
 *
 * @return {Element} The FilterCategoryList component.
 */
const FilterCategoryList = ({ items, refine }) => (
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

/**
 * Default Props.
 */
FilterCategoryList.defaultProps = {
	items: [],
	refine: () => {},
};

/**
 * Prop Types.
 */
FilterCategoryList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({})),
	refine: PropTypes.func,
};

export default FilterCategoryList;
