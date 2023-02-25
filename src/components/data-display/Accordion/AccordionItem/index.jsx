import PropTypes from 'prop-types';
import { Item } from '@radix-ui/react-accordion';
import { clsx } from 'clsx';

/**
 * Render the AccordionItem component.
 *
 * @return {Element} The AccordionItem component.
 */
const AccordionItem = ({ disabled, children, className, ...props }) => (
	<Item disabled={disabled} className={clsx('border border-neutral-50', className)} {...props}>
		{children}
	</Item>
);

/**
 * Default Props.
 */
AccordionItem.defaultProps = {
	disabled: false,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
AccordionItem.propTypes = {
	disabled: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default AccordionItem;
