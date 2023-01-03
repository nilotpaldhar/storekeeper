import PropTypes from 'prop-types';
import { forwardRef } from 'react';

/** Component & Icon. */
import Anchor from '@ui/general/Anchor';
import LoadingIcon from '@icons/regular/Loading';

/** Component Styles. */
import styles, { iconStyles } from '@ui/buttons/RegularButton/styles.cva';

/**
 * Render the RegularButton component.
 *
 * @return {Element} The RegularButton component.
 */
const RegularButton = forwardRef(
	(
		{
			as,
			type,
			href,
			intent,
			loading,
			children,
			disabled,
			fullWidth,
			className,
			endIcon: EndIcon,
			startIcon: StartIcon,
			...props
		},
		forwardedRef
	) => {
		/** Config. */
		const config = {
			ref: forwardedRef,
			tabIndex: disabled || loading ? '-1' : '0',
			className: styles({
				intent,
				fullWidth,
				disabled,
				loading,
				className,
			}),
			...props,
		};

		/** Inner Content. */
		const content = (
			<>
				{loading && (
					<LoadingIcon className={iconStyles({ className: 'animate-spin backface-hidden' })} />
				)}
				{StartIcon && !loading && <StartIcon className={iconStyles()} />}
				{children && <span>{children}</span>}
				{EndIcon && !loading && <EndIcon className={iconStyles()} />}
			</>
		);

		/** Anchor. */
		if (as === 'anchor') {
			return (
				<Anchor href={href} {...config}>
					{content}
				</Anchor>
			);
		}

		/** Button. */
		return (
			// eslint-disable-next-line react/button-has-type
			<button type={type} {...config} disabled={disabled || loading}>
				{content}
			</button>
		);
	}
);

/**
 * Default Props.
 */
RegularButton.defaultProps = {
	as: 'button',
	type: 'button',
	href: '#',
	intent: 'primary',
	loading: false,
	disabled: false,
	children: '',
	fullWidth: false,
	className: '',
	startIcon: null,
	endIcon: null,
};

/**
 * Prop Types.
 */
RegularButton.propTypes = {
	as: PropTypes.oneOf(['button', 'anchor']),
	type: PropTypes.string,
	href: PropTypes.string,
	intent: PropTypes.oneOf([
		'primary',
		'dark',
		'light',
		'success',
		'warning',
		'error',
		'primary-ghost',
		'dark-ghost',
		'light-ghost',
		'success-ghost',
		'warning-ghost',
		'error-ghost',
	]),
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	children: PropTypes.node,
	fullWidth: PropTypes.bool,
	className: PropTypes.string,
	startIcon: PropTypes.elementType,
	endIcon: PropTypes.elementType,
};

export default RegularButton;
