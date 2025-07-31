## [0.9.1](https://github.com/nilotpaldhar/storekeeper/compare/v0.9.0...v0.9.1) (2025-07-31)


### Bug Fixes

* **ci:** set Git user for changelog commits to match GitHub account ([aef7924](https://github.com/nilotpaldhar/storekeeper/commit/aef79249ab31ddf2c5539c0c52a2359062a05f9d))



# [0.9.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.8.0...v0.9.0) (2025-07-31)


### Features

* **category:** add CategoryPage with category-based facet filtering in search ([9a8e5b8](https://github.com/nilotpaldhar/storekeeper/commit/9a8e5b871271ecc9f9583b913776ecf7d817c5c1))
* **sanity:** add SKU and product sync API + admin UI ([4859838](https://github.com/nilotpaldhar/storekeeper/commit/4859838e05ed49381bc5558508c97cfca46346ed))
* **search:** add HeaderSearchBar with autocomplete functionality ([03638f5](https://github.com/nilotpaldhar/storekeeper/commit/03638f5be5a897e492070de4a99f04427bc1f961))
* **search:** add SearchResultsFiltersContent component for displaying search filter widgets ([b9cf17f](https://github.com/nilotpaldhar/storekeeper/commit/b9cf17fd956ba929933d71647192ca83f5d6c38f))
* **search:** add SearchResultsList, LayoutSwitch, and ListSkeleton components ([5c00eb9](https://github.com/nilotpaldhar/storekeeper/commit/5c00eb928ecba99b9d9b96c327cc6c0b478185b8))
* **search:** add SearchResultsPagination component ([38bcb1a](https://github.com/nilotpaldhar/storekeeper/commit/38bcb1abe000a8b26a209f8ad34c753995f81217))
* **search:** add SearchResultsRefinements component to display and clear active search filters ([4e49fe9](https://github.com/nilotpaldhar/storekeeper/commit/4e49fe991ca77bbdcef20b6d1d4e33ccd965fe50))
* **search:** add SearchResultsSort and SearchResultsAttribution for Algolia-powered search results ([a66d5e0](https://github.com/nilotpaldhar/storekeeper/commit/a66d5e0ab44af7d865e40fb2bfefd439139602a1))
* **search:** add SearchResultsView with initial layout structure ([4038b5b](https://github.com/nilotpaldhar/storekeeper/commit/4038b5bd7bdd866dbe0e831dd5ab90c2eaa28d36))



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



