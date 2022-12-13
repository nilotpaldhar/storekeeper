import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineHome } from 'react-icons/ai';

/**
 * Render the Home icon.
 *
 * @return {Element} The Home icon.
 */
const Home = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineHome />
	</span>
);

/**
 * Default Props.
 */
Home.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Home.propTypes = {
	className: PropTypes.string,
};

export default Home;
