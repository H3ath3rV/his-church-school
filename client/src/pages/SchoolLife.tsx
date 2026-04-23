import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ResponsiveEditorialImage from "@/components/ResponsiveEditorialImage";
import { getPageHref, getPublicAssetHref } from "@/lib/sitePaths";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Users, Flame, Heart } from "lucide-react";

const SPORT_HERO_URL = getPublicAssetHref(
  "photos/school-life/school-life-hero-mobile.webp"
);
const SPORT_HERO_TABLET_URL = getPublicAssetHref(
  "photos/school-life/school-life-hero-tablet.webp"
);
const SPORT_HERO_DESKTOP_URL = getPublicAssetHref(
  "photos/school-life/school-life-hero-desktop.webp"
);
const SPORT_SECTION_DESKTOP_URL = getPublicAssetHref(
  "photos/school-life/school-life-sport-desktop.webp"
);
const SPORT_SECTION_MOBILE_URL = getPublicAssetHref(
  "photos/school-life/school-life-sport-mobile.webp"
);
const SPORT_SECTION_TABLET_URL = getPublicAssetHref(
  "photos/school-life/school-life-sport-tablet.webp"
);
const SPORTING_CALENDAR_URL = getPublicAssetHref(
  "downloads/calendar/hcs-sporting-events-2026.ics"
);

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
  {
    month: "Jan",
    events: ["No sporting activities scheduled this month."],
  },
  {
    month: "Feb",
    events: [
      "3 Feb | Inter-school Zonal Swimming Gala (U6-U19)",
      "17 Feb | KZNCSSA Provincial Swimming Gala",
    ],
  },
  {
    month: "Mar",
    events: [
      "2 Mar | SACSSA National Swimming Gala",
      "9 Mar | KZNCSSA Mini Cricket Festival, Hollywoodbets Cricket Stadium (U6-U8 & U9-U10)",
      "16 Mar | Provincial Cricket Festival",
    ],
  },
  {
    month: "Apr",
    events: [
      "Winter Sports | Football, Netball, Volleyball",
      "19 Apr | KZNCSSA Provincial Winter Sports (U15, U17 & U19)",
    ],
  },
  {
    month: "May",
    events: [
      "3 May | KZNCSSA Provincial Winter Sports (U11 & U13)",
      "11 May | KZNCSSA Provincial Winter Sports (U9)",
      "25 May | Cross Country (U6-U19)",
    ],
  },
  {
    month: "Jun",
    events: ["8 Jun | KZNCSSA Provincial Cross Country"],
  },
  {
    month: "Jul",
    events: ["20 Jul | SACSSA National Cross Country"],
  },
  {
    month: "Aug",
    events: [
      "17 Aug | Inter-school Zonal Athletics",
      "30-31 Aug | KZNCSSA Provincial Athletics (Pietermaritzburg Athletics Stadium)",
    ],
  },
  {
    month: "Sep",
    events: [
      "14 Sep | KZNCSSA Provincial Chess & Speedcubing",
      "20-21 Sep | SACSSA National Athletics (Pietermaritzburg Athletics Stadium)",
    ],
  },
  {
    month: "Oct",
    events: [
      "12 Oct | KZNCSSA Provincial Table Tennis",
      "26 Oct | SACSSA National Chess",
    ],
  },
  {
    month: "Nov",
    events: [
      "2 Nov | SACSSA National Table Tennis",
      "16 Nov | KZNCSSA Sport Awards Ceremony",
    ],
  },
  {
    month: "Dec",
    events: ["No sporting activities scheduled this month."],
  },
];

function splitFixtureEvent(event: string) {
  const [label, ...rest] = event.split(" | ");
  if (rest.length === 0) return { detail: label };
  return { label, detail: rest.join(" | ") };
}

