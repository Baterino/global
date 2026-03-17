import { useTranslation } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { SeoHead } from '../components/SeoHead'
import { RolesArticleContent } from '../components/RolesArticleContent'
import { ProjectsArticleContent } from '../components/ProjectsArticleContent'

interface ArticleData {
  id: string
  slug: string
  title: string
  author: string
  date: string
  location: string
  category?: string
  type?: string
  image: string
  imagePlaceholder?: 'gradient'
  content: string
}

const SLUG_TO_ARTICLE_KEY: Record<string, number> = {
  'global-delivery-framework': 7,
  'baterino-roles-in-every-market': 8,
  'request-to-operation': 9,
}

const FALLBACK_ARTICLES: ArticleData[] = [
    {
      id: 'global-delivery-framework',
      slug: 'global-delivery-framework',
      title: '',
      author: '',
      date: '',
      location: '',
      category: 'insights.categoryCompany',
      image: '/images/blog/global-delivery-framework.jpg',
      content: `
<div class="article-rich">
  <p class="intro-lead">Energy storage infrastructure doesn't stop at borders. Neither does Baterino.</p>
  <p class="intro-body">Since our founding, we have built a delivery model designed to operate across regions, regulatory environments, and project types — while maintaining the same standards of reliability, safety, and long-term performance. This article is a transparent look at how that model works, where we operate today, and what makes our approach different from a traditional equipment supplier.</p>

  <div class="pull-quote">
    <p>Global standards. Local execution. That is not a slogan — it is how every Baterino project is structured.</p>
  </div>

  <div class="section">
    <div class="section-label">01 — The Delivery Framework</div>
    <h2>Not a Product Company. An Infrastructure Enabler.</h2>
    <p>Baterino is an infrastructure enabler and integrator. We bring together proven technologies from across the energy sector, build them into deployable long-term systems, and stay involved through the full lifecycle of every project.</p>
    <p>The delivery framework has four stages, each addressing a specific barrier that causes energy infrastructure projects to fail or underperform:</p>

    <div class="framework-grid">
      <div class="framework-card">
        <div class="card-number">Stage 01</div>
        <div class="card-title">Infrastructure Enablement</div>
        <div class="card-desc">Technology selection, import coordination, supply chain, and project readiness. Our role is to remove barriers before they become risks.</div>
      </div>
      <div class="framework-card">
        <div class="card-number">Stage 02</div>
        <div class="card-title">Technology Integration</div>
        <div class="card-desc">System design and engineering, compliance, compatibility across vendor ecosystems, and electrical and software integration.</div>
      </div>
      <div class="framework-card">
        <div class="card-number">Stage 03</div>
        <div class="card-title">After-Sales &amp; Reliability</div>
        <div class="card-desc">Structured support and service pathways, performance continuity, and a lifecycle-oriented approach that continues well beyond commissioning.</div>
      </div>
      <div class="framework-card">
        <div class="card-number">Stage 04</div>
        <div class="card-title">Project Structuring &amp; Funding</div>
        <div class="card-desc">For selected projects, coordination with institutional finance, support for bankable structures, and alignment of global standards with local execution.</div>
      </div>
    </div>

    <p>This structure reflects what we have found to be the actual failure points in energy infrastructure projects — not the technology itself, but the gaps between technology, delivery, and long-term support.</p>
  </div>

  <div class="section">
    <div class="section-label">02 — Where We Operate</div>
    <h2>Regional Presence, Driven by Local Partnerships</h2>
    <p>Baterino supports projects across four primary regions:</p>

    <div class="regions-grid">
      <div class="region-card">
        <div class="region-name">Europe</div>
        <div class="region-desc">Romania, Bulgaria, and broader Central and Eastern European markets, with a focus on residential, community microgrid, and industrial solutions.</div>
      </div>
      <div class="region-card">
        <div class="region-name">Asia-Pacific</div>
        <div class="region-desc">Indonesia and Southeast Asia, where demand for off-grid and island energy systems is high and maritime energy applications are particularly relevant.</div>
      </div>
      <div class="region-card">
        <div class="region-name">Middle East</div>
        <div class="region-desc">Supporting industrial and critical infrastructure projects where grid reliability requirements are stringent.</div>
      </div>
      <div class="region-card">
        <div class="region-name">Africa</div>
        <div class="region-desc">Emerging market deployments focused on community and essential service energy systems, where reliability is not optional.</div>
      </div>
    </div>

    <p>Presence and project scope vary by region. What stays consistent is the delivery framework, the technology standards, and the long-term support commitment.</p>

    <div class="pull-quote">
      <p>Projects are delivered through local partners, adapted to regulatory, environmental, and operational realities on the ground — not forced into a one-size-fits-all template.</p>
    </div>
  </div>

  <div class="section">
    <div class="section-label">03 — The Sectors We Serve</div>
    <h2>Residential, Industrial, Maritime, and Critical Services</h2>
    <p>Our delivery framework scales across five distinct sectors, each with its own operating requirements:</p>

    <div class="sectors-list">
      <div class="sector-item">
        <div class="sector-icon">🏠</div>
        <div class="sector-content">
          <div class="sector-name">Residential &amp; Communities</div>
          <div class="sector-desc">Modular battery systems for individual homes and community microgrids, from ~5 kW residential units to ~5 MW community-level systems.</div>
        </div>
      </div>
      <div class="sector-item">
        <div class="sector-icon">🏭</div>
        <div class="sector-content">
          <div class="sector-name">Industrial</div>
          <div class="sector-desc">Cabinet-based and containerized BESS from 30 kW to multi-megawatt scale, for factories, logistics centers, solar farms, and critical commercial operations.</div>
        </div>
      </div>
      <div class="sector-item">
        <div class="sector-icon">⚓</div>
        <div class="sector-content">
          <div class="sector-name">Maritime</div>
          <div class="sector-desc">Marine-grade energy storage systems built for saltwater environments, vibration, and the specific safety and compliance requirements of vessel and offshore operation.</div>
        </div>
      </div>
      <div class="sector-item">
        <div class="sector-icon">🏥</div>
        <div class="sector-content">
          <div class="sector-name">Critical Services</div>
          <div class="sector-desc">Hospitals, medical facilities, ambulance fleets, emergency response centers, and water treatment plants where power failure is not an option and 24/7 reliability is a baseline requirement.</div>
        </div>
      </div>
    </div>

    <p>These are not separate business lines. The same delivery framework, compliance standards, and long-term support approach apply across all five.</p>
  </div>

  <div class="section">
    <div class="section-label">04 — Technology Partners</div>
    <h2>Proven Technology Across the Full Energy System</h2>
    <p>Baterino works with a selected network of technology partners covering every layer of the energy system — allowing us to configure the right solution for each project rather than fitting every project to the same product.</p>
    <p>Our partner ecosystem spans the core components of modern energy infrastructure:</p>

    <div class="tech-grid">
      <div class="tech-card primary">
        <div class="tech-label">Primary Focus</div>
        <div class="tech-name">Battery Energy Storage (BESS)</div>
        <div class="tech-desc">Our primary focus, covering residential, industrial, and marine-grade applications.</div>
      </div>
      <div class="tech-card">
        <div class="tech-label">Generation</div>
        <div class="tech-name">Solar Panels</div>
        <div class="tech-desc">Generation technology integrated alongside storage to enable self-sufficient energy systems.</div>
      </div>
      <div class="tech-card">
        <div class="tech-label">Power Conversion</div>
        <div class="tech-name">Inverters</div>
        <div class="tech-desc">Selected for compatibility, efficiency, and compliance across different grid environments.</div>
      </div>
      <div class="tech-card">
        <div class="tech-label">System Completion</div>
        <div class="tech-name">Accessories &amp; Balance-of-Plant</div>
        <div class="tech-desc">Monitoring, control, protection, and safety equipment that completes the installation.</div>
      </div>
    </div>

    <p>All partner technologies are selected for performance, safety, and long-term viability. Our role is to ensure they work together as a coherent system — integrated, compliant, and built to last in real operating environments.</p>
  </div>

  <div class="section">
    <div class="section-label">05 — What 'Long Term' Actually Means</div>
    <h2>Reliability Is Not a Feature. It Is a Commitment.</h2>
    <p>Energy storage systems are designed to operate for ten years or more. Most equipment suppliers are involved for months — through delivery and commissioning. We are structured to be involved for the full lifecycle.</p>
    <p>In practice, this means:</p>

    <div class="commitment-list">
      <div class="commitment-item">
        <div class="commitment-check">
          <svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" stroke="white" stroke-width="2.5" fill="none"/></svg>
        </div>
        <div class="commitment-text">Structured after-sales pathways established before commissioning, not invented after problems arise.</div>
      </div>
      <div class="commitment-item">
        <div class="commitment-check">
          <svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" stroke="white" stroke-width="2.5" fill="none"/></svg>
        </div>
        <div class="commitment-text">Performance monitoring and system stability support throughout the operational life.</div>
      </div>
      <div class="commitment-item">
        <div class="commitment-check">
          <svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" stroke="white" stroke-width="2.5" fill="none"/></svg>
        </div>
        <div class="commitment-text">A lifecycle-oriented delivery approach that treats every project as infrastructure, not a product sale.</div>
      </div>
    </div>

    <div class="closing-quote">
      <p>Our responsibility does not end at commissioning. It continues throughout the system lifecycle.</p>
      <p class="quote-attr">— Baterino Global</p>
    </div>

    <p>This is a structural commitment that changes how we approach every project from day one — because we know we will still be accountable for it in year seven.</p>
  </div>

  <hr class="article-divider" />

  <div class="article-footer">
    <div class="article-tags">
      <span class="article-tag">Company</span>
      <span class="article-tag">Delivery</span>
      <span class="article-tag">Infrastructure</span>
      <span class="article-tag">Global Presence</span>
    </div>
    <a href="/__LOCALE__/contact" class="btn-primary">
      Get in touch
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </a>
  </div>
</div>
      `,
    },
    {
      id: 'baterino-roles-in-every-market',
      slug: 'baterino-roles-in-every-market',
      title: '',
      author: '',
      date: '',
      location: '',
      category: 'insights.categoryCompany',
      image: '/images/about-baterino.jpg',
      content: `
<div class="article-rich article-roles">
  <div class="about-inner">
    <div class="about-label">About Baterino</div>
    <p>Baterino is a 100% Romanian-capital company, founded in 2025 and built from day one with a global vision. In under a year, Baterino has established active operations in Romania, Bulgaria, and Indonesia. We are not a product manufacturer — we are an energy infrastructure enabler, integrating proven technologies across battery storage, solar, inverters, and accessories, and supporting projects from concept through to long-term operation.</p>
  </div>

  <p class="section-label">The bigger picture</p>
  <h2>One Company. Four Roles. Any Market.</h2>
  <p><strong>When people ask what Baterino does, the honest answer is: it depends on the market.</strong></p>
  <p>That might sound vague. It isn't. It is actually the most precise description of how we are structured — and what makes us different from every other company in the energy storage space.</p>
  <p>Most energy companies have a fixed identity: manufacturer, EPC contractor, installer, distributor. They enter every market the same way, offering the same thing. Baterino was built differently. Our structure allows us to read what a market actually needs and adapt our role accordingly — becoming whatever creates the most value, the most reliably, for the longest time.</p>
  <p>What makes this model work is that our four roles are not separate business units or separate products. They are expressions of the same underlying capability — the ability to understand a market, identify what it needs, and deploy the right combination of technology, expertise, and support to create lasting infrastructure.</p>
  <p>In Romania, where Baterino is headquartered and most deeply embedded, we operate across all four roles simultaneously. In Bulgaria, the market currently needs distribution — reliable access to quality products through a technically capable partner. In Indonesia, the priority is import capability and after-sales support for a market where technology access and long-term service are the critical gaps.</p>
  <p>As new markets open up, the same logic applies. We assess what role — or combination of roles — creates the most value. We build the structure to deliver it. And we stay.</p>

  <blockquote><p>We don't ask 'what can we sell here'. We ask 'what role does this market need us to play'.</p></blockquote>

  <p class="section-label">First, let's clear something up</p>
  <h2>We Are Not Just an EPC</h2>
  <p>EPC — Engineering, Procurement, and Construction — is how most people in the industry understand project delivery. A company designs, procures, builds, and hands over. The contract ends. The relationship ends.</p>
  <p>Baterino can do all of that. But our model does not stop there, and it does not always start there either. Depending on what a market needs, we step in at different points in the value chain and play different roles. Sometimes we are upstream, bringing technology into a country for the first time. Sometimes we are downstream, making sure a system installed two years ago is still performing at its best. Sometimes we are both.</p>
  <p>There are four roles we play — and in some markets, we play all four at once.</p>

  <div class="role-card">
    <div class="role-number">Role 01 — Importer</div>
    <h3>Getting the Right Technology Into the Country</h3>
    <p>In many markets, the biggest barrier to good energy projects is not money or ambition — it is access. Access to certified, high-quality technology that meets local regulatory requirements and can actually be deployed safely.</p>
    <p>As an importer, Baterino takes responsibility for that entire process: selecting the right technology for the market, navigating customs and compliance, coordinating supply chains, and ensuring that what arrives in-country is genuinely ready to be installed and operated.</p>
    <p>Getting this right at the import stage prevents problems at every stage that follows.</p>
    <div class="role-active"><strong>Currently active as importer in:</strong> Romania, Indonesia</div>
  </div>

  <div class="role-card">
    <div class="role-number">Role 02 — Distributor</div>
    <h3>Making Technology Available to the People Who Deploy It</h3>
    <p>Once technology is in-market, it needs to reach the installers, integrators, and developers who actually build energy systems for end customers. That is the distributor role — and it is one Baterino takes seriously.</p>
    <p>Distribution, done properly, is not just logistics. It means being a reliable source of supply, providing technical support to downstream partners, helping them size systems correctly, and being accountable for product quality end-to-end. A bad distribution chain creates bad installations. We are not interested in either.</p>
    <p>In markets where Baterino distributes, our partners get more than product. They get a technically capable partner who understands what they are installing and can support them when things get complicated.</p>
    <div class="role-active"><strong>Currently active as distributor in:</strong> Romania, Bulgaria</div>
  </div>

  <div class="role-card">
    <div class="role-number">Role 03 — After-Sales &amp; Lifecycle Support</div>
    <h3>The Work That Starts After Everyone Else Leaves</h3>
    <p>Here is an uncomfortable truth about the energy storage industry: most companies disappear after commissioning. The system is installed, the paperwork is signed, and the client is on their own.</p>
    <p>Baterino is built around the opposite philosophy. Energy storage systems are infrastructure — they are designed to run for ten years or more. Their performance over that time is not automatic. It requires monitoring, maintenance, and a partner who stays involved and accountable.</p>
    <p>Our after-sales role includes:</p>
    <ul>
      <li>Ongoing performance monitoring and remote diagnostics</li>
      <li>Structured maintenance and service pathways</li>
      <li>System optimization as operating conditions evolve</li>
      <li>Technical support for local partners and end users</li>
    </ul>
    <p>This is not a support hotline. It is a long-term operational relationship — the same discipline we bring to project delivery, applied to keeping systems running well for years afterwards.</p>
    <div class="role-active"><strong>Currently active in after-sales in:</strong> Romania, Indonesia</div>
  </div>

  <blockquote><p>Reliability is not a feature you specify at procurement. It is the result of staying involved.</p></blockquote>

  <div class="role-card">
    <div class="role-number">Role 04 — Enabler</div>
    <h3>Pushing Projects From Idea to Reality</h3>
    <p>The enabler role is the hardest to explain — and the one that matters most.</p>
    <p>Good energy projects fail all the time. Not because the technology doesn't work. Not because the demand isn't there. They fail because of structural barriers: no access to project finance, regulatory frameworks that don't accommodate the technology, absence of local expertise, supply chains that don't reach the project site, no one to coordinate the moving parts.</p>
    <p>As an enabler, Baterino steps in to remove those barriers. We work upstream of the project itself — helping structure deals, connect developers with financial partners, align technology choices with regulatory realities, and build the conditions that allow a project to actually happen.</p>
    <p>This might mean:</p>
    <ul>
      <li>Supporting project developers with structuring and feasibility</li>
      <li>Connecting projects with institutional or strategic finance</li>
      <li>Coordinating between technology providers, local partners, and authorities</li>
      <li>Solving the logistical and regulatory problems that kill projects before they start</li>
      <li>Taking end-to-end accountability from concept through to commissioning and beyond</li>
    </ul>
    <p>Not every market is ready for this level of involvement. But in markets where the conditions are right — and where the barriers are real — the enabler role is where Baterino creates its most significant impact.</p>
    <div class="role-active"><strong>Currently active as enabler in:</strong> Romania</div>
  </div>

  <p class="section-label">Where we are today</p>
  <h2>Current Market Presence at a Glance</h2>
  <div class="market-table">
    <div class="market-row">
      <div class="market-country">Romania</div>
      <div class="market-roles">Importer <span class="market-dot">·</span> Distributor <span class="market-dot">·</span> Enabler <span class="market-dot">·</span> After-Sales</div>
    </div>
    <div class="market-row">
      <div class="market-country">Bulgaria</div>
      <div class="market-roles">Distributor</div>
    </div>
    <div class="market-row">
      <div class="market-country">Indonesia</div>
      <div class="market-roles">Importer <span class="market-dot">·</span> After-Sales</div>
    </div>
  </div>

  <p>Baterino is a 100% Romanian-capital company — and the fact that a company founded in Romania in 2025 is already operating across three continents is not an accident. It is what happens when you build a structure designed for the world, not just for one market.</p>
  <p>We are actively developing our presence in additional markets across Europe, Asia-Pacific, the Middle East, and Africa. If you are working on energy infrastructure in a market where any of these four roles would add value, we want to hear from you.</p>

  <div class="closing-box">
    <h4>About Baterino</h4>
    <p>Baterino is a global energy infrastructure enabler focused on delivering reliable energy storage solutions for communities, industry, maritime, and critical service environments. Founded in Romania in 2025, we integrate proven technologies and support projects throughout their full lifecycle — as importers, distributors, enablers, and long-term after-sales partners.</p>
    <p class="closing-box-contact">Get in touch: <a href="mailto:inquiries@baterino.com">inquiries@baterino.com</a> &nbsp;·&nbsp; <a href="https://baterino.com">baterino.com</a></p>
  </div>

  <a href="/__LOCALE__/contact" class="btn-primary">Get in touch<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
</div>
      `,
    },
    {
      id: 'request-to-operation',
      slug: 'request-to-operation',
      title: '',
      author: '',
      date: '',
      location: '',
      category: 'insights.categoryCompany',
      image: '/images/delivery-enablement.jpg',
      content: `
<div class="article-rich article-projects">
  <p class="intro-lead">Energy storage projects fail more often during assessment and delivery than they do due to technology. The hardware works. The gaps between intake, routing, design, regulatory approval, and long-term support are where projects stall, overrun, or underdeliver.</p>
  <p class="intro-body">Baterino was built around this reality. Our delivery model is structured to close those gaps — through a disciplined assessment process, four specialist divisions, and a framework that stays active well beyond commissioning. This article explains how it works in practice.</p>

  <div class="pull-quote"><p>The question is never whether the technology works. It is whether the right technology reaches the right environment, at the right time, with the right support structure in place.</p></div>

  <div class="section">
    <div class="section-label">01 — Our Structure</div>
    <h2>Four Divisions. One Delivery Standard.</h2>
    <div class="divisions-intro"><p>Baterino operates through a central coordination team and four specialist divisions. All project requests — whether received centrally or directly by a division — pass through the same structured assessment process before any commitment is made. This ensures that every project is evaluated on the right technical, regulatory, and operational criteria from the outset.</p></div>

    <div class="division-card div-res">
      <div class="division-strip"></div>
      <div class="division-header">
        <div class="division-icon">🏠</div>
        <div class="division-meta">
          <div class="division-name">Baterino Residential</div>
          <div class="division-subtitle">Residential Energy &amp; Social Impact</div>
        </div>
      </div>
      <div class="division-body">
        <p class="division-desc">Focused on individual homeowners, residential communities, and off-grid settlements, Baterino Residential delivers modular energy storage solutions adapted to real household energy needs. This division also carries Baterino's social mission — running community support programs, providing preferential access for vulnerable groups, and leading initiatives that extend reliable energy to those who need it most.</p>
        <ul class="division-bullets">
          <li>Residential battery storage systems from ~5 kW to ~16 kW per installation</li>
          <li>Community microgrid solutions up to ~5 MW</li>
          <li>Integration with solar generation for full energy independence</li>
          <li>Social impact programs: senior citizen support, low-income household initiatives, disaster relief energy access</li>
          <li>Long-term residential after-sales and system monitoring</li>
        </ul>
      </div>
    </div>

    <div class="division-card div-pro">
      <div class="division-strip"></div>
      <div class="division-header">
        <div class="division-icon">🏭</div>
        <div class="division-meta">
          <div class="division-name">Baterino PRO</div>
          <div class="division-subtitle">Industrial Implementation &amp; Service</div>
        </div>
      </div>
      <div class="division-body">
        <p class="division-desc">Baterino PRO handles the full scope of industrial energy storage — from cabinet-based systems for commercial facilities to large-scale containerized BESS deployments for industrial complexes and grid-connected projects. As the company's largest division by project scale, PRO is also the central service arm responsible for after-sales support across all Baterino products and divisions.</p>
        <ul class="division-bullets">
          <li>Cabinet-based BESS from ~30 kW to ~220 kW per unit</li>
          <li>Containerized BESS from ~500 kW to multi-megawatt scale</li>
          <li>Renewable energy firming, peak shaving, and grid-connected deployments</li>
          <li>Central after-sales and lifecycle service for all Baterino installations</li>
          <li>Technical support, remote monitoring, and system optimization across sectors</li>
        </ul>
      </div>
    </div>

    <div class="division-card div-med">
      <div class="division-strip"></div>
      <div class="division-header">
        <div class="division-icon">🏥</div>
        <div class="division-meta">
          <div class="division-name">Baterino Med</div>
          <div class="division-subtitle">Medical &amp; Critical Systems</div>
        </div>
      </div>
      <div class="division-body">
        <p class="division-desc">Critical infrastructure operates under a different set of requirements. Zero downtime is not a target — it is a baseline. Baterino Med specializes in energy storage solutions for environments where power failure is not an acceptable outcome: hospitals, medical facilities, ambulance fleets, emergency response centers, and water treatment plants. Every system deployed by this division is engineered and validated for continuous, uninterrupted operation.</p>
        <ul class="division-bullets">
          <li>Ultra-reliable BESS for hospitals, clinics, and emergency services</li>
          <li>Rapid load-switching architectures for life-critical equipment</li>
          <li>Compliance with medical facility electrical and safety standards</li>
          <li>Priority after-sales response and redundancy planning</li>
          <li>Disaster-readiness configurations for infrastructure continuity</li>
        </ul>
      </div>
    </div>

    <div class="division-card div-sea">
      <div class="division-strip"></div>
      <div class="division-header">
        <div class="division-icon">⚓</div>
        <div class="division-meta">
          <div class="division-name">Baterino At Sea</div>
          <div class="division-subtitle">Maritime &amp; Offshore Operations</div>
        </div>
      </div>
      <div class="division-body">
        <p class="division-desc">Marine energy storage operates in some of the most demanding environments on earth — saltwater corrosion, constant vibration, humidity, and classification authority oversight. Baterino At Sea manages the full implementation of maritime energy storage projects: from system specification and marine compliance, through installation coordination on vessels, to long-term offshore operational support.</p>
        <ul class="division-bullets">
          <li>Marine-grade BESS for tugboats, ferries, tourist vessels, cargo ships, and offshore platforms</li>
          <li>LFP-based systems built for corrosion resistance and thermal stability at sea</li>
          <li>Compliance with marine classification society requirements</li>
          <li>Fish farm and aquaculture energy infrastructure</li>
          <li>Offshore supply vessel and OSV electrification programs</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">02 — The Assessment Process</div>
    <h2>How We Evaluate Every Project Before We Commit to It</h2>
    <p>Every energy storage project — regardless of size, sector, or originating division — goes through a structured assessment before any technical proposal or commercial commitment is made. This is not bureaucracy. It is how we ensure that every project we take on can be delivered to the standard we hold ourselves to.</p>

    <div class="process-track">
      <div class="process-step">
        <div class="step-node"><div class="step-circle">01</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Initial Request &amp; Intake</div>
          <div class="step-desc">A project request is received — either through Baterino's central coordination team or directly by the relevant division. The request is logged, categorized by sector, geography, and scale, and assigned to a primary contact. Within this stage, a first-pass feasibility screen is conducted to confirm the project is within Baterino's delivery scope.</div>
          <span class="step-tag">All Divisions</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">02</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Division Routing &amp; Assignment</div>
          <div class="step-desc">Based on the project's primary sector — residential, industrial, medical, or maritime — the request is formally routed to the appropriate division. For cross-sector projects, a lead division is designated with coordination across the relevant teams. The central team maintains oversight throughout.</div>
          <span class="step-tag">Central Team</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">03</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Technical &amp; Site Assessment</div>
          <div class="step-desc">The assigned division conducts a detailed technical assessment of the project requirements: energy demand analysis, load profile review, site conditions, grid connection parameters, environmental factors, and any sector-specific constraints. For maritime projects, vessel classification and operating environment are assessed. For medical, uptime and redundancy requirements are defined.</div>
          <span class="step-tag">Division Lead</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">04</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Technology Selection &amp; Partner Engagement</div>
          <div class="step-desc">Based on the technical assessment, the most suitable technology configuration is selected from Baterino's partner network — covering battery storage systems, solar generation, inverters, and balance-of-plant components. The relevant technology partners are engaged to confirm product availability, lead times, and any project-specific customization requirements.</div>
          <span class="step-tag">Technology Team</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">05</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Regulatory &amp; Compliance Verification</div>
          <div class="step-desc">Before any proposal is finalized, the regulatory landscape of the target country or region is mapped. This includes verification that the proposed technology holds the required certifications for that market, assessment of import and distribution requirements, grid connection approval processes, and — for maritime projects — alignment with the relevant classification authority. Where approvals are pending, a timeline is established as part of the project plan.</div>
          <span class="step-tag">Compliance</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">06</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Client Alignment &amp; Proposal</div>
          <div class="step-desc">With the technical, technological, and regulatory picture complete, Baterino engages the client in a structured alignment session. The proposed system configuration, delivery timeline, compliance pathway, and after-sales framework are presented and refined based on client feedback. The outcome is a clear, bankable proposal — not a generic quote.</div>
          <span class="step-tag">Client-Facing</span>
        </div>
      </div>
      <div class="process-step">
        <div class="step-node"><div class="step-circle">07</div><div class="step-line"></div></div>
        <div class="step-content">
          <div class="step-title">Project Structuring &amp; Go / No-Go</div>
          <div class="step-desc">A formal project structure is established: scope, responsibilities, funding pathway, delivery milestones, and after-sales commitment. For selected projects requiring financing, Baterino can support access to institutional or project finance through strategic partners. A go / no-go decision is made by both parties before procurement or deployment begins.</div>
          <span class="step-tag">Governance</span>
        </div>
      </div>
    </div>

    <div class="pull-quote"><p>We do not commit to a project we cannot deliver. The assessment process exists to protect both the client and our own delivery standard.</p></div>
  </div>

  <div class="section">
    <div class="section-label">03 — Implementation</div>
    <h2>How Projects Move from Approval to Operation</h2>
    <p>Once a project is approved and structured, implementation follows a phased approach designed to reduce risk at each stage and ensure the system is ready to perform from day one of operation.</p>

    <div class="phases-wrap">
      <div class="phase-row">
        <div class="phase-num">I</div>
        <div class="phase-content">
          <div class="phase-title">Engineering &amp; System Design</div>
          <div class="phase-desc">Detailed system architecture is finalized: electrical schematics, equipment specifications, integration interfaces, and site preparation requirements. Design is validated against the regulatory and compliance requirements established during assessment.</div>
        </div>
      </div>
      <div class="phase-row">
        <div class="phase-num">II</div>
        <div class="phase-content">
          <div class="phase-title">Procurement, Import &amp; Logistics</div>
          <div class="phase-desc">Equipment is procured from partner manufacturers and coordinated through Baterino's import and distribution network. Customs, documentation, and in-country logistics are managed to ensure equipment arrives on schedule and in compliance with local import requirements.</div>
        </div>
      </div>
      <div class="phase-row">
        <div class="phase-num">III</div>
        <div class="phase-content">
          <div class="phase-title">Installation &amp; Integration</div>
          <div class="phase-desc">On-site installation is managed through Baterino's local partner network, with technical oversight from the relevant division. Electrical integration, software configuration, and grid or vessel connection are completed according to the approved design and local safety standards.</div>
        </div>
      </div>
      <div class="phase-row">
        <div class="phase-num">IV</div>
        <div class="phase-content">
          <div class="phase-title">Testing, Commissioning &amp; Handover</div>
          <div class="phase-desc">Full system testing is conducted before commissioning: load testing, protection relay verification, BMS validation, and — where required — classification authority sign-off. The system is commissioned only when all performance and safety criteria are met. A structured handover is completed with the client's operational team.</div>
        </div>
      </div>
      <div class="phase-row">
        <div class="phase-num">V</div>
        <div class="phase-content">
          <div class="phase-title">After-Sales &amp; Lifecycle Support</div>
          <div class="phase-desc">Baterino PRO manages after-sales support across all divisions. Structured service pathways are established at commissioning — not after issues arise. Remote monitoring, scheduled maintenance, performance reporting, and system optimization are provided throughout the operational lifecycle, which for most systems spans a decade or more.</div>
        </div>
      </div>
    </div>
  </div>

  <div class="closing-block">
    <h3>Infrastructure is not delivered once. It is maintained, supported, and improved over time.</h3>
    <p>The assessment process and implementation framework described here reflect a single underlying principle: every Baterino project is treated as infrastructure from the first conversation — not as a product sale with a defined end date. That is what long-term reliability requires, and it is the standard every division holds itself to.</p>
  </div>

  <hr class="article-divider" />
  <div class="article-footer">
    <div class="article-tags">
      <span class="article-tag">Process</span>
      <span class="article-tag">Divisions</span>
      <span class="article-tag">Delivery</span>
      <span class="article-tag">Infrastructure</span>
    </div>
    <a href="/__LOCALE__/contact" class="btn-primary">Start a project<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
  </div>
</div>
      `,
    },
  ]

