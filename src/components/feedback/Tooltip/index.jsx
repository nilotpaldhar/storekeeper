import PropTypes from 'prop-types';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

/**
 * Render the Tooltip component.
 *
 * @return {Element} The Tooltip component.
 */
const Tooltip = ({
	trigger,
	children,
	side,
	sideOffset,
	rootProps,
	contentClassName,
	arrowClassName,
	...props
}) => (
	<RadixTooltip.Provider>
		<RadixTooltip.Root {...rootProps}>
			<RadixTooltip.Trigger asChild>
				{trigger || <button type="button">Open Tooltip</button>}
			</RadixTooltip.Trigger>
			<RadixTooltip.Content
				side={side}
				sideOffset={sideOffset}
				className={clsx('bg-white px-3 py-2 border border-neutral-100 text-sm', contentClassName)}
				{...props}
			>
				{children}
				<RadixTooltip.Arrow
					width={16}
					height={8}
					className={clsx('fill-neutral-50 transform -translate-y-px', arrowClassName)}
				/>
			</RadixTooltip.Content>
		</RadixTooltip.Root>
	</RadixTooltip.Provider>
);

/**
 * Default Props.
 */
Tooltip.defaultProps = {
	trigger: '',
	children: '',
	side: 'top',
	sideOffset: 4,
	rootProps: {
		delayDuration: 300,
	},
	contentClassName: '',
	arrowClassName: '',
};

/**
 * Prop Types.
 */
Tooltip.propTypes = {
	trigger: PropTypes.node,
	children: PropTypes.node,
	side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	sideOffset: PropTypes.number,
	rootProps: PropTypes.shape({
		defaultOpen: PropTypes.bool,
		open: PropTypes.bool,
		onOpenChange: PropTypes.func,
		delayDuration: PropTypes.number,
		disableHoverableContent: PropTypes.bool,
	}),
	contentClassName: PropTypes.string,
	arrowClassName: PropTypes.string,
};

export default Tooltip;
