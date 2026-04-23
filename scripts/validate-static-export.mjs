import { access, readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const docsDir = path.resolve(projectRoot, "docs");
const routeMetadataPath = path.resolve(
  projectRoot,
  "client",
  "src",
  "content",
  "routeMetadata.json"
);
const siteUrl = (
  process.env.SITE_URL ??
  process.env.VITE_SITE_URL ??
  "https://hcschool.co.za"
)
  .trim()
  .replace(/\/$/, "");
const socialImageUrl = new URL(
  "/branding/hcs-social-preview.jpg",
  `${siteUrl}/`
).toString();

const routeMetadata = JSON.parse(await readFile(routeMetadataPath, "utf8"));
const routeFiles = {
  home: {
    filePath: path.join(docsDir, "index.html"),
    routePath: "/",
  },
  about: {
    filePath: path.join(docsDir, "about", "index.html"),
    routePath: "/about/",
  },
  academic: {
    filePath: path.join(docsDir, "academic", "index.html"),
    routePath: "/academic/",
  },
  schoolLife: {
    filePath: path.join(docsDir, "school-life", "index.html"),
    routePath: "/school-life/",
  },
  contact: {
    filePath: path.join(docsDir, "contact", "index.html"),
    routePath: "/contact/",
  },
  partnership: {
    filePath: path.join(docsDir, "partnership", "index.html"),
    routePath: "/partnership/",
  },
  notFound: {
    filePath: path.join(docsDir, "404.html"),
    routePath: "/404.html",
  },
};

function resolvePageUrl(routePath) {
  return new URL(routePath, `${siteUrl}/`).toString();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertMatches(html, matcher, message) {
  if (!matcher.test(html)) {
    throw new Error(message);
  }
}

function isExternalReference(value) {
  return /^(?:[a-z][a-z0-9+.-]*:|#|data:)/i.test(value);
}

function stripQueryAndHash(value) {
  return value.split("#")[0].split("?")[0];
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function assertLocalReferenceExists(html, htmlFilePath, routeKey) {
  const references = [];
  const attributePattern = /\s(?:href|src)="([^"]+)"/g;
  const sourceSetPattern = /\ssrcset="([^"]+)"/g;
  let match;

  while ((match = attributePattern.exec(html))) {
    references.push(match[1]);
  }

  while ((match = sourceSetPattern.exec(html))) {
    references.push(
      ...match[1]
        .split(",")
        .map(entry => entry.trim().split(/\s+/)[0])
        .filter(Boolean)
    );
  }

  for (const reference of references) {
    if (isExternalReference(reference)) continue;

    const cleanReference = stripQueryAndHash(reference);
    if (!cleanReference) continue;

    const targetPath = cleanReference.startsWith("/")
      ? path.join(docsDir, cleanReference)
      : path.resolve(path.dirname(htmlFilePath), cleanReference);
    const routeIndexPath = path.join(targetPath, "index.html");

    if (await exists(targetPath)) continue;
    if (await exists(routeIndexPath)) continue;

    throw new Error(
      `${routeKey}: local reference does not exist: ${reference} -> ${path.relative(
        docsDir,
        targetPath
      )}`
    );
  }
}

for (const [routeKey, routeDefinition] of Object.entries(routeFiles)) {
  const metadata = routeMetadata[routeKey];
  const html = await readFile(routeDefinition.filePath, "utf8");
  const canonicalUrl = resolvePageUrl(routeDefinition.routePath);

  assertMatches(
    html,
    new RegExp(`<title>${escapeRegex(metadata.title)}</title>`),
    `${routeKey}: title metadata mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+name="description"\\s+content="${escapeRegex(metadata.description)}"\\s*/>`
    ),
    `${routeKey}: description metadata mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+name="robots"\\s+content="${escapeRegex(metadata.robots)}"\\s*/>`
    ),
    `${routeKey}: robots metadata mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<link\\s+rel="canonical"\\s+href="${escapeRegex(canonicalUrl)}"\\s*/>`
    ),
    `${routeKey}: canonical URL mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+property="og:title"\\s+content="${escapeRegex(metadata.title)}"\\s*/>`
    ),
    `${routeKey}: Open Graph title mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+property="og:description"\\s+content="${escapeRegex(metadata.description)}"\\s*/>`
    ),
    `${routeKey}: Open Graph description mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+property="og:url"\\s+content="${escapeRegex(canonicalUrl)}"\\s*/>`
    ),
    `${routeKey}: Open Graph URL mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+property="og:image"\\s+content="${escapeRegex(socialImageUrl)}"\\s*/>`
    ),
    `${routeKey}: Open Graph image mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+name="twitter:title"\\s+content="${escapeRegex(metadata.title)}"\\s*/>`
    ),
    `${routeKey}: Twitter title mismatch`
  );
  assertMatches(
    html,
    new RegExp(
      `<meta\\s+name="twitter:description"\\s+content="${escapeRegex(metadata.description)}"\\s*/>`
    ),
    `${routeKey}: Twitter description mismatch`
  );
  assertMatches(
    html,
    /<noscript id="static-page-fallback">[\s\S]*?<h1>[\s\S]*?<\/h1>[\s\S]*?<\/noscript>/,
    `${routeKey}: no-JavaScript fallback missing`
  );
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(html)) {
    throw new Error(`${routeKey}: external Google Fonts reference found`);
  }

  await assertLocalReferenceExists(html, routeDefinition.filePath, routeKey);
}

console.log("Static export metadata validation passed.");
