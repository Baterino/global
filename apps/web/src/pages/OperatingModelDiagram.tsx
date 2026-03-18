import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

const INDUSTRIAL_DIVISIONS = [
  { key: 'pro', label: 'PRO' },
  { key: 'med', label: 'MED' },
  { key: 'atSea', label: 'AT SEA' },
]

const SUPPLIER_LEFT: { key: string; label: string; icon: ReactNode }[] = [
  {
    key: 'transformers',
    label: 'Transformers',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="4"/><circle cx="17" cy="12" r="4"/>
        <path d="M11 12h2"/><path d="M3 12H1m20 0h2"/>
      </svg>
    ),
  },
  {
    key: 'heatPumps',
    label: 'Heat Pumps',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    key: 'solarAccessories',
    label: 'Solar Accessories',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
      </svg>
    ),
  },
]

const SUPPLIER_RIGHT: { key: string; label: string; icon: ReactNode }[] = [
  {
    key: 'pv',
    label: 'PV Panels',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="1"/>
        <path d="M12 6v12M2 12h20M7 6v12M17 6v12"/>
      </svg>
    ),
  },
  {
    key: 'inverters',
    label: 'Inverters',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,14 6,6 10,14 14,6 18,14 22,6"/>
        <line x1="2" y1="18" x2="22" y2="18"/>
      </svg>
    ),
  },
  {
    key: 'energyStorage',
    label: 'Energy Storage',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="12" height="16" rx="2"/>
        <path d="M10 2h4M9 11h6M12 8v6"/>
      </svg>
    ),
  },
]

/* ΓöÇΓöÇ Shared tiny arrow ΓöÇΓöÇ */
function ArrowDown() {
  return (
    <div className="flex justify-center" style={{ height: 36 }}>
      <svg width="20" height="36" viewBox="0 0 20 36" fill="none">
        <line x1="10" y1="0" x2="10" y2="26" stroke="#9CA3AF" strokeWidth="2"/>
        <polygon points="4,22 10,36 16,22" fill="#9CA3AF"/>
      </svg>
    </div>
  )
}

