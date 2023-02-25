import PropTypes from 'prop-types';
import { Root } from '@radix-ui/react-accordion';

import AccordionItem from '@ui/data-display/Accordion/AccordionItem';
import AccordionLabel from '@ui/data-display/Accordion/AccordionLabel';
import AccordionContent from '@ui/data-display/Accordion/AccordionContent';

/**
 * Render the Accordion component.
 *
 * @return {Element} The Accordion component.
 */
const Accordion = ({ defaultValue, collapsible, disabled, children, ...props }) => (
	<Root
		type="single"
		disabled={disabled}
		orientation="vertical"
		collapsible={collapsible}
		defaultValue={defaultValue}
		className="flex flex-col space-y-4"
		{...props}
	>
		{children}
	</Root>
);

/**
 * Sub-Components.
 */
Accordion.Item = AccordionItem;
Accordion.Label = AccordionLabel;
Accordion.Content = AccordionContent;

/**
 * Default Props.
 */
Accordion.defaultProps = {
	defaultValue: null,
	collapsible: true,
	disabled: false,
	children: '',
};

/**
 * Prop Types.
 */
Accordion.propTypes = {
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	collapsible: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.node,
};

export default Accordion;
