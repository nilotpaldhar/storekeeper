import PropTypes from 'prop-types';
import Radio from '@ui/data-entry/Radio';

/**
 * Render the ProductContVariant component.
 *
 * @return {Element} The ProductContVariant component.
 */
const ProductContVariant = ({ id, label, options, disabled, onValueChange }) => (
	<div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-2">
		<span className="block sm:w-28 text-sm leading-tight font-semibold shrink-0 sm:py-1.5">
			{label}:
		</span>
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
ProductContVariant.defaultProps = {
	options: [],
	disabled: false,
	onValueChange: () => {},
};

/**
 * Prop Types.
 */
ProductContVariant.propTypes = {
	disabled: PropTypes.bool,
	onValueChange: PropTypes.func,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
};

export default ProductContVariant;
