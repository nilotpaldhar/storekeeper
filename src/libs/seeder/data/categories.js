const BASE_IMG_URL = 'https://ik.imagekit.io/haio54fgp/storekeeper/categories';

const categories = [
	{
		name: 'Mobiles',
		permalink: 'mobiles',
		slug: 'mobiles',
		image: `${BASE_IMG_URL}/mobiles.png`,
		children: [
			{
				name: 'IPhone',
				permalink: 'iphone',
				slug: 'iphone',
			},
			{
				name: 'Samsung Mobiles',
				permalink: 'samsung-mobiles',
				slug: 'samsung-mobiles',
			},
			{
				name: 'MI Mobiles',
				permalink: 'mi-mobiles',
				slug: 'mi-mobiles',
			},
			{
				name: 'Vivo',
				permalink: 'vivo',
				slug: 'vivo',
			},
			{
				name: 'Oppo',
				permalink: 'oppo',
				slug: 'oppo',
			},
		],
	},
	{
		name: 'Mobile Accessories',
		permalink: 'mobile-accessories',
		slug: 'mobile-accessories',
		image: ``,
		children: [
			{
				name: 'Mobile Chargers',
				permalink: 'mobile-chargers',
				slug: 'mobile-chargers',
			},
			{
				name: 'Power Banks',
				permalink: 'power-banks',
				slug: 'power-banks',
			},
			{
				name: 'Mobile Holders',
				permalink: 'mobile-holders',
				slug: 'mobile-holders',
			},
		],
	},
	{
		name: 'Computers and Laptops',
		permalink: 'computers-and-laptops',
		slug: 'computers-and-laptops',
		image: `${BASE_IMG_URL}/computers-and-laptops.png`,
		children: [
			{
				name: 'Gaming Laptops',
				permalink: 'gaming-laptops',
				slug: 'gaming-laptops',
			},
			{
				name: 'Thin and Light Laptop',
				permalink: 'thin-and-light-laptop',
				slug: 'thin-and-light-laptop',
			},
		],
	},
	{
		name: 'Computer Accessories',
		permalink: 'computer-accessories',
		slug: 'computer-accessories',
		image: ``,
		children: [
			{
				name: 'External Hard Disks',
				permalink: 'external-hard-disks',
				slug: 'external-hard-disks',
			},
			{
				name: 'Pendrives',
				permalink: 'pendrives',
				slug: 'pendrives',
			},
			{
				name: 'Mouse',
				permalink: 'mouse',
				slug: 'mouse',
			},
		],
	},
	{
		name: 'Televisions',
		permalink: 'televisions',
		slug: 'televisions',
		image: `${BASE_IMG_URL}/televisions.png`,
		children: [
			{
				name: '24 inch Below',
				permalink: '24-inch-below',
				slug: '24-inch-below',
			},
			{
				name: '28 - 32 inch',
				permalink: '28-32-inch',
				slug: '28-32-inch',
			},
			{
				name: '39 - 43 inch',
				permalink: '39-43-inch',
				slug: '39-43-inch',
			},
		],
	},
	{
		name: 'Headphones',
		permalink: 'headphones',
		slug: 'headphones',
		image: `${BASE_IMG_URL}/headphones.png`,
		children: [
			{
				name: 'In the Ear',
				permalink: 'in-the-ear',
				slug: 'in-the-ear',
			},
			{
				name: 'On the Ear',
				permalink: 'on-the-ear',
				slug: 'on-the-ear',
			},
			{
				name: 'True Wireless',
				permalink: 'true-wireless',
				slug: 'true-wireless',
			},
		],
	},
	{
		name: 'Speakers',
		permalink: 'speakers',
		slug: 'speakers',
		image: `${BASE_IMG_URL}/speakers.png`,
		children: [
			{
				name: 'boAt Speakers',
				permalink: 'boat-speakers',
				slug: 'boat-speakers',
			},
			{
				name: 'JBL Speakers',
				permalink: 'jbl-speakers',
				slug: 'jbl-speakers',
			},
			{
				name: 'Zebronics Speakers',
				permalink: 'zebronics-speakers',
				slug: 'zebronics-speakers',
			},
		],
	},
	{
		name: 'Watches',
		permalink: 'watches',
		slug: 'watches',
		image: `${BASE_IMG_URL}/watches.png`,
		children: [
			{
				name: 'Analog Watches',
				permalink: 'analog-watches',
				slug: 'analog-watches',
			},
			{
				name: 'Digital Watches',
				permalink: 'digital-watches',
				slug: 'digital-watches',
			},
			{
				name: 'Smart Watches',
				permalink: 'smart-watches',
				slug: 'smart-watches',
			},
		],
	},
	{
		name: 'Refrigerator',
		permalink: 'refrigerator',
		slug: 'refrigerator',
		image: `${BASE_IMG_URL}/refrigerator.png`,
		children: [
			{
				name: 'Single Door',
				permalink: 'single-door',
				slug: 'single-door',
			},
			{
				name: 'Double Door',
				permalink: 'double-door',
				slug: 'double-door',
			},
			{
				name: 'Triple Door',
				permalink: 'triple-door',
				slug: 'triple-door',
			},
			{
				name: 'Side By Side',
				permalink: 'side-by-side',
				slug: 'side-by-side',
			},
		],
	},
	{
		name: 'Air Conditioners',
		permalink: 'air-conditioners',
		slug: 'air-conditioners',
		image: `${BASE_IMG_URL}/air-conditioners.png`,
		children: [
			{
				name: 'Inverter ACs',
				permalink: 'inverter-acs',
				slug: 'inverter-acs',
			},
			{
				name: 'Window ACs',
				permalink: 'window-acs',
				slug: 'window-acs',
			},
			{
				name: 'Fixed Speed ACs',
				permalink: 'fixed-speed-acs',
				slug: 'fixed-speed-acs',
			},
			{
				name: 'Smart ACs',
				permalink: 'smart-acs',
				slug: 'smart-acs',
			},
		],
	},
];

export default categories;
