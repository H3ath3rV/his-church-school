/* =============================================================
   HCS Layout — Navigation + Footer
   Design per wireframe PDFs:
   - Top bar: dark navy, social left, email+phone right
   - Logo: "HIS CHURCH" stacked above "SCHOOL" bold, crest RIGHT of wordmark
   - Nav: ALL CAPS pipe-separated, "CONTACT US" filled navy pill
   - Footer: crest | GALLERY·PARTNERSHIP·TESTIMONIALS·COMMUNICATIONS | 30th badge
   - Tartan band above footer on every page
   - Photo gallery strip (5 placeholders) above tartan on every page
   ============================================================= */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, ChevronDown, Home } from "lucide-react";
import { getPageHref, getPublicAssetHref, getSectionHref, isSameRoute } from "@/lib/sitePaths";

const CREST_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_crest_6c734c35.png";
const TARTAN_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_tartan_2be6630d.png";

// Gallery images used in the strip at the bottom of every page
const GALLERY_STRIP = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
  "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80",
  "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&q=80",
];

const navItems = [
  {
    label: "ABOUT US",
    href: getPageHref("about"),
    children: [
      { label: "History", href: getSectionHref("about", "history") },
      { label: "Vision & Mission", href: getSectionHref("about", "vision") },
      { label: "Organogram", href: getSectionHref("about", "organogram") },
      { label: "Staff Biographies", href: getSectionHref("about", "staff") },
      { label: "School Policies", href: getSectionHref("about", "policies") },
    ],
  },
  {
    label: "ACADEMIC",
    href: getPageHref("academic"),
    children: [
      { label: "Curriculum", href: getSectionHref("academic", "curriculum") },
      { label: "Subject Choices", href: getSectionHref("academic", "subjects") },
      { label: "Exit Exam & NSC", href: getSectionHref("academic", "exit-exam") },
      { label: "Accreditation", href: getSectionHref("academic", "accreditation") },
    ],
  },
  {
    label: "SCHOOL-LIFE",
    href: getPageHref("schoolLife"),
    children: [
      { label: "Sport", href: getSectionHref("schoolLife", "sport") },
      { label: "Worship & Spirit", href: getSectionHref("schoolLife", "worship") },
      { label: "Leadership Courses", href: getSectionHref("schoolLife", "leadership") },
      { label: "Community Outreach", href: getSectionHref("schoolLife", "outreach") },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const handlePrimaryNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isSameRoute(href)) return;

    event.preventDefault();

    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[#051040] text-white text-xs py-2 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-xs font-body">FOLLOW US</span>
            <a href="https://www.instagram.com/hischurchschool" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
              <Instagram size={14} />
            </a>
            <a href="https://www.facebook.com/hischurchschool" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">
              <Facebook size={14} />
            </a>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/80">
            <a href="mailto:secretary@hcschool.co.za" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} /> secretary@hcschool.co.za
            </a>
            <span className="text-white/30">|</span>
            <a href="tel:+27317016211" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} /> 031 701 6211
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className={`bg-white sticky top-0 z-40 transition-shadow ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo: crest badge + Impact style wordmark */}
            <Link href={getPageHref("home")} onClick={(event) => handlePrimaryNavClick(event, getPageHref("home"))} className="flex items-center gap-3 shrink-0">
              <img src={CREST_URL} alt="HCS Crest" className="h-16 w-auto" />
              <div className="leading-none">
                <div
                  className="text-[#051040] uppercase"
                  style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "1.47rem", letterSpacing: 0, lineHeight: 1 }}
                >
                  HIS CHURCH
                </div>
                <div
                  className="text-[#051040] uppercase"
                  style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "2.3rem", letterSpacing: 0, lineHeight: 1 }}
                >
                  SCHOOL
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0">
              <Link
                href={getPageHref("home")}
                onClick={(event) => handlePrimaryNavClick(event, getPageHref("home"))}
                className="px-3 py-2 text-[#051040] hover:text-[#C9A84C] transition-colors"
                aria-label="Home"
              >
                <Home size={16} />
              </Link>
              <span className="text-gray-300 text-sm">|</span>
              {navItems.map((item, idx) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    onClick={(event) => handlePrimaryNavClick(event, item.href)}
                    className="flex items-center gap-1 px-4 py-2 font-label text-xs font-bold text-[#051040] hover:text-[#C9A84C] transition-colors tracking-wider"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={12} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />}
                  </Link>
                  {idx < navItems.length - 1 && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 text-sm pointer-events-none">|</span>
                  )}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 rounded-b-lg min-w-[200px] py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-2.5 text-sm font-body text-[#051040]/70 hover:text-[#051040] hover:bg-gray-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href={getPageHref("contact")}
                onClick={(event) => handlePrimaryNavClick(event, getPageHref("contact"))}
                className="ml-4 px-5 py-2 bg-[#051040] text-white font-label text-xs font-bold tracking-wider rounded-full hover:bg-[#051040]/85 transition-colors"
              >
                CONTACT US
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-[#051040]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">
            <Link
              href={getPageHref("home")}
              onClick={(event) => handlePrimaryNavClick(event, getPageHref("home"))}
              className="flex items-center gap-2 px-6 py-4 font-label text-xs font-bold text-[#051040] tracking-wider border-b border-gray-50"
            >
              <Home size={14} /> HOME
            </Link>
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 font-label text-xs font-bold text-[#051040] tracking-wider border-b border-gray-50"
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />}
                </button>
                {item.children && mobileExpanded === item.label && (
                  <div className="bg-gray-50 border-b border-gray-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-8 py-3 text-sm font-body text-[#051040]/70 hover:text-[#051040] border-b border-gray-100 last:border-0"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-6 py-4">
              <Link
                href={getPageHref("contact")}
                className="block px-5 py-3 bg-[#051040] text-white font-label text-xs font-bold text-center rounded-full tracking-wider"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>

      {/* Photo gallery strip */}
      <div className="grid grid-cols-3 md:grid-cols-5 h-32 md:h-44">
        {GALLERY_STRIP.map((src, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={src}
              alt={`School life ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {/* Tartan band */}
      <div
        className="h-12"
        style={{
          backgroundImage: `url(${TARTAN_URL})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Footer */}
      <footer className="bg-[#051040] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top row: logo left, badge right */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: header logo reused in footer */}
            <Link href={getPageHref("home")} className="flex items-center gap-3 shrink-0">
              <img src={CREST_URL} alt="HCS Crest" className="h-16 w-auto opacity-30" />
              <div className="leading-none">
                <div
                  className="text-white/30 uppercase"
                  style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "1.47rem", letterSpacing: 0, lineHeight: 1 }}
                >
                  HIS CHURCH
                </div>
                <div
                  className="text-white/30 uppercase"
                  style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "2.3rem", letterSpacing: 0, lineHeight: 1 }}
                >
                  SCHOOL
                </div>
              </div>
            </Link>

            {/* Centre: footer nav */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { label: "GALLERY", href: "https://www.facebook.com/hischurchschool/photos" },
                { label: "PARTNERSHIP", href: "/partnership/" },
                { label: "TESTIMONIALS", href: "/#testimonials" },
                { label: "COMMUNICATIONS", href: "/communications/" },
              ].map((link, i, arr) => (
                <span key={link.label} className="flex items-center gap-6">
                  <a href={link.href} className="font-label text-xs font-bold tracking-widest text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </a>
                  {i < arr.length - 1 && <span className="text-white/30 hidden md:inline">|</span>}
                </span>
              ))}
            </nav>

            {/* Right: 30th anniversary badge */}
            <div className="shrink-0">
              <img src={getPublicAssetHref("hcs-30years-badge.png")} alt="His Church School 30 Years badge" className="h-20 w-auto opacity-30" />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-white/30 text-xs font-body">
            <p>© {new Date().getFullYear()} His Church School. All rights reserved.</p>
            <div className="flex gap-4">
              <a href={getPublicAssetHref("Admission-Policy.docx")} target="_blank" rel="noopener noreferrer" download className="hover:text-white/60 transition-colors">Admission Policy</a>
              <a href={getPublicAssetHref("Language-Policy.docx")} target="_blank" rel="noopener noreferrer" download className="hover:text-white/60 transition-colors">Language Policy</a>
              <a href={getPublicAssetHref("Code-of-Conduct.docx")} target="_blank" rel="noopener noreferrer" download className="hover:text-white/60 transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
