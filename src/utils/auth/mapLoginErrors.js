import isEmpty from 'lodash-es/isEmpty';

/** Maps login errors by type. */
const mapLoginErrors = (errorType) => {
	if (isEmpty(errorType)) return null;

	if (errorType === 'Callback') {
		return 'Try login in with a different account.';
	}

	if (errorType === 'OAuthAccountNotLinked') {
		return 'To confirm your identity, sign in with the same account you used originally.';
	}

	if (errorType === 'EmailSignin') {
		return 'The e-mail could not be sent.';
	}

	if (errorType === 'EmailSignin') {
		return 'The e-mail could not be sent.';
	}

	if (errorType === 'CredentialsSignin') {
		return 'Sign in failed. Check the details you provided are correct.';
	}

	if (errorType === 'SessionRequired') {
		return 'Please login to access this page.';
	}

	if (
		[
			'OAuthSignin',
			'OAuthCallback',
			'OAuthCreateAccount',
			'EmailCreateAccount',
			'Callback',
		].includes(errorType)
	) {
		return 'Try login in with a different account.';
	}

	return 'Unable to login. Please try again.';
};

export default mapLoginErrors;
