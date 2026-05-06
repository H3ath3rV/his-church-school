import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const docsDir = path.resolve(process.cwd(), "docs");
const sourceIndexPath = path.join(docsDir, "index.html");
const routeMetadataPath = path.resolve(
  process.cwd(),
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
const socialImagePath = "/branding/hcs-social-preview.jpg";
const logoPath = "/branding/hcs-crest.png";
const sharedRouteMetadata = JSON.parse(
  await readFile(routeMetadataPath, "utf8")
);
const sitemapLastmod = (
  process.env.SITEMAP_LASTMOD ?? new Date().toISOString().slice(0, 10)
).trim();

if (!/^\d{4}-\d{2}-\d{2}$/.test(sitemapLastmod)) {
  throw new Error("SITEMAP_LASTMOD must use YYYY-MM-DD format.");
}

const routeDefinitions = {
  home: {
    filePath: path.join(docsDir, "index.html"),
    routePath: "/",
    ...sharedRouteMetadata.home,
  },
  about: {
    filePath: path.join(docsDir, "about", "index.html"),
    routePath: "/about/",
    ...sharedRouteMetadata.about,
  },
  academic: {
    filePath: path.join(docsDir, "academic", "index.html"),
    routePath: "/academic/",
    ...sharedRouteMetadata.academic,
  },
  schoolLife: {
    filePath: path.join(docsDir, "school-life", "index.html"),
    routePath: "/school-life/",
    ...sharedRouteMetadata.schoolLife,
  },
  contact: {
    filePath: path.join(docsDir, "contact", "index.html"),
    routePath: "/contact/",
    ...sharedRouteMetadata.contact,
  },
  partnership: {
    filePath: path.join(docsDir, "partnership", "index.html"),
    routePath: "/partnership/",
    ...sharedRouteMetadata.partnership,
  },
  privacy: {
    filePath: path.join(docsDir, "privacy", "index.html"),
    routePath: "/privacy/",
    ...sharedRouteMetadata.privacy,
  },
  notFound: {
    filePath: path.join(docsDir, "404.html"),
    routePath: "/404.html",
    ...sharedRouteMetadata.notFound,
  },
};

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(text) {
  return escapeHtml(text).replaceAll('"', "&quot;");
}

function resolvePageUrl(routePath) {
  return new URL(routePath, `${siteUrl}/`).toString();
}

const staticRenderModulePath = path.resolve(
  process.cwd(),
  ".static-ssr",
  "static-render.js"
);
const { renderStaticPage } = await import(
  pathToFileURL(staticRenderModulePath).href
);

function normalizeDocumentAssetLinks(html) {
  return html
    .replaceAll('href="./favicon.ico"', 'href="/favicon.ico"')
    .replaceAll('href="./favicon-32x32.png"', 'href="/favicon-32x32.png"')
    .replaceAll('href="./apple-touch-icon.png"', 'href="/apple-touch-icon.png"')
    .replaceAll('href="./site.webmanifest"', 'href="/site.webmanifest"')
    .replaceAll('href="./fonts/', 'href="/fonts/');
}

function isRouteReference(reference) {
  return Object.values(routeDefinitions).some(
    route => route.routePath === reference
  );
}

function toRelativeReference(reference, htmlFilePath) {
  if (!reference.startsWith("/") || reference.startsWith("//")) {
    return reference;
  }

  const [pathAndQuery, hash = ""] = reference.split("#");
  const [pathname, query = ""] = pathAndQuery.split("?");
  const targetPath = isRouteReference(pathname)
    ? path.join(docsDir, pathname)
    : path.join(docsDir, pathname.replace(/^\/+/, ""));
  let relativePath = path
    .relative(path.dirname(htmlFilePath), targetPath)
    .replaceAll(path.sep, "/");

  if (!relativePath || relativePath === ".") {
    relativePath = ".";
  }

  if (pathname.endsWith("/") && !relativePath.endsWith("/")) {
    relativePath = `${relativePath}/`;
  }

  const queryString = query ? `?${query}` : "";
  const hashString = hash ? `#${hash}` : "";

  return `${relativePath}${queryString}${hashString}`;
}

function localizeRootRelativeReferences(html, htmlFilePath) {
  return html
    .replace(/\s(href|src)="(\/[^"]*)"/g, (match, attribute, reference) => {
      return ` ${attribute}="${toRelativeReference(reference, htmlFilePath)}"`;
    })
    .replace(/\s(srcSet|srcset)="([^"]+)"/g, (match, attribute, sourceSet) => {
      const localizedSourceSet = sourceSet
        .split(",")
        .map(source => {
          const parts = source.trim().split(/\s+/);
          const [reference, ...descriptor] = parts;
          return [
            toRelativeReference(reference, htmlFilePath),
            ...descriptor,
          ].join(" ");
        })
        .join(", ");

      return ` ${attribute}="${localizedSourceSet}"`;
    })
    .replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (match, quote, reference) => {
      const localizedReference = toRelativeReference(reference, htmlFilePath);
      return `url(${quote}${localizedReference}${quote})`;
    });
}

