import { getPageHref, getSectionHref } from "@/lib/sitePaths";

export type NavigationChild = {
  label: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href: string;
  children?: NavigationChild[];
};

export const PRIMARY_NAV_ITEMS: NavigationItem[] = [
  {
    label: "ABOUT US",
    href: getPageHref("about"),
    children: [
      { label: "History", href: getSectionHref("about", "history") },
      { label: "Vision & Mission", href: getSectionHref("about", "vision") },
      { label: "Organogram", href: getSectionHref("about", "organogram") },
      { label: "Staff Biographies", href: getSectionHref("about", "staff") },
      {
        label: "Policies & Documents",
        href: getSectionHref("contact", "policies"),
      },
    ],
  },
  {
    label: "ACADEMIC",
    href: getPageHref("academic"),
    children: [
      { label: "Curriculum", href: getSectionHref("academic", "curriculum") },
      {
        label: "Subject Choices",
        href: getSectionHref("academic", "subjects"),
      },
      {
        label: "Career Guidance",
        href: getSectionHref("academic", "career-guidance"),
      },
      {
        label: "Exit Exam & NSC",
        href: getSectionHref("academic", "exit-exam"),
      },
      {
        label: "Accreditation",
        href: getSectionHref("academic", "accreditation"),
      },
    ],
  },
  {
    label: "SCHOOL LIFE",
    href: getPageHref("schoolLife"),
    children: [
      { label: "Sport", href: getSectionHref("schoolLife", "sport") },
      {
        label: "Enrichment Programmes",
        href: getSectionHref("schoolLife", "leadership"),
      },
      {
        label: "Community Outreach",
        href: getSectionHref("schoolLife", "outreach"),
      },
    ],
  },
];

export const FOOTER_NAV_ITEMS = [
  {
    label: "GALLERY",
    href: "https://www.facebook.com/hischurchschool/photos",
  },
  { label: "PARTNERSHIP", href: getPageHref("partnership") },
] as const;
