import Layout from "@/components/Layout";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const noticeSections = [
  {
    title: "What This Notice Covers",
    body: "This Privacy Notice explains how His Church School handles personal information shared through this website, especially through the contact and partnership enquiry forms.",
  },
  {
    title: "Information We Collect",
    body: "When you complete a website form, we may collect details such as your name, email address, phone number, organisation, subject or support area, and the message you choose to send. The website may also store the page and enquiry type connected to your submission so the school office can respond accurately.",
  },
  {
    title: "How We Use It",
    body: "Website enquiry information is used to respond to admissions questions, partnership enquiries, policy requests, school visit requests, and other direct communication initiated by you. Information submitted through the website should not be used for urgent matters or for sending highly sensitive personal information.",
  },
  {
    title: "Hosted Form Processing",
    body: "Website forms are delivered through a hosted enquiry service configured for the school. That service processes the information you submit so it can be forwarded to the school office for follow-up. Before launch, the school should ensure the live endpoint is owned and managed by the school or its approved representative.",
  },
  {
    title: "Access, Updates, and Removal Requests",
    body: "If you would like to review, correct, or request the removal of personal information you submitted through this website, please contact the school office directly. Requests will be handled by the school according to its operational and legal obligations.",
  },
];

export default function Privacy() {
  const pageRef = useScrollAnimation();

  return (
    <Layout>
      <div ref={pageRef}>
        <section className="bg-[#EEF2FB] py-20">
          <div className="mx-auto max-w-4xl hcs-shell text-center">
            <p className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.12em] text-[#051040]/68 fade-up">
              Legal
            </p>
            <h1 className="font-display text-4xl font-black text-[#051040] fade-up md:text-5xl">
              Privacy Notice
            </h1>
            <div className="mx-auto mt-4 mb-6 h-0.5 w-12 bg-[#C9A84C] fade-up hcs-divider" />
            <p className="mx-auto max-w-3xl font-body text-[1rem] leading-[1.78] text-[#051040]/74 fade-up sm:text-[1.04rem]">
              His Church School respects the personal information shared by
              families, supporters, and community members through this website.
              This notice explains what the site collects, why it is collected,
              and how to follow up with the school office.
            </p>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 hcs-shell md:auto-rows-fr md:grid-cols-2">
            {noticeSections.map((section, index) => (
              <article
                key={section.title}
                className="h-full rounded-[1.5rem] border border-[#ece7de] bg-[#f8f8f8] p-6 fade-up md:p-7"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <h2 className="mb-3 font-display text-xl font-black leading-tight text-[#051040] md:text-[22px]">
                  {section.title}
                </h2>
                <div className="mb-4 h-0.5 w-9 bg-[#C9A84C]" />
                <p className="font-body text-[0.98rem] leading-[1.72] text-[#051040]/65 sm:text-[1rem]">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
