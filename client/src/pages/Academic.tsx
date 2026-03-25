/* =============================================================
   HCS Academic Page
   Design per wireframe PDF:
   - Hero image
   - ACADEMIC CURRICULUM: image left, white card right with crest watermark
   - FET-SUBJECT CHOICES: centred heading, COMPULSORY MAJORS table, CHOICE MAJORS A/B/C
   - Accreditation detail
   ============================================================= */

import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";
const ABOUT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Academic() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>

        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">Academic</h1>
          </div>
        </section>

        {/* ── Academic Curriculum ── */}
        <section id="curriculum" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={ABOUT_URL} alt="Academic Curriculum" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-5">Academic Curriculum</h2>
                <div className="space-y-4 mt-6 text-[#051040]/70 font-body leading-relaxed">
                  <p>At HIS CHURCH SCHOOL we follow the CAPS-curriculum from grade 1 through to grade 12.</p>
                  <p>Assessments are mostly developed internally, except for the external examinations that are set and managed by SACAI (South African Comprehensive Assessment Institute). SACAI also sets and manages the NSC-exams for the grade 12 NSC-exit exam. All NSC-exams are monitored, moderated and accredited by both SACAI and UMALUSI (Council for Quality Assurance in General and Further Education and Training).</p>
                  <p>HIS CHURCH SCHOOL is recognised as an accredited examination centre that is granted the rights to run the NSC-exams for both our own as well as external candidates.</p>
                  <p>HIS CHURCH SCHOOL&apos;s accreditation status is as follows:</p>
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-4 my-6 font-body text-sm text-[#051040]/80 italic">
                  HIS CHURCH SCHOOL is accredited by Umalusi, Council for Quality Assurance in General and Further Education and Training, under accreditation number 19 SCH01 00763.
                  <cite className="block text-xs font-body not-italic text-[#051040]/50 mt-2">Accreditation</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── FET Subject Choices ── */}
        <section id="subjects" className="py-16 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">FET-Subject Choices</h2>
              <p className="text-[#051040]/60 font-body text-sm mt-4 max-w-2xl mx-auto fade-up">
                During the grade 9-academic year, learners are required to select their subjects for the FET-phase (grades 10-12). Both parents and learners are invited to a Parents' Meeting during which the available subject packages of the FET-phase, parent and learner responsibilities, and requirements for achieving the different NSC-exit qualifications are discussed.
              </p>
            </div>

            {/* Compulsory Majors */}
            <div className="mb-8 fade-up">
              <div className="bg-[#051040] text-white text-center py-3 rounded-t-xl">
                <h3 className="font-display text-base font-black">Compulsory Majors</h3>
              </div>
              <div className="bg-white border border-gray-200 rounded-b-xl divide-y divide-gray-100">
                {["ENGLISH", "AFRIKAANS (FAL)", "LIFE ORIENTATION", "MATHS CORE OR MATHEMATICAL LITERACY"].map((subject) => (
                  <div key={subject} className="py-3 text-center font-label text-sm font-semibold text-[#051040] tracking-wide">
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Choice Majors */}
            <div className="fade-up">
              <div className="bg-[#C9A84C] text-[#051040] text-center py-3 rounded-t-xl">
                <h3 className="font-display text-base font-black">Choice Majors</h3>
                <p className="font-label text-xs font-semibold tracking-wide opacity-70">(Select only one from each column below)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden">
                <div className="grid grid-cols-3 divide-x divide-gray-200">
                  {[
                    { col: "A", subjects: ["PHYSICAL SCIENCE", "OR", "HISTORY", "OR", "BUSINESS STUDIES"] },
                    { col: "B", subjects: ["ACCOUNTING", "OR", "GEOGRAPHY"] },
                    { col: "C", subjects: ["LIFE SCIENCE", "OR", "HOSPITALITY", "OR", "CAT"] },
                  ].map(({ col, subjects }) => (
                    <div key={col} className="p-4">
                      <div className="text-center font-display text-lg font-black text-[#051040] mb-3 border-b border-gray-100 pb-2">{col}</div>
                      <div className="space-y-1.5">
                        {subjects.map((s, i) => (
                          <div key={i} className={`text-center text-sm font-body ${s === "OR" ? "text-[#051040]/30 font-semibold text-xs" : "text-[#051040] font-semibold"}`}>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl border border-gray-100 p-5 fade-up">
              <p className="text-[#051040]/70 font-body text-sm leading-relaxed">
                Learners may make a maximum of two subject changes in grade 10 and 11, but only one subject change may be made in grade 12, on condition it is made before the end of the grade 11 academic year. Learners must note that there are cut-off dates for such subject changes. It will also be required of the school, parents and learner to motivate such subject changes. Only once SACAI, our examination body, has condoned such a subject change, may the learner commence studies in the new subject(s). Such changes will be accompanied by additional costs which will be for the student's parent's account.
              </p>
            </div>
          </div>
        </section>

        {/* ── Exit Exam & NSC ── */}
        <section id="exit-exam" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Exit Exam & NSC</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "NSC Exit Examination", content: "The National Senior Certificate (NSC) is the exit qualification for Grade 12 learners. At His Church School, NSC examinations are set and managed by SACAI and are accredited by Umalusi. Learners who achieve the NSC are eligible for university, college, and workplace entry." },
                { title: "SACAI Examination Centre", content: "His Church School is an accredited SACAI examination centre, authorised to run NSC examinations for both our own learners and external candidates. External candidates who wish to write their NSC exams at our centre are welcome to contact us for registration information." },
                { title: "NSC Achievement Levels", content: "The NSC uses a 7-point rating scale: Level 7 (80–100%) Outstanding, Level 6 (70–79%) Meritorious, Level 5 (60–69%) Substantial, Level 4 (50–59%) Adequate, Level 3 (40–49%) Moderate, Level 2 (30–39%) Elementary, Level 1 (0–29%) Not Achieved." },
                { title: "University Entrance", content: "To qualify for a Bachelor's pass, learners must achieve at least 40% in the language of learning and teaching, 50% in four designated subjects, and 30% in two other subjects. Our academic programme is designed to prepare learners to meet and exceed these requirements." },
              ].map((item, i) => (
                <div key={item.title} className="bg-[#f8f8f8] rounded-xl p-6 border border-gray-100 fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3 className="font-display text-lg font-black text-[#051040] mb-3">{item.title}</h3>
                  <p className="text-[#051040]/70 font-body text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Accreditation ── */}
        <section id="accreditation" className="py-16 bg-[#051040] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-8 fade-up">Accreditation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/8 rounded-xl p-6 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-widest text-[#C9A84C] uppercase mb-2">Umalusi</p>
                <h3 className="font-display text-xl font-black text-white mb-3">Council for Quality Assurance</h3>
                <p className="text-white/60 font-body text-sm leading-relaxed mb-3">His Church School is accredited by Umalusi — the Council for Quality Assurance in General and Further Education and Training.</p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide">Accreditation No. 19 SCH01 00763</p>
              </div>
              <div className="bg-white/8 rounded-xl p-6 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-widest text-[#C9A84C] uppercase mb-2">SACAI</p>
                <h3 className="font-display text-xl font-black text-white mb-3">South African Comprehensive Assessment Institute</h3>
                <p className="text-white/60 font-body text-sm leading-relaxed mb-3">His Church School is an authorised SACAI examination centre, running NSC examinations for own and external candidates.</p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide">NSC Examinations — Own & External Candidates</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
