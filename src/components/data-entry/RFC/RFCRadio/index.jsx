import PropTypes from 'prop-types';
import Radio from '@ui/data-entry/Radio';
import { useFormContext, Controller } from 'react-hook-form';

/**
 * Render the RFCRadio component.
 *
 * @return {Element} The RFCRadio component.
 */
const RFCRadio = ({ name, options, ...props }) => {
	const { control, setValue } = useFormContext();

	const handleValueChange = (val) => {
		setValue(name, val, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, ...rest } }) => (
				<Radio {...rest} onValueChange={handleValueChange} {...props}>
					{options?.map((option) => (
						<Radio.Item key={option?.id} id={option?.id} {...option} />
					))}
				</Radio>
			)}
		/>
	);
};

/**
 * Prop Types.
 */
RFCRadio.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default RFCRadio;
