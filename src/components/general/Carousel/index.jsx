import PropTypes from 'prop-types';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';

/**
 * Render the Carousel component.
 *
 * @return {Element} The Carousel component.
 */
const Carousel = ({
	speed,
	dots,
	arrows,
	infinite,
	slidesToShow,
	slidesToScroll,
	breakpoints,
	children,
	...props
}) => (
	<SlickSlider
		speed={speed}
		dots={dots}
		arrows={arrows}
		infinite={infinite}
		slidesToShow={slidesToShow}
		slidesToScroll={slidesToScroll}
		responsive={breakpoints}
		{...props}
	>
		{children}
	</SlickSlider>
);

/**
 * Default Props.
 */
Carousel.defaultProps = {
	speed: 600,
	dots: false,
	arrows: false,
	infinite: false,
	slidesToShow: 1,
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
	slidesToShow: PropTypes.number,
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
