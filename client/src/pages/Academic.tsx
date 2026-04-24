import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ResponsiveEditorialImage from "@/components/ResponsiveEditorialImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";

const HERO_URL = getPublicAssetHref(
  "photos/academic/academic-hero-mobile.webp"
);
const HERO_TABLET_URL = getPublicAssetHref(
  "photos/academic/academic-hero-tablet.webp"
);
const HERO_DESKTOP_URL = getPublicAssetHref(
  "photos/academic/academic-hero-desktop.webp"
);
const CURRICULUM_DESKTOP_URL = getPublicAssetHref(
  "photos/academic/academic-curriculum-desktop.webp"
);
const CURRICULUM_MOBILE_URL = getPublicAssetHref(
  "photos/academic/academic-curriculum-mobile.webp"
);
const CURRICULUM_TABLET_URL = getPublicAssetHref(
  "photos/academic/academic-curriculum-tablet.webp"
);

const SUBJECT_COLUMNS = [
  {
    col: "A",
    subjects: ["Physical Science", "OR", "History", "OR", "Business Studies"],
  },
  { col: "B", subjects: ["Accounting", "OR", "Geography"] },
  { col: "C", subjects: ["Life Science", "OR", "Hospitality", "OR", "CAT"] },
];

const EXIT_EXAM_CARDS = [
  {
    title: "NSC Exit Examination",
    content:
      "The National Senior Certificate (NSC) is the exit qualification for Grade 12 learners. At His\u00A0Church\u00A0School, NSC examinations are set and managed by SACAI and are accredited by Umalusi. Learners who achieve the NSC are eligible for university, college, and workplace entry.",
  },
  {
    title: "SACAI Examination Centre",
    content:
      "His\u00A0Church\u00A0School is an accredited SACAI examination centre, authorised to run NSC examinations for both our own learners and external candidates. External candidates who wish to write their NSC exams at our centre are welcome to contact us for registration information.",
  },
  {
    title: "NSC Achievement Levels",
    content:
      "The NSC uses a 7-point rating scale: Level\u00A07 (80\u2011100%) Outstanding, Level\u00A06 (70\u201179%) Meritorious, Level\u00A05 (60\u201169%) Substantial, Level\u00A04 (50\u201159%) Adequate, Level\u00A03 (40\u201149%) Moderate, Level\u00A02 (30\u201139%) Elementary, Level\u00A01 (0\u201129%) Not Achieved.",
  },
  {
    title: "University Entrance",
    content:
      "To qualify for a Bachelor's pass, learners must achieve at least 40% in the language of learning and teaching, 50% in four designated subjects, and 30% in two other subjects. Our academic programme is designed to prepare learners to meet and exceed these requirements.",
  },
];

