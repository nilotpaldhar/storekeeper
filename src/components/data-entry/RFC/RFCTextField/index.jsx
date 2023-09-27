import PropTypes from 'prop-types';
import TextField from '@ui/data-entry/TextField';
import { useFormContext } from 'react-hook-form';

/**
 * Render the RFCTextField component.
 *
 * @return {Element} The RFCTextField component.
 */
const RFCTextField = ({ name, ...props }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return <TextField {...register(name)} error={errors[name]?.message} {...props} />;
};

/**
 * Prop Types.
 */
RFCTextField.propTypes = {
	name: PropTypes.string.isRequired,
};

export default RFCTextField;
