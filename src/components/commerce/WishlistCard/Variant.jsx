import PropTypes from 'prop-types';
import Radio from '@ui/data-entry/Radio';

/**
 * Render the WishlistCardVariant component.
 *
 * @return {Element} The WishlistCardVariant component.
 */
const WishlistCardVariant = ({ id, label, options, disabled, onValueChange }) => (
	<div className="flex flex-col space-y-2 pb-1">
		<p className="text-sm leading-tight font-semibold">{label}:</p>
		{options?.length > 0 && (
			<div className="flex-1">
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
WishlistCardVariant.defaultProps = {
	options: [],
	disabled: false,
	onValueChange: () => {},
};

/**
 * Prop Types.
 */
WishlistCardVariant.propTypes = {
	disabled: PropTypes.bool,
	onValueChange: PropTypes.func,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
		})
	),
};

export default WishlistCardVariant;
