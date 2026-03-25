/* =============================================================
   HCS About Us Page
   Design per wireframe PDF:
   - Hero image
   - HISTORY: image left, text right, READ MORE button
   - VISION: sand/beige background, centred heading + text
   - MISSION: text left, image right
   - ORGANOGRAM: full-width org chart
   - Staff flip cards: dark navy front, white back
   - Buttons: ADMISSION POLICY | LANGUAGE POLICY | CODE OF CONDUCT
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { getPublicAssetHref } from "@/lib/sitePaths";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ABOUT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";
const WORSHIP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";
const HERO_URL = ABOUT_URL;

type StaffMember = {
  name: string;
  role: string;
  position: string;
  qualification: string;
  funFacts: string;
  hobbies: string;
  initials: string;
  photo?: string;
  photoPosition?: string;
  photoScale?: number;
};

const staffMembers: StaffMember[] = [
  {
    name: "Mrs. Esther Botha",
    role: "Principal",
    position: "FET-Educator: Physical Sciences & Mathematics | SGB Member",
    qualification: "Higher Diploma in Education; Further Diploma in Education; B.Ed Honours cum Laude (Leadership in Mathematics and Science Education)",
    funFacts: "Member of the school's Praise and Worship Team; Qualified Field and Track Athletics Official; Qualified Level One First-Aider; Chief Invigilator for NSC-Exams",
    hobbies: "Interior Decorating; Art; Music; Cooking; Gardening; Poetry; Clothing Design; Problem Solving",
    initials: "EB",
  },
  {
    name: "Mr. André Botha",
    role: "Deputy Principal",
    position: "Head of Senior Phase (Gr 7–9) | Afrikaans, Social Sciences, Geography & History | SGB Deputy Chairperson",
    qualification: "HDE (4 years); FDE (2 years) — Durbanse Onderwyskollege; 37 years teaching experience",
    funFacts: "18 years in SANDF-Reserve Force; Grief Share counselling facilitator; Loves taking young people into nature for survival training",
    hobbies: "Camping; Woodwork; Researching survival techniques",
    initials: "AB",
    photo: "/staff/andre-botha.jpg",
    photoPosition: "54% 12%",
    photoScale: 1.4,
  },
  {
    name: "Mr. Reinhardt Geldenhuys",
    role: "HOD FET Phase",
    position: "Geography & Afrikaans (FET) | Head of Department FET | SMT & SGB Member",
    qualification: "Bachelor of Education — Afrikaans & Geography; Level One First Aider; Fire Fighter Training",
    funFacts: "Member of HCS Praise and Worship Team; Experienced Athletics Official; Previous KZNCSSA Football Coach & Manager",
    hobbies: "Musician (guitar & piano); Sport (Squash, Tennis, Rugby, Football)",
    initials: "RG",
  },
  {
    name: "Mrs. Brenda Govender",
    role: "Head of Foundation Phase",
    position: "Hospitality Gr 10–12 | Life Orientation Gr 10–11 | Grade 3 Register Teacher | Management Member",
    qualification: "Higher Diploma in Education; B.Ed Degree",
    funFacts: "Focus group leader; Community leader; Sunday school leader; Deacon",
    hobbies: "Netball; Walking; Reading; Beach; Organising functions",
    initials: "BG",
  },
  {
    name: "Mrs. Jo Dyson",
    role: "Head of Intermediate Phase",
    position: "English Gr 8–12 | Mathematics & Social Studies Specialist (Intermediate Phase)",
    qualification: "HDE (Higher Diploma in Education)",
    funFacts: "Family is everything; Loves the beach and outdoors; Avid Arsenal/Spurs supporter",
    hobbies: "Reading; Music; Gardening; Swimming; Watching Sport; Outreach",
    initials: "JD",
  },
  {
    name: "Mr. Samuel-Dean Green",
    role: "IT Administrator",
    position: "FET-Phase: CAT, IT & Mathematical Literacy | SMT Member",
    qualification: "NCIT Diploma; MCAD; A+; N+",
    funFacts: "Drummer; His dogs are like his children",
    hobbies: "Coding; Board Games; IT Repairs",
    initials: "SG",
  },
  {
    name: "Mrs. Laura Pillay",
    role: "Foundation & Intermediate Phase",
    position: "Register Teacher | Media Marketing | School Tuck Shop",
    qualification: "Bachelor of Education Early Childhood: Foundation Phase; 2 years Theology at CBI; 1 year Business Management",
    funFacts: "Employed by HCS since 2013; Loves capturing moments; Believes in servanthood; Teacher-Mom to all her students",
    hobbies: "Events planning; Graphic design; Art/Crafts; Spending time with husband",
    initials: "LP",
  },
  {
    name: "Miss. Timón Botha",
    role: "SGB Secretary",
    position: "Life Science, Life Orientation & Mathematical Literacy (FET) | General Sciences (Senior Phase) | Register Teacher | Social Media & Marketing",
    qualification: "BSc Behavioural Genetics; PGCE Senior Phase & FET; Level One First-Aider; Fire-fighting Certificate",
    funFacts: "Member of HCS Praise and Worship Team; Avid swimmer, athlete, soccer and hockey player; Played provincial hockey from age 10",
    hobbies: "Hockey; Soccer; Water sports; Camping; Reading; Sudoku",
    initials: "TB",
    photo: "/staff/timon-botha.jpg",
    photoPosition: "48% 14%",
    photoScale: 1.4,
  },
  {
    name: "Mrs. Emma Nyika",
    role: "EMS, Business Studies & Accounting",
    position: "Educator: EMS, Business Studies and Accounting",
    qualification: "B.Com Honours in Accounting; Social Sciences B.Com Accounting; Diploma in Education (infant education)",
    funFacts: "Loves going to church; Keen interest in fashion; Loves working with children",
    hobbies: "Sewing; Designing clothes; Traveling; Coaching Netball",
    initials: "EN",
    photo: "/staff/emma-nyika.jpg",
    photoPosition: "52% 14%",
    photoScale: 1.42,
  },
  {
    name: "Mrs. Jade Banks",
    role: "Art, Drama & LO",
    position: "Art & Drama Gr 1–9 | Life Orientation & Religious Studies | Register Teacher",
    qualification: "10 years teaching experience",
    funFacts: "Nickname: Miss. Sparkles; Loves beach, fashion and beauty; Loves young girls' and women's ministry",
    hobbies: "Interior design; Make-up tutorials; Image consulting; Open mic nights; Traveling",
    initials: "JB",
  },
  {
    name: "Mr. Lawrence Mda",
    role: "Physical Education",
    position: "PE Gr 1–12 | Intermediate Phase Subject Specialist | Register Teacher",
    qualification: "Started as teacher's assistant; Currently enrolled in HCS Learnership Program",
    funFacts: "LOVES food; Ballroom, Latin and dancer — won numerous awards",
    hobbies: "Chess; Dancing, dancing, and dancing!",
    initials: "LM",
  },
  {
    name: "Mrs. Linda Murray",
    role: "Gr 4 & 5 Educator",
    position: "Afrikaans, English, Sciences & Mathematics Specialist",
    qualification: "National Diploma in Clinical Pathology; National Diploma in Human Parasitology; National Diploma in Microbiology",
    funFacts: "Chocolate lover; Masters in Swimming; Qualified Athletics Chip Maker; Game Reserve Botswana off-road camper",
    hobbies: "Art; Music; Cooking; Gardening; Fine art painting; Sudoku",
    initials: "LMu",
    photo: "/staff/linda-murray.jpg",
    photoPosition: "50% 18%",
    photoScale: 1.36,
  },
  {
    name: "Mrs. Amanda Perumal",
    role: "Grade 1 Teacher",
    position: "Grade 1 Teacher | Intermediate Phase Subject Specialist",
    qualification: "Bachelor of Education: Foundation Phase; Taught English in Denmark for 18 months",
    funFacts: "Wants to bungee jump one day; Loves baking in silence as 'me time'",
    hobbies: "Baking; Reading; Traveling",
    initials: "AP",
  },
  {
    name: "Mrs. Anita Warren",
    role: "Foundation Phase",
    position: "Foundation Phase Educator | Afrikaans & Social Studies (Intermediate Phase)",
    qualification: "NPDE qualification; Experience in individual modular education and CAPS private schools",
    funFacts: "Did scuba diving when younger; Favourite fish is the clown fish",
    hobbies: "Crafting; Gardening",
    initials: "AW",
    photo: "/staff/anita-warren.jpg",
    photoPosition: "46% 10%",
    photoScale: 2.45,
  },
  {
    name: "Mrs. Dalene White",
    role: "Personal Assistant",
    position: "Personal Assistant to Management",
    qualification: "Diploma in Management Accounting & Finance; Certificate in Financial Accounting; Certificate in Executive Secretarial Studies (Distinction); Certificate in Bookkeeping (Distinction) — Varsity College",
    funFacts: "HCS graduate; Working at HCS since 2007; Won Rebecca Simpson Typing Trophy (fastest typist)",
    hobbies: "Nature & outdoors; Swimming; Camping; Hiking; Drakensberg",
    initials: "DW",
  },
  {
    name: "Mrs. Beryl Cawood",
    role: "Administrator",
    position: "Administrator since 2007",
    qualification: "Bookkeeping Course; 35 years experience as bookkeeper in the legal profession",
    funFacts: "Learned to ride a motorbike at 15; Once rolled a car on Fields' Hill; Won a hula-hoop competition at age 9",
    hobbies: "Knitting; Crocheting; Line-dancing; Reading; Cooking",
    initials: "BC",
  },
];

const ORGANOGRAM_GRID_GAP = "1.25rem";
const seniorManagementConnectorStyle = {
  left: `calc((100% - (2 * ${ORGANOGRAM_GRID_GAP})) / 6)`,
  right: `calc((100% - (2 * ${ORGANOGRAM_GRID_GAP})) / 6)`,
};
const juniorManagementConnectorStyle = {
  left: `calc((100% - (3 * ${ORGANOGRAM_GRID_GAP})) / 8)`,
  right: `calc((100% - (3 * ${ORGANOGRAM_GRID_GAP})) / 8)`,
};

function StaffCard({ member }: { member: StaffMember }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", minHeight: "260px" }}
      >
        {/* Front — dark navy */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-[#051040] flex flex-col items-center justify-center p-6 text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-20 h-20 rounded-full bg-[#C9A84C]/20 border-2 border-[#C9A84C]/40 overflow-hidden flex items-center justify-center mb-4">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover origin-center"
                style={{
                  objectPosition: member.photoPosition ?? "center",
                  transformOrigin: member.photoPosition ?? "center",
                  transform: `scale(${member.photoScale ?? 1.55})`,
                }}
                loading="lazy"
              />
            ) : (
              <span className="font-display text-2xl font-black text-[#C9A84C]">{member.initials}</span>
            )}
          </div>
          <h3 className="font-display text-base font-black text-white mb-1">{member.name}</h3>
          <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide uppercase">{member.role}</p>
          <p className="text-white/40 text-xs font-body mt-2 line-clamp-2">{member.position}</p>
          <div className="mt-4 w-8 h-0.5 bg-[#C9A84C]/40 mx-auto" />
          <p className="text-white/30 text-xs font-body mt-2">Click to learn more</p>
        </div>
        {/* Back — white */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden bg-white border border-gray-100 p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <h3 className="font-display text-sm font-black text-[#051040] mb-0.5">{member.name}</h3>
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-wide uppercase mb-3">{member.role}</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-label font-bold text-[#051040]/60 uppercase tracking-wide mb-0.5">Qualification</p>
                <p className="text-[#051040]/70 font-body text-xs leading-relaxed">{member.qualification}</p>
              </div>
              <div>
                <p className="text-xs font-label font-bold text-[#051040]/60 uppercase tracking-wide mb-0.5">Fun Facts</p>
                <p className="text-[#051040]/70 font-body text-xs leading-relaxed">{member.funFacts}</p>
              </div>
              <div>
                <p className="text-xs font-label font-bold text-[#051040]/60 uppercase tracking-wide mb-0.5">Hobbies</p>
                <p className="text-[#051040]/70 font-body text-xs leading-relaxed">{member.hobbies}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





export default function AboutUs() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">About Us</h1>
          </div>
        </section>

        {/* History */}
        <section id="history" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={WORSHIP_URL} alt="History of HCS" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-5">History</h2>
                <div className="space-y-4 mt-6 text-[#051040]/70 font-body leading-relaxed">
                  <p>His Church School (formerly known as City of Life Academy) was founded in 1994 by Fiona Desfontaine, with the purpose of supplying a Christian School for children from His Church (formerly known as City of Life). The first principal was Mrs. Cheryl van der Merwe. The school has since grown and currently caters for students from Grade 1 to Grade 12.</p>
                  <p>The first learning centre was hosted in what is affectionately known as "The Fish Bowl" — a small single room leading off the foyer. Later the upper floor of His Church was developed into premises for the school.</p>
                  <p>In 1997, the school faced the possibility of closing down due to a decision by the Municipal Council and local community. The school lost a number of students in the process. When it had been officially declared that it was to retain its right to exist, His Church School had to start the slow process of regaining students.</p>
                  <p>In 2004, we received an additional room that was the former computer training centre of the Christian Bible Institute. In January 2005, the school's governing board applied to the Municipal Council for a relaxation of the maximum enrolment number from 60 to 120 students — awarded in May of the same year.</p>
                  <p>In 2015 the SGB made the decision to implement the writing of the NSC-Exams as HCS' exit exam. Currently the entire school, Grades 1 to 12, uses the CAPS-Curriculum.</p>
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-4 my-6 font-body text-sm text-[#051040]/80 italic">
                  "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans for a hope and a future."
                  <cite className="block text-xs font-body not-italic text-[#051040]/50 mt-2">— Jeremiah 29:11 (NIV)</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Vision — sand/beige background per wireframe */}
        <section id="vision" className="py-16 bg-[#EBDAC8] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-6 fade-up">Vision</h2>
            <p className="font-display text-xl font-black text-[#051040] italic mb-6 fade-up">"Our Goal Is To Please Him"</p>
            <p className="text-[#051040]/80 font-body leading-relaxed mb-4 fade-up">
              His Church School desires to establish Godly foundations for each child's life and to educate children, so that they will impact their generation for Eternity. We want to see God clothe the children with His armour and prepare them for war, empowered by the Holy Spirit.
            </p>
            <p className="font-display text-lg font-black text-[#051040] mb-6 fade-up">We desire to raise up:</p>
            <div className="flex flex-wrap justify-center gap-6 fade-up">
              {["Decision Makers", "World Shakers", "Challenge Takers"].map((motto) => (
                <div key={motto} className="px-8 py-4 bg-[#051040] text-white rounded-full">
                  <span className="font-label text-xs font-bold tracking-widest uppercase">{motto}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Mission Statement</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Academic",
                  points: [
                    "Provide quality, individual, modular education with FET following NSC exit route",
                    "Focus on the holistic development of learners",
                    "Encourage learners to achieve their full potential through continuous monitoring and assessment",
                  ],
                },
                {
                  number: "02",
                  title: "Spiritual",
                  points: [
                    "Encourage each child to come to a saving knowledge of Jesus Christ",
                    "Establish learners in the Word of God and train them to appropriate it in their lives",
                    "Assist learners in seeking their purpose and training them in the way of serving",
                  ],
                },
                {
                  number: "03",
                  title: "Character Development",
                  points: [
                    "Develop Godly Character and emphasise learners' individuality",
                    "Train learners to be confident, disciplined leaders who are relevant in society",
                    "Minister love and grace to learners, maintaining discipline in a loving and caring environment",
                  ],
                },
              ].map((pillar) => (
                <div key={pillar.number} className="fade-up bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="font-display text-4xl font-black text-gray-300 mb-3">{pillar.number}</div>
                  <h3 className="font-display text-xl font-black text-[#051040] mb-4">{pillar.title}</h3>
                  <ul className="space-y-3">
                    {pillar.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#051040]/70 font-body text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Organogram */}
        <section id="organogram" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up gold-rule-center">His Church School Organogram</h2>
              <p className="text-[#051040]/50 font-body text-sm mt-4 fade-up">Excellence Through Teamwork</p>
            </div>

            <div className="fade-up flex flex-col items-center">

              {/* ─── Top Tier: SGB → Principal → Management ─── */}
              <div className="bg-[#051040] text-white rounded-xl px-12 py-4 text-center shadow-md">
                <span className="font-display text-base font-black tracking-widest uppercase">SGB</span>
              </div>
              <div className="w-[3px] h-10 bg-[#C9A84C]" />

              <div className="bg-[#051040] text-white rounded-xl px-12 py-4 text-center shadow-md">
                <span className="font-display text-base font-black tracking-widest uppercase">Principal</span>
                <p className="font-body text-sm text-white/70 mt-1">Esther Botha</p>
              </div>

              {/* ═══════════════════════════════════════════════
                  SENIOR MANAGEMENT TIER
                  ═══════════════════════════════════════════════ */}
              <div className="w-[3px] h-10 bg-[#C9A84C]" />
              <div className="bg-[#051040] text-white rounded-xl px-10 py-4 text-center shadow-md">
                <span className="font-display text-base font-black tracking-widest uppercase">Senior Management</span>
              </div>
              <div className="w-[3px] h-8 bg-[#C9A84C]" />

              {/* Senior Management: 3 cards with integrated horizontal bar */}
              <div className="w-full grid grid-cols-3 gap-5 relative">
                {/* Horizontal gold bar — spans from col-1 center to col-3 center */}
                <div className="absolute top-0 h-[3px] bg-[#C9A84C]" style={seniorManagementConnectorStyle} />
                {/* Principal */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-4 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Principal</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">E. Botha</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Academic Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Invigilators</li>
                      <li className="font-body text-[13px] text-[#051040]">Parents</li>
                      <li className="font-body text-[13px] text-[#051040]">Servants (Student Leaders)</li>
                      <li className="font-body text-[13px] text-[#051040]">Female Staff</li>
                    </ul>
                  </div>
                </div>

                {/* Vice-Principal */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-4 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Vice-Principal</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">A. Botha</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Senior Phase Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Disciplinary Team</li>
                      <li className="font-body text-[13px] text-[#051040]">Maintenance Team</li>
                      <li className="font-body text-[13px] text-[#051040]">LSEN-H.O.D.</li>
                      <li className="font-body text-[13px] text-[#051040]">Male Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Learnership Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Badgers Leaders</li>
                    </ul>
                  </div>
                </div>

                {/* Administrator */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-4 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Administrator</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">B. Cawood</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Admin Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Cleaning Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Fundraising Team</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════
                  JUNIOR MANAGEMENT TIER
                  ═══════════════════════════════════════════════ */}
              <div className="w-[3px] h-10 bg-[#C9A84C]" />
              <div className="bg-[#051040] text-white rounded-xl px-10 py-4 text-center shadow-md">
                <span className="font-display text-base font-black tracking-widest uppercase">Junior Management</span>
              </div>
              <div className="w-[3px] h-8 bg-[#C9A84C]" />

              {/* Junior Management: 4 cards with integrated horizontal bar */}
              <div className="w-full grid grid-cols-4 gap-5 relative">
                {/* Horizontal gold bar — spans from col-1 center to col-4 center */}
                <div className="absolute top-0 h-[3px] bg-[#C9A84C]" style={juniorManagementConnectorStyle} />
                {/* Foundation */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-3 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Foundation</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">V. Govender</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Foundation Phase Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Hospitality Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Hospitality Team</li>
                    </ul>
                  </div>
                </div>

                {/* Intermediate */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-3 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Intermediate</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">S. Green</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Intermediate Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">IT-Administrator</li>
                      <li className="font-body text-[13px] text-[#051040]">Logistic Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">Media Team</li>
                    </ul>
                  </div>
                </div>

                {/* FET */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-3 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">FET</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">R. Geldenhuys</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Staff Rep.</li>
                      <li className="font-body text-[13px] text-[#051040]">FET-Staff</li>
                      <li className="font-body text-[13px] text-[#051040]">FET-learners</li>
                      <li className="font-body text-[13px] text-[#051040]">Boys&apos; Discipline</li>
                      <li className="font-body text-[13px] text-[#051040]">Sport Coaches</li>
                      <li className="font-body text-[13px] text-[#051040]">Praise &amp; Worship Team</li>
                    </ul>
                  </div>
                </div>

                {/* Secretary */}
                <div className="flex flex-col items-center">
                  <div className="w-[3px] h-8 bg-[#C9A84C]" />
                  <div className="bg-[#051040] text-white rounded-xl px-3 py-3 text-center shadow-md w-full">
                    <span className="font-display text-sm font-bold tracking-wider uppercase">Secretary</span>
                    <p className="font-body text-xs text-white/70 mt-0.5">T. Botha</p>
                  </div>
                  <div className="w-[3px] h-5 bg-[#C9A84C]" />
                  <div className="bg-white border-2 border-[#051040] rounded-xl p-5 w-full shadow-sm flex-1">
                    <ul className="space-y-1.5 pl-4 list-disc">
                      <li className="font-body text-[13px] text-[#051040]">Students&apos; Rep.</li>
                      <li className="font-body text-[13px] text-[#051040]">Girls&apos; Discipline</li>
                      <li className="font-body text-[13px] text-[#051040]">Counsellors</li>
                      <li className="font-body text-[13px] text-[#051040]">LSEN-Support</li>
                      <li className="font-body text-[13px] text-[#051040]">Marketing Team</li>
                      <li className="font-body text-[13px] text-[#051040]">Classroom Helpers</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Staff Biographies */}
        <section id="staff" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Our Staff</h2>
              <p className="text-[#051040]/50 font-body text-sm mt-2 fade-up">Click on a card to learn more about each staff member</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {staffMembers.map((member, i) => (
                <div key={member.name} className="fade-up" style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
                  <StaffCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies — pill buttons per wireframe */}
        <section id="policies" className="py-16 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">School Policies</h2>
            </div>
            {/* Three pill buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 fade-up">
              {[
                { label: "Admission Policy", href: getPublicAssetHref("Admission-Policy.docx") },
                { label: "Language Policy", href: getPublicAssetHref("Language-Policy.docx") },
                { label: "Code of Conduct", href: getPublicAssetHref("Code-of-Conduct.docx") },
              ].map((policy) => (
                <a
                  key={policy.label}
                  href={policy.href}
                  download
                  className="px-8 py-3 font-label text-xs font-bold rounded-full tracking-widest uppercase transition-colors bg-[#051040] text-white hover:bg-[#051040]/85"
                >
                  {policy.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
