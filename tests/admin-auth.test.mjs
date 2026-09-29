import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { after, before, test } from 'node:test';

const base = 'http://127.0.0.1:3067';
const password = 'test-only-owner-passphrase-very-long';
let server;
let ownerCookie;

before(async () => {
  server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', '3067'], {
    cwd: new URL('..', import.meta.url).pathname,
    env: { ...process.env, ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: 'test-only-session-secret-at-least-32-chars', GITHUB_CONTENT_TOKEN: 'test-only-nonfunctional-token' },
    stdio: 'ignore',
  });
  for (let attempt = 0; attempt < 50; attempt++) {
    try { await fetch(`${base}/`); return; } catch { await delay(100); }
  }
  throw new Error('Next server did not start');
});
after(() => server?.kill());

test('public site remains accessible but owner admin is gated', async () => {
  assert.equal((await fetch(`${base}/`)).status, 200);
  const response = await fetch(`${base}/manage.html`, { redirect: 'manual' });
  assert.equal(response.status, 307);
  assert.match(response.headers.get('location') || '', /\/admin\/login/);
  assert.match(response.headers.get('cache-control') || '', /no-store/);
});

test('login rejects wrong password and accepts owner password with HttpOnly cookie', async () => {
  const invalid = await fetch(`${base}/api/admin/login`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: base },
    body: 'password=wrong', redirect: 'manual',
  });
  assert.equal(invalid.status, 303);
  assert.equal(invalid.headers.get('set-cookie'), null);
  const valid = await fetch(`${base}/api/admin/login`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: base },
    body: new URLSearchParams({ password }), redirect: 'manual',
  });
  assert.equal(valid.status, 303);
  const cookie = valid.headers.get('set-cookie') || '';
  ownerCookie = cookie;
  assert.match(cookie, /gg_admin_session=/);
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=Strict/i);
  assert.equal((await fetch(`${base}/manage.html`, { headers: { cookie } })).status, 200);
});

test('owner admin no longer exposes a fake password or asks for a browser GitHub token', async () => {
  const response = await fetch(`${base}/manage.html`, { headers: { cookie: ownerCookie } });
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.equal(html.includes('id="loginScreen"'), false);
  assert.equal(html.includes('gg_admin_hash'), false);
  assert.equal(html.includes('gg_gh_token'), false);
  assert.equal(html.includes('id="tokenInput"'), false);
});

test('owner status does not claim publishing is ready without a working flow', async () => {
  const response = await fetch(`${base}/api/admin/status`, { headers: { cookie: ownerCookie } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { publishingReady: false });
  assert.match(response.headers.get('cache-control') || '', /no-store/);
});

test('login rejects missing Origin, malformed form and streamed oversized body', async () => {
  const absentOrigin = await fetch(`${base}/api/admin/login`, { method: 'POST', body: new URLSearchParams({ password }), redirect: 'manual' });
  assert.equal(absentOrigin.status, 403);
  const badType = await fetch(`${base}/api/admin/login`, { method: 'POST', headers: { origin: base, 'content-type': 'application/json' }, body: '{}', redirect: 'manual' });
  assert.equal(badType.status, 415);
  const stream = new ReadableStream({ start(controller) { controller.enqueue(new TextEncoder().encode('password=' + 'x'.repeat(5000))); controller.close(); } });
  const tooLarge = await fetch(`${base}/api/admin/login`, { method: 'POST', headers: { origin: base, 'content-type': 'application/x-www-form-urlencoded' }, body: stream, duplex: 'half', redirect: 'manual' });
  assert.equal(tooLarge.status, 413);
});

test('owner API denies anonymous access and cross-origin writes', async () => {
  assert.equal((await fetch(`${base}/api/admin/status`)).status, 401);
  const response = await fetch(`${base}/api/admin/login`, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded', origin: 'https://evil.example' },
    body: new URLSearchParams({ password }), redirect: 'manual',
  });
  assert.equal(response.status, 403);
});
