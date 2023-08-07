import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterCount from '@ui/commerce/Filters/FilterCount';
import Checkbox from '@ui/data-entry/Checkbox';

/**
 * Render the FilterBrand component.
 *
 * @return {Element} The FilterBrand component.
 */
const FilterBrand = ({ title, hasDivider }) => {
	const { items, refine } = useRefinementList({ attribute: ALGOLIA_ATTRIBUTES.brand });

	return (
		<FilterWrapper title={title} hasDivider={hasDivider}>
			<ul className="flex flex-col space-y-4">
				{items.map(({ value, label, isRefined, count }) => (
					<li key={label} className="flex items-center justify-between">
						<Checkbox
							id={`brand-${value}`}
							label={value}
							name="boat"
							checked={isRefined}
							onCheckedChange={() => {
								refine(value);
							}}
						/>
						<FilterCount count={count} isActive={isRefined} />
					</li>
				))}
			</ul>
		</FilterWrapper>
	);
};

/**
 * Default Props.
 */
FilterBrand.defaultProps = {
	hasDivider: true,
};

/**
 * Prop Types.
 */
FilterBrand.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
};

export default FilterBrand;
