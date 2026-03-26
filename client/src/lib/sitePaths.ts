const PAGE_PATHS = {
  home: "/",
  about: "/about/",
  academic: "/academic/",
  schoolLife: "/school-life/",
  contact: "/contact/",
  partnership: "/partnership/",
  communications: "/communications/",
  notFound: "/404/",
} as const;

const STATIC_ROUTE_SUFFIXES = [
  PAGE_PATHS.about,
  PAGE_PATHS.academic,
  PAGE_PATHS.schoolLife,
  PAGE_PATHS.contact,
  PAGE_PATHS.partnership,
  PAGE_PATHS.communications,
  PAGE_PATHS.notFound,
  "/about.html",
  "/academic.html",
  "/school-life.html",
  "/contact.html",
  "/partnership.html",
  "/communications.html",
  "/404.html",
  "/index.html",
] as const;

export type SitePage = keyof typeof PAGE_PATHS;

function ensureLeadingSlash(path: string) {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function normalizeRoutePath(path: string) {
  const [pathname, hash] = path.split("#");
  let normalizedPath = ensureLeadingSlash(pathname || "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\/?(about|academic|school-life|contact|partnership|communications|404)\.html$/, "/$1/")
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

  if (!import.meta.env.DEV && currentPath !== "/" && currentPath.endsWith("/")) {
    return currentPath.slice(0, -1);
  }

  return "";
}

export function withSiteBase(path: string) {
  if (!path.startsWith("/")) return path;

  const basePath = import.meta.env.DEV ? "" : getSiteBasePath();
  return `${basePath}${path}` || path;
}

export function getCurrentRoutePath() {
  if (typeof window === "undefined") return "/";

  const basePath = import.meta.env.DEV ? "" : getSiteBasePath();
  let currentPath = window.location.pathname;

  if (basePath && currentPath.startsWith(basePath)) {
    currentPath = currentPath.slice(basePath.length) || "/";
  }

  return normalizeRoutePath(currentPath);
}

export function isSameRoute(path: string) {
  return normalizeRoutePath(path) === getCurrentRoutePath();
}

export function getPageHref(page: SitePage) {
  return PAGE_PATHS[page];
}

export function getSectionHref(page: Exclude<SitePage, "home" | "notFound">, sectionId: string) {
  return `${getPageHref(page)}#${sectionId}`;
}

export function getPublicAssetHref(filePath: string) {
  return withSiteBase(`/${filePath.replace(/^\/+/, "")}`);
}
