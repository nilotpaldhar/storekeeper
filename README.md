<a name="readme-top"></a>
<br />

<p align="center">
  <img src="https://ik.imagekit.io/haio54fgp/storekeeper/site/logo-github.png" alt="StoreKeeper" />
</p>

<h3 align="center">
  <strong>Headless e-commerce app developed using Next.js, Sanity, and Commerce.js.</strong>
</h3>

<p align="center">
  <a href="https://storekeeper.vercel.app">
    Demo Store
  </a> |
  <a href="https://github.com/nilotpaldhar/storekeeper">
    Documentation
  </a> |
  <a href="https://github.com/nilotpaldhar/storekeeper/issues">
    Request Feature
  </a>
</p>

<p align="center">
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge" />
  </a>
  <a href="https://github.com/nilotpaldhar/storekeeper/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/nilotpaldhar/storekeeper.svg?style=for-the-badge" alt="License">
  </a>
  <a href="https://github.com/nilotpaldhar/storekeeper/pulls">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" />
  </a>
  <a href="https://linkedin.com/in/nilotpaldhar">
    <img alt="Connect on Linkedin" src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=16B" />
  </a>
</p>

![Hero image](https://ik.imagekit.io/haio54fgp/storekeeper/site/overview-github)

<br />

## Features ✨

- Automatically syncs products from Commerce JS into Sanity
- User authentication with **OAuth** support for **Google** and **Facebook**
- Shopping cart with a wishlist feature
- Product details page allowing users to choose from different variants
- Customizable **Filtering & Sorting** for product collections
- Robust search experience powered by **Algolia**
- User dashboard featuring order details, address management, and more
- Custom checkout page
- Minimalist landing page design with editable content through **Sanity Studio**
- Customizable Promotion Banner
- Customizable Cookie Notice
- Accessibility features:
  - Default focus states preserved for keyboard navigation
  - Roving tabindex for radio buttons
  - Input-based quantity counters
  - Required `alt` text for all images
- SEO features:
  - Page-level SEO/Share settings
  - Fallback Global SEO/Share settings

<br />

## Tech Stack 🛠️

- [![React][react.js]][react-url]
- [![Next][next.js]][next-url]
- [![Redux][redux]][Redux-url]
- [![Tailwind CSS][tailwind-css]][tailwind-css-url]
- [![Radix UI][radix-ui]][radix-ui-url]

- **Headless CMS** - **[Sanity.io](https://www.sanity.io)**
- **E-commerce Provider** - **[Commerce JS](https://commercejs.com)**
- **Search Engine** - **[Algolia](https://www.algolia.com)**

<br />

## Getting Started 🚀

These instructions will guide you through the process of setting up the project on your local machine for development and testing purposes.

### **Prerequisites**

- IDE or code editor of your choice
- Node (v18.16.0 or higher)

### **Step 1: Install Dependencies**

- Fork the repository.
- Clone the fork repository to your local machine

```shell
git clone https://github.com/<your_username>/storekeeper.git
cd storekeeper
```

- Copy environment variables from `.env.sample` to `.env`

```shell
cp .env.example .env
```

- Install the dependencies with `yarn`

```shell
yarn
```

### **Step 2: Set up Commerce JS**

- Create a free [Commerce Js](https://authorize.chec.io/signup) Account
- Visit [dashboard.chec.io](https://dashboard.chec.io) and go to `DEVELOPER > API keys & CORS`
- Open the `.env` file and replace the `API KEYS` with your own:

```
CHEC_API_URL="api.chec.io"
CHEC_PUBLIC_API_KEY="<CHEC_PUBLIC_API_KEY>"
CHEC_SECRET_API_KEY="<CHEC_SECRET_API_KEY>"
```

- Now, go to `DEVELOPER > Webhooks` and add the following webhooks:
  - **product.create** - `[live-domain]/api/webhooks/commerce/product`
  - **product.update** - `[live-domain]/api/webhooks/commerce/product`
  - **product.delete** - `[live-domain]/api/webhooks/commerce/product`
  - **categories.create** - `[live-domain]/api/webhooks/commerce/category`
  - **categories.update** - `[live-domain]/api/webhooks/commerce/category`
  - **categories.delete** - `[live-domain]/api/webhooks/commerce/category`
  - **orders.create** - `[live-domain]/api/webhooks/commerce/order`

> *Caution: Use a real domain, not localhost! During development, use your Vercel project URL, then switch to the production domain. If unsure of the Vercel URL until deployment, use a temporary placeholder, but update it post-deployment.*

### **Step 3: Configure Sanity Studio**

- Make sure you have the [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) installed globally first
- Navigate to the `studio` folder from the root of your project & install dependencies

```shell
cd studio
yarn
```

- Copy environment variables from `.env.sample` to `.env`

```shell
cp env.example .env
```
 
- Initialize the **Sanity Studio**.

```shell
sanity init
```

- When it asks you what `DATASET` configuration to use, go with the `default`.
- After initialization, open `studio/.env` and add `PROJECT_ID` and `DATASET` variables

```
SANITY_STUDIO_SANITY_PROJECT_ID="<SANITY_PROJECT_ID>"
SANITY_STUDIO_DATASET="production"
```

### **Step 4: Add CORS Origins to the Sanity project**

- Visit [manage.sanity.io](https://manage.sanity.io) and go to `[your-project] > API > CORS ORIGINS`
- Add your Studio URLs **_with_** credentials: `http://localhost:3333` and `[subdomain].sanity.studio`
- Add your front-end URLs **_without_** credentials: `http://localhost:3000` and `https://[subdomain].vercel.app`

### **Step 5: Generate mock products**

- Launch the development server from the root directory of your project

```shell
yarn dev
```

> Your front end should be running on [localhost:3000](http://localhost:3000)

- To generate mock products, send a `GET` request to this endpoint: `http://localhost:3000/api/scripts?task=generate-mock-data`. We're using `curl` here, feel free to send the request from a browser or utilize an API testing tool such as `POSTMAN`.

```shell
curl https://localhost:3000/api/scripts?task=generate-mock-data
```

> *Note: The request might require a few minutes to complete. Interrupting the process could potentially corrupt your data.*

### **Step 6: Sync products with Algolia**

- If you haven't already, [sign up](https://dashboard.algolia.com/users/sign_up) for an Algolia account on their website. If you're an existing user, [log in](https://dashboard.algolia.com/users/sign_in) to your Algolia account.
- Navigate to your Algolia dashboard and create a new application. After creating the application obtain `Application ID`, `Search-Only API Key` and `Admin API Key`
- Now open the `.env` file and replace the following environmental variables

```
NEXT_PUBLIC_ALGOLIA_APP_ID="<ALGOLIA_APP_ID>"
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY="<ALGOLIA_SEARCH_ONLY_API_KEY>"
ALGOLIA_ADMIN_KEY="<ALGOLIA_ALGOLIA_ADMIN_KEY>"
```

- To sync products with Algolia, send a `POST` request to this endpoint `http://localhost:3000/api/webhooks/algolia/sync-all?token=<ALGOLIA_WEBHOOK_SECRET>`. Replace `<ALGOLIA_WEBHOOK_SECRET>` with your actual Algolia webhook secret, which can be found in the `.env` file.

```shell
curl -X POST http://localhost:3000/api/webhooks/algolia/sync-all?token=<ALGOLIA_WEBHOOK_SECRET>
```

> Make sure the dev server is running on [localhost:3000](http://localhost:3000) before sending the request

<br />

## Deployment 🚀

### Vercel

The easiest way to deploy the application is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Sanity

To deploy your Sanity Studio, go to the `/studio` folder from the root of your project and run the command `sanity deploy`. This command will initiate the deployment process. Follow the instructions to select a subdomain for your Sanity Studio. Once the deployment is complete, you'll receive a **_URL_** where you can access your deployed Sanity Studio.

<br />

## Contribution 🤝

StoreKeeper is an Open Source project and we encourage everyone to help us making it better. If you are interested in contributing to the project, please read our [Contributing Guide](https://github.com/nilotpaldhar/storekeeper/blob/main/CONTRIBUTING.md) and [Code of Conduct](https://github.com/nilotpaldhar/storekeeper/blob/main//CODE_OF_CONDUCT.md).

Discovered a 🐜 or have a feature suggestion? Feel free to [create an issue](https://github.com/nilotpaldhar/storekeeper/issues/new/choose) on GitHub.

<br />

## Support 💗

Like 💖 this project? Support this effort by giving a star 🌟 on GitHub, sharing it in your own blog, and giving a shoutout on Twitter.

<br />

## Licence 👇

You are welcome to use this application however you wish under the [GNU GENERAL PUBLIC LICENSE](https://github.com/nilotpaldhar/storekeeper/blob/main/LICENSE) license.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[redux]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org
[tailwind-css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-css-url]: https://tailwindcss.com
[radix-ui]: https://img.shields.io/badge/radix%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white
[radix-ui-url]: https://www.radix-ui.com
