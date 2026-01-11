import { sectionIds } from "@/content/content";

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];

export interface NavItem {
  id: SectionId;
  label: string;
}

export const navItems: NavItem[] = [
  { id: sectionIds.home, label: "Home" },
  { id: sectionIds.about, label: "About" },
  { id: sectionIds.skills, label: "Skills" },
  { id: sectionIds.projects, label: "Projects" },
  { id: sectionIds.education, label: "Education" },
  { id: sectionIds.experience, label: "Experience" },
  { id: sectionIds.contact, label: "Contact" },
];


