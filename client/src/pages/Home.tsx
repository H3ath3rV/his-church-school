/* =============================================================
   HCS Home Page
   Sections (per client sitemap):
   - Hero
   - Contact strip
   - Worship & Spirit teaser
   - Testimonials
   - Combined School
   - Quality Assurance
   - Campus Video
   ============================================================= */

import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Layout from "@/components/Layout";
import { getPageHref } from "@/lib/sitePaths";
import { Mail, Phone, MapPin, ChevronRight, Star, Quote, Play } from "lucide-react";

const HERO_URL    = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_hero-f6ZbGbULQZM24gUgfEXMzK.webp";
const WORSHIP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";
const ABOUT_URL   = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";
const SPORT_URL   = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_sport-ZXz2kRCQJivyVVXye2Jj9C.webp";
const ACADEMICS_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";

const testimonials = [
  {
    quote: "We're so grateful for His Church School. The teachers genuinely care for every child and guide them with faith and grace. Our daughter has thrived both spiritually and academically in this Christ-centred, family-like community.",
    name: "Sarah M.",
    role: "Parent of Grade 5 Student",
  },
  {
    quote: "The small class sizes mean our son gets individual attention and the teachers really know him. The biblical foundation integrated throughout every subject has helped him develop both academically and spiritually.",
    name: "John & Lisa K.",
    role: "Parents of Grade 8 Student",
  },
  {
    quote: "Choosing His Church School was the best decision we made for our children. The sense of community here is incredible. Our kids love going to school each day and are growing into confident, compassionate young people.",
    name: "David & Rachel P.",
    role: "Parents of Grade 3 & Grade 10 Students",
  },
];


