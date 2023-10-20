import PropTypes from 'prop-types';
import { Description } from '@radix-ui/react-dialog';
import { descStyles } from '@ui/feedback/Modal/styles.cva';

/**
 * Render the ModalDescription component.
 *
 * @return {Element} The ModalDescription component.
 */
const ModalDescription = ({ children, className, ...props }) => (
	<Description className={descStyles({ className })} {...props}>
		{children}
	</Description>
);

/**
 * Default Props.
 */
ModalDescription.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
ModalDescription.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default ModalDescription;
