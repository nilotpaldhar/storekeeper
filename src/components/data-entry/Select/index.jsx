import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';
import isString from 'lodash-es/isString';

/** Components. */
import * as RadixSelect from '@radix-ui/react-select';
import SelectItem from '@ui/data-entry/Select/SelectItem';

/** Icons. */
import ChevronDownIcon from '@icons/regular/ChevronDown';

/** Component Styles. */
import styles, {
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
	(
		{ id, label, placeholder, required, error, disabled, children, wrapperClassName, ...props },
		forwardedRef
	) => {
		const idSuffix = useId();
		const fieldID = id ? `${id}-${idSuffix}` : idSuffix;

		return (
			<RadixSelect.Root required={required} disabled={disabled} {...props}>
				<div className={styles({ className: wrapperClassName })}>
					{label && (
						<label htmlFor={fieldID} className={labelStyles()}>
							<span className={labelTextStyles()}>
								{label}
								{required && <sup>*</sup>}
							</span>
						</label>
					)}
					<RadixSelect.Trigger
						ref={forwardedRef}
						className={triggerStyles({ error: Boolean(error) })}
						id={fieldID}
					>
						<RadixSelect.Value placeholder={placeholder} />
						<RadixSelect.Icon className="flex items-center leading-none pl-3">
							<ChevronDownIcon className="!text-sm" />
						</RadixSelect.Icon>
					</RadixSelect.Trigger>
					{error && isString(error) && (
						<small className="px-px leading-tight text-xs text-error-600 font-semibold">
							{error}
						</small>
					)}
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
	error: false,
	disabled: false,
	children: '',
	wrapperClassName: '',
};

/**
 * Prop Types.
 */
Select.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	disabled: PropTypes.bool,
	children: PropTypes.node,
	wrapperClassName: PropTypes.string,
};

export default Select;
