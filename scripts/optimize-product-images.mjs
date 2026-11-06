// Converts the product PNGs in public/products to WebP masters.
//   node scripts/optimize-product-images.mjs [outDir]
// - keeps aspect ratio and alpha; never enlarges
// - caps the long edge at MAX_WIDTH (the hero is shown at most ~58vw on
//   desktop / 100vw on mobile, so 2560px covers 2x displays)
// next/image still generates the responsive sizes/formats at request time;
// these masters just stop it from decoding 30+ megapixel PNGs.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "public", "products");
const OUT = process.argv[2] ? path.resolve(process.argv[2]) : SRC;
const MAX_WIDTH = 2560;
const QUALITY = 85;

fs.mkdirSync(OUT, { recursive: true });
let before = 0;
let after = 0;
for (const file of fs.readdirSync(SRC).filter((f) => /\.png$/i.test(f)).sort()) {
  const input = path.join(SRC, file);
  const output = path.join(OUT, file.replace(/\.png$/i, ".webp"));
  const meta = await sharp(input).metadata();
  const info = await sharp(input)
    .resize({ width: Math.min(meta.width, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6, alphaQuality: 100 })
    .toFile(output);
  const inSize = fs.statSync(input).size;
  before += inSize;
  after += info.size;
  console.log(
    `${file}\t${meta.width}x${meta.height}\t${(inSize / 1048576).toFixed(2)}MB -> ${info.width}x${info.height}\t${(info.size / 1048576).toFixed(2)}MB`,
  );
}
console.log(
  `TOTAL ${(before / 1048576).toFixed(2)}MB -> ${(after / 1048576).toFixed(2)}MB (-${(100 - (after / before) * 100).toFixed(1)}%)`,
);
