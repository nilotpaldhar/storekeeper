import PropTypes from 'prop-types';
import * as Controller from '@radix-ui/react-slider';
import styles, {
	indicators,
	controller,
	track,
	range,
	thumb,
} from '@ui/commerce/BannerSlider/SliderController/styles.cva';

/**
 * Render the SliderController component.
 *
 * @return {Element} The SliderController component.
 */
const SliderController = ({
	step,
	value,
	maxSlides,
	orientation,
	onValueChange,
	className,
	...props
}) => {
	const start = value[0] < 10 ? `0${value[0] + 1}` : value[0] + 1;
	const end = maxSlides < 10 ? `0${maxSlides + 1}` : maxSlides + 1;

	return (
		<div className={styles({ className, orientation })}>
			<span className={indicators()}>{start}</span>
			<div>
				<Controller.Root
					step={step}
					value={value}
					max={maxSlides}
					orientation={orientation}
					onValueChange={onValueChange}
					minStepsBetweenThumbs={1}
					inverted={orientation === 'vertical'}
					className={controller({ orientation })}
					{...props}
				>
					<Controller.Track className={track({ orientation })}>
						<Controller.Range className={range({ orientation })} />
					</Controller.Track>
					<Controller.Thumb className={thumb({ orientation })} />
				</Controller.Root>
			</div>
			<span className={indicators()}>{end}</span>
		</div>
	);
};

/**
 * Default Props.
 */
SliderController.defaultProps = {
	step: 1,
	maxSlides: 0,
	orientation: 'horizontal',
	className: '',
};

/**
 * Prop Types.
 */
SliderController.propTypes = {
	step: PropTypes.number,
	maxSlides: PropTypes.number,
	orientation: PropTypes.oneOf(['horizontal', 'vertical']),
	value: PropTypes.arrayOf(PropTypes.number).isRequired,
	onValueChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default SliderController;
