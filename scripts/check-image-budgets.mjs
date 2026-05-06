import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const publicDir = path.resolve(projectRoot, "client", "public");
const photosDir = path.join(publicDir, "photos");
const mapsDir = path.join(publicDir, "maps");
const brandingDir = path.join(publicDir, "branding");
const fontsDir = path.join(publicDir, "fonts");

const KB = 1024;

function getBudgetForFile(relativePath) {
  if (relativePath === "branding/hcs-crest.png") {
    return 80 * KB;
  }

  if (relativePath === "branding/hcs-30years-badge.png") {
    return 80 * KB;
  }

  if (relativePath === "branding/hcs-social-preview.jpg") {
    return 260 * KB;
  }

  if (relativePath === "favicon-32x32.png") {
    return 12 * KB;
  }

  if (relativePath === "favicon.ico") {
    return 12 * KB;
  }

  if (relativePath === "apple-touch-icon.png") {
    return 40 * KB;
  }

  if (relativePath.startsWith("fonts/") && relativePath.endsWith(".woff2")) {
    return 200 * KB;
  }

  if (relativePath.startsWith("fonts/") && relativePath.endsWith(".ttf")) {
    return 1;
  }

  if (relativePath === "maps/contact-map-1800.webp") {
    return 220 * KB;
  }

  if (relativePath.startsWith("photos/staff/")) {
    return 140 * KB;
  }

  if (relativePath.startsWith("photos/footer-strip/")) {
    return 225 * KB;
  }

  if (relativePath.endsWith("-hero-desktop.webp")) {
    return 500 * KB;
  }

  if (relativePath.endsWith("-hero-tablet.webp")) {
    return 400 * KB;
  }

  if (relativePath.endsWith("-hero-mobile.webp")) {
    return 300 * KB;
  }

  if (relativePath.endsWith("-desktop.webp")) {
    return 250 * KB;
  }

  if (relativePath.endsWith("-tablet.webp")) {
    return 200 * KB;
  }

  if (relativePath.endsWith("-mobile.webp")) {
    return 160 * KB;
  }

  return null;
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walk(absolutePath);
      }

      return [absolutePath];
    })
  );

  return files.flat();
}

const photoFiles = await walk(photosDir);
const mapFiles = await walk(mapsDir);
const brandingFiles = await walk(brandingDir);
const fontFiles = await walk(fontsDir);
const publicEntries = await readdir(publicDir, { withFileTypes: true });
const publicRootFiles = publicEntries
  .filter(entry => entry.isFile())
  .map(entry => path.join(publicDir, entry.name));
const filesToCheck = [
  ...photoFiles,
  ...mapFiles,
  ...brandingFiles,
  ...fontFiles,
  ...publicRootFiles,
];
const failures = [];

for (const filePath of filesToCheck) {
  const relativePath = path.relative(publicDir, filePath).replaceAll("\\", "/");
  const fileStats = await stat(filePath);
  const ext = path.extname(filePath).toLowerCase();

  if (path.basename(filePath) === ".DS_Store") {
    failures.push(
      `${relativePath}: remove macOS .DS_Store metadata from public assets`
    );
    continue;
  }

  if (
    relativePath.startsWith("photos/") &&
    ext === ".jpg" &&
    !relativePath.startsWith("photos/staff/")
  ) {
    failures.push(
      `${relativePath}: legacy JPG found in public photos; responsive and editorial assets must ship as WebP`
    );
    continue;
  }

  const budget = getBudgetForFile(relativePath);
  if (!budget) continue;

  if (fileStats.size > budget) {
    failures.push(
      `${relativePath}: ${Math.round(fileStats.size / KB)} KB exceeds ${Math.round(
        budget / KB
      )} KB budget`
    );
  }
}

if (failures.length > 0) {
  throw new Error(`Image budget check failed:\n- ${failures.join("\n- ")}`);
}

console.log("Image budget validation passed.");
