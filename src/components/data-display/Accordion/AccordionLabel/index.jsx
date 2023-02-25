import PropTypes from 'prop-types';
import { Header, Trigger } from '@radix-ui/react-accordion';
import ChevronDownIcon from '@icons/regular/ChevronDown';
import { btnStyles, textStyles } from '@ui/data-display/Accordion/AccordionLabel/styles.cva';

/**
 * Render the AccordionLabel component.
 *
 * @return {Element} The AccordionLabel component.
 */
const AccordionLabel = ({ as: Component, children, btnClassName, contentClassName, ...props }) => (
	<Header asChild>
		<Component {...props}>
			<Trigger className={btnStyles({ className: btnClassName })}>
				<div className={textStyles({ className: contentClassName })}>{children}</div>
				<ChevronDownIcon className="!text-sm transition-transform duration-300" />
			</Trigger>
		</Component>
	</Header>
);

/**
 * Default Props.
 */
AccordionLabel.defaultProps = {
	as: 'h2',
	children: '',
	btnClassName: '',
	contentClassName: '',
};

/**
 * Prop Types.
 */
AccordionLabel.propTypes = {
	as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	children: PropTypes.node,
	btnClassName: PropTypes.string,
	contentClassName: PropTypes.string,
};

export default AccordionLabel;