export function OperatingModelDiagramContent() {
  const { t } = useTranslation()

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
          MOBILE  (< lg)
      ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <div className="lg:hidden mx-auto flex flex-col items-stretch gap-0" style={{ maxWidth: 480 }}>

        {/* Suppliers grid */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[...SUPPLIER_LEFT, ...SUPPLIER_RIGHT].map((s) => (
            <div
              key={s.key}
              className="rounded-[10px] flex flex-col items-center justify-center gap-1 py-3 text-center text-xs font-semibold text-gray-700"
              style={{ backgroundColor: '#E8ECF5' }}
            >
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>

        {/* Green Energy */}
        <div className="rounded-[10px] bg-green-100 flex flex-col items-center justify-center gap-1 py-5">
          <div className="text-center text-base font-bold text-black">
            {t('operatingModel.suppliers.greenEnergyTech')}
          </div>
          <div className="text-center text-[10px] text-green-700 font-medium">
            Vetted suppliers ┬╖ Best-in-class technologies ┬╖ Quality assurance
          </div>
        </div>

        <ArrowDown />

        {/* Baterino Global */}
        <div className="rounded-[10px] bg-blue-100 flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
          <div className="text-base font-bold text-black">{t('operatingModel.baterinoGlobal')}</div>
          <div className="text-xs text-black mt-1">{t('operatingModel.globalDesc')}</div>
          <div className="text-xs text-black mt-0.5">baterino.com</div>
        </div>

        <ArrowDown />

        {/* Baterino Local Structure */}
        <div className="rounded-[10px] p-4" style={{ background: 'linear-gradient(to right, #d9f99d 0%, #ddd6fe 100%)' }}>
          <div className="text-center text-base font-bold text-black mb-1">{t('operatingModel.baterinoLocal')}</div>
          <div className="text-center text-xs text-black mb-3">{t('operatingModel.localDesc')}</div>
          <div className="grid grid-cols-3 gap-2">
            {[
              t('operatingModel.roles.importer'),
              t('operatingModel.roles.afterSales'),
              t('operatingModel.roles.epc'),
            ].map((role) => (
              <div key={role} className="rounded-[8px] bg-white/80 border border-stone-300 py-3 flex items-center justify-center text-center text-xs font-bold text-black px-1">
                {role}
              </div>
            ))}
          </div>
        </div>

        <ArrowDown />

        {/* Two branches side by side */}
        <div className="grid grid-cols-2 gap-3">

          {/* LEFT branch */}
          <div className="flex flex-col gap-0">
            {/* Local Partners */}
            <div className="rounded-[10px] bg-lime-200 p-3 text-center">
              <div className="text-sm font-bold text-black mb-1">{t('operatingModel.localPartners')}</div>
              <div className="text-[10px] text-black mb-2">{t('operatingModel.localPartnersDesc')}</div>
              <div className="flex flex-col gap-1.5">
                {[t('operatingModel.distributor'), t('operatingModel.installer')].map((r) => (
                  <div key={r} className="rounded-[6px] bg-zinc-100 border border-stone-300 py-2 text-[10px] font-bold text-black text-center">{r}</div>
                ))}
              </div>
            </div>
            <ArrowDown />
            {/* Residential */}
            <div className="rounded-[10px] bg-lime-200 p-3 text-center">
              <div className="text-sm font-bold text-black mb-1">{t('operatingModel.residentialUsers')}</div>
              <div className="text-[10px] text-black">{t('operatingModel.residentialDesc')}</div>
            </div>
          </div>

          {/* RIGHT branch */}
          <div className="flex flex-col gap-0">
            {/* Industrial Divisions */}
            <div className="rounded-[10px] bg-violet-200 p-3">
              <div className="text-xs font-semibold text-black mb-2">{t('operatingModel.industrialDivisionsTitle')}</div>
              <div className="flex flex-col gap-1.5">
                {INDUSTRIAL_DIVISIONS.map((d) => (
                  <div key={d.key} className="rounded-[6px] bg-white p-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] font-bold uppercase text-black">BATERINO</span>
                      <span className="rounded bg-black px-1 py-0.5 text-[9px] font-bold text-white">{d.label}</span>
                    </div>
                    <div className="text-[9px] text-black leading-tight">{t(`operatingModel.divisions.${d.key}.desc`)}</div>
                  </div>
                ))}
              </div>
            </div>
            <ArrowDown />
            {/* Industrial Final Clients */}
            <div className="rounded-[10px] bg-violet-200 p-3 text-center flex flex-col items-center justify-center gap-1">
              <div className="text-sm font-bold text-black">{t('operatingModel.industrialClients')}</div>
              <div className="text-[10px] text-black">{t('operatingModel.industrialDesc')}</div>
            </div>
          </div>

        </div>
      </div>

      {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
          DESKTOP  (ΓëÑ lg)
      ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
      <div className="hidden lg:block">
        <div className="mx-auto relative flex flex-col items-center" style={{ maxWidth: 920 }}>

          {/* ΓöÇΓöÇ OVERLAY SVG: dashed feedback connectors ΓöÇΓöÇ */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 1102, pointerEvents: 'none', zIndex: 10 }}
            viewBox="0 0 920 1102"
            fill="none"
          >
            {/* Residential Final Users ΓåÆ AfterSales */}
            <path d="M 389,872 H 448 V 529" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="6 4"/>
            <polygon points="442,529 448,515 454,529" fill="#9CA3AF"/>
            {/* Industrial Final Clients ΓåÆ AfterSales */}
            <path d="M 523,1030 H 464 V 529" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="6 4"/>
            <polygon points="458,529 464,515 470,529" fill="#9CA3AF"/>
          </svg>

          {/* ΓöÇΓöÇ GREEN ENERGY ROW ΓöÇΓöÇ */}
          <div className="flex items-center gap-2">
            {/* Left 3 supplier boxes */}
            <div className="flex gap-2">
              {SUPPLIER_LEFT.map((s) => (
                <div
                  key={s.key}
                  className="w-20 h-20 rounded-[10px] flex flex-col items-center justify-center gap-1 text-center text-xs font-semibold text-gray-700"
                  style={{ backgroundColor: '#E8ECF5' }}
                >
                  {s.icon}
                  {s.label}
                </div>
              ))}
            </div>

            {/* Green Energy box */}
            <div className="w-72 h-28 rounded-[10px] bg-green-100 flex flex-col items-center justify-center gap-1">
              <div className="text-center text-lg font-bold text-black">
                {t('operatingModel.suppliers.greenEnergyTech')}
              </div>
              <div className="text-center text-[10px] text-green-700 font-medium">
                Vetted suppliers ┬╖ Best-in-class technologies ┬╖ Quality assurance
              </div>
            </div>

            {/* Right 3 supplier boxes */}
            <div className="flex gap-2">
              {SUPPLIER_RIGHT.map((s) => (
                <div
                  key={s.key}
                  className="w-20 h-20 rounded-[10px] flex flex-col items-center justify-center gap-1 text-center text-xs font-semibold text-gray-700"
                  style={{ backgroundColor: '#E8ECF5' }}
                >
                  {s.icon}
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Arrow: Green Energy ΓåÆ Baterino Global */}
          <div className="flex justify-center" style={{ height: 40 }}>
            <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
              <line x1="10" y1="0" x2="10" y2="30" stroke="#9CA3AF" strokeWidth="2"/>
              <polygon points="4,26 10,40 16,26" fill="#9CA3AF"/>
            </svg>
          </div>

          {/* ΓöÇΓöÇ BATERINO GLOBAL ΓöÇΓöÇ */}
          <div className="w-72 h-36 rounded-[10px] bg-blue-100 relative">
            <div className="absolute left-[80px] top-[26px] w-36 text-lg font-bold text-black">
              {t('operatingModel.baterinoGlobal')}
            </div>
            <div className="absolute left-[35px] top-[56px] w-56 text-center text-xs text-black">
              {t('operatingModel.globalDesc')}
            </div>
            <div className="absolute left-[107px] top-[99px] w-20 text-center text-xs text-black">
              baterino.com
            </div>
          </div>

          {/* Arrow: Baterino Global ΓåÆ Baterino Local Presence */}
          <div className="flex justify-center" style={{ height: 40 }}>
            <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
              <line x1="10" y1="0" x2="10" y2="30" stroke="#9CA3AF" strokeWidth="2"/>
              <polygon points="4,26 10,40 16,26" fill="#9CA3AF"/>
            </svg>
          </div>

          {/* ΓöÇΓöÇ BATERINO LOCAL PRESENCE ΓöÇΓöÇ */}
          <div className="w-96 h-48 relative rounded-[10px]">
            <div className="w-96 h-36 left-0 top-0 absolute rounded-[10px]" style={{ background: 'linear-gradient(to right, #d9f99d 0%, #ddd6fe 100%)' }} />
            <div className="left-[83px] top-[27px] absolute text-black text-lg font-bold whitespace-nowrap">{t('operatingModel.baterinoLocal')}</div>
            <div className="w-64 left-[58px] top-[51px] absolute text-center text-black text-xs font-normal">{t('operatingModel.localDesc')}</div>
            <div className="size-24 left-[25px] top-[91px] absolute bg-neutral-100 rounded-[10px] border border-stone-300" />
            <div className="w-16 left-[45px] top-[133px] absolute text-black text-sm font-bold">{t('operatingModel.roles.importer')}</div>
            <div className="size-24 left-[140px] top-[91px] absolute bg-neutral-100 rounded-[10px] border border-stone-300" />
            <div className="w-20 left-[152px] top-[123px] absolute text-center text-black text-sm font-bold">{t('operatingModel.roles.afterSales')}</div>
            <div className="size-24 left-[255px] top-[91px] absolute bg-neutral-100 rounded-[10px] border border-stone-300" />
            <div className="w-16 left-[272px] top-[115px] absolute text-center text-black text-sm font-bold">{t('operatingModel.roles.epc')}</div>
          </div>

          {/* Connectors: AfterSales(x=456)ΓåÆLocal Partners(x=245) + EPC(x=571)ΓåÆIndustrial Div(x=573) */}
          <div className="w-full" style={{ height: 40 }}>
            <svg width="100%" height="40" viewBox="0 0 920 40" fill="none">
              {/* Importer ΓåÆ Local Partners: down, left, down */}
              <path d="M 341,0 L 341,18 L 245,18 L 245,34" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
              <polygon points="239,30 245,40 251,30" fill="#9CA3AF"/>
              {/* EPC ΓåÆ Industrial Divisions: down, right, down */}
              <path d="M 571,0 L 571,18 L 667,18 L 667,34" stroke="#9CA3AF" strokeWidth="2" fill="none"/>
              <polygon points="661,30 667,40 673,30" fill="#9CA3AF"/>
            </svg>
          </div>

          {/* ΓöÇΓöÇ TWO COLUMNS ΓöÇΓöÇ */}
          <div className="flex self-start" style={{ marginLeft: 101, gap: 134 }}>

            {/* LEFT COLUMN */}
            <div className="w-72 flex flex-col">

              {/* Local Partners */}
              <div className="w-72 h-48 relative rounded-[10px]">
                <div className="w-72 h-36 left-0 top-0 absolute bg-lime-200 rounded-[10px]" />
                <div className="w-32 left-[85px] top-[17px] absolute text-black text-lg font-bold font-['Inter']">{t('operatingModel.localPartners')}</div>
                <div className="w-64 left-[18px] top-[43px] absolute text-center text-black text-xs font-normal font-['Inter']">{t('operatingModel.localPartnersDesc')}</div>
                <div className="size-24 left-[43px] top-[90px] absolute bg-zinc-100 rounded-[10px] border border-stone-300" />
                <div className="w-20 left-[56px] top-[132px] absolute text-black text-sm font-bold font-['Inter']">{t('operatingModel.distributor')}</div>
                <div className="size-24 left-[158px] top-[90px] absolute bg-zinc-100 rounded-[10px] border border-stone-300" />
                <div className="w-14 left-[179px] top-[132px] absolute text-black text-sm font-bold font-['Inter']">{t('operatingModel.installer')}</div>
              </div>

              {/* Arrows: Distributor + Installer ΓåÆ Residential Final Users */}
              <div style={{ height: 40 }}>
                <svg width="288" height="40" viewBox="0 0 288 40" fill="none">
                  <line x1="91" y1="0" x2="91" y2="30" stroke="#9CA3AF" strokeWidth="2"/>
                  <polygon points="85,26 91,40 97,26" fill="#9CA3AF"/>
                  <line x1="206" y1="0" x2="206" y2="30" stroke="#9CA3AF" strokeWidth="2"/>
                  <polygon points="200,26 206,40 212,26" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Residential Final Users */}
              <div className="w-72 h-36 relative rounded-[10px]">
                <div className="w-72 h-36 left-0 top-0 absolute bg-lime-200 rounded-[10px]" />
                <div className="w-52 left-[48px] top-[34px] absolute text-black text-lg font-bold">{t('operatingModel.residentialUsers')}</div>
                <div className="w-56 left-[38px] top-[68px] absolute text-center text-black text-xs font-normal">{t('operatingModel.residentialDesc')}</div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="w-72 flex flex-col">

              {/* Industrial Divisions */}
              <div className="w-72 relative" style={{ height: 350 }}>
                <div className="w-72 left-0 top-0 absolute bg-violet-200 rounded-[10px]" style={{ height: 350 }} />
                <div className="w-64 left-[23px] top-[20px] absolute text-black text-sm font-semibold">{t('operatingModel.industrialDivisionsTitle')}</div>
                {INDUSTRIAL_DIVISIONS.map((d, i) => {
                  const boxTop = [68, 159, 250][i]
                  const labelTop = [86, 178, 269][i]
                  const descTop = [112, 203, 293][i]
                  return (
                    <div key={d.key}>
                      <div className="h-20 left-[20px] right-[20px] absolute bg-white rounded-[10px]" style={{ top: boxTop }} />
                      <div className="left-[35px] absolute flex items-center gap-1.5" style={{ top: labelTop }}>
                        <span className="text-sm font-bold uppercase tracking-tight text-black">BATERINO</span>
                        <span className="rounded bg-black px-2 py-0.5 text-xs font-bold text-white">{d.label}</span>
                      </div>
                      <div className="w-52 left-[34px] absolute text-black text-xs font-normal" style={{ top: descTop }}>
                        {t(`operatingModel.divisions.${d.key}.desc`)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Arrow: Industrial Divisions ΓåÆ Industrial Final Clients */}
              <div className="flex justify-center w-72" style={{ height: 40 }}>
                <svg width="20" height="40" viewBox="0 0 20 40" fill="none">
                  <line x1="10" y1="0" x2="10" y2="30" stroke="#9CA3AF" strokeWidth="2"/>
                  <polygon points="4,26 10,40 16,26" fill="#9CA3AF"/>
                </svg>
              </div>

              {/* Industrial Final Clients */}
              <div className="w-72 h-36 relative rounded-[10px]">
                <div className="w-72 h-36 left-0 top-0 absolute bg-violet-200 rounded-[10px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-4 text-center">
                  <div className="text-black text-lg font-bold font-['Inter']">{t('operatingModel.industrialClients')}</div>
                  <div className="text-black text-xs font-normal font-['Inter']">{t('operatingModel.industrialDesc')}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>{/* end desktop wrapper */}

    </section>
  )
}
