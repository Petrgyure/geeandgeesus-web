import template from "../../public/content.json" with { type: "json" };

const API = "https://api.github.com/repos/Petrgyure/geeandgeesus-web";
const SHA = /^[a-f0-9]{40}$/;
const BRANCH = /^[A-Za-z0-9][A-Za-z0-9._/-]{0,99}$/;
const ASSET = /^img\/[A-Za-z0-9_-]+\.(?:jpe?g|png|webp|gif|mp4|mov|webm)$/i;
const HTML = /^(?:[^<>]|<strong>|<\/strong>|<br\s*\/?>)*$/i;
const LIMIT = 200_000;
type GitFetch = typeof fetch;

export class PublishError extends Error {
  status: number;
  constructor(message: string, status: number) { super(message); this.status = status; }
}
function fail(message: string): never { throw new PublishError(message, 400); }
function object(value: unknown): value is Record<string, unknown> { return Boolean(value && typeof value === "object" && !Array.isArray(value)); }
function asset(value: unknown, optional = false) {
  if (optional && value === "") return;
  if (typeof value !== "string" || !ASSET.test(value)) fail("Invalid asset path");
}
function text(value: unknown, path: string) {
  if (typeof value !== "string" || value.length > 4000 || /[\u0000-\u0008\u000b-\u001f]/.test(value)) fail(`Invalid text at ${path}`);
  if (/[<>]/.test(value) && !HTML.test(value)) fail(`Unsafe HTML at ${path}`);
  if (path.endsWith(".image") || path.endsWith(".img") || path.endsWith(".video")) asset(value);
  if (path.endsWith(".email") && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)) fail("Invalid email");
}
function shape(value: unknown, example: unknown, path: string): void {
  if (typeof example === "string") return text(value, path);
  if (Array.isArray(example)) {
    if (!Array.isArray(value) || value.length > 100) fail(`Invalid list at ${path}`);
    for (const entry of value) shape(entry, example[0], `${path}[]`);
    return;
  }
  if (!object(example) || !object(value) || Object.keys(value).length !== Object.keys(example).length ||
      Object.keys(value).some(key => !Object.hasOwn(example, key))) fail(`Invalid object at ${path}`);
  for (const [key, child] of Object.entries(example)) shape(value[key], child, `${path}.${key}`);
}
export function validateDocuments(content: unknown, gallery: unknown) {
  shape(content, template, "content");
  if (!object(gallery) || Object.keys(gallery).join() !== "gallery" || !Array.isArray(gallery.gallery) || gallery.gallery.length > 100) fail("Invalid gallery");
  for (const photo of gallery.gallery) {
    if (!object(photo) || Object.keys(photo).sort().join() !== "alt,src,visible,wide" ||
        typeof photo.visible !== "boolean" || typeof photo.wide !== "boolean") fail("Invalid photo");
    asset(photo.src);
    text(photo.alt, "gallery.alt");
  }
  if (Buffer.byteLength(JSON.stringify({ content, gallery })) > LIMIT) fail("Documents too large");
}
export function publishConfig() {
  const token = process.env.GITHUB_CONTENT_TOKEN;
  const branch = process.env.GITHUB_PUBLISH_BRANCH;
  if (process.env.GITHUB_PUBLISH_ENABLED !== "true" || !token || !branch || branch === "main" || !BRANCH.test(branch) ||
      branch.startsWith("/") || branch.endsWith("/") || branch.includes("..") || branch.includes("//") || branch.endsWith(".lock")) return null;
  return { token, branch };
}
async function github(fetcher: GitFetch, token: string, path: string, method = "GET", body?: unknown) {
  const response = await fetcher(`${API}${path}`, {
    method, headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }), cache: "no-store",
  });
  if (!response.ok) throw new PublishError(response.status === 409 || response.status === 422 ? "Revision conflict; reload before publishing" : "GitHub publish request failed", response.status === 409 || response.status === 422 ? 409 : 502);
  return response.json() as Promise<Record<string, unknown>>;
}
function hash(value: unknown): string {
  if (typeof value !== "string" || !SHA.test(value)) throw new PublishError("Invalid GitHub revision", 502);
  return value;
}
async function head(fetcher: GitFetch, token: string, branch: string) {
  const ref = await github(fetcher, token, `/git/ref/heads/${branch.split('/').map(encodeURIComponent).join('/')}`);
  return hash((ref.object as Record<string, unknown>)?.sha);
}
async function file(fetcher: GitFetch, token: string, branch: string, name: string) {
  const result = await github(fetcher, token, `/contents/public/${name}?ref=${encodeURIComponent(branch)}`);
  if (result.encoding !== "base64" || typeof result.content !== "string" || result.content.length > LIMIT * 2) throw new PublishError("Invalid repository document", 502);
  const data = Buffer.from(result.content.replace(/\s/g, ""), "base64");
  if (data.length > LIMIT) throw new PublishError("Repository document too large", 502);
  try { return JSON.parse(data.toString("utf8")) as unknown; } catch { throw new PublishError("Invalid repository JSON", 502); }
}
export async function snapshot(fetcher: GitFetch, token: string, branch: string) {
  const revision = await head(fetcher, token, branch);
  const content = await file(fetcher, token, branch, "content.json");
  const gallery = await file(fetcher, token, branch, "gallery.json");
  if (revision !== await head(fetcher, token, branch)) throw new PublishError("Revision changed during load", 409);
  try { validateDocuments(content, gallery); } catch { throw new PublishError("Repository documents are not supported by this editor", 502); }
  return { head: revision, content, gallery };
}
export async function publish(fetcher: GitFetch, token: string, branch: string, data: { expectedHead: string; content: unknown; gallery: unknown }) {
  if (!SHA.test(data.expectedHead || "")) fail("Missing expected revision");
  validateDocuments(data.content, data.gallery);
  if (await head(fetcher, token, branch) !== data.expectedHead) throw new PublishError("Revision conflict; reload before publishing", 409);
  const parent = await github(fetcher, token, `/git/commits/${data.expectedHead}`);
  const baseTree = hash((parent.tree as Record<string, unknown>)?.sha);
  const entries = [];
  for (const [name, value] of [["content.json", data.content], ["gallery.json", data.gallery]] as const) {
    const blob = await github(fetcher, token, "/git/blobs", "POST", { content: JSON.stringify(value, null, 2) + "\n", encoding: "utf-8" });
    entries.push({ path: `public/${name}`, mode: "100644", type: "blob", sha: hash(blob.sha) });
  }
  const tree = await github(fetcher, token, "/git/trees", "POST", { base_tree: baseTree, tree: entries });
  const commit = await github(fetcher, token, "/git/commits", "POST", { message: "Publish owner content and gallery", tree: hash(tree.sha), parents: [data.expectedHead] });
  const next = hash(commit.sha);
  await github(fetcher, token, `/git/refs/heads/${branch.split('/').map(encodeURIComponent).join('/')}`, "PATCH", { sha: next, force: false });
  return { head: next };
}
