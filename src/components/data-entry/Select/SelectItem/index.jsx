import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Item, ItemText, ItemIndicator } from '@radix-ui/react-select';
import CheckIcon from '@icons/regular/Check';
import styles, { indicatorStyles } from '@ui/data-entry/Select/SelectItem/styles.cva';

/**
 * Render the SelectItem component.
 *
 * @return {Element} The SelectItem component.
 */
const SelectItem = forwardRef(({ children, disabled, ...props }, forwardedRef) => (
	<Item ref={forwardedRef} className={styles()} disabled={disabled} {...props}>
		<ItemIndicator className={indicatorStyles()}>
			<CheckIcon className="!text-xs" />
		</ItemIndicator>
		<ItemText>{children}</ItemText>
	</Item>
));

/**
 * Default Props.
 */
SelectItem.defaultProps = {
	children: '',
	disabled: false,
};

/**
 * Prop Types.
 */
SelectItem.propTypes = {
	children: PropTypes.node,
	disabled: PropTypes.bool,
};

export default SelectItem;
