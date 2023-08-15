import PropTypes from 'prop-types';
import { useState } from 'react';

import Carousel from '@ui/general/Carousel';
import Container from '@ui/general/Container';
import BannerItem from '@ui/commerce/BannerSlider/BannerItem';
import SliderController from '@ui/commerce/BannerSlider/SliderController';

/**
 * Render the BannerSlider component.
 *
 * @return {Element} The BannerSlider component.
 */
const BannerSlider = ({ items }) => {
	const [sliderRef, setSliderRef] = useState(null);
	const [slideIndex, setSlideIndex] = useState(0);
	const totalSlides = items?.length ? items.length - 1 : 0;

	const settings = {
		ref: setSliderRef,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear',
		beforeChange: (_, next) => setSlideIndex(next),
	};

	return (
		<div className="relative">
			<Carousel {...settings}>
				{items.map((item) => (
					<div key={item.id}>
						<BannerItem data={item} />
					</div>
				))}
			</Carousel>
			<div className="absolute top-[10%] w-full hidden lg:block">
				<Container>
					<SliderController
						value={[slideIndex]}
						maxSlides={totalSlides}
						onValueChange={(val) => sliderRef?.slickGoTo(val[0])}
					/>
				</Container>
			</div>
		</div>
	);
};

/**
 * Default Props.
 */
BannerSlider.defaultProps = {
	items: [],
};

/**
 * Prop Types.
 */
BannerSlider.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
		})
	),
};

export default BannerSlider;
