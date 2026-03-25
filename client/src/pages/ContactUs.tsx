/* =============================================================
   HCS Contact Us Page — Platinum Polish
   Typography: Playfair Display (headings) + Inter (body/labels)
   Consistent section headings, gold rules, unified buttons
   Form: improved placeholder sizing and accessibility
   Buttons: 3 per wireframe (Application Forms, Fee Structure, School Fee Policy)
   ============================================================= */

import { useState } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, ChevronDown, Send } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getPublicAssetHref } from "@/lib/sitePaths";

const HERO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/112950987/DfvXRdX3KuuYDzjuA34tRA/hcs_worship-8Acaqw2TXSkoBWBdUJYMwh.webp";

const faqs = [
  { q: "How do I enrol my child at His Church School?", a: "Contact our school secretary by phone or email to request an application form. Once completed, submit it along with the required supporting documents to the school office." },
  { q: "What grades does His Church School offer?", a: "His Church School is a combined school offering education from Grade 1 (Primary Phase) through to Grade 12 (FET Phase). We provide a complete educational journey from primary school to matric." },
  { q: "Is His Church School a Christian school?", a: "Yes. His Church School is a private Christian school that is a ministry of His Church. Our school is founded on Biblical principles and our goal is to please God in everything we do." },
  { q: "What curriculum does the school follow?", a: "His Church School follows the CAPS curriculum from Grade 1 to Grade 12. Our NSC examinations are set and managed by SACAI and accredited by Umalusi." },
  { q: "Does the school offer sport and extra-mural activities?", a: "Yes. His Church School offers a variety of sports including swimming, athletics, soccer, netball, cross country, chess, and pickleball. We also offer leadership courses, firefighting training, and first aid certification." },
  { q: "What are the school hours?", a: "Please contact the school secretary for current school hours and term dates. Our secretary will be happy to assist you with all scheduling information." },
  { q: "How do I find out about school fees?", a: "School fee information is available on request. Please contact the school secretary by email or phone, or click the Fee Structure button below to request a copy of the current fee schedule." },
  { q: "Is the school accredited?", a: "Yes. His Church School is accredited by Umalusi (Accreditation No. 19 SCH01 00763) and is a recognised SACAI examination centre authorised to run NSC examinations for both our own and external candidates." },
];

const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-body text-[#051040] placeholder:text-[#051040]/40 focus:outline-none focus:border-[#051040] focus:ring-1 focus:ring-[#051040]/20 transition-colors bg-white";

export default function ContactUs() {
  const pageRef = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ fullName: "", surname: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:secretary@hcschool.co.za?subject=${encodeURIComponent(formData.subject || "Website Enquiry")}&body=${encodeURIComponent(`Full Name: ${formData.fullName} ${formData.surname}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
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

        {/* ── Two-column: ASK US + FAQ ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* ASK US form */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 fade-up">
                <h2 className="font-display text-3xl font-black text-[#051040] text-center mb-2">Ask Us</h2>
                <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-7" />

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                      <Send size={22} className="text-green-600" />
                    </div>
                    <h3 className="font-display text-xl font-black text-[#051040] mb-2">Message Sent!</h3>
                    <p className="text-[#051040]/60 font-body text-sm leading-relaxed">Your email client should have opened. We'll get back to you as soon as possible.</p>
                    <button onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider uppercase hover:bg-[#051040]/85 transition-colors">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" placeholder="Full Name" required value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={inputClass} />
                    <input type="text" placeholder="Surname" required value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      className={inputClass} />
                    <input type="email" placeholder="Email Address" required value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass} />
                    <input type="tel" placeholder="Contact Number" value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass} />
                    <select value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`${inputClass} ${formData.subject === "" ? "text-[#051040]/40" : "text-[#051040]"}`}>
                      <option value="" disabled>Subject</option>
                      <option value="Enrolment Enquiry">Enrolment Enquiry</option>
                      <option value="Fee Structure Request">Fee Structure Request</option>
                      <option value="Application Form Request">Application Form Request</option>
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Sport Enquiry">Sport Enquiry</option>
                      <option value="Academic Enquiry">Academic Enquiry</option>
                    </select>
                    <textarea placeholder="Message" rows={5} required value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-none`} />

                    {/* Contact details below form */}
                    <div className="space-y-2 pt-1 pb-2 border-t border-gray-100 mt-2">
                      <a href="mailto:secretary@hcschool.co.za" className="flex items-center gap-2 text-xs font-body text-[#051040]/55 hover:text-[#051040] transition-colors">
                        <Mail size={12} className="text-[#C9A84C] shrink-0" />
                        secretary@hcschool.co.za
                      </a>
                      <a href="tel:+27317016211" className="flex items-center gap-2 text-xs font-body text-[#051040]/55 hover:text-[#051040] transition-colors">
                        <Phone size={12} className="text-[#C9A84C] shrink-0" />
                        031 701 6211
                      </a>
                      <div className="flex items-center gap-2 text-xs font-body text-[#051040]/55">
                        <MapPin size={12} className="text-[#C9A84C] shrink-0" />
                        13 Drake Road, Pinetown, 3610
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button type="submit"
                        className="px-8 py-2.5 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#051040]/85 transition-colors uppercase">
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* FAQ accordion */}
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 fade-up">
                <h2 className="font-display text-3xl font-black text-[#051040] text-center mb-2">FAQ</h2>
                <div className="w-10 h-0.5 bg-[#C9A84C] mx-auto mb-7" />
                <div className="space-y-2">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-label text-xs font-semibold text-[#051040] tracking-wide pr-4 leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown size={15} className={`text-[#051040]/40 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 bg-gray-50 border-t border-gray-100">
                          <p className="text-[#051040]/65 font-body text-sm leading-relaxed pt-3">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Three pill buttons per wireframe ── */}
        <section className="py-12 bg-[#f8f8f8] border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 fade-up">
              <a href="mailto:secretary@hcschool.co.za?subject=Application Form Request"
                className="px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#051040]/85 transition-colors uppercase">
                Application Forms
              </a>
              <a href="mailto:secretary@hcschool.co.za?subject=Fee Structure Request"
                className="px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#051040]/85 transition-colors uppercase">
                Fee Structure
              </a>
              <a href={getPublicAssetHref("Language-Policy.docx")} download target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 bg-[#051040] text-white font-label text-xs font-bold rounded-full tracking-wider hover:bg-[#051040]/85 transition-colors uppercase">
                School Fee Policy
              </a>
            </div>
            <p className="text-center text-[#051040]/40 font-body text-xs mt-4 fade-up">
              Document buttons will open your email client or download the relevant file.
            </p>
          </div>
        </section>

        {/* ── Map ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="font-label text-xs font-semibold text-[#051040]/45 tracking-[0.2em] uppercase mb-3 fade-up">Pinetown, KZN</p>
              <h2 className="font-display text-3xl font-black text-[#051040] fade-up">Find Us</h2>
              <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto mt-4 fade-up" />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 fade-up">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5!2d30.8567!3d-29.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDQ5JzAwLjAiUyAzMMKwNTEnMjQuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
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
                  className="flex items-start gap-4 p-5 bg-[#f8f8f8] rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors fade-up">
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
