import PropTypes from 'prop-types';

/** Helpers. */
import isString from 'lodash-es/isString';

/** Component Styles. */
import styles, {
	labelStyles,
	labelTextStyles,
	helperStyles,
} from '@ui/data-entry/TextField/styles.cva';

/**
 * Render the TextFieldWrapper component.
 *
 * @return {Element} The TextFieldWrapper component.
 */
const TextFieldWrapper = ({
	id,
	children,
	label,
	error,
	required,
	className,
	helperText,
	labelClassName,
	labelTextClassName,
}) => (
	<div className={styles({ className })}>
		{label ? (
			<label htmlFor={id} className={labelStyles({ className: labelClassName })}>
				<span className={labelTextStyles({ className: labelTextClassName })}>
					{label}
					{required && <sup>*</sup>}
				</span>
				{children}
			</label>
		) : (
			children
		)}
		{error && isString(error) && (
			<small className={helperStyles({ className: 'text-error-600 font-semibold' })}>{error}</small>
		)}
		{helperText && (
			<small className={helperStyles({ className: 'text-neutral-900' })}>{helperText}</small>
		)}
	</div>
);

/**
 * Default Props.
 */
TextFieldWrapper.defaultProps = {
	children: '',
	label: null,
	error: false,
	className: '',
	helperText: '',
	required: false,
	labelClassName: '',
	labelTextClassName: '',
};

/**
 * Prop Types.
 */
TextFieldWrapper.propTypes = {
	children: PropTypes.node,
	label: PropTypes.string,
	required: PropTypes.bool,
	helperText: PropTypes.node,
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	labelClassName: PropTypes.string,
	labelTextClassName: PropTypes.string,
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TextFieldWrapper;
