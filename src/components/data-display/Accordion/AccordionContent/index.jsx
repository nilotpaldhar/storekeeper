import PropTypes from 'prop-types';
import { Content } from '@radix-ui/react-accordion';
import { clsx } from 'clsx';

/**
 * Render the AccordionContent component.
 *
 * @return {Element} The AccordionContent component.
 */
const AccordionContent = ({ children, className, ...props }) => (
	<Content
		className={clsx('p-5 data-[disabled]:opacity-60 data-[disabled]:cursor-not-allowed', className)}
		{...props}
	>
		{children}
	</Content>
);

/**
 * Default Props.
 */
AccordionContent.defaultProps = {
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
AccordionContent.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default AccordionContent;
