import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterColorItem from './FilterColorItem';

/**
 * Render the FilterColor component.
 *
 * @return {Element} The FilterColor component.
 */
const FilterColor = ({ title, hasDivider, defaultCollapsed }) => {
	const { items, refine } = useRefinementList({ attribute: ALGOLIA_ATTRIBUTES.color });

	return (
		<FilterWrapper title={title} hasDivider={hasDivider} defaultCollapsed={defaultCollapsed}>
			<ul className="flex flex-col space-y-4">
				{items.map(({ value, label, isRefined, count }) => (
					<li key={label}>
						<FilterColorItem
							id={`color-${value}`}
							value={value}
							label={label}
							count={count}
							isActive={isRefined}
							refine={refine}
						/>
					</li>
				))}
			</ul>
		</FilterWrapper>
	);
};

/**
 * Default Props.
 */
FilterColor.defaultProps = {
	hasDivider: true,
	defaultCollapsed: false,
};

/**
 * Prop Types.
 */
FilterColor.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
};

export default FilterColor;
