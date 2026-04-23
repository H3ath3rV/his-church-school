import Layout from "@/components/Layout";
import HostedEnquiryForm, {
  type HostedEnquiryField,
} from "@/components/HostedEnquiryForm";
import PageHero from "@/components/PageHero";
import ResponsiveEditorialImage from "@/components/ResponsiveEditorialImage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { HandHeart } from "lucide-react";
import { getPublicAssetHref } from "@/lib/sitePaths";

const PARTNERSHIP_IMAGE_MOBILE_URL = getPublicAssetHref(
  "photos/partnership/partnership-hero-mobile.webp"
);
const PARTNERSHIP_IMAGE_TABLET_URL = getPublicAssetHref(
  "photos/partnership/partnership-hero-tablet.webp"
);
const PARTNERSHIP_IMAGE_DESKTOP_URL = getPublicAssetHref(
  "photos/partnership/partnership-hero-desktop.webp"
);
const SPONSORSHIP_DESKTOP_URL = getPublicAssetHref(
  "photos/partnership/partnership-sponsorship-desktop.webp"
);
const SPONSORSHIP_MOBILE_URL = getPublicAssetHref(
  "photos/partnership/partnership-sponsorship-mobile.webp"
);
const SPONSORSHIP_TABLET_URL = getPublicAssetHref(
  "photos/partnership/partnership-sponsorship-tablet.webp"
);

const sponsorshipFields: HostedEnquiryField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "First name",
    required: true,
    requiredMessage: "Please enter a first name.",
    autoComplete: "given-name",
    column: "half",
  },
  {
    name: "surname",
    label: "Surname",
    type: "text",
    placeholder: "Surname",
    required: true,
    requiredMessage: "Please enter a surname.",
    autoComplete: "family-name",
    column: "half",
  },
  {
    name: "organisation",
    label: "Organisation",
    type: "text",
    placeholder: "Organisation or company name",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Email address",
    required: true,
    requiredMessage: "Please enter an email address.",
    autoComplete: "email",
    column: "half",
    validate: value =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? ""
        : "Please enter a valid email address.",
  },
  {
    name: "phone",
    label: "Contact Number",
    type: "tel",
    placeholder: "Contact number",
    autoComplete: "tel",
    column: "half",
    validate: value =>
      value === "" || value.replace(/\D/g, "").length >= 7
        ? ""
        : "Please enter a valid contact number.",
  },
  {
    name: "supportArea",
    label: "Support Area",
    type: "select",
    required: true,
    requiredMessage: "Please choose a support area.",
    placeholder: "Choose a support area",
    options: [
      "Sports Sponsorship",
      "Bursary Sponsorship",
      "Facility Sponsorship",
      "General Partnership Enquiry",
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us how you would like to partner with the school.",
    required: true,
    requiredMessage: "Please enter a message.",
    validate: value =>
      value.length >= 10
        ? ""
        : "Please add a little more detail to your message.",
  },
];

export default function Partnership() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero
          title="Partnership"
          imageUrl={PARTNERSHIP_IMAGE_MOBILE_URL}
          mobileShowFullImage
          mobileAspectRatio="1080 / 1201"
          tabletImageUrl={PARTNERSHIP_IMAGE_TABLET_URL}
          tabletShowFullImage
          tabletAspectRatio="2 / 1"
          desktopImageUrl={PARTNERSHIP_IMAGE_DESKTOP_URL}
          desktopShowFullImage
          desktopAspectRatio="4 / 1"
        />

        {/* ── Intro ── */}
        <section className="py-20 bg-[#EBDAC8]">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-4 fade-up">
                Partner With Us
              </h2>
              <div className="w-12 h-0.5 bg-[#051040]/30 mx-auto mb-6 fade-up hcs-divider" />
              <div className="mx-auto w-full max-w-[44ch] text-left text-[#051040]/70 font-body leading-relaxed fade-up md:max-w-none md:text-center">
                <p>
                  His&nbsp;Church&nbsp;School values the support of the broader
                  community and business sector. By partnering with us, you
                  invest directly in the education and development of the next
                  generation of young people grounded in faith, character, and
                  excellence.
                </p>
              </div>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 fade-up sm:flex-row sm:items-center">
                <a
                  href="#sponsorship-form"
                  className="hcs-btn-primary text-center"
                >
                  SPONSOR WITH US
                </a>
                <a
                  href="mailto:secretary@hcschool.co.za?subject=Sponsorship%20Enquiry"
                  className="hcs-btn-gold text-center"
                >
                  EMAIL THE OFFICE
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sponsorship ── */}
        <section id="sponsorship" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
              <div className="fade-up order-2 hcs-split-copy lg:order-1">
                <p className="mb-3 text-center font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/62 lg:text-left">
                  Get Involved
                </p>
                <h2 className="mb-2 text-center font-display text-3xl font-black text-[#051040] md:text-4xl lg:text-left">
                  Sponsorship
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-12 bg-[#C9A84C] lg:mx-0" />
                <div className="mx-auto max-w-[44ch] space-y-4 text-left text-[#051040]/70 font-body leading-relaxed lg:mx-0 lg:max-w-none">
                  <p>
                    We invite businesses, organisations, and individuals to
                    partner with His&nbsp;Church&nbsp;School through financial
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
                    If you are interested in supporting
                    His&nbsp;Church&nbsp;School, we would love to discuss how a
                    partnership could work for you. Our school office can guide
                    you through available options and connect you with the
                    relevant leadership team.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start">
                    <a
                      href="#sponsorship-form"
                      className="hcs-btn-primary px-7"
                    >
                      Enquire About Sponsorship
                    </a>
                  </div>
                </div>
              </div>
              <div className="fade-up order-1 lg:order-2">
                <ResponsiveEditorialImage
                  className="hcs-editorial-image"
                  desktopImageUrl={SPONSORSHIP_DESKTOP_URL}
                  mobileImageUrl={SPONSORSHIP_MOBILE_URL}
                  tabletImageUrl={SPONSORSHIP_TABLET_URL}
                  alt="Learners taking part in activities supported by the school community"
                  imageClassName="object-[50%_34%]"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="sponsorship-form"
          className="scroll-mt-24 bg-[#f8f8f8] py-20"
        >
          <div className="mx-auto max-w-6xl hcs-shell">
            <HostedEnquiryForm
              buildSubmission={values => ({
                fields: {
                  firstName: values.firstName,
                  surname: values.surname,
                  organisation: values.organisation,
                  email: values.email,
                  phone: values.phone,
                  supportArea: values.supportArea,
                  message: values.message,
                },
                replyTo: values.email,
                subject: values.supportArea,
              })}
              emptyStateMessage="Online sponsorship enquiries are not available yet. Please email secretary@hcschool.co.za or call 031 701 6211 and the school office will connect you with the right person."
              enquiryType="Sponsorship"
              fields={sponsorshipFields}
              formId="sponsorship"
              intro="Complete this form and your sponsorship enquiry will be sent directly to the school office for follow-up."
              page="Partnership"
              submitLabel="SEND SPONSORSHIP ENQUIRY"
              successBody="Your sponsorship enquiry has been sent directly to the school office. We'll follow up using the details you provided."
              successIcon={
                <HandHeart
                  size={24}
                  strokeWidth={1.85}
                  className="text-[#051040]"
                />
              }
              successTitle="Sponsorship Enquiry Sent"
              title="Sponsor With Us"
            />
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
                  <h3 className="font-display text-xl font-black text-[#051040] mb-2">
                    {tier.title}
                  </h3>
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