export default function SchoolLife() {
  const pageRef = useScrollAnimation();
  const calendarUrlBase =
    typeof window === "undefined"
      ? "https://hcschool.co.za/"
      : window.location.href;
  const sportingCalendarAbsoluteUrl = new URL(
    SPORTING_CALENDAR_URL,
    calendarUrlBase
  ).toString();
  const sportingCalendarForGoogle = new URL(sportingCalendarAbsoluteUrl);
  sportingCalendarForGoogle.search = "";
  const googleCalendarHref = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(
    sportingCalendarForGoogle.toString()
  )}`;

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero
          title="School Life"
          imageUrl={SPORT_HERO_URL}
          mobileShowFullImage
          mobileAspectRatio="1080 / 1201"
          tabletImageUrl={SPORT_HERO_TABLET_URL}
          tabletShowFullImage
          tabletAspectRatio="2 / 1"
          desktopImageUrl={SPORT_HERO_DESKTOP_URL}
          desktopShowFullImage
          desktopAspectRatio="4 / 1"
          imagePosition={{
            mobile: "center 40%",
            tablet: "center 40%",
            desktop: "center 40%",
          }}
        />

        {/* ── Sport Intro ── */}
        <section id="sport" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
              <div className="fade-up">
                <ResponsiveEditorialImage
                  className="hcs-editorial-image"
                  desktopImageUrl={SPORT_SECTION_DESKTOP_URL}
                  mobileImageUrl={SPORT_SECTION_MOBILE_URL}
                  tabletImageUrl={SPORT_SECTION_TABLET_URL}
                  alt="Learners taking part in athletics and school sport"
                  imageClassName="object-[50%_30%] sm:object-[50%_28%] lg:object-[50%_34%]"
                />
              </div>
              <div className="fade-up hcs-split-copy">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/62 lg:text-left">
                  Athletics &amp; Sport
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  Sport at His&nbsp;Church&nbsp;School
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="mx-auto max-w-[44ch] space-y-4 text-left text-[#051040]/70 font-body leading-relaxed lg:mx-0 lg:max-w-none">
                  <p>
                    His&nbsp;Church&nbsp;School encourages all learners to
                    participate in school sports as it not only promotes
                    essential values such as teamwork, leadership, discipline,
                    resilience, sportsmanship, physical fitness, time
                    management, and respect for authority, but also instils
                    Biblical values such as compassion, humility, integrity, and
                    stewardship.
                  </p>
                  <p>
                    Integrating these values into sports activities fosters the
                    holistic development of learners' character, guiding them to
                    adopt Biblical values both on and off the sport field.
                  </p>
                </div>
                <blockquote className="hcs-pullquote">
                  <p>
                    SACSSA affiliated: South African Christian Schools Sports
                    Association.
                  </p>
                  <p className="mt-2">
                    KZNCSSA affiliated: KwaZulu-Natal Christian Schools Sports
                    Association, North Durban Zone.
                  </p>
                  <cite>Sport Affiliations</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sports by Term ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
                Year Round
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Sports by Term
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sportsByTerm.map((termGroup, i) => (
                <div
                  key={termGroup.term}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 fade-up"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="bg-[#051040] px-6 py-4">
                    <h3 className="font-display text-base font-black text-white tracking-wide">
                      {termGroup.term}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {termGroup.sports.map(sport => (
                      <div key={sport.name} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                        <div>
                          <h4 className="font-display text-base font-black text-[#051040]">
                            {sport.name}
                          </h4>
                          <p className="mt-1 font-body text-[0.98rem] leading-[1.72] text-[#051040]/62 sm:text-[1rem]">
                            {sport.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fixtures Calendar ── */}
        <section className="py-20 bg-[#051040]">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="mx-auto max-w-3xl">
              <div className="text-center mb-12">
                <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-3 fade-up">
                  2026 Planner
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-white fade-up">
                  Fixtures &amp; Sporting Events
                </h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-6 fade-up hcs-divider" />
                <p className="mx-auto mt-2 w-full max-w-[44ch] text-left font-body text-[0.98rem] leading-[1.72] text-white/72 fade-up sm:text-[1rem] md:max-w-none md:text-center">
                  Key 2026 sporting dates supplied by the school are listed
                  below. Final logistics and venue updates are shared with
                  families through the school office as each event approaches.
                </p>
              </div>

              {/* Add sporting calendar to Google Calendar */}
              <div className="mb-10 flex flex-col items-center gap-3 text-center fade-up">
                <a
                  href={googleCalendarHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hcs-btn-gold px-8"
                >
                  Add to Google Calendar
                </a>
                <p className="w-full max-w-none font-body text-[0.95rem] leading-[1.68] text-white/64 sm:text-[0.98rem]">
                  Sign in to Google and confirm to subscribe to your
                  child&apos;s key sporting dates — fixtures stay in sync as the
                  school updates them.
                </p>
              </div>
            </div>

            {/* Month grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:auto-rows-fr">
              {fixturesByMonth.map((month, i) => (
                <div
                  key={month.month}
                  className="fade-up flex h-full min-h-[236px] flex-col rounded-[1.5rem] border border-white/10 bg-white/6 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:p-7 lg:min-h-[264px]"
                  style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                >
                  <h3 className="mb-4 font-display text-[1.75rem] font-black text-[#C9A84C]">
                    {month.month}
                  </h3>
                  <div className="space-y-4">
                    {month.events.map((event, j) => {
                      const { label, detail } = splitFixtureEvent(event);
                      return (
                        <div key={j} className="space-y-1">
                          {label && (
                            <p className="font-label text-xs font-bold uppercase tracking-[0.12em] text-[#C9A84C] mb-0.5">
                              {label}
                            </p>
                          )}
                          <p className="font-body text-[0.98rem] leading-[1.7] text-white/72 sm:text-[1rem]">
                            {detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Enrichment Programmes ── */}
        <section id="leadership" className="py-20 bg-[#EBDAC8] scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
                Beyond The Classroom
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Enrichment Programmes
              </h2>
              <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-5 md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
              {[
                {
                  icon: <Users size={26} />,
                  title: "Leadership Courses",
                  desc: "His\u00A0Church\u00A0School offers leadership development programmes designed to equip learners with the skills, confidence, and Biblical foundations needed to lead effectively in their communities, schools, and future workplaces.",
                },
                {
                  icon: <Flame size={26} />,
                  title: "Firefighting",
                  desc: "Selected staff and learners are trained in firefighting techniques, equipping them with practical skills for emergency response. This programme builds confidence, teamwork, and a sense of responsibility.",
                },
                {
                  icon: <Heart size={26} />,
                  title: "First Aid",
                  desc: "His\u00A0Church\u00A0School provides First Aid training to equip learners and staff with life-saving skills. Participants receive Level One First Aid certification, preparing them to respond effectively in emergency situations.",
                },
              ].map((programme, i) => (
                <div
                  key={programme.title}
                  className="bg-white rounded-2xl shadow-sm p-8 fade-up border border-[#c9b48a]/20 flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-6">
                    {programme.icon}
                  </div>
                  <h3 className="font-display text-xl font-black text-[#051040] mb-2">
                    {programme.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
                  <p className="max-w-[30ch] font-body text-[0.98rem] leading-[1.72] text-[#051040]/65 sm:text-[1rem]">
                    {programme.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Community Outreach ── */}
        <section id="outreach" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-6xl mx-auto hcs-shell text-center">
            <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3 fade-up">
              Serving Others
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2 fade-up">
              Community Outreach
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-8 fade-up hcs-divider" />
            <div className="mx-auto max-w-3xl space-y-5 text-center fade-up">
              <p className="text-[#051040]/70 font-body leading-relaxed">
                His&nbsp;Church&nbsp;School believes that true education extends
                beyond the classroom. Through community outreach initiatives,
                our learners are taught to serve others with compassion,
                humility, and love, reflecting the heart of Jesus Christ in
                their communities.
              </p>
              <p className="text-[#051040]/70 font-body leading-relaxed">
                Outreach activities are integrated into the school calendar,
                giving learners practical opportunities to live out their faith
                and make a tangible difference in the lives of those around
                them.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#051040] py-16">
          <div className="mx-auto max-w-5xl hcs-shell text-center">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#C9A84C] fade-up">
              Visit &amp; Connect
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-black leading-tight text-white fade-up md:text-4xl">
              Want to see school life in person?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-[1rem] leading-[1.72] text-white/76 fade-up">
              Contact the office to ask about sport, enrichment, outreach, and
              what a typical learner week looks like at His Church School.
            </p>
            <div className="mt-7 flex justify-center fade-up">
              <Link href={getPageHref("contact")} className="hcs-btn-gold px-8">
                Enquire About a Visit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
