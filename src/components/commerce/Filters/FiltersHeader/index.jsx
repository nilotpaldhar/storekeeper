import PropTypes from 'prop-types';
import { ClearRefinements } from 'react-instantsearch-hooks-web';

/**
 * Render the FiltersHeader component.
 *
 * @return {Element} The FiltersHeader component.
 */
const FiltersHeader = ({ title }) => (
	<div className="px-px pb-6 flex items-center justify-between text-base border-b border-neutral-100">
		<div className="font-semibold">{title}</div>
		<ClearRefinements
			classNames={{
				button: `
					block min-h-[40px] px-px text-sm font-medium cursor-pointer hover:text-primary-500
				  focus-visible:outline-primary-600 focus-visible:outline-dashed focus-visible:outline-offset-[3px] focus-visible:outline-1
				`,
				disabledButton: `
					opacity-50 cursor-none select-none pointer-events-none
					focus:outline-none focus-visible:outline-none
				`,
			}}
			translations={{ resetButtonText: 'Clear All' }}
		/>
	</div>
);

/**
 * Default Props.
 */
FiltersHeader.defaultProps = {};

/**
 * Prop Types.
 */
FiltersHeader.propTypes = {
	title: PropTypes.string.isRequired,
};

export default FiltersHeader;
