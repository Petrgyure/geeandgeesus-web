import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import content from '../public/content.json' with { type: 'json' };
import gallery from '../public/gallery.json' with { type: 'json' };
import { validateDocuments } from '../src/lib/admin-publish.ts';

const html = (route) => readFileSync(new URL(`../.next/server/app/${route}.html`, import.meta.url), 'utf8');
const main = (route) => html(route).split('<main class="flex-1">')[1].split('</main>')[0];

test('required image and video paths cannot be emptied before publish', () => {
  for (const mutate of [
    c => { c.heroes.home.image = ''; },
    c => { c.heroes.sluzby.image = ''; },
    c => { c.hero.video = ''; },
    c => { c.products.items[0].img = ''; },
  ]) {
    const copy = structuredClone(content);
    mutate(copy);
    assert.throws(() => validateDocuments(copy, gallery), /Invalid asset path/);
  }
});

test('interior pages retain their original layout without added banners', () => {
  for (const route of ['sluzby', 'o-nas', 'galerie', 'produkty', 'rezervace', 'kontakt', 'blog']) {
    assert.doesNotMatch(main(route), /relative h-40 md:h-56 overflow-hidden/, route);
  }
});

test('about page preserves its distinct story and heading', () => {
  const about = main('o-nas');
  assert.ok(about.includes('Dva kluci. Jedno místo. Nulové kecy.'));
  assert.ok(about.includes('Gee &amp; Geesus nevznikl z business plánu'));
  assert.ok(!about.includes(content.about.lead));
});

test('home hero retains keyword-bearing accessible h1 without a second visible heading', () => {
  const home = main('index');
  assert.match(home.replaceAll('<!-- -->', ''), /<h1 class="sr-only">Gee &amp; Geesus — pánský barber Praha 3 Žižkov<\/h1>/);
  assert.equal((home.match(/<h1\b/g) || []).length, 1);
  assert.match(home, /Střihy[^<]*Vousy[^<]*Řeči<br\/>Biskupcova 46, Praha 3/);
});

test('SEO JSON-LD preserves address and fixed geo, without claiming stale hours or prices', () => {
  const match = main('index').match(/<script type="application\/ld\+json">([^<]+)<\/script>/);
  assert.ok(match);
  const seo = JSON.parse(match[1]);
  assert.equal(seo.address.streetAddress, 'Biskupcova 46');
  assert.equal(seo.address.addressCountry, 'CZ');
  assert.deepEqual(seo.geo, { '@type': 'GeoCoordinates', latitude: 50.0903, longitude: 14.4717 });
  assert.ok(!('openingHoursSpecification' in seo));
  assert.ok(!('priceRange' in seo));
});

test('booking copy does not show typo or concatenated labels', () => {
  assert.ok(!main('rezervace').includes('termin,'));
  assert.ok(!main('sluzby').includes(`${content.booking.label}: ${content.booking.title}.`));
});

test('editor warns that website prices do not update Noona', () => {
  const editor = readFileSync(new URL('../public/manage.html', import.meta.url), 'utf8');
  assert.match(editor, /Noona/);
  assert.match(editor, /ceny[^<]*neaktualizuj/i);
  assert.match(editor, /Logo[^<]*pevné/i);
});
