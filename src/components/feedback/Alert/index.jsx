import PropTypes from 'prop-types';

/** Component Styles. */
import CheckIcon from '@icons/regular/Check';
import CloseIcon from '@icons/regular/Close';
import ExclamationIcon from '@icons/regular/Exclamation';

/** Hooks. */
import useToggle from '@hooks/useToggle';

/** Component Styles. */
import styles, { iconStyles, contentStyles, btnStyles } from '@ui/feedback/Alert/styles.cva';

/**
 * Render the Alert component.
 *
 * @return {Element} The Alert component.
 */
const Alert = ({ type, closable, align, children, className, contentClassName }) => {
	const [show, toggle] = useToggle(true);

	return show ? (
		<div className={styles({ className, type, closable, align })} role="alert">
			{type === 'info' && (
				<span aria-label="exclamation-circle" className={iconStyles({ type })}>
					<ExclamationIcon role="img" className="!text-xs" />
				</span>
			)}
			{type === 'success' && (
				<span aria-label="check-circle" className={iconStyles({ type })}>
					<CheckIcon role="img" className="!text-xs" />
				</span>
			)}
			{type === 'warning' && (
				<span aria-label="exclamation-circle" className={iconStyles({ type })}>
					<ExclamationIcon role="img" className="!text-xs" />
				</span>
			)}
			{type === 'error' && (
				<span aria-label="close-circle" className={iconStyles({ type })}>
					<CloseIcon role="img" className="!text-xs" />
				</span>
			)}
			<div className={contentStyles({ className: contentClassName })}>{children}</div>
			{closable && (
				<button type="button" tabIndex="0" className={btnStyles()} onClick={toggle}>
					<CloseIcon role="img" aria-label="close" className="!text-base" />
				</button>
			)}
		</div>
	) : null;
};

/**
 * Default Props.
 */
Alert.defaultProps = {
	type: 'info',
	closable: false,
	align: 'left',
	children: '',
	className: '',
	contentClassName: '',
};

/**
 * Prop Types.
 */
Alert.propTypes = {
	type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
	closable: PropTypes.bool,
	align: PropTypes.oneOf(['left', 'center', 'right']),
	children: PropTypes.node,
	className: PropTypes.string,
	contentClassName: PropTypes.string,
};

export default Alert;
