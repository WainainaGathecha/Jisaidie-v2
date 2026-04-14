# Jisaidie v2 — Project Guide

**Project:** Jisaidie — Local Business Directory  
**Version:** v2  
**Location Focus:** Juja, Kiambu County, Kenya  
**Stack:** HTML · Tailwind CSS · Vanilla JavaScript  
**Status:** Development

---

## Overview

Jisaidie v2 is a local business directory built for a specific Kenyan town — Juja. The product connects residents with local businesses across categories: food, automotive, health, hardware, retail, and services. The scope is intentionally narrow. One town, real business data, real locations.

This version is a portfolio build. The architecture and decisions made here are designed to be production-ready so the product can be taken further after this version is complete.

The name Jisaidie means "help yourself" in Swahili — the product philosophy in two words.

---

## Design Direction — Nairobi Modern

Warm, grounded, and distinctly Kenyan without leaning on clichés. The palette references the landscape — savanna greens, ochre earth, warm stone. Typography is purposeful and readable across all literacy levels and device sizes. The layout is structured and calm. Nothing shouts.

---

## Design System

### Color Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--color-bg` | `#F5F0EB` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels |
| `--color-surface-muted` | `#EDE8E3` | Input backgrounds, subtle sections |
| `--color-border` | `#D9D0C7` | Borders, dividers |
| `--color-text-primary` | `#1A1A1A` | Headings, body |
| `--color-text-secondary` | `#6B6560` | Labels, metadata, captions |
| `--color-accent` | `#2D6A4F` | Primary actions, links, active states |
| `--color-accent-hover` | `#235540` | Hover state for accent |
| `--color-gold` | `#C9A84C` | Secondary accent, badges, highlights |
| `--color-gold-muted` | `#F5EDD4` | Gold badge backgrounds |

### Typography

| Role | Family | Weight | Size |
| --- | --- | --- | --- |
| Display / Hero | DM Serif Display | 400 | `text-4xl` – `text-6xl` |
| Headings | DM Sans | 700 | `text-xl` – `text-3xl` |
| Body | DM Sans | 400 | `text-base` |
| Labels / Metadata | DM Sans | 500 | `text-xs` – `text-sm` |
| Category names | DM Sans | 600 | `text-sm` uppercase tracked |

Both fonts loaded from Google Fonts. DM Serif Display for all hero and section headlines — it gives the product warmth and editorial character. DM Sans for all UI text — clean and readable at small sizes.

### Spacing

Base spacing unit: `4px`. Consistent use of Tailwind's spacing scale.

| Context | Value |
| --- | --- |
| Page horizontal padding (mobile) | `px-5` |
| Page horizontal padding (desktop) | `px-8` to `px-16` |
| Section vertical padding | `py-16` to `py-24` |
| Card internal padding | `p-5` to `p-6` |
| Gap between cards | `gap-4` to `gap-6` |

### Iconography

Lucide icons throughout. Consistent stroke width: `1.5`. Size: `20px` for UI icons, `24px` for category icons. No filled icons — outline only.

---

## Architecture

### File Structure

```markup
jisaidie-v2/
├── index.html                  # Home page
├── search.html                 # Category / search results page
├── listing.html                # Business detail page
├── style.css                   # Tailwind directives + custom CSS
├── script.js                   # Shared interaction logic
├── data/
│   └── businesses.js           # All business data as a JS array
├── assets/
│   ├── images/
│   │   ├── businesses/         # Business photos (WebP)
│   │   ├── categories/         # Category cover images (WebP)
│   │   └── og-image.png
│   └── icons/                  # Any custom SVG icons
└── pages/
    ├── search.js               # Search and filter logic
    └── listing.js              # Listing page render logic
```

### Data Architecture

All business data lives in `data/businesses.js` as a single exported array of objects. This is the same pattern used in Jisaidie v1 and — data-driven rendering from a structured source.

Each business object follows this schema:

```javascript
{
  id: "juja-001",
  name: "Business Name",
  category: "food",                     // see category list below
  subcategory: "restaurant",
  description: "One paragraph description.",
  address: "Shop 4, Juja Town Centre",
  area: "Juja Town",                    // local area within Juja
  phone: "+254 700 000 000",
  whatsapp: "+254700000000",            // digits only, no spaces
  hours: "Mon–Sat: 8am–8pm",
  tags: ["lunch", "local food", "affordable"],
  images: ["assets/images/businesses/juja-001-1.webp"],
  featured: false,
  verified: true
}
```

### Categories

| Slug | Display Name |
| --- | --- |
| `food` | Food & Drink |
| `automotive` | Automotive |
| `health` | Health & Wellness |
| `hardware` | Hardware & Building |
| `retail` | Retail & Shopping |
| `services` | Services |
| `education` | Education |

---

## Pages

### 1. Home (`index.html`)

**Purpose:** Entry point. Communicates what Jisaidie is, lets users find businesses by category or search, and surfaces featured listings.

**Sections:**

- Navbar — logo, search bar (desktop), nav links
- Hero — headline, subheadline, search input (mobile + desktop), location badge ("Juja, Kiambu")
- Category grid — 7 category cards, icon + label
- Featured listings — 3–6 business cards marked `featured: true` in data
- Footer

**Key interaction:** Search input in the hero submits to `search.html?q=query&category=all`.

---

### 2. Search / Category Results (`search.html`)

**Purpose:** Displays filtered business listings. Reached from category grid or search.

**Sections:**

