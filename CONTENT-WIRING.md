# Published content fields

The public pages import `public/content.json` at build time. Owner publishing must trigger a new build/deployment for the updated JSON to appear; editing the JSON on a running server does not update already prerendered pages.

| Fields | Rendered output |
| --- | --- |
| `hero.tagline`, `hero.subtitle`, `hero.cta` | Home heading beneath the fixed logo, subtitle and booking button |
| `heroes.home.image`, `heroes.home.video` | Home video poster and video source (the poster is visible while loading or if video cannot play) |
| `heroes.sluzby`, `heroes.o-nas`, `heroes.galerie`, `heroes.produkty`, `heroes.rezervace`, `heroes.kontakt`, `heroes.blog` `.image` | Respective interior-page image banner above the first section |
| `about.label`, `about.title`, `about.lead`, `about.paragraphs[]` | Home and About sections |
| `services.label`, `services.title`, `services.items[]` (`name`, `desc`, `time`, `price`) | Home and Services sections; icons assigned by item position (new items have no icon) |
| `gallery.label`, `gallery.title` | Home gallery preview and Gallery page headings (gallery photos are controlled by `gallery.json`) |
| `products.label`, `products.title`, `products.desc`, `products.items[]` (`name`, `desc`, `img`) | Home and Products sections |
| `booking.label`, `booking.title`, `booking.desc` | Home and Reservations headings; Services closing CTA also displays these values |
| `contact.label`, `contact.title`, `contact.email`, `contact.address`, `contact.hours[]` (`days`, `time`), `contact.transport` | Home and Contact sections; email also used in home JSON-LD |

About paragraphs support literal `<strong>…</strong>`; contact address and transport support literal `<br>` (or `<br/>`). Other HTML is plain escaped text, not executable markup. The editor does **not** offer controls for `about.label`, `services.label`, `products.label`, `booking.label`, `gallery.label`, or `contact.label`, even though these values are consumed from JSON. The home logo graphic is fixed; `hero.tagline` changes the accessible h1, not the graphic.

Not editable here: Noona reservation iframe URL, Google Maps embed/location, social links, image assets themselves, static SEO titles/descriptions on other pages, and layout-specific supporting copy. Updating the contact address does not move the map pin. Product images must be valid local `/public` paths accepted by the publisher schema. Home image selection changes the video poster, not the playing video; use the video selector to change playback.

Run `next build --webpack` (or a regular build with a normal local node_modules install) before `node --test tests/content-pages.test.mjs`: the acceptance tests inspect prerendered HTML in `.next/server/app`. A hardlinked node_modules tree was used locally because Turbopack rejected a symlink outside its project filesystem root.
