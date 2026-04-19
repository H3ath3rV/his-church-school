import type { ContactDetail } from "@/content/site";

type ContactDetailCardProps = {
  item: ContactDetail;
  tone?: "light" | "dark";
  className?: string;
};

const toneStyles = {
  light: {
    surface: "",
    icon: "hcs-icon-disc hcs-icon-disc-navy mb-4 h-16 w-16 md:mb-6 md:h-[4.5rem] md:w-[4.5rem]",
    label: "text-[#051040]/48",
    title: "text-[#051040]",
    value: "text-[#051040]/72",
  },
  dark: {
    surface: "",
    icon: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A84C] text-[#051040] shadow-[0_12px_30px_rgba(5,16,64,0.16)] md:mb-6 md:h-[4.5rem] md:w-[4.5rem]",
    label: "text-white/48",
    title: "text-white",
    value: "text-white/82",
  },
} as const;

export default function ContactDetailCard({
  item,
  tone = "light",
  className = "",
}: ContactDetailCardProps) {
  const Icon = item.icon;
  const isExternal = item.href.startsWith("http");
  const keepValueOnOneLine =
    item.href.startsWith("tel:") || item.href.startsWith("mailto:");
  const styles = toneStyles[tone];

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${item.title}: ${item.value}`}
      className={`group hcs-contact-card fade-up flex h-full w-full flex-col items-center justify-start px-5 py-4 text-center transition-all duration-300 md:min-h-[14.25rem] md:px-6 md:py-7 ${styles.surface} ${className}`}
    >
      <div className={styles.icon}>
        <Icon size={28} strokeWidth={2.1} />
      </div>
      <div className="w-full max-w-[22rem] lg:max-w-none">
        <p
          className={`mb-1.5 font-label text-[0.72rem] font-bold uppercase tracking-[0.16em] ${styles.label}`}
        >
          {item.label}
        </p>
        <p
          className={`mb-2 font-display text-[1.22rem] font-black leading-[1.15] tracking-[-0.01em] min-[360px]:text-[1.32rem] sm:mb-3 sm:text-[1.38rem] lg:whitespace-nowrap lg:text-[1.42rem] xl:text-[1.56rem] ${styles.title}`}
        >
          {item.title}
        </p>
        <p
          className={`mx-auto font-body text-[0.98rem] leading-[1.62] sm:text-[1rem] sm:leading-[1.68] lg:text-[0.95rem] xl:text-[1rem] ${
            keepValueOnOneLine
              ? "max-w-none whitespace-nowrap"
              : "max-w-[24ch] break-words [overflow-wrap:anywhere] lg:max-w-none lg:whitespace-nowrap"
          } ${styles.value}`}
        >
          {item.value}
        </p>
      </div>
    </a>
  );
}
