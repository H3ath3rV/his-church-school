/* =============================================================
   HCS Home Page
   Design per wireframe PDF:
   - Hero (full width image)
   - Contact strip: EMAIL US / CALL US / VISIT US (sand/beige bg)
   - 3-col cards: WORSHIP & SPIRIT | FIRE-FIGHTING | FIRST AID
   - LEADERSHIP COURSES section (text left, image right, ENROLL button)
   - FIRE-FIGHTING section (image left, text right, ENROLL button)
   - FIRST AID section (text left, image right, ENROLL button + campus video note)
   - COMBINED SCHOOL (sand/beige bg, centred)
   - Campus video section
   - Quality Assurance / Accreditation
   ============================================================= */

import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Layout from "@/components/Layout";
import { getPageHref, getSectionHref } from "@/lib/sitePaths";
import { Mail, Phone, MapPin, ChevronRight, Play, Award, Shield, Star } from "lucide-react";

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_hero-f6ZbGbULQZM24gUgfEXMzK.webp";
const WORSHIP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";
const ABOUT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";
const SPORT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_sport-ZXz2kRCQJivyVVXye2Jj9C.webp";
const ACADEMICS_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";

const testimonials = [
  {
    quote: "We're so grateful for His Church School. The teachers genuinely care for every child and guide them with faith and grace. Our daughter has thrived both spiritually and academically in this Christ-centered, family-like community.",
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
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#051040]/90 via-[#051040]/60 to-[#051040]/20" />
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="max-w-2xl text-left">
              <h1 className="font-display text-6xl md:text-7xl font-black text-white mb-6 fade-up">
                Confident learners.<br />
                <span className="text-[#C9A84C]">Rooted in Christ.</span>
              </h1>
              <p className="text-white/70 text-base font-body leading-relaxed mb-3 max-w-lg fade-up">
                A private Christian school from Grade 1 to 12, shaping confident, purpose-driven young people.
              </p>
              <p className="text-white/70 text-base font-body leading-relaxed mb-8 max-w-lg fade-up">
                Where every child is known, valued, and guided.
              </p>
              <div className="flex flex-wrap gap-4 fade-up">
                <Link href={getPageHref("contact")} className="px-8 py-3.5 bg-[#C9A84C] text-[#051040] font-label text-sm font-bold rounded-full hover:bg-[#C9A84C]/90 transition-colors">
                  ENROL NOW
                </Link>
                <Link href={getPageHref("about")} className="px-8 py-3.5 bg-white text-[#051040] font-label text-sm font-bold rounded-full hover:bg-white/90 transition-colors">
                  BOOK A VISIT
                </Link>
              </div>
            </div>
            </div>
          </div>
        </section>

        {/* ── Contact Strip (sand/beige background) ── */}
        <section className="bg-[#EBDAC8] py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Mail size={28} className="text-[#051040]" />, label: "EMAIL US", value: "secretary@hcschool.co.za", href: "mailto:secretary@hcschool.co.za" },
                { icon: <Phone size={28} className="text-[#051040]" />, label: "CALL US", value: "031 701 6211", href: "tel:+27317016211" },
                { icon: <MapPin size={28} className="text-[#051040]" />, label: "VISIT US", value: "13 Drake Road, Pinetown", href: "https://maps.google.com/?q=13+Drake+Road+Pinetown" },
              ].map((item) => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/70 rounded-xl px-5 py-4 hover:bg-white transition-colors group fade-up border border-[#c9b48a]/40">
                  <div className="w-14 h-14 rounded-full bg-[#051040]/8 flex items-center justify-center shrink-0 group-hover:bg-[#051040]/12 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-label text-xs font-black text-[#051040] tracking-widest uppercase">{item.label}</p>
                    <p className="font-body text-sm text-[#051040]/70">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3-col activity cards: Worship & Spirit | Firefighting | First Aid ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Worship & Spirit", img: WORSHIP_URL, href: getSectionHref("schoolLife", "worship"), desc: "Faith is the foundation of everything we do. Daily devotions, praise and worship, and a Christ-centred community shape our learners." },
                { title: "Fire-Fighting", img: SPORT_URL, href: getSectionHref("schoolLife", "leadership"), desc: "Learners are trained in basic firefighting skills, building confidence, teamwork, and practical life skills under certified instructors." },
                { title: "First Aid", img: ACADEMICS_URL, href: getSectionHref("schoolLife", "leadership"), desc: "Our First Aid programme equips learners with essential life-saving skills and prepares them to respond effectively in emergencies." },
              ].map((card, i) => (
                <Link key={card.title} href={card.href}
                  className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="aspect-video overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-white">
                    <h3 className="font-display text-lg font-black text-[#051040] mb-2">{card.title}</h3>
                    <p className="text-[#051040]/60 text-sm font-body leading-relaxed mb-3">{card.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#051040] font-label text-xs font-bold group-hover:text-[#C9A84C] transition-colors tracking-wide">
                      LEARN MORE <ChevronRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership Courses (text left, image right, ENROLL button) ── */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up text-left">
                <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] mb-4">Leadership Courses</h2>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  His Church School is committed to developing the whole person. Our Leadership Courses are designed to build character, confidence, and Godly leadership qualities in our learners. Through practical training and Biblical principles, students are equipped to lead with integrity in every area of life.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  Leadership training is integrated into our school culture, with dedicated sessions that challenge learners to grow beyond the classroom — developing decision-making skills, communication, and a servant-hearted approach to leadership.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-8">
                  Our goal is to raise up Decision Makers, World Shakers, and Challenge Takers who will impact their generation for eternity.
                </p>
                <div className="flex justify-start">
                  <a href="mailto:secretary@hcschool.co.za?subject=Leadership Course Enquiry"
                    className="inline-block px-8 py-3 bg-[#051040] text-white font-label text-sm font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider">
                    ENROLL
                  </a>
                </div>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={ABOUT_URL} alt="Leadership Courses" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Firefighting (image left, text right, ENROLL button) ── */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={SPORT_URL} alt="Firefighting" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up order-1 lg:order-2 text-left">
                <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] mb-4">Fire-Fighting</h2>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  His Church School offers a unique firefighting training programme that equips learners with practical skills in fire prevention, control, and safety. This hands-on course is conducted by certified instructors and provides learners with a recognised qualification.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  The programme builds teamwork, courage, and discipline while teaching learners how to respond effectively in emergency situations. It is one of the many ways His Church School prepares learners for real-world challenges.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-8">
                  Learners who complete the course receive a certificate that is recognised in the workplace, giving them a head start in their future careers.
                </p>
                <div className="flex justify-start">
                  <a href="mailto:secretary@hcschool.co.za?subject=Firefighting Course Enquiry"
                    className="inline-block px-8 py-3 bg-[#051040] text-white font-label text-sm font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider">
                    ENROLL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── First Aid (text left, image right, ENROLL button) ── */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="fade-up">
                <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] mb-4">First Aid</h2>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  Our First Aid programme is a certified course that teaches learners essential life-saving skills. From CPR and wound care to emergency response procedures, learners gain the knowledge and confidence to act decisively in medical emergencies.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  The course is accredited and provides learners with a recognised First Aid certificate upon completion. This qualification is valuable for future employment and is a practical skill that can save lives.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-8">
                  At His Church School, we believe in equipping our learners not just academically, but with practical skills that prepare them for life beyond the classroom.
                </p>
                <a href="mailto:secretary@hcschool.co.za?subject=First Aid Course Enquiry"
                  className="inline-block px-8 py-3 bg-[#051040] text-white font-label text-sm font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider">
                  ENROLL
                </a>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={ACADEMICS_URL} alt="First Aid" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Combined School (sand/beige background, centred) ── */}
        <section className="py-20 bg-[#EBDAC8]">
          <div className="max-w-3xl mx-auto px-4 text-center">

            {/* Large heading */}
            <div className="fade-up mb-10">
              <h2 className="font-display text-5xl md:text-6xl font-black text-[#051040]">
                One School Journey.<br />
                From Grade 1 to Matric.
              </h2>
            </div>

            {/* Body copy */}
            <p className="text-[#051040]/75 font-body leading-relaxed mb-5 fade-up">
              His Church School offers a seamless learning journey from primary school to high school, grounded in faith, character, and academic growth.
            </p>
            <p className="text-[#051040]/75 font-body leading-relaxed mb-5 fade-up">
              Within one nurturing community, learners are known, valued, and guided through every stage of their development. From Grade 1 to Matric, families can enjoy the strength, continuity, and belonging of one school home.
            </p>

          </div>
        </section>

        {/* ── Campus Video ── */}
        <section className="py-16 bg-[#051040] relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img src={HERO_URL} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-widest uppercase mb-4 fade-up">Campus Tour</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 fade-up">See Our School</h2>
            <p className="text-white/70 font-body mb-8 fade-up">
              Get a glimpse of life at His Church School — our facilities, community, and the vibrant faith-filled environment where our learners thrive.
            </p>
            <button
              onClick={() => window.open("https://www.facebook.com/hischurchschool/videos", "_blank")}
              className="w-20 h-20 rounded-full bg-[#C9A84C] flex items-center justify-center mx-auto hover:bg-[#C9A84C]/90 transition-colors fade-up group"
              aria-label="Watch campus video"
            >
              <Play size={32} className="text-[#051040] ml-1 group-hover:scale-110 transition-transform" />
            </button>
            <p className="text-white/40 text-xs font-body mt-4 fade-up">Click to watch on Facebook</p>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] mb-12 text-center fade-up">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm flex flex-col fade-up">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-5">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={18} className="fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="font-body italic text-[#051040]/75 text-base leading-relaxed flex-1 mb-8">
                    {t.quote}
                  </p>
                  {/* Attribution */}
                  <div className="text-center">
                    <p className="font-label font-bold text-[#051040] text-sm">{t.name}</p>
                    <p className="font-body text-gray-500 text-sm mt-0.5">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Enrolment CTA ── */}

      </div>
    </Layout>
  );
}
