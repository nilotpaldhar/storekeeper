import PropTypes from 'prop-types';
import { useId, useState, forwardRef } from 'react';

import { IMaskInput } from 'react-imask';
import TextFieldWrapper from '@ui/data-entry/TextField/Wrapper';

import { inputStyles } from '@ui/data-entry/TextField/styles.cva';

/**
 * Render the TextFieldMasked component.
 *
 * @return {Element} The TextFieldMasked component.
 */
const TextFieldMasked = forwardRef(
	(
		{
			id,
			mask,
			maskBlocks,
			unmask,
			onChange,
			label,
			error,
			required,
			disabled,
			readOnly,
			className,
			helperText,
			inputClassName,
			labelClassName,
			labelTextClassName,
			...props
		},
		forwardedRef
	) => {
		const idSuffix = useId();
		const [value, setValue] = useState('');

		const fieldID = id ? `${id}-${idSuffix}` : idSuffix;

		/** Handle masked value change */
		const handleChange = (val) => {
			setValue(val);
			onChange(val);
		};

		/** Input Config. */
		const config = {
			required,
			disabled,
			readOnly,
			id: fieldID,
			inputRef: forwardedRef,
			className: inputStyles({
				disabled,
				readOnly,
				error: Boolean(error),
				className: inputClassName,
			}),
			...props,
			mask,
			unmask,
			value,
			blocks: maskBlocks,
			onAccept: handleChange,
		};

		return (
			<TextFieldWrapper
				id={fieldID}
				label={label}
				error={error}
				helperText={helperText}
				className={className}
				labelClassName={labelClassName}
				labelTextClassName={labelTextClassName}
				required={required}
			>
				<IMaskInput {...config} />
			</TextFieldWrapper>
		);
	}
);

/**
 * Default Props.
 */
TextFieldMasked.defaultProps = {
	mask: '',
	maskBlocks: {},
	unmask: true,
	onChange: () => {},
	label: null,
	error: false,
	className: '',
	helperText: '',
	disabled: false,
	readOnly: false,
	required: false,
	inputClassName: '',
	labelClassName: '',
	labelTextClassName: '',
};

/**
 * Prop Types.
 */
TextFieldMasked.propTypes = {
	mask: PropTypes.string,
	maskBlocks: PropTypes.shape({}),
	unmask: PropTypes.bool,
	onChange: PropTypes.func,
	label: PropTypes.string,
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	readOnly: PropTypes.bool,
	helperText: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	inputClassName: PropTypes.string,
	labelClassName: PropTypes.string,
	labelTextClassName: PropTypes.string,
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TextFieldMasked;
