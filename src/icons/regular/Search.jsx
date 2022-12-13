import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineSearch } from 'react-icons/ai';

/**
 * Render the Search icon.
 *
 * @return {Element} The Search icon.
 */
const Search = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineSearch />
	</span>
);

/**
 * Default Props.
 */
Search.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Search.propTypes = {
	className: PropTypes.string,
};

export default Search;
