import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";

const HISTORY_URL = getPublicAssetHref("photos/about/about-history.jpg");
const HISTORY_MOBILE_URL = getPublicAssetHref(
  "photos/about/about-history-mobile.jpg"
);
const HERO_URL = getPublicAssetHref("photos/about/about-hero.jpg");

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
  photoTranslateY?: string;
};

type OrganogramGroup = {
  title: string;
  leader: string;
  items: string[];
};

const STAFF_PROFILE_PHOTO_SCALE = 1.5;
const STAFF_PROFILE_PHOTO_POSITION = "48% 18%";

const staffMembers: StaffMember[] = [
  {
    name: "Mrs. Esther Botha",
    role: "Principal",
    position: "FET-Educator: Physical Sciences & Mathematics | SGB Member",
    qualification:
      "Higher Diploma in Education; Further Diploma in Education; B.Ed Honours cum Laude (Leadership in Mathematics and Science Education)",
    funFacts:
      "Member of the school's Praise and Worship Team; Experienced EGD educator; Qualified field and track athletics official; Qualified Level One First-Aider; Experienced KZN hockey coach and manager; Experienced South African Schools hockey manager; Experienced senior marker in Matric Mathematics; Chief invigilator for the NSC exams; Experienced examiner for an external mathematics prelim paper; Curriculum developer for Natural Sciences; Qualified Level One Open Water scuba diver",
    hobbies:
      "Interior decorating; Art; Music; Cooking; Gardening; Poetry; Clothing design; Problem solving (for example Sudoku)",
    initials: "EB",
    photo: getPublicAssetHref("photos/staff/esther-botha.jpg"),
  },
  {
    name: "Mr. André Botha",
    role: "Deputy Principal",
    position:
      "Head of Senior Phase (Gr 7–9) | Afrikaans, Social Sciences, Geography & History | SGB Deputy Chairperson",
    qualification:
      "HDE (4 years); FDE (2 years); Durbanse Onderwyskollege; 37 years teaching experience",
    funFacts:
      "Served 18 years in the SANDF Reserve Force after military conscription; Loves taking young people into nature for survival training and bush craft; Facilitates Grief Share and helps oversee Grief Share and Divorce Care at church",
    hobbies: "Camping; Woodwork; Researching survival techniques and skills",
    initials: "AB",
    photo: getPublicAssetHref("photos/staff/andre-botha.jpg"),
  },
  {
    name: "Mr. Reinhardt Geldenhuys",
    role: "HOD FET Phase",
    position:
      "Geography & Afrikaans (FET) | Head of Department FET | SMT & SGB Member",
    qualification:
      "Bachelor of Education in Afrikaans & Geography; Level One First Aider; Fire Fighter Training",
    funFacts:
      "Member of the His\u00A0Church\u00A0School Praise and Worship Team; Experienced field and track athletics official; Assistant chief invigilator of the NSC exams; Previous coach and manager of the KZNCSSA U13 and U15 six-a-side football teams; Previous North Durban representative on the KZNCSSA committee",
    hobbies: "Singing; Guitar and piano; Squash; Tennis; Rugby; Football",
    initials: "RG",
    photo: getPublicAssetHref("photos/staff/reinhardt-geldenhuys.jpg"),
  },
  {
    name: "Mrs. Brenda Govender",
    role: "Head of Foundation Phase",
    position:
      "Hospitality Gr 10–12 | Life Orientation Gr 10–11 | Grade 3 Register Teacher | Management Member",
    qualification:
      "Higher Diploma in Education; B.Ed Degree; Has taught at HCS from the start of her teaching career",
    funFacts:
      "Focus group leader; Community leader; Sunday school leader; Deacon",
    hobbies:
      "Netball; Walking; Reading; Relaxing on the beach; Organising functions; Entertaining people",
    initials: "BG",
    photo: getPublicAssetHref("photos/staff/brenda-govender.jpg"),
  },
  {
    name: "Mrs. Jo Dyson",
    role: "Head of Intermediate Phase",
    position:
      "Educator: English Gr 8–12 | Intermediate Phase specialist in Mathematics & Social Studies",
    qualification: "HDE (Higher Diploma in Education)",
    funFacts:
      "My family is my everything; Friendships and laughter; Loves the beach, nature, and outdoors; Loves travelling and game reserves; Entertaining and braaing bring joy; Making a difference warms my soul; Loves socialising and talking; Avid Arsenal/Spurs supporter",
    hobbies:
      "Reading; Listening to music; Watching music DVDs; Gardening; Swimming; Playing games like Rummikub; Watching sport; Supporting learner sports events; Outreach",
    initials: "JD",
  },
  {
    name: "Mr. Samuel-Dean Green",
    role: "IT Administrator",
    position: "FET-Phase: CAT, IT & Mathematical Literacy | SMT Member",
    qualification: "NCIT Diploma; MCAD; A+; N+",
    funFacts: "Drummer; His dogs are like his children",
    hobbies: "Coding; Board games; IT repairs",
    initials: "SG",
  },
  {
    name: "Mrs. Laura Pillay",
    role: "Foundation & Intermediate Phase",
    position:
      "Register Teacher | Foundation & Intermediate Phase subject specialist | Media Marketing | School Tuck Shop",
    qualification:
      "Bachelor of Education Early Childhood: Foundation Phase; 2 years Theology at CBI; 1 year Business Management",
    funFacts:
      "Enjoys capturing moments to remember for a lifetime; Strongly believes in servanthood; Thrives on creativity and making something out of nothing; Motto: work smart and not hard; Employed by HCS since 2013; Loves watching learners grow in Godly character and self-confidence; Teacher-Mom to her learners",
    hobbies:
      "Events planning; Graphic and digital design; Art; Crafts; Scrapbooking; Spending quality time with my husband",
    initials: "LP",
    photo: getPublicAssetHref("photos/staff/laura-pillay.jpg"),
  },
  {
    name: "Miss. Timón Botha",
    role: "SGB Secretary",
    position:
      "Life Science, Life Orientation & Mathematical Literacy (FET) | General Sciences (Senior Phase) | Register Teacher | Social Media & Marketing",
    qualification:
      "BSc Behavioural Genetics; PGCE Senior Phase & FET; Level One First-Aider; Fire-fighting Certificate",
    funFacts:
      "God, family, and community are extremely important to me; Member of the HCS and church Praise and Worship Team; Would eat sushi, popcorn, and ice cream for every meal; Very jovial and a jokester; Was an avid swimmer, athlete, soccer and hockey player; Played provincial hockey from age 10 until tearing my ACL in 2021",
    hobbies:
      "Team sports, especially hockey and soccer; Water sports; Outdoor activities; Camping; Survival; Reading; Sudoku; Mind puzzle games",
    initials: "TB",
    photo: getPublicAssetHref("photos/staff/timon-botha.jpg"),
  },
  {
    name: "Mrs. Emma Nyika",
    role: "EMS, Business Studies & Accounting",
    position: "Educator: EMS, Business Studies and Accounting",
    qualification:
      "B.Com Honours in Accounting; B.Com Accounting degree; Diploma in Education specialising in infant education",
    funFacts:
      "Loves going to church; Has a keen interest in fashion; Loves working with children",
    hobbies: "Sewing; Designing my own clothes; Travelling; Coaching netball",
    initials: "EN",
    photo: getPublicAssetHref("photos/staff/emma-nyika.jpg"),
  },
  {
    name: "Miss. Jade Banks",
    role: "Art, Drama & Life Orientation",
    position:
      "Art & Drama Gr 1–9 | Life Orientation & Religious Studies | Register Teacher",
    qualification: "10 years teaching experience",
    funFacts:
      "Nickname: Miss Sparkles; Enjoys the beach, playing 30 Seconds, fashion, and beauty; Leopard print and flowers match my bubbly personality, and coffee adds to my sparkle; Loves young girls' and women's ministry",
    hobbies:
      "Interior design; Make-up tutorials; Nails and beauty; Image consulting; Designing creative social media content; Walks; Singing and open mic nights; Travelling; Discovering new places and foods",
    initials: "JB",
    photo: getPublicAssetHref("photos/staff/jade-banks.jpg"),
  },
  {
    name: "Mr. Lawrence Mda",
    role: "Physical Education",
    position:
      "PE Gr 1–12 | Intermediate Phase Subject Specialist | Register Teacher",
    qualification:
      "Started out as a teacher's assistant; currently enrolled in the school's Learnership Programme",
    funFacts:
      "I love food; Ballroom and Latin dancer; Have won numerous awards",
    hobbies: "Chess; Dancing, dancing, and dancing!",
    initials: "LM",
    photo: getPublicAssetHref("photos/staff/lawrence-mda.jpg"),
  },
  {
    name: "Mrs. Linda Murray",
    role: "Gr 4 & 5 Educator",
    position: "Afrikaans, English, Sciences & Mathematics Specialist",
    qualification:
      "National Diploma in Clinical Pathology; National Diploma in Human Parasitology; National Diploma in Microbiology",
    funFacts:
      "Chocolate lover; Masters in swimming; Qualified athletics chip maker; Game reserve Botswana off-road camper; Experienced KZN hockey coach and manager",
    hobbies:
      "Art; Music; Cooking; Gardening; Fine art painting; Sudoku; Crossword puzzles",
    initials: "LMu",
    photo: getPublicAssetHref("photos/staff/linda-murray.jpg"),
  },
  {
    name: "Mrs. Amanda Perumal",
    role: "Grade 1 Teacher",
    position: "Grade 1 Teacher | Intermediate Phase Subject Specialist",
    qualification:
      "Bachelor of Education: Foundation Phase; Employed by HCS from the start of my teaching career; Taught English in Denmark for 18 months; Formerly worked for 2.5 years as a trainee teacher and 3 years as a teacher's assistant",
    funFacts:
      "Would like to bungee jump one day; Shares that bucket-list dream with her daughter; Not a fan of milk or milk-based products; Loves baking in silence when everyone is asleep as her me time",
    hobbies: "Baking; Reading; Travelling",
    initials: "AP",
    photo: getPublicAssetHref("photos/staff/amanda-perumal.jpg"),
  },
  {
    name: "Mrs. Anita Warren",
    role: "Foundation Phase",
    position:
      "Foundation Phase Educator | Afrikaans & Social Studies (Intermediate Phase)",
    qualification:
      "NPDE qualification; Experience in individual modular education; Experience in private schools offering the CAPS curriculum",
    funFacts:
      "Did scuba diving when I was younger and still love learning about fish; Favourite fish is the clown fish because of its amazing way of surviving and hiding from predators",
    hobbies: "Crafting; Gardening",
    initials: "AW",
    photo: getPublicAssetHref("photos/staff/anita-warren.jpg"),
  },
  {
    name: "Mrs. Dalene White",
    role: "Personal Assistant",
    position: "Personal Assistant to Management",
    qualification:
      "Diploma in Management Accounting and Finance (Varsity College); Certificate in Financial Accounting (Varsity College); Certificate in Executive Secretarial Studies with Distinction (Varsity College); Certificate in Bookkeeping with Distinction (Varsity College)",
    funFacts:
      "HCS graduate; Working at HCS since 2007; Won Rebecca Simpson Typing Trophy (fastest typist)",
    hobbies:
      "Spending time in nature and being outdoors; Swimming; Camping; Hiking; Visiting the Drakensberg; Going to the beach",
    initials: "DW",
    photo: getPublicAssetHref("photos/staff/dalene-white.jpg"),
  },
  {
    name: "Mrs. Beryl Cawood",
    role: "Administrator",
    position: "Administrator since 2007",
    qualification:
      "Bookkeeping Course; 35 years' experience as a bookkeeper in the legal profession",
    funFacts:
      "Learned to ride a motorbike at 15; Once rolled a car going down Fields' Hill; Won a hula-hoop competition at age 9; People who know me well think I am quite funny",
    hobbies: "Knitting; Crocheting; Line-dancing; Reading; Cooking",
    initials: "BC",
    photo: getPublicAssetHref("photos/staff/beryl-cawood.jpg"),
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

const CARD_HEIGHT = 408;
const STAFF_CARD_FRONT_BACKGROUND =
  "linear-gradient(180deg, #20347D 0%, #152867 48%, #0A1B4F 100%)";
const seniorManagementGroups: OrganogramGroup[] = [
  {
    title: "Principal",
    leader: "E. Botha",
    items: [
      "Staff",
      "Academic Staff",
      "Invigilators",
      "Parents",
      "Servants (Student Leaders)",
      "Female Staff",
    ],
  },
  {
    title: "Vice-Principal",
    leader: "A. Botha",
    items: [
      "Senior Phase Staff",
      "Disciplinary Team",
      "Maintenance Team",
      "LSEN-H.O.D.",
      "Male Staff",
      "Learnership Staff",
      "Badgers Leaders",
    ],
  },
  {
    title: "Administrator",
    leader: "B. Cawood",
    items: ["Admin Staff", "Cleaning Staff", "Fundraising Team"],
  },
];
const juniorManagementGroups: OrganogramGroup[] = [
  {
    title: "Foundation",
    leader: "V. Govender",
    items: ["Foundation Phase Staff", "Hospitality Staff", "Hospitality Team"],
  },
  {
    title: "Intermediate",
    leader: "S. Green",
    items: [
      "Intermediate Staff",
      "IT-Administrator",
      "Logistic Staff",
      "Media Team",
    ],
  },
  {
    title: "FET",
    leader: "R. Geldenhuys",
    items: [
      "Staff Rep.",
      "FET-Staff",
      "FET-learners",
      "Boys' Discipline",
      "Sport Coaches",
      "Praise & Worship Team",
    ],
  },
  {
    title: "Secretary",
    leader: "T. Botha",
    items: [
      "Students' Rep.",
      "Girls' Discipline",
      "Counsellors",
      "LSEN-Support",
      "Marketing Team",
      "Classroom Helpers",
    ],
  },
];

function preventWidow(text: string) {
  return text.replace(/\s+([^\s]+)\s+([^\s]+)\s*$/, " $1\u00A0$2");
}

function splitStaffBioItems(text: string) {
  return text
    .split(";")
    .map(item => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function StaffBioSection({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <p className="mb-1 text-[11px] font-label font-bold uppercase tracking-[0.12em] text-[#C9A84C] md:text-xs">
        {title}
      </p>
      <ul className="space-y-1">
        {items.map(item => (
          <li
            key={item}
            className="flex gap-1.5 font-body text-[0.82rem] leading-[1.45] text-[#051040]/75"
          >
            <span className="shrink-0 text-[#C9A84C]">&#8226;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrganogramTeamCard({ group }: { group: OrganogramGroup }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="rounded-xl bg-[#051040] px-4 py-3 text-center text-white">
        <h3 className="font-display text-base font-black uppercase tracking-[0.12em]">
          {group.title}
        </h3>
        <p className="mt-1 font-body text-sm text-white/72">{group.leader}</p>
      </div>
      <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
        {group.items.map(item => (
          <li
            key={item}
            className="flex items-start gap-3 font-body text-[0.95rem] leading-relaxed text-[#051040]/72"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function OrganogramDesktopCard({
  title,
  leader,
  items,
  compact = false,
}: {
  title: string;
  leader: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <article className="flex h-full w-full flex-1 self-stretch flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div
        className={
          compact
            ? "bg-[#051040] px-3 py-3 text-center text-white"
            : "bg-[#051040] px-4 py-3 text-center text-white"
        }
      >
        <span className="font-display text-sm font-bold tracking-[0.12em] uppercase">
          {title}
        </span>
        <p className="mt-0.5 font-body text-sm text-white/70">{leader}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-3 p-5">
        {items.map(item => (
          <li
            key={item}
            className="flex items-start gap-3 font-body text-sm leading-relaxed text-[#051040]/70"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function StaffCard({
  member,
  onOpen,
}: {
  member: StaffMember;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-transparent p-0 text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
      aria-label={`Open full bio for ${member.name}`}
      style={{ height: `${CARD_HEIGHT}px` }}
    >
      <div
        className="absolute inset-0"
        style={{ background: STAFF_CARD_FRONT_BACKGROUND }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)]" />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-start px-5 pb-6 pt-6 text-center sm:px-6 md:px-6 md:pb-7 md:pt-7 lg:px-7">
        <div className="mb-2.5 flex h-20 w-20 shrink-0 aspect-square items-center justify-center overflow-hidden rounded-full border-2 border-[#C9A84C] bg-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.16)] md:h-24 md:w-24 lg:h-20 lg:w-20">
          {member.photo ? (
            <img
              src={member.photo}
              alt={member.name}
              className="h-full w-full origin-center object-cover"
              style={{
                objectPosition:
                  member.photoPosition ?? STAFF_PROFILE_PHOTO_POSITION,
                transformOrigin:
                  member.photoPosition ?? STAFF_PROFILE_PHOTO_POSITION,
                transform: `translateY(${member.photoTranslateY ?? "0%"}) scale(${member.photoScale ?? STAFF_PROFILE_PHOTO_SCALE})`,
              }}
              loading="lazy"
            />
          ) : (
            <span className="font-display text-2xl font-black text-[#C9A84C]">
              {member.initials}
            </span>
          )}
        </div>
        <h3 className="mb-1.5 flex min-h-[2.75rem] max-w-[16rem] items-end justify-center font-display text-lg font-black leading-tight text-white sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[15rem]">
          {member.name}
        </h3>
        <p className="flex min-h-[2rem] max-w-[15rem] items-center justify-center font-label text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D4B25A] md:max-w-[17rem] md:text-xs lg:max-w-[15rem]">
          {member.role}
        </p>
        <p className="mt-2 max-w-[16.5rem] font-body text-sm leading-[1.58] text-[#F4EFE6]/72 sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[15rem]">
          {preventWidow(member.position)}
        </p>
      </div>
      <div className="relative z-10 flex min-h-[52px] shrink-0 items-start justify-center border-t border-white/12 px-4 pt-3 text-center">
        <p className="font-body text-sm leading-[1.1] text-white/44 transition-colors duration-200 group-hover:text-white/56">
          Tap or press to open the full bio
        </p>
      </div>
    </button>
  );
}

function StaffBioModal({
  member,
  onClose,
}: {
  member: StaffMember;
  onClose: () => void;
}) {
  const qualificationItems = splitStaffBioItems(member.qualification);
  const funFactItems = splitStaffBioItems(member.funFacts);
  const hobbyItems = splitStaffBioItems(member.hobbies);
  const modalTitleId = `staff-bio-title-${member.initials.toLowerCase()}`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#051040]/34 p-4 backdrop-blur-[8px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalTitleId}
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-[0_28px_80px_rgba(5,16,64,0.22)] sm:max-h-[calc(100vh-3rem)]"
        onClick={event => event.stopPropagation()}
      >
        <div className="relative overflow-hidden border-b border-gray-200 bg-white px-5 pb-5 pt-6 text-[#051040] sm:px-7 sm:pb-6 sm:pt-7">
          <button
            type="button"
            onClick={event => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#051040]/12 bg-white text-[#051040] shadow-sm transition-colors hover:bg-[#F7F7FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/55"
            aria-label={`Close full bio for ${member.name}`}
            autoFocus
          >
            <X size={18} />
          </button>
          <div className="relative z-10 flex flex-col items-start gap-4 pr-12 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#C9A84C] bg-white shadow-[0_10px_20px_rgba(5,16,64,0.12)] sm:h-24 sm:w-24">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full origin-center object-cover"
                  style={{
                    objectPosition:
                      member.photoPosition ?? STAFF_PROFILE_PHOTO_POSITION,
                    transformOrigin:
                      member.photoPosition ?? STAFF_PROFILE_PHOTO_POSITION,
                    transform: `translateY(${member.photoTranslateY ?? "0%"}) scale(${member.photoScale ?? STAFF_PROFILE_PHOTO_SCALE})`,
                  }}
                  loading="lazy"
                />
              ) : (
                <span className="font-display text-2xl font-black text-[#C9A84C]">
                  {member.initials}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="mb-2 font-label text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9A84C] md:text-xs">
                Meet the Team
              </p>
              <h3
                id={modalTitleId}
                className="font-display text-[1.75rem] font-black leading-tight text-[#051040] sm:text-[2rem]"
              >
                {member.name}
              </h3>
              <p className="mt-2 font-label text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C9A84C] md:text-xs">
                {member.role}
              </p>
              <p className="mt-3 max-w-2xl font-body text-[0.96rem] leading-relaxed text-[#051040]/68">
                {preventWidow(member.position)}
              </p>
            </div>
          </div>
        </div>

        <div className="hcs-scroll-pane min-h-0 flex-1 overflow-y-auto px-5 pb-5 pt-5 sm:px-7 sm:pb-6">
          <div className="space-y-5">
            <StaffBioSection
              title="Qualifications & Experience"
              items={qualificationItems}
            />
            <StaffBioSection title="Fun Facts" items={funFactItems} />
            <StaffBioSection title="Hobbies" items={hobbyItems} />
          </div>
        </div>

        <div className="border-t border-gray-200 px-5 py-3 text-center sm:px-7">
          <p className="font-body text-[0.88rem] leading-[1.35] text-[#051040]/50">
            Scroll to read more. Tap outside the panel or use the close button
            to return.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutUs() {
  const pageRef = useScrollAnimation();
  const [activeStaffIndex, setActiveStaffIndex] = useState<number | null>(null);
  const staffModalCloseGuardRef = useRef(0);
  const [openMobileOrganogramSections, setOpenMobileOrganogramSections] =
    useState({
      senior: true,
      junior: true,
    });

  const openStaffModal = (index: number) => {
    if (Date.now() < staffModalCloseGuardRef.current) {
      return;
    }

    setActiveStaffIndex(index);
  };

  const closeStaffModal = () => {
    staffModalCloseGuardRef.current = Date.now() + 350;
    setActiveStaffIndex(null);
  };

  useEffect(() => {
    if (activeStaffIndex === null) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeStaffModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeStaffIndex]);

  return (
    <Layout>
      <div ref={pageRef}>
        {/* Hero */}
        <PageHero
          title="About Us"
          imageUrl={HERO_URL}
          imagePosition={{
            mobile: "center 30%",
            tablet: "center 28%",
            desktop: "center 26%",
          }}
          imageSize={{
            mobile: "980px",
            tablet: "1320px",
            desktop: "1720px",
          }}
        />

        {/* History */}
        <section id="history" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
              <div className="fade-up">
                <div className="hcs-editorial-image hcs-history-image">
                  <picture>
                    <source
                      media="(max-width: 1535px)"
                      srcSet={HISTORY_MOBILE_URL}
                    />
                    <img
                      src={HISTORY_URL}
                      alt="History of HCS"
                      className="object-[50%_18%] md:object-[50%_14%] lg:object-center"
                    />
                  </picture>
                </div>
              </div>
              <div className="fade-up hcs-split-copy">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/45 lg:text-left">
                  Since 1994
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  History
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="space-y-4 text-center text-[#051040]/70 font-body leading-relaxed lg:text-left">
                  <p>
                    His&nbsp;Church&nbsp;School (formerly known as City of Life Academy)
                    was founded in 1994 by Fiona Desfontaine to provide a
                    Christian school for children from His Church (formerly
                    known as City of Life). The first principal was Mrs. Cheryl
                    van der Merwe. The school has since grown and currently
                    caters for learners from Grade 1 to Grade 12.
                  </p>
                  <p>
                    The first learning centre was hosted in what is
                    affectionately known as "The Fish Bowl", a small single room
                    leading off the foyer. Later the upper floor of His Church
                    was developed into premises for the school.
                  </p>
                  <p>
                    In 1997, the school faced the possibility of closing down
                    due to a decision by the Municipal Council and local
                    community. The school lost a number of students in the
                    process. When it had been officially declared that it was to
                    retain its right to exist, His&nbsp;Church&nbsp;School had to start
                    the slow process of regaining students.
                  </p>
                  <p>
                    In 2004, we received an additional room that was the former
                    computer training centre of the Christian Bible Institute.
                    In January 2005, the school's governing board applied to the
                    Municipal Council for a relaxation of the maximum enrolment
                    number from 60 to 120 students, awarded in May of the same
                    year.
                  </p>
                  <p>
                    In 2015 the SGB made the decision to implement the writing
                    of the NSC exams as HCS&apos; exit exam. Currently the
                    entire school, Grades 1 to 12, uses the CAPS curriculum.
                  </p>
                </div>
                <blockquote className="hcs-pullquote">
                  "For I know the plans I have for you," declares the Lord,
                  "plans to prosper you and not to harm you, plans for a hope
                  and a future."
                  <cite>Jeremiah 29:11 (NIV)</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section id="vision" className="py-20 bg-[#F1E6D6] scroll-mt-20">
          <div className="max-w-4xl mx-auto hcs-shell text-center">
            <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.12em] uppercase mb-3 fade-up">
              Our Purpose
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2 fade-up">
              Vision
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-6 fade-up hcs-divider" />
            <p className="font-display text-2xl md:text-3xl font-semibold italic leading-[1.2] text-[#051040] mb-6 fade-up flex items-center justify-center gap-0">
              <span className="font-display text-[1.2em] font-black leading-none text-[#051040] -mr-[0.03em]">
                {"\u201C"}
              </span>
              <span>Our Goal Is To Please Him</span>
              <span className="font-display text-[1.2em] font-black leading-none text-[#051040] -ml-[0.08em]">
                {"\u201D"}
              </span>
            </p>
            <div className="mx-auto w-full max-w-none space-y-4 text-center text-[#051040]/70 font-body leading-relaxed fade-up">
              <p>
                His&nbsp;Church&nbsp;School desires to establish Godly foundations for
                each child's life and to educate children so that they will
                impact their generation for Eternity.
              </p>
              <p>We desire to raise:</p>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-y-4 gap-x-5 mt-4 fade-up">
              <span className="font-display text-xl font-black leading-[1.2] text-[#051040]">
                Decision Makers
              </span>
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0"
              />
              <span className="font-display text-xl font-black leading-[1.2] text-[#051040]">
                World Shakers
              </span>
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0"
              />
              <span className="font-display text-xl font-black leading-[1.2] text-[#051040]">
                Challenge Takers
              </span>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="mission" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.12em] uppercase mb-3 fade-up">
                Our Calling
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Mission Statement
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-5 md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
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
              ].map(pillar => (
                <div
                  key={pillar.number}
                  className="fade-up bg-white rounded-2xl border border-gray-200 shadow-sm p-7 hover:shadow-md transition-shadow"
                >
                  <div className="font-display text-4xl font-black text-gray-300 mb-3">
                    {pillar.number}
                  </div>
                  <h3 className="font-display text-xl font-black text-[#051040] mb-2">
                    {pillar.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
                  <ul className="space-y-3">
                    {pillar.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 font-body text-[0.98rem] leading-[1.72] text-[#051040]/70 sm:text-[1rem]"
                      >
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
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up gold-rule-center">
                His&nbsp;Church&nbsp;School Organogram
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-body text-[0.98rem] leading-[1.68] text-[#051040]/60 fade-up sm:text-[1rem]">
                Excellence Through Teamwork
              </p>
            </div>

            <div className="mx-auto w-full max-w-[42rem] space-y-5 md:hidden fade-up">
              <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="font-label text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#051040]/55">
                  Governance
                </p>
                <div className="mt-4 rounded-xl bg-[#051040] px-5 py-4 text-white">
                  <p className="font-display text-base font-black uppercase tracking-[0.12em]">
                    SGB
                  </p>
                </div>
                <div className="mx-auto h-8 w-[3px] bg-[#C9A84C]" />
                <div className="rounded-xl bg-[#051040] px-5 py-4 text-white">
                  <p className="font-display text-base font-black uppercase tracking-[0.12em]">
                    Principal
                  </p>
                  <p className="mt-1 font-body text-sm text-white/72">
                    Esther Botha
                  </p>
                </div>
              </div>

              {[
                {
                  key: "senior" as const,
                  title: "Senior Management",
                  groups: seniorManagementGroups,
                },
                {
                  key: "junior" as const,
                  title: "Junior Management",
                  groups: juniorManagementGroups,
                },
              ].map(section => {
                const isOpen = openMobileOrganogramSections[section.key];
                const panelId = `organogram-mobile-${section.key}`;
                const buttonId = `${panelId}-button`;

                return (
                  <div
                    key={section.key}
                    className="w-full rounded-[1.65rem] border border-gray-200 bg-white p-4 shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileOrganogramSections(current => ({
                          ...current,
                          [section.key]: !current[section.key],
                        }))
                      }
                      className="relative flex w-full items-center justify-center rounded-2xl bg-[#051040] px-5 py-4 text-center text-white shadow-sm"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      id={buttonId}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${section.title}`}
                    >
                      <span className="font-display text-base font-black uppercase tracking-[0.12em]">
                        {section.title}
                      </span>
                      <span
                        className={`absolute right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/8 text-[#C9A84C] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="mt-4 space-y-4"
                      >
                        {section.groups.map(group => (
                          <OrganogramTeamCard key={group.title} group={group} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              className="hidden fade-up overflow-x-auto -mx-4 px-4 py-2 md:block"
              tabIndex={0}
              aria-label="His Church School organogram"
            >
              <div className="flex flex-col items-center min-w-[340px]">
                {/* ─── Top Tier: SGB → Principal → Management ─── */}
                <div className="bg-[#051040] text-white rounded-xl px-12 py-4 text-center shadow-md">
                  <span className="font-display text-base font-black tracking-widest uppercase">
                    SGB
                  </span>
                </div>
                <div className="w-[3px] h-10 bg-[#C9A84C]" />

                <div className="bg-[#051040] text-white rounded-xl px-12 py-4 text-center shadow-md">
                  <span className="font-display text-base font-black tracking-widest uppercase">
                    Principal
                  </span>
                  <p className="font-body text-sm text-white/70 mt-1">
                    Esther Botha
                  </p>
                </div>

                {/* ═══════════════════════════════════════════════
                  SENIOR MANAGEMENT TIER
                  ═══════════════════════════════════════════════ */}
                <div className="w-[3px] h-10 bg-[#C9A84C]" />
                <div className="bg-[#051040] text-white rounded-xl px-10 py-4 text-center shadow-md">
                  <span className="font-display text-base font-black tracking-widest uppercase">
                    Senior Management
                  </span>
                </div>
                <div className="w-[3px] h-8 bg-[#C9A84C]" />

                {/* Senior Management: 3 cards with integrated horizontal bar */}
                <div className="w-full grid grid-cols-3 gap-5 relative">
                  {/* Horizontal gold bar - spans from col-1 center to col-3 center */}
                  <div
                    className="absolute top-0 h-[3px] bg-[#C9A84C]"
                    style={seniorManagementConnectorStyle}
                  />
                  {/* Principal */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      title="Principal"
                      leader="E. Botha"
                      items={[
                        "Staff",
                        "Academic Staff",
                        "Invigilators",
                        "Parents",
                        "Servants (Student Leaders)",
                        "Female Staff",
                      ]}
                    />
                  </div>

                  {/* Vice-Principal */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      title="Vice-Principal"
                      leader="A. Botha"
                      items={[
                        "Senior Phase Staff",
                        "Disciplinary Team",
                        "Maintenance Team",
                        "LSEN-H.O.D.",
                        "Male Staff",
                        "Learnership Staff",
                        "Badgers Leaders",
                      ]}
                    />
                  </div>

                  {/* Administrator */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      title="Administrator"
                      leader="B. Cawood"
                      items={[
                        "Admin Staff",
                        "Cleaning Staff",
                        "Fundraising Team",
                      ]}
                    />
                  </div>
                </div>

                {/* ═══════════════════════════════════════════════
                  JUNIOR MANAGEMENT TIER
                  ═══════════════════════════════════════════════ */}
                <div className="w-[3px] h-10 bg-[#C9A84C]" />
                <div className="bg-[#051040] text-white rounded-xl px-10 py-4 text-center shadow-md">
                  <span className="font-display text-base font-black tracking-widest uppercase">
                    Junior Management
                  </span>
                </div>
                <div className="w-[3px] h-8 bg-[#C9A84C]" />

                {/* Junior Management: 4 cards with integrated horizontal bar */}
                <div className="w-full grid grid-cols-4 gap-5 relative">
                  {/* Horizontal gold bar - spans from col-1 center to col-4 center */}
                  <div
                    className="absolute top-0 h-[3px] bg-[#C9A84C]"
                    style={juniorManagementConnectorStyle}
                  />
                  {/* Foundation */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      compact
                      title="Foundation"
                      leader="V. Govender"
                      items={[
                        "Foundation Phase Staff",
                        "Hospitality Staff",
                        "Hospitality Team",
                      ]}
                    />
                  </div>

                  {/* Intermediate */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      compact
                      title="Intermediate"
                      leader="S. Green"
                      items={[
                        "Intermediate Staff",
                        "IT-Administrator",
                        "Logistic Staff",
                        "Media Team",
                      ]}
                    />
                  </div>

                  {/* FET */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      compact
                      title="FET"
                      leader="R. Geldenhuys"
                      items={[
                        "Staff Rep.",
                        "FET-Staff",
                        "FET-learners",
                        "Boys' Discipline",
                        "Sport Coaches",
                        "Praise & Worship Team",
                      ]}
                    />
                  </div>

                  {/* Secretary */}
                  <div className="flex h-full w-full flex-col items-center">
                    <div className="w-[3px] h-8 bg-[#C9A84C]" />
                    <OrganogramDesktopCard
                      compact
                      title="Secretary"
                      leader="T. Botha"
                      items={[
                        "Students' Rep.",
                        "Girls' Discipline",
                        "Counsellors",
                        "LSEN-Support",
                        "Marketing Team",
                        "Classroom Helpers",
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Staff Biographies */}
        <section id="staff" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.12em] uppercase mb-3 fade-up">
                Meet the Team
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Our Staff
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-3 fade-up hcs-divider" />
              <p className="mx-auto max-w-2xl font-body text-[0.98rem] leading-[1.68] text-[#051040]/60 fade-up sm:text-[1rem]">
                Tap or press a card to learn more about each staff member
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {staffMembers.map((member, i) => (
                <div
                  key={member.name}
                  className="fade-up"
                  style={{ transitionDelay: `${(i % 4) * 80}ms` }}
                >
                  <StaffCard member={member} onOpen={() => openStaffModal(i)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {activeStaffIndex !== null && (
          <StaffBioModal
            member={staffMembers[activeStaffIndex]}
            onClose={closeStaffModal}
          />
        )}
      </div>
    </Layout>
  );
}
