export const nav = {
  solutions: {
    path: 'solutions',
    sub: [
      { path: 'residential', key: 'nav.solutions.residential' },
      { path: 'industrial', key: 'nav.solutions.industrial' },
      { path: 'critical-services', key: 'nav.solutions.criticalServices' },
      { path: 'maritime', key: 'nav.solutions.maritime' },
    ],
  },
  delivery: { path: 'delivery' },
  insights: { path: 'company/insights' },
  useCases: { path: 'use-cases' },
  company: {
    path: 'company',
    sub: [
      { path: 'about-baterino', key: 'nav.company.aboutBaterino' },
      { path: 'lithtech', key: 'nav.company.aboutLithtech' },
      { path: 'partnership', key: 'nav.company.partnership' },
      { path: 'operating-model', key: 'nav.company.operatingModel' },
    ],
  },
  globalPresence: { path: 'global-presence' },
  careers: { path: 'careers' },
  contact: { path: 'contact' },
  termsOfUse: { path: 'terms-of-use' },
  privacyPolicy: { path: 'privacy-policy' },
} as const

export type NavKey = keyof typeof nav

export function getSolutionsSubpaths(): string[] {
  return nav.solutions.sub.map((s) => s.path)
}

export function getCompanySubpaths(): string[] {
  return nav.company.sub.map((s) => s.path)
}

export function isSolutionsPath(pathname: string): boolean {
  return pathname === 'solutions' || pathname.startsWith('solutions/')
}

export function isCompanyPath(pathname: string): boolean {
  return pathname === 'company' || pathname.startsWith('company/')
}
