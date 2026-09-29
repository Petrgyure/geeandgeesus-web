import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync(new URL('../src/app/rezervace/page.tsx', import.meta.url), 'utf8');

test('booking page embeds Noona and offers a direct fallback link', () => {
  assert.match(source, /<iframe[\s\S]*?src=\{?NOONA_EMBED_URL\}?/);
  assert.match(source, /href=\{?NOONA_BOOKING_URL\}?/);
  assert.match(source, /target="_blank"/);
  assert.match(source, /rel="noopener noreferrer"/);
});

test('Noona URLs and implementation instructions are documented without pretending prices synchronize', () => {
  const guide = readFileSync(new URL('../docs/noona-integration.md', import.meta.url), 'utf8');
  assert.match(guide, /Noona HQ/);
  assert.match(guide, /iframe/i);
  assert.match(guide, /cen[^\n]*oddělen/i);
  assert.match(guide, /dokončení rezervace[^\n]*ověřené není/i);
});
