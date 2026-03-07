import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from './components/ErrorBoundary'
import { RedirectToLocale } from './components/RedirectToLocale'
import { ScrollToTop } from './components/ScrollToTop'
import { Layout } from './routes/Layout'
import { Home } from './routes/Home'

const SolutionsResidential = lazy(() =>
  import('./pages/SolutionsResidential').then((m) => ({ default: m.SolutionsResidential }))
)
const SolutionsIndustrial = lazy(() =>
  import('./pages/SolutionsIndustrial').then((m) => ({ default: m.SolutionsIndustrial }))
)
const SolutionsMaritime = lazy(() =>
  import('./pages/SolutionsMaritime').then((m) => ({ default: m.SolutionsMaritime }))
)
const Delivery = lazy(() => import('./pages/Delivery').then((m) => ({ default: m.Delivery })))
const Impact = lazy(() => import('./pages/Impact').then((m) => ({ default: m.Impact })))
const AboutBaterino = lazy(() =>
  import('./pages/AboutBaterino').then((m) => ({ default: m.AboutBaterino }))
)
const GlobalPresence = lazy(() =>
  import('./pages/GlobalPresence').then((m) => ({ default: m.GlobalPresence }))
)
const Insights = lazy(() => import('./pages/Insights').then((m) => ({ default: m.Insights })))
const Article = lazy(() => import('./pages/Article').then((m) => ({ default: m.Article })))
const LithTech = lazy(() => import('./pages/LithTech').then((m) => ({ default: m.LithTech })))
const Partnership = lazy(() =>
  import('./pages/Partnership').then((m) => ({ default: m.Partnership }))
)
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Careers = lazy(() => import('./pages/Careers').then((m) => ({ default: m.Careers })))
const TermsOfUse = lazy(() => import('./pages/TermsOfUse').then((m) => ({ default: m.TermsOfUse })))
const PrivacyPolicy = lazy(() =>
  import('./pages/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
)
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))
const Sliders = lazy(() => import('./pages/Sliders').then((m) => ({ default: m.Sliders })))

export default function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />
          <Suspense
            fallback={
              <div className="mx-auto max-w-[1200px] px-4 py-16 text-center text-body-md text-neutral-500">
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<RedirectToLocale />} />
              <Route path="/:locale" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="solutions/residential" element={<SolutionsResidential />} />
                <Route path="solutions/industrial" element={<SolutionsIndustrial />} />
                <Route path="solutions/maritime" element={<SolutionsMaritime />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="impact" element={<Impact />} />
                <Route path="company/about-baterino" element={<AboutBaterino />} />
                <Route path="company/lithtech" element={<LithTech />} />
                <Route path="company/insights" element={<Insights />} />
                <Route path="company/insights/:slug" element={<Article />} />
                <Route path="company/partnership" element={<Partnership />} />
                <Route path="global-presence" element={<GlobalPresence />} />
                <Route path="careers" element={<Careers />} />
                <Route path="contact" element={<Contact />} />
                <Route path="terms-of-use" element={<TermsOfUse />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="sliders" element={<Sliders />} />
                <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<RedirectToLocale />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
