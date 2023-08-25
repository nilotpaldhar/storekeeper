import PropTypes from 'prop-types';
import Image from '@ui/data-display/Image';
import defaultImage from '@public/empty.svg';
import { clsx } from 'clsx';

/**
 * Render the Empty component.
 *
 * @return {Element} The Empty component.
 */
const Empty = ({
	title,
	description,
	imgSrc,
	imgProps,
	children,
	className,
	classNames,
	...props
}) => (
	<div className={clsx('flex flex-col items-center text-neutral-900', className)} {...props}>
		<div className={clsx('mb-6', classNames.imageWrapper)}>
			<Image src={imgSrc} className={clsx('block', classNames.image)} {...imgProps} />
		</div>
		<div className={clsx('text-center max-w-md', classNames.contentWrapper)}>
			<div className={clsx('text-lg font-bold leading-normal', classNames.title)}>{title}</div>
			{description && (
				<div className={clsx('text-sm font-light leading-relaxed mt-2', classNames.description)}>
					{description}
				</div>
			)}
			{children && (
				<div className={clsx('leading-relaxed mt-6', classNames.content)}>{children}</div>
			)}
		</div>
	</div>
);

/**
 * Default Props.
 */
Empty.defaultProps = {
	title: 'No data found',
	description: '',
	imgSrc: defaultImage,
	imgProps: {
		alt: 'empty',
	},
	children: '',
	className: '',
	classNames: {
		imageWrapper: '',
		image: '',
		contentWrapper: '',
		title: '',
		description: '',
		content: '',
	},
};

/**
 * Prop Types.
 */
Empty.propTypes = {
	title: PropTypes.node,
	description: PropTypes.node,
	imgSrc: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	imgProps: PropTypes.shape({}),
	children: PropTypes.node,
	className: PropTypes.string,
	classNames: PropTypes.shape({
		imageWrapper: PropTypes.string,
		image: PropTypes.string,
		contentWrapper: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		content: PropTypes.string,
	}),
};

export default Empty;
