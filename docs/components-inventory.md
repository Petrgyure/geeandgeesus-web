# Components Inventory — Gee & Geesus

## 1. Button

### Variants
| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|----------|
| **primary** | white | anthracite-900 | none | Main CTA — booking |
| **outline** | transparent | white | 1.5px white | Secondary CTA — service cards |
| **ghost** | transparent | text-muted | none | Tertiary — nav links, read more |
| **nav** | white | anthracite-900 | none | Nav booking button (compact) |

### Sizes
| Size | Padding | Font Size | Min Height |
|------|---------|-----------|------------|
| **sm** | 0.55rem 1.2rem | 0.75rem | 36px |
| **md** | 0.9rem 2.2rem | 0.85rem | 44px |
| **lg** | 1rem 2.8rem | 0.95rem | 48px |
| **full** | md padding, width: 100% | 0.85rem | 44px |

### States
- **default**: as defined per variant
- **hover**: primary → bg-accent-hover, translateY(-2px), shadow-glow-lg. outline → fill white, text anthracite
- **active**: translateY(0), shadow-none
- **disabled**: bg-anthracite-300, text-disabled, cursor-not-allowed
- **loading**: text replaced by spinner, button disabled

### Rules
- All buttons use `font-medium`, `uppercase`, `tracking-wider`
- Only ONE primary button visible per viewport at a time
- Touch target: minimum 44x44px on mobile
- Focus: 2px white outline, 3px offset

---

## 2. Card

### Variants

**Service Card**
- bg: surface-card, border: 1px anthracite-500, rounded-md, padding 2rem 1.5rem
- Content: icon (48px, white), title (Bebas 1.6rem), description (sm, muted), meta row (time + price), CTA button
- Hover: translateY(-4px), border-white
- Grid: 4 columns on desktop, 2 on tablet, 1 on mobile

**Product Card**
- bg: surface-card, border: 1px anthracite-500, rounded-md, overflow hidden
- Content: image (aspect 16/10, object-cover), title (Bebas 1.4rem), description (sm, muted)
- Hover: translateY(-4px), border-white
- Grid: 2 columns on desktop, 1 on mobile

**Blog Card**
- bg: surface-card, border: 1px anthracite-500, rounded-md, overflow hidden
- Content: featured image (aspect 16/9), category badge, title, excerpt (2 lines max), date + reading time
- Hover: translateY(-4px), border-white
- Grid: 3 columns on desktop, 2 on tablet, 1 on mobile

---

## 3. Navigation

### Desktop Nav (>768px)
- Fixed top, height: 72px, transparent initially
- On scroll (>50px): bg anthracite-700/95%, backdrop-blur-12, border-bottom anthracite-500
- Content: logo (left, 52px height), links (center, uppercase sm text, muted color, hover white), booking button (right, variant nav)

### Mobile Nav (<=768px)
- Fixed top, height: 64px
- Logo (left), hamburger (right, 3 spans animated to X)
- Mobile menu: fullscreen overlay, bg anthracite-700/98%, centered links (Bebas 2rem), booking CTA at bottom

### Breadcrumbs
- For blog posts and subpages only
- Text sm, muted, separator " / ", current page is white
- Below nav, inside container

---

## 4. Hero Section

### Homepage Hero
- Full viewport height (100vh, min 600px)
- Video background with poster fallback
- Overlay gradient: anthracite-900/40% → anthracite-900/60% → anthracite-900/92%
- Content centered: logo (220px), H1 (Bebas, 3-5xl responsive, tracking-widest), subtitle (sm, muted), primary CTA button
- Scroll indicator at bottom (bouncing chevron)

### Page Hero (services, about, blog)
- Height: 50vh, min 300px
- Background image with dark overlay
- Content: breadcrumb + H1 (Bebas, 3-4xl)
- No CTA — the page content IS the CTA

---

## 5. Section Header

- Centered, margin-bottom 3-4rem
- Label: span, xs font, medium weight, tracking-widest, uppercase, white, aria-hidden
- Title: h2, Bebas, 3-3.5xl responsive, white, tracking-wide
- Description (optional): base font, muted, max-width 560px, margin auto

---

## 6. Gallery Grid

- CSS Grid: 4 columns desktop, 2 tablet, 1 mobile
- Gap: 12px desktop, 8px mobile
- Items: rounded-md, overflow hidden, aspect-1:1
- Wide items: span 2 columns, aspect 2:1
- Hover: img scale(1.05) with transition slow
- Images: lazy loaded, object-cover, alt text with local SEO keywords

---

## 7. Booking Embed

- White background container, rounded-md, max-width 700px, centered
- Noona iframe: width 100%, height 70vh (min 500px)
- Surrounded by section--cta: gradient bg from anthracite-800 through anthracite-600

---

## 8. Contact Section

- Two-column grid: info (left) + map (right)
- Info blocks: h3 (Bebas, white, 1.2rem), content (sm, muted)
- Hours table: two columns, right-aligned time in white
- Address: `<address>` element, normal font-style
- Social icons: 24x24, muted, hover white + translateY(-2px)
- Map: iframe, rounded-md, min-height 400px (300px mobile)

---

## 9. Footer

- Border-top 1px anthracite-500
- Flex: logo (left, 28px height, opacity 0.6) + copyright (right, xs, muted)
- Mobile: stacked center
- Extra bottom padding on mobile (for sticky CTA bar)

---

## 10. Mobile Sticky CTA

- Fixed bottom, full width, z-sticky
- Appears after scrolling past 80% of hero viewport
- bg anthracite-700/97%, backdrop-blur, border-top anthracite-500
- Padding includes safe-area-inset-bottom for notch phones
- Content: single full-width primary button "Rezervovat online"
- Hidden on desktop (display: none above 768px)

---

## 11. Toast Notification

- Fixed bottom center, z-toast
- bg success green, white text, rounded-md
- Slide up animation (translateY 100px → 0)
- Auto-dismiss after 2.5s
- Used in admin panel for deploy feedback

---

## 12. Blog Components

**Article Layout**
- Max-width prose (680px), centered, padding 24 top/bottom
- H2: Bebas 2xl, white, margin-top 3rem
- H3: Inter semibold lg, white
- Body: Inter light base, text-body, line-height 1.7
- Links: white, underline on hover
- Images: full-width within prose, rounded-md, caption below (xs, muted)
- Blockquote: left border 2px white, padding-left 1.5rem, italic

**Blog CTA Banner** (in-article)
- bg surface-raised, border anthracite-500, rounded-lg, padding 2rem
- "Chcete to zažít na vlastní kůži?" + booking button
- Placed after ~60% of article content

**Category Badge**
- Inline-block, xs font, uppercase, tracking-wide
- bg anthracite-400, text-body, rounded-full, padding 0.25rem 0.75rem

---

## 13. Form Elements (Profile/Auth)

**Input**
- bg surface-card, border 1px anthracite-500, rounded-md
- Text white, placeholder anthracite-200
- Focus: border white, ring 2px accent-muted
- Error: border error, helper text error-text below

**Label**
- xs font, uppercase, tracking-wide, muted, margin-bottom 0.25rem

**Checkbox/Toggle**
- Custom styled: anthracite-500 unchecked, white checked
- Label inline, sm font

---

## 14. Profile/Dashboard Components

**Stats Card**
- bg surface-card, rounded-md, padding 1.5rem
- Number: Bebas 2xl, white
- Label: xs, muted, uppercase
- Grid: 3 columns

**Visit History Row**
- bg surface-card, rounded-md, padding 1rem 1.5rem, margin-bottom 0.5rem
- Date (sm, muted) | Service (base, white) | Barber (sm, muted)
