import PropTypes from 'prop-types';
import Rating from '@ui/data-entry/Rating';
import { clsx } from 'clsx';

/**
 * Render the ProductContRating component.
 *
 * @return {Element} The ProductContRating component.
 */
const ProductContRating = ({ rating, reviewsCount, className, ...props }) => (
	<div className={clsx('flex items-center space-x-2', className)} {...props}>
		<Rating value={rating} readOnly className="max-w-[80px] sm:max-w-[100px]" />
		<div className="flex items-center space-x-px text-xs text-neutral-500 leading-none">
			<span>&#40;</span>
			<span className="flex items-center space-x-1">
				<span>
					{reviewsCount === 0 && `No reviews yet`}
					{reviewsCount === 1 && `${reviewsCount} User Review`}
					{reviewsCount > 1 && `${reviewsCount} User Reviews`}
				</span>
			</span>
			<span>&#41;</span>
		</div>
	</div>
);

/**
 * Default Props.
 */
ProductContRating.defaultProps = {
	rating: 0,
	reviewsCount: 0,
	className: '',
};

/**
 * Prop Types.
 */
ProductContRating.propTypes = {
	rating: PropTypes.number,
	reviewsCount: PropTypes.number,
	className: PropTypes.string,
};

export default ProductContRating;
