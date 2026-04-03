# Page Layout Patterns — Gee & Geesus

## Global Shell

```
┌─────────────────────────────────────┐
│  Nav (fixed, 72px / 64px mobile)    │
├─────────────────────────────────────┤
│                                     │
│  <main>                             │
│    Page content (varies by type)    │
│  </main>                            │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
├─────────────────────────────────────┤
│  Mobile Sticky CTA (mobile only)    │
└─────────────────────────────────────┘
```

All pages share: Nav + Footer + Mobile CTA. Content area varies.

---

## Pattern 1: Marketing Page (Homepage)

Full-width sections alternating between base and raised backgrounds. Each section has generous vertical padding. Content within a max-1200px container.

```
┌─────────────────────────────────────┐  100vh
│  HERO (full viewport)               │
│  ┌─────────────────────────────┐    │
│  │ Logo                        │    │
│  │ H1 (Bebas, centered)       │    │
│  │ Subtitle (centered)        │    │
│  │ [CTA Button]               │    │
│  └─────────────────────────────┘    │
│  ↓ scroll indicator                 │
├─────────────────────────────────────┤  bg: base
│  ABOUT                              │
│  ┌──────────┬──────────────────┐    │
│  │  Photo   │  Lead text       │    │  2-col grid, gap 4rem
│  │  3:4     │  Paragraphs      │    │  Photo left, text right
│  │          │  (left-aligned)  │    │  Mobile: photo on top
│  └──────────┴──────────────────┘    │
├─────────────────────────────────────┤  bg: raised
│  SERVICES                           │
│  [Section Header - centered]        │
│  ┌────┬────┬────┬────┐              │  4-col grid
│  │Card│Card│Card│Card│              │  Mobile: 1-col stack
│  └────┴────┴────┴────┘              │
├─────────────────────────────────────┤  bg: base
│  GALLERY                            │
│  [Section Header - centered]        │
│  ┌────────────┬──────┬──────┐       │  4-col masonry-like
│  │  Wide      │  1:1 │  1:1 │       │  Wide items: span 2
│  ├──────┬─────┴──────┤──────┤       │
│  │ 1:1  │   Wide     │ 1:1  │       │
│  └──────┴────────────┴──────┘       │
├─────────────────────────────────────┤  bg: raised
│  BLOG PREVIEW                       │
│  [Section Header - centered]        │
│  ┌─────────┬─────────┬─────────┐    │  3-col grid
│  │BlogCard │BlogCard │BlogCard │    │  Mobile: 1-col
│  └─────────┴─────────┴─────────┘    │
│            [Všechny články →]       │
├─────────────────────────────────────┤  bg: base
│  PRODUCTS                           │
│  [Section Header - centered]        │
│  ┌───────────────┬───────────────┐  │  2-col grid
│  │  ProductCard  │  ProductCard  │  │
│  └───────────────┴───────────────┘  │
├─────────────────────────────────────┤  bg: gradient
│  BOOKING CTA                        │
│  [Section Header - centered]        │
│  ┌────────────────────────────┐     │  max-700px centered
│  │  Noona iframe (white bg)   │     │
│  └────────────────────────────┘     │
├─────────────────────────────────────┤  bg: base
│  CONTACT                            │
│  [Section Header - centered]        │
│  ┌──────────────┬──────────────┐    │  2-col grid
│  │  Info blocks  │  Google Map  │    │
│  └──────────────┴──────────────┘    │
└─────────────────────────────────────┘
```

### Responsive behavior
- Desktop (>1024px): full grid layouts as shown
- Tablet (768-1024px): services 2-col, gallery 2-col, blog 2-col
- Mobile (<768px): all single column, hero logo smaller, section padding reduced

---

## Pattern 2: Content Page (Services, About, Products)

Page hero (shorter) + content sections. Same section-based scroll as homepage but with dedicated deeper content.

```
┌─────────────────────────────────────┐  50vh
│  PAGE HERO                          │
│  ┌─────────────────────────────┐    │
│  │ Breadcrumb                  │    │
│  │ H1 (Bebas, centered)       │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  Content sections                   │
│  (Same section components as home)  │
│  + Additional detail content        │
├─────────────────────────────────────┤
│  BOOKING CTA (always present)       │
└─────────────────────────────────────┘
```

