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
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = fileURLToPath(new URL('../src/app', import.meta.url));
const srcDir = fileURLToPath(new URL('../src', import.meta.url));
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

/*
 * A shallow clone (Vercel's default) can't see a file's real history: `git log`
 * resolves every file to the shallow-boundary commit, stamping all pages with
 * one bogus date. Keep the committed map there — it's regenerated, from full
 * history, on every local `dev` / `build`; commit it with the change.
 */
const isShallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
  encoding: 'utf8'
}).trim() === 'true';

/*
 * A page's content isn't only its page file: component pages render a
 * same-named props table and demo form, the homepage renders `components/home`.
 * Take the latest change across all of them, so editing a props table bumps
 * that page's date even though `page.mdx` itself was untouched.
 */
const kebab = name =>
  name.replace(/^RHF/, '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/* Demo form folders that don't share their route's name. */
const exampleForms = {
  customization: 'styled-components',
  'switch-slider-rating': 'slider-switch-rating'
};

function contentPaths(route, pageFile) {
  let extra = [];

  if (route === '/') {
    extra = ['components/home'];
  } else if (route.startsWith('/components/')) {
    /* /components/<group>/<RHFName> -> constants/props-table/<group>/<name>.ts */
    const [, , group, name] = route.split('/');
    const file = group === 'mui-pickers'
      ? kebab(name).replace(/-picker$/, '')
      : kebab(name);
    extra = [`constants/props-table/${group}/${file}.ts`];
  } else if (route.startsWith('/examples/')) {
    const name = route.replace('/examples/', '');
    extra = [`forms/${exampleForms[name] ?? name}`];
  }

  return [pageFile, ...extra.map(path => join(srcDir, path)).filter(existsSync)];
}

for (const file of isShallow ? [] : walkPages(appDir)) {
  const rel = relative(appDir, dirname(file)).replace(/\\/g, '/');
  const route = rel === '' ? '/' : `/${rel}`;
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%aI', '--', ...contentPaths(route, file)], {
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
