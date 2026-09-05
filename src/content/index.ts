import siteData from './site.json';
import formData from './form.json';

export type NavItem = { label: string; href: string };
export type Cta = { label: string; href: string };

export type SiteContent = typeof siteData;
export type FormContent = typeof formData;

export const site: SiteContent = siteData;
export const form: FormContent = formData;

const hidden = new Set(site.hiddenSections);

export function isSectionVisible(id: string): boolean {
  return !hidden.has(id);
}
