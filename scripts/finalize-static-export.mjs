import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const docsDir = path.resolve(process.cwd(), "docs");
const sourceIndexPath = path.join(docsDir, "index.html");
const siteUrl = (
  process.env.SITE_URL ??
  process.env.VITE_SITE_URL ??
  "https://hcschool.co.za"
)
  .trim()
  .replace(/\/$/, "");
const socialImagePath = "/branding/hcs-30years-badge.png";
const routeDefinitions = {
  home: {
    filePath: path.join(docsDir, "index.html"),
    routePath: "/",
    title: "His Church School | Private Christian School in Pinetown",
    description:
      "His Church School is a private Christian school in Pinetown, KZN, offering a faith-rooted education from Grade 1 to Grade 12.",
    robots: "index,follow",
  },
  about: {
    filePath: path.join(docsDir, "about", "index.html"),
    routePath: "/about/",
    title: "About Us | His Church School",
    description:
      "Learn more about His Church School, our history, leadership, mission, and the staff who shape our school community.",
    robots: "index,follow",
  },
  academic: {
    filePath: path.join(docsDir, "academic", "index.html"),
    routePath: "/academic/",
    title: "Academic Programme | His Church School",
    description:
      "Explore the His Church School academic offering, subject pathways, curriculum information, and senior phase guidance.",
    robots: "index,follow",
  },
  schoolLife: {
    filePath: path.join(docsDir, "school-life", "index.html"),
    routePath: "/school-life/",
    title: "School Life | His Church School",
    description:
      "Discover sport, enrichment programmes, leadership opportunities, and community life at His Church School.",
    robots: "index,follow",
  },
  contact: {
    filePath: path.join(docsDir, "contact", "index.html"),
    routePath: "/contact/",
    title: "Contact Us | His Church School",
    description:
      "Get in touch with His Church School for admissions, policy requests, school visits, and general enquiries.",
    robots: "index,follow",
  },
  partnership: {
    filePath: path.join(docsDir, "partnership", "index.html"),
    routePath: "/partnership/",
    title: "Partnership | His Church School",
    description:
      "Find ways to partner with His Church School through sponsorship, bursary support, and community collaboration.",
    robots: "index,follow",
  },
  notFound: {
    filePath: path.join(docsDir, "404.html"),
    routePath: "/404.html",
    title: "Page Not Found | His Church School",
    description:
      "The page you are looking for could not be found. Return to His Church School to continue browsing.",
    robots: "noindex,follow",
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

function applyMetadata(html, metadata) {
  const canonicalUrl = resolvePageUrl(metadata.routePath);
  const socialImageUrl = resolvePageUrl(socialImagePath);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "School",
        "@id": `${resolvePageUrl("/")}#school`,
        name: "His Church School",
        url: resolvePageUrl("/"),
        image: socialImageUrl,
        logo: socialImageUrl,
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

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
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
      /<meta property="og:title" content="[^"]*"\s*\/>/,
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
      /<meta name="twitter:title" content="[^"]*"\s*\/>/,
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
    );
}

const html = await readFile(sourceIndexPath, "utf8");
const nestedRouteHtml = html.replaceAll("./assets/", "../assets/");
const nestedRouteKeys = [
  "about",
  "academic",
  "schoolLife",
  "contact",
  "partnership",
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
      )}</loc>\n  </url>`
  )
  .join("\n");
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${resolvePageUrl(
  "/sitemap.xml"
)}\n`;

await writeFile(path.join(docsDir, ".nojekyll"), "");
await writeFile(path.join(docsDir, "sitemap.xml"), sitemapXml);
await writeFile(path.join(docsDir, "robots.txt"), robotsTxt);
