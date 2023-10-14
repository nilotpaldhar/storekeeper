import PropTypes from 'prop-types';
import Checkbox from '@ui/data-entry/Checkbox';
import { useFormContext, Controller } from 'react-hook-form';

/**
 * Render the RHFCheckbox component.
 *
 * @return {Element} The RHFCheckbox component.
 */
const RHFCheckbox = ({ id, name, ...props }) => {
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
				<Checkbox
					id={id}
					{...rest}
					defaultChecked={!!rest.value}
					onCheckedChange={handleValueChange}
					{...props}
				/>
			)}
		/>
	);
};

/**
 * Prop Types.
 */
RHFCheckbox.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default RHFCheckbox;
