# Published content fields

The public pages import `public/content.json` at build time. Owner publishing must trigger a new build/deployment for the updated JSON to appear; editing the JSON on a running server does not update already prerendered pages.

| Fields | Rendered output |
| --- | --- |
| `hero.tagline`, `hero.subtitle`, `hero.cta` | Home screen-reader/SEO h1 beneath the fixed logo, visible subtitle and booking button; the tagline is not a visible headline |
| `heroes.home.image`, `heroes.home.video` | Home video poster and video source (the poster is visible while loading or if video cannot play) |
| `heroes.sluzby`, `heroes.o-nas`, `heroes.galerie`, `heroes.produkty`, `heroes.rezervace`, `heroes.kontakt`, `heroes.blog` `.image` | Not rendered; interior banners and their editor are hidden pending design approval |
| `about.label`, `about.title`, `about.lead`, `about.paragraphs[]` | Home About section only; `/o-nas` retains its distinct original story |
| `services.label`, `services.title`, `services.items[]` (`name`, `desc`, `time`, `price`) | Home and Services sections; icons assigned by item position (new items have no icon) |
| `gallery.label`, `gallery.title` | Home gallery preview and Gallery page headings (gallery photos are controlled by `gallery.json`) |
| `products.label`, `products.title`, `products.desc`, `products.items[]` (`name`, `desc`, `img`) | Home and Products sections |
| `booking.label`, `booking.title`, `booking.desc` | Home and Reservations headings; Services closing CTA displays only the description |
| `contact.label`, `contact.title`, `contact.email`, `contact.address`, `contact.hours[]` (`days`, `time`), `contact.transport` | Home and Contact sections; email also used in home JSON-LD |

About paragraphs support literal `<strong>…</strong>`; contact address and transport support literal `<br>` (or `<br/>`). Other HTML is plain escaped text, not executable markup. The editor does **not** offer controls for `about.label`, `services.label`, `products.label`, `booking.label`, `gallery.label`, or `contact.label`, even though these values are consumed from JSON. The home logo graphic is fixed; `hero.tagline` changes the accessible h1, not the graphic. The home default subtitle retains its original line break before the location.

Not editable here: Noona reservation iframe URL, Google Maps embed/location, social links, image assets themselves, static SEO titles/descriptions on other pages, `/o-nas` story, and layout-specific supporting copy. Updating the contact address does not move the map pin: home JSON-LD address is derived only when the entered Czech address matches the supported street/locality/postcode format, and the fixed geo coordinates are omitted when the address changes. Hours and priceRange are omitted from JSON-LD rather than published as stale claims. Website price edits **do not update Noona prices**; change them separately in Noona. Product images must be valid nonempty local `/public`-style paths accepted by the publisher schema (existence is not checked). Home image selection changes the video poster, not the playing video; use the video selector to change playback. The schema retains unused interior `heroes.*.image` keys for compatibility, but the editor hides them and they have no public effect.

Run `next build --webpack` (or a regular build with a normal local node_modules install) before `node --test tests/content-pages.test.mjs`: the acceptance tests inspect prerendered HTML in `.next/server/app`. A hardlinked node_modules tree was used locally because Turbopack rejected a symlink outside its project filesystem root.

Run `RUN_CONTENT_MUTATION=1 node --test tests/content-mutation.test.mjs` for mutation proof: it copies the project into an isolated scratch directory, edits sentinel values, runs `next build --webpack`, inspects the rebuilt HTML/JSON-LD, and deletes the scratch copy. No GitHub or deployment writes occur. It needs local `node_modules` and enough disk space; the normal suite skips this expensive build unless opted in.
