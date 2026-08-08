# ANGELS PEAK — Complete Project Handover Document

**Client Submission & Technical Handover Manual**  
*Project Name:* ANGELS PEAK (Built in Chaos. Above All.)  
*Architecture:* Headless E-Commerce System  
*Frontend Framework:* Next.js 16 (React 19, App Router)  
*Backend Engine:* Shopify Headless E-Commerce (Storefront & Admin GraphQL API 2024-01)  

---

## 1. Executive Summary & Overview

**ANGELS PEAK** is a high-concept, luxury streetwear e-commerce platform built as a headless web application. The platform blends a dark, immersive aesthetic with high-performance headless architecture.

- **Frontend Application:** Built using **Next.js 16 (App Router)** and **React 19**, incorporating smooth micro-interactions, dark mode aesthetics, dynamic cursor feedback, custom audio controllers, preloading animations, and server-side rendering for optimal speed and SEO performance.
- **Backend & Commerce Engine:** Powered by **Shopify**, providing robust order management, inventory control, payment gateway processing, customer management, and secure checkout while allowing total front-end design freedom.

---

## 2. System Architecture & Tech Stack

```
+-----------------------------------------------------------------------+
|                            USER BROWSER                               |
|   (Next.js 16 Client & Server Components / Custom Animations / UI)    |
+-----------------------------------++----------------------------------+
                                    ||
                 GraphQL API Fetch  || Server Actions / API Routes
                                    \/
+-----------------------------------------------------------------------+
|                    SHOPIFY STOREFRONT GRAPHQL API                     |
|                 (Endpoint: /api/2024-01/graphql.json)                 |
+-----------------------------------++----------------------------------+
                                    ||
                Cart Creation / Checkout Handoff / Mutations
                                    \/
+-----------------------------------------------------------------------+
|                     SHOPIFY SECURE CHECKOUT PORTAL                    |
|                (Payment Processing, Taxes, Shipping)                  |
+-----------------------------------------------------------------------+
```

### Core Technologies

| Layer | Technology / Tool | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16.2.9 (App Router) | Server-side rendering (SSR), static generation (SSG), Incremental Static Revalidation (ISR), client routing. |
| **UI Rendering** | React 19.2.4 & React-DOM | Component architecture, state hooks, context management. |
| **Styling & Theme** | Vanilla CSS Design Tokens & PostCSS / Tailwind CSS v4 | Dark mode design system, custom typography, backdrop blurs, responsive grids. |
| **E-Commerce Engine** | Shopify Headless Storefront | Catalog management, product variants, inventory, cart creation, and checkout. |
| **API Layer** | Shopify Storefront GraphQL API (2024-01) | Decoupled data fetching and GraphQL mutations. |
| **State Management** | React Context (`CartContext.js`) | Global shopping cart state with optimistic UI updates & `localStorage` persistence. |
| **Server Operations** | Next.js Server Actions | Asynchronous waitlist processing (`waitlist.js`). |

---

## 3. Directory & File Structure Map

