import PropTypes from 'prop-types';
import CloseIcon from '@icons/regular/Close';

/**
 * Render the WishlistCardRemove component.
 *
 * @return {Element} The WishlistCardRemove component.
 */
const WishlistCardRemove = ({ onClick }) => (
	<div className="absolute top-3 right-3">
		<button
			type="button"
			className="flex items-center justify-center p-1.5 bg-white text-neutral-900 rounded-full hover:text-current"
			onClick={onClick}
		>
			<CloseIcon className="!text-xs" />
			<span className="sr-only">Remove product from wishlist</span>
		</button>
	</div>
);

/**
 * Default Props.
 */
WishlistCardRemove.defaultProps = {
	onClick: () => {},
};

/**
 * Prop Types.
 */
WishlistCardRemove.propTypes = {
	onClick: PropTypes.func,
};

export default WishlistCardRemove;
