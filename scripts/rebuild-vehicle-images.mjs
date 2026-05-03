// Rebuild vehicle image folders: rename to slug, convert to webp, sequence as 01.webp, 02.webp...
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images/vehicles');

// Each entry: source folder name + target slug + ordered list of source filenames
const cars = [
  {
    src: 'Astra K',
    slug: 'astra-k-2022',
    order: [
      'k.jpeg',
      'photo_0014_1.jpg',
      'photo_0013_2.jpg',
      'photo_0012_3.jpg',
      'photo_0011_4.jpg',
      'photo_0010_5.jpg',
      'photo_0009_6.jpg',
      'photo_0008_7.jpg',
      'photo_0007_8.jpg',
      'photo_0006_9.jpg',
      'photo_0005_10.jpg',
      'photo_0004_11.jpg',
      'photo_0003_12.jpg',
      'photo_0002_13.jpg',
      'photo_0001_14.jpg',
      'photo_0000_15.jpg',
    ],
  },
  {
    src: 'Astra L',
    slug: 'astra-l-2022',
    order: [
      'l.jpeg',
      '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg',
      '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg',
    ],
  },
  {
    src: 'Audi A3',
    slug: 'audi-a3-2018',
    order: ['audia3.jpeg', 'a3.jpeg'],
  },
  {
    src: 'Audi A8',
    slug: 'audi-a8-2016',
    order: ['audia8.jpeg', 'audi1.jpeg', 'audi2.jpeg'],
  },
  {
    src: 'Audi Q3',
    slug: 'audi-q3-2017',
    order: ['q3.jpeg'],
  },
  {
    src: 'Opel OPC',
    slug: 'astra-opc-2013',
    order: [
      'opc.jpeg',
      'OPC_0004_opc1.jpg',
      'OPC_0003_opc2.jpg',
      'OPC_0005_opc3.jpg',
      'OPC_0001_opc4.jpg',
      'OPC_0002_opc5.jpg',
      'OPC_0009_opc6.jpg',
      'OPC_0008_opc7.jpg',
      'OPC_0000_opc8.jpg',
      'OPC_0010_opc9.jpg',
      'OPC_0012_opc10.jpg',
      'OPC_0011_opc11.jpg',
      'OPC_0006_opc12.jpg',
      'OPC_0007_opc13.jpg',
    ],
  },
];

const pad = (n) => String(n).padStart(2, '0');

async function processCar(car) {
  const srcDir = path.join(ROOT, car.src);
  const dstDir = path.join(ROOT, car.slug);

  // Verify source exists
  try {
    await fs.access(srcDir);
  } catch {
    console.warn(`SKIP: source not found: ${car.src}`);
    return;
  }

  await fs.mkdir(dstDir, { recursive: true });

  for (let i = 0; i < car.order.length; i++) {
    const srcFile = path.join(srcDir, car.order[i]);
    const dstFile = path.join(dstDir, `${pad(i + 1)}.webp`);
    try {
      await sharp(srcFile)
        .resize(1600, 1200, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(dstFile);
      console.log(`  ${car.slug}/${pad(i + 1)}.webp  <-  ${car.order[i]}`);
    } catch (err) {
      console.error(`  FAIL ${car.order[i]}: ${err.message}`);
    }
  }

  // Remove source folder once successful
  await fs.rm(srcDir, { recursive: true, force: true });
  console.log(`Removed source folder: ${car.src}`);
}

for (const car of cars) {
  console.log(`\n=== ${car.src}  ->  ${car.slug} ===`);
  await processCar(car);
}

console.log('\nDone.');
