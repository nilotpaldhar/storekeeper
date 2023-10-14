import * as Yup from 'yup';
import { validateCardNum, validateCardExpiry } from '@utils/checkout/validateCard';

const schema = Yup.object({
	holderName: Yup.string().required('Card holder name is required'),

	cardNumber: Yup.string()
		.required('Card number is required')
		.min(16, 'Card number length is incorrect')
		.max(16, 'Card number length is incorrect')
		.test('is-valid-card-number', 'Card number is invalid', (cardNum) => validateCardNum(cardNum)),

	expiry: Yup.string()
		.required('Expiry date is required')
		.min(7, 'Expiry date length is incorrect')
		.test('is-valid-expiry-date', 'Expiry date is invalid', (expiryDate) => {
			const [month, year] = expiryDate?.split('/')?.map(Number) ?? [];
			return validateCardExpiry(month, year);
		}),

	cvvNumber: Yup.string()
		.required('CVV / CVC is required')
		.min(3, 'CVV / CVC length is incorrect')
		.max(4, 'CVV / CVC length is incorrect'),
});

export default schema;
