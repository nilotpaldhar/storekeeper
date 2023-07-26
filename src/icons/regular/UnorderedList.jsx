import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineUnorderedList } from 'react-icons/ai';

/**
 * Render the UnorderedList icon.
 *
 * @return {Element} The UnorderedList icon.
 */
const UnorderedList = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineUnorderedList />
	</span>
);

/**
 * Default Props.
 */
UnorderedList.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
UnorderedList.propTypes = {
	className: PropTypes.string,
};

export default UnorderedList;
