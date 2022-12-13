import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IoLanguageOutline } from 'react-icons/io5';

/**
 * Render the Language icon.
 *
 * @return {Element} The Language icon.
 */
const Language = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<IoLanguageOutline />
	</span>
);

/**
 * Default Props.
 */
Language.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Language.propTypes = {
	className: PropTypes.string,
};

export default Language;
