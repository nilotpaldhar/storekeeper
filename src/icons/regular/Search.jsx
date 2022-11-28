import PropTypes from 'prop-types';
import cx from 'classnames';
import { AiOutlineSearch } from 'react-icons/ai';

/**
 * Render the Search icon.
 *
 * @return {Element} The Search icon.
 */
const Search = ({ className, ...props }) => (
	<span className={cx('icon', className && className)} {...props}>
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
