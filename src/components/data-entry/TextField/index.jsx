import PropTypes from 'prop-types';
import { useId, forwardRef } from 'react';

/** Helpers. */
import isString from 'lodash-es/isString';

/** Component Styles. */
import styles, {
	labelStyles,
	inputStyles,
	labelTextStyles,
	helperStyles,
} from '@ui/data-entry/TextField/styles.cva';

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
		const inputConfig = {
			type,
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

		return (
			<div className={styles({ className })}>
				{label ? (
					<label htmlFor={fieldID} className={labelStyles({ className: labelClassName })}>
						<span className={labelTextStyles({ className: labelTextClassName })}>
							{label}
							{required && <sup>*</sup>}
						</span>
						<input {...inputConfig} />
					</label>
				) : (
					<input {...inputConfig} />
				)}
				{error && isString(error) && (
					<small className={helperStyles({ className: 'text-error-600 font-semibold' })}>
						{error}
					</small>
				)}
				{helperText && (
					<small className={helperStyles({ className: 'text-neutral-900' })}>{helperText}</small>
				)}
			</div>
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
		'datetime-local',
	]),
};

export default TextField;
