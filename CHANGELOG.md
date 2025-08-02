# All notable changes to this project will be documented in this file.

---

## [0.9.1] - 2025-07-31
### Fixes
- Fixed CI configuration by setting Git user details for changelog commits to match the GitHub account.

---

## [0.9.0] - 2025-07-31
### Features
- **Category Page**:
  - Added category-based facet filtering for more precise search results.
- **Search UI Enhancements**:
  - Added refinements panel to view and clear active filters.
  - Added component for displaying available search filters.
  - Introduced sorting options and Algolia attribution in search results.
  - Implemented pagination for search results.
  - Added multiple product list layouts with loading skeletons.
  - Created flexible search results view structure.
  - Integrated an autocomplete-powered search bar into the header.

---

## [0.8.0] - 2025-07-23
### Features
- **Authentication**:
  - Added logout functionality with client-side redirect.
- **Landing Page Enhancements**:
  - Added product collections section with a responsive grid layout.
  - Introduced category carousel section.
  - Added multiple product showcase sections.
  - Implemented newsletter subscription and feature highlights sections.
  - Integrated promotional banners using the PromoBlockSlider component.
- **Sanity Integration**:
  - Added `collection` schema and integrated it into the `homePage` document.
  - Added `promoBlock` schema and integrated it into the `homePage` document.

---

## [0.7.0] - 2025-07-20
### Features
- **Checkout Flow**:
  - Added success page for completed orders.
  - Implemented "Place Order" functionality.
  - Added payment details step with payment methods API.
  - Added delivery options step with shipping methods API.
  - Created address step and related order APIs.
  - Implemented customer attach API and user details step.
  - Added API endpoint for retrieving order details and `useOrder` hook.
  - Created initial checkout page layout.

---

## [0.6.0] - 2025-07-15
### Features
- **Cart Functionality**:
  - Added coupon apply/remove endpoints and related hooks.
  - Implemented update and delete cart item endpoints with hooks.
  - Added cart, cart count, and add-item APIs with hooks.
  - Created initial cart page layout.

---

## [0.5.0] - 2025-07-09
### Features
- **Product Page**:
  - Added related products section using `ProductCollection` component.
  - Added responsive image gallery for desktop and mobile.
  - Added category breadcrumb trail.
  - Implemented social share popover for product pages.
  - Added product price and inventory APIs.
  - Added collapsible description text and variant selector.
  - Created initial product page layout.

---

## [0.4.0] - 2025-07-03
### Features
- **Authentication**:
  - Added helper to sync user data with Commerce Layer customers.
  - Implemented user authentication using Auth.js.
  - Added basic login page structure and styling.

---

## [0.3.0] - 2025-06-28
### Features
- **Pages & Layout**:
  - Added custom 404 page.
  - Added global and page-level SEO settings.
  - Created static pages and restructured `lib` directory.
  - Implemented storefront layout with header and footer.
- **Sanity Integration**:
  - Added product-related schemas and SKU sync banner.
  - Added `navMegaDropdown` schema and refined menu structure.

---

## [0.2.0] - 2025-06-22
### Features
- **Sanity Studio**:
  - Added schemas for header, footer, and menus.
  - Added schemas for general, SEO, and social settings.
  - Added schemas for page, home page, and 404 page.
  - Initialized Sanity Studio with basic configuration.
- **Logging**:
  - Added centralized logger HOF and `logEvent` helper for API logging.

---

## [0.1.0] - 2025-05-26
### Features
- **UI Components**:
  - Added reusable Empty State, Alert, Loader, Form, and Button components.
  - Initialized Shadcn/UI and updated Tailwind theme with custom CSS variables.
