export const nav = {
  solutions: {
    path: 'solutions',
    sub: [
      { path: 'residential', key: 'nav.solutions.residential' },
      { path: 'industrial', key: 'nav.solutions.industrial' },
      { path: 'maritime', key: 'nav.solutions.maritime' },
    ],
  },
  delivery: { path: 'delivery' },
  impact: { path: 'impact' },
  insights: { path: 'company/insights' },
  company: {
    path: 'company',
    sub: [
      { path: 'about-baterino', key: 'nav.company.aboutBaterino' },
      { path: 'lithtech', key: 'nav.company.aboutLithtech' },
      { path: 'partnership', key: 'nav.company.partnership' },
    ],
  },
  globalPresence: { path: 'global-presence' },
  careers: { path: 'careers' },
  contact: { path: 'contact' },
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
