import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineLoading } from 'react-icons/ai';

/**
 * Render the Loading icon.
 *
 * @return {Element} The Loading icon.
 */
const Loading = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineLoading />
	</span>
);

/**
 * Default Props.
 */
Loading.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Loading.propTypes = {
	className: PropTypes.string,
};

export default Loading;
