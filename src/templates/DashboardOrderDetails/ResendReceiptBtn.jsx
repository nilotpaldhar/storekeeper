import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import RegularButton from '@ui/buttons/RegularButton';
import DownloadIcon from '@icons/regular/Download';

/**
 * Render the Badge component.
 *
 * @return {Element} The Badge component.
 */
const ResendReceiptBtn = ({ id, ...props }) => {
	const [loading, setLoading] = useState(false);

	const resendReceipt = async () => {
		setLoading(true);

		try {
			await axios.post('/api/user/orders/resend-receipt', { id });
			toast.success('The receipt has been sent successfully');
		} catch (error) {
			const message = error?.response?.data?.error;
			toast.error(message || 'The receipt could not be sent successfully.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<RegularButton
			fullWidth
			intent="dark-ghost"
			startIcon={DownloadIcon}
			loading={loading}
			onClick={() => resendReceipt(id)}
			className="border border-neutral-200 border-dashed"
			{...props}
		>
			Resend Receipt
		</RegularButton>
	);
};

/**
 * Prop Types.
 */
ResendReceiptBtn.propTypes = {
	id: PropTypes.string.isRequired,
};

export default ResendReceiptBtn;
