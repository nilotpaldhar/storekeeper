import PropTypes from 'prop-types';

/** Components. */
import ProductCollection from '@ui/commerce/ProductCollection';

/** Helpers. */
import clsx from 'clsx';
import { createPermalink } from '@utils/product/permalink';

/** Creates products collection href. */
const createHref = (type, data = {}) => {
	const prefix = '/product';

	if (type === 'product') {
		const permalink = createPermalink(data?.id, data?.slug);
		return `${prefix}/${permalink}`;
	}

	if (type === 'category') {
		return `${prefix}/collection/${data?.slug}?query=${data?.slug}`;
	}

	return null;
};

/**
 * Render the CollectionSection component.
 *
 * @return {Element} The CollectionSection component.
 */
const CollectionSection = ({
	collection,
	showTitle,
	as: Component,
	className,
	collectionClassName,
	...props
}) => {
	const collectionHref = createHref(collection?.link?.type, {
		id: collection?.link?.checId,
		slug: collection?.link?.slug,
	});

	if (collection.hidden) return null;

	return (
		<Component className={clsx('py-10 xl:py-14', className)} {...props}>
			<ProductCollection
				products={collection.products ?? []}
				wrapperClassName={clsx(
					'!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 xxl:!grid-cols-5',
					collectionClassName
				)}
			>
				{showTitle && (
					<ProductCollection.Title as="h2" href={collectionHref} className="mb-8">
						{collection.title ? collection.title : ''}
					</ProductCollection.Title>
				)}
			</ProductCollection>
		</Component>
	);
};

/**
 * Default Props.
 */
CollectionSection.defaultProps = {
	showTitle: true,
	as: 'section',
	className: '',
	collectionClassName: '',
};

/**
 * Prop Types.
 */
CollectionSection.propTypes = {
	collection: PropTypes.shape({
		title: PropTypes.string,
		hidden: PropTypes.bool,
		link: PropTypes.shape({
			type: PropTypes.string,
			slug: PropTypes.string,
			checId: PropTypes.string,
		}),
		products: PropTypes.arrayOf(PropTypes.shape({})),
	}).isRequired,
	showTitle: PropTypes.bool,
	as: PropTypes.node,
	className: PropTypes.string,
	collectionClassName: PropTypes.string,
};

export default CollectionSection;
