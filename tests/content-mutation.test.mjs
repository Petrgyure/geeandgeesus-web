// Rebuild an isolated local copy with unique owner edits; never touch a live branch or API.
import assert from 'node:assert/strict';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const run = process.env.RUN_CONTENT_MUTATION === '1';

test('owner edits change rebuilt public HTML and JSON-LD rather than matching original copy', { skip: !run && 'set RUN_CONTENT_MUTATION=1 for an isolated build' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'gg-content-mutation-'));
  try {
    for (const name of ['src', 'public', 'content', 'package.json', 'package-lock.json', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs', 'eslint.config.mjs']) {
      if (existsSync(join(root, name))) cpSync(join(root, name), join(dir, name), { recursive: true });
    }
    // Next webpack resolves dependencies inside this isolated root (a symlink is insufficient).
    execFileSync('cp', ['-al', join(root, 'node_modules'), join(dir, 'node_modules')]);
    const jsonPath = join(dir, 'public/content.json');
    const content = JSON.parse(readFileSync(jsonPath, 'utf8'));
    Object.assign(content.hero, { tagline: 'Mutant H1', subtitle: 'Mutant subtitle', cta: 'Mutant CTA' });
    content.about.title = 'Mutant about';
    content.about.paragraphs[0] = 'Mutant story <strong>proof</strong>';
    Object.assign(content.services.items[0], { name: 'Mutant cut', desc: 'Mutant service', price: '987 Kč', time: '93 min' });
    content.gallery.title = 'Mutant gallery';
    Object.assign(content.products.items[0], { name: 'Mutant product', desc: 'Mutant product description', img: 'img/merch-cap.jpg' });
    Object.assign(content.booking, { title: 'Mutant booking', desc: 'Mutant booking description' });
    Object.assign(content.contact, { title: 'Mutant contact', email: 'mutation@example.org', address: 'Jiná 12<br>Praha 3, 130 00<br>Česká republika', transport: 'Mutant transport' });
    content.contact.hours[0].time = '11:00 – 14:00';
    Object.assign(content.heroes.home, { image: 'img/interior-wall.jpg', video: 'img/hero-video.mp4' });
    writeFileSync(jsonPath, JSON.stringify(content));
    execFileSync(join(dir, 'node_modules/.bin/next'), ['build', '--webpack'], { cwd: dir, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, stdio: 'pipe', timeout: 180_000 });
    const page = route => readFileSync(join(dir, `.next/server/app/${route}.html`), 'utf8').split('<main class="flex-1">')[1].split('</main>')[0];
    const home = page('index');
    for (const marker of ['Mutant H1', 'Mutant subtitle', 'Mutant CTA', 'Mutant about', 'Mutant story', 'Mutant cut', 'Mutant service', '987 Kč', '93 min', 'Mutant gallery', 'Mutant product', 'Mutant product description', 'Mutant booking', 'Mutant booking description', 'Mutant contact', 'mutation@example.org', 'Mutant transport', '11:00 – 14:00']) {
      assert.ok(home.includes(marker), `home did not render mutated ${marker}`);
    }
    assert.ok(home.includes('img%2Fmerch-cap.jpg'));
    assert.ok(home.includes('/img/interior-wall.jpg'));
    assert.ok(home.includes('/img/hero-video.mp4'));
    for (const [route, marker] of [['sluzby', '987 Kč'], ['galerie', 'Mutant gallery'], ['produkty', 'Mutant product'], ['rezervace', 'Mutant booking'], ['kontakt', 'Mutant contact']]) {
      assert.ok(page(route).includes(marker), `${route} did not render mutated ${marker}`);
    }
    const seo = JSON.parse(home.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
    assert.equal(seo.address.streetAddress, 'Jiná 12');
    assert.equal(seo.email, 'mutation@example.org');
    assert.ok(!('geo' in seo), 'fixed map pin cannot follow changed address');
    assert.ok(!('openingHoursSpecification' in seo));
    assert.ok(!('priceRange' in seo));
    assert.ok(!page('o-nas').includes('Mutant story'), 'distinct about page must remain intact');
    // Keep the street and postcode unchanged but switch country: a stale fixed pin must not survive.
    content.contact.address = 'Biskupcova 46<br>Praha 3, 130 00<br>Slovensko';
    writeFileSync(jsonPath, JSON.stringify(content));
    execFileSync(join(dir, 'node_modules/.bin/next'), ['build', '--webpack'], { cwd: dir, env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, stdio: 'pipe', timeout: 180_000 });
    const foreignSeo = JSON.parse(page('index').match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
    assert.ok(!('address' in foreignSeo));
    assert.ok(!('geo' in foreignSeo));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
