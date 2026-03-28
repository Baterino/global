import { useState } from 'react'
import { Link } from 'react-router-dom'

const DIVISION_LOGOS: Record<string, string> = {
  res: '/images/baterino-logo-white.png',
  pro: '/images/baterino-industrial-black.png',
  med: '/images/baterino-medical-black.png',
  sea: '/images/baterino-maritime-black.png',
}

const DIVISION_CARD_ICONS: Record<string, string> = {
  res: '/images/mobile menu/residential.png',
  pro: '/images/baterino-industrial-black.png',
  med: '/images/baterino-medical-black.png',
  sea: '/images/baterino-maritime-black.png',
}

const DIVISIONS = [
  {
    id: 'res',
    name: 'Baterino Residential',
    subtitle: 'Residential Energy & Social Impact',
    desc: 'Focused on individual homeowners, residential communities, and off-grid settlements, Baterino Residential delivers modular energy storage solutions adapted to real household energy needs. This division also carries Baterino\'s social mission — running community support programs, providing preferential access for vulnerable groups, and leading initiatives that extend reliable energy to those who need it most.',
    bullets: [
      'Residential battery storage systems from ~5 kW to ~16 kW per installation',
      'Community microgrid solutions up to ~5 MW',
      'Integration with solar generation for full energy independence',
      'Social impact programs: senior citizen support, low-income household initiatives, disaster relief energy access',
      'Long-term residential after-sales and system monitoring',
    ],
  },
  {
    id: 'pro',
    name: 'Baterino PRO',
    subtitle: 'Industrial Implementation & Service',
    desc: 'Baterino PRO handles the full scope of industrial energy storage — from cabinet-based systems for commercial facilities to large-scale containerized BESS deployments for industrial complexes and grid-connected projects. As the company\'s largest division by project scale, PRO is also the central service arm responsible for after-sales support across all Baterino products and divisions.',
    bullets: [
      'Cabinet-based BESS from ~30 kW to ~220 kW per unit',
      'Containerized BESS from ~500 kW to multi-megawatt scale',
      'Renewable energy firming, peak shaving, and grid-connected deployments',
      'Central after-sales and lifecycle service for all Baterino installations',
      'Technical support, remote monitoring, and system optimization across sectors',
    ],
  },
  {
    id: 'med',
    name: 'Baterino Med',
    subtitle: 'Medical & Critical Systems',
    desc: 'Critical infrastructure operates under a different set of requirements. Zero downtime is not a target — it is a baseline. Baterino Med specializes in energy storage solutions for environments where power failure is not an acceptable outcome: hospitals, medical facilities, ambulance fleets, emergency response centers, and water treatment plants. Every system deployed by this division is engineered and validated for continuous, uninterrupted operation.',
    bullets: [
      'Ultra-reliable BESS for hospitals, clinics, and emergency services',
      'Rapid load-switching architectures for life-critical equipment',
      'Compliance with medical facility electrical and safety standards',
      'Priority after-sales response and redundancy planning',
      'Disaster-readiness configurations for infrastructure continuity',
    ],
  },
  {
    id: 'sea',
    name: 'Baterino At Sea',
    subtitle: 'Maritime & Offshore Operations',
    desc: 'Marine energy storage operates in some of the most demanding environments on earth — saltwater corrosion, constant vibration, humidity, and classification authority oversight. Baterino At Sea manages the full implementation of maritime energy storage projects: from system specification and marine compliance, through installation coordination on vessels, to long-term offshore operational support.',
    bullets: [
      'Marine-grade BESS for tugboats, ferries, tourist vessels, cargo ships, and offshore platforms',
      'LFP-based systems built for corrosion resistance and thermal stability at sea',
      'Compliance with marine classification society requirements',
      'Fish farm and aquaculture energy infrastructure',
      'Offshore supply vessel and OSV electrification programs',
    ],
  },
] as const

interface ProjectsArticleContentProps {
  locale: string
}

