/* =============================================================
   HCS Communications Page
   Sections: Hero, Parent Letters, School Calendar, Stationery Lists
   ============================================================= */

import Layout from "@/components/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";
import { Mail, Calendar, BookOpen, Download, Bell } from "lucide-react";

const ACADEMICS_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";
const ABOUT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";

const termDates = [
  { term: "Term 1", dates: "14 January – 28 March 2025", days: "55 school days" },
  { term: "Term 2", dates: "14 April – 27 June 2025", days: "55 school days" },
  { term: "Term 3", dates: "22 July – 26 September 2025", days: "55 school days" },
  { term: "Term 4", dates: "13 October – 12 December 2025", days: "46 school days" },
];

export default function Communications() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ACADEMICS_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3">His Church School</p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">Communications</h1>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="py-16 bg-[#EBDAC8]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-4 fade-up">Stay Connected</h2>
            <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mb-6 fade-up" />
            <p className="text-[#051040]/70 font-body leading-relaxed fade-up">
              His Church School is committed to keeping parents and guardians informed and involved in their child's education. This page is your central hub for school letters, the academic calendar, and stationery requirements.
            </p>
          </div>
        </section>

        {/* ── Parent Letters ── */}
        <section id="parent-letters" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">From the School</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Parent Letters</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <p className="text-[#051040]/70 font-body leading-relaxed mb-4">
                  Official communications from the school are sent directly to parents and guardians via email and WhatsApp. Important letters regarding school events, policy changes, and announcements are archived here for your reference.
                </p>
                <p className="text-[#051040]/70 font-body leading-relaxed mb-8">
                  Please ensure your contact details are kept up to date with the school office so you never miss an important communication. To update your details, contact our secretary directly.
                </p>
                <div className="bg-[#f8f8f8] rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] shrink-0">
                      <Bell size={16} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-black text-[#051040] mb-1">Stay up to date</h4>
                      <p className="text-[#051040]/55 font-body text-sm leading-relaxed">
                        Parent letters and circulars are published here as they are issued. Current documents will appear below. Contact the school office if you need a copy of a specific letter.
                      </p>
                      <a href="mailto:secretary@hcschool.co.za?subject=Parent Letter Request"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                        <Mail size={12} /> REQUEST A LETTER
                      </a>
                    </div>
                  </div>
                </div>
                {/* Placeholder for future letter downloads */}
                <div className="mt-6 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                  <p className="text-[#051040]/30 font-body text-sm italic">Parent letters will appear here as they are published.</p>
                </div>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={ABOUT_URL} alt="School communications" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── School Calendar ── */}
        <section id="school-calendar" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Academic Year 2025</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">School Calendar</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {termDates.map((t, i) => (
                <div key={t.term}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="bg-[#051040] px-6 py-4 flex items-center gap-3">
                    <Calendar size={16} className="text-[#C9A84C]" />
                    <h3 className="font-label text-xs tracking-[0.15em] text-[#C9A84C] uppercase font-bold">{t.term}</h3>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-lg font-black text-[#051040]">{t.dates}</p>
                    <p className="font-body text-sm text-[#051040]/45 mt-1">{t.days}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center fade-up">
              <p className="text-[#051040]/40 font-body text-sm mb-4 italic">Full school calendar with event dates available on request.</p>
              <a href="mailto:secretary@hcschool.co.za?subject=School Calendar Request"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                <Download size={14} /> REQUEST FULL CALENDAR
              </a>
            </div>
          </div>
        </section>

        {/* ── Stationery Lists ── */}
        <section id="stationery" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">School Requirements</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Stationery Lists</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
              <p className="text-[#051040]/50 font-body text-sm mt-4 max-w-xl mx-auto fade-up">
                Stationery requirements are published at the start of each academic year. Download the list for your child's grade below, or contact the school office for assistance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { phase: "Foundation Phase", grades: "Grade 1 – 3", file: "stationery-gr1-3.pdf" },
                { phase: "Intermediate Phase", grades: "Grade 4 – 6", file: "stationery-gr4-6.pdf" },
                { phase: "Senior Phase", grades: "Grade 7 – 9", file: "stationery-gr7-9.pdf" },
                { phase: "FET Phase", grades: "Grade 10 – 12", file: "stationery-gr10-12.pdf" },
              ].map((item, i) => (
                <div key={item.phase}
                  className="bg-[#f8f8f8] rounded-2xl p-7 border border-gray-100 flex flex-col gap-4 fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] shrink-0">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <h4 className="font-display text-base font-black text-[#051040]">{item.phase}</h4>
                      <p className="font-body text-sm text-[#051040]/45">{item.grades}</p>
                    </div>
                  </div>
                  <a href="mailto:secretary@hcschool.co.za?subject=Stationery List Request – {item.grades}"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                    <Download size={12} /> REQUEST LIST
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center fade-up">
              <p className="text-[#051040]/40 font-body text-xs italic">When stationery lists are available as downloads, they will appear here automatically.</p>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
