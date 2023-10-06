import PropTypes from 'prop-types';
import Box from '@ui/data-display/Box';
import DashIcon from '@icons/regular/Dash';

/**
 * Render the AddressSummary component.
 *
 * @return {Element} The AddressSummary component.
 */
const AddressSummary = ({ title, customer, address, ...props }) => {
	const { firstname, lastname, email, phone } = customer;
	const { street, street2, townCity, state, zip, country } = address;

	return (
		<Box {...props}>
			<Box.Title className="capitalize text-center">{title}</Box.Title>
			<Box.Block>
				<div className="text-neutral-900">
					<div className="flex flex-col space-y-3 items-center justify-center font-medium sm:flex-row sm:space-y-0">
						<div className="flex items-center sm:pr-5 sm:border-r sm:border-neutral-50">
							{firstname || lastname ? (
								<div className="flex items-center space-x-1">
									<span>{firstname}</span>
									<span>{lastname}</span>
								</div>
							) : (
								<DashIcon />
							)}
						</div>
						<div className="flex items-center sm:px-5 sm:border-r sm:border-neutral-50">
							{phone || <DashIcon />}
						</div>
						<div className="flex items-center sm:pl-5">{email || <DashIcon />}</div>
					</div>
					<div className="text-center mt-4">
						<span>
							<span>{street}</span>
							{street2 && <span className="ml-1">{street2}</span>}&#44;
						</span>
						{townCity && <span className="ml-1">{townCity}&#44;</span>}
						<span className="ml-1">
							<span>{state}</span>
							<span className="ml-1">{zip}</span>&#44;
						</span>
						{country && <span className="ml-1">{country}</span>}
					</div>
				</div>
			</Box.Block>
		</Box>
	);
};
/**
 * Default Props.
 */
AddressSummary.defaultProps = {
	title: 'Your Address',
};

/**
 * Prop Types.
 */
AddressSummary.propTypes = {
	title: PropTypes.node,
	customer: PropTypes.shape({
		firstname: PropTypes.string,
		lastname: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
	}).isRequired,
	address: PropTypes.shape({
		street: PropTypes.string,
		street2: PropTypes.string,
		townCity: PropTypes.string,
		state: PropTypes.string,
		zip: PropTypes.string,
		country: PropTypes.string,
	}).isRequired,
};

export default AddressSummary;
