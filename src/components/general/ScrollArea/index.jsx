import PropTypes from 'prop-types';
import { Root, Viewport, Scrollbar, Thumb, Corner } from '@radix-ui/react-scroll-area';
import clsx from 'clsx';

/**
 * Render the ScrollArea component.
 *
 * @return {Element} The ScrollArea component.
 */
const ScrollArea = ({ width, height, thumbSize, type, delay, children, className }) => {
	const rootStyles = {
		width: width ? `${width}px` : 'auto',
		height: height ? `${height}px` : 'auto',
	};

	/** ClassNames. */
	const scrollbarClassNames =
		'p-x flex bg-neutral-100 select-none touch-none hover:bg-neutral-100 transition-colors duration-150';
	const thumbClassNames = 'relative flex-1 bg-neutral-200';

	return (
		<Root
			type={type}
			style={rootStyles}
			scrollHideDelay={delay}
			className={clsx('overflow-hidden', className)}
		>
			<Viewport className="w-full h-full">{children}</Viewport>
			<Scrollbar
				orientation="vertical"
				style={{ width: `${thumbSize}px` }}
				className={clsx(scrollbarClassNames)}
			>
				<Thumb className={thumbClassNames} />
			</Scrollbar>
			<Scrollbar
				orientation="horizontal"
				style={{ height: `${thumbSize}px` }}
				className={clsx(scrollbarClassNames, 'flex-col')}
			>
				<Thumb className={thumbClassNames} />
			</Scrollbar>
			<Corner className="bg-neutral-200" />
		</Root>
	);
};

/**
 * Default Props.
 */
ScrollArea.defaultProps = {
	width: null,
	height: null,
	thumbSize: 4,
	type: 'hover',
	delay: 400,
	children: '',
	className: '',
};

/**
 * Prop Types.
 */
ScrollArea.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(null)]),
	thumbSize: PropTypes.number,
	type: PropTypes.oneOf(['auto', 'always', 'scroll', 'hover']),
	delay: PropTypes.number,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default ScrollArea;
