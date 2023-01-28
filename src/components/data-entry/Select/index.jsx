import { useId, forwardRef } from 'react';
import PropTypes from 'prop-types';

/** Components. */
import * as RadixSelect from '@radix-ui/react-select';
import SelectItem from '@ui/data-entry/Select/SelectItem';

/** Icons. */
import ChevronDownIcon from '@icons/regular/ChevronDown';

/** Component Styles. */
import {
	triggerStyles,
	contentStyles,
	labelStyles,
	labelTextStyles,
} from '@ui/data-entry/Select/styles.cva';

/**
 * Render the Select component.
 *
 * @return {Element} The Select component.
 */
const Select = forwardRef(
	({ id, label, placeholder, required, disabled, children, ...props }, forwardedRef) => {
		const idSuffix = useId();
		const fieldID = id ? `${id}-${idSuffix}` : idSuffix;

		return (
			<RadixSelect.Root required={required} disabled={disabled} {...props}>
				<div>
					{label && (
						<label htmlFor={fieldID} className={labelStyles()}>
							<span className={labelTextStyles()}>
								{label}
								{required && <sup>*</sup>}
							</span>
						</label>
					)}
					<RadixSelect.Trigger ref={forwardedRef} className={triggerStyles()} id={fieldID}>
						<RadixSelect.Value placeholder={placeholder} />
						<RadixSelect.Icon className="flex items-center leading-none pl-3">
							<ChevronDownIcon className="!text-sm" />
						</RadixSelect.Icon>
					</RadixSelect.Trigger>
				</div>
				<RadixSelect.Portal>
					<RadixSelect.Content className={contentStyles()} position="popper" sideOffset={5}>
						<RadixSelect.Viewport>{children}</RadixSelect.Viewport>
					</RadixSelect.Content>
				</RadixSelect.Portal>
			</RadixSelect.Root>
		);
	}
);

/**
 * Sub Components.
 */
Select.Item = SelectItem;

/**
 * Default Props.
 */
Select.defaultProps = {
	label: null,
	placeholder: 'Choose an option',
	required: false,
	disabled: false,
	children: '',
};

/**
 * Prop Types.
 */
Select.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.node,
};

export default Select;