```
angelspeak/
├── app/                        # Next.js App Router Root
│   ├── about-us/               # Brand story & identity page
│   ├── actions/                # Server Actions
│   │   └── waitlist.js         # Waitlist customer creation server action
│   ├── api/                    # API Route Handlers
│   │   └── search/
│   │       └── route.js        # Search API querying Shopify product catalog
│   ├── checkout/               # Checkout bridge page
│   │   └── page.js             # Automated redirect to Shopify Checkout URL
│   ├── components/             # Reusable UI Components
│   │   ├── Accordion.js        # Expandable product details & shipping tabs
│   │   ├── AddToCartForm.js    # Quantity & size selector with Add to Cart trigger
│   │   ├── AudioToggle.js      # Ambient background audio player toggle
│   │   ├── CartDrawer.js       # Side-drawer sliding shopping cart UI
│   │   ├── CustomCursor.js     # Custom interactive cursor effect
│   │   ├── Navbar.js           # Navigation bar with drop menu & search trigger
│   │   ├── Preloader.js        # Site launch loading screen
│   │   ├── ProductCard.js      # Individual product grid item with quick-add
│   │   ├── ProductCarousel.js  # Horizontal product slider component
│   │   ├── ProductGallery.js   # Multi-image product gallery with zoom/thumbnails
│   │   ├── ProductGrid.js      # Responsive multi-column layout grid
│   │   ├── ProductTabs.js      # Filterable tab bar for product categories
│   │   ├── PromoBanner.js      # Announcement marquee banner
│   │   ├── ReelVideo.js        # Video reel hero feature
│   │   ├── ScrollReveal.js     # Intersection observer scroll animations
│   │   ├── StickyHeader.js     # Sticky header container
│   │   ├── WaitlistForm.js     # VIP drop access signup form
│   │   └── WhatsAppButton.js   # Floating WhatsApp customer support button
│   ├── context/
│   │   └── CartContext.js      # Cart provider managing cart state & Shopify sync
│   ├── lib/
│   │   └── shopify.js          # Core Shopify GraphQL fetcher & mutation definitions
│   ├── privacy-policy/         # Privacy Policy document page
│   ├── refund-policy/          # Refund & Return Policy page
│   ├── search/                 # Dedicated search result page
│   ├── shop/                   # Catalog & Product routes
│   │   ├── [slug]/             # Dynamic Single Product Page
│   │   │   └── page.js         # SSR single product viewer
│   │   ├── page.js             # Shop collection catalog wrapper
│   │   └── ShopClient.js       # Interactive shop grid client component
│   ├── globals.css             # Design tokens, variables, animations, dark theme
│   ├── layout.js               # Root layout wrapper (Header, Footer, Cart, Cursor)
│   ├── page.js                 # Homepage hero, featured drops, video reels
│   └── icon.png                # Favicon asset
├── data/
│   └── products.js             # Fallback dataset for products & collections
├── public/                     # Static media assets (Images, Videos, Audio)
├── import-products.js          # Shopify Admin GraphQL import utility script
├── test-shopify.js             # Storefront API product query verification script
├── test-collections.js         # Storefront API collection query verification script
├── next.config.mjs             # Next.js config (Remote image domain permissions)
├── package.json                # Project dependencies and script declarations
├── .env                        # Environment variable configuration (Git ignored)
└── .env.local                  # Local development environment overrides
```

---

## 4. Frontend & User Interface Architecture

### Key UI Features & Design Aesthetics
1. **Dark Mode & Luxury Aesthetics:** Custom black/gold/gray palette configured via CSS custom properties in `globals.css` with noise overlay effects.
2. **Custom Interactive Cursor:** `CustomCursor.js` provides fluid cursor trailing and interactive state visual cues on hover.
3. **Ambient Audio Toggle:** `AudioToggle.js` allows users to enable/disable atmospheric background soundscapes.
4. **Preloader & Page Transitions:** `Preloader.js` displays brand loading visualizer prior to site entry.
5. **Interactive Sliding Cart Drawer:** `CartDrawer.js` provides line-item management, quantity controls, subtotal computation, and instant direct checkout access.
6. **Dynamic Product Gallery:** `ProductGallery.js` supports high-resolution imagery, thumbnail switching, and full-screen view modes.

---

## 5. Shopify Backend Integration Details

The project uses Shopify as a **headless backend**, communicating through the **Shopify Storefront GraphQL API** (`/api/2024-01/graphql.json`).

### 1. Product & Collection Fetching
- `getProducts()`: Queries Shopify for the product catalog including handles, HTML descriptions, price ranges, images, and variant IDs.
- `getCollections()`: Queries top collections and associated products for category-filtered browsing.

