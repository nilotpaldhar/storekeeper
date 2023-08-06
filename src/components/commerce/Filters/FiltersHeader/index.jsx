import PropTypes from 'prop-types';
import RegularButton from '@ui/buttons/RegularButton';

/**
 * Render the FiltersHeader component.
 *
 * @return {Element} The FiltersHeader component.
 */
const FiltersHeader = ({ title }) => (
	<div className="px-px pb-6 flex items-center justify-between text-base border-b border-neutral-100">
		<div className="font-semibold">{title}</div>
		<div>
			<RegularButton intent="primary-ghost" className="!px-px">
				Clear All
			</RegularButton>
		</div>
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
