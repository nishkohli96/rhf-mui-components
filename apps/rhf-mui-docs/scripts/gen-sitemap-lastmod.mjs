/*
 * Emits src/generated/sitemap-lastmod.json — a { "/route": "<ISO date>" } map
 * of each App Router page's last **author** date (`%aI`), i.e. when the page's
 * content actually last changed. Not committer date (`%cI`, which a rebase or
 * amend rewrites) and not build/deploy time. Run before `dev` / `build`.
 *
 * Why a build step and not inline in app/sitemap.ts: doing fs + `git` access
 * from a module in the app bundle makes Turbopack trace the whole project
 * ("Dynamic filesystem access" build warning). A prebuild script keeps that
 * access out of the traced graph; sitemap.ts just imports the static JSON.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = fileURLToPath(new URL('../src/app', import.meta.url));
const outFile = fileURLToPath(
  new URL('../src/generated/sitemap-lastmod.json', import.meta.url)
);

function walkPages(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkPages(full));
    } else if ((/^page\.(mdx|tsx)$/).test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

/*
 * Seed from the committed file so a shallow CI checkout that can't reach the
 * commit which last touched a rarely-changed page keeps that page's date
 * instead of dropping it.
 */
let map = {};
try {
  map = JSON.parse(readFileSync(outFile, 'utf8'));
} catch {
  /* first run — no committed file yet. */
}

for (const file of walkPages(appDir)) {
  const rel = relative(appDir, dirname(file)).replace(/\\/g, '/');
  const route = rel === '' ? '/' : `/${rel}`;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%aI', '--', file], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (iso) {
      map[route] = iso;
    }
  } catch {
    /* untracked file or no git history — leave the route out (Next omits lastmod). */
  }
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, `${JSON.stringify(map, Object.keys(map).sort(), 2)}\n`);
console.log(`sitemap-lastmod: ${Object.keys(map).length} routes`);
