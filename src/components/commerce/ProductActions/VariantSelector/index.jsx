import PropTypes from 'prop-types';
import Radio from '@ui/data-entry/Radio';
import styles, { labelStyles, optionsStyles } from './styles.cva';

/**
 * Render the VariantSelector component.
 *
 * @return {Element} The VariantSelector component.
 */
const VariantSelector = ({ id, label, options, disabled, orientation, onValueChange }) => (
	<div className={styles({ orientation })}>
		<div className={labelStyles({ orientation })}>
			<span className="block text-sm leading-tight font-semibold">{label}:</span>
		</div>
		{options?.length > 0 && (
			<div className={optionsStyles({ orientation })}>
				<Radio
					id={id}
					className="flex-wrap !space-x-0 gap-2"
					onValueChange={onValueChange}
					disabled={disabled}
				>
					{options?.map((option) => (
						<Radio.Box key={option?.id} id={option?.id} value={option?.id}>
							{option?.name}
						</Radio.Box>
					))}
				</Radio>
			</div>
		)}
	</div>
);

/**
 * Default Props.
 */
VariantSelector.defaultProps = {
	options: [],
	disabled: false,
	orientation: 'vertical',
	onValueChange: () => {},
};

/**
 * Prop Types.
 */
VariantSelector.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
	disabled: PropTypes.bool,
	orientation: PropTypes.oneOf(['vertical', 'horizontal']),
	onValueChange: PropTypes.func,
};

export default VariantSelector;
