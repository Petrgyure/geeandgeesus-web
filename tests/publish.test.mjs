import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import content from '../public/content.json' with { type: 'json' };
import gallery from '../public/gallery.json' with { type: 'json' };
import { validateDocuments, publish, snapshot, publishConfig } from '../src/lib/admin-publish.ts';

const sha = 'a'.repeat(40);
const tree = 'b'.repeat(40);
const files = [content, gallery];
function fakeGit() {
  const calls = [];
  const fetcher = async (url, options = {}) => {
    const path = new URL(url).pathname;
    calls.push({ path, options });
    if (path.endsWith('/git/ref/heads/release')) return Response.json({ object: { sha } });
    if (path.endsWith(`/git/commits/${sha}`)) return Response.json({ tree: { sha: tree } });
    if (path.endsWith('/contents/public/content.json')) return Response.json({ content: Buffer.from(JSON.stringify(content)).toString('base64'), encoding: 'base64' });
    if (path.endsWith('/contents/public/gallery.json')) return Response.json({ content: Buffer.from(JSON.stringify(gallery)).toString('base64'), encoding: 'base64' });
    if (path.endsWith('/git/blobs')) return Response.json({ sha: 'c'.repeat(40) });
    if (path.endsWith('/git/trees')) return Response.json({ sha: 'd'.repeat(40) });
    if (path.endsWith('/git/commits')) return Response.json({ sha: 'e'.repeat(40) });
    if (path.endsWith('/git/refs/heads/release')) return Response.json({ object: { sha: 'e'.repeat(40) } });
    throw Error(`Unexpected ${path}`);
  };
  return { calls, fetcher };
}

test('snapshot reads the explicit branch and both GitHub documents', async () => {
  const git = fakeGit();
  const result = await snapshot(git.fetcher, 'token', 'release');
  assert.equal(result.head, sha);
  assert.deepEqual([result.content, result.gallery], files);
  assert.equal(git.calls.filter(c => c.path.includes('/contents/')).length, 2);
});

test('publish commits both documents atomically with a non-forced compare-and-swap ref update', async () => {
  const git = fakeGit();
  const result = await publish(git.fetcher, 'token', 'release', { expectedHead: sha, content, gallery });
  assert.equal(result.head, 'e'.repeat(40));
  const writes = git.calls.filter(c => c.options.method === 'POST' || c.options.method === 'PATCH');
  assert.deepEqual(writes.map(c => c.path.split('/git/')[1]), ['blobs', 'blobs', 'trees', 'commits', 'refs/heads/release']);
  assert.deepEqual(JSON.parse(writes[2].options.body).tree.map(e => e.path), ['public/content.json', 'public/gallery.json']);
  assert.equal(JSON.parse(writes[4].options.body).force, false);
});

test('stale revision conflicts before any GitHub writes', async () => {
  const git = fakeGit();
  await assert.rejects(publish(git.fetcher, 'token', 'release', { expectedHead: 'f'.repeat(40), content, gallery }), { status: 409 });
  assert.equal(git.calls.filter(c => c.options.method === 'POST' || c.options.method === 'PATCH').length, 0);
});

test('admin only enables publishing after a verified repository snapshot and posts through server API', () => {
  const html = readFileSync(new URL('../public/manage.html', import.meta.url), 'utf8');
  assert.match(html, /fetch\('\/api\/admin\/publish'\)/);
  assert.match(html, /fetch\('\/api\/admin\/publish',\s*\{\s*method:\s*'POST'/);
  assert.match(html, /expectedHead/);
  assert.doesNotMatch(html, /api\.github\.com|gg_gh_token|tokenInput/);
});

test('publishing requires explicit enablement, token, and a safe branch', () => {
  const env = { ...process.env };
  try {
    process.env.GITHUB_CONTENT_TOKEN = 'test-only';
    process.env.GITHUB_PUBLISH_BRANCH = 'release';
    delete process.env.GITHUB_PUBLISH_ENABLED;
    assert.equal(publishConfig(), null);
    process.env.GITHUB_PUBLISH_ENABLED = 'true';
    assert.deepEqual(publishConfig(), { token: 'test-only', branch: 'release' });
    process.env.GITHUB_PUBLISH_BRANCH = '../main';
    assert.equal(publishConfig(), null);
    delete process.env.GITHUB_PUBLISH_BRANCH;
    assert.equal(publishConfig(), null);
  } finally {
    for (const key of ['GITHUB_CONTENT_TOKEN', 'GITHUB_PUBLISH_BRANCH', 'GITHUB_PUBLISH_ENABLED']) {
      if (env[key] === undefined) delete process.env[key]; else process.env[key] = env[key];
    }
  }
});

test('schema rejects unexpected keys, script HTML, traversal, invalid types', () => {
  assert.doesNotThrow(() => validateDocuments(content, gallery));
  for (const [c, g] of [
    [{ ...content, injected: 'value' }, gallery],
    [{ ...content, about: { ...content.about, paragraphs: ['<img src=x onerror=alert(1)>'] } }, gallery],
    [content, { gallery: [{ ...gallery.gallery[0], src: '../secrets' }] }],
    [content, { gallery: [{ ...gallery.gallery[0], visible: 'true' }] }],
  ]) assert.throws(() => validateDocuments(c, g));
});
