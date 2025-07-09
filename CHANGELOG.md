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



# [0.2.0](https://github.com/nilotpaldhar/storekeeper/compare/v0.1.0...v0.2.0) (2025-06-22)


### Features

* **logging:** add centralized withLogger HOF and logEvent helper for standardized API logging ([2539d8b](https://github.com/nilotpaldhar/storekeeper/commit/2539d8b98b55b90868418749f2f007d1a9429067))
* **sanity:** add product-related schemas and SyncSkusBanner for syncing SKUs with Commerce Layer ([787c154](https://github.com/nilotpaldhar/storekeeper/commit/787c1541072fda614348b2de844e2914052391b2))
* **sanity:** add sanity schema for generalSettings, seoSettings, and socialSettings ([1476159](https://github.com/nilotpaldhar/storekeeper/commit/14761590055d210fcebd93c8a5567b6e1782f911))
* **sanity:** add sanity schemas for headerSettings, footerSettings, and menu ([1c5b22a](https://github.com/nilotpaldhar/storekeeper/commit/1c5b22acb21493e4bac541a15603934079239934))
* **sanity:** add Sanity schemas for page, homePage, and notFoundPage ([809baff](https://github.com/nilotpaldhar/storekeeper/commit/809baff9208b018afdf3fae23bef761a3695295f))
* **sanity:** add schema for navMegaDropdown; refine menu schema structure ([d0390bb](https://github.com/nilotpaldhar/storekeeper/commit/d0390bb09ba350e7457dc18dc6de6e8d0424c7ce))
* **sanity:** initialize Sanity Studio with basic configuration ([c17c296](https://github.com/nilotpaldhar/storekeeper/commit/c17c2961d0ade8259debae53dcfad842de348279))



# [0.1.0](https://github.com/nilotpaldhar/storekeeper/compare/9cef2e05ea76a688759c403a328e991374a7f966...v0.1.0) (2025-05-26)


### Features

* **ui:** add form components – Input, Label, Textarea, RadioGroup, Select ([97ee46a](https://github.com/nilotpaldhar/storekeeper/commit/97ee46a291db1b6bbe61f55af5a67c67c6eab77e))
* **ui:** add reusable alert component ([c5e9fd6](https://github.com/nilotpaldhar/storekeeper/commit/c5e9fd609ec1ba7fcffc984560e9b7b11e5ee2b0))
* **ui:** add reusable Button component ([0c5c52b](https://github.com/nilotpaldhar/storekeeper/commit/0c5c52b5ea6fd1265e1bb8610162edd8449eb6d6))
* **ui:** add reusable empty state component ([b4b5d6d](https://github.com/nilotpaldhar/storekeeper/commit/b4b5d6d668e6b765d44757019db851c011e2b1c3))
* **ui:** add ThreeDotsLoader component with custom animation ([84b9771](https://github.com/nilotpaldhar/storekeeper/commit/84b977149a50c4a30bdf6d6200b8d49b79fc8aac))
* **ui:** initialize shadcn/ui and update tailwind theme with custom CSS variables ([9cef2e0](https://github.com/nilotpaldhar/storekeeper/commit/9cef2e05ea76a688759c403a328e991374a7f966))



