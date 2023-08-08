import PropTypes from 'prop-types';
import { ALGOLIA_ATTRIBUTES } from '@constants';

import { RangeInput } from 'react-instantsearch-hooks-web';
import FilterWrapper from '@ui/commerce/Filters/FilterWrapper';

/**
 * Render the FilterPrice component.
 *
 * @return {Element} The FilterPrice component.
 */
const FilterPrice = ({ title, hasDivider }) => (
	<FilterWrapper title={title} hasDivider={hasDivider}>
		<RangeInput
			attribute={ALGOLIA_ATTRIBUTES.price}
			translations={{ submit: 'Apply', separator: 'to' }}
			classNames={{
				root: '',
				form: 'flex items-center',
				label: 'flex-1',
				input: `
					block w-full text-sm font-medium text-center py-2 text-neutral-900 bg-white transition duration-300
					border border-neutral-100 focus:outline-none focus-visible:border-neutral-900
					placeholder:text-neutral-400 placeholder:font-light
				`,
				separator: 'mx-2 self-center text-sm font-medium text-neutral-500',
				submit: `
					bg-primary-600 text-white max-w-max px-6 py-2 text-sm min-h-[40px] font-normal leading-none transition duration-300
					hover:shadow-md hover:text-white hover:bg-primary-500 active:bg-primary-500 focus-visible:outline-offset-[3px] focus-visible:outline-dashed focus-visible:outline-1 focus-visible:outline-primary-600
					ml-4
				`,
			}}
		/>
	</FilterWrapper>
);

/**
 * Default Props.
 */
FilterPrice.defaultProps = {
	hasDivider: true,
};

/**
 * Prop Types.
 */
FilterPrice.propTypes = {
	title: PropTypes.string.isRequired,
	hasDivider: PropTypes.bool,
};

export default FilterPrice;
