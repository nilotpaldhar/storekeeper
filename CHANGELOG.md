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



# [0.3.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.2.0...v0.3.0) (2025-06-28)


### Features

* **layout:** add storefront layout with header and footer ([5eda0f1](https://github.com/nilotpaldhar/storekeeper/commit/5eda0f1fd8d08682d372fc5e219bd4bf41444677))
* **not-found:** add custom 404 page to handle invalid routes gracefully ([448bc40](https://github.com/nilotpaldhar/storekeeper/commit/448bc400ba78e3023c6169e404598867ee251195))
* **pages:** add static pages and restructure lib directory ([28ac36e](https://github.com/nilotpaldhar/storekeeper/commit/28ac36e8a61edadd3fae689bf4c8570c0a2d1548))
* **seo:** add global and page-level SEO settings ([3fc90df](https://github.com/nilotpaldhar/storekeeper/commit/3fc90dfbb32b033feab7766856a1d16edbb5b0af))



