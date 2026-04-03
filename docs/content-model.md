# Content Model — Gee & Geesus

## Content Types

### 1. Page Content (content.json)

Managed via manage.html. Flat JSON structure, loaded client-side.

```
hero:
  tagline: string (required) — H1 text
  subtitle: string (required) — subheading
  cta: string (required) — booking button text

about:
  title: string (required) — section heading
  lead: string (required) — bold opening sentence
  paragraphs: string[] (required, min 1) — body paragraphs, HTML allowed (<strong>)

services:
  title: string (required) — section heading
  items[]:
    name: string (required) — service name
    desc: string (required) — service description
    time: string (required) — duration (e.g., "40 min")
    price: string (required) — price (e.g., "799 Kč")

gallery:
  title: string (required) — section heading

products:
  title: string (required) — section heading
  desc: string (required) — section description
  items[]:
    name: string (required) — product name
    desc: string (required) — product description
    img: string (required) — image path

booking:
  title: string (required) — section heading
  desc: string (required) — section description

contact:
  title: string (required) — section heading
  email: string (required, email format)
  address: string (required, HTML)
  hours[]:
    days: string (required)
    time: string (required)
  transport: string (required, HTML)
```

### 2. Gallery Photo (gallery.json)

```
gallery[]:
  src: string (required) — image path relative to root
  alt: string (required) — alt text (SEO-optimized)
  wide: boolean (default false) — spans 2 columns
  visible: boolean (default false) — shown on site
```

### 3. Blog Post (MDX files in /content/blog/)

```
frontmatter:
  title: string (required) — post title, used in H1 and og:title
  slug: string (required, unique) — URL slug
  excerpt: string (required, max 160 chars) — meta description and preview text
  author: string (required) — author name
  publishedAt: date (required) — ISO date, used for sorting and display
  updatedAt: date (optional) — last update date
  category: string (required) — single category slug
  tags: string[] (optional) — tag slugs
  featuredImage: string (required) — image path
  featuredImageAlt: string (required) — image alt text
  readingTime: number (auto-calculated) — minutes
  status: enum [draft, published] (default draft)

body: MDX content — supports components: <ServiceCTA>, <ProductCard>, <BookingButton>
```

### 4. Blog Category

```
  name: string (required) — display name
  slug: string (required, unique) — URL slug
  description: string (required) — category description for SEO
  parentCategory: string (optional) — parent slug for hierarchy
```

**Initial categories:**
- `pece-o-vousy` — Péče o vousy
- `panske-strihy` — Pánské střihy
- `zivotni-styl` — Životní styl
- `z-barbershopu` — Z barbershopu (news, events)

### 5. Client Profile (database / auth provider)

```
  id: uuid (auto)
  name: string (required)
  email: string (required, unique, email format)
  passwordHash: string (required)
  phone: string (optional)
  preferredService: string (optional) — service name
  notes: string (optional) — personal notes from barber
  loyaltyPoints: number (default 0)
  visits[]:
    date: date
    service: string
    barber: string
    notes: string
  createdAt: date (auto)
  lastLoginAt: date (auto)
```

### 6. SEO Metadata (per-page)

```
  title: string (required, max 60 chars)
  description: string (required, max 160 chars)
  ogTitle: string (optional, fallback to title)
  ogDescription: string (optional, fallback to description)
  ogImage: string (required) — absolute URL
  canonical: string (auto-generated)
  robots: string (default "index, follow")
  jsonLd: object (optional) — structured data override
```

## Relationships

```
BlogPost → Category (many-to-one)
BlogPost → Tag (many-to-many)
Client → Visit (one-to-many)
GalleryPhoto → Section assignment (via visible flag)
```