- Navbar
- Page header — "Results for [query]" or "[Category Name] in Juja"
- Filter bar — category filter, area filter (Juja Town, Gachororo, Theta, etc.)
- Results grid — business cards
- Empty state — shown when no results match
- Footer

**Key interactions:**

- URL params drive the initial filter state (`?q=`, `?category=`)
- Filter changes update the URL and re-render the grid without a page reload
- Search input in the navbar re-queries on submit

---

### 3. Business Detail (`listing.html`)

**Purpose:** Full information page for a single business.

**Sections:**

- Navbar
- Business header — name, category badge, verified badge, address
- Photo gallery — single image or basic image strip
- About — full description
- Info panel — phone, WhatsApp button, hours, address with area
- Related businesses — 3 cards from the same category

**Key interactions:**

- WhatsApp button opens `https://wa.me/{number}?text=Hi, I found you on Jisaidie`
- Phone number is a `tel:` link
- Page is populated by reading a business `id` from the URL (`?id=juja-001`) and finding the matching object in the data array

---

## Components

These are repeated UI patterns across pages. Build them once in your mind, then copy consistently.

### Navbar

```markup
[Logo]          [Search bar — desktop only]          [Browse | About]
```

On mobile: logo left, hamburger right. Search lives in the hero on mobile.

### Business Card

Used on Home (featured) and Search results.

```markup
┌────────────────────────────┐
│  [Business photo]          │
│  Category badge            │
│  Business name             │
│  Address · Area            │
│  [Tag] [Tag]               │
└────────────────────────────┘
```

### Category Card

Used in the Home category grid.

```markup
┌──────────────┐
│  [Icon]      │
│  Food & Drink│
└──────────────┘
```

### Filter Bar

Used on the Search page.

```markup
[All] [Food] [Auto] [Health] ...   |   Area: [Juja Town ▾]
```

---

## Interactive Features

### Search

A single function reads the `q` URL parameter, filters `businesses.js` by matching the query against `name`, `description`, `tags`, and `subcategory`, and renders matching cards into the results grid.

```javascript
function filterBusinesses(query, category, area) {
  return businesses.filter(b => {
    const matchesQuery = !query ||
      b.name.toLowerCase().includes(query) ||
      b.tags.some(t => t.includes(query)) ||
      b.description.toLowerCase().includes(query);
    const matchesCategory = !category || category === 'all' || b.category === category;
    const matchesArea = !area || area === 'all' || b.area === area;
    return matchesQuery && matchesCategory && matchesArea;
  });
}
```

### URL-Driven Filter State

Filter selections update the URL with `history.pushState` so the page state is shareable and the back button works correctly.

### WhatsApp Integration

Every business card and listing page includes a WhatsApp CTA. The link format:

```javascript
`https://wa.me/${business.whatsapp}?text=${encodeURIComponent('Hi, I found you on Jisaidie. I\'d like to enquire about your services.')}`
```

### Render Pattern

All dynamic content uses the same data-driven render pattern from Jisaidie v1:

```javascript
function renderCards(businesses) {
  const container = document.getElementById('results-grid');
  container.innerHTML = businesses.map(b => businessCardHTML(b)).join('');
}
```

No DOM manipulation. Pure string template rendering into `innerHTML`.

---

## Local Data — Juja Focus Areas

Business entries cover these specific areas within Juja:

- Juja Town Centre
- Gachororo
- Theta
- Juja Farm
- Kalimoni
- JKUAT Area

Each area has at least 3–5 business entries before launch.

---

## Build Phases

### Phase 1 — Foundation

- [ ] Project folder and file structure
- [ ] Tailwind CSS setup
- [ ] CSS custom properties and `@theme` tokens
- [ ] Google Fonts loaded (DM Serif Display + DM Sans)
- [ ] `businesses.js` data file scaffolded with 10 real Juja businesses

### Phase 2 — Home Page

- [ ] Navbar (desktop + mobile)
- [ ] Hero section with search input
- [ ] Category grid (7 categories)
- [ ] Featured listings section (rendered from data)
- [ ] Footer

### Phase 3 — Search / Results Page

- [ ] Page header with dynamic title
- [ ] Filter bar (category + area)
- [ ] Results grid (rendered from data + URL params)
- [ ] Empty state
- [ ] URL-driven filter state

### Phase 4 — Business Detail Page

- [ ] Business header
- [ ] Photo display
- [ ] Info panel (phone, WhatsApp, hours)
- [ ] Related businesses (same category)
- [ ] URL param → data lookup

### Phase 5 — Polish and Accessibility

- [ ] Semantic HTML audit
- [ ] ARIA labels on icon-only controls
- [ ] Keyboard navigation check
- [ ] Focus indicators
- [ ] Skip to content link
- [ ] `prefers-reduced-motion` applied

### Phase 6 — Performance and Deployment

- [ ] All images compressed to WebP
- [ ] Lazy loading on all images
- [ ] OG meta tags on all pages
- [ ] Deploy to Vercel or GitHub Pages
- [ ] Custom domain (jisaidie.app if available)

---

## Future Potential (Post v2)

This section is noted for reference only. Nothing here is in scope for v2.

- User-submitted business listings with a review queue
- Business owner claim and profile management
- Ratings and reviews
- Expand to additional Kenyan towns
- React or Next.js migration for dynamic routing and server-side rendering
- Map integration (Google Maps or OpenStreetMap)
- SMS search via a short code (for users without smartphones)

---

---

### Before deployment

- Add real images for the listings
