import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineTag } from 'react-icons/ai';

/**
 * Render the Tag icon.
 *
 * @return {Element} The Tag icon.
 */
const Tag = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineTag />
	</span>
);

/**
 * Default Props.
 */
Tag.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Tag.propTypes = {
	className: PropTypes.string,
};

export default Tag;
