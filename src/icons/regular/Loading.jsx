import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

/**
 * Render the Loading icon.
 *
 * @return {Element} The Loading icon.
 */
const Loading = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineLoading3Quarters />
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
