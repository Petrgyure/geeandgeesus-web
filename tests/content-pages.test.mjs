import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const content = JSON.parse(readFileSync(new URL('../public/content.json', import.meta.url)));
const page = (route) => readFileSync(new URL(`../.next/server/app/${route}.html`, import.meta.url), 'utf8').split('<main class="flex-1">')[1].split('</main>')[0];
const text = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
const contains = (html, value) => assert.ok(html.includes(text(value)), `missing rendered value: ${value}`);
const imageUrl = (value) => encodeURIComponent(`/${value}`);

for (const route of ['index']) {
  test(`${route} renders editable about content`, () => {
    const html = page(route);
    for (const value of [content.about.label, content.about.title, content.about.lead]) contains(html, value);
    for (const paragraph of content.about.paragraphs) {
      for (const segment of paragraph.split(/<\/?strong>/)) if (segment) contains(html, segment);
    }
    assert.ok(html.includes('<strong'), 'allowed strong markup rendered as element');
  });
}
for (const route of ['index', 'sluzby']) {
  test(`${route} renders every editable service field`, () => {
    const html = page(route);
    for (const value of [content.services.label, content.services.title, ...content.services.items.flatMap(({name, desc, time, price}) => [name, desc, time, price])]) contains(html, value);
  });
}
for (const route of ['index', 'produkty']) {
  test(`${route} renders all product fields`, () => {
    const html = page(route);
    for (const value of [content.products.label, content.products.title, content.products.desc, ...content.products.items.flatMap(({name, desc}) => [name, desc])]) contains(html, value);
    for (const item of content.products.items) assert.ok(html.includes(imageUrl(item.img)));
  });
}
for (const route of ['index', 'rezervace']) {
  test(`${route} renders editable booking fields`, () => {
    const html = page(route);
    for (const value of [content.booking.label, content.booking.title, content.booking.desc]) contains(html, value);
  });
}
for (const route of ['index', 'kontakt']) {
  test(`${route} renders contact and hours with safe breaks`, () => {
    const html = page(route);
    for (const value of [content.contact.label, content.contact.title, content.contact.email, ...content.contact.hours.flatMap(({days, time}) => [days, time])]) contains(html, value);
    for (const field of ['address', 'transport']) for (const segment of content.contact[field].split('<br>')) contains(html, segment);
    assert.ok(html.includes('<br'), 'breaks are actual elements');
    assert.ok(html.includes(`mailto:${content.contact.email}`));
  });
}
for (const route of ['index', 'galerie']) {
  test(`${route} renders gallery heading`, () => {
    for (const value of [content.gallery.label, content.gallery.title]) contains(page(route), value);
  });
}
test('homepage renders hero text and selected home imagery', () => {
  const html = page('index');
  for (const value of [content.hero.tagline, ...content.hero.subtitle.split(' • Biskupcova 46, Praha 3'), content.hero.cta]) contains(html, value);
  for (const value of [content.heroes.home.image, content.heroes.home.video]) assert.ok(html.includes(value));
});
test('editable price and opening hours are not contradicted by static SEO claims', () => {
  const services = readFileSync(new URL('../.next/server/app/sluzby.html', import.meta.url), 'utf8');
  const contact = readFileSync(new URL('../.next/server/app/kontakt.html', import.meta.url), 'utf8');
  assert.ok(!services.match(/<meta name="description"[^>]*\d+ Kč/));
  assert.ok(!contact.match(/<meta name="description"[^>]*Po-Pá 8-18/));
  assert.ok(!page('index').includes('"priceRange":"699–1299 CZK"'));
});
