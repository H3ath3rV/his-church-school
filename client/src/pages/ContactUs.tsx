import { Fragment, useId, useState } from "react";
import ContactDetailCard from "@/components/ContactDetailCard";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Mail, Download, ChevronDown } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";
import {
  buildMailtoHref,
  CONTACT_DETAILS,
  SITE_EMAIL_ADDRESS,
} from "@/content/site";

const HERO_URL = getPublicAssetHref("photos/contact/contact-hero.jpg");

const faqs = [
  {
    q: "How do I enrol my child at His Church School?",
    a: "Contact our school secretary by phone or email to request an application form. Once completed, submit it along with the required supporting documents to the school office. Our secretary will guide you through the full admissions process.",
  },
  {
    q: "What grades does His Church School offer?",
    a: "His Church School is a combined school offering education from Grade 1 (Primary Phase) through to Grade 12 (FET Phase). We provide a complete educational journey from primary school to matric within one community.",
  },
  {
    q: "Is His Church School a Christian school?",
    a: "Yes. His Church School is a private Christian school that is a ministry of His Church. Our school is founded on Biblical principles, and our goal is to please God in everything we do by integrating faith into every aspect of learning.",
  },
  {
    q: "What curriculum does the school follow?",
    a: "His Church School follows the CAPS curriculum from Grade 1 to Grade 12. Our NSC examinations are set and managed by SACAI and accredited by Umalusi (Accreditation No. 19 SCH01 00763).",
  },
  {
    q: "Does the school offer sport and extra-mural activities?",
    a: "Yes. His Church School offers a wide variety of sports including swimming, athletics, soccer, netball, cross country, chess, and table tennis. We also offer enrichment programmes including leadership courses, firefighting training, and first aid certification.",
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
    a: "Yes. His Church School is accredited by Umalusi (Accreditation No. 19 SCH01 00763) and is a recognised SACAI examination centre authorised to run NSC examinations for both our own and external candidates.",
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

type PolicyDownload = { label: string; file: string };

const policyDownloads = [
  {
    label: "Language Policy",
    file: "downloads/policies/Language-Policy.docx",
  },
  {
    label: "Admission Policy",
    file: "downloads/policies/Admission-Policy.docx",
  },
  {
    label: "Code of Conduct",
    file: "downloads/policies/Code-of-Conduct.docx",
  },
] satisfies PolicyDownload[];

const inputClass =
  "w-full min-h-[52px] rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-body text-[#051040] placeholder:text-[#051040]/55 transition-colors focus:border-[#051040] focus:outline-none focus:ring-1 focus:ring-[#051040]/20";
const fieldLabelClass =
  "px-1 font-label text-[0.78rem] font-bold uppercase tracking-[0.12em] text-[#051040]/70";
const cardSurfaceClass =
  "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden";

const initialEnquiry = {
  firstName: "",
  surname: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

type EnquiryField = keyof typeof initialEnquiry;
type EnquiryState = typeof initialEnquiry;
type EnquiryErrors = Partial<Record<EnquiryField, string>>;

function validateEnquiryField(field: EnquiryField, value: string) {
  const trimmed = value.trim();

  switch (field) {
    case "firstName":
      return trimmed ? "" : "Please enter a first name.";
    case "surname":
      return trimmed ? "" : "Please enter a surname.";
    case "email":
      if (!trimmed) return "Please enter an email address.";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? ""
        : "Please enter a valid email address.";
    case "phone":
      if (!trimmed) return "";
      return trimmed.replace(/\D/g, "").length >= 7
        ? ""
        : "Please enter a valid contact number.";
    case "subject":
      return trimmed ? "" : "Please choose a subject.";
    case "message":
      if (!trimmed) return "Please enter a message.";
      return trimmed.length >= 10
        ? ""
        : "Please add a little more detail to your message.";
    default:
      return "";
  }
}

function validateEnquiry(enquiry: EnquiryState) {
  const errors: EnquiryErrors = {};

  (Object.keys(enquiry) as EnquiryField[]).forEach(field => {
    const error = validateEnquiryField(field, enquiry[field]);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

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

  // Ask Us form
  const [enquiry, setEnquiry] = useState<EnquiryState>(initialEnquiry);
  const [enquiryErrors, setEnquiryErrors] = useState<EnquiryErrors>({});
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<EnquiryField, boolean>>
  >({});
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const updateFieldError = (field: EnquiryField, draft: EnquiryState) => {
    const error = validateEnquiryField(field, draft[field]);

    setEnquiryErrors(current => {
      const next = { ...current };

      if (error) next[field] = error;
      else delete next[field];

      return next;
    });
  };

  const handleFieldChange = (field: EnquiryField, value: string) => {
    const nextEnquiry = { ...enquiry, [field]: value };
    setEnquiry(nextEnquiry);

    if (touchedFields[field] || enquiryErrors[field]) {
      updateFieldError(field, nextEnquiry);
    }
  };

  const handleFieldBlur = (field: EnquiryField) => {
    setTouchedFields(current => ({ ...current, [field]: true }));
    updateFieldError(field, enquiry);
  };

  const getFieldClass = (field: EnquiryField, extraClass = "") => {
    const hasError = Boolean(touchedFields[field] && enquiryErrors[field]);

    return `${inputClass} ${
      hasError
        ? "border-[#C94A4A] focus:border-[#C94A4A] focus:ring-[#C94A4A]/15"
        : ""
    } ${extraClass}`.trim();
  };
  const getFieldErrorId = (field: EnquiryField) => `${field}-error`;

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateEnquiry(enquiry);

    if (Object.keys(errors).length > 0) {
      setEnquiryErrors(errors);
      setTouchedFields({
        firstName: true,
        surname: true,
        email: true,
        phone: true,
        subject: true,
        message: true,
      });
      return;
    }

    const bodyLines = [
      `Name: ${enquiry.firstName} ${enquiry.surname}`,
      `Email: ${enquiry.email}`,
      enquiry.phone ? `Phone: ${enquiry.phone}` : null,
      `Subject: ${enquiry.subject}`,
      "",
      "Message:",
      enquiry.message,
    ].filter(Boolean) as string[];

    const body = bodyLines.join("\n");
    window.location.href = buildMailtoHref(enquiry.subject, body);
    setEnquiryErrors({});
    setEnquirySubmitted(true);
  };

  return (
    <Layout>
      <div ref={pageRef}>
        {/* ── Hero ── */}
        <PageHero title="Contact Us" imageUrl={HERO_URL} />

        {/* ── Ask Us ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto hcs-shell">
            <div className="mx-auto">
              {/* ── Ask Us ── */}
              <div className={`${cardSurfaceClass} p-6 fade-up sm:p-7 md:p-8`}>
                <h2 className="font-display text-3xl font-black text-[#051040] text-center mb-2">
                  Ask Us
                </h2>
                <div className="mx-auto mb-6 h-0.5 w-10 bg-[#C9A84C]" />
                {enquirySubmitted ? (
                  <div
                    className="mx-auto flex max-w-3xl flex-col items-center py-4 text-center sm:py-6"
                    aria-live="polite"
                  >
                    <div className="mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#C9A84C] sm:h-20 sm:w-20">
                      <Mail
                        size={24}
                        strokeWidth={1.85}
                        className="text-[#051040]"
                      />
                    </div>
                    <h3 className="font-display text-[1.9rem] font-black leading-none text-[#051040] sm:text-[2.2rem]">
                      Email Draft Ready
                    </h3>
                    <div className="mx-auto mt-3 max-w-xl space-y-1.5">
                      <p className="font-body text-[0.98rem] leading-[1.72] text-[#051040]/68 sm:text-[1rem]">
                        We&apos;ve prepared your enquiry for email.
                      </p>
                      <p className="font-body text-[0.98rem] leading-[1.72] text-[#051040]/68 sm:text-[1rem]">
                        If it didn&apos;t open automatically, send it to{" "}
                        <a
                          href={buildMailtoHref()}
                          className="font-semibold text-[#051040] underline underline-offset-4"
                        >
                          {SITE_EMAIL_ADDRESS}
                        </a>
                        .
                      </p>
                    </div>
                    <p className="mt-2 font-body text-[0.92rem] leading-[1.65] text-[#051040]/55 sm:text-[0.96rem]">
                      Once sent, our school office will get back to you as soon
                      as possible.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEnquirySubmitted(false);
                        setEnquiry(initialEnquiry);
                        setEnquiryErrors({});
                        setTouchedFields({});
                      }}
                      className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#051040] px-6 py-3 font-label text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#051040]/85"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleEnquirySubmit}
                    className="space-y-4 md:space-y-5"
                  >
                    <p className="rounded-2xl bg-[#EEF2FB] px-4 py-4 font-body text-[0.98rem] leading-[1.72] text-[#051040]/70 md:px-5 sm:text-[1rem]">
                      Submitting this form opens your email app with a
                      pre-filled draft to the school office.
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-first-name"
                          className={fieldLabelClass}
                        >
                          First Name
                        </label>
                        <input
                          id="contact-first-name"
                          type="text"
                          placeholder="First name"
                          required
                          value={enquiry.firstName}
                          onChange={e =>
                            handleFieldChange("firstName", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("firstName")}
                          className={getFieldClass("firstName")}
                          autoComplete="given-name"
                          aria-invalid={
                            touchedFields.firstName && enquiryErrors.firstName
                              ? true
                              : undefined
                          }
                          aria-describedby={
                            touchedFields.firstName && enquiryErrors.firstName
                              ? getFieldErrorId("firstName")
                              : undefined
                          }
                        />
                        {touchedFields.firstName && enquiryErrors.firstName ? (
                          <p
                            id={getFieldErrorId("firstName")}
                            className="px-1 text-sm font-body text-[#C94A4A]"
                          >
                            {enquiryErrors.firstName}
                          </p>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-surname"
                          className={fieldLabelClass}
                        >
                          Surname
                        </label>
                        <input
                          id="contact-surname"
                          type="text"
                          placeholder="Surname"
                          required
                          value={enquiry.surname}
                          onChange={e =>
                            handleFieldChange("surname", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("surname")}
                          className={getFieldClass("surname")}
                          autoComplete="family-name"
                          aria-invalid={
                            touchedFields.surname && enquiryErrors.surname
                              ? true
                              : undefined
                          }
                          aria-describedby={
                            touchedFields.surname && enquiryErrors.surname
                              ? getFieldErrorId("surname")
                              : undefined
                          }
                        />
                        {touchedFields.surname && enquiryErrors.surname ? (
                          <p
                            id={getFieldErrorId("surname")}
                            className="px-1 text-sm font-body text-[#C94A4A]"
                          >
                            {enquiryErrors.surname}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className={fieldLabelClass}
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Email address"
                        required
                        value={enquiry.email}
                        onChange={e =>
                          handleFieldChange("email", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("email")}
                        className={getFieldClass("email")}
                        autoComplete="email"
                        aria-invalid={
                          touchedFields.email && enquiryErrors.email
                            ? true
                            : undefined
                        }
                        aria-describedby={
                          touchedFields.email && enquiryErrors.email
                            ? getFieldErrorId("email")
                            : undefined
                        }
                      />
                      {touchedFields.email && enquiryErrors.email ? (
                        <p
                          id={getFieldErrorId("email")}
                          className="px-1 text-sm font-body text-[#C94A4A]"
                        >
                          {enquiryErrors.email}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-phone"
                        className={fieldLabelClass}
                      >
                        Contact Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Contact number"
                        value={enquiry.phone}
                        onChange={e =>
                          handleFieldChange("phone", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("phone")}
                        className={getFieldClass("phone")}
                        autoComplete="tel"
                        aria-invalid={
                          touchedFields.phone && enquiryErrors.phone
                            ? true
                            : undefined
                        }
                        aria-describedby={
                          touchedFields.phone && enquiryErrors.phone
                            ? getFieldErrorId("phone")
                            : undefined
                        }
                      />
                      {touchedFields.phone && enquiryErrors.phone ? (
                        <p
                          id={getFieldErrorId("phone")}
                          className="px-1 text-sm font-body text-[#C94A4A]"
                        >
                          {enquiryErrors.phone}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-subject"
                        className={fieldLabelClass}
                      >
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          id="contact-subject"
                          required
                          value={enquiry.subject}
                          onChange={e =>
                            handleFieldChange("subject", e.target.value)
                          }
                          onBlur={() => handleFieldBlur("subject")}
                          className={`${getFieldClass("subject", "appearance-none pr-12")} ${enquiry.subject === "" ? "text-[#051040]/70" : "text-[#051040]"}`}
                          aria-invalid={
                            touchedFields.subject && enquiryErrors.subject
                              ? true
                              : undefined
                          }
                          aria-describedby={
                            touchedFields.subject && enquiryErrors.subject
                              ? getFieldErrorId("subject")
                              : undefined
                          }
                        >
                          <option value="" disabled>
                            Choose a subject
                          </option>
                          <option>Enrolment Enquiry</option>
                          <option>Fee Structure Request</option>
                          <option>Application Form Request</option>
                          <option>General Enquiry</option>
                          <option>Sport Enquiry</option>
                          <option>Academic Enquiry</option>
                        </select>
                        <ChevronDown
                          size={20}
                          strokeWidth={1.8}
                          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#051040]/70"
                        />
                      </div>
                      {touchedFields.subject && enquiryErrors.subject ? (
                        <p
                          id={getFieldErrorId("subject")}
                          className="px-1 text-sm font-body text-[#C94A4A]"
                        >
                          {enquiryErrors.subject}
                        </p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-message"
                        className={fieldLabelClass}
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        placeholder="Message"
                        rows={5}
                        required
                        value={enquiry.message}
                        onChange={e =>
                          handleFieldChange("message", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("message")}
                        className={getFieldClass(
                          "message",
                          "min-h-[168px] resize-none"
                        )}
                        aria-invalid={
                          touchedFields.message && enquiryErrors.message
                            ? true
                            : undefined
                        }
                        aria-describedby={
                          touchedFields.message && enquiryErrors.message
                            ? getFieldErrorId("message")
                            : undefined
                        }
                      />
                      {touchedFields.message && enquiryErrors.message ? (
                        <p
                          id={getFieldErrorId("message")}
                          className="px-1 text-sm font-body text-[#C94A4A]"
                        >
                          {enquiryErrors.message}
                        </p>
                      ) : null}
                      <div className="pt-1">
                        <button
                          type="submit"
                          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#051040] px-5 py-3 text-center font-label text-[0.8rem] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#051040]/85"
                        >
                          OPEN EMAIL DRAFT
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
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
              <p className="font-body text-[0.98rem] text-[#051040]/60 fade-up sm:text-[1rem]">
                Everything you need to know about His Church School
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
        <section id="policies" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto hcs-shell">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.12em] uppercase mb-3 fade-up">
                Downloads
              </p>
              <h2 className="font-display text-3xl font-black text-[#051040] fade-up">
                School Documents &amp; Policies
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up hcs-divider" />
            </div>
            <div className="mx-auto grid max-w-[42rem] grid-cols-1 gap-5 fade-up md:max-w-[54rem] md:grid-cols-2 xl:max-w-none xl:grid-cols-3">
              {policyDownloads.map(doc => (
                <a
                  key={doc.label}
                  href={getPublicAssetHref(doc.file)}
                  download
                  className="group flex min-h-[104px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#051040] hover:bg-[#051040] hover:text-white hover:shadow-md"
                  aria-label={`Download ${doc.label}`}
                >
                  <div className="flex max-w-[18rem] items-center justify-center gap-3.5 text-center">
                    <Download
                      size={20}
                      className="text-[#C9A84C] shrink-0 group-hover:text-[#C9A84C]"
                    />
                    <span className="font-label text-[0.79rem] font-bold uppercase tracking-[0.1em] text-[#051040] group-hover:text-white">
                      {doc.label}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-center font-body text-[0.98rem] leading-[1.7] text-[#051040]/52 fade-up sm:text-[1rem]">
              Need an application form or fee structure? Contact the school
              office and we&apos;ll send it through.
            </p>
          </div>
        </section>

        {/* ── Find Us ── */}
        <section className="relative overflow-hidden bg-[#051040] py-20 fade-up sm:py-24 lg:min-h-[34rem] lg:py-16">
          <div className="absolute inset-0 opacity-30 blur-[1px]">
            <div
              className="h-full w-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${getPublicAssetHref(
                  "maps/contact-map-pin-only.png"
                )}), url(${getPublicAssetHref("maps/contact-map.jpg")})`,
                backgroundPosition: "50% 14%, center",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundSize: "4.5rem auto, cover",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-[#051040]/74" />

          <div className="relative mx-auto max-w-7xl hcs-shell lg:flex lg:min-h-[calc(34rem-8rem)] lg:flex-col lg:justify-center">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 lg:mb-10">
              <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.12em] uppercase mb-4 fade-up">
                Visit Our Campus
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-5 fade-up">
                Find Us
              </h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mb-5 fade-up hcs-divider" />
              <p className="mx-auto max-w-[34rem] font-body text-[1rem] leading-[1.72] text-white/68 fade-up sm:max-w-[38rem] sm:text-[1.04rem] xl:max-w-[42rem]">
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
