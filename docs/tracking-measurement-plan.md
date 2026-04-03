# Tracking & Measurement Plan — Gee & Geesus

## Analytics Stack

| Tool | Purpose |
|------|---------|
| GA4 | Page views, user behavior, conversion tracking |
| GTM | Tag management, event firing, consent management |
| Meta Pixel | Future retargeting capability |
| Google Search Console | Organic performance, indexing |

## Event Taxonomy

### Page Events (automatic)
| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Every page load | page_title, page_location, page_referrer |
| `scroll_depth` | 25%, 50%, 75%, 90% scroll | percent_scrolled, page_section |

### Engagement Events
| Event | Trigger | Parameters |
|-------|---------|------------|
| `cta_click` | Any booking CTA clicked | cta_location (hero, nav, services, mobile_bar, blog), cta_text |
| `gallery_view` | Gallery photo expanded/viewed | photo_name, photo_index |
| `video_play` | Hero video starts playing | video_name |
| `social_click` | Instagram/Facebook link clicked | platform, link_location |
| `blog_read` | Time on blog post > 30s | post_slug, post_category, reading_time |
| `internal_link` | Navigation between sections/pages | from_page, to_page, link_text |
| `product_view` | Product card viewed/clicked | product_name |
| `phone_click` | Phone number clicked (if added) | — |
| `email_click` | Email address clicked | — |
| `map_interact` | Google Maps embed interacted with | — |

### Conversion Events
| Event | Trigger | Parameters | Value |
|-------|---------|------------|-------|
| `booking_click` | Noona booking button/embed clicked | service_name (if available), source_page | Primary conversion |
| `signup_complete` | Client account created | signup_method | Secondary conversion |
| `newsletter_subscribe` | Newsletter form submitted | source_page | Secondary conversion |
| `contact_submit` | Contact form submitted (if added) | — | Secondary conversion |

### User Events (authenticated)
| Event | Trigger | Parameters |
|-------|---------|------------|
| `login` | Successful login | login_method |
| `profile_view` | Client views own profile | — |
| `visit_history_view` | Client views visit history | — |

### Error Events
| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_not_found` | 404 page loaded | attempted_url, referrer |
| `booking_error` | Noona iframe fails to load | error_type |

## dataLayer Specification

```javascript
// Page load
window.dataLayer.push({
  event: 'page_view',
  page_title: document.title,
  page_type: 'homepage' | 'service' | 'blog_post' | 'blog_index' | 'profile' | 'contact',
  user_status: 'visitor' | 'logged_in'
});

// CTA click
window.dataLayer.push({
  event: 'cta_click',
  cta_location: 'hero' | 'nav' | 'services' | 'mobile_bar' | 'blog_footer',
  cta_text: 'Zarezervovat křeslo',
  destination: 'booking'
});

// Blog engagement
window.dataLayer.push({
  event: 'blog_read',
  post_slug: 'jak-pecovat-o-vous',
  post_category: 'pece-o-vousy',
  reading_time: 4
});
```

## KPIs & Targets

| KPI | Definition | Target | Frequency |
|-----|-----------|--------|-----------|
| Booking clicks | booking_click events / month | 100+ | Weekly |
| Organic sessions | GA4 sessions from google/organic | 500+ / month | Weekly |
| Blog traffic share | Blog sessions / total sessions | 20%+ | Monthly |
| Average time on site | GA4 avg engagement time | > 90s | Monthly |
| Mobile bounce rate | Sessions with 1 page view on mobile | < 50% | Monthly |
| Signup rate | signup_complete / total sessions | 2%+ | Monthly |
| Core Web Vitals | LCP, CLS, INP passing | All green | Monthly |
| Keyword rankings | "barber Praha 3" position | Top 5 | Weekly |

## Consent Management

- Cookie consent banner on first visit (Czech GDPR compliance)
- GA4 consent mode v2 — default denied, grant on accept
- No tracking fires before consent is given
- Consent state persisted in cookie (1 year expiry)
- Only essential cookies allowed before consent (session, auth)

## QA Checklist

- [ ] GA4 property created and connected
- [ ] GTM container installed and firing
- [ ] All events visible in GA4 DebugView
- [ ] Consent banner appears on first visit
- [ ] No tags fire before consent granted
- [ ] booking_click fires on all CTA variations
- [ ] scroll_depth fires at correct thresholds
- [ ] Blog events fire with correct parameters
- [ ] 404 tracking works
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Search Console
