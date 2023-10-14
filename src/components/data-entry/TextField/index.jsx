import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';
import TextFieldWrapper from '@ui/data-entry/TextField/Wrapper';

import { inputStyles } from '@ui/data-entry/TextField/styles.cva';

/**
 * Render the TextField component.
 *
 * @return {Element} The TextField component.
 */
const TextField = forwardRef(
	(
		{
			id,
			type,
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
		const fieldID = id ? `${id}-${idSuffix}` : idSuffix;

		/** Input Config. */
		const config = {
			required,
			disabled,
			readOnly,
			id: fieldID,
			ref: forwardedRef,
			className: inputStyles({
				disabled,
				readOnly,
				error: Boolean(error),
				className: inputClassName,
			}),
			...props,
		};

		const renderInput = () => {
			if (type === 'textarea') return <textarea {...config} />;
			return <input type={type} {...config} />;
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
				{renderInput()}
			</TextFieldWrapper>
		);
	}
);

/**
 * Default Props.
 */
TextField.defaultProps = {
	label: null,
	type: 'text',
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
TextField.propTypes = {
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
	type: PropTypes.oneOf([
		'url',
		'tel',
		'text',
		'time',
		'week',
		'date',
		'email',
		'month',
		'search',
		'number',
		'password',
		'textarea',
		'datetime-local',
	]),
};

export default TextField;
