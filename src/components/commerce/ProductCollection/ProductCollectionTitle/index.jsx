import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import ArrowRightIcon from '@icons/regular/ArrowRight';
import styles, {
	titleStyles,
	linkStyles,
} from '@ui/commerce/ProductCollection/ProductCollectionTitle/styles.cva';

/**
 * Render the ProductCollectionTitle component.
 *
 * @return {Element} The ProductCollectionTitle component.
 */
const ProductCollectionTitle = ({
	as: Component,
	linkText,
	href,
	align,
	className,
	children,
	...props
}) => (
	<div className={styles({ className, align })} {...props}>
		<Component className={titleStyles({ align, highlight: !!href })}>{children}</Component>
		{href && (
			<Anchor href={href} className={linkStyles()}>
				<span>{linkText}</span>
				<ArrowRightIcon className="!text-xs" />
			</Anchor>
		)}
	</div>
);

/**
 * Default Props.
 */
ProductCollectionTitle.defaultProps = {
	as: 'h1',
	linkText: 'View More',
	href: null,
	align: 'default',
	className: '',
	children: '',
};

/**
 * Prop Types.
 */
ProductCollectionTitle.propTypes = {
	as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
	linkText: PropTypes.node,
	href: PropTypes.string,
	align: PropTypes.oneOf(['default', 'left', 'right', 'center']),
	className: PropTypes.string,
	children: PropTypes.node,
};

export default ProductCollectionTitle;
