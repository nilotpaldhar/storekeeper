// import PropTypes from 'prop-types';
import { CurrentRefinements } from 'react-instantsearch-hooks-web';
import { ALGOLIA_ATTRIBUTES } from '@constants';
import parseColorFacet from '@utils/search/parseColorFacet';

/** Filter refinements labels.  */
const FILTER_LABEL_MAP = {
	[ALGOLIA_ATTRIBUTES.category]: 'Categories',
	[ALGOLIA_ATTRIBUTES.brand]: 'Brand',
	[ALGOLIA_ATTRIBUTES.color]: 'Color',
	[ALGOLIA_ATTRIBUTES.price]: 'Price',
};

/**
 * Render the RefinementList component.
 *
 * @return {Element} The RefinementList component.
 */
const RefinementList = () => (
	<CurrentRefinements
		transformItems={(items) =>
			items.map((item) => ({
				...item,
				label: FILTER_LABEL_MAP[item.label] || item.label,
				refinements: item.refinements.map((refinement) => {
					const { name } = parseColorFacet(refinement.label);
					return { ...refinement, label: name };
				}),
			}))
		}
		classNames={{
			root: 'px-px text-neutral-900 pt-6 pb-2',
			list: 'flex flex-wrap items-center gap-2',
			item: `
					flex flex-wrap items-center gap-4 px-4 py-1.5
					text-xs bg-white border border-neutral-100 select-none
					hover:bg-neutral-50 transition-colors duration-300
				`,
			label: 'font-semibold',
			category: 'flex items-center space-x-1.5',
			categoryLabel: '',
			delete: 'inline-flex items-center text-[10px] text-neutral-500 hover:text-neutral-900',
			noRefinementList: 'x8',
			noRefinementRoot: 'hidden',
		}}
		className="align-middle"
	/>
);

/**
 * Default Props.
 */
RefinementList.defaultProps = {};

/**
 * Prop Types.
 */
RefinementList.propTypes = {};

export default RefinementList;
