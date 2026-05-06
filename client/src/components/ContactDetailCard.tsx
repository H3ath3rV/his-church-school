import type { ContactDetail } from "@/content/site";

type ContactDetailCardProps = {
  item: ContactDetail;
  tone?: "light" | "dark";
  className?: string;
};

const toneStyles = {
  light: {
    surface: "",
    icon: "hcs-icon-disc hcs-icon-disc-navy mb-3 h-14 w-14 min-[900px]:mb-5 min-[900px]:h-[4.5rem] min-[900px]:w-[4.5rem]",
    label: "text-[#051040]/62",
    title: "text-[#051040]",
    value: "text-[#051040]/72",
  },
  dark: {
    surface: "",
    icon: "mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A84C] text-[#051040] shadow-[0_12px_30px_rgba(5,16,64,0.16)] min-[900px]:mb-5 min-[900px]:h-[4.5rem] min-[900px]:w-[4.5rem]",
    label: "text-white/78",
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
  const styles = toneStyles[tone];

  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={`${item.title}: ${item.value}`}
      className={`group hcs-contact-card fade-up flex h-full w-full flex-col items-center justify-start px-4 py-2.5 text-center transition-all duration-300 sm:px-5 min-[900px]:min-h-[13.25rem] min-[900px]:px-4 min-[900px]:py-6 lg:px-5 ${styles.surface} ${className}`}
    >
      <div className={styles.icon}>
        <Icon size={28} strokeWidth={2.1} />
      </div>
      <div className="mx-auto flex w-full max-w-[32rem] flex-col items-center min-[900px]:max-w-none">
        <p
          className={`mb-2 font-label text-[clamp(0.68rem,0.72vw,0.75rem)] font-bold uppercase tracking-[0.16em] ${styles.label}`}
        >
          {item.label}
        </p>
        <p
          className={`mb-1.5 max-w-[18ch] text-center font-display text-[clamp(1.22rem,1.65vw,1.56rem)] font-black leading-[1.12] tracking-[-0.01em] min-[900px]:mb-3 ${styles.title}`}
        >
          {item.title}
        </p>
        <p
          className={`mx-auto flex max-w-[32ch] items-center justify-center break-words text-center font-body text-[clamp(0.92rem,1.05vw,1rem)] leading-[1.45] [overflow-wrap:anywhere] [text-wrap:balance] min-[900px]:min-h-[3.05rem] min-[900px]:max-w-none min-[900px]:whitespace-nowrap min-[900px]:leading-[1.55] ${styles.value}`}
        >
          {item.value}
        </p>
      </div>
    </a>
  );
}
