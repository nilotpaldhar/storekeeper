import PropTypes from 'prop-types';
import TextField from '@ui/data-entry/TextField';
import { useFormContext } from 'react-hook-form';

/**
 * Render the RHFTextField component.
 *
 * @return {Element} The RHFTextField component.
 */
const RHFTextField = ({ name, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return <TextField {...register(name)} error={errors[name]?.message} {...props} />;
};

/**
 * Prop Types.
 */
RHFTextField.propTypes = {
	name: PropTypes.string.isRequired,
};

export default RHFTextField;
