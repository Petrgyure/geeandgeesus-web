import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const html = (route) => readFileSync(new URL(`../.next/server/app/${route}.html`, import.meta.url), 'utf8');

test('presentation preview does not claim the still-live old domain as canonical', () => {
  for (const route of ['index', 'sluzby', 'blog']) {
    const page = html(route);
    assert.match(page, /<meta name="robots" content="noindex/);
    assert.equal(page.includes('<link rel="canonical" href="https://www.geeandgeesus.cz"'), false);
  }
});

for (const route of ['prihlaseni', 'registrace']) {
  test(`${route}: unfinished client account does not offer nonfunctional controls`, () => {
    const page = html(route).split('<main class="flex-1">')[1].split('</main>')[0];
    assert.match(page, /v přípravě/);
    assert.equal(/<input\b|<button\b/i.test(page), false, 'main content must not expose dead controls');
    assert.equal(page.includes('href="/zapomenute-heslo"'), false, 'no link to missing reset route');
  });
}
