import PropTypes from 'prop-types';
import clsx from 'clsx';
import { AiOutlineEdit } from 'react-icons/ai';

/**
 * Render the Edit icon.
 *
 * @return {Element} The Edit icon.
 */
const Edit = ({ className, ...props }) => (
	<span className={clsx('icon', className && className)} {...props}>
		<AiOutlineEdit />
	</span>
);

/**
 * Default Props.
 */
Edit.defaultProps = {
	className: '',
};

/**
 * Prop Types.
 */
Edit.propTypes = {
	className: PropTypes.string,
};

export default Edit;
