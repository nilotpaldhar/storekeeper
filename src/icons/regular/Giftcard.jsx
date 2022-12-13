import PropTypes from 'prop-types';
import clsx from 'clsx';
import { MdOutlineCardGiftcard } from 'react-icons/md';

/**
 * Render the Giftcard icon.
 *
 * @return {Element} The Giftcard icon.
 */
const Giftcard = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<MdOutlineCardGiftcard />
	</span>
);

/**
 * Default Props.
 */
Giftcard.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Giftcard.propTypes = {
	className: PropTypes.string,
};

export default Giftcard;
