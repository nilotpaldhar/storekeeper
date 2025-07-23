# [0.8.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.7.0...v0.8.0) (2025-07-23)


### Features

* **auth:** add LogoutButton component with client-side redirect ([adf1a6e](https://github.com/nilotpaldhar/storekeeper/commit/adf1a6ef920bc976f1df51c13e3fd99adf27f823))
* **landing-page:** add Category section with CategoryCarousel component ([e14ab36](https://github.com/nilotpaldhar/storekeeper/commit/e14ab36711546fbd516f4e07cfb672675af0ff83))
* **landing-page:** add Collection section with CollectionGrid component ([c422f55](https://github.com/nilotpaldhar/storekeeper/commit/c422f55e38494b84c0665d251df22d78ff774342))
* **landing-page:** add newsletter subscription and feature highlights sections ([6287fb7](https://github.com/nilotpaldhar/storekeeper/commit/6287fb71435540592090b212afca38133be529ca))
* **landing-page:** add product showcase sections ([5261a6a](https://github.com/nilotpaldhar/storekeeper/commit/5261a6a519b2f2c96ed1946ec4db74a08e0aee15))
* **landing-page:** implement Promotional Banners section using PromoBlockSlider component ([1ece55f](https://github.com/nilotpaldhar/storekeeper/commit/1ece55f26a8c299779841186c103a8569472608b))
* **schema:** add collection schema and integrate it into homePage document ([c05f975](https://github.com/nilotpaldhar/storekeeper/commit/c05f975a952a79c5c04f47e9aa04d78be4a16d4d))
* **schema:** add promoBlock schema and integrate it into homePage document ([b29bcfd](https://github.com/nilotpaldhar/storekeeper/commit/b29bcfd3cad2c2a4ef5b342d58d6c305b3de16f6))



# [0.7.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.6.0...v0.7.0) (2025-07-20)


### Features

* **checkout-page:** add initial structure for checkout page layout ([a8d3271](https://github.com/nilotpaldhar/storekeeper/commit/a8d32711c3652a6fe46a422e27f7d656e1bd37c0))
* **checkout:** add AddressStep component and address/order API endpoints ([1052049](https://github.com/nilotpaldhar/storekeeper/commit/1052049fec4c9a5c9d604ac4f021f25b7cde7ce4))
* **checkout:** add CheckoutSuccessPage for order confirmation display ([886b6d1](https://github.com/nilotpaldhar/storekeeper/commit/886b6d1384162d51808da8583e18361db229648c))
* **checkout:** add customer attach API and UserDetailsStep to checkout flow ([80f0652](https://github.com/nilotpaldhar/storekeeper/commit/80f06524306992fe0162a3b01ff4b5efcb60fefa))
* **checkout:** add DeliveryOptionsStep and shipping methods API (GET, PATCH) ([d4b4fef](https://github.com/nilotpaldhar/storekeeper/commit/d4b4fef030bd9b8a475c0da6036868a5194d7a53))
* **checkout:** add GET /api/commerce/orders/:orderId endpoint and useOrder hook for checkout page ([00fe91b](https://github.com/nilotpaldhar/storekeeper/commit/00fe91b6065c17a583e0de2f92b6fff32f898a95))
* **checkout:** add PaymentDetailsStep and payment methods API (GET, PATCH) ([cc57aa7](https://github.com/nilotpaldhar/storekeeper/commit/cc57aa78f98820a7a3ab05c712527c9d41ae04fe))
* **checkout:** add place order functionality to complete checkout flow ([3d25581](https://github.com/nilotpaldhar/storekeeper/commit/3d255817615b8c4bf410246edba448149576ea8c))



# [0.6.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.5.0...v0.6.0) (2025-07-15)


### Features

* **cart-page:** add initial structure for cart page layout ([7337c35](https://github.com/nilotpaldhar/storekeeper/commit/7337c3543b408d01504e837aa9f57c0682338644))
* **cart:** add cart, count, add-item APIs & useCart, useCartCount, useAddCartItem hooks ([e1e8f56](https://github.com/nilotpaldhar/storekeeper/commit/e1e8f560464a978d4a9d355867227f89b66c36bc))
* **cart:** add POST/DELETE coupon endpoints and related hooks ([4cad5ce](https://github.com/nilotpaldhar/storekeeper/commit/4cad5cec804563f501f09214910d2c3bdb870016))
* **cart:** add update and delete item endpoints and useUpdateCartItem, useRemoveCartItem hooks ([2b6ee36](https://github.com/nilotpaldhar/storekeeper/commit/2b6ee36113dc0f453f1060a393e660fac1864f05))



# [0.5.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.4.0...v0.5.0) (2025-07-09)


### Features

* **api:** add endpoints to retrieve product price and inventory ([bd9c43c](https://github.com/nilotpaldhar/storekeeper/commit/bd9c43c36a3431f1688daddf16dcfa4295565cd7))
* **product-page:** add category breadcrumb trail on product page ([a992c02](https://github.com/nilotpaldhar/storekeeper/commit/a992c02330b57a276da8984135cd622f36c4d975))
* **product-page:** add collapsible text for description and variant selector ([ca73d97](https://github.com/nilotpaldhar/storekeeper/commit/ca73d97d6a33b1524c29c548c15c09fab2b4cdae))
* **product-page:** add initial structure for product page layout ([53c120b](https://github.com/nilotpaldhar/storekeeper/commit/53c120bec0dc75601fc9ea4cb04b61ef0c019210))
* **product-page:** add ProductCollection component with related products section ([0d0eb7c](https://github.com/nilotpaldhar/storekeeper/commit/0d0eb7c460c10b9939aa4b13ea3b6b41b4a9883d))
* **product-page:** add ProductSharePopover component to display social share buttons ([f5fe5e5](https://github.com/nilotpaldhar/storekeeper/commit/f5fe5e53575ef9ae402aa70c06b5a6b1e808ec17))
* **product-page:** add responsive image gallery for desktop and mobile ([2b84a4a](https://github.com/nilotpaldhar/storekeeper/commit/2b84a4ac32872cf0bc8d0e7d72610aacaec4ba5e))



# [0.4.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.3.0...v0.4.0) (2025-07-03)


### Features

* **auth:** add basic structure and styling for login page (no auth logic yet) ([011bc65](https://github.com/nilotpaldhar/storekeeper/commit/011bc65bd15ef7b6962fae3d4bed1a7d3eba7289))
* **auth:** add helper to sync user with Commerce Layer customer and store reference ID ([a3752c9](https://github.com/nilotpaldhar/storekeeper/commit/a3752c95c9c5d0a981941e5aa8b848b00ddab947))
* **auth:** implement user authentication using Auth.js ([89316e4](https://github.com/nilotpaldhar/storekeeper/commit/89316e47559878b76418fcd8fb75bb84b4211d0e))



