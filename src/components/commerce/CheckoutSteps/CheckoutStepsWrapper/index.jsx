import PropTypes from 'prop-types';
import * as Collapsible from '@radix-ui/react-collapsible';

import Box from '@ui/data-display/Box';
import RegularButton from '@ui/buttons/RegularButton';

/**
 * Render the CheckoutStepsWrapper component.
 *
 * @return {Element} The CheckoutStepsWrapper component.
 */
const CheckoutStepsWrapper = ({ open, onOpenChange, title, btnText, disabled, children }) => (
	<Collapsible.Root className="group" open={open} onOpenChange={onOpenChange}>
		<Box className="group-data-[state=closed]:border-b-transparent">
			<Box.Title as="div" className="flex items-center justify-between !px-3 lg:!px-5">
				<h2>{title}</h2>
				<Collapsible.Trigger asChild>
					<RegularButton
						intent="primary-ghost"
						className="text-xs !px-0 !min-h-[24px]"
						disabled={disabled}
					>
						{btnText}
					</RegularButton>
				</Collapsible.Trigger>
			</Box.Title>
			<Collapsible.Content className="collapsibleContent">
				<Box.Block>{children}</Box.Block>
			</Collapsible.Content>
		</Box>
	</Collapsible.Root>
);

/**
 * Default Props.
 */
CheckoutStepsWrapper.defaultProps = {
	open: false,
	onOpenChange: () => {},
	title: 'Step Title',
	btnText: 'Change',
	disabled: false,
	children: '',
};

/**
 * Prop Types.
 */
CheckoutStepsWrapper.propTypes = {
	open: PropTypes.bool,
	onOpenChange: PropTypes.func,
	title: PropTypes.string,
	btnText: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.node,
};

export default CheckoutStepsWrapper;
