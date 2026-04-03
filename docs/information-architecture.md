# Information Architecture — Gee & Geesus

## Sitemap

```
geeandgeesus.cz/
├── /                          # Homepage (scroll sections)
├── /sluzby                    # Services detail page (SEO pillar)
├── /galerie                   # Full photo gallery
├── /o-nas                     # About — the story, the owners
├── /produkty                  # Product line + merch showcase
├── /rezervace                 # Booking page (Noona embed)
├── /kontakt                   # Contact, map, hours
├── /blog                      # Blog index
│   ├── /blog/[slug]           # Individual blog post
│   ├── /blog/kategorie/[slug] # Category archive
│   └── /blog/tag/[slug]       # Tag archive
├── /profil                    # Client profile (auth required)
│   ├── /profil/nastaveni      # Profile settings
│   └── /profil/navstevy       # Visit history / loyalty
├── /prihlaseni                # Login
├── /registrace                # Register
├── /zapomenute-heslo          # Password reset
├── /manage.html               # Admin (static, existing)
├── /sitemap.xml               # Dynamic sitemap
├── /robots.txt                # Robots
└── /404                       # Not found
```

## Page Purposes

### Public Pages

| Page | Purpose | Audience | Conversion Role |
|------|---------|----------|-----------------|
| `/` | Hook visitors, show vibe, drive to booking | Search visitors | Primary funnel entry |
| `/sluzby` | Detail services + prices, SEO for "střih Praha" queries | Search visitors | Mid-funnel — answer "what" and "how much" |
| `/galerie` | Visual proof of quality and atmosphere | Considering visitors | Trust builder |
| `/o-nas` | Owners' story, build emotional connection | Warm visitors | Differentiation — why us vs competitors |
| `/produkty` | Showcase G&G product line and merch | Visitors + existing clients | Brand depth + in-store upsell |
| `/rezervace` | Frictionless booking | Ready-to-book visitors | Primary conversion |
| `/kontakt` | Location, hours, directions | Ready-to-visit visitors | Last-mile conversion |
| `/blog` | SEO content hub for grooming, lifestyle, Prague | Organic search | Top-of-funnel awareness |
| `/blog/[slug]` | Individual article — beard care, tips, culture | Content searchers | SEO entry point → booking CTA |

### Authenticated Pages

| Page | Purpose | Audience |
|------|---------|----------|
| `/profil` | Client dashboard — next appointment, loyalty | Returning clients |
| `/profil/nastaveni` | Edit profile, preferences, notification settings | Returning clients |
| `/profil/navstevy` | Visit history, favorite services, loyalty points | Returning clients |

### System Pages

| Page | Purpose |
|------|---------|
| `/prihlaseni` | Email/password login |
| `/registrace` | Client account creation |
| `/zapomenute-heslo` | Password reset flow |
| `/404` | Not found with redirect suggestions |

## Homepage Section Flow

The homepage is the primary funnel. Sections in scroll order:

1. **Hero** — Video bg, logo, tagline, "Zarezervovat křeslo" CTA
2. **About teaser** — One-paragraph hook + owners photo → links to `/o-nas`
3. **Services** — 4 service cards with prices → links to `/sluzby`
4. **Gallery preview** — 6-8 photos from gallery.json → links to `/galerie`
5. **Blog preview** — Latest 3 posts → links to `/blog`
6. **Products teaser** — 2 product cards → links to `/produkty`
7. **Booking CTA** — Full-width section with Noona embed or prominent CTA button
8. **Contact** — Map, address, hours, social links

## Internal Linking Strategy

- Every page has a persistent "Rezervovat" CTA in nav + mobile sticky bar
- Blog posts link to `/sluzby` when mentioning services
- Blog posts link to `/produkty` when mentioning products
- `/sluzby` links to `/rezervace`
- `/o-nas` links to `/blog` for deeper stories
- All pages link to `/kontakt` in footer
- Gallery images alt-texts contain local SEO keywords
