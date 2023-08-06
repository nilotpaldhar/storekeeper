import PropTypes from 'prop-types';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';
import Checkbox from '@ui/data-entry/Checkbox';

import clsx from 'clsx';

/**
 * Render the FilterBrand component.
 *
 * @return {Element} The FilterBrand component.
 */
const FilterBrand = ({ title, hasDivider, defaultCollapsed }) => {
	const { items, refine } = useRefinementList({ attribute: ALGOLIA_ATTRIBUTES.brand });

	return (
		<FilterWrapper title={title} hasDivider={hasDivider} defaultCollapsed={defaultCollapsed}>
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
						<div
							className={clsx(
								'flex items-center justify-center w-5 h-5 bg-neutral-50 text-neutral-900 transition-colors duration-300',
								isRefined && 'bg-primary-600 text-white'
							)}
						>
							<span className="block text-xs font-normal leading-none">{count}</span>
						</div>
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
	defaultCollapsed: false,
};

/**
 * Prop Types.
 */
FilterBrand.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
	defaultCollapsed: PropTypes.bool,
};

export default FilterBrand;
