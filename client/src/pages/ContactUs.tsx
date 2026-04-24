import { Fragment, useId, useState } from "react";
import ContactDetailCard from "@/components/ContactDetailCard";
import HostedEnquiryForm, {
  type HostedEnquiryField,
} from "@/components/HostedEnquiryForm";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Mail, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";
import { CONTACT_DETAILS } from "@/content/site";

const HERO_URL = getPublicAssetHref("photos/contact/contact-hero-mobile.webp");
const HERO_TABLET_URL = getPublicAssetHref(
  "photos/contact/contact-hero-tablet.webp"
);
const HERO_DESKTOP_URL = getPublicAssetHref(
  "photos/contact/contact-hero-desktop.webp"
);
const CONTACT_MAP_URL = getPublicAssetHref("maps/contact-map-1800.webp");
const CONTACT_MAP_PIN_URL = getPublicAssetHref("maps/contact-map-pin-only.png");

const faqs = [
  {
    q: "How do I enrol my child at His\u00A0Church\u00A0School?",
    a: "Contact our school secretary by phone or email to request an application form. Once completed, submit it along with the required supporting documents to the school office. Our secretary will guide you through the full admissions process.",
  },
  {
    q: "What grades does His\u00A0Church\u00A0School offer?",
    a: "His\u00A0Church\u00A0School is a combined school offering education from Grade 1 (Primary Phase) through to Grade 12 (FET Phase). We provide a complete educational journey from primary school to matric within one community.",
  },
  {
    q: "Is His\u00A0Church\u00A0School a Christian school?",
    a: "Yes. His\u00A0Church\u00A0School is a private Christian school that is a ministry of His Church. Our school is founded on Biblical principles, and our goal is to please God in everything we do by integrating faith into every aspect of learning.",
  },
  {
    q: "What curriculum does the school follow?",
    a: "His\u00A0Church\u00A0School follows the CAPS curriculum from Grade 1 to Grade 12. Our NSC examinations are set and managed by SACAI and accredited by Umalusi (Accreditation No. 19 SCH01 00763).",
  },
  {
    q: "Does the school offer sport and extra-mural activities?",
    a: "Yes. His\u00A0Church\u00A0School offers a wide variety of sports including swimming, athletics, soccer, netball, cross country, chess, and table tennis. We also offer enrichment programmes including leadership courses, firefighting training, and first aid certification.",
  },
  {
    q: "What are the school hours?",
    a: "Please contact the school secretary for current school hours and term dates. Our secretary will be happy to assist you with all scheduling information.",
  },
  {
    q: "How do I find out about school fees?",
    a: "School fee information is available on request. Please contact the school secretary by email or phone, or use the documents section below to request a copy of the current fee schedule.",
  },
  {
    q: "Is the school accredited?",
    a: "Yes. His\u00A0Church\u00A0School is accredited by Umalusi (Accreditation No. 19 SCH01 00763) and is a recognised SACAI examination centre authorised to run NSC examinations for both our own and external candidates.",
  },
  {
    q: "Does the school accept late applications?",
    a: "Late applications are considered on a space-available basis. We encourage families to apply as early as possible to secure a place for their child. Contact the school secretary for current availability.",
  },
  {
    q: "What documents are required for enrolment?",
    a: "Typically required documents include a certified copy of the child's birth certificate, the previous school's latest report card, proof of residence, and parent/guardian ID documents. The full list is available from the school office.",
  },
];

const policyDownloads = [
  { label: "Language Policy", pdfFile: "downloads/policies/Language-Policy.pdf" },
  {
    label: "Admissions Policy",
    pdfFile: "downloads/policies/Admissions-Policy.pdf",
  },
  { label: "Code of Conduct", pdfFile: "downloads/policies/Code-of-Conduct.pdf" },
];

const cardSurfaceClass =
  "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden";

const contactFields: HostedEnquiryField[] = [
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
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Email address",
    required: true,
    requiredMessage: "Please enter an email address.",
    autoComplete: "email",
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
    validate: value =>
      value === "" || value.replace(/\D/g, "").length >= 7
        ? ""
        : "Please enter a valid contact number.",
  },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    required: true,
    requiredMessage: "Please choose a subject.",
    placeholder: "Choose a subject",
    options: [
      "Enrolment Enquiry",
      "Fee Structure Request",
      "Application Form Request",
      "General Enquiry",
      "Sport Enquiry",
      "Academic Enquiry",
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Message",
    required: true,
    requiredMessage: "Please enter a message.",
    validate: value =>
      value.length >= 10
        ? ""
        : "Please add a little more detail to your message.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = `${panelId}-button`;

  return (
    <div className={cardSurfaceClass}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left"
        aria-expanded={open}
        aria-controls={panelId}
        id={buttonId}
      >
        <span className="font-display text-base font-black text-[#051040]">
          {q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2v10M2 7h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="px-7 pb-6 pt-0 font-body text-[0.98rem] leading-[1.72] text-[#051040]/72 sm:text-[1rem]"
        >
          <div className="border-t border-gray-200 pt-4">{a}</div>
        </div>
      )}
    </div>
  );
}

