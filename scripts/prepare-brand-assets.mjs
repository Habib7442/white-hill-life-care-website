// Prepares brand assets for the web: trims and converts logos, resizes the
// Open Graph image, and moves icons into Next.js file-convention locations.
// Safe to re-run: sources are read from assets/brand-source/.
import { copyFile, mkdir, rename, rm, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const pub = path.join(root, "public");
const app = path.join(root, "app");
const source = path.join(root, "assets", "brand-source");

const originals = {
  logo: "WhiteHill Lifecares Logo with Leaf Swoosh transparent.png",
  logoWhite: "WhiteHill Lifecares Logo dark bg.png",
  logoOnWhite: "WhiteHill Healthcare Logo with Leaf and Swoosh.png",
  og: "og_image.png",
  heroBg: "hero-bg.png",
  heroBgMobile: "hero-bg-mobile.png",
};

async function moveOriginalsToSource() {
  await mkdir(source, { recursive: true });
  for (const file of Object.values(originals)) {
    for (const dir of ["", "brand"]) {
      const from = path.join(pub, dir, file);
      if (existsSync(from)) {
        await rename(from, path.join(source, file));
        console.log(`moved   public/${dir ? `${dir}/` : ""}${file} -> assets/brand-source/`);
      }
    }
  }
}

async function writeLogo(file, outName) {
  const out = path.join(pub, "brand", outName);
  const info = await sharp(path.join(source, file))
    .trim({ threshold: 10 })
    .resize({ width: 640 })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(out);
  console.log(`wrote   public/brand/${outName} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

async function writeOgImages() {
  for (const name of ["opengraph-image.jpg", "twitter-image.jpg"]) {
    const info = await sharp(path.join(source, originals.og))
      .resize({ width: 1200, height: 630, fit: "cover", position: "centre" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(path.join(app, name));
    console.log(`wrote   app/${name} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }
}

// The WH leaf mark is the top of the stacked logo; the wordmark starts below
// a transparent gap at ~65% of the trimmed logo's height (340 of 523 px).
async function writeMark() {
  const { data, info: trimmed } = await sharp(path.join(source, originals.logo))
    .trim({ threshold: 10 })
    .toBuffer({ resolveWithObject: true });
  const markHeight = Math.round((trimmed.height * 340) / 523);
  const top = await sharp(data)
    .extract({ left: 0, top: 0, width: trimmed.width, height: markHeight })
    .toBuffer();
  const info = await sharp(top)
    .trim({ threshold: 10 })
    .resize({ width: 600, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(path.join(pub, "brand", "whitehill-mark.webp"));
  console.log(`wrote   public/brand/whitehill-mark.webp (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

async function writeHeroBackgrounds() {
  const outputs = [
    [originals.heroBg, "hero-bg.webp"],
    [originals.heroBgMobile, "hero-bg-mobile.webp"],
  ];
  for (const [file, outName] of outputs) {
    const info = await sharp(path.join(source, file))
      .webp({ quality: 80 })
      .toFile(path.join(pub, "brand", outName));
    console.log(`wrote   public/brand/${outName} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  }
}

async function moveIcons() {
  const icons = path.join(pub, "favicon_io");
  if (!existsSync(icons)) {
    console.log("skipped icons (public/favicon_io already processed)");
    return;
  }
  await mkdir(path.join(pub, "icons"), { recursive: true });
  const moves = [
    ["favicon.ico", path.join(app, "favicon.ico")],
    ["apple-touch-icon.png", path.join(app, "apple-icon.png")],
    ["favicon-32x32.png", path.join(app, "icon.png")],
    ["android-chrome-192x192.png", path.join(pub, "icons", "icon-192.png")],
    ["android-chrome-512x512.png", path.join(pub, "icons", "icon-512.png")],
  ];
  for (const [file, to] of moves) {
    await copyFile(path.join(icons, file), to);
    console.log(`copied  favicon_io/${file} -> ${path.relative(root, to)}`);
  }
  await rm(icons, { recursive: true });
  console.log("removed public/favicon_io/");
}

await moveOriginalsToSource();
await mkdir(path.join(pub, "brand"), { recursive: true });
await stat(path.join(source, originals.logo));
await writeLogo(originals.logo, "whitehill-logo.webp");
await writeLogo(originals.logoWhite, "whitehill-logo-white.webp");
await writeMark();
await writeOgImages();
await writeHeroBackgrounds();
await moveIcons();
