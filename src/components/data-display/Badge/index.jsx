import PropTypes from 'prop-types';
import styles from '@ui/data-display/Badge/styles.cva';

/**
 * Render the Badge component.
 *
 * @return {Element} The Badge component.
 */
const Badge = ({ count, overflowCount, size, offset, variant, className, children, ...props }) => {
	const isOverflowing = count > overflowCount;
	const singleDigit = !isOverflowing && count < 10;
	const countStr = isOverflowing ? `${overflowCount}+` : `${count}`;

	return (
		<span className={styles.root({ className })} {...props}>
			{children}
			{count > 0 && (
				<sup
					title={count}
					className={styles.count({ size, variant, singleDigit })}
					style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
				>
					{countStr}
				</sup>
			)}
		</span>
	);
};

/**
 * Default Props.
 */
Badge.defaultProps = {
	count: 0,
	overflowCount: 99,
	size: 'md',
	variant: 'primary',
	offset: { x: -10, y: -10 },
	className: '',
	children: '',
};

/**
 * Prop Types.
 */
Badge.propTypes = {
	count: PropTypes.number,
	overflowCount: PropTypes.number,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	variant: PropTypes.oneOf(['primary', 'neutral', 'success', 'warning', 'error']),
	offset: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Badge;