### 2. Headless Cart Lifecycle (`CartContext.js` & `shopify.js`)
- **Cart Initialization (`createCart`):** Triggers `cartCreate` GraphQL mutation upon adding the first item. Stores returned `cartId` and `checkoutUrl` in `localStorage`.
- **Item Addition (`addToCart`):** Uses `cartLinesAdd` GraphQL mutation. Employs **Optimistic UI Updates** to instantly reflect items in the cart before API confirmation.
- **Quantity Update (`updateCartLines`):** Uses `cartLinesUpdate` GraphQL mutation to modify line item quantities.
- **Item Removal (`removeFromCart`):** Uses `cartLinesRemove` GraphQL mutation.
- **Cart Expiration Handling:** Automatically detects expired/stale Shopify carts and seamlessly re-creates a new cart session without interrupting the user.

### 3. Checkout Workflow
When the user clicks "Checkout":
1. The app navigates to `/checkout`.
2. The user is redirected directly to Shopify's encrypted checkout URL (`checkoutUrl`).
3. Shopify handles shipping, taxes, discounts, and payment gateway transactions (e.g., Credit Card, UPI, NetBanking).

### 4. Waitlist & VIP Customer Subscriptions (`subscribeToWaitlist`)
- Form submissions accept **Email** or **Phone Number**.
- Calls `customerCreate` GraphQL mutation on Shopify Storefront API.
- For phone-only signups, automatically formats numbers (e.g., adding `+91`) and generates a system fallback email (`phone@waitlist.angelspeak.com`) to fulfill Shopify requirements.

---

## 6. Environment Variables Configuration

Ensure the following variables are defined in `.env` or `.env.local`:

```env
# Shopify Store Domain (e.g., my-store.myshopify.com)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=51q8ch-m3.myshopify.com

# Shopify Storefront API Public Access Token
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=81f006fbb5e4668401d0d8bba9ebbabe

# (Optional) Shopify Admin Access Token for import/management scripts
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token_here
```

> [!IMPORTANT]
> When deploying to production (e.g., Vercel), add `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` in the environment settings of your hosting dashboard.

---

## 7. Deployment & Operations Guide

### Prerequisites
- **Node.js:** v18.17.0 or later (v20+ recommended).
- **Package Manager:** `npm` (v9+).

### Local Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test Shopify GraphQL connection
node test-shopify.js

# 4. Test Collections connection
node test-collections.js
```

### Production Build & Launch Commands

```bash
# Generate production bundle
npm run build

# Start production server
npm run start
```

### Deploying to Vercel (Recommended)
1. Push repository to GitHub/GitLab.
2. Import project into Vercel Dashboard.
3. Configure Environment Variables (`NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` and `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`).
4. Click **Deploy**. Vercel will automatically build and assign an SSL domain.

---

## 8. Client Maintenance & Operational FAQ

1. **How do I add or update products?**
   - Log into your Shopify Admin dashboard (`https://admin.shopify.com`).
   - Add/edit products under the **Products** section.
   - Products, pricing, and images added in Shopify will automatically sync to the Next.js frontend within 10 seconds (via Next.js revalidation).

2. **Where do orders appear?**
   - All completed purchases appear in Shopify Admin under **Orders**.
   - Fulfillment, tracking notifications, and refund processing are managed directly inside Shopify.

3. **Where do waitlist subscribers go?**
   - Waitlist submissions create customer accounts inside Shopify Admin under **Customers**, tagged for marketing communications.

4. **What happens if a product runs out of stock?**
   - Shopify tracks inventory automatically. The Storefront API updates inventory state, preventing out-of-stock items from being added to the cart.

---

## 9. Contact & Support Information

- **Brand:** Angels Peak
- **Support Email:** theangelspeak@gmail.com
- **Support Phone:** +91 8393900007
- **Operating Address:** Janta Tyre Retreading Works, Khanna Farm, Teenpani, Haldwani, Uttarakhand 263139

---
*Handover Document Completed & Verified for Client Submission.*