---

## Pattern 3: Blog / Editorial

Narrow reading column centered on page. Sticky sidebar optional on desktop.

```
┌─────────────────────────────────────┐
│  PAGE HERO (compact, 30vh)          │
│  ┌─────────────────────────────┐    │
│  │ Category badge              │    │
│  │ H1 (Bebas, centered)       │    │
│  │ Date · Reading time         │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐     │  max-680px centered
│  │                            │     │
│  │  Featured image (full)     │     │
│  │                            │     │
│  │  Body text (Inter light)   │     │  line-height: 1.7
│  │  line-length: 65-75ch      │     │  font: base (15.2px)
│  │                            │     │
│  │  [Blog CTA Banner]         │     │  After ~60% of content
│  │                            │     │
│  │  Continue reading...       │     │
│  │                            │     │
│  └────────────────────────────┘     │
│                                     │
├─────────────────────────────────────┤
│  RELATED POSTS                      │
│  ┌─────────┬─────────┬─────────┐    │  3 blog cards
│  │BlogCard │BlogCard │BlogCard │    │
│  └─────────┴─────────┴─────────┘    │
├─────────────────────────────────────┤
│  BOOKING CTA                        │
└─────────────────────────────────────┘
```

### Blog index layout
```
┌─────────────────────────────────────┐
│  PAGE HERO (compact)                │
│  H1: "Blog" / Category name        │
├─────────────────────────────────────┤
│  Category filters (horizontal)      │
│  [Vše] [Vousy] [Střihy] [Lifestyle] │
├─────────────────────────────────────┤
│  ┌─────────┬─────────┬─────────┐    │  3-col grid
│  │BlogCard │BlogCard │BlogCard │    │  Paginated
│  ├─────────┼─────────┼─────────┤    │
│  │BlogCard │BlogCard │BlogCard │    │
│  └─────────┴─────────┴─────────┘    │
│        [Další články →]             │
└─────────────────────────────────────┘
```

---

## Pattern 4: Account Pages (Profile, Auth)

Narrow centered form layout with clear sections.

```
┌─────────────────────────────────────┐
│  Nav (with profile avatar/name)     │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐     │  max-480px centered
│  │  Page title (H1)           │     │
│  │                            │     │
│  │  ┌──────────────────────┐  │     │
│  │  │  Form section        │  │     │  bg: surface-card
│  │  │  (grouped fields)    │  │     │  rounded, padded
│  │  └──────────────────────┘  │     │
│  │                            │     │
│  │  ┌──────────────────────┐  │     │
│  │  │  Another section     │  │     │
│  │  └──────────────────────┘  │     │
│  │                            │     │
│  └────────────────────────────┘     │
│                                     │
└─────────────────────────────────────┘
```

### Profile dashboard (wider)
```
┌─────────────────────────────────────┐
│  Nav                                │
├─────────────────────────────────────┤
│  ┌──────────────────────────────┐   │  max-1200px
│  │  Welcome back, [Name]       │   │
│  │                              │   │
│  │  ┌────┬────┬────┐           │   │  Stats cards
│  │  │ 12 │  4 │ 2  │           │   │  Visits, Points, Since
│  │  └────┴────┴────┘           │   │
│  │                              │   │
│  │  [Visit history list]        │   │  Rows with date/service
│  │                              │   │
│  │  [Quick book button]         │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## Section Spacing Rules

| Context | Desktop | Mobile |
|---------|---------|--------|
| Section vertical padding | 96px (24 units) | 64px (16 units) |
| Section header to content | 64px (16 units) | 40px (10 units) |
| Between cards in grid | 24px (6 units) | 16px (4 units) |
| Container horizontal padding | 24px (6 units) | 24px (6 units) |
| Between text paragraphs | 16px (4 units) | 16px (4 units) |
| Blog body vertical | 96px top, 96px bottom | 64px |

---

## Alternating Section Background Rule

Sections alternate between `surface-base` (#1a1a1a) and `surface-raised` (#252525) to create depth without borders. The pattern:

1. Hero — has own overlay, no bg needed
2. About — base
3. Services — raised
4. Gallery — base
5. Blog preview — raised
6. Products — base OR raised (depending on position)
7. Booking CTA — gradient (raised → anthracite-light)
8. Contact — base
