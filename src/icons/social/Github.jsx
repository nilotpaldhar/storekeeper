import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineGithub } from 'react-icons/ai';

/**
 * Render the Github icon.
 *
 * @return {Element} The Github icon.
 */
const Github = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineGithub />
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
