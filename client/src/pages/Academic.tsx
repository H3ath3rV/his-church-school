/* =============================================================
   HCS Academic Page — Platinum Polish
   Typography: Playfair Display (headings) + Inter (body/labels)
   Consistent section headings, gold rule dividers, card styles
   ============================================================= */

import Layout from "@/components/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";

export default function Academic() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3">His Church School</p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">Academic</h1>
          </div>
        </section>

        {/* ── Academic Curriculum ── */}
        <section id="curriculum" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={HERO_URL} alt="Academic Curriculum" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">CAPS Curriculum</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Academic Curriculum</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>At His Church School we follow the CAPS curriculum from Grade 1 through to Grade 12.</p>
                  <p>Assessments are mostly developed internally, except for the external examinations that are set and managed by SACAI (South African Comprehensive Assessment Institute). SACAI also sets and manages the NSC exams for the Grade 12 NSC exit exam. All NSC exams are monitored, moderated, and accredited by both SACAI and Umalusi.</p>
                  <p>His Church School is recognised as an accredited examination centre that is granted the rights to run the NSC exams for both our own as well as external candidates.</p>
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-5 my-6 font-body text-sm text-[#051040]/75 italic leading-relaxed">
                  His Church School is accredited by Umalusi, Council for Quality Assurance in General and Further Education and Training, under accreditation number 19 SCH01 00763.
                  <cite className="block text-xs font-body not-italic text-[#051040]/45 mt-2">— Umalusi Accreditation</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── FET Subject Choices ── */}
        <section id="subjects" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Grades 10 – 12</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">FET Subject Choices</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-6 fade-up" />
              <p className="text-[#051040]/60 font-body text-sm leading-relaxed max-w-2xl mx-auto fade-up">
                During the Grade 9 academic year, learners are required to select their subjects for the FET phase (Grades 10–12). Both parents and learners are invited to a Parents' Meeting to discuss available subject packages, responsibilities, and NSC exit qualification requirements.
              </p>
            </div>

            {/* Compulsory Majors */}
            <div className="mb-8 fade-up rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="bg-[#051040] text-white text-center py-4 px-6">
                <h3 className="font-display text-lg font-black tracking-wide">Compulsory Majors</h3>
              </div>
              <div className="bg-white divide-y divide-gray-100">
                {["English", "Afrikaans (FAL)", "Life Orientation", "Maths Core or Mathematical Literacy"].map((subject) => (
                  <div key={subject} className="py-3.5 text-center font-label text-sm font-semibold text-[#051040] tracking-wide">
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Choice Majors */}
            <div className="fade-up rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="bg-[#C9A84C] text-[#051040] text-center py-4 px-6">
                <h3 className="font-display text-lg font-black tracking-wide">Choice Majors</h3>
                <p className="font-label text-xs font-semibold tracking-wider opacity-65 mt-1">Select one from each column below</p>
              </div>
              <div className="bg-white overflow-hidden">
                <div className="grid grid-cols-3 divide-x divide-gray-100">
                  {[
                    { col: "A", subjects: ["Physical Science", "OR", "History", "OR", "Business Studies"] },
                    { col: "B", subjects: ["Accounting", "OR", "Geography"] },
                    { col: "C", subjects: ["Life Science", "OR", "Hospitality", "OR", "CAT"] },
                  ].map(({ col, subjects }) => (
                    <div key={col} className="p-5">
                      <div className="text-center font-display text-xl font-black text-[#051040] mb-3 border-b border-gray-100 pb-3">{col}</div>
                      <div className="space-y-2">
                        {subjects.map((s, i) => (
                          <div key={i} className={`text-center font-body ${s === "OR" ? "text-[#051040]/30 text-xs font-semibold" : "text-[#051040] text-sm font-semibold"}`}>
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 fade-up">
              <p className="text-[#051040]/65 font-body text-sm leading-relaxed">
                Learners may make a maximum of two subject changes in Grade 10 and 11, but only one subject change may be made in Grade 12, on condition it is made before the end of the Grade 11 academic year. Cut-off dates apply and all changes require motivation from the school, parents, and learner. Only once SACAI has condoned the change may the learner commence studies in the new subject(s). Additional costs will be for the student's parent's account.
              </p>
            </div>
          </div>
        </section>

        {/* ── Exit Exam & NSC ── */}
        <section id="exit-exam" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Grade 12</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Exit Exam &amp; NSC</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "NSC Exit Examination",
                  content: "The National Senior Certificate (NSC) is the exit qualification for Grade 12 learners. At His Church School, NSC examinations are set and managed by SACAI and are accredited by Umalusi. Learners who achieve the NSC are eligible for university, college, and workplace entry.",
                },
                {
                  title: "SACAI Examination Centre",
                  content: "His Church School is an accredited SACAI examination centre, authorised to run NSC examinations for both our own learners and external candidates. External candidates who wish to write their NSC exams at our centre are welcome to contact us for registration information.",
                },
                {
                  title: "NSC Achievement Levels",
                  content: "The NSC uses a 7-point rating scale: Level 7 (80–100%) Outstanding, Level 6 (70–79%) Meritorious, Level 5 (60–69%) Substantial, Level 4 (50–59%) Adequate, Level 3 (40–49%) Moderate, Level 2 (30–39%) Elementary, Level 1 (0–29%) Not Achieved.",
                },
                {
                  title: "University Entrance",
                  content: "To qualify for a Bachelor's pass, learners must achieve at least 40% in the language of learning and teaching, 50% in four designated subjects, and 30% in two other subjects. Our academic programme is designed to prepare learners to meet and exceed these requirements.",
                },
              ].map((item, i) => (
                <div key={item.title} className="bg-[#f8f8f8] rounded-2xl p-6 border border-gray-100 fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3 className="font-display text-lg font-black text-[#051040] mb-3">{item.title}</h3>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mb-3" />
                  <p className="text-[#051040]/65 font-body text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Accreditation ── */}
        <section id="accreditation" className="py-20 bg-[#051040] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3 fade-up">Quality Assurance</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-2 fade-up">Accreditation</h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-10 fade-up" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white/8 rounded-2xl p-7 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-[0.15em] text-[#C9A84C] uppercase mb-2">Umalusi</p>
                <h3 className="font-display text-xl font-black text-white mb-3">Council for Quality Assurance</h3>
                <div className="w-8 h-0.5 bg-[#C9A84C]/50 mb-4" />
                <p className="text-white/60 font-body text-sm leading-relaxed mb-4">His Church School is accredited by Umalusi — the Council for Quality Assurance in General and Further Education and Training.</p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide">Accreditation No. 19 SCH01 00763</p>
              </div>
              <div className="bg-white/8 rounded-2xl p-7 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-[0.15em] text-[#C9A84C] uppercase mb-2">SACAI</p>
                <h3 className="font-display text-xl font-black text-white mb-3">South African Comprehensive Assessment Institute</h3>
                <div className="w-8 h-0.5 bg-[#C9A84C]/50 mb-4" />
                <p className="text-white/60 font-body text-sm leading-relaxed mb-4">His Church School is an authorised SACAI examination centre, running NSC examinations for own and external candidates.</p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide">NSC Examinations — Own &amp; External Candidates</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
