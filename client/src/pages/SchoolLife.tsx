/* =============================================================
   HCS School Life Page
   Design: "Crest & Community" — Warm, friendly, Poppins headings
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { getPageHref, getPublicAssetHref } from "@/lib/sitePaths";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Users, Flame, Heart } from "lucide-react";

const SPORT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_sport-ZXz2kRCQJivyVVXye2Jj9C.webp";
const WORSHIP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";
const CALENDAR_FEED_PATH = "/hcs-sporting-events-2025.ics";

const sportsByTerm = [
  {
    term: "Term 1",
    sports: [
      {
        name: "Swimming",
        desc: "Open to boys and girls between the ages of 6 and 19. Disciplines include freestyle, backstroke, breaststroke, butterfly, and individual medley. Swimmers can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
      },
      {
        name: "Mini Cricket",
        desc: "Open to boys and girls between the ages of 6 and 9. Two teams (U8 and U10) participate in the KZNCSSA Mini Cricket Festival.",
      },
      {
        name: "Cricket",
        desc: "Open to boys between the ages of 10 and 19. Opportunity to participate in the KZNCSSA Provincial Cricket Festival with prospects of selection for KZNCSSA Teams.",
      },
    ],
  },
  {
    term: "Term 2",
    sports: [
      {
        name: "Mini Soccer",
        desc: "Open to boys and girls under the age of 9. A team participates in the Under 9 KZNCSSA Provincial Winter Sports.",
      },
      {
        name: "Mini Netball",
        desc: "Open to girls under the age of 9. A team participates in the Under 9 KZNCSSA Provincial Winter Sports.",
      },
      {
        name: "Netball",
        desc: "Girls between the ages of 10 and 19, if selected, take part in the KZNCSSA Provincial Winter Sports.",
      },
      {
        name: "Soccer",
        desc: "Boys and girls between the ages of 10 and 19 have separate teams and, if selected, take part in the KZNCSSA Provincial Winter Sports.",
      },
      {
        name: "Cross Country",
        desc: "Age groups Under 6 to Under 19. Runners can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
      },
    ],
  },
  {
    term: "Term 3",
    sports: [
      {
        name: "Athletics",
        desc: "Track and field disciplines including sprints, relays, long jump, high jump, shot put, javelin, and discus. Age groups Under 7 to Under 19. Athletes can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
      },
    ],
  },
  {
    term: "Term 4",
    sports: [
      {
        name: "Chess",
        desc: "Offered throughout the year with multiple online events. Contestants can participate in the KZNCSSA Provincial Chess Event and qualify for the SACSSA National Chess Event.",
      },
      {
        name: "Table Tennis",
        desc: "Open to boys and girls between the ages of 6 and 19. Athletes can participate in the KZNCSSA Provincial Table Tennis, an individual-based trial for KZNCSSA Team selection.",
      },
    ],
  },
];

const fixturesByMonth = [
  { month: "Jan", events: ["School opens", "Sport registrations open"] },
  { month: "Feb", events: ["3rd — Inter-school Zonal Swimming Gala U6-U19", "17th — KZNCSSA Provincial Swimming Gala"] },
  { month: "Mar", events: ["2nd — SACSSA National Swimming Gala", "9th — KZNCSSA Mini Cricket Festival", "16th — Provincial Cricket Festival"] },
  { month: "Apr", events: ["Winter Sports begin", "19th — KZNCSSA Provincial Winter Sports U15, U17, U19"] },
  { month: "May", events: ["3rd — KZNCSSA Provincial Winter Sports U11, U13", "11th — U9 Winter Sports", "25th — Cross Country U6-U19"] },
  { month: "Jun", events: ["8th — KZNCSSA Provincial Cross Country", "Mid-year exams"] },
  { month: "Jul", events: ["20th — SACSSA National Cross Country", "School holidays"] },
  { month: "Aug", events: ["17th — Inter-school Zonal Athletics", "30/31st — KZNCSSA Provincial Athletics (PMB)"] },
  { month: "Sep", events: ["14th — KZNCSSA Provincial Chess & Speedcubing", "20/21st — SACSSA National Athletics (PMB)"] },
  { month: "Oct", events: ["12th — KZNCSSA Provincial Table Tennis", "26th — SACSSA National Chess"] },
  { month: "Nov", events: ["2nd — SACSSA National Table Tennis", "16th — KZNCSSA Sport Awards", "Year-end exams"] },
  { month: "Dec", events: ["Prize-giving ceremony", "School closes"] },
];

function splitFixtureEvent(event: string) {
  const [label, ...rest] = event.split(" — ");
  if (rest.length === 0) {
    return { detail: label };
  }

  return { label, detail: rest.join(" — ") };
}

export default function SchoolLife() {
  const pageRef = useScrollAnimation();
  const [calendarFeedCopied, setCalendarFeedCopied] = useState(false);

  const handleCopyCalendarFeed = async () => {
    const calendarFeedUrl = `${window.location.origin}${getPublicAssetHref(CALENDAR_FEED_PATH)}`;

    try {
      await navigator.clipboard.writeText(calendarFeedUrl);
      setCalendarFeedCopied(true);
      window.setTimeout(() => setCalendarFeedCopied(false), 2500);
    } catch {
      window.prompt("Copy this Google Calendar feed URL:", calendarFeedUrl);
    }
  };

  return (
    <Layout>
      <div ref={pageRef}>
        {/* Hero */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SPORT_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">School Life</h1>
          </div>
        </section>

        {/* Sport Intro */}
        <section id="sport" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={SPORT_URL} alt="HCS Athletics" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-5">Sport at His Church School</h2>
                <div className="space-y-4 mt-6 text-[#051040]/70 font-body leading-relaxed">
                  <p>HIS CHURCH SCHOOL encourages all students to participate in school sports as it not only promotes essential values such as teamwork, leadership, discipline, resilience, sportsmanship, physical fitness, time management, and respect for authority, but also instils Biblical values such as compassion, humility, integrity, and stewardship.</p>
                  <p>Integrating these values into sports activities fosters the holistic development of students' character, guiding them to adopt Biblical values both on and off the sport field.</p>
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-4 my-6 font-body text-sm text-[#051040]/80 italic">
                  <p>SACSSA affiliated: South African Christian Schools Sports Association.</p>
                  <p className="mt-3">KZNCSSA affiliated: KwaZulu-Natal Christian Schools Sports Association, North Durban Zone.</p>
                  <cite className="block text-xs font-body not-italic text-[#051040]/50 mt-2">Sport Affiliations</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Sports by Term */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Sports by Term</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sportsByTerm.map((termGroup, i) => (
                <div key={termGroup.term} className="bg-white rounded-xl shadow-sm overflow-hidden fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="bg-[#051040] px-6 py-4">
                    <h3 className="font-label text-sm tracking-widest text-[#C9A84C] uppercase font-bold">{termGroup.term}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {termGroup.sports.map((sport) => (
                      <div key={sport.name} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                        <div>
                          <h4 className="font-display text-base font-black text-[#051040]">{sport.name}</h4>
                          <p className="text-[#051040]/60 font-body text-sm leading-relaxed mt-1">{sport.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fixtures Calendar — 12-month grid per wireframe */}
        <section className="py-16 bg-[#051040]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-black text-white fade-up">2025 Fixtures & Sporting Events</h2>
              <p className="text-white/50 font-body text-sm mt-2 fade-up">Dates subject to change — contact the school secretary for updates</p>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4 mb-8">
              <div className="max-w-3xl fade-up">
                <p className="text-white/75 font-body text-sm md:text-base leading-relaxed">
                  Parents can subscribe to the dated sporting fixtures in Google Calendar so they sync to phones connected to the same Google account.
                </p>
                <p className="text-white/45 font-body text-xs md:text-sm mt-3">
                  Use Google Calendar&apos;s Add calendar &gt; From URL option with the copied feed URL. The live website URL is required for syncing.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 fade-up">
                <button
                  type="button"
                  onClick={handleCopyCalendarFeed}
                  className="px-5 py-3 rounded-full border border-white/15 bg-white/8 text-white font-label text-xs font-bold tracking-[0.16em] uppercase hover:bg-white/12 transition-colors"
                >
                  {calendarFeedCopied ? "Feed URL Copied" : "Copy Calendar Feed"}
                </button>
                <a
                  href={getPublicAssetHref(CALENDAR_FEED_PATH)}
                  download
                  className="px-5 py-3 rounded-full bg-[#C9A84C] text-[#051040] font-label text-xs font-bold tracking-[0.16em] uppercase hover:bg-[#d7b85d] transition-colors"
                >
                  Download .ics
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {fixturesByMonth.map((month, i) => (
                <div key={month.month} className="bg-white/6 border border-white/10 rounded-[1.5rem] p-5 md:p-6 fade-up" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <h3 className="font-display text-2xl md:text-[2rem] font-black text-[#C9A84C] mb-4">{month.month}</h3>
                  <ul className="space-y-3">
                    {month.events.map((event, j) => {
                      const { label, detail } = splitFixtureEvent(event);
                      return (
                        <li key={j} className="rounded-xl bg-[#101a52]/60 border border-white/8 px-4 py-3">
                          {label && <p className="font-label text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C] mb-1.5">{label}</p>}
                          <p className="text-white/88 font-body text-sm md:text-[15px] leading-6">{detail}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Worship & Spirit */}
        <section id="worship" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <img src={WORSHIP_URL} alt="HCS Worship" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <p className="font-label text-xs md:text-sm tracking-[0.35em] uppercase text-[#051040]/45 mb-4">Faith &amp; Community</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-5">Worship & Spirit</h2>
                <div className="w-20 h-1 bg-[#C9A84C] rounded-full mb-6" />
                <div className="space-y-4 mt-6 text-[#051040]/70 font-body leading-relaxed">
                  <p>At His Church School, faith is not just a subject — it is the foundation of everything we do. Daily devotions, praise and worship, and a Christ-centred school community shape the spiritual lives of our learners.</p>
                  <p>Our Praise and Worship Team, comprising both staff and students, leads the school community in worship. We believe that encountering God&apos;s presence is central to the formation of young people who will impact their generation for Eternity.</p>
                  <p>We are a school that is deeply connected to His Church, and our spiritual life reflects the values and vision of our church community — to raise up Decision Makers, World Shakers, and Challenge Takers for the Kingdom of God.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enrichment Programmes */}
        <section id="leadership" className="py-16 bg-[#EBDAC8] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="font-label text-xs md:text-sm tracking-[0.35em] uppercase text-[#051040]/45 fade-up">Beyond The Classroom</p>
              <h2 className="font-display text-3xl md:text-5xl font-black text-[#051040] mt-4 fade-up">Enrichment Programmes</h2>
              <div className="w-20 h-1 bg-[#C9A84C] rounded-full mx-auto mt-5 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users size={28} />,
                  title: "Leadership Courses",
                  desc: "His Church School offers leadership development programmes designed to equip learners with the skills, confidence, and Biblical foundations needed to lead effectively in their communities, schools, and future workplaces.",
                  href: "mailto:secretary@hcschool.co.za?subject=Leadership Course Enquiry",
                },
                {
                  icon: <Flame size={28} />,
                  title: "Firefighting",
                  desc: "Selected staff and learners are trained in firefighting techniques, equipping them with practical skills for emergency response. This programme builds confidence, teamwork, and a sense of responsibility.",
                  href: "mailto:secretary@hcschool.co.za?subject=Firefighting Course Enquiry",
                },
                {
                  icon: <Heart size={28} />,
                  title: "First Aid",
                  desc: "His Church School provides First Aid training to equip learners and staff with life-saving skills. Participants receive Level One First Aid certification, preparing them to respond effectively in emergency situations.",
                  href: "mailto:secretary@hcschool.co.za?subject=First Aid Course Enquiry",
                },
              ].map((programme, i) => (
                <div key={programme.title} className="bg-white rounded-[1.75rem] shadow-sm p-9 fade-up text-left" style={{ transitionDelay: `${i * 90}ms` }}>
                  <div className="w-16 h-16 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-7">
                    {programme.icon}
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#051040] mb-4">{programme.title}</h3>
                  <p className="text-[#051040]/65 font-body text-sm leading-8 mb-8">{programme.desc}</p>
                  <a
                    href={programme.href}
                    className="inline-block px-8 py-3 bg-[#051040] text-white font-label text-sm font-bold rounded-md hover:bg-[#051040]/85 transition-colors tracking-[0.18em] uppercase"
                  >
                    Enquire
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Outreach */}
        <section id="outreach" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-6 fade-up">Community Outreach</h2>
            <p className="text-[#051040]/70 font-body leading-relaxed mb-6 fade-up">
              His Church School believes that true education extends beyond the classroom. Through community outreach initiatives, our learners are taught to serve others with compassion, humility, and love — reflecting the heart of Jesus Christ in their communities.
            </p>
            <p className="text-[#051040]/70 font-body leading-relaxed mb-8 fade-up">
              Outreach activities are integrated into the school calendar, giving learners practical opportunities to live out their faith and make a tangible difference in the lives of those around them.
            </p>
            <div className="flex flex-wrap justify-center gap-4 fade-up">
              <a
                href={getPageHref("contact")}
                className="px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-widest uppercase"
              >
                Get Involved
              </a>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
