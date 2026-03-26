/* =============================================================
   HCS Partnership Page
   Sections: Hero, Sponsorship, Uniform
   ============================================================= */

import Layout from "@/components/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPageHref } from "@/lib/sitePaths";
import { Link } from "wouter";
import { HandHeart, Shirt, Mail } from "lucide-react";

const ABOUT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_about-h8LQ2WdpUtKKBt2ht8xpKJ.webp";
const ACADEMICS_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_academics-7LM8P4R7XuAXXLEZPm62aA.webp";
const SPORT_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_sport-ZXz2kRCQJivyVVXye2Jj9C.webp";

export default function Partnership() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ABOUT_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3">His Church School</p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">Partnership</h1>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="py-16 bg-[#EBDAC8]">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-4 fade-up">Partner With Us</h2>
            <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mb-6 fade-up" />
            <p className="text-[#051040]/70 font-body leading-relaxed fade-up">
              His Church School values the support of the broader community and business sector. By partnering with us, you invest directly in the education and development of the next generation — young people grounded in faith, character, and excellence.
            </p>
          </div>
        </section>

        {/* ── Sponsorship ── */}
        <section id="sponsorship" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">Get Involved</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">Sponsorship</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>We invite businesses, organisations, and individuals to partner with His Church School through financial sponsorship. Your support helps fund bursaries, sporting programmes, enrichment activities, and school infrastructure.</p>
                  <p>Sponsorships are available at various levels and can be tailored to your company's giving goals. All sponsors receive recognition in our school communications and at relevant school events.</p>
                  <p>If you are interested in supporting His Church School, we would love to discuss how a partnership could work for you. Please contact the school principal directly.</p>
                </div>
                <a href="mailto:secretary@hcschool.co.za?subject=Sponsorship Enquiry"
                  className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                  <Mail size={14} /> ENQUIRE ABOUT SPONSORSHIP
                </a>
              </div>
              <div className="fade-up">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={ACADEMICS_URL} alt="Partnership with HCS" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sponsorship tiers ── */}
        <section className="py-16 bg-[#f8f8f8]">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="font-display text-2xl font-black text-[#051040] fade-up">Partnership Opportunities</h3>
              <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mt-3 fade-up" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Sports Sponsorship", icon: <HandHeart size={24} />, desc: "Sponsor a sports team, event, or kit. Your branding is featured at all relevant sporting events and in school communications." },
                { title: "Bursary Sponsorship", icon: <HandHeart size={24} />, desc: "Fund a full or partial bursary to enable a deserving learner to access quality Christian education regardless of financial means." },
                { title: "Facility Sponsorship", icon: <HandHeart size={24} />, desc: "Contribute to the development or maintenance of school facilities. Named recognition is available for significant contributions." },
              ].map((tier, i) => (
                <div key={tier.title}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 fade-up"
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] mb-4">
                    {tier.icon}
                  </div>
                  <h4 className="font-display text-lg font-black text-[#051040] mb-2">{tier.title}</h4>
                  <div className="w-8 h-0.5 bg-[#C9A84C] mb-3" />
                  <p className="text-[#051040]/60 font-body text-sm leading-relaxed">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Uniform ── */}
        <section id="uniform" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className="fade-up order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img src={SPORT_URL} alt="HCS School Uniform" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="fade-up order-1 lg:order-2">
                <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3">School Dress Code</p>
                <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">School Uniform</h2>
                <div className="w-12 h-0.5 bg-[#C9A84C] mb-6" />
                <div className="space-y-4 text-[#051040]/70 font-body leading-relaxed">
                  <p>His Church School has a smart, professional school uniform that reflects the values of our school — order, pride, and belonging. All learners are expected to wear the full school uniform at all times during school hours.</p>
                  <p>The uniform policy is designed to ensure that every learner feels equally represented and focused on their learning environment, free from the distractions of fashion.</p>
                  <p>Full uniform details and a price list are available from the school office. Please contact the secretary to arrange a fitting or to place an order.</p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#f8f8f8] rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Shirt size={16} className="text-[#C9A84C]" />
                      <h4 className="font-label text-xs font-bold text-[#051040] tracking-wider uppercase">Winter Uniform</h4>
                    </div>
                    <p className="text-[#051040]/55 font-body text-xs leading-relaxed">Full details available from the school office. Includes blazer, jersey, and formal wear.</p>
                  </div>
                  <div className="bg-[#f8f8f8] rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Shirt size={16} className="text-[#C9A84C]" />
                      <h4 className="font-label text-xs font-bold text-[#051040] tracking-wider uppercase">Summer Uniform</h4>
                    </div>
                    <p className="text-[#051040]/55 font-body text-xs leading-relaxed">Full details available from the school office. Includes summer dress/shorts and formal wear.</p>
                  </div>
                </div>
                <a href="mailto:secretary@hcschool.co.za?subject=Uniform Enquiry"
                  className="inline-block mt-6 px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full hover:bg-[#051040]/85 transition-colors tracking-wider uppercase">
                  UNIFORM ENQUIRY
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