export function Article() {
  const { t } = useTranslation()
  const { locale, slug } = useParams<{ locale: string; slug: string }>()
  const fallback = FALLBACK_ARTICLES.find((a) => a.slug === slug || a.id === slug) ?? FALLBACK_ARTICLES[0]
  const articleKey = fallback ? (SLUG_TO_ARTICLE_KEY[fallback.slug] ?? 7) : 7
  const resolvedArticle = fallback
    ? {
        ...fallback,
        title: fallback.title || t(`insights.article${articleKey}.title`),
        author: fallback.author || t('insights.article7.author'),
        date: fallback.date || t(`insights.article${articleKey}.date`),
        location: fallback.location || t(`insights.article${articleKey}.location`),
        category: fallback.category
          ? (fallback.category.startsWith('insights.') ? t(fallback.category) : fallback.category)
          : t('insights.publicRelease'),
      }
    : null

  if (!resolvedArticle) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-body text-body-md text-neutral-500">Article not found.</p>
      </div>
    )
  }

  return (
    <article className="w-full bg-white">
      <SeoHead
        title={`${resolvedArticle.title} | ${resolvedArticle.author}`}
        description={
          resolvedArticle.slug === 'global-delivery-framework'
            ? t('insights.article7.description')
            : resolvedArticle.slug === 'baterino-roles-in-every-market'
              ? t('insights.article8.description')
              : resolvedArticle.slug === 'request-to-operation'
                ? t('insights.article9.description')
                : undefined
        }
        type="article"
      />
      {/* Article Header */}
      <section className="w-full bg-white px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px] text-center">
          <h1 className="mb-4 font-publicSans text-3xl font-extrabold uppercase leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {resolvedArticle.title}
          </h1>
          <p className="mb-4 font-body text-body-md text-neutral-600">
            by {resolvedArticle.author}
          </p>
          <p className="font-body text-body-sm uppercase tracking-wide text-neutral-600">
            {resolvedArticle.category} - {resolvedArticle.location} - {resolvedArticle.date}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full bg-white px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          {resolvedArticle.imagePlaceholder === 'gradient' ? (
            <div className="article-rich">
              <div className="hero-image-placeholder">
                <span className="hero-image-text">Global Presence · Local Execution</span>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-[10px]">
              <img
                src={resolvedArticle.image}
                alt={resolvedArticle.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          {resolvedArticle.slug === 'baterino-roles-in-every-market' ? (
            <RolesArticleContent />
          ) : resolvedArticle.slug === 'request-to-operation' ? (
            <ProjectsArticleContent locale={locale ?? 'en'} />
          ) : (
            <div
              className="prose prose-neutral max-w-none font-body text-body-md leading-relaxed text-neutral-700 prose-headings:font-heading prose-headings:font-bold prose-headings:text-neutral-900 prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-2xl prose-p:mb-6 prose-ul:mb-6 prose-ul:ml-6 prose-ul:list-disc prose-li:mb-2"
              dangerouslySetInnerHTML={{
                __html: resolvedArticle.content.replace(/__LOCALE__/g, locale ?? 'en'),
              }}
            />
          )}
        </div>
      </section>

      {/* Back to Insights */}
      <section className="w-full bg-white px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[900px]">
          <Link
            to={`/${locale ?? 'en'}/company/insights`}
            className="inline-flex items-center gap-2 font-body text-body-md font-bold text-neutral-900 transition-colors hover:text-neutral-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t('insights.backToInsights')}
          </Link>
        </div>
      </section>
    </article>
  )
}