export function ProjectsArticleContent({ locale }: ProjectsArticleContentProps) {
  const [activeDivision, setActiveDivision] = useState(0)
  const division = DIVISIONS[activeDivision]

  return (
    <div className="article-rich article-projects">
      <p className="intro-lead">
        Energy storage projects fail more often during assessment and delivery than they do due to technology. The hardware works. The gaps between intake, routing, design, regulatory approval, and long-term support are where projects stall, overrun, or underdeliver.
      </p>
      <p className="intro-body">
        Baterino was built around this reality. Our delivery model is structured to close those gaps — through a disciplined assessment process, four specialist divisions, and a framework that stays active well beyond commissioning. This article explains how it works in practice.
      </p>

      <div className="pull-quote">
        <p>The question is never whether the technology works. It is whether the right technology reaches the right environment, at the right time, with the right support structure in place.</p>
      </div>

      <div className="section">
        <div className="section-label">01 — Our Structure</div>
        <h2>Four Divisions. One Delivery Standard.</h2>
        <div className="divisions-intro">
          <p>Baterino operates through a central coordination team and four specialist divisions. All project requests — whether received centrally or directly by a division — pass through the same structured assessment process before any commitment is made. This ensures that every project is evaluated on the right technical, regulatory, and operational criteria from the outset.</p>
        </div>

        {/* Division tabs with icons */}
        <div className="division-tabs">
          {DIVISIONS.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDivision(i)}
              className={`division-tab div-${d.id} ${activeDivision === i ? 'division-tab-active' : ''}`}
              title={d.name}
            >
              <img src={DIVISION_LOGOS[d.id]} alt="" className="division-tab-logo" />
            </button>
          ))}
        </div>

        {/* Division content */}
        <div className={`division-card div-${division.id}`}>
          <div className="division-header">
            <div className="division-icon">
              <img src={DIVISION_CARD_ICONS[division.id]} alt="" className="division-icon-img" />
            </div>
            <div className="division-meta">
              <div className="division-name">{division.name}</div>
              <div className="division-subtitle">{division.subtitle}</div>
            </div>
          </div>
          <div className="division-body">
            <p className="division-desc">{division.desc}</p>
            {division.bullets.length > 0 && (
              <ul className="division-bullets">
                {division.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">02 — The Assessment Process</div>
        <h2>How We Evaluate Every Project Before We Commit to It</h2>
        <p>
          Every energy storage project — regardless of size, sector, or originating division — goes through a structured assessment before any technical proposal or commercial commitment is made. This is not bureaucracy. It is how we ensure that every project we take on can be delivered to the standard we hold ourselves to.
        </p>

        <div className="process-track">
          {[
            { num: '01', title: 'Initial Request & Intake', desc: "A project request is received — either through Baterino's central coordination team or directly by the relevant division. The request is logged, categorized by sector, geography, and scale, and assigned to a primary contact. Within this stage, a first-pass feasibility screen is conducted to confirm the project is within Baterino's delivery scope.", tag: 'All Divisions' },
            { num: '02', title: 'Division Routing & Assignment', desc: "Based on the project's primary sector — residential, industrial, medical, or maritime — the request is formally routed to the appropriate division. For cross-sector projects, a lead division is designated with coordination across the relevant teams. The central team maintains oversight throughout.", tag: 'Central Team' },
            { num: '03', title: 'Technical & Site Assessment', desc: 'The assigned division conducts a detailed technical assessment of the project requirements: energy demand analysis, load profile review, site conditions, grid connection parameters, environmental factors, and any sector-specific constraints. For maritime projects, vessel classification and operating environment are assessed. For medical, uptime and redundancy requirements are defined.', tag: 'Division Lead' },
            { num: '04', title: 'Technology Selection & Partner Engagement', desc: "Based on the technical assessment, the most suitable technology configuration is selected from Baterino's partner network — covering battery storage systems, solar generation, inverters, and balance-of-plant components. The relevant technology partners are engaged to confirm product availability, lead times, and any project-specific customization requirements.", tag: 'Technology Team' },
            { num: '05', title: 'Regulatory & Compliance Verification', desc: "Before any proposal is finalized, the regulatory landscape of the target country or region is mapped. This includes verification that the proposed technology holds the required certifications for that market, assessment of import and distribution requirements, grid connection approval processes, and — for maritime projects — alignment with the relevant classification authority. Where approvals are pending, a timeline is established as part of the project plan.", tag: 'Compliance' },
            { num: '06', title: 'Client Alignment & Proposal', desc: 'With the technical, technological, and regulatory picture complete, Baterino engages the client in a structured alignment session. The proposed system configuration, delivery timeline, compliance pathway, and after-sales framework are presented and refined based on client feedback. The outcome is a clear, bankable proposal — not a generic quote.', tag: 'Client-Facing' },
            { num: '07', title: 'Project Structuring & Go / No-Go', desc: 'A formal project structure is established: scope, responsibilities, funding pathway, delivery milestones, and after-sales commitment. For selected projects requiring financing, Baterino can support access to institutional or project finance through strategic partners. A go / no-go decision is made by both parties before procurement or deployment begins.', tag: 'Governance' },
          ].map((step) => (
            <div key={step.num} className="process-step">
              <div className="step-node">
                <div className="step-circle">{step.num}</div>
                <div className="step-line" />
              </div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
                <span className="step-tag">{step.tag}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pull-quote">
          <p>We do not commit to a project we cannot deliver. The assessment process exists to protect both the client and our own delivery standard.</p>
        </div>
      </div>

      <div className="section">
        <div className="section-label">03 — Implementation</div>
        <h2>How Projects Move from Approval to Operation</h2>
        <p>Once a project is approved and structured, implementation follows a phased approach designed to reduce risk at each stage and ensure the system is ready to perform from day one of operation.</p>

        <div className="phases-wrap">
          {[
            { num: 'I', title: 'Engineering & System Design', desc: 'Detailed system architecture is finalized: electrical schematics, equipment specifications, integration interfaces, and site preparation requirements. Design is validated against the regulatory and compliance requirements established during assessment.' },
            { num: 'II', title: 'Procurement, Import & Logistics', desc: "Equipment is procured from partner manufacturers and coordinated through Baterino's import and distribution network. Customs, documentation, and in-country logistics are managed to ensure equipment arrives on schedule and in compliance with local import requirements." },
            { num: 'III', title: 'Installation & Integration', desc: "On-site installation is managed through Baterino's local partner network, with technical oversight from the relevant division. Electrical integration, software configuration, and grid or vessel connection are completed according to the approved design and local safety standards." },
            { num: 'IV', title: 'Testing, Commissioning & Handover', desc: 'Full system testing is conducted before commissioning: load testing, protection relay verification, BMS validation, and — where required — classification authority sign-off. The system is commissioned only when all performance and safety criteria are met. A structured handover is completed with the client\'s operational team.' },
            { num: 'V', title: 'After-Sales & Lifecycle Support', desc: 'Baterino PRO manages after-sales support across all divisions. Structured service pathways are established at commissioning — not after issues arise. Remote monitoring, scheduled maintenance, performance reporting, and system optimization are provided throughout the operational lifecycle, which for most systems spans a decade or more.' },
          ].map((phase) => (
            <div key={phase.num} className="phase-row">
              <div className="phase-num">{phase.num}</div>
              <div className="phase-content">
                <div className="phase-title">{phase.title}</div>
                <div className="phase-desc">{phase.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="closing-block">
        <h3>Infrastructure is not delivered once. It is maintained, supported, and improved over time.</h3>
        <p>The assessment process and implementation framework described here reflect a single underlying principle: every Baterino project is treated as infrastructure from the first conversation — not as a product sale with a defined end date. That is what long-term reliability requires, and it is the standard every division holds itself to.</p>
      </div>

      <div className="article-footer mt-12">
        <div className="article-tags">
          <span className="article-tag">Process</span>
          <span className="article-tag">Divisions</span>
          <span className="article-tag">Delivery</span>
          <span className="article-tag">Infrastructure</span>
        </div>
        <Link to={`/${locale}/contact`} className="btn-primary">
          Start a project
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
