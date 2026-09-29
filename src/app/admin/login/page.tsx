import type { Metadata } from "next";

export const metadata: Metadata = { title: "Správa webu — Přihlášení", robots: "noindex" };

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="min-h-screen pt-[96px] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-surface-card border border-anthracite-500 rounded-lg p-8">
        <h1 className="font-heading text-3xl text-white mb-4">Správa webu</h1>
        <p className="text-text-muted mb-6">Přístup pro majitele Gee & Geesus.</p>
        {error && <p role="alert" className="text-red-400 mb-4">Přihlášení se nepodařilo. Zkontroluj heslo.</p>}
        <form method="post" action="/api/admin/login">
          <label htmlFor="owner-password" className="block text-white mb-2">Heslo</label>
          <input id="owner-password" name="password" type="password" required autoComplete="current-password" className="w-full px-3 py-3 bg-anthracite-900 border border-anthracite-500 rounded-lg text-white mb-5" />
          <button type="submit" className="w-full bg-white text-anthracite-900 py-3 rounded-lg font-medium">Přihlásit se</button>
        </form>
      </div>
    </div>
  );
}
