import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { getPublicAssetHref } from "@/lib/sitePaths";

export type ContactDetail = {
  icon: LucideIcon;
  label: string;
  title: string;
  value: string;
  href: string;
};

export type FooterGalleryImage = {
  src: string;
  objectPosition?: string;
};

export const SITE_EMAIL_ADDRESS = "secretary@hcschool.co.za";
export const SITE_EMAIL_HREF = `mailto:${SITE_EMAIL_ADDRESS}`;
export const SITE_PHONE_DISPLAY = "031 701 6211";
export const SITE_PHONE_HREF = "tel:+27317016211";
export const SITE_ADDRESS_DISPLAY = "13 Drake Road, Pinetown, 3610";
export const SITE_ADDRESS_MAP_HREF =
  "https://maps.google.com/?q=13+Drake+Road+Pinetown";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/hischurchschool",
  facebook: "https://www.facebook.com/hischurchschool",
} as const;

export const CREST_URL = getPublicAssetHref("branding/hcs-crest.png");
export const TARTAN_URL = getPublicAssetHref("branding/hcs-tartan.png");

export const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: Mail,
    label: "Email",
    title: "Send us a message",
    value: SITE_EMAIL_ADDRESS,
    href: SITE_EMAIL_HREF,
  },
  {
    icon: Phone,
    label: "Phone",
    title: "Call our office",
    value: SITE_PHONE_DISPLAY,
    href: SITE_PHONE_HREF,
  },
  {
    icon: MapPin,
    label: "Address",
    title: "Visit our campus",
    value: SITE_ADDRESS_DISPLAY,
    href: SITE_ADDRESS_MAP_HREF,
  },
];

export const FOOTER_GALLERY_IMAGES: FooterGalleryImage[] = [
  {
    src: getPublicAssetHref("photos/footer-strip/strip-01-prayer.webp"),
    objectPosition: "50% 35%",
  },
  { src: getPublicAssetHref("photos/footer-strip/strip-02-writing.webp") },
  {
    src: getPublicAssetHref("photos/footer-strip/strip-03-teamwork-board.webp"),
    objectPosition: "50% 44%",
  },
  { src: getPublicAssetHref("photos/footer-strip/strip-04-flower-frame.webp") },
  {
    src: getPublicAssetHref("photos/footer-strip/strip-05-tree-planting.webp"),
    objectPosition: "60% 52%",
  },
];

export const FOOTER_GALLERY_VISIBILITY = [
  "block",
  "block",
  "hidden sm:block",
  "hidden md:block",
  "hidden lg:block",
] as const;
