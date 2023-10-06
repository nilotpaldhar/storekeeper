import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineTags } from 'react-icons/ai';

/**
 * Render the Tags icon.
 *
 * @return {Element} The Tags icon.
 */
const Tags = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineTags />
	</span>
);

/**
 * Default Props.
 */
Tags.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Tags.propTypes = {
	className: PropTypes.string,
};

export default Tags;
