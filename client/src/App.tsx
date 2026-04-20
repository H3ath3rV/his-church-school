import { useEffect, type ComponentType } from "react";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import {
  getPageHref,
  getRouteVariants,
  getSiteBasePath,
  normalizeRoutePath,
  type SitePage,
} from "@/lib/sitePaths";
import { scheduleHashScroll } from "@/lib/hashScroll";
import {
  SITE_EMAIL_ADDRESS,
  SITE_PHONE_HREF,
  SOCIAL_LINKS,
} from "@/content/site";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Academic from "./pages/Academic";
import SchoolLife from "./pages/SchoolLife";
import ContactUs from "./pages/ContactUs";
import Partnership from "./pages/Partnership";

type RouteMetadata = {
  title: string;
  description: string;
  robots: string;
};

const SITE_URL = (
  import.meta.env.VITE_SITE_URL?.trim() || "https://hcschool.co.za"
).replace(/\/$/, "");
const SOCIAL_IMAGE_PATH = "/branding/hcs-30years-badge.png";
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

const ROUTE_COMPONENTS: Record<SitePage, ComponentType> = {
  home: Home,
  about: AboutUs,
  academic: Academic,
  schoolLife: SchoolLife,
  contact: ContactUs,
  partnership: Partnership,
  notFound: NotFound,
};

const ROUTE_ORDER: SitePage[] = [
  "home",
  "about",
  "academic",
  "schoolLife",
  "contact",
  "partnership",
  "notFound",
];

const PAGE_METADATA: Record<SitePage, RouteMetadata> = {
  home: {
    title: "His Church School | Private Christian School in Pinetown",
    description:
      "His Church School is a private Christian school in Pinetown, KZN, offering a faith-rooted education from Grade 1 to Grade 12.",
    robots: "index,follow",
  },
  about: {
    title: "About Us | His Church School",
    description:
      "Learn more about His Church School, our history, leadership, mission, and the staff who shape our school community.",
    robots: "index,follow",
  },
  academic: {
    title: "Academic Programme | His Church School",
    description:
      "Explore the His Church School academic offering, subject pathways, curriculum information, and senior phase guidance.",
    robots: "index,follow",
  },
  schoolLife: {
    title: "School Life | His Church School",
    description:
      "Discover sport, enrichment programmes, leadership opportunities, and community life at His Church School.",
    robots: "index,follow",
  },
  contact: {
    title: "Contact Us | His Church School",
    description:
      "Get in touch with His Church School for admissions, policy requests, school visits, and general enquiries.",
    robots: "index,follow",
  },
  partnership: {
    title: "Partnership | His Church School",
    description:
      "Find ways to partner with His Church School through sponsorship, bursary support, and community collaboration.",
    robots: "index,follow",
  },
  notFound: {
    title: "Page Not Found | His Church School",
    description:
      "The page you are looking for could not be found. Return to His Church School to continue browsing.",
    robots: "noindex,follow",
  },
};

const ROUTE_METADATA_BY_PATH = (
  ["home", "about", "academic", "schoolLife", "contact", "partnership"] as const
).reduce<Record<string, RouteMetadata>>(
  (metadata, page) => {
    metadata[normalizeRoutePath(getPageHref(page))] = PAGE_METADATA[page];
    return metadata;
  },
  {
    [normalizeRoutePath(getPageHref("notFound"))]: PAGE_METADATA.notFound,
  }
);

function setMetaContent(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  element?.setAttribute("content", content);
}

function setLinkHref(selector: string, href: string) {
  const element = document.querySelector<HTMLLinkElement>(selector);
  element?.setAttribute("href", href);
}

function setStructuredData(content: string) {
  const element = document.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"]#structured-data'
  );
  if (element) {
    element.textContent = content;
  }
}

function buildAbsoluteUrl(path: string) {
  const baseUrl =
    SITE_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : "https://hcschool.co.za");

  return new URL(path, `${baseUrl}/`).toString();
}

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    return scheduleHashScroll(window.location.hash);
  }, [location]);

  return null;
}

function RouteMetadataManager() {
  const [location] = useLocation();

  useEffect(() => {
    const normalizedPath = normalizeRoutePath(
      location.split("#")[0] || location
    );
    const metadata =
      ROUTE_METADATA_BY_PATH[normalizedPath] ?? PAGE_METADATA.home;
    const pageUrl = buildAbsoluteUrl(normalizedPath);
    const siteUrl = buildAbsoluteUrl("/");
    const socialImageUrl = buildAbsoluteUrl(SOCIAL_IMAGE_PATH);
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "School",
          "@id": `${siteUrl}#school`,
          name: "His Church School",
          url: siteUrl,
          image: socialImageUrl,
          logo: socialImageUrl,
          description: PAGE_METADATA.home.description,
          email: SITE_EMAIL_ADDRESS,
          telephone: SITE_PHONE_HREF.replace(/^tel:/, ""),
          address: {
            "@type": "PostalAddress",
            streetAddress: "13 Drake Road",
            addressLocality: "Pinetown",
            addressRegion: "KwaZulu-Natal",
            postalCode: "3610",
            addressCountry: "ZA",
          },
          sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
        },
        {
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: metadata.title,
          description: metadata.description,
          isPartOf: {
            "@id": `${siteUrl}#school`,
          },
        },
      ],
    };

    document.title = metadata.title;
    setMetaContent('meta[name="description"]', metadata.description);
    setMetaContent('meta[name="robots"]', metadata.robots);
    setMetaContent('meta[property="og:title"]', metadata.title);
    setMetaContent('meta[property="og:description"]', metadata.description);
    setMetaContent('meta[property="og:url"]', pageUrl);
    setMetaContent('meta[property="og:image"]', socialImageUrl);
    setMetaContent('meta[name="twitter:title"]', metadata.title);
    setMetaContent('meta[name="twitter:description"]', metadata.description);
    setMetaContent('meta[name="twitter:image"]', socialImageUrl);
    setLinkHref('link[rel="canonical"]', pageUrl);
    setStructuredData(JSON.stringify(structuredData));

    if (GA_MEASUREMENT_ID && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_title: metadata.title,
        page_path: normalizedPath,
        page_location: pageUrl,
      });
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      {ROUTE_ORDER.flatMap(page =>
        getRouteVariants(page).map(path => {
          const Component = ROUTE_COMPONENTS[page];
          return (
            <Route key={`${page}:${path}`} path={path}>
              {() => <Component />}
            </Route>
          );
        })
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const routerBase = import.meta.env.DEV ? "" : getSiteBasePath();

  return (
    <ErrorBoundary>
      <WouterRouter base={routerBase}>
        <ScrollManager />
        <RouteMetadataManager />
        <Router />
      </WouterRouter>
    </ErrorBoundary>
  );
}

export default App;
