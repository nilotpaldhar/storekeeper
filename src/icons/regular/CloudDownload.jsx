import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineCloudDownload } from 'react-icons/ai';

/**
 * Render the CloudDownload icon.
 *
 * @return {Element} The CloudDownload icon.
 */
const CloudDownload = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineCloudDownload />
	</span>
);

/**
 * Default Props.
 */
CloudDownload.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
CloudDownload.propTypes = {
	className: PropTypes.string,
};

export default CloudDownload;
