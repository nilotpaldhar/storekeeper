import PropTypes from 'prop-types';
import CloseIcon from '@icons/regular/Close';
import { clsx } from 'clsx';

/**
 * Render the RemoveBtn component.
 *
 * @return {Element} The RemoveBtn component.
 */
const RemoveBtn = ({ onRemove }) => (
	<button
		type="button"
		onClick={onRemove}
		className={clsx(
			'w-7 h-7 bg-white flex justify-center items-center rounded-full transition-colors duration-300',
			'text-neutral-900 hover:text-neutral-900 focus-visible:outline-dashed'
		)}
	>
		<CloseIcon className="!text-xs" />
		<span className="sr-only">Remove product from wishlist</span>
	</button>
);

/**
 * Default Props.
 */
RemoveBtn.defaultProps = {
	onRemove: () => {},
};

/**
 * Prop Types.
 */
RemoveBtn.propTypes = {
	onRemove: PropTypes.func,
};

export default RemoveBtn;
