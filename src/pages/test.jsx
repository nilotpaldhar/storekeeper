import fetchPage from '@libs/general/dynamic-page/fetchPage';
import CheckoutSuccess from '@ui/commerce/CheckoutSuccess';
import Container from '@ui/general/Container';
import LayoutWrapper from '@ui/layouts/LayoutWrapper';

const lastOrder = {
	id: 'ord_aZWNoyaPmVo80J',
	status: 'open',
	sandbox: true,
	customer: {
		id: 'cstmr_yA6nldxg8LlEWb',
		external_id: null,
		firstname: 'John',
		lastname: 'Doe',
		email: 'john@example.test',
		phone: '0123456789',
		meta: [],
		created: 1695905541,
		updated: 1695905541,
	},
	statusPayment: 'paid',
	orderValue: {
		raw: 4153.73,
		formatted: '4,153.73',
		formattedWithCode: '4,153.73 USD',
		formattedWithSymbol: '$4,153.73',
	},
	order: {
		giftcard: [],
		total: {
			raw: 3873.62,
			formatted: '3,873.62',
			formattedWithCode: '3,873.62 USD',
			formattedWithSymbol: '$3,873.62',
		},
		subtotal: {
			raw: 4292.91,
			formatted: '4,292.91',
			formattedWithCode: '4,292.91 USD',
			formattedWithSymbol: '$4,292.91',
		},
		totalDue: {},
		totalWithTax: {
			raw: 4153.73,
			formatted: '4,153.73',
			formattedWithCode: '4,153.73 USD',
			formattedWithSymbol: '$4,153.73',
		},
		items: [
			{
				productId: 'prod_8XxzoBKnxK5PQA',
				id: 'item_r2LM5QQd9O5ZV1',
				tax: {
					is_taxable: true,
					amount: {
						raw: 4.11,
						formatted: '4.11',
						formatted_with_symbol: '$4.11',
						formatted_with_code: '4.11 USD',
					},
					taxable_amount: {
						raw: 62.97,
						formatted: '62.97',
						formatted_with_symbol: '$62.97',
						formatted_with_code: '62.97 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 4.11,
								formatted: '4.11',
								formatted_with_symbol: '$4.11',
								formatted_with_code: '4.11 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 62.97,
					formatted: '62.97',
					formattedWithCode: '62.97 USD',
					formattedWithSymbol: '$62.97',
				},
				image: {
					id: 'ast_DWy4oGOaYno6Jx',
					url: 'https://cdn.chec.io/merchants/46668/assets/Q9CvYhGQnl4uhXEC|headphone-02.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'headphone-02.png',
					fileSize: 43951,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 62.97,
					formatted: '62.97',
					formattedWithCode: '62.97 USD',
					formattedWithSymbol: '$62.97',
				},
				permalink: 'boult-audio-thunder-bluetooth-headset-bl-8XxzoBKnxK5PQA',
				selectedOptions: [
					{
						id: 'optn_kpnNwAqDxgwmXB',
						name: 'Black',
						group: {
							id: 'vgrp_gvRjwOP4mo4mNL',
							name: 'Color',
						},
					},
					{
						id: 'optn_ZM8X5nLVJJwpv4',
						name: 'Medium',
						group: {
							id: 'vgrp_RqEv5xxXd5Zz4j',
							name: 'Size',
						},
					},
				],
				variant: {
					id: 'vrnt_kpnNwADNgZlmXB',
					sku: 'HEA-1-B-M',
					description: null,
					price: {},
					assets: [],
				},
				name: 'Boult Audio Thunder Bluetooth Headset  (Black, On the Ear)',
				displayName: 'Boult Audio Thunder Bluetooth Headset  (Black, On the Ear)',
				inventory: {
					available: 10,
					isManaged: true,
				},
				slug: 'boult-audio-thunder-bluetooth-headset-bl',
			},
			{
				productId: 'prod_AYrQlWDBnnwnbR',
				id: 'item_NXELwjYZGgl3A4',
				tax: {
					is_taxable: true,
					amount: {
						raw: 3.85,
						formatted: '3.85',
						formatted_with_symbol: '$3.85',
						formatted_with_code: '3.85 USD',
					},
					taxable_amount: {
						raw: 59,
						formatted: '59.00',
						formatted_with_symbol: '$59.00',
						formatted_with_code: '59.00 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 3.85,
								formatted: '3.85',
								formatted_with_symbol: '$3.85',
								formatted_with_code: '3.85 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 59,
					formatted: '59.00',
					formattedWithCode: '59.00 USD',
					formattedWithSymbol: '$59.00',
				},
				image: {
					id: 'ast_Op1YoVZ9WdoXLv',
					url: 'https://cdn.chec.io/merchants/46668/assets/yQKxD3zmc1d2dnVa|speaker-02.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'speaker-02.png',
					fileSize: 52497,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 59,
					formatted: '59.00',
					formattedWithCode: '59.00 USD',
					formattedWithSymbol: '$59.00',
				},
				permalink: 'modget-wireless-with-built-in-microphone-AYrQlWDBnnwnbR',
				selectedOptions: [],
				variant: {
					price: {},
					assets: [],
				},
				name: 'MODGET Wireless with Built-in Microphone 20 W Bluetooth Soundbar  (Black, 2.0 Channel)',
				displayName:
					'MODGET Wireless with Built-in Microphone 20 W Bluetooth Soundbar  (Black, 2.0 Channel)',
				inventory: {
					available: 25,
					isManaged: true,
				},
				slug: 'modget-wireless-with-built-in-microphone',
			},
			{
				productId: 'prod_yA6nldgznK5EWb',
				id: 'item_L1vOoZPzXplRa8',
				tax: {
					is_taxable: true,
					amount: {
						raw: 58.72,
						formatted: '58.72',
						formatted_with_symbol: '$58.72',
						formatted_with_code: '58.72 USD',
					},
					taxable_amount: {
						raw: 899.99,
						formatted: '899.99',
						formatted_with_symbol: '$899.99',
						formatted_with_code: '899.99 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 58.72,
								formatted: '58.72',
								formatted_with_symbol: '$58.72',
								formatted_with_code: '58.72 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 899.99,
					formatted: '899.99',
					formattedWithCode: '899.99 USD',
					formattedWithSymbol: '$899.99',
				},
				image: {
					id: 'ast_N7GKwbDR3x53EX',
					url: 'https://cdn.chec.io/merchants/46668/assets/LVCPtt7n8iwNJcWp|laptop-04.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'laptop-04.png',
					fileSize: 47082,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 899.99,
					formatted: '899.99',
					formattedWithCode: '899.99 USD',
					formattedWithSymbol: '$899.99',
				},
				permalink: 'hp-pavilion-ryzen-5-hexa-core-5600h-yA6nldgznK5EWb',
				selectedOptions: [],
				variant: {
					price: {},
					assets: [],
				},
				name: 'HP Pavilion Ryzen 5 Hexa Core 5600H',
				displayName: 'HP Pavilion Ryzen 5 Hexa Core 5600H...',
				inventory: {
					available: 20,
					isManaged: true,
				},
				slug: 'hp-pavilion-ryzen-5-hexa-core-5600h',
			},
			{
				productId: 'prod_0YnEoqj7Np5e7P',
				id: 'item_0YnEoqjn0P5e7P',
				tax: {
					is_taxable: true,
					amount: {
						raw: 78.3,
						formatted: '78.30',
						formatted_with_symbol: '$78.30',
						formatted_with_code: '78.30 USD',
					},
					taxable_amount: {
						raw: 1199.99,
						formatted: '1,199.99',
						formatted_with_symbol: '$1,199.99',
						formatted_with_code: '1,199.99 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 78.3,
								formatted: '78.30',
								formatted_with_symbol: '$78.30',
								formatted_with_code: '78.30 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 1199.99,
					formatted: '1,199.99',
					formattedWithCode: '1,199.99 USD',
					formattedWithSymbol: '$1,199.99',
				},
				image: {
					id: 'ast_mOVKl4knrK5prR',
					url: 'https://cdn.chec.io/merchants/46668/assets/wtNFvgrGk6UaJyVH|laptop-07.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'laptop-07.png',
					fileSize: 45985,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 1199.99,
					formatted: '1,199.99',
					formattedWithCode: '1,199.99 USD',
					formattedWithSymbol: '$1,199.99',
				},
				permalink: 'acer-aspire-7-core-i5-10th-gen-0YnEoqj7Np5e7P',
				selectedOptions: [],
				variant: {
					price: {},
					assets: [],
				},
				name: 'acer Aspire 7 Core i5 10th Gen',
				displayName: 'acer Aspire 7 Core i5 10th Gen',
				inventory: {
					available: 20,
					isManaged: true,
				},
				slug: 'acer-aspire-7-core-i5-10th-gen',
			},
			{
				productId: 'prod_VPvL5zj7N65AQk',
				id: 'item_kd6Ll2m3ZG5V2m',
				tax: {
					is_taxable: true,
					amount: {
						raw: 130.5,
						formatted: '130.50',
						formatted_with_symbol: '$130.50',
						formatted_with_code: '130.50 USD',
					},
					taxable_amount: {
						raw: 1999.99,
						formatted: '1,999.99',
						formatted_with_symbol: '$1,999.99',
						formatted_with_code: '1,999.99 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 130.5,
								formatted: '130.50',
								formatted_with_symbol: '$130.50',
								formatted_with_code: '130.50 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 1999.99,
					formatted: '1,999.99',
					formattedWithCode: '1,999.99 USD',
					formattedWithSymbol: '$1,999.99',
				},
				image: {
					id: 'ast_ZRjywMn83Zo7Y8',
					url: 'https://cdn.chec.io/merchants/46668/assets/WSUTgS5yGU8OQvDd|laptop-05.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'laptop-05.png',
					fileSize: 57665,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 1999.99,
					formatted: '1,999.99',
					formattedWithCode: '1,999.99 USD',
					formattedWithSymbol: '$1,999.99',
				},
				permalink: 'acer-predator-helios-300-core-i7-11th-ge-VPvL5zj7N65AQk',
				selectedOptions: [],
				variant: {
					price: {},
					assets: [],
				},
				name: 'acer Predator Helios 300 Core i7 11th Gen',
				displayName: 'acer Predator Helios 300 Core i7 11th Gen',
				inventory: {
					available: 10,
					isManaged: true,
				},
				slug: 'acer-predator-helios-300-core-i7-11th-ge',
			},
			{
				productId: 'prod_8XxzoBKnxK5PQA',
				id: 'item_4OANwROdmzovYL',
				tax: {
					is_taxable: true,
					amount: {
						raw: 4.63,
						formatted: '4.63',
						formatted_with_symbol: '$4.63',
						formatted_with_code: '4.63 USD',
					},
					taxable_amount: {
						raw: 70.97,
						formatted: '70.97',
						formatted_with_symbol: '$70.97',
						formatted_with_code: '70.97 USD',
					},
					rate: 0.07,
					rate_percentage: '7%',
					breakdown: [
						{
							amount: {
								raw: 4.63,
								formatted: '4.63',
								formatted_with_symbol: '$4.63',
								formatted_with_code: '4.63 USD',
							},
							rate: 0.07,
							rate_percentage: '7%',
							type: 'regional_tax',
						},
					],
				},
				quantity: 1,
				price: {
					raw: 70.97,
					formatted: '70.97',
					formattedWithCode: '70.97 USD',
					formattedWithSymbol: '$70.97',
				},
				image: {
					id: 'ast_aZWNoyW6ZYl80J',
					url: 'https://cdn.chec.io/merchants/46668/assets/GgHrKnFwlGIlqOUI|headphone-07.png',
					width: 400,
					height: 400,
					isImage: true,
					filename: 'headphone-07.png',
					fileSize: 43306,
					description: null,
					fileExtension: 'png',
				},
				total: {
					raw: 70.97,
					formatted: '70.97',
					formattedWithCode: '70.97 USD',
					formattedWithSymbol: '$70.97',
				},
				permalink: 'boult-audio-thunder-bluetooth-headset-bl-8XxzoBKnxK5PQA',
				selectedOptions: [
					{
						id: 'optn_bO6J5a8xMXoEjp',
						name: 'Blue',
						group: {
							id: 'vgrp_gvRjwOP4mo4mNL',
							name: 'Color',
						},
					},
					{
						id: 'optn_gvRjwOVkPAl4mN',
						name: 'Large',
						group: {
							id: 'vgrp_RqEv5xxXd5Zz4j',
							name: 'Size',
						},
					},
				],
				variant: {
					id: 'vrnt_Op1YoVz4ggoXLv',
					sku: 'HEA-1-B-L',
					description: null,
					price: {},
					assets: [],
				},
				name: 'Boult Audio Thunder Bluetooth Headset  (Black, On the Ear)',
				displayName: 'Boult Audio Thunder Bluetooth Headset  (Black, On the Ear)',
				inventory: {
					available: 10,
					isManaged: true,
				},
				slug: 'boult-audio-thunder-bluetooth-headset-bl',
			},
		],
		discount: {
			type: 'percentage',
			code: 'E859EDEECD',
			value: 10,
			amountSaved: {
				raw: 429.29,
				formatted: '429.29',
				formattedWithCode: '429.29 USD',
				formattedWithSymbol: '$429.29',
			},
		},
		payWhatYouWant: {
			enabled: false,
			minimum: null,
			customerSetPrice: null,
		},
		conditionals: {},
		shipping: {
			id: null,
			provider: null,
			price: {
				raw: 10,
				formatted: '10.00',
				formattedWithCode: '10.00 USD',
				formattedWithSymbol: '$10.00',
			},
			description: null,
		},
		adjustments: {
			total: {
				raw: 0,
				formatted: '0.00',
				formattedWithCode: '0.00 USD',
				formattedWithSymbol: '$0.00',
			},
			taxable: {
				raw: 0,
				formatted: '0.00',
				formattedWithCode: '0.00 USD',
				formattedWithSymbol: '$0.00',
			},
			untaxable: {
				raw: 0,
				formatted: '0.00',
				formattedWithCode: '0.00 USD',
				formattedWithSymbol: '$0.00',
			},
		},
		tax: {
			amount: {},
		},
	},
	statusFulfillment: 'not_fulfilled',
	transactions: [
		{
			amount: {
				raw: 4153.73,
				formatted: '4,153.73',
				formatted_with_symbol: '$4,153.73',
				formatted_with_code: '4,153.73 USD',
			},
			paymentSourceType: 'card',
			paymentSource: {
				brand: 'visa',
				country: 'US',
				zip: '90001',
			},
			id: 'trns_4OANwRzNdpwvYL',
			type: 'charge',
			status: 'complete',
			status_reason: 'complete',
			charge_date: 1696432868,
			gateway: 'test_gateway',
			gateway_name: 'Test Gateway',
			gateway_transaction_id: '1696432868',
			gateway_customer_id: null,
			gateway_reference: '4242',
			notes: '',
			payment_source_type: 'card',
			payment_source: {
				brand: 'visa',
				country: 'US',
				billing_zip_postal_code: '90001',
			},
			meta: null,
			created: 1696432868,
			updated: 1696432868,
			dunning: {
				is_dunning: false,
				failed_attempts: 0,
				last_failed_attempt: null,
				next_attempt: null,
			},
		},
	],
	placedAt: '10/4/2023, 8:51:08 PM',
	address: {
		billing: {
			id: 'adrs_0YnEoqbgW5e7P6',
			country: 'US',
			state: 'CA',
			zip: '90001',
			street: 'ABC Street',
			street2: 'New Walmart',
			townCity: 'Los Angeles',
			customer: 'John Doe',
			deliveryInstructions: null,
		},
		shipping: {
			id: 'adrs_0YnEoqbgW5e7P6',
			country: 'US',
			state: 'CA',
			zip: '90001',
			street: 'ABC Street',
			street2: 'New Walmart',
			townCity: 'Los Angeles',
			customer: 'John Doe',
			deliveryInstructions: null,
		},
	},
};

const TestPage = () => (
	<main className="py-10 lg:py-14">
		<Container>
			<CheckoutSuccess data={lastOrder} />
		</Container>
	</main>
);

TestPage.getLayout = (page, data) => <LayoutWrapper data={data}>{page}</LayoutWrapper>;

export const getStaticProps = async ({ preview }) => {
	const data = await fetchPage(preview, 'errorpage');
	return { props: { data }, revalidate: 10 };
};

export default TestPage;