export default function ContactUs() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero
          title="Contact Us"
          imageUrl={HERO_URL}
          mobileShowFullImage
          mobileAspectRatio="1080 / 1201"
          tabletImageUrl={HERO_TABLET_URL}
          tabletShowFullImage
          tabletAspectRatio="2 / 1"
          desktopImageUrl={HERO_DESKTOP_URL}
          desktopShowFullImage
          desktopAspectRatio="4 / 1"
          imagePosition={{ desktop: "0% 10%" }}
          imageSize={{ desktop: "1760px" }}
        />

        {/* ── Ask Us ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="mx-auto">
              <HostedEnquiryForm
                buildSubmission={values => ({
                  fields: {
                    firstName: values.firstName,
                    surname: values.surname,
                    email: values.email,
                    phone: values.phone,
                    subject: values.subject,
                    message: values.message,
                  },
                  replyTo: values.email,
                  subject: values.subject,
                })}
                emptyStateMessage="Online enquiries are not available yet. Please email secretary@hcschool.co.za or call 031 701 6211 and the school office will assist you directly."
                enquiryType="General Enquiry"
                fields={contactFields}
                formId="contact"
                intro="Complete this form and your enquiry will be sent to the school office for follow-up."
                page="Contact Us"
                submitLabel="SEND ENQUIRY"
                successBody="Your enquiry has been sent to the school office. We'll reply using the email address you provided as soon as possible."
                successIcon={
                  <Mail
                    size={24}
                    strokeWidth={1.85}
                    className="text-[#051040]"
                  />
                }
                successTitle="Enquiry Sent"
                title="Ask Us"
              />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] fade-up">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-6 fade-up hcs-divider" />
              <p className="font-body text-[0.98rem] text-[#051040]/68 fade-up sm:text-[1rem]">
                Everything you need to know about His&nbsp;Church&nbsp;School
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className="fade-up"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Documents & Policies ── */}
        <section id="policies" className="bg-white py-20 scroll-mt-20 sm:py-24">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <p className="font-label text-[0.82rem] font-semibold text-[#8D93A8] tracking-[0.16em] uppercase mb-4 fade-up">
                Downloads
              </p>
              <h2 className="font-display text-4xl font-black text-[#051040] fade-up md:text-[2.65rem]">
                School Documents &amp; Policies
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-6 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-5 fade-up md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
              {policyDownloads.map(doc => (
                <a
                  key={doc.label}
                  href={getPublicAssetHref(doc.pdfFile)}
                  download
                  className="group flex min-h-[112px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#051040] hover:bg-[#051040] hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
                  aria-label={`Download ${doc.label} as a PDF`}
                >
                  <span className="flex max-w-[18rem] items-center justify-center gap-3.5">
                    <Download
                      size={20}
                      className="text-[#C9A84C] shrink-0 group-hover:text-[#C9A84C]"
                    />
                    <span className="font-label text-[0.79rem] font-bold uppercase tracking-[0.1em] text-[#051040] group-hover:text-white">
                      {doc.label}
                    </span>
                  </span>
                </a>
              ))}
            </div>
            <p className="mx-auto mt-9 max-w-4xl text-center font-body text-[1rem] leading-[1.72] text-[#051040]/72 fade-up sm:text-[1.04rem]">
              Need an application form or fee structure? Contact the school
              office and we'll send it through.
            </p>
          </div>
        </section>

        {/* ── Find Us ── */}
        <section
          id="find-us"
          className="relative overflow-hidden bg-[#051040] py-20 fade-up scroll-mt-20 sm:py-24 lg:min-h-[34rem] lg:py-16"
        >
          <div className="absolute inset-0 opacity-12" aria-hidden="true">
            <picture className="block h-full w-full">
              <img
                src={CONTACT_MAP_URL}
                alt=""
                width="1800"
                height="720"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </picture>
            <img
              src={CONTACT_MAP_PIN_URL}
              alt=""
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
              className="absolute left-1/2 top-[14%] h-[4.5rem] w-auto -translate-x-1/2"
            />
          </div>
          <div className="absolute inset-0 bg-[#051040]/18" />

          <div className="relative mx-auto max-w-7xl hcs-shell lg:flex lg:min-h-[calc(34rem-8rem)] lg:flex-col lg:justify-center">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-10">
              <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-4 fade-up">
                Visit Our Campus
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-5 fade-up">
                Find Us
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-5 fade-up hcs-divider" />
              <p className="mx-auto max-w-[34rem] font-body text-[1rem] leading-[1.72] text-white/72 fade-up sm:max-w-[38rem] sm:text-[1.04rem] xl:max-w-[42rem]">
                Contact the school office, speak to our team, or plan a visit to
                campus.
              </p>
            </div>

            <div className="mx-auto grid grid-cols-1 gap-4 md:max-w-[72rem] md:grid-cols-[minmax(0,18rem)_auto_minmax(0,18rem)_auto_minmax(0,18rem)] md:items-start md:justify-items-center md:justify-between md:gap-4 lg:max-w-[76rem] lg:grid-cols-[minmax(0,20.5rem)_auto_minmax(0,20.5rem)_auto_minmax(0,20.5rem)] lg:gap-8">
              {CONTACT_DETAILS.map((item, index) => (
                <Fragment key={item.label}>
                  <ContactDetailCard item={item} tone="dark" />
                  {index < CONTACT_DETAILS.length - 1 ? (
                    <span
                      className="pointer-events-none hidden h-16 w-px self-center bg-white/14 md:block lg:h-24"
                      aria-hidden="true"
                    />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
