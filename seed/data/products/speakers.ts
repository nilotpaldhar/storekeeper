import type { ProductSeed } from "@seed/types";

const speakers: ProductSeed[] = [
	{
		id: "prod-google-nest-audio",
		title: "Google Nest Audio",
		slug: "google-nest-audio",
		sku: {
			name: "Google Nest Audio Smart Speaker",
			code: "SKU-GNA-001",
			weight: 1200,
			hs_tariff_number: "85182200",
		},
		description:
			"The Google Nest Audio is a smart speaker designed to fill your room with rich, clear sound. With Google Assistant built-in, you can play music, get answers, manage your daily tasks, and control your smart home devices using just your voice. It features a custom-designed tweeter and mid-woofer for full, clear vocals and powerful bass. The speaker automatically adapts to your environment, optimizing sound for your room. Its sleek, fabric-covered design blends seamlessly into any home decor. You can pair two Nest Audio speakers for stereo sound or connect multiple Google Nest speakers for a whole-home audio experience. It's a perfect blend of smart technology and impressive audio quality, making everyday life a little easier and more enjoyable. The privacy switch allows you to physically turn off the microphones for peace of mind. It's designed to be a central hub for your audio and smart home needs, providing a truly connected experience.",
		taxon: "taxon-smart-speakers",
		brand: "brand-google",
		inventory: 150,
		pricing: {
			originalPrice: 8999,
			discountedPrice: 7999,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/01/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/01/02-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/01/03-min.png",
		],
		specifications: [
			{
				key: "audio_drivers",
				label: "Audio Drivers",
				value: "75mm woofer, 19mm tweeter",
			},
			{
				key: "voice_assistant",
				label: "Voice Assistant",
				value: "Google Assistant",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "Wi-Fi, Bluetooth 5.0",
			},
			{
				key: "microphones",
				label: "Microphones",
				value: "3 far-field microphones",
			},
			{
				key: "dimensions",
				label: "Dimensions",
				value: "175 x 124 x 78 mm",
			},
			{
				key: "power",
				label: "Power",
				value: "30W adapter",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-jbl-flip-6",
			},
			{
				key: "related-2",
				ref: "prod-sonos-era-300",
			},
			{
				key: "related-3",
				ref: "prod-creative-pebble-v3",
			},
			{
				key: "related-4",
				ref: "prod-sony-ht-s20r",
			},
		],
	},
	{
		id: "prod-jbl-flip-6",
		title: "JBL Flip 6",
		slug: "jbl-flip-6",
		sku: {
			name: "JBL Flip 6 Portable Bluetooth Speaker",
			code: "SKU-JBL-FLIP6-001",
			weight: 550,
			hs_tariff_number: "85182100",
		},
		description:
			"Take your music anywhere with the JBL Flip 6, a powerful portable Bluetooth speaker designed for adventure. It delivers bold JBL Original Pro Sound with exceptional clarity and deep bass, thanks to its racetrack-shaped woofer and separate tweeter. The speaker is IP67 waterproof and dustproof, making it perfect for the beach, pool, or any outdoor activity. With up to 12 hours of playtime on a single charge, the party never stops. Its durable fabric material and rugged housing protect it from bumps and drops. Use PartyBoost to pair multiple JBL PartyBoost-compatible speakers for an even bigger sound. The Flip 6 is a compact powerhouse that brings your music to life, offering a vibrant and dynamic audio experience in a go-anywhere design. The intuitive controls make it easy to manage your music, and the vibrant color options allow you to express your style. It's built to withstand the elements and keep the music flowing, no matter where you are.",
		taxon: "taxon-portable-speakers",
		brand: "brand-jbl",
		inventory: 200,
		pricing: {
			originalPrice: 9999,
			discountedPrice: 8999,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/02/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/02/02-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/02/03-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/02/04-min.png",
		],
		specifications: [
			{
				key: "power_output",
				label: "Power Output",
				value: "20W RMS woofer, 10W RMS tweeter",
			},
			{
				key: "battery_life",
				label: "Battery Life",
				value: "Up to 12 hours",
			},
			{
				key: "waterproof_rating",
				label: "Waterproof/Dustproof",
				value: "IP67",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "Bluetooth 5.1",
			},
			{
				key: "dimensions",
				label: "Dimensions",
				value: "17.8 x 6.8 x 7.2 cm",
			},
			{
				key: "features",
				label: "Features",
				value: "JBL PartyBoost",
			},
			{
				key: "charging_time",
				label: "Charging Time",
				value: "2.5 hours",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-google-nest-audio",
			},
			{
				key: "related-2",
				ref: "prod-jbl-partybox-110",
			},
			{
				key: "related-3",
				ref: "prod-creative-pebble-v3",
			},
			{
				key: "related-4",
				ref: "prod-sony-ht-s20r",
			},
			{
				key: "related-5",
				ref: "prod-sonos-era-300",
			},
		],
	},
	{
		id: "prod-sony-ht-s20r",
		title: "Sony HT-S20R Soundbar",
		slug: "sony-ht-s20r",
		sku: {
			name: "Sony HT-S20R 5.1ch Home Cinema Soundbar",
			code: "SKU-SONY-HTS20R-001",
			weight: 2800,
			hs_tariff_number: "85185000",
		},
		description:
			"Transform your living room into a cinematic experience with the Sony HT-S20R Soundbar. This 5.1 channel home cinema system delivers real surround sound with a powerful 400W total output, including a wired subwoofer and compact rear speakers. Enjoy dramatic, high-quality audio for all your movies, TV shows, and music. Setting up is simple with HDMI ARC, optical, or analog inputs, allowing you to connect to almost any TV. Bluetooth connectivity lets you stream music wirelessly from your smartphone. Its sleek and compact design fits perfectly in front of your TV without cluttering your space. The HT-S20R brings the excitement of the cinema right into your home, providing immersive sound that makes every scene come alive. The dedicated sound modes enhance your audio experience, whether you're watching a thrilling action movie or listening to your favorite album. It's an affordable yet powerful solution for upgrading your home entertainment system, delivering clear dialogue and impactful bass.",
		taxon: "taxon-soundbars",
		brand: "brand-sony",
		inventory: 70,
		pricing: {
			originalPrice: 17990,
			discountedPrice: 15990,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/03/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/03/02-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/03/03-min.png",
		],
		specifications: [
			{
				key: "channels",
				label: "Channels",
				value: "5.1ch",
			},
			{
				key: "total_output",
				label: "Total Output",
				value: "400W",
			},
			{
				key: "subwoofer_type",
				label: "Subwoofer",
				value: "Wired",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "HDMI ARC, Optical, Analog, Bluetooth",
			},
			{
				key: "audio_formats",
				label: "Audio Formats",
				value: "Dolby Digital",
			},
			{
				key: "dimensions_soundbar",
				label: "Soundbar Dimensions",
				value: "76 x 5.2 x 8.6 cm",
			},
			{
				key: "features",
				label: "Features",
				value: "Rear speakers included",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-jbl-flip-6",
			},
			{
				key: "related-2",
				ref: "prod-google-nest-audio",
			},
			{
				key: "related-3",
				ref: "prod-sonos-era-300",
			},
			{
				key: "related-4",
				ref: "prod-jbl-partybox-110",
			},
			{
				key: "related-5",
				ref: "prod-creative-pebble-v3",
			},
		],
	},
	{
		id: "prod-sonos-era-300",
		title: "Sonos Era 300",
		slug: "sonos-era-300",
		sku: {
			name: "Sonos Era 300 Wireless Smart Speaker",
			code: "SKU-SONOS-ERA300-001",
			weight: 4470,
			hs_tariff_number: "85182200",
		},
		description:
			"Immerse yourself in a new dimension of sound with the Sonos Era 300, a revolutionary wireless speaker built for spatial audio. Featuring six optimally positioned drivers, it projects sound from every direction, delivering a truly immersive Dolby Atmos experience. Connect via Wi-Fi for the highest quality audio, or use Bluetooth for quick pairing. With built-in voice control (Sonos Voice Control and Amazon Alexa), you can manage your music hands-free. Trueplay tuning technology optimizes the sound for your room's acoustics, ensuring perfect audio wherever you place it. Its unique hourglass design is both aesthetically pleasing and acoustically functional. The Era 300 is perfect for music lovers and home theater enthusiasts looking for a premium, multi-dimensional audio experience that goes beyond traditional stereo. It's designed to be a cornerstone of your Sonos multi-room system, allowing you to easily expand your audio setup throughout your home. The intuitive controls and seamless app integration make it a joy to use, providing a sophisticated and powerful listening experience.",
		taxon: "taxon-wireless-speakers",
		brand: "brand-sonos",
		inventory: 45,
		pricing: {
			originalPrice: 54999,
			discountedPrice: 49999,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/04/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/04/02-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/04/03-min.png",
		],
		specifications: [
			{
				key: "audio_drivers",
				label: "Audio Drivers",
				value: "6 drivers for spatial audio",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "Wi-Fi 6, Bluetooth 5.0, USB-C Line-in",
			},
			{
				key: "voice_control",
				label: "Voice Control",
				value: "Sonos Voice Control, Amazon Alexa",
			},
			{
				key: "audio_tech",
				label: "Audio Technology",
				value: "Dolby Atmos, Trueplay tuning",
			},
			{
				key: "dimensions",
				label: "Dimensions",
				value: "16 x 26 x 18.5 cm",
			},
			{
				key: "features",
				label: "Features",
				value: "Multi-room audio, Touch controls",
			},
			{
				key: "microphones",
				label: "Microphones",
				value: "Far-field microphone array",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-google-nest-audio",
			},
			{
				key: "related-2",
				ref: "prod-sony-ht-s20r",
			},
			{
				key: "related-3",
				ref: "prod-jbl-flip-6",
			},
			{
				key: "related-4",
				ref: "prod-jbl-partybox-110",
			},
			{
				key: "related-5",
				ref: "prod-creative-pebble-v3",
			},
		],
	},
	{
		id: "prod-creative-pebble-v3",
		title: "Creative Pebble V3",
		slug: "creative-pebble-v3",
		sku: {
			name: "Creative Pebble V3 Desktop Speakers",
			code: "SKU-CREATIVE-PBV3-001",
			weight: 700,
			hs_tariff_number: "85182100",
		},
		description:
			"Upgrade your desktop audio with the Creative Pebble V3, a compact and elegant 2.0 USB-C powered speaker system. Inspired by Zen Japanese rock gardens, its spherical design with 45-degree elevated drivers delivers audio directly to your ears for an immersive personal listening experience. The Pebble V3 offers enhanced audio performance with higher power output and Bluetooth 5.0 connectivity, allowing you to stream music wirelessly from your mobile devices. With a simple USB-C connection for both power and audio, and a 3.5mm AUX-in for legacy devices, setup is effortless. The Clear Dialogue feature ensures clearer spoken word in movies and podcasts. These speakers are a perfect blend of minimalist design, powerful audio, and versatile connectivity, making them an ideal choice for any desktop setup. They provide surprisingly rich and loud sound for their size, making them a fantastic value for improving your computer's audio experience without taking up much desk space. The sleek design and easy controls make them a joy to use every day.",
		taxon: "taxon-desktop-speakers",
		brand: "brand-creative",
		inventory: 250,
		pricing: {
			originalPrice: 3999,
			discountedPrice: 3499,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/05/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/05/02-min.png",
		],
		specifications: [
			{
				key: "power_output",
				label: "Power Output",
				value: "8W RMS, 16W Peak",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "USB-C Audio, Bluetooth 5.0, 3.5mm AUX-in",
			},
			{
				key: "driver_size",
				label: "Driver Size",
				value: "2.25-inch full-range",
			},
			{
				key: "features",
				label: "Features",
				value: "Clear Dialogue, 45-degree elevated drivers",
			},
			{
				key: "dimensions",
				label: "Dimensions",
				value: "12.3 x 12.3 x 11.8 cm (each speaker)",
			},
			{
				key: "power_source",
				label: "Power Source",
				value: "USB-C",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-google-nest-audio",
			},
			{
				key: "related-2",
				ref: "prod-jbl-flip-6",
			},
			{
				key: "related-3",
				ref: "prod-sony-ht-s20r",
			},
			{
				key: "related-4",
				ref: "prod-sonos-era-300",
			},
			{
				key: "related-5",
				ref: "prod-jbl-partybox-110",
			},
		],
	},
	{
		id: "prod-jbl-partybox-110",
		title: "JBL PartyBox 110",
		slug: "jbl-partybox-110",
		sku: {
			name: "JBL PartyBox 110 Portable Party Speaker",
			code: "SKU-JBL-PB110-001",
			weight: 10840,
			hs_tariff_number: "85182200",
		},
		description:
			"Bring the party to life with the JBL PartyBox 110, a powerful portable party speaker that delivers massive sound and a dynamic light show. It features 160 Watts of powerful JBL Original Pro Sound and deep, punchy bass that you can feel. The dynamic light show syncs to the beat of the music, creating an immersive audiovisual experience. With up to 12 hours of battery life and an IPX4 splashproof design, the PartyBox 110 is ready for any gathering, indoors or out. It includes mic and guitar inputs for karaoke sessions, and you can pair two PartyBox speakers with True Wireless Stereo (TWS) for an even bigger sound. The JBL PartyBox App gives you full control over your music and light show. This speaker is designed to be the life of the party, providing powerful sound, dazzling lights, and endless entertainment options. Its rugged build and easy portability make it a versatile choice for any event, ensuring your music is always the center of attention. The intuitive controls and robust connectivity options make it simple to set up and enjoy, providing a truly unforgettable party experience.",
		taxon: "taxon-party-speakers",
		brand: "brand-jbl",
		inventory: 60,
		pricing: {
			originalPrice: 35999,
			discountedPrice: 32999,
		},
		gallery: [
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/06/01-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/06/02-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/06/03-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/06/04-min.png",
			"https://ik.imagekit.io/haio54fgp/storekeeper/products/speakers/06/05-min.png",
		],
		specifications: [
			{
				key: "power_output",
				label: "Power Output",
				value: "160W RMS",
			},
			{
				key: "battery_life",
				label: "Battery Life",
				value: "Up to 12 hours",
			},
			{
				key: "waterproof_rating",
				label: "Waterproof Rating",
				value: "IPX4 (splashproof)",
			},
			{
				key: "connectivity",
				label: "Connectivity",
				value: "Bluetooth 5.1, USB, AUX-in, Mic/Guitar inputs",
			},
			{
				key: "features",
				label: "Features",
				value: "Dynamic Light Show, Karaoke, TWS (True Wireless Stereo)",
			},
			{
				key: "dimensions",
				label: "Dimensions",
				value: "29.5 x 56.8 x 30 cm",
			},
			{
				key: "charging_time",
				label: "Charging Time",
				value: "3.5 hours",
			},
			{
				key: "app_control",
				label: "App Control",
				value: "JBL PartyBox App",
			},
		],
		relatedProducts: [
			{
				key: "related-1",
				ref: "prod-jbl-flip-6",
			},
			{
				key: "related-2",
				ref: "prod-sonos-era-300",
			},
			{
				key: "related-3",
				ref: "prod-sony-ht-s20r",
			},
			{
				key: "related-4",
				ref: "prod-google-nest-audio",
			},
			{
				key: "related-5",
				ref: "prod-creative-pebble-v3",
			},
		],
	},
];

export { speakers };
