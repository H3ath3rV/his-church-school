/* =============================================================
   HCS School Life Page
   Sections (per client sitemap):
   - Hero
   - Sport (id="sport") — intro + sports by term
   - Individual sports: Swimming, Athletics, Soccer, Netball, Cross-Country, Chess (id anchors)
   - Worship & Spirit (id="worship")
   - Enrichment (id="enrichment"): Leadership, Firefighting, First Aid
   - Community Outreach (id="outreach")
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { getPublicAssetHref } from "@/lib/sitePaths";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Users, Flame, Heart, Shield, Trophy, Calendar } from "lucide-react";

const SPORT_URL   = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_sport-ZXz2kRCQJivyVVXye2Jj9C.webp";
const WORSHIP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";
const ABOUT_URL   = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";
const ACADEMICS_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";
const CALENDAR_FEED_PATH = "/hcs-sporting-events-2025.ics";

const individualSports = [
  {
    id: "swimming",
    name: "Swimming",
    term: "Term 1",
    img: SPORT_URL,
    desc: "Open to boys and girls between the ages of 6 and 19. Disciplines include freestyle, backstroke, breaststroke, butterfly, and individual medley. Swimmers can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
    details: ["Age groups: U6 – U19", "Disciplines: Freestyle, Backstroke, Breaststroke, Butterfly, Individual Medley", "Qualifications through to SACSSA National level"],
  },
  {
    id: "athletics",
    name: "Athletics",
    term: "Term 3",
    img: ACADEMICS_URL,
    desc: "Track and field disciplines including sprints, relays, long jump, high jump, shot put, javelin, and discus. Athletes can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
    details: ["Age groups: U7 – U19", "Disciplines: Sprints, Relays, Long Jump, High Jump, Shot Put, Javelin, Discus", "Qualifications through to SACSSA National level"],
  },
  {
    id: "soccer",
    name: "Soccer",
    term: "Term 2",
    img: SPORT_URL,
    desc: "Boys and girls between the ages of 10 and 19 have separate teams and, if selected, take part in the KZNCSSA Provincial Winter Sports.",
    details: ["Boys and girls teams", "Age groups: U10 – U19 (Mini Soccer U9)", "KZNCSSA Provincial Winter Sports participation"],
  },
  {
    id: "netball",
    name: "Netball",
    term: "Term 2",
    img: ACADEMICS_URL,
    desc: "Girls between the ages of 10 and 19, if selected, take part in the KZNCSSA Provincial Winter Sports. Mini Netball is available for girls under 9.",
    details: ["Girls teams", "Age groups: U9 – U19", "KZNCSSA Provincial Winter Sports participation"],
  },
  {
    id: "cross-country",
    name: "Cross-Country",
    term: "Term 2",
    img: ABOUT_URL,
    desc: "Age groups Under 6 to Under 19. Runners can qualify for Zonal, Provincial (KZNCSSA), and National (SACSSA) levels.",
    details: ["Age groups: U6 – U19", "Zonal, Provincial and National qualification pathway", "SACSSA National Cross Country"],
  },
  {
    id: "chess",
    name: "Chess",
    term: "Year-Round",
    img: SPORT_URL,
    desc: "Offered throughout the year with multiple online events. Contestants can participate in the KZNCSSA Provincial Chess Event and qualify for the SACSSA National Chess Event.",
    details: ["Year-round programme", "Online events throughout the year", "SACSSA National Chess participation"],
  },
];

const sportsByTerm = [
  {
    term: "Term 1",
    sports: [
      { name: "Swimming", desc: "Open to boys and girls between the ages of 6 and 19. Disciplines include freestyle, backstroke, breaststroke, butterfly, and individual medley." },
      { name: "Mini Cricket", desc: "Open to boys and girls between the ages of 6 and 9. Two teams (U8 and U10) participate in the KZNCSSA Mini Cricket Festival." },
      { name: "Cricket", desc: "Open to boys between the ages of 10 and 19. Opportunity to participate in the KZNCSSA Provincial Cricket Festival." },
    ],
  },
  {
    term: "Term 2",
    sports: [
      { name: "Mini Soccer", desc: "Open to boys and girls under the age of 9. A team participates in the Under 9 KZNCSSA Provincial Winter Sports." },
      { name: "Mini Netball", desc: "Open to girls under the age of 9. A team participates in the Under 9 KZNCSSA Provincial Winter Sports." },
      { name: "Netball", desc: "Girls between the ages of 10 and 19, if selected, take part in the KZNCSSA Provincial Winter Sports." },
      { name: "Soccer", desc: "Boys and girls between the ages of 10 and 19 have separate teams and take part in the KZNCSSA Provincial Winter Sports." },
      { name: "Cross Country", desc: "Age groups Under 6 to Under 19. Runners can qualify for Zonal, Provincial, and National levels." },
    ],
  },
  {
    term: "Term 3",
    sports: [
      { name: "Athletics", desc: "Track and field disciplines including sprints, relays, long jump, high jump, shot put, javelin, and discus." },
    ],
  },
  {
    term: "Term 4",
    sports: [
      { name: "Chess", desc: "Offered throughout the year with multiple online events and provincial and national competitions." },
      { name: "Table Tennis", desc: "Open to boys and girls between the ages of 6 and 19. Individual-based trial for KZNCSSA Team selection." },
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
  if (rest.length === 0) return { detail: label };
  return { label, detail: rest.join(" — ") };
}

const enrichmentProgrammes = [
  {
    icon: <Users size={28} />,
    title: "Leadership Courses",
    desc: "His Church School offers leadership development programmes designed to equip learners with the skills, confidence, and Biblical foundations needed to lead effectively in their communities, schools, and future workplaces.",
    detail: "Through practical training and Biblical principles, students are equipped to lead with integrity. Our goal: raising up Decision Makers, World Shakers, and Challenge Takers who will impact their generation for eternity.",
    href: "mailto:secretary@hcschool.co.za?subject=Leadership Course Enquiry",
  },
  {
    icon: <Flame size={28} />,
    title: "Fire-Fighting",
    desc: "His Church School offers a unique firefighting training programme that equips learners with practical skills in fire prevention, control, and safety, conducted by certified instructors.",
    detail: "The programme builds teamwork, courage, and discipline while teaching emergency response. Learners who complete the course receive a certificate recognised in the workplace.",
    href: "mailto:secretary@hcschool.co.za?subject=Firefighting Course Enquiry",
  },
  {
    icon: <Heart size={28} />,
    title: "First Aid",
    desc: "Our accredited First Aid programme teaches learners essential life-saving skills — from CPR and wound care to emergency response. Learners earn a recognised First Aid certificate on completion.",
    detail: "This qualification is valuable for future employment and is a practical skill that can save lives. At HCS, we equip learners not just academically, but with practical skills that prepare them for life.",
    href: "mailto:secretary@hcschool.co.za?subject=First Aid Course Enquiry",
  },
];

export default function SchoolLife() {
  const pageRef = useScrollAnimation();
  const [calendarFeedCopied, setCalendarFeedCopied] = useState(false);
  const [expandedEnrichment, setExpandedEnrichment] = useState<number | null>(null);

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

        {/* ── Hero ── */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${SPORT_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3">His Church School</p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">School Life</h1>
          </div>
        </section>

        {/* ── Sport Intro ── */}
        <section id="sport" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={SPORT_URL} alt="HCS Sport" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Athletics &amp; Sport</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Sport at His Church School</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>His Church School encourages all students to participate in school sports as it promotes essential values such as teamwork, leadership, discipline, resilience, sportsmanship, and physical fitness — alongside Biblical values of compassion, humility, integrity, and stewardship.</p>
                  <p>Integrating these values into sports activities fosters the holistic development of our learners, guiding them to adopt Biblical values both on and off the field.</p>
                </div>
                <blockquote className="border-l-4 border-[#C9A84C] pl-5 my-6 font-body text-sm text-[#051040]/75 italic leading-relaxed">
                  <p>SACSSA affiliated — South African Christian Schools Sports Association.</p>
                  <p className="mt-2">KZNCSSA affiliated — KwaZulu-Natal Christian Schools Sports Association, North Durban Zone.</p>
                </blockquote>
                {/* Quick sport links */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {individualSports.map((s) => (
                    <a key={s.id} href={`#${s.id}`}
                      className="px-4 py-1.5 bg-[#f8f8f8] border border-gray-200 rounded-full font-label text-xs font-bold text-[#051040] hover:bg-[#051040] hover:text-white hover:border-[#051040] transition-colors tracking-wide uppercase">
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sports by Term ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Year Round</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Sports by Term</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sportsByTerm.map((termGroup, i) => (
                <div key={termGroup.term} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="bg-[#051040] px-6 py-4">
                    <h3 className="font-label text-xs tracking-[0.15em] text-[#C9A84C] uppercase font-bold">{termGroup.term}</h3>
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

        {/* ── Individual Sport Sections ── */}
        {individualSports.map((sport, i) => (
          <section key={sport.id} id={sport.id} className={`py-16 scroll-mt-20 ${i % 2 === 0 ? "bg-white" : "bg-[#f8f8f8]"}`}>
            <div className="max-w-7xl mx-auto px-4">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {i % 2 !== 0 && (
                  <div className="fade-up order-2 lg:order-1">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <img src={sport.img} alt={sport.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                <div className={`fade-up ${i % 2 !== 0 ? "order-1 lg:order-2" : ""}`}>
                  <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-2">{sport.term}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">{sport.name}</h2>
                  <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                  <p className="text-[#051040]/70 font-body leading-relaxed mb-5">{sport.desc}</p>
                  <ul className="space-y-2">
                    {sport.details.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-sm font-body text-[#051040]/65">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                {i % 2 === 0 && (
                  <div className="fade-up">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <img src={sport.img} alt={sport.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* ── Fixtures Calendar ── */}
        <section className="py-20 bg-[#051040] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="font-label text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-3 fade-up">2025 Season</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white fade-up">Sporting Calendar</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {fixturesByMonth.map((m, i) => (
                <div key={m.month} className="bg-white/5 rounded-xl overflow-hidden border border-white/10 fade-up" style={{ transitionDelay: `${i * 50}ms` }}>
                  <div className="bg-[#C9A84C] px-4 py-2">
                    <h3 className="font-label text-xs font-bold text-[#051040] tracking-widest uppercase">{m.month}</h3>
                  </div>
                  <ul className="p-4 space-y-2">
                    {m.events.map((ev) => {
                      const { label, detail } = splitFixtureEvent(ev);
                      return (
                        <li key={ev} className="text-white/70 font-body text-xs leading-snug">
                          {label && <span className="font-bold text-[#C9A84C]">{label} — </span>}
                          {detail}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center fade-up">
              <button onClick={handleCopyCalendarFeed}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 text-white font-label text-xs font-bold rounded-full hover:bg-white/20 transition-colors tracking-wider uppercase">
                <Calendar size={14} />
                {calendarFeedCopied ? "Feed URL Copied!" : "Add to Google Calendar"}
              </button>
            </div>
          </div>
        </section>

        {/* ── Worship & Spirit ── */}
        <section id="worship" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={WORSHIP_URL} alt="Worship at HCS" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up order-1 lg:order-2">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Faith &amp; Community</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Worship &amp; Spirit</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>At His Church School, faith is not just a subject — it is the foundation of everything we do. Daily devotions, praise and worship, and a Christ-centred school community shape the spiritual lives of our learners.</p>
                  <p>Our Praise and Worship Team, comprising both staff and students, leads the school community in worship. We believe that encountering God's presence is central to the formation of young people who will impact their generation for Eternity.</p>
                  <p>We are a school deeply connected to His Church, and our spiritual life reflects the values and vision of our church community — to raise up Decision Makers, World Shakers, and Challenge Takers for the Kingdom of God.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Enrichment Programmes ── */}
        <section id="enrichment" className="py-20 bg-[#EBDAC8] scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/50 tracking-[0.2em] uppercase mb-3 fade-up">Beyond The Classroom</p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">Enrichment Programmes</h2>
              <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enrichmentProgrammes.map((prog, i) => (
                <div key={prog.title}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="p-8">
                    <div className="w-14 h-14 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-5">
                      {prog.icon}
                    </div>
                    <h3 className="font-display text-xl font-black text-[#051040] mb-2">{prog.title}</h3>
                    <div className="w-8 h-0.5 bg-[#C9A84C] mb-4" />
                    <p className="text-[#051040]/65 font-body text-sm leading-relaxed mb-3">{prog.desc}</p>
                    {expandedEnrichment === i && (
                      <p className="text-[#051040]/60 font-body text-sm leading-relaxed mb-3">{prog.detail}</p>
                    )}
                    <button
                      onClick={() => setExpandedEnrichment(expandedEnrichment === i ? null : i)}
                      className="text-xs font-label font-bold text-[#051040]/50 hover:text-[#051040] transition-colors tracking-wide uppercase mb-4 block">
                      {expandedEnrichment === i ? "Show less ↑" : "Read more ↓"}
                    </button>
                  </div>
                  <div className="px-8 pb-7">
                    <a href={prog.href}
                      className="block text-center px-6 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                      ENQUIRE
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Leadership Section (kept for id="leadership" deep link) ── */}
        <div id="leadership" className="scroll-mt-20" />

        {/* ── Community Outreach ── */}
        <section id="outreach" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Giving Back</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Community Outreach</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>His Church School instils in its learners a heart for service and a compassion for those around them. Our Community Outreach programme gives learners the opportunity to make a practical difference in the lives of others.</p>
                  <p>Through various outreach initiatives, learners learn the value of generosity, empathy, and servant-hearted leadership — putting their faith into action and being a light in their community.</p>
                  <p>Outreach activities are integrated into the school calendar and provide learners with real-world opportunities to live out the Biblical call to love their neighbours.</p>
                </div>
                <a href="mailto:secretary@hcschool.co.za?subject=Community Outreach Enquiry"
                  className="inline-block mt-8 px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                  GET INVOLVED
                </a>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={ABOUT_URL} alt="Community Outreach" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
