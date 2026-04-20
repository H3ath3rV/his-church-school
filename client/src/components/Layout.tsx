import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ChevronDown,
  Home,
} from "lucide-react";
import { scrollToHashTarget } from "@/lib/hashScroll";
import {
  getPageHref,
  getPublicAssetHref,
  normalizeRoutePath,
} from "@/lib/sitePaths";
import { FOOTER_NAV_ITEMS, PRIMARY_NAV_ITEMS } from "@/content/navigation";
import {
  CREST_URL,
  FOOTER_GALLERY_IMAGES,
  FOOTER_GALLERY_VISIBILITY,
  SITE_EMAIL_ADDRESS,
  SITE_EMAIL_HREF,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  SOCIAL_LINKS,
  TARTAN_URL,
} from "@/content/site";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const homeHref = getPageHref("home");
  const contactHref = getPageHref("contact");
  const currentPagePath = normalizeRoutePath(
    location.split("#")[0] || location
  );
  const currentHash = location.includes("#")
    ? `#${location.split("#")[1]}`
    : "";

  const isTopLevelActive = (href: string) =>
    normalizeRoutePath(href.split("#")[0] || href) === currentPagePath;
  const isSectionActive = (href: string) => {
    const [path, hash] = href.split("#");
    if (!hash) return false;

    return (
      normalizeRoutePath(path || "/") === currentPagePath &&
      currentHash === `#${hash}`
    );
  };
  const isHomeActive = isTopLevelActive(homeHref);
  const mobileHasExpandedSection = mobileExpanded !== null;
  const getDropdownId = (label: string) =>
    `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-submenu`;
  const handleDesktopDropdownBlur = (
    event: React.FocusEvent<HTMLDivElement>,
    label: string
  ) => {
    const nextTarget = event.relatedTarget;

    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      setActiveDropdown(current => (current === label ? null : current));
    }
  };
  const handleDesktopDropdownKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key !== "Escape") return;

    setActiveDropdown(null);
    const trigger = event.currentTarget.querySelector("a");
    if (trigger instanceof HTMLElement) {
      trigger.focus();
    }
  };
  const closeMenus = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    const [targetPath, targetHash] = href.split("#");
    const normalizedTargetPath = normalizeRoutePath(targetPath || "/");
    const isSamePage = normalizedTargetPath === currentPagePath;

    closeMenus();

    if (!targetHash) {
      if (!isSamePage) return;

      event.preventDefault();

      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    if (!isSamePage) return;

    event.preventDefault();
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${targetHash}`
    );
    scrollToHashTarget(`#${targetHash}`);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenus();
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="relative z-50 hidden bg-[#051040] text-white xl:block">
        <div className="max-w-7xl mx-auto flex min-h-[3.1rem] items-center justify-between hcs-shell xl:min-h-[3.35rem]">
          <div className="flex items-center gap-1.5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/78 transition-colors duration-200 hover:text-[#C9A84C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/35 xl:h-9 xl:w-9"
              aria-label="Follow His Church School on Instagram"
            >
              <Instagram size={17} />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/78 transition-colors duration-200 hover:text-[#C9A84C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/35 xl:h-9 xl:w-9"
              aria-label="Follow His Church School on Facebook"
            >
              <Facebook size={17} />
            </a>
          </div>
          <div className="flex items-center gap-4 font-body text-[0.82rem] text-white/80 xl:gap-5 xl:text-[0.84rem]">
            <a
              href={SITE_EMAIL_HREF}
              className="group flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <Mail
                size={14}
                className="shrink-0 text-white/68 transition-colors duration-200 group-hover:text-[#C9A84C]"
              />
              <span>{SITE_EMAIL_ADDRESS}</span>
            </a>
            <span className="text-white/18">|</span>
            <a
              href={SITE_PHONE_HREF}
              className="group flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <Phone
                size={14}
                className="shrink-0 text-white/68 transition-colors duration-200 group-hover:text-[#C9A84C]"
              />
              <span>{SITE_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        data-site-header
        className={`relative bg-white sticky top-0 z-40 transition-shadow ${scrolled ? "shadow-md" : "border-b border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto hcs-shell">
          <div className="flex items-center justify-between gap-3 h-[4.25rem] md:h-[5rem] xl:h-20">
            <Link
              href={homeHref}
              onClick={event => handleNavClick(event, homeHref)}
              className="flex min-w-0 items-center gap-2.5 md:gap-3"
            >
              <img
                src={CREST_URL}
                alt="HCS Crest"
                className="h-10 w-auto shrink-0 md:h-14 xl:h-16"
              />
              <div className="min-w-0 leading-none">
                <div className="font-logo text-[0.9rem] leading-none tracking-normal uppercase text-[#051040] md:text-[1.18rem] xl:text-[1.47rem]">
                  HIS CHURCH
                </div>
                <div className="font-logo text-[1.42rem] leading-none tracking-normal uppercase text-[#051040] md:text-[1.88rem] xl:text-[2.3rem]">
                  SCHOOL
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0">
              <Link
                href={homeHref}
                onClick={event => handleNavClick(event, homeHref)}
                className="group relative inline-flex min-h-[44px] items-center justify-center px-3 py-2 text-[#051040] transition-colors"
                aria-label="Home"
                aria-current={isHomeActive ? "page" : undefined}
              >
                <Home size={17} />
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#C9A84C] origin-center transition-transform duration-200 ${isHomeActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>
              <span className="text-gray-300 text-sm">|</span>
              {PRIMARY_NAV_ITEMS.map((item, idx) => {
                const isItemActive = isTopLevelActive(item.href);
                const isItemOpen = activeDropdown === item.label;
                const showAccent = isItemActive || isItemOpen;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocusCapture={() => setActiveDropdown(item.label)}
                    onBlurCapture={event =>
                      handleDesktopDropdownBlur(event, item.label)
                    }
                    onKeyDown={handleDesktopDropdownKeyDown}
                  >
                    <Link
                      href={item.href}
                      onClick={event => handleNavClick(event, item.href)}
                      className="group relative inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap px-4 py-2 font-label text-[0.79rem] font-bold tracking-[0.1em] text-[#051040] transition-colors"
                      aria-current={isItemActive ? "page" : undefined}
                      aria-haspopup={item.children ? "menu" : undefined}
                      aria-expanded={item.children ? isItemOpen : undefined}
                      aria-controls={
                        item.children ? getDropdownId(item.label) : undefined
                      }
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          size={12}
                          className={`transition-[color,transform] duration-200 ${isItemOpen ? "rotate-180" : ""} ${showAccent ? "text-[#C9A84C]" : "text-current group-hover:text-[#C9A84C]"}`}
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-[#C9A84C] origin-center transition-transform duration-200 ${showAccent ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </Link>
                    {idx < PRIMARY_NAV_ITEMS.length - 1 && (
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none">
                        |
                      </span>
                    )}
                    {item.children && isItemOpen && (
                      <div
                        id={getDropdownId(item.label)}
                        role="menu"
                        className="absolute left-0 top-full z-50 min-w-[220px] rounded-b-lg border border-gray-200 bg-white py-2 shadow-xl"
                      >
                        {item.children.map(child => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={event => handleNavClick(event, child.href)}
                            role="menuitem"
                            className="block whitespace-nowrap px-5 py-3 text-sm font-body text-[#051040]/85 transition-colors hover:bg-[#051040] hover:text-white focus:bg-[#051040] focus:text-white focus:outline-none"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <Link
                href={contactHref}
                onClick={event => handleNavClick(event, contactHref)}
                className="ml-5 inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-[#051040] px-7 py-3 text-[0.78rem] font-label font-bold tracking-[0.1em] text-white shadow-[0_12px_26px_rgba(5,16,64,0.16)] transition-colors hover:bg-[#051040]/85"
              >
                CONTACT US
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#051040] xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile backdrop */}
        {mobileOpen && (
          <div
            className="xl:hidden fixed inset-0 z-30 bg-white/50 backdrop-blur-md"
            onClick={() => {
              setMobileOpen(false);
              setMobileExpanded(null);
            }}
          />
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="hcs-shell xl:hidden absolute inset-x-0 top-full z-40 -mt-px">
            <div className="mx-auto max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden rounded-[1.25rem] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(5,16,64,0.16)] sm:max-h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-[#F7F8FC] px-6 py-5">
                <Link
                  href={homeHref}
                  onClick={event => handleNavClick(event, homeHref)}
                  className="flex min-w-0 items-center gap-3"
                >
                  <img
                    src={CREST_URL}
                    alt="HCS Crest"
                    className="h-10 w-auto shrink-0 sm:h-12"
                  />
                  <div className="min-w-0 leading-none">
                    <div className="font-logo text-[0.82rem] leading-none tracking-normal uppercase text-[#051040] sm:text-[1.15rem]">
                      HIS CHURCH
                    </div>
                    <div className="font-logo text-[1.28rem] leading-none tracking-normal uppercase text-[#051040] sm:text-[1.8rem]">
                      SCHOOL
                    </div>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileExpanded(null);
                  }}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#051040]/12 bg-white text-[#051040] transition-colors hover:bg-[#EEF2FB]"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <Link
                href={homeHref}
                onClick={event => handleNavClick(event, homeHref)}
                className="group relative flex min-h-[52px] items-center gap-2 border-b border-gray-200 px-6 py-4 font-label text-[0.8rem] font-bold tracking-[0.1em] text-[#051040]"
                aria-current={isHomeActive ? "page" : undefined}
              >
                <Home size={17} /> HOME
              </Link>
              {PRIMARY_NAV_ITEMS.map(item => {
                const isItemActive = isTopLevelActive(item.href);
                const isItemOpen = mobileExpanded === item.label;
                const showAccent =
                  isItemOpen || (isItemActive && !mobileHasExpandedSection);

                return (
                  <div key={item.label}>
                    <div className="relative flex min-h-[52px] items-stretch border-b border-gray-200">
                      <Link
                        href={item.href}
                        onClick={event => handleNavClick(event, item.href)}
                        className="flex min-w-0 flex-1 items-center px-6 py-4 text-left"
                        aria-current={isItemActive ? "page" : undefined}
                      >
                        <span className="font-label text-[0.8rem] font-bold tracking-[0.1em] text-[#051040]">
                          {item.label}
                        </span>
                      </Link>
                      {item.children && (
                        <button
                          type="button"
                          className="inline-flex min-w-[52px] items-center justify-center px-4 text-[#051040]/50 transition-colors hover:text-[#051040]"
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.label ? null : item.label
                            )
                          }
                          aria-expanded={isItemOpen}
                          aria-controls={getDropdownId(item.label)}
                          aria-label={`${isItemOpen ? "Collapse" : "Expand"} ${item.label} menu`}
                        >
                          <ChevronDown
                            size={14}
                            className={`transition-[color,transform] duration-200 ${isItemOpen ? "rotate-180 text-[#C9A84C]" : "text-current"}`}
                          />
                        </button>
                      )}
                      <span
                        aria-hidden="true"
                        className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-[#C9A84C] origin-center transition-transform duration-200 ${showAccent ? "scale-x-100" : "scale-x-0"}`}
                      />
                    </div>
                    {item.children && isItemOpen && (
                      <div
                        id={getDropdownId(item.label)}
                        className="border-b border-gray-200 bg-gray-50 py-1"
                      >
                        {item.children.map(child => {
                          const isChildActive = isSectionActive(child.href);

                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={event =>
                                handleNavClick(event, child.href)
                              }
                              className={`block px-10 py-3 text-sm font-body transition-colors ${isChildActive ? "bg-[#051040] text-white" : "text-[#051040]/80 active:bg-[#051040] active:text-white"}`}
                              aria-current={
                                isChildActive ? "location" : undefined
                              }
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="px-6 py-5">
                <Link
                  href={contactHref}
                  onClick={event => handleNavClick(event, contactHref)}
                  className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#051040] px-5 py-3 text-center font-label text-[0.8rem] font-bold tracking-[0.1em] text-white"
                >
                  CONTACT US
                </Link>
              </div>
              <div className="border-t border-gray-200 bg-[#FAFBFE] px-6 py-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  <p className="font-label text-[0.66rem] font-bold tracking-[0.18em] text-[#051040]/42">
                    FOLLOW US
                  </p>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 py-1 text-[#051040]/72 transition-colors duration-200 hover:text-[#051040] active:text-[#051040]"
                    aria-label="Follow His Church School on Instagram"
                  >
                    <Instagram size={15} />
                    <span className="font-label text-[0.68rem] font-bold tracking-[0.12em]">
                      INSTAGRAM
                    </span>
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 py-1 text-[#051040]/72 transition-colors duration-200 hover:text-[#051040] active:text-[#051040]"
                    aria-label="Follow His Church School on Facebook"
                  >
                    <Facebook size={15} />
                    <span className="font-label text-[0.68rem] font-bold tracking-[0.12em]">
                      FACEBOOK
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Photo gallery strip */}
      <div
        className="relative flex w-full overflow-hidden bg-[#051040]"
        style={{ height: "clamp(138px, 18vw, 208px)" }}
      >
        {FOOTER_GALLERY_IMAGES.map((image, i) => (
          <div
            key={i}
            className={`${FOOTER_GALLERY_VISIBILITY[i]} relative min-w-0 flex-1 overflow-hidden`}
          >
            <img
              src={image.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
              style={{ objectPosition: image.objectPosition ?? "center" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#051040]/28 via-[#051040]/10 to-transparent" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[0.5px] bg-gray-200/80" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.5px] bg-gray-200/80" />
      </div>

      {/* Tartan band */}
      <div
        className="h-12"
        style={{
          backgroundImage: `url(${TARTAN_URL})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 225%",
        }}
      />

      {/* Footer */}
      <footer className="bg-[#051040] py-7 text-white sm:py-8">
        <div className="max-w-7xl mx-auto hcs-shell">
          <div className="xl:hidden">
            <nav className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:gap-x-10 md:gap-x-12">
              {FOOTER_NAV_ITEMS.map(link => (
                <span
                  key={link.label}
                  className="flex items-center justify-center"
                >
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap font-label text-[0.8rem] font-bold tracking-[0.1em] text-white/78 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={event => handleNavClick(event, link.href)}
                      className="whitespace-nowrap font-label text-[0.8rem] font-bold tracking-[0.1em] text-white/78 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            <div className="mx-auto mt-4 flex w-full items-center justify-center gap-8 sm:mt-5 sm:gap-10 md:max-w-[34rem] md:justify-center md:gap-12">
              <Link
                href={homeHref}
                onClick={event => handleNavClick(event, homeHref)}
                className="flex h-[3.45rem] w-[3.45rem] items-center justify-center rounded-full transition-opacity hover:opacity-100 sm:h-[3.8rem] sm:w-[3.8rem] md:h-[3.9rem] md:w-[3.9rem]"
                aria-label="His Church School home"
              >
                <img
                  src={CREST_URL}
                  alt="His Church School crest"
                  className="h-full w-auto opacity-55"
                />
              </Link>

              <img
                src={getPublicAssetHref("branding/hcs-30years-badge.png")}
                alt="His Church School 30 Years badge"
                className="h-[3.15rem] w-auto opacity-55 sm:h-[3.45rem] md:h-[3.55rem]"
              />
            </div>
          </div>

          <div className="hidden xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center xl:gap-x-12 2xl:gap-x-16">
            <div className="flex justify-center xl:justify-self-start">
              <Link
                href={homeHref}
                onClick={event => handleNavClick(event, homeHref)}
                className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full transition-opacity hover:opacity-100 2xl:h-[4.75rem] 2xl:w-[4.75rem]"
                aria-label="His Church School home"
              >
                <img
                  src={CREST_URL}
                  alt="His Church School crest"
                  className="h-full w-auto opacity-55"
                />
              </Link>
            </div>

            <nav className="mx-auto flex w-auto max-w-none flex-nowrap items-center justify-self-center gap-x-4 gap-y-0 2xl:gap-x-5">
              {FOOTER_NAV_ITEMS.map((link, i, arr) => (
                <span
                  key={link.label}
                  className="flex items-center justify-center gap-4"
                >
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap font-label text-[0.82rem] font-bold tracking-[0.1em] text-white/78 transition-colors hover:text-white 2xl:text-[0.9rem] 2xl:tracking-[0.12em]"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={event => handleNavClick(event, link.href)}
                      className="whitespace-nowrap font-label text-[0.82rem] font-bold tracking-[0.1em] text-white/78 transition-colors hover:text-white 2xl:text-[0.9rem] 2xl:tracking-[0.12em]"
                    >
                      {link.label}
                    </Link>
                  )}
                  {i < arr.length - 1 && (
                    <span className="text-white/30">|</span>
                  )}
                </span>
              ))}
            </nav>

            <div className="flex justify-center xl:justify-self-end">
              <img
                src={getPublicAssetHref("branding/hcs-30years-badge.png")}
                alt="His Church School 30 Years badge"
                className="h-[4.1rem] w-auto opacity-55 2xl:h-[4.5rem]"
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-4 border-t border-white/10 pt-3 text-center font-body text-sm text-white/55 sm:mt-6 sm:pt-4">
            <p>
              © {new Date().getFullYear()} His&nbsp;Church&nbsp;School. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
