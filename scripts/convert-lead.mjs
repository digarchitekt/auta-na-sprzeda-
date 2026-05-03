import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images/vehicles');
const slugs = [
  'astra-k-2022',
  'astra-l-2022',
  'astra-opc-2013',
  'audi-a3-2018',
  'audi-a8-2016',
  'audi-q3-2017',
];

for (const slug of slugs) {
  const dir = path.join(ROOT, slug);
  const src = path.join(dir, 'pierwsze zdjecie.jpeg');
  const dst = path.join(dir, '01.webp');
  try {
    await sharp(src)
      .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dst);
    await fs.unlink(src);
    console.log(`OK ${slug}/01.webp`);
  } catch (err) {
    console.error(`FAIL ${slug}: ${err.message}`);
  }
}
