import PropTypes from 'prop-types';
import Select from '@ui/data-entry/Select';
import { useFormContext, Controller } from 'react-hook-form';

/**
 * Render the RHFSelect component.
 *
 * @return {Element} The RHFSelect component.
 */
const RHFSelect = ({ id, name, options, ...props }) => {
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();

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
				<Select
					id={id}
					error={errors[name]?.message}
					{...rest}
					onValueChange={handleValueChange}
					{...props}
				>
					{options?.map((option) => (
						<Select.Item key={option?.id} id={option?.id} {...option}>
							{option?.content}
						</Select.Item>
					))}
				</Select>
			)}
		/>
	);
};

/**
 * Default Props.
 */
RHFSelect.defaultProps = {
	options: [],
};

/**
 * Prop Types.
 */
RHFSelect.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			content: PropTypes.node,
		})
	),
};

export default RHFSelect;
