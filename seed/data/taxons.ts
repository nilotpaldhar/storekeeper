import type { TaxonSeed } from "@seed/types";

const taxons: TaxonSeed[] = [
	// Mobiles
	{
		id: "taxon-smartphones",
		title: "Smartphones",
		slug: "smartphones",
		description: "Latest Android and iOS flagship devices.",
		taxonomy: "taxonomy-mobiles",
	},
	{
		id: "taxon-feature-phones",
		title: "Feature Phones",
		slug: "feature-phones",
		description: "Basic phones with long battery life.",
		taxonomy: "taxonomy-mobiles",
	},

	// Computers & Laptops
	{
		id: "taxon-gaming-laptops",
		title: "Gaming Laptops",
		slug: "gaming-laptops",
		description: "Powerful laptops for immersive gaming.",
		taxonomy: "taxonomy-computers-and-laptops",
	},
	{
		id: "taxon-ultrabooks",
		title: "Ultrabooks",
		slug: "ultrabooks",
		description: "Slim, lightweight laptops for work on the go.",
		taxonomy: "taxonomy-computers-and-laptops",
	},

	// Headphones
	{
		id: "taxon-noise-cancelling-headsets",
		title: "Noise-Cancelling Headsets",
		slug: "noise-cancelling-headsets",
		description: "Block out noise for focused listening.",
		taxonomy: "taxonomy-headphones",
	},
	{
		id: "taxon-gaming-headsets",
		title: "Gaming Headsets",
		slug: "gaming-headsets",
		description: "High-quality audio for competitive gaming.",
		taxonomy: "taxonomy-headphones",
	},
	{
		id: "taxon-wireless-headsets",
		title: "Wireless Headsets",
		slug: "wireless-headsets",
		description: "Cord-free audio with great mobility.",
		taxonomy: "taxonomy-headphones",
	},
	{
		id: "taxon-business-headsets",
		title: "Business Headsets",
		slug: "business-headsets",
		description: "Clear audio for calls and conferences.",
		taxonomy: "taxonomy-headphones",
	},

	// Speakers
	{
		id: "taxon-smart-speakers",
		title: "Smart Speakers",
		slug: "smart-speakers",
		description: "Voice-controlled speakers with AI.",
		taxonomy: "taxonomy-speakers",
	},
	{
		id: "taxon-portable-speakers",
		title: "Portable Speakers",
		slug: "portable-speakers",
		description: "Compact speakers for music anywhere.",
		taxonomy: "taxonomy-speakers",
	},
	{
		id: "taxon-soundbars",
		title: "Soundbars",
		slug: "soundbars",
		description: "Slim audio bars for enhanced TV sound.",
		taxonomy: "taxonomy-speakers",
	},
	{
		id: "taxon-wireless-speakers",
		title: "Wireless Speakers",
		slug: "wireless-speakers",
		description: "Bluetooth-enabled speakers for convenience.",
		taxonomy: "taxonomy-speakers",
	},
	{
		id: "taxon-desktop-speakers",
		title: "Desktop Speakers",
		slug: "desktop-speakers",
		description: "Speakers for PC or home office use.",
		taxonomy: "taxonomy-speakers",
	},
	{
		id: "taxon-party-speakers",
		title: "Party Speakers",
		slug: "party-speakers",
		description: "Loud, bass-heavy speakers for events.",
		taxonomy: "taxonomy-speakers",
	},

	// Watches
	{
		id: "taxon-smartwatch",
		title: "Smartwatch",
		slug: "smartwatch",
		description: "Wearable device with smart features.",
		taxonomy: "taxonomy-watches",
	},
	{
		id: "taxon-sports-watch",
		title: "Sports Watch",
		slug: "sports-watch",
		description: "Rugged watch for sports and fitness.",
		taxonomy: "taxonomy-watches",
	},
	{
		id: "taxon-fitness-tracker",
		title: "Fitness Tracker",
		slug: "fitness-tracker",
		description: "Track workouts, steps, and health stats.",
		taxonomy: "taxonomy-watches",
	},
	{
		id: "taxon-analog-digital-watch",
		title: "Analog-Digital Watch",
		slug: "analog-digital-watch",
		description: "Hybrid watch with analog and digital display.",
		taxonomy: "taxonomy-watches",
	},
	{
		id: "taxon-analog-watch",
		title: "Analog Watch",
		slug: "analog-watch",
		description: "Classic timepiece with analog dial.",
		taxonomy: "taxonomy-watches",
	},

	// Televisions
	{
		id: "taxon-neo-qled-tv",
		title: "Neo QLED TV",
		slug: "neo-qled-tv",
		description: "Premium TV with advanced QLED tech.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-qled-tv",
		title: "QLED TV",
		slug: "qled-tv",
		description: "Premium TV with advanced QLED tech.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-oled-tv",
		title: "OLED TV",
		slug: "oled-tv",
		description: "Ultra-thin TV with vibrant OLED display.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-qd-oled-tv",
		title: "QD-OLED TV",
		slug: "qd-oled-tv",
		description: "Hybrid OLED display with quantum dots.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-smart-tv",
		title: "Smart TV",
		slug: "smart-tv",
		description: "Internet-enabled TV with apps.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-mini-led-tv",
		title: "Mini LED TV",
		slug: "mini-led-tv",
		description: "LED TV with enhanced backlight control.",
		taxonomy: "taxonomy-televisions",
	},
	{
		id: "taxon-design-tv",
		title: "Design TV",
		slug: "design-tv",
		description: "Stylish TV with premium aesthetics.",
		taxonomy: "taxonomy-televisions",
	},

	// Refrigerators
	{
		id: "taxon-double-door-refrigerator",
		title: "Double Door Refrigerator",
		slug: "double-door-refrigerator",
		description: "Spacious fridge with separate freezer.",
		taxonomy: "taxonomy-refrigerators",
	},
	{
		id: "taxon-single-door-refrigerator",
		title: "Single Door Refrigerator",
		slug: "single-door-refrigerator",
		description: "Compact fridge for small households.",
		taxonomy: "taxonomy-refrigerators",
	},
	{
		id: "taxon-side-by-side-refrigerator",
		title: "Side-by-Side Refrigerator",
		slug: "side-by-side-refrigerator",
		description: "Dual-door fridge with large capacity.",
		taxonomy: "taxonomy-refrigerators",
	},
	{
		id: "taxon-french-door-refrigerator",
		title: "French Door Refrigerator",
		slug: "french-door-refrigerator",
		description: "Stylish fridge with wide storage space.",
		taxonomy: "taxonomy-refrigerators",
	},

	// Air Conditioners
	{
		id: "taxon-inverter-split-ac",
		title: "Inverter Split AC",
		slug: "inverter-split-ac",
		description: "Energy-efficient cooling with inverter tech.",
		taxonomy: "taxonomy-air-conditioners",
	},
	{
		id: "taxon-smart-inverter-split-ac",
		title: "Smart Inverter Split AC",
		slug: "smart-inverter-split-ac",
		description: "Wi-Fi enabled inverter AC for smart control.",
		taxonomy: "taxonomy-air-conditioners",
	},
	{
		id: "taxon-window-ac",
		title: "Window AC",
		slug: "window-ac",
		description: "Compact cooling for single rooms.",
		taxonomy: "taxonomy-air-conditioners",
	},
];

export { taxons };
