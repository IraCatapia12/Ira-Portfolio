// Run from your project root:  node scripts/make-thumbs.mjs
// Needs sharp:  npm i -D sharp
import sharp from "sharp";
import fs from "fs";
import path from "path";

const src = "public/photos";
const out = "public/photos/thumbs";
fs.mkdirSync(out, { recursive: true });

for (const f of fs.readdirSync(src)) {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  const name = path.parse(f).name;
  await sharp(path.join(src, f))
    .rotate()
    .resize(1000, 1000, { fit: "inside", withoutEnlargement: true }) // keeps the real shape
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(out, `${name}.jpg`));
  console.log("done", f);
}
