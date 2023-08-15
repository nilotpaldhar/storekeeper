import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';

/**
 * Render the Carousel component.
 *
 * @return {Element} The Carousel component.
 */
const Carousel = forwardRef(
	(
		{
			speed,
			dots,
			arrows,
			infinite,
			autoplay,
			slidesToShow,
			autoplaySpeed,
			slidesToScroll,
			breakpoints,
			children,
			...props
		},
		forwardedRef
	) => (
		<SlickSlider
			ref={forwardedRef}
			speed={speed}
			dots={dots}
			arrows={arrows}
			infinite={infinite}
			autoplay={autoplay}
			slidesToShow={slidesToShow}
			autoplaySpeed={autoplaySpeed}
			slidesToScroll={slidesToScroll}
			responsive={breakpoints}
			{...props}
		>
			{children}
		</SlickSlider>
	)
);

/**
 * Default Props.
 */
Carousel.defaultProps = {
	speed: 600,
	dots: false,
	arrows: false,
	infinite: false,
	autoplay: false,
	slidesToShow: 1,
	autoplaySpeed: 1000,
	slidesToScroll: 1,
	breakpoints: [],
	children: '',
};

/**
 * Prop Types.
 */
Carousel.propTypes = {
	speed: PropTypes.number,
	dots: PropTypes.bool,
	arrows: PropTypes.bool,
	infinite: PropTypes.bool,
	autoplay: PropTypes.bool,
	slidesToShow: PropTypes.number,
	autoplaySpeed: PropTypes.number,
	slidesToScroll: PropTypes.number,
	breakpoints: PropTypes.arrayOf(
		PropTypes.shape({
			breakpoint: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
			settings: PropTypes.shape({}),
		})
	),
	children: PropTypes.node,
};

export default Carousel;
