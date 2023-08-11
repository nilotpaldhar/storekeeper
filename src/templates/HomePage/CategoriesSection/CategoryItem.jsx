import PropTypes from 'prop-types';
import Anchor from '@ui/general/Anchor';
import Image from '@ui/data-display/Image';
import clsx from 'clsx';

/**
 * Render the CategoryItem component.
 *
 * @return {Element} The CategoryItem component.
 */
const CategoryItem = ({ data }) => {
	const imgUrl = data?.image?.url ?? '/placeholder.png';
	const href = `/product/collection/${data?.slug}?query=${data?.slug}`;

	return (
		<div className="mx-4 my-2">
			<Anchor
				href={href}
				className={clsx(
					'w-full flex flex-col items-center text-center overflow-hidden',
					'focus-visible:outline-dashed focus-visible:outline-offset-2 focus-visible:outline-2'
				)}
			>
				<Image src={imgUrl} alt={data?.title} width={130} height={130} className="block mb-2" />
				<h3
					className="text-sm font-medium text-neutral-900 truncate w-full px-2"
					title={data?.title}
				>
					{data?.title}
				</h3>
			</Anchor>
		</div>
	);
};

/**
 * Prop Types.
 */
CategoryItem.propTypes = {
	data: PropTypes.shape({
		title: PropTypes.string,
		slug: PropTypes.string,
		image: PropTypes.shape({
			url: PropTypes.string,
		}),
	}).isRequired,
};

export default CategoryItem;
