# Project Spec — Gee & Geesus

## Business Goal

Convert organic search visitors into first-time bookings while building a digital home for the barbershop's community. Secondary goal: establish an SEO content engine that drives sustained organic traffic for "barber Praha" queries.

## Target Audience

**Primary: First-time visitors from organic search**
- Men 30+, Prague-based, searching "barber Praha 3", "barbershop Žižkov", "úprava vousů Praha"
- Need: find a trustworthy barbershop, see proof of quality, book easily
- Decision factors: photos of real work, authentic vibe (not generic salon), price transparency, easy booking

**Secondary: Existing clients**
- Loyal returning customers who come for the community as much as the haircut
- Artists, musicians, managers (non-corporate), bearded guys
- Need: quick rebooking, loyalty tracking, product info, event/news updates
- Decision factors: convenience, feeling of belonging

**Tertiary: Content readers**
- Men searching beard care tips, grooming advice, Prague lifestyle content
- May convert to clients if local; become followers/subscribers if not

## Conversion Goals

| Priority | Goal | Metric |
|----------|------|--------|
| 1 | Book via Noona | booking_click, booking_complete |
| 2 | Newsletter/loyalty signup | signup_complete |
| 3 | Blog engagement | time_on_page > 60s, internal_link_click |
| 4 | Social follow | social_click (Instagram, Facebook) |

## Brand Direction

- **Tone**: Direct, warm, slightly cheeky. Like a mate inviting you for a drink.
- **Personality**: Authentic craftsmen, not a polished brand. Dark humor welcome.
- **Visual**: Dark anthracite palette (#1a1a1a base), white accent, Bebas Neue + Inter fonts
- **Positioning**: "Men's club disguised as a barbershop" — the haircut is the excuse to walk in
- **Anti-patterns**: No corporate language, no stock photos, no generic "premium salon" vibes

## Brand Assets (Existing)

- Logo: PNG (white on transparent), also G monogram
- 44 photographs (interior, work shots, owners, products, merch)
- 1 storefront video (MP4, 896KB)
- Product line: Gee & Geesus branded hair paste, beard oil, shampoo
- Merch: hoodies, tees, caps with G logo

## Technical Constraints

- **Framework**: Next.js 14+ with App Router
- **Hosting**: Vercel (migrate from GitHub Pages)
- **Domain**: geeandgeesus.cz (to be connected)
- **Booking**: Noona iframe embed (no API available)
- **Admin**: Keep existing manage.html (GitHub token deploy) for now
- **Auth**: Simple client profiles — email-based, no OAuth complexity
- **Language**: Czech primary (cs), English later
- **Existing data**: gallery.json, content.json — preserve compatibility

## Non-Negotiable Pages

1. Homepage (single-page scroll with sections)
2. Services with prices
3. Photo gallery (dynamic from gallery.json)
4. Noona booking embed
5. Contact with Google Maps
6. Blog section (SEO content)
7. Client login/profile (loyalty)
8. Product showcase
