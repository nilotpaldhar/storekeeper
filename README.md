<a name="readme-top"></a>

<br />

<p align="center">
  <img src="https://ik.imagekit.io/haio54fgp/storekeeper/site/logo-github.png" alt="StoreKeeper Logo" width="400" />
</p>

<h2 align="center">
  StoreKeeper – Headless E‑commerce App  
  <small>Built with Next.js, Sanity, and Commerce Layer</small>
</h2>

<p align="center">
  StoreKeeper is a fully headless e‑commerce platform built for speed, flexibility, and scalability—powered by Next.js, Sanity, and Commerce Layer. It enables developers and businesses to launch customizable storefronts with a modern tech stack, robust API integrations, and a seamless shopping experience.
</p>

<p align="center">
  <a href="https://storekeeper.vercel.app"><strong>Live Demo</strong></a> •
  <a href="#readme-top"><strong>Documentation</strong></a> •
  <a href="https://github.com/nilotpaldhar/storekeeper/issues"><strong>Request Feature</strong></a>
</p>

<p align="center">
  <a href="http://commitizen.github.io/cz-cli/">
    <img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge" alt="Commitizen Friendly" />
  </a>
  <a href="https://github.com/nilotpaldhar/storekeeper/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/nilotpaldhar/storekeeper.svg?style=for-the-badge" alt="License: MIT" />
  </a>
  <a href="https://github.com/nilotpaldhar/storekeeper/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" alt="PRs Welcome" />
  </a>
  <a href="https://linkedin.com/in/nilotpaldhar">
    <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=0A66C2" alt="LinkedIn" />
  </a>
</p>

---

<p align="center">
  <img src="https://ik.imagekit.io/haio54fgp/storekeeper/site/overview-github" alt="StoreKeeper App Overview" />
</p>

---

## Features ✨

### **Easy Content & Product Management**
- Intuitive admin dashboard to update pages, landing content, product listings, menus, and SEO settings.  
- One‑click product sync from **Commerce Layer** to the content system.  
- Push products to **Algolia** search instantly for real‑time updates.

### **Seamless User Login**
- Quick sign‑in with secure magic links.  
- Social login options with **Google** and **Facebook**.

### **Modern Shopping Experience**
- Clean, minimalist landing page with fully editable content.  
- Fast‑loading product pages for a smooth browsing experience.  
- Fully functional shopping cart and step‑by‑step checkout flow.  
- Wishlist *(Coming Soon)* to save favorite products.  
- User dashboard *(Coming Soon)* to track orders and manage addresses.  
- Customizable cookie consent banner *(Coming Soon)*.

### **Powerful Search**
- Lightning‑fast search powered by **Algolia**.  
- Filter by category, brand, price, and more.  
- Switch between grid or list layouts with pagination for easy navigation.

### **Accessible to Everyone**
- Works seamlessly with keyboard navigation.  
- Optimized for screen readers.  
- Clear focus indicators for all interactive elements.

### **Search Engine Friendly**
- Page‑level SEO settings for better visibility.  
- Global SEO defaults for consistent branding.

