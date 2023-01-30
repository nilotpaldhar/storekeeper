import PropTypes from 'prop-types';
import * as RadixTabs from '@radix-ui/react-tabs';
import { listStyles, triggerStyles, contentStyles } from '@ui/data-display/Tabs/styles.cva';
import { clsx } from 'clsx';

/**
 * Render the Tabs component.
 *
 * @return {Element} The Tabs component.
 */
const Tabs = ({
	items,
	defaultActiveKey,
	align,
	className,
	labelClassName,
	contentClassName,
	...props
}) => (
	<RadixTabs.Root
		defaultValue={defaultActiveKey || items[0]?.key}
		orientation="horizontal"
		className={className}
		{...props}
	>
		<RadixTabs.List className={listStyles({ align })}>
			{items?.map((item) => (
				<RadixTabs.Trigger
					key={item.key}
					value={item.key}
					disabled={!!item?.disabled}
					className={triggerStyles({ className: labelClassName })}
				>
					{item.label}
				</RadixTabs.Trigger>
			))}
		</RadixTabs.List>
		<div className={contentStyles()}>
			{items?.map((item) => (
				<RadixTabs.Content
					key={item.key}
					value={item.key}
					className={clsx('outline-none', contentClassName)}
				>
					{item.children}
				</RadixTabs.Content>
			))}
		</div>
	</RadixTabs.Root>
);

/**
 * Default Props.
 */
Tabs.defaultProps = {
	items: [],
	defaultActiveKey: null,
	align: 'center',
	className: '',
	labelClassName: '',
	contentClassName: '',
};

/**
 * Prop Types.
 */
Tabs.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			disabled: PropTypes.bool,
			label: PropTypes.node,
			children: PropTypes.node,
		})
	),
	defaultActiveKey: PropTypes.string,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	className: PropTypes.string,
	labelClassName: PropTypes.string,
	contentClassName: PropTypes.string,
};

export default Tabs;
