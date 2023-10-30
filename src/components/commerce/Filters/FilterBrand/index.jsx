import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import Checkbox from '@ui/data-entry/Checkbox';
import FilterCount from '@ui/commerce/Filters/FilterCount';
import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import FilterSkeleton from '@ui/commerce/Filters/FilterSkeleton';

/**
 * Render the FilterBrand component.
 *
 * @return {Element} The FilterBrand component.
 */
const FilterBrand = ({ title, hasDivider }) => {
	const { items, refine, hasExhaustiveItems } = useRefinementList({
		attribute: ALGOLIA_ATTRIBUTES.brand,
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
						<ul className="flex flex-col space-y-4">
							{items?.map(({ value, label, isRefined, count }) => (
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
					</FilterWrapper.Body>
				</>
			)}
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
