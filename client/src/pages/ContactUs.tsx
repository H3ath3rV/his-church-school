/* =============================================================
   HCS Contact Us Page
   Sections:
   - Hero
   - Two-col: Ask Us form  |  Application Form
   - FAQ (full width accordion)
   - Documents & Policies (grouped)
   - Map
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, ChevronDown, Send, FileText, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";

const faqs = [
  { q: "How do I enrol my child at His Church School?", a: "Contact our school secretary by phone or email to request an application form. Once completed, submit it along with the required supporting documents to the school office. Our secretary will guide you through the full admissions process." },
  { q: "What grades does His Church School offer?", a: "His Church School is a combined school offering education from Grade 1 (Primary Phase) through to Grade 12 (FET Phase). We provide a complete educational journey from primary school to matric within one community." },
  { q: "Is His Church School a Christian school?", a: "Yes. His Church School is a private Christian school that is a ministry of His Church. Our school is founded on Biblical principles and our goal is to please God in everything we do — integrating faith into every aspect of learning." },
  { q: "What curriculum does the school follow?", a: "His Church School follows the CAPS curriculum from Grade 1 to Grade 12. Our NSC examinations are set and managed by SACAI and accredited by Umalusi (Accreditation No. 19 SCH01 00763)." },
  { q: "Does the school offer sport and extra-mural activities?", a: "Yes. His Church School offers a wide variety of sports including swimming, athletics, soccer, netball, cross country, chess, and table tennis. We also offer enrichment programmes including leadership courses, firefighting training, and first aid certification." },
  { q: "What are the school hours?", a: "Please contact the school secretary for current school hours and term dates. Our secretary will be happy to assist you with all scheduling information." },
  { q: "How do I find out about school fees?", a: "School fee information is available on request. Please contact the school secretary by email or phone, or use the documents section below to request a copy of the current fee schedule." },
  { q: "Is the school accredited?", a: "Yes. His Church School is accredited by Umalusi (Accreditation No. 19 SCH01 00763) and is a recognised SACAI examination centre authorised to run NSC examinations for both our own and external candidates." },
  { q: "Does the school accept late applications?", a: "Late applications are considered on a space-available basis. We encourage families to apply as early as possible to secure a place for their child. Contact the school secretary for current availability." },
  { q: "What documents are required for enrolment?", a: "Typically required documents include a certified copy of the child's birth certificate, the previous school's latest report card, proof of residence, and parent/guardian ID documents. The full list is available from the school office." },
];

const policies = [
  { label: "Application Form", subject: "Application Form Request", download: false },
  { label: "Fee Structure", subject: "Fee Structure Request", download: false },
  { label: "School Fee Policy", subject: "", download: true, file: "Language-Policy.docx" },
  { label: "Language Policy", subject: "", download: true, file: "Language-Policy.docx" },
  { label: "Admissions Policy", subject: "Admissions Policy Request", download: false },
  { label: "Code of Conduct", subject: "Code of Conduct Request", download: false },
];

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-body text-[#051040] placeholder:text-[#051040]/40 focus:outline-none focus:border-[#051040] focus:ring-1 focus:ring-[#051040]/20 transition-colors bg-white";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
      >
        <span className="font-display text-base font-black text-[#051040]">{q}</span>
        <span className={`shrink-0 w-8 h-8 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-7 pb-6 text-[#051040]/65 font-body text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function ContactUs() {
  const pageRef = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Ask Us form
  const [enquiry, setEnquiry] = useState({ fullName: "", surname: "", email: "", phone: "", subject: "", message: "" });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Application form
  const [app, setApp] = useState({
    childFirstName: "", childSurname: "", dob: "", gradeApplying: "",
    parentName: "", parentSurname: "", relationship: "", parentEmail: "", parentPhone: "",
    currentSchool: "", additionalInfo: "",
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Full Name: ${enquiry.fullName} ${enquiry.surname}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}\n\nMessage:\n${enquiry.message}`;
    window.location.href = `mailto:secretary@hcschool.co.za?subject=${encodeURIComponent(enquiry.subject || "Website Enquiry")}&body=${encodeURIComponent(body)}`;
    setEnquirySubmitted(true);
  };

  const handleAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `APPLICATION FOR ENROLMENT\n\nCHILD DETAILS\nFirst Name: ${app.childFirstName}\nSurname: ${app.childSurname}\nDate of Birth: ${app.dob}\nGrade Applying For: ${app.gradeApplying}\nCurrent School: ${app.currentSchool}\n\nPARENT / GUARDIAN DETAILS\nFull Name: ${app.parentName} ${app.parentSurname}\nRelationship: ${app.relationship}\nEmail: ${app.parentEmail}\nPhone: ${app.parentPhone}\n\nADDITIONAL INFORMATION\n${app.additionalInfo}`;
    window.location.href = `mailto:secretary@hcschool.co.za?subject=${encodeURIComponent("Application for Enrolment – " + app.childFirstName + " " + app.childSurname)}&body=${encodeURIComponent(body)}`;
    setAppSubmitted(true);
  };

  return (
    <Layout>
      <div ref={pageRef}>

        {/* ── Hero ── */}
        <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_URL})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051040] via-[#051040]/50 to-transparent" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-10 w-full">
            <p className="font-label text-xs font-semibold text-[#C9A84C] tracking-[0.2em] uppercase mb-3">His Church School</p>
            <h1 className="font-display text-5xl md:text-7xl font-black text-white">Contact Us</h1>
          </div>
        </section>

        {/* ── Two-column: Ask Us | Application Form ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* ── Ask Us ── */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 fade-up">
                <h2 className="font-display text-3xl font-black text-[#051040] text-center mb-2">Ask Us</h2>
                <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-7" />
                {enquirySubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                      <Send size={22} className="text-green-600" />
                    </div>
                    <h3 className="font-display text-xl font-black text-[#051040] mb-2">Message Sent!</h3>
                    <p className="text-[#051040]/60 font-body text-sm leading-relaxed">Your email client should have opened. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setEnquirySubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider uppercase hover:bg-[#051040]/85 transition-colors">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="space-y-3">
                    <input type="text" placeholder="Full Name" required value={enquiry.fullName}
                      onChange={(e) => setEnquiry({ ...enquiry, fullName: e.target.value })} className={inputClass} />
                    <input type="text" placeholder="Surname" required value={enquiry.surname}
                      onChange={(e) => setEnquiry({ ...enquiry, surname: e.target.value })} className={inputClass} />
                    <input type="email" placeholder="Email Address" required value={enquiry.email}
                      onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })} className={inputClass} />
                    <input type="tel" placeholder="Contact Number" value={enquiry.phone}
                      onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })} className={inputClass} />
                    <select value={enquiry.subject}
                      onChange={(e) => setEnquiry({ ...enquiry, subject: e.target.value })}
                      className={`${inputClass} ${enquiry.subject === "" ? "text-[#051040]/40" : "text-[#051040]"}`}>
                      <option value="" disabled>Subject</option>
                      <option>Enrolment Enquiry</option>
                      <option>Fee Structure Request</option>
                      <option>Application Form Request</option>
                      <option>General Enquiry</option>
                      <option>Sport Enquiry</option>
                      <option>Academic Enquiry</option>
                    </select>
                    <textarea placeholder="Message" rows={5} required value={enquiry.message}
                      onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                      className={`${inputClass} resize-none`} />
                    <div className="flex justify-end pt-1">
                      <button type="submit"
                        className="px-8 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#051040]/85 transition-colors uppercase">
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* ── Application Form ── */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 fade-up">
                <h2 className="font-display text-3xl font-black text-[#051040] text-center mb-2">Apply Now</h2>
                <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-7" />
                {appSubmitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                      <Send size={22} className="text-green-600" />
                    </div>
                    <h3 className="font-display text-xl font-black text-[#051040] mb-2">Application Submitted!</h3>
                    <p className="text-[#051040]/60 font-body text-sm leading-relaxed">Your email client should have opened with the application details. We will be in touch shortly.</p>
                    <button onClick={() => setAppSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider uppercase hover:bg-[#051040]/85 transition-colors">
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAppSubmit} className="space-y-3">
                    <p className="font-label text-xs font-bold text-[#051040]/45 tracking-[0.15em] uppercase pb-1">Child's Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" required value={app.childFirstName}
                        onChange={(e) => setApp({ ...app, childFirstName: e.target.value })} className={inputClass} />
                      <input type="text" placeholder="Surname" required value={app.childSurname}
                        onChange={(e) => setApp({ ...app, childSurname: e.target.value })} className={inputClass} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" placeholder="Date of Birth" required value={app.dob}
                        onChange={(e) => setApp({ ...app, dob: e.target.value })} className={inputClass} />
                      <select required value={app.gradeApplying}
                        onChange={(e) => setApp({ ...app, gradeApplying: e.target.value })}
                        className={`${inputClass} ${app.gradeApplying === "" ? "text-[#051040]/40" : "text-[#051040]"}`}>
                        <option value="" disabled>Grade Applying For</option>
                        {["Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"].map(g => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                    <input type="text" placeholder="Current School (if applicable)" value={app.currentSchool}
                      onChange={(e) => setApp({ ...app, currentSchool: e.target.value })} className={inputClass} />
                    <p className="font-label text-xs font-bold text-[#051040]/45 tracking-[0.15em] uppercase pt-2 pb-1">Parent / Guardian Details</p>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="First Name" required value={app.parentName}
                        onChange={(e) => setApp({ ...app, parentName: e.target.value })} className={inputClass} />
                      <input type="text" placeholder="Surname" required value={app.parentSurname}
                        onChange={(e) => setApp({ ...app, parentSurname: e.target.value })} className={inputClass} />
                    </div>
                    <select value={app.relationship}
                      onChange={(e) => setApp({ ...app, relationship: e.target.value })}
                      className={`${inputClass} ${app.relationship === "" ? "text-[#051040]/40" : "text-[#051040]"}`}>
                      <option value="" disabled>Relationship to Child</option>
                      <option>Mother</option>
                      <option>Father</option>
                      <option>Guardian</option>
                      <option>Other</option>
                    </select>
                    <input type="email" placeholder="Email Address" required value={app.parentEmail}
                      onChange={(e) => setApp({ ...app, parentEmail: e.target.value })} className={inputClass} />
                    <input type="tel" placeholder="Contact Number" required value={app.parentPhone}
                      onChange={(e) => setApp({ ...app, parentPhone: e.target.value })} className={inputClass} />
                    <textarea placeholder="Additional Information (optional)" rows={3} value={app.additionalInfo}
                      onChange={(e) => setApp({ ...app, additionalInfo: e.target.value })}
                      className={`${inputClass} resize-none`} />
                    <div className="flex justify-end pt-1">
                      <button type="submit"
                        className="px-8 py-2.5 bg-[#C9A84C] text-[#051040] font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#d7b85d] transition-colors uppercase">
                        Submit Application
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 bg-[#f8f8f8] scroll-mt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-black text-[#051040] fade-up">Frequently Asked Questions</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 mb-4 fade-up" />
              <p className="text-[#051040]/45 font-body text-sm fade-up">Everything you need to know about His Church School</p>
            </div>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div key={i} className="fade-up" style={{ transitionDelay: `${i * 40}ms` }}>
                  <FaqItem q={item.q} a={item.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Documents & Policies ── */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Downloads</p>
              <h2 className="font-display text-3xl font-black text-[#051040] fade-up">School Documents &amp; Policies</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 fade-up">
              {policies.map((doc) => (
                doc.download ? (
                  <a key={doc.label}
                    href={getPublicAssetHref(doc.file!)}
                    download target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 bg-[#f8f8f8] rounded-xl border border-gray-100 hover:bg-[#051040] hover:text-white hover:border-[#051040] transition-all group">
                    <Download size={14} className="text-[#C9A84C] shrink-0 group-hover:text-[#C9A84C]" />
                    <span className="font-label text-xs font-bold text-[#051040] group-hover:text-white tracking-wide uppercase">{doc.label}</span>
                  </a>
                ) : (
                  <a key={doc.label}
                    href={`mailto:secretary@hcschool.co.za?subject=${encodeURIComponent(doc.subject)}`}
                    className="flex items-center gap-3 px-5 py-4 bg-[#f8f8f8] rounded-xl border border-gray-100 hover:bg-[#051040] hover:text-white hover:border-[#051040] transition-all group">
                    <FileText size={14} className="text-[#C9A84C] shrink-0 group-hover:text-[#C9A84C]" />
                    <span className="font-label text-xs font-bold text-[#051040] group-hover:text-white tracking-wide uppercase">{doc.label}</span>
                  </a>
                )
              ))}
            </div>
            <p className="text-center text-[#051040]/35 font-body text-xs mt-5 fade-up">
              Document buttons will open your email client or download the relevant file directly.
            </p>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-20 bg-[#f8f8f8]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Pinetown, KZN</p>
              <h2 className="font-display text-3xl font-black text-[#051040] fade-up">Find Us</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d30.8567!3d-29.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ5JzAwLjAiUyAzMMKwNTEnMjQuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%" height="400" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="His Church School Location"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {[
                { icon: <Mail size={20} />, label: "Email", value: "secretary@hcschool.co.za", href: "mailto:secretary@hcschool.co.za" },
                { icon: <Phone size={20} />, label: "Phone", value: "031 701 6211", href: "tel:+27317016211" },
                { icon: <MapPin size={20} />, label: "Address", value: "13 Drake Road, Pinetown, KZN 3610", href: "https://maps.google.com/?q=13+Drake+Road+Pinetown" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors fade-up">
                  <div className="w-10 h-10 rounded-full bg-[#051040] flex items-center justify-center text-[#C9A84C] shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-label text-xs font-bold text-[#051040] tracking-wider uppercase mb-0.5">{item.label}</p>
                    <p className="font-body text-sm text-[#051040]/65">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
