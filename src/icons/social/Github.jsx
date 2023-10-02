import PropTypes from 'prop-types';
import clsx from 'clsx';
import { RiGithubFill } from 'react-icons/ri';

/**
 * Render the Github icon.
 *
 * @return {Element} The Github icon.
 */
const Github = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<RiGithubFill />
	</span>
);

/**
 * Default Props.
 */
Github.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Github.propTypes = {
	className: PropTypes.string,
};

export default Github;
