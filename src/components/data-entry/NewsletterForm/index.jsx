import PropTypes from 'prop-types';
import { useState } from 'react';
import RegularButton from '@ui/buttons/RegularButton';
import toast from 'react-hot-toast';

/**
 * Render the NewsletterForm component.
 *
 * @return {Element} The NewsletterForm component.
 */
const NewsletterForm = ({ className, classNames, translate, ...props }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	/** Submit Handler. */
	const handleSubmit = (evt) => {
		evt.preventDefault();
		setEmail('');
		setLoading(true);

		/** TODO: Capture user email. */
		setTimeout(() => {
			setLoading(false);
			toast.success('You have been subscribed to our newsletter successfully.');
		}, 3000);
	};

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className={classNames.form} {...props}>
				<input
					required
					type="email"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
					placeholder={translate.inputPlaceholder}
					className={classNames.input}
				/>
				<RegularButton type="submit" loading={loading} className={classNames.submit}>
					{translate.submit}
				</RegularButton>
			</form>
		</div>
	);
};

/**
 * Default Props.
 */
NewsletterForm.defaultProps = {
	className: '',
	classNames: {
		form: '',
		input: '',
		submit: '',
	},
	translate: {
		inputPlaceholder: 'Your Email Address',
		submit: 'Subscribe Now',
	},
};

/**
 * Prop Types.
 */
NewsletterForm.propTypes = {
	className: PropTypes.string,
	classNames: PropTypes.shape({
		form: PropTypes.string,
		input: PropTypes.string,
		submit: PropTypes.string,
	}),
	translate: PropTypes.shape({
		inputPlaceholder: PropTypes.string,
		submit: PropTypes.node,
	}),
};

export default NewsletterForm;