export default function Home() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051040]/92 via-[#051040]/60 to-[#051040]/15" />
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
              <div className="max-w-2xl">
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-5 fade-up">
                  His Church School · Pinetown, KZN
                </p>
                <h1 className="font-display text-6xl md:text-7xl font-black text-white leading-[1.1] mb-6 fade-up">
                  Confident learners.<br />
                  <span className="text-[#C9A84C]">Rooted in Christ.</span>
                </h1>
                <p className="text-white/70 text-base font-body leading-relaxed mb-8 max-w-lg fade-up">
                  A private Christian school from Grade 1 to 12, shaping confident, purpose-driven young people — where every child is known, valued, and guided.
                </p>
                <div className="flex flex-wrap gap-3 fade-up">
                  <Link href={getPageHref("contact")}
                    className="px-8 py-3.5 bg-[#C9A84C] text-[#051040] font-label text-xs font-bold rounded-full hover:bg-[#d7b85d] transition-colors tracking-wider uppercase">
                    ENROL NOW
                  </Link>
                  <Link href={getPageHref("about")}
                    className="px-8 py-3.5 bg-white/15 text-white border border-white/30 font-label text-xs font-bold rounded-full hover:bg-white/25 transition-colors tracking-wider uppercase backdrop-blur-sm">
                    ABOUT US
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Strip ── */}
        <section className="bg-[#EBDAC8] py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Mail size={26} />, label: "EMAIL US", value: "secretary@hcschool.co.za", href: "mailto:secretary@hcschool.co.za" },
                { icon: <Phone size={26} />, label: "CALL US", value: "031 701 6211", href: "tel:+27317016211" },
                { icon: <MapPin size={26} />, label: "VISIT US", value: "13 Drake Road, Pinetown, KZN", href: "https://maps.google.com/?q=13+Drake+Road+Pinetown" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center bg-white rounded-xl px-6 py-6 hover:shadow-md transition-all group fade-up border border-[#c9b48a]/30">
                  <div className="w-14 h-14 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-3 group-hover:bg-[#051040]/85 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <p className="font-label text-xs font-black text-[#051040] tracking-[0.15em] uppercase mb-1">{item.label}</p>
                  <p className="font-body text-sm text-[#051040]/65">{item.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Worship & Spirit Teaser ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={WORSHIP_URL} alt="Worship at HCS" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Faith &amp; Community</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Worship &amp; Spirit</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>At His Church School, faith is not just a subject — it is the foundation of everything we do. Daily devotions, praise and worship, and a Christ-centred community shape the spiritual lives of our learners.</p>
                  <p>Our Praise and Worship Team, comprising both staff and students, leads the school in worship. We believe that encountering God's presence is central to forming young people who will impact their generation for eternity.</p>
                  <p>We are a school deeply connected to His Church — raising up Decision Makers, World Shakers, and Challenge Takers for the Kingdom of God.</p>
                </div>
                <Link href={getSectionHref("schoolLife", "worship")}
                  className="inline-flex items-center gap-1.5 mt-8 px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                  LEARN MORE <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">From Our Community</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Testimonials</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.name}
                  className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <Quote size={28} className="text-[#C9A84C] mb-4 opacity-70" />
                  <p className="text-[#051040]/70 font-body text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={12} className="fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <p className="font-display text-base font-black text-[#051040]">{t.name}</p>
                  <p className="font-body text-xs text-[#051040]/45 mt-0.5">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ── Combined School ── */}
        <section className="py-24 bg-[#EBDAC8]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="font-label text-xs font-semibold text-[#051040]/50 tracking-[0.2em] uppercase mb-5 fade-up">Grade 1 to Matric</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] leading-[1.15] mb-8 fade-up">
              One School Journey.<br />
              From Grade 1 to Matric.
            </h2>
            <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mb-8 fade-up" />
            <p className="text-[#051040]/75 font-body leading-relaxed mb-5 fade-up">
              His Church School offers a seamless learning journey from primary school through to high school, grounded in faith, character, and academic growth.
            </p>
            <p className="text-[#051040]/75 font-body leading-relaxed mb-10 fade-up">
              Within one nurturing community, learners are known, valued, and guided through every stage of their development. From Grade 1 to Matric, families enjoy the strength, continuity, and belonging of one school home.
            </p>
            <div className="flex flex-wrap justify-center gap-4 fade-up">
              <Link href={getPageHref("about")}
                className="px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                ABOUT THE SCHOOL
              </Link>
              <Link href={getPageHref("contact")}
                className="px-8 py-3 bg-white text-[#051040] border border-[#051040]/20 font-label text-xs font-bold rounded-full hover:bg-gray-50 transition-colors tracking-wider uppercase">
                CONTACT US
              </Link>
            </div>
          </div>
        </section>

        {/* ── Quality Assurance ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Accreditation &amp; Standards</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Quality Assurance</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>His Church School is fully accredited and committed to the highest standards of Christian education. Our academic programme is aligned to the National Curriculum — CAPS — from Grade 1 through to Grade 12.</p>
                  <p>Our NSC examinations are set and managed by SACAI (South African Comprehensive Assessment Institute) and accredited by Umalusi, the national body for quality assurance in education.</p>
                  <p>We are a recognised SACAI examination centre, authorised to conduct NSC examinations for both our own learners and registered external candidates.</p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Umalusi", sublabel: "Accredited", detail: "No. 19 SCH01 00763" },
                    { label: "SACAI", sublabel: "Exam Centre", detail: "NSC Examinations" },
                    { label: "CAPS", sublabel: "Curriculum", detail: "Grade 1 – 12" },
                  ].map((badge) => (
                    <div key={badge.label} className="bg-[#f8f8f8] rounded-xl p-4 border border-gray-100 text-center fade-up">
                      <p className="font-display text-lg font-black text-[#051040]">{badge.label}</p>
                      <p className="font-label text-xs font-bold text-[#C9A84C] tracking-wider uppercase mt-0.5">{badge.sublabel}</p>
                      <p className="font-body text-xs text-[#051040]/45 mt-1">{badge.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={ACADEMICS_URL} alt="Quality Assurance at HCS" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Campus Video ── */}
        <section className="py-20 bg-[#051040] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={HERO_URL} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-4 fade-up">Campus Tour</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-5 fade-up">See Our School</h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-6 fade-up" />
            <p className="text-white/65 font-body mb-10 fade-up">
              Get a glimpse of life at His Church School — our facilities, community, and the vibrant faith-filled environment where our learners thrive.
            </p>
            <button
              onClick={() => window.open("https://www.facebook.com/hischurchschool/videos", "_blank")}
              className="w-20 h-20 rounded-full bg-[#C9A84C] flex items-center justify-center mx-auto hover:bg-[#d7b85d] transition-colors fade-up group"
              aria-label="Watch campus video"
            >
              <Play size={30} className="text-[#051040] ml-1 group-hover:scale-110 transition-transform" />
            </button>
            <p className="text-white/35 text-xs font-body mt-4 fade-up">Click to watch on Facebook</p>
          </div>
        </section>

        
      </div>
    </Layout>
  );
}
