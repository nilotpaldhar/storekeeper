import PropTypes from 'prop-types';
import { signIn } from 'next-auth/react';

/** Components. */
import RegularButton from '@ui/buttons/RegularButton';

/** Helpers. */
import mapSocialIcons from '@utils/general/mapSocialIcons';

/** Component Styles. */
import styles from '@ui/buttons/AuthButton/styles.cva';

/**
 * Render the AuthButton component.
 *
 * @return {Element} The AuthButton component.
 */
const AuthButton = ({ id, name, callbackUrl, className, ...props }) => {
	const Icon = mapSocialIcons(id);
	const providerIcons = ['google', 'facebook', 'twitter', 'instagram', 'github', 'linkedin'];
	const provider = providerIcons.includes(id) ? id : 'none';

	return (
		<RegularButton
			fullWidth
			startIcon={Icon}
			className={styles({ className, provider })}
			onClick={() => signIn(id, { callbackUrl })}
			{...props}
		>
			<span className="inline-block">{name}</span>
		</RegularButton>
	);
};

/**
 * Default Props.
 */
AuthButton.defaultProps = {
	id: null,
	name: null,
	callbackUrl: '/dashboard',
	className: '',
};

/**
 * Prop Types.
 */
AuthButton.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	callbackUrl: PropTypes.string,
	className: PropTypes.string,
};

export default AuthButton;
