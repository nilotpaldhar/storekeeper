import PropTypes from 'prop-types';
import { Title } from '@radix-ui/react-dialog';
import { titleStyles } from '@ui/feedback/Modal/styles.cva';

/**
 * Render the ModalTitle component.
 *
 * @return {Element} The ModalTitle component.
 */
const ModalTitle = ({ children, className, ...props }) => (
	<Title className={titleStyles({ className })} {...props}>
		{children}
	</Title>
);

/**
 * Default Props.
 */
ModalTitle.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
ModalTitle.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default ModalTitle;
