<a name="readme-top"></a>

<br />

<p align="center">
  <img src="https://ik.imagekit.io/haio54fgp/storekeeper/site/logo-github.png" alt="StoreKeeper Logo" width="400" />
</p>

<h2 align="center">
  StoreKeeper – Headless E‑commerce App  
  <small>Built with Next.js, Sanity, and Commerce Layer</small>
</h2>

---

## About This Project 📌

**Purpose:**  
StoreKeeper is a fully headless e‑commerce platform built to demonstrate a **modern, scalable, and flexible online store architecture**. It’s designed for developers and businesses who want a customizable storefront powered by best‑in‑class APIs for content, commerce, and search.

**Why I Created It:**  
I wanted to showcase my ability to design, architect, and implement a complete full‑stack product — from scratch — that mirrors real‑world e‑commerce requirements such as content management, product synchronization, search, and checkout flows.  
This project serves as a **portfolio piece** and a learning experiment in **composable commerce** using Next.js App Router, Sanity.io, Commerce Layer, and Algolia.

**My Role:**  
This is a **solo‑built** project. I handled everything, including:
- UI/UX design from concept to final responsive implementation  
- Frontend development using Next.js, Tailwind CSS, and Shadcn UI  
- Backend logic, database schema design (PostgreSQL + Prisma)  
- API integrations with Sanity.io, Commerce Layer, and Algolia  
- Authentication and session handling  
- Deployment, environment setup, and configuration on Vercel

**Design Choice – Why Commerce Layer Over Building a Custom Checkout Backend:**  
Building a secure, scalable checkout backend from scratch involves **PCI DSS compliance, payment gateway integrations, inventory management, and tax calculations** — all of which are complex and time‑consuming.  
Commerce Layer offers a **battle‑tested, API‑first commerce backend** that handles orders, payments, promotions, inventory, and multi‑currency pricing out of the box.  
It integrates cleanly into a headless architecture, allowing me to focus on the **user experience and business logic** rather than reinventing the entire e‑commerce backend.

---

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

<!-- (Your Getting Started instructions remain unchanged from original) -->

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

## Attribution Notice 🛡️

This project is licensed under the [MIT License](LICENSE), which allows reuse with attribution.  
**However:**  
- You are **not permitted** to claim this project, its design, or its codebase as your own work for job applications, portfolios, or academic submissions.  
- If you use or modify this project, you **must retain** the original attribution to [Nilotpal Dhar](https://linkedin.com/in/nilotpaldhar) in your README and license file.  
- Violations may be reported to relevant academic institutions, hiring managers, or platform administrators.

This clause is meant to protect the integrity of my work while allowing others to learn from and build upon it.

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
