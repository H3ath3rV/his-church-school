import { Fragment } from "react";
import { Link } from "wouter";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import ContactDetailCard from "@/components/ContactDetailCard";
import Layout from "@/components/Layout";
import { getPageHref, getPublicAssetHref } from "@/lib/sitePaths";
import { CONTACT_DETAILS } from "@/content/site";
import { Play } from "lucide-react";

const HOME_HERO_URL = getPublicAssetHref("photos/home/home-hero.jpg");
const HOME_HERO_MOBILE_URL = getPublicAssetHref(
  "photos/home/home-hero-mobile.jpg"
);
const WORSHIP_URL = getPublicAssetHref("photos/home/home-worship-spirit.jpg");
const WORSHIP_MOBILE_URL = getPublicAssetHref(
  "photos/home/home-worship-spirit-mobile.jpg"
);

function TestimonialStar({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 2L14.81 8.63L22 9.24L16.54 13.97L18.18 21L12 17.27L5.82 21L7.46 13.97L2 9.24L9.19 8.63L12 2Z" />
    </svg>
  );
}

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

function TestimonialCard({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <article
      className={`flex min-h-[24rem] w-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-md sm:min-h-[25rem] sm:p-8 ${className}`}
    >
      <div className="flex w-full flex-1 flex-col items-center pt-2">
        <span className="block -mb-2 font-display text-[64px] font-black leading-[0.68] tracking-[-0.04em] text-[#C9A84C]">
          ”
        </span>
        <div className="mt-3 flex w-full flex-1 items-start justify-center">
          <p className="mx-auto max-w-[31ch] text-base leading-[1.82] text-[#051040]/72 font-body italic md:max-w-[34ch]">
            {testimonial.quote}
          </p>
        </div>
      </div>
      <div className="mt-5 pt-4">
        <div className="flex items-center justify-center gap-2.5 text-[#C9A84C]">
          {Array.from({ length: 5 }).map((_, index) => (
            <TestimonialStar key={index} className="h-5 w-5 text-current" />
          ))}
        </div>
        <p className="mt-5 font-display text-lg font-black text-[#051040]">
          {testimonial.name}
        </p>
        <p className="mt-0.5 font-body text-sm text-[#051040]/55">
          {testimonial.role}
        </p>
      </div>
    </article>
  );
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We're so grateful for His\u00A0Church\u00A0School. The teachers genuinely care for every child and guide them with faith and grace. Our daughter has thrived both spiritually and academically in this Christ-centred, family-like community.",
    name: "Sarah M.",
    role: "Parent of Grade 5 Student",
  },
  {
    quote:
      "Choosing His\u00A0Church\u00A0School was the best decision we made for our children. The sense of community here is incredible. Our kids love going to school each day and are growing into confident, compassionate young people.",
    name: "David & Rachel P.",
    role: "Parents of Grade 3 & Grade 10 Students",
  },
  {
    quote:
      "The small class sizes mean our son gets individual attention and the teachers really know him. The biblical foundation integrated throughout every subject has helped him develop both academically and spiritually.",
    name: "John & Lisa K.",
    role: "Parents of Grade 8 Student",
  },
];

