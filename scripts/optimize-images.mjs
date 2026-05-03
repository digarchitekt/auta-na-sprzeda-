// One-off image optimizer: converts JPGs to WebP at sensible sizes.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const ROOT = path.resolve('public/images');

const PRESETS = {
  // Background hero/section images — wide, high quality
  hero: { width: 1920, quality: 78 },
  // Vehicle catalog/detail photos — max 1600x1200 typical
  vehicle: { width: 1600, quality: 78 },
  // Default for anything else
  default: { width: 1600, quality: 78 },
};

function pickPreset(file) {
  const f = file.toLowerCase();
  if (f.includes('hero') || f.includes('audi') || f.includes('texture') || f.includes('key-')) {
    return PRESETS.hero;
  }
  if (f.includes('vehicles')) return PRESETS.vehicle;
  return PRESETS.default;
}

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function processFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const outPath = absPath.replace(/\.(jpe?g|png)$/i, '.webp');
  if (existsSync(outPath)) {
    const [a, b] = await Promise.all([stat(absPath), stat(outPath)]);
    if (b.mtimeMs >= a.mtimeMs) return { skipped: true, in: absPath, out: outPath };
  }

  const preset = pickPreset(absPath);
  const before = (await stat(absPath)).size;

  await sharp(absPath)
    .resize({ width: preset.width, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: preset.quality, effort: 5 })
    .toFile(outPath);

  const after = (await stat(outPath)).size;
  return { in: absPath, out: outPath, before, after, ratio: after / before };
}

const fmt = (n) => (n / 1024).toFixed(0) + ' KB';

let total = { before: 0, after: 0, files: 0, skipped: 0 };
for await (const file of walk(ROOT)) {
  const res = await processFile(file);
  if (!res) continue;
  if (res.skipped) {
    total.skipped++;
    continue;
  }
  total.files++;
  total.before += res.before;
  total.after += res.after;
  console.log(
    `${path.relative(ROOT, res.in)}: ${fmt(res.before)} → ${fmt(res.after)} (${(res.ratio * 100).toFixed(0)}%)`,
  );
}

console.log('\n=== Summary ===');
console.log(`Converted: ${total.files} files`);
console.log(`Skipped (up-to-date): ${total.skipped}`);
console.log(`Total before: ${fmt(total.before)}`);
console.log(`Total after:  ${fmt(total.after)}`);
if (total.before > 0) {
  console.log(`Saved:        ${fmt(total.before - total.after)} (${((1 - total.after / total.before) * 100).toFixed(0)}%)`);
}
