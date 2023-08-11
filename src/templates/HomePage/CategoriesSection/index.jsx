import PropTypes from 'prop-types';
import Carousel from '@ui/general/Carousel';
import CategoryItem from '@templates/HomePage/CategoriesSection/CategoryItem';
import clsx from 'clsx';

/**
 * Render the CategoriesSection component.
 *
 * @return {Element} The CategoriesSection component.
 */
const CategoriesSection = ({ title, collection, hidden, className, ...props }) => {
	const breakpoints = [
		{
			breakpoint: 320,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 425,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 576,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 3,
			},
		},
	];

	return (
		<section className={clsx('py-10 xl:py-14', className)} {...props}>
			<h2 className="text-center text-base md:text-lg text-neutral-900 font-medium capitalize leading-tight tracking-widest">
				{title}
			</h2>
			<div className="mt-8">
				<Carousel slidesToShow={6} slidesToScroll={3} breakpoints={breakpoints}>
					{collection?.map((category) => (
						<div key={category?.id} className="">
							<CategoryItem data={category} />
						</div>
					))}
				</Carousel>
			</div>
		</section>
	);
};

/**
 * Default Props.
 */
CategoriesSection.defaultProps = {
	title: 'Categories',
	collection: [],
	hidden: false,
	className: '',
};

/**
 * Prop Types.
 */
CategoriesSection.propTypes = {
	title: PropTypes.string,
	collection: PropTypes.arrayOf(PropTypes.shape({})),
	hidden: PropTypes.bool,
	className: PropTypes.string,
};

export default CategoriesSection;
