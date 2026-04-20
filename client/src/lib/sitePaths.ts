const PAGE_PATHS = {
  home: "/",
  about: "/about/",
  academic: "/academic/",
  schoolLife: "/school-life/",
  contact: "/contact/",
  partnership: "/partnership/",
  notFound: "/404/",
} as const;

export type SitePage = keyof typeof PAGE_PATHS;
type FolderRoutePage = Exclude<SitePage, "home" | "notFound">;

const FOLDER_ROUTE_KEYS: FolderRoutePage[] = [
  "about",
  "academic",
  "schoolLife",
  "contact",
  "partnership",
];
const STATIC_ROUTE_SUFFIXES = [
  ...FOLDER_ROUTE_KEYS.flatMap(page => {
    const routePath = PAGE_PATHS[page];
    return [`${routePath}index.html`, routePath];
  }),
  "/404.html",
  "/index.html",
];
const DEV_ASSET_VERSION = import.meta.env.DEV ? Date.now().toString() : "";

function ensureLeadingSlash(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizeRoutePath(path: string) {
  const [pathname, hash] = path.split("#");
  let normalizedPath = ensureLeadingSlash(pathname || "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\/404\.html$/, "/404/")
    .replace(/\/{2,}/g, "/");

  if (normalizedPath !== "/" && !normalizedPath.endsWith("/")) {
    normalizedPath = `${normalizedPath}/`;
  }

  return hash ? `${normalizedPath}#${hash}` : normalizedPath;
}

export function getSiteBasePath(pathname?: string) {
  if (typeof window === "undefined") return "";

  const currentPath = pathname ?? window.location.pathname;

  for (const suffix of STATIC_ROUTE_SUFFIXES) {
    if (!currentPath.endsWith(suffix)) continue;

    const basePath = currentPath.slice(0, -suffix.length);
    return basePath === "/" ? "" : basePath;
  }

  // Graceful fallback for 404 pages loaded under the GitHub Pages repo path.
  // When a user hits a deep broken link (e.g., /his-church-school-website/deep/broken),
  // this ensures the base path is correctly preserved for image asset resolving.
  if (!import.meta.env.DEV && currentPath.startsWith("/his-church-school-website/")) {
    return "/his-church-school-website";
  }

  if (
    !import.meta.env.DEV &&
    currentPath !== "/" &&
    currentPath.endsWith("/")
  ) {
    return currentPath.slice(0, -1);
  }

  return "";
}

export function withSiteBase(path: string) {
  if (!path.startsWith("/")) return path;

  const basePath = import.meta.env.DEV ? "" : getSiteBasePath();
  return `${basePath}${path}` || path;
}

export function getPageHref(page: SitePage) {
  return PAGE_PATHS[page];
}

export function getRouteVariants(page: SitePage) {
  if (page === "home") {
    return [PAGE_PATHS.home, "/index.html"];
  }

  if (page === "notFound") {
    return ["/404", PAGE_PATHS.notFound, "/404.html"];
  }

  const routePath = PAGE_PATHS[page];
  const basePath = routePath.replace(/\/$/, "");
  return [basePath, routePath, `${routePath}index.html`];
}

export function getSectionHref(
  page: Exclude<SitePage, "home" | "notFound">,
  sectionId: string
) {
  return `${getPageHref(page)}#${sectionId}`;
}

export function getPublicAssetHref(filePath: string) {
  const normalizedPath = withSiteBase(`/${filePath.replace(/^\/+/, "")}`);
  const separator = normalizedPath.includes("?") ? "&" : "?";
  const assetVersion = import.meta.env.DEV
    ? DEV_ASSET_VERSION
    : __ASSET_VERSION__;

  return `${normalizedPath}${separator}v=${assetVersion}`;
}
