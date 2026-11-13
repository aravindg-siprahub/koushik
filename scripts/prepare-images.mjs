import sharp from "sharp";
const src = (n) => `scripts/${n}.jpg`;
const out = (n) => `public/images/${n}`;
const jobs = [
  [src(4), out("groom.jpg"), { left: 90, top: 380, width: 690, height: 920 }],
  [src(4), out("bride.jpg"), { left: 650, top: 420, width: 684, height: 912 }],
  [src(3), out("couple.jpg"), null],
  [src(4), out("gallery-varamala.jpg"), null],
  [src(7), out("gallery-together.jpg"), null],
  [src(6), out("gallery-sweet.jpg"), null],
  [src(2), out("gallery-fun.jpg"), null],
];
for (const [i, o, crop] of jobs) {
  let p = sharp(i).rotate();
  if (crop) p = p.extract(crop);
  await p.resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true }).toFile(o);
  console.log("wrote", o);
}