### **Proven Quality (Lighthouse Audit – Product Pages)**  
[![Lighthouse Score: Performance 99 | Accessibility 96 | SEO 100](https://img.shields.io/badge/Lighthouse-Perf%2099%20%7C%20Access%2096%20%7C%20SEO%20100-brightgreen?style=for-the-badge&logo=lighthouse&logoColor=white)](#)  

---

## Tech Stack 🛠️

### **Frontend**
[![Next.js][next.js]][next-url]  
React framework for server‑side rendering, static site generation, and performance‑optimized UIs.

[![React][react.js]][react-url]  
Component‑based JavaScript library for building reusable and interactive UIs.

[![Tailwind CSS][tailwind-css]][tailwind-css-url]  
Utility‑first CSS framework for rapid UI styling.

[![Shadcn UI][shadcn]][shadcn-url]  
Accessible, customizable component library for React.

---

### **Backend & Database**
[![PostgreSQL][postgresql]][postgresql-url]  
Open‑source relational database for structured data storage.

[![Prisma][prisma]][prisma-url]  
Type‑safe ORM for interacting with PostgreSQL.

---

### **Headless Services**
**[Sanity.io](https://www.sanity.io)** – Headless CMS for flexible content management.  
**[Commerce Layer](https://commercelayer.io)** – API‑driven headless commerce backend for products, pricing, and checkout.  
**[Algolia](https://www.algolia.com)** – Hosted search platform for instant, relevant search results.

---

### **Deployment & Hosting**
[![Vercel][vercel]][vercel-url]  
Platform for hosting frontend apps with global CDN, edge functions, and automatic builds.

---

## Getting Started 🚀

Follow these instructions to set up **StoreKeeper** on your local machine.  
You’ll need **Node.js v20+**, **PostgreSQL**, and accounts for **Sanity**, **Commerce Layer**, and **Algolia**.

---

### **Step 1 – Install Project Dependencies**
```bash
# Clone the repository
git clone https://github.com/<your_username>/storekeeper.git

# Navigate into the project folder
cd storekeeper

# Install dependencies
npm install

# Copy the sample environment variables file
cp .env.sample .env
```
> See [.env.sample](.env.sample) for all required keys and values.

---

### **Step 2 – Configure Prisma & PostgreSQL**
```bash
# Add your PostgreSQL connection string to .env
DATABASE_URL="postgresql://username:password@localhost:5432/storekeeper"

# Generate the Prisma client
npm run db:generate

# Apply database migrations
npm run db:migrate
```

---

### **Step 3 – Set Up Sanity Studio**
1. Sanity Studio is already integrated into the project.  
2. Add the following variables to `.env`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
   NEXT_PUBLIC_SANITY_DATASET=<your_dataset>
   SANITY_ACCESS_TOKEN=<your_access_token>
   ```
3. Start the Studio:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000/studio` to confirm it loads.  
> For advanced customization, refer to the [Sanity docs](https://www.sanity.io/docs).

---

### **Step 4 – Set Up Commerce Layer**
1. Create an account at [Commerce Layer](https://commercelayer.io).  
2. Configure your organization, market(s), and stock locations.  
3. Add these credentials to `.env`:
   ```env
   COMMERCE_LAYER_CLIENT_ID=<your_client_id>
   COMMERCE_LAYER_CLIENT_SECRET=<your_client_secret>
   COMMERCE_LAYER_ORGANIZATION=<your_org_slug>
   COMMERCE_LAYER_STOCK_LOCATION_CODE=<your_stock_location_code>
   NEXT_PUBLIC_COMMERCE_LAYER_CURRENCY_CODE=<your_currency_code>
   ```
> See the [Commerce Layer API docs](https://docs.commercelayer.io) for guidance on generating credentials.

---

### **Step 5 – Configure Authentication (NextAuth.js)**
1. NextAuth.js is already installed.  
2. Choose authentication providers (Magic Link, Google, Facebook, etc.).  
3. Add the relevant environment variables to `.env`:
    ```env
    NEXTAUTH_SECRET=<your_nextauth_secret>
    NEXTAUTH_URL=http://localhost:3000

    EMAIL_PROVIDER_API_KEY=<your-email-provider-api-key>
    EMAIL_FROM=noreply@yourdomain.com

    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>

    FACEBOOK_CLIENT_ID=<your_facebook_client_id>
    FACEBOOK_CLIENT_SECRET=<your_facebook_client_secret>
    ```
4. Restart your dev server after saving changes.  
> See the [NextAuth.js docs](https://next-auth.js.org/getting-started/introduction) for complete setup instructions.

---

### **Step 6 – Configure Algolia Search**
1. Create an Algolia account and project.
2. Add the relevant environment variables to `.env`:
    ```env
    NEXT_PUBLIC_ALGOLIA_APP_ID=<your_app_id>
    NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=<your_search_api_key>
    ALGOLIA_WRITE_API_KEY=<your_write_api_key>
    ```
3. Create the following indexes (names must match exactly):
    ```bash 
    products                   # Main product search
    products_price_asc         # Price sorting: low → high
    products_price_desc        # Price sorting: high → low
    products_query_suggestions # Autocomplete suggestions
    ```

---

### **Step 7 – Sync SKUs from Commerce Layer**
1. Add this variable to .env if not already set:
    ```env
    SANITY_COMMERCE_SKU_SYNC_SECRET=<your_sku_sync_secret>
    ```
2. Open Sanity Studio at `/studio` or `/studio/structure`
3. Click "Fetch SKUs" → enter your secret → "Run Sync". This will pull SKUs from Commerce Layer into Sanity as SKU documents.

---

### **Step 8 – Push Products to Algolia**
1. Add this variable to .env if not already set:
    ```env
    ALGOLIA_SANITY_PRODUCTS_SYNC_SECRET=<your_products_sync_secret>
    ```
2. Open Sanity Studio
3. Click "Push products to Algolia" → enter your secret → "Run Sync". This will push all products to the Algolia `products` index.

---

### **Step 9 – Seed Demo Data**
Populate **Sanity** and **Commerce Layer** with sample data:
```bash
npm run data:seed
```
> **Tip:** Only run this on an empty Studio to avoid conflicts.

---

## Deployment 📦

StoreKeeper is optimized for deployment on [Vercel](https://vercel.com).  
Simply connect your GitHub repository, set the environment variables, and deploy.

> For more details, see the [Next.js deployment guide](https://nextjs.org/docs/deployment).

---

## Contributing 🤝

We welcome contributions!  
Please check out the [Code of Conduct](CODE_OF_CONDUCT.md) and open issues on the [Issues page](https://github.com/nilotpaldhar/storekeeper/issues).

---

## Support 💗

If you find this project useful:
- ⭐ Star this repo
- 💬 Share with your network
- 📢 Give us a shoutout on social media

---

## License 📄

Distributed under the [MIT License](LICENSE).

<p align="right">(<a href="#readme-top">Back to top</a>)</p>

---

<!-- MARKDOWN LINKS -->
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[postgresql]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[postgresql-url]: https://www.postgresql.org
[prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[prisma-url]: https://www.prisma.io
[tailwind-css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-css-url]: https://tailwindcss.com
[shadcn]: https://img.shields.io/badge/Shadcn_UI-111827?style=for-the-badge&logo=none&logoColor=white
[shadcn-url]: https://ui.shadcn.com
[vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[vercel-url]: https://vercel.com
