import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HandHeart } from "lucide-react";
import { getPublicAssetHref } from "@/lib/sitePaths";
import { buildMailtoHref } from "@/content/site";

const PARTNERSHIP_IMAGE_URL = getPublicAssetHref(
  "photos/partnerships/partnerships-hero.jpg"
);
const SPONSORSHIP_IMAGE_URL = getPublicAssetHref(
  "photos/partnerships/partnerships-sponsorship.jpg"
);
const SPONSORSHIP_MOBILE_URL = getPublicAssetHref(
  "photos/partnerships/partnerships-sponsorship-mobile.jpg"
);

export default function Partnership() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero title="Partnership" imageUrl={PARTNERSHIP_IMAGE_URL} />

        {/* ── Intro ── */}
        <section className="py-20 bg-[#EBDAC8]">
          <div className="max-w-3xl mx-auto hcs-shell text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-4 fade-up">
              Partner With Us
            </h2>
            <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mb-6 fade-up hcs-divider" />
            <p className="text-[#051040]/70 font-body leading-relaxed fade-up">
              His Church School values the support of the broader community and
              business sector. By partnering with us, you invest directly in the
              education and development of the next generation of young people
              grounded in faith, character, and excellence.
            </p>
          </div>
        </section>

        {/* ── Sponsorship ── */}
        <section id="sponsorship" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
              <div className="fade-up order-2 hcs-split-copy lg:order-1">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/45 lg:text-left">
                  Get Involved
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  Sponsorship
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>
                    We invite businesses, organisations, and individuals to
                    partner with His Church School through financial
                    sponsorship. Your support helps fund bursaries, sporting
                    programmes, enrichment activities, and school
                    infrastructure.
                  </p>
                  <p>
                    Sponsorships are available at various levels and can be
                    tailored to your giving goals. All sponsors receive
                    recognition in our school communications and at relevant
                    school events.
                  </p>
                  <p>
                    If you are interested in supporting His Church School, we
                    would love to discuss how a partnership could work for you.
                    Our school office can guide you through available options
                    and connect you with the relevant leadership team.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start">
                    <a
                      href={buildMailtoHref("Sponsorship Enquiry")}
                      className="hcs-btn-primary px-7"
                    >
                      Enquire About Sponsorship
                    </a>
                  </div>
                </div>
              </div>
              <div className="fade-up order-1 lg:order-2">
                <div className="hcs-editorial-image">
                  <picture>
                    <source
                      media="(max-width: 1535px)"
                      srcSet={SPONSORSHIP_MOBILE_URL}
                    />
                    <img
                      src={SPONSORSHIP_IMAGE_URL}
                      alt="Sponsorship partnership with HCS"
                      style={{ objectPosition: "50% 34%" }}
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sponsorship tiers ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <h3 className="font-display text-3xl md:text-4xl font-black text-[#051040] fade-up">
                Partnership Opportunities
              </h3>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-6 md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
              {[
                {
                  title: "Sports Sponsorship",
                  icon: <HandHeart size={24} />,
                  desc: "Sponsor a sports team, event, or kit. Your branding is featured at all relevant sporting events and in school communications.",
                },
                {
                  title: "Bursary Sponsorship",
                  icon: <HandHeart size={24} />,
                  desc: "Fund a full or partial bursary to enable a deserving learner to access quality Christian education regardless of financial means.",
                },
                {
                  title: "Facility Sponsorship",
                  icon: <HandHeart size={24} />,
                  desc: "Contribute to the development or maintenance of school facilities. Named recognition is available for significant contributions.",
                },
              ].map((tier, i) => (
                <div
                  key={tier.title}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 fade-up flex flex-col items-center text-center h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-6">
                    {tier.icon}
                  </div>
                  <h4 className="font-display text-xl font-black text-[#051040] mb-2">
                    {tier.title}
                  </h4>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mb-4 mx-auto" />
                  <p className="max-w-[30ch] font-body text-[0.98rem] leading-[1.72] text-[#051040]/65 sm:text-[1rem]">
                    {tier.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