async function localizeCssAssetUrls() {
  const assetsDir = path.join(docsDir, "assets");
  const assetFiles = await readdir(assetsDir).catch(() => []);

  await Promise.all(
    assetFiles
      .filter(file => file.endsWith(".css"))
      .map(async file => {
        const cssPath = path.join(assetsDir, file);
        const css = await readFile(cssPath, "utf8");
        const localizedCss = css.replace(
          /url\((['"]?)\/([^'")]+)\1\)/g,
          (match, quote, reference) => {
            const targetPath = path.join(docsDir, reference);
            const localizedReference = path
              .relative(path.dirname(cssPath), targetPath)
              .replaceAll(path.sep, "/");

            return `url(${quote}${localizedReference}${quote})`;
          }
        );

        if (localizedCss !== css) {
          await writeFile(cssPath, localizedCss);
        }
      })
  );
}

function injectStaticRoot(html, metadata) {
  return html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${renderStaticPage(metadata.routePath)}</div>`
  );
}

function applyMetadata(html, metadata) {
  const canonicalUrl = resolvePageUrl(metadata.routePath);
  const socialImageUrl = resolvePageUrl(socialImagePath);
  const logoUrl = resolvePageUrl(logoPath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "School",
        "@id": `${resolvePageUrl("/")}#school`,
        name: "His Church School",
        url: resolvePageUrl("/"),
        image: socialImageUrl,
        logo: logoUrl,
        description:
          "His Church School is a private Christian school in Pinetown, KZN, offering a faith-rooted education from Grade 1 to Grade 12.",
        email: "secretary@hcschool.co.za",
        telephone: "+27317016211",
        address: {
          "@type": "PostalAddress",
          streetAddress: "13 Drake Road",
          addressLocality: "Pinetown",
          addressRegion: "KwaZulu-Natal",
          postalCode: "3610",
          addressCountry: "ZA",
        },
        sameAs: [
          "https://www.instagram.com/hischurchschool",
          "https://www.facebook.com/hischurchschool",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
      },
    ],
  };

  const pageHtml = normalizeDocumentAssetLinks(injectStaticRoot(html, metadata))
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(metadata.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(metadata.description)}" />`
    )
    .replace(
      /<meta name="robots" content="[^"]*"\s*\/>/,
      `<meta name="robots" content="${escapeAttribute(metadata.robots)}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:title" content="${escapeAttribute(metadata.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:description" content="${escapeAttribute(metadata.description)}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:url" content="${escapeAttribute(canonicalUrl)}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:image" content="${escapeAttribute(socialImageUrl)}" />`
    )
    .replace(
      /<meta\s+property="og:image:alt"\s+content="[\s\S]*?"\s*\/>/,
      `<meta property="og:image:alt" content="His Church School learners with school branding" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/,
      `<meta name="twitter:image" content="${escapeAttribute(socialImageUrl)}" />`
    )
    .replace(
      /<script id="structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="structured-data" type="application/ld+json">${escapeHtml(
        JSON.stringify(structuredData)
      )}</script>`
    )
    .replace(
      /<noscript id="static-page-fallback">[\s\S]*?<\/noscript>/,
      buildNoScriptFallback(metadata)
    );

  return localizeRootRelativeReferences(pageHtml, metadata.filePath);
}

function buildNoScriptFallback(metadata) {
  return `<noscript id="static-page-fallback">
      <main style="font-family: Georgia, serif; margin: 2rem auto; max-width: 48rem; padding: 0 1.25rem; color: #051040;">
        <p style="font-size: 1.85rem; font-weight: 700; line-height: 1.15; margin: 0 0 1rem;">${escapeHtml(
          metadata.title.replace(" | His Church School", "")
        )}</p>
        <p>${escapeHtml(metadata.description)}</p>
        <p>
          This website works best with JavaScript enabled. You can still contact
          the school office at secretary@hcschool.co.za or 031 701 6211.
        </p>
        <nav aria-label="Core pages">
          <a href="/">Home</a> |
          <a href="/about/">About Us</a> |
          <a href="/academic/">Academic</a> |
          <a href="/school-life/">School Life</a> |
          <a href="/contact/">Contact</a> |
          <a href="/partnership/">Partnership</a> |
          <a href="/privacy/">Privacy Notice</a>
        </nav>
      </main>
    </noscript>`;
}

const html = await readFile(sourceIndexPath, "utf8");
const nestedRouteHtml = html.replaceAll("./assets/", "../assets/");
const nestedRouteKeys = [
  "about",
  "academic",
  "schoolLife",
  "contact",
  "partnership",
  "privacy",
];

for (const route of nestedRouteKeys) {
  const metadata = routeDefinitions[route];
  const routeDir = path.dirname(metadata.filePath);
  await mkdir(routeDir, { recursive: true });
  await writeFile(metadata.filePath, applyMetadata(nestedRouteHtml, metadata));
}

await writeFile(
  routeDefinitions.home.filePath,
  applyMetadata(html, routeDefinitions.home)
);
await writeFile(
  routeDefinitions.notFound.filePath,
  applyMetadata(html, routeDefinitions.notFound)
);
const sitemapEntries = Object.values(routeDefinitions)
  .filter(route => route.robots.startsWith("index"))
  .map(
    route =>
      `  <url>\n    <loc>${escapeHtml(
        resolvePageUrl(route.routePath)
      )}</loc>\n    <lastmod>${sitemapLastmod}</lastmod>\n  </url>`
  )
  .join("\n");
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${resolvePageUrl(
  "/sitemap.xml"
)}\n`;

await writeFile(path.join(docsDir, ".nojekyll"), "");
await writeFile(path.join(docsDir, "sitemap.xml"), sitemapXml);
await writeFile(path.join(docsDir, "robots.txt"), robotsTxt);
await localizeCssAssetUrls();
await rm(path.dirname(staticRenderModulePath), { recursive: true, force: true });