export default function Academic() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero
          title="Academic"
          imageUrl={HERO_URL}
          mobileShowFullImage
          mobileAspectRatio="1080 / 1201"
          tabletImageUrl={HERO_TABLET_URL}
          tabletShowFullImage
          tabletAspectRatio="2 / 1"
          desktopImageUrl={HERO_DESKTOP_URL}
          desktopShowFullImage
          desktopAspectRatio="4 / 1"
        />

        {/* ── Academic Curriculum ── */}
        <section id="curriculum" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
              <div className="fade-up">
                <ResponsiveEditorialImage
                  className="hcs-editorial-image"
                  desktopImageUrl={CURRICULUM_DESKTOP_URL}
                  mobileImageUrl={CURRICULUM_MOBILE_URL}
                  tabletImageUrl={CURRICULUM_TABLET_URL}
                  alt="Learners working together during an academic lesson at His Church School"
                />
              </div>
              <div className="fade-up hcs-split-copy">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/62 lg:text-left">
                  CAPS Curriculum
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  <span className="block sm:inline">Academic</span>{" "}
                  <span className="block sm:inline">Curriculum</span>
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="mx-auto max-w-[44ch] space-y-4 text-center text-[#051040]/70 font-body leading-relaxed lg:mx-0 lg:max-w-none lg:text-left">
                  <p>
                    At His&nbsp;Church&nbsp;School we follow the CAPS curriculum
                    from Grade 1 through to Grade 12.
                  </p>
                  <p>
                    Assessments are mostly developed internally, except for the
                    external examinations that are set and managed by SACAI
                    (South African Comprehensive Assessment Institute). SACAI
                    also sets and manages the NSC exams for the Grade 12 NSC
                    exit exam. All NSC exams are monitored, moderated, and
                    accredited by both SACAI and Umalusi.
                  </p>
                  <p>
                    His&nbsp;Church&nbsp;School is an accredited examination
                    centre authorised to run NSC examinations for both our own
                    learners and external candidates.
                  </p>
                </div>
                <blockquote className="hcs-pullquote mx-auto max-w-[44ch] lg:mx-0 lg:max-w-none">
                  His&nbsp;Church&nbsp;School is accredited by Umalusi, Council
                  for Quality Assurance in General and Further Education and
                  Training, under accreditation number 19 SCH01 00763.
                  <cite>Umalusi Accreditation</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── FET Subject Choices ── */}
        <section id="subjects" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
                Grades 10 – 12
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                <span className="block sm:inline">FET Subject</span>{" "}
                <span className="block sm:inline">Choices</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-6 fade-up hcs-divider" />
              <p className="mx-auto w-full max-w-[44ch] text-center font-body text-base leading-relaxed text-[#051040]/70 fade-up md:max-w-4xl">
                During the Grade 9 academic year, learners prepare for the FET
                phase by selecting a balanced subject package for Grades 10 to
                12. The combinations below show the compulsory majors and
                grouped elective options available at
                His&nbsp;Church&nbsp;School.
              </p>
            </div>

            {/* Compulsory Majors */}
            <div className="mb-8 fade-up rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="bg-[#051040] text-white text-center py-4 px-6">
                <h3 className="font-display text-lg font-black tracking-wide">
                  Compulsory Majors
                </h3>
              </div>
              <div className="bg-white px-5">
                {[
                  "English",
                  "Afrikaans (FAL)",
                  "Life Orientation",
                  "Maths Core or Mathematical Literacy",
                ].map((subject, index) => (
                  <div
                    key={subject}
                    className={`py-3.5 text-center font-label text-sm font-semibold text-[#051040] tracking-wide ${index > 0 ? "border-t border-gray-200" : ""}`}
                  >
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Choice Majors */}
            <div className="fade-up rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              <div className="bg-[#EBDAC8] text-[#051040] text-center py-4 px-6">
                <h3 className="font-display text-lg font-black tracking-wide">
                  Choice Majors
                </h3>
                <p className="font-label text-xs font-semibold tracking-[0.12em] opacity-65 mt-1">
                  Select one from each column below
                </p>
              </div>
              <div className="bg-white overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {SUBJECT_COLUMNS.map(({ col, subjects }, columnIndex) => (
                    <div
                      key={col}
                      className={`relative p-5 ${
                        columnIndex > 0 ? "border-t border-gray-200" : ""
                      } ${columnIndex > 0 ? "md:border-t-0" : ""}`}
                    >
                      {columnIndex > 0 ? (
                        <div
                          aria-hidden="true"
                          className="absolute bottom-5 left-0 top-5 hidden w-px bg-gray-200 md:block"
                        />
                      ) : null}
                      <div className="mb-3 border-b border-gray-200 pb-3 text-center font-display text-lg font-black text-[#051040] md:text-xl">
                        {col}
                      </div>
                      <div className="space-y-2">
                        {subjects.map((s, i) => (
                          <div
                            key={i}
                            className={`text-center font-body ${s === "OR" ? "text-[#051040]/62 text-xs font-semibold" : "text-[#051040] text-sm font-semibold"}`}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-4xl text-center fade-up">
              <p className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/62">
                Subject Change Policy
              </p>
              <p className="mx-auto w-full max-w-[44ch] text-center font-body text-[0.96rem] leading-[1.78] text-[#051040]/66 sm:text-[0.98rem] md:max-w-none">
                Learners may make a maximum of two subject changes in Grade 10
                and 11, but only one subject change may be made in Grade 12, on
                condition it is made before the end of the Grade 11 academic
                year. Cut-off dates apply and all changes require motivation
                from the school, parents, and learner. Only once SACAI has
                condoned the change may the learner commence studies in the new
                subject(s). Additional costs will be charged to the parents'
                account.
              </p>
            </div>
          </div>
        </section>

        {/* ── Career Guidance ── */}
        <section
          id="career-guidance"
          className="py-20 bg-[#EBDAC8] scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
                Future Pathways
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2 fade-up">
                Career Guidance
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-6 fade-up hcs-divider" />
              <div className="mx-auto w-full max-w-[44ch] space-y-4 text-center font-body text-[0.96rem] leading-[1.78] text-[#051040]/66 fade-up sm:text-[0.98rem] md:max-w-none">
                <p>
                  His&nbsp;Church&nbsp;School is committed to helping every
                  learner discover their God-given purpose, equipping them with
                  the knowledge, direction, and confidence to pursue a
                  meaningful future. Our Career Guidance programme supports both
                  learners and families through subject selection, tertiary
                  planning, and career exploration, helping learners understand
                  how their academic choices shape future opportunities.
                </p>
                <p>
                  In Grade 9, learners and their parents attend a dedicated
                  meeting focused on FET subject packages, career pathways, and
                  the requirements for university, college, or vocational
                  training. Throughout this journey, our staff walk alongside
                  each learner, helping them set goals, recognise their
                  strengths, and step confidently into the future with purpose
                  and faith.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Exit Exam & NSC ── */}
        <section id="exit-exam" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
                Grade 12
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Exit Exam &amp; NSC
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2">
              {EXIT_EXAM_CARDS.map((item, i) => (
                <div
                  key={item.title}
                  className="h-full bg-[#f8f8f8] rounded-[1.5rem] p-6 md:p-7 border border-[#ece7de] fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className="font-display text-xl md:text-[22px] font-black text-[#051040] mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <div className="w-9 h-0.5 bg-[#C9A84C] mb-4" />
                  <p className="font-body text-[0.98rem] leading-[1.72] text-[#051040]/65 sm:text-[1rem]">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Accreditation ── */}
        <section id="accreditation" className="py-20 bg-[#051040] scroll-mt-20">
          <div className="max-w-6xl mx-auto hcs-shell text-center">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-3 fade-up">
              Quality Assurance
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-2 fade-up">
              Accreditation
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-10 fade-up hcs-divider" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white/6 rounded-2xl p-7 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-[0.12em] text-[#C9A84C] uppercase mb-2">
                  Umalusi
                </p>
                <h3 className="font-display text-xl font-black text-white mb-3">
                  Council for Quality Assurance
                </h3>
                <div className="w-8 h-0.5 bg-[#C9A84C]/50 mb-4" />
                <p className="mb-4 font-body text-[0.98rem] leading-[1.72] text-white/66 sm:text-[1rem]">
                  His&nbsp;Church&nbsp;School is accredited by Umalusi, the
                  Council for Quality Assurance in General and Further Education
                  and Training.
                </p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em]">
                  Accreditation No. 19 SCH01 00763
                </p>
              </div>
              <div className="bg-white/6 rounded-2xl p-7 border border-white/10 fade-up text-left">
                <p className="font-label text-xs font-bold tracking-[0.12em] text-[#C9A84C] uppercase mb-2">
                  SACAI
                </p>
                <h3 className="font-display text-xl font-black text-white mb-3">
                  South African Comprehensive Assessment Institute
                </h3>
                <div className="w-8 h-0.5 bg-[#C9A84C]/50 mb-4" />
                <p className="mb-4 font-body text-[0.98rem] leading-[1.72] text-white/66 sm:text-[1rem]">
                  His&nbsp;Church&nbsp;School is an authorised SACAI examination
                  centre, running NSC examinations for own and external
                  candidates.
                </p>
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em]">
                  NSC Examinations: Own &amp; External Candidates
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
