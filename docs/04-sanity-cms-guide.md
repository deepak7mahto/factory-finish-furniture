# 04. Sanity Headless CMS Guide & Studio Operations

This document serves as the complete technical manual for configuring, extending, and operating **Sanity Studio v6** for Factory Finish Furniture.

---

## 1. Project Credentials & Endpoints

| Resource | Value / URL |
| :--- | :--- |
| **Project ID** | `th649m10` |
| **Dataset** | `production` |
| **Organization ID** | `ozg7kfdfp` (Deepak Mahto) |
| **Application ID (App SDK)** | `i4yxt5c9smjht6q4v2vwmy73` |
| **Cloud Studio URL** | [https://factoryfinishfurniture.sanity.studio](https://factoryfinishfurniture.sanity.studio) |
| **Unified Dashboard URL** | [https://www.sanity.io/@ozg7kfdfp/studio/i4yxt5c9smjht6q4v2vwmy73](https://www.sanity.io/@ozg7kfdfp/studio/i4yxt5c9smjht6q4v2vwmy73) |
| **Local Studio Preview** | `http://localhost:3333` (`npm run dev:studio`) |

---

## 2. Studio Architecture & Upgrade to v6

The Studio was upgraded to **Sanity Studio v6.16.0** (with React 19):

* **Content Agent Support:** Sanity's AI Content Agent requires Studio v5.1+ or v6. Upgrading enabled the AI Content Agent directly inside the organization dashboard.
* **Application ID Linking:** Configured in `studio/sanity.cli.ts` under the `deployment` block:
  ```typescript
  import { defineCliConfig } from 'sanity/cli';

  export default defineCliConfig({
    api: {
      projectId: 'th649m10',
      dataset: 'production',
    },
    studioHost: 'factoryfinishfurniture',
    deployment: {
      appId: 'i4yxt5c9smjht6q4v2vwmy73',
    },
  });
  ```
* **Manifest v3 & Schema Deployment:** Deployed with `npx sanity schema deploy` to generate static `create-manifest.json` and register schema models with the Sanity Content Lake.

---

## 3. Content Schema Definitions

The Studio schemas are located in `studio/schemaTypes/`:

### A. `product.ts` (Furniture Product Document)
Defines all fields required for luxury catalog presentation:
* **`title`** *(string, required)*: Full descriptive title (e.g. *Premium Modern Fluted Sideboard & Glass Showcase*).
* **`slug`** *(slug, required)*: Auto-generated from title for routing.
* **`category`** *(string, required)*: Dropdown matching our 6 core categories.
* **`size`** *(string)*: Standard dimensions (e.g. *5 × 3 Feet*).
* **`isCustomizable`** *(boolean)*: Toggles "Custom Size & Finish Available" badge.
* **`material`**, **`finish`**, **`color`**, **`warranty`**: Technical craftsmanship specs.
* **`badge`** *(string)*: Highlight tag (`Best Seller`, `Trending`, `Luxury Choice`, `Devotional`, `Essential`, `With LED`, etc.).
* **`images`** *(array of images)*: Multi-angle photos with:
  * **Hotspot:** Enables interactive crop focus on key craftsmanship details.
  * **`alt`:** Required SEO and accessibility description.
* **`storage`**, **`hardware`**: Internal layout and drawer runner details.
* **`description`** *(text)*: Full workshop notes and cleaning advice.
* **`inStock`** *(boolean)*: Availability toggle.

### B. `blogPost.ts` (Design Guides / Articles)
Powers the educational design guide system:
* **`title`**, **`slug`**, **`publishedAt`**, **`readTime`**
* **`coverImage`**: High-resolution banner image.
* **`featuredProducts`**: References linking directly to furniture products in the catalog.
* **`content`**: Portable Text rich content with headings, callouts, lists, and inline images.

### C. `siteSettings.ts` (Brand & Announcement Banner)
A singleton document containing:
* Brand name, primary phone, WhatsApp number.
* Physical workshop address and Google Maps coordinates.
* Top bar announcement text (e.g. *"FACTORY-DIRECT SAVINGS: SAVE 40–50% VS RETAIL SHOWROOMS"*).

---

## 4. Multi-User Access & Role Management

Sanity provides role-based access control (RBAC). Here is how to onboard your team safely:

### Team Roles:
* **Administrator (Owner - Deepak Mahto):**
  * Full access: edit content, invite members, modify billing, generate API tokens, deploy schemas.
* **Editor (Content Manager):**
  * **CAN:** Create new products, edit descriptions, upload and reorder photos, publish design guides, update site announcements.
  * **CANNOT:** View billing, delete datasets, or generate API secret tokens.

### How to Invite a Content Manager (60 Seconds):
1. Navigate to: **[Sanity Project Members](https://www.sanity.io/organizations/ozg7kfdfp/project/th649m10/members)**.
2. Click **"Invite Member"** (top right).
3. Enter your Content Manager's email address.
4. Select the **"Editor"** role.
5. Click **"Send Invite"**.
6. The Content Manager receives an invitation email, sets their password (or logs in with Google), and accesses:
   👉 **https://factoryfinishfurniture.sanity.studio**

---

## 5. Publishing Checklist for New Products

When your Content Manager adds a new product in the Studio:
1. Enter a clear **Title** containing key attributes (e.g. *Fluted Reeded Glass Crockery Cabinet*).
2. Click **Generate** next to Slug.
3. Select the appropriate **Category** from the dropdown.
4. Upload at least **2 to 3 photos** (front view, open cabinet storage view, and detail/fluting closeup).
5. Add an **Alternative Text** for each photo (e.g. *"Black and gold tall display cabinet with LED lights"*).
6. Select a **Highlight Badge** (e.g. *New Design* or *Trending*).
7. Toggle **Available for Immediate Build / In Stock** to true.
8. Click the green **Publish** button at the bottom. The website will automatically reflect the new product!
