import PropTypes from 'prop-types';
import Select from '@ui/data-entry/Select';

/**
 * Render the ProductContVariant component.
 *
 * @return {Element} The ProductContVariant component.
 */
const ProductContVariant = ({ id, label, options }) => (
	<div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
		<span className="block sm:w-[128px] text-sm leading-tight font-semibold shrink-0">
			{label}:
		</span>
		{options?.length > 0 && (
			<div className="flex-1">
				<Select id={id}>
					{options?.map((option) => (
						<Select.Item key={option?.id} value={option?.name}>
							{option?.name}
						</Select.Item>
					))}
				</Select>
			</div>
		)}
	</div>
);

/**
 * Default Props.
 */
ProductContVariant.defaultProps = {
	options: [],
};

/**
 * Prop Types.
 */
ProductContVariant.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
};

export default ProductContVariant;