export default function Home() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <section className="relative flex min-h-[30rem] items-end overflow-hidden sm:min-h-[40rem] sm:items-center lg:min-h-[46rem]">
          <img
            src={HOME_HERO_MOBILE_URL}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center sm:hidden"
          />
          <img
            src={HOME_HERO_URL}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-cover object-[72%_26%] sm:block md:object-[76%_12%] lg:object-[72%_26%] xl:object-[68%_24%]"
          />
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,16,64,0.32) 0%, rgba(5,16,64,0.44) 18%, rgba(5,16,64,0.66) 42%, rgba(5,16,64,0.87) 68%, rgba(5,16,64,0.98) 100%)",
            }}
          />
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              background:
                "radial-gradient(circle at center 58%, rgba(5,16,64,0.02) 0%, rgba(5,16,64,0.16) 34%, rgba(5,16,64,0.34) 66%, rgba(5,16,64,0.56) 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,16,64,0.97) 0%, rgba(5,16,64,0.9) 24%, rgba(5,16,64,0.68) 46%, rgba(5,16,64,0.3) 70%, rgba(5,16,64,0.08) 100%)",
            }}
          />
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              background:
                "radial-gradient(circle at left center, rgba(5,16,64,0.18) 0%, rgba(5,16,64,0.1) 26%, rgba(5,16,64,0) 54%)",
            }}
          />
          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto hcs-shell pb-8 pt-32 sm:py-24 lg:py-28">
              <div className="mx-auto w-full max-w-[24.5rem] text-center sm:mx-0 sm:max-w-2xl sm:text-left">
                <h1 className="mx-auto mb-5 max-w-none font-display text-[2rem] font-black leading-[1.02] tracking-[-0.015em] text-white drop-shadow-[0_6px_18px_rgba(5,16,64,0.38)] fade-up min-[360px]:text-[2.3rem] sm:mx-0 sm:mb-6 sm:text-6xl sm:leading-[1.08] sm:text-left sm:drop-shadow-none lg:text-[5rem]">
                  <span className="block whitespace-nowrap">
                    Confident learners
                  </span>
                  <span className="block whitespace-nowrap text-[#C9A84C]">
                    rooted in Christ.
                  </span>
                </h1>
                <p className="mx-auto mb-6 max-w-[25.5rem] font-body text-[1rem] leading-[1.68] text-white/90 drop-shadow-[0_4px_12px_rgba(5,16,64,0.34)] fade-up sm:mx-0 sm:mb-8 sm:max-w-[31rem] sm:text-[1.125rem] sm:leading-[1.8] sm:text-white/84 sm:drop-shadow-none">
                  A private Christian school for Grades 1-12, shaping confident,
                  purpose-driven learners where every child is known, valued,
                  and{"\u00A0"}guided.
                </p>
                <div className="flex justify-center fade-up sm:justify-start">
                  <Link
                    href={getPageHref("contact")}
                    className="hcs-btn-gold w-full max-w-[16rem] justify-center px-9 sm:w-auto sm:max-w-none sm:px-11"
                  >
                    BOOK A VISIT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact Strip ── */}
        <section className="bg-[#EEF2FB] py-9 sm:py-12">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="mx-auto hidden md:grid md:max-w-[72rem] md:grid-cols-[minmax(0,18rem)_auto_minmax(0,18rem)_auto_minmax(0,18rem)] md:items-start md:justify-items-center md:justify-between md:gap-6 lg:max-w-[76rem] lg:grid-cols-[minmax(0,20.5rem)_auto_minmax(0,20.5rem)_auto_minmax(0,20.5rem)] lg:gap-8">
              {CONTACT_DETAILS.map((item, index) => {
                return (
                  <Fragment key={item.label}>
                    <ContactDetailCard
                      item={item}
                      className="mx-auto max-w-none sm:max-w-[21rem] md:max-w-[20.5rem]"
                    />
                    {index < CONTACT_DETAILS.length - 1 ? (
                      <span className="fade-up hcs-divider pointer-events-none hidden h-20 w-px self-center bg-[#051040]/12 md:block lg:h-24" />
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 justify-items-center gap-3 md:hidden">
              {CONTACT_DETAILS.map(item => (
                <ContactDetailCard key={item.label} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Worship & Spirit Teaser ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up">
                <div className="hcs-editorial-image">
                  <picture>
                    <source
                      media="(max-width: 1023px)"
                      srcSet={WORSHIP_MOBILE_URL}
                    />
                    <img src={WORSHIP_URL} alt="Worship at HCS" loading="lazy" />
                  </picture>
                </div>
              </div>
              <div className="fade-up hcs-split-copy">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/60 lg:text-left">
                  Faith &amp; Community
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  Worship &amp; Spirit
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="space-y-4 text-center text-[#051040]/70 font-body leading-relaxed lg:text-left">
                  <p>
                    At His&nbsp;Church&nbsp;School, faith is not just a subject; it is the
                    foundation of everything we do. Daily devotions, praise and
                    worship, and a Christ-centred community shape the spiritual
                    lives of our learners.
                  </p>
                  <p>
                    Our Praise and Worship Team, comprising both staff and
                    students, leads the school in worship. We believe that
                    encountering God's presence is central to forming young
                    people who will impact their generation for eternity.
                  </p>
                  <p>
                    We are a school deeply connected to His Church, raising up
                    Decision Makers, World Shakers, and Challenge Takers for the
                    Kingdom of God.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <p className="font-label text-xs font-semibold text-[#051040]/60 tracking-[0.12em] uppercase mb-3 fade-up">
                From Our Community
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Testimonials
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-5 fade-up md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
              {testimonials.map(testimonial => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Combined School ── */}
        <section className="py-20 bg-[#F5EBDD]">
          <div className="max-w-4xl mx-auto hcs-shell text-center">
            <p className="font-label text-xs font-medium text-[#4B5563] tracking-[0.12em] uppercase mb-4 fade-up">
              Grade 1 to Matric
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2 fade-up">
              One School Journey.
              <br />
              From Grade 1 to Matric.
            </h2>
            <div className="w-[60px] h-[2px] bg-[#C9A84C] mx-auto my-6 fade-up hcs-divider" />
            <div className="mx-auto w-full max-w-none text-center text-[#051040]/70 font-body leading-relaxed fade-up">
              <p>
                His&nbsp;Church&nbsp;School offers a seamless learning journey from
                primary school through to high school, grounded in faith,
                character, and academic growth. Within one nurturing community,
                learners are known, valued, and guided through every stage of
                their development.
              </p>
            </div>
          </div>
        </section>

        {/* ── Campus Video ── */}
        <section className="relative min-h-[27rem] overflow-hidden bg-[#051040] sm:h-[28rem] sm:min-h-0 lg:h-[32rem]">
          <div className="absolute inset-0 opacity-15">
            <img
              src={HOME_HERO_URL}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-[50%_18%]"
            />
          </div>
          <div className="relative mx-auto flex min-h-[27rem] max-w-4xl hcs-shell flex-col items-center justify-center py-10 text-center sm:h-full sm:min-h-0 sm:py-0">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-4 fade-up">
              Campus Tour
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-5 fade-up">
              See Our School
            </h2>
            <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-6 fade-up hcs-divider" />
            <p className="text-white/65 font-body mb-8 leading-relaxed fade-up sm:mb-10">
              Get a glimpse of life at His&nbsp;Church&nbsp;School through our facilities,
              community, and the vibrant faith-filled environment where our
              learners thrive.
            </p>
            <a
              href="https://www.facebook.com/hischurchschool/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hcs-icon-disc hcs-icon-disc-gold group mx-auto h-[4.5rem] w-[4.5rem] fade-up sm:h-20 sm:w-20"
              aria-label="Watch campus video on Facebook"
            >
              <Play size={26} className="ml-1 text-[#051040]" />
            </a>
            <p className="text-white/35 text-xs font-body mt-4 fade-up">
              Click to watch on Facebook
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
