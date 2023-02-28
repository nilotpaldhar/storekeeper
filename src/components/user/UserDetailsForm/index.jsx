import PropTypes from 'prop-types';

/** Components. */
import TextField from '@ui/data-entry/TextField';
import RegularButton from '@ui/buttons/RegularButton';

/** Hooks. */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserAbout } from '@store/slices/user/user.selectors';

/**
 * Render the UserDetailsForm component.
 *
 * @return {Element} The UserDetailsForm component.
 */
const UserDetailsForm = ({ onSubmit }) => {
	const user = useSelector(selectUserAbout);

	/** Form fields. */
	const [firstname, setFirstname] = useState(user?.firstname || '');
	const [lastname, setLastname] = useState(user?.lastname || '');
	const [email, setEmail] = useState(user?.email || '');
	const [phone, setPhone] = useState(user?.phone || '');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onSubmit({ firstname, lastname, phone });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col space-y-6">
				<div className="flex flex-col space-y-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-5">
					<TextField
						required
						type="text"
						id="firstname"
						label="First Name"
						value={firstname}
						onChange={(evt) => setFirstname(evt.target.value)}
					/>
					<TextField
						type="text"
						id="lastname"
						label="Last Name"
						value={lastname}
						onChange={(evt) => setLastname(evt.target.value)}
					/>
				</div>
				<TextField
					readOnly
					required
					id="email"
					type="email"
					label="Email"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
				<TextField
					id="phone"
					type="text"
					label="Phone"
					value={phone}
					onChange={(evt) => setPhone(evt.target.value)}
				/>
				<RegularButton type="submit" className="px-10 max-w-max">
					Save Changes
				</RegularButton>
			</div>
		</form>
	);
};

/**
 * Default Props.
 */
UserDetailsForm.defaultProps = {
	onSubmit: () => {},
};

/**
 * Prop Types.
 */
UserDetailsForm.propTypes = {
	onSubmit: PropTypes.func,
};

export default UserDetailsForm;
