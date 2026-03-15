import { useState } from 'react'

const ROLES = [
  {
    id: 1,
    label: 'Importer',
    title: 'Importer',
    subtitle: 'Getting the Right Technology Into the Country',
    content: (
      <>
        <p>
          In many markets, the biggest barrier to good energy projects is not money or ambition — it is access. Access to certified, high-quality technology that meets local regulatory requirements and can actually be deployed safely.
        </p>
        <p>
          As an importer, Baterino takes responsibility for that entire process: selecting the right technology for the market, navigating customs and compliance, coordinating supply chains, and ensuring that what arrives in-country is genuinely ready to be installed and operated.
        </p>
        <p>Getting this right at the import stage prevents problems at every stage that follows.</p>
        <div className="role-active">
          <strong>Currently active as importer in:</strong> Romania, Indonesia
        </div>
      </>
    ),
  },
  {
    id: 2,
    label: 'Distributor',
    title: 'Distributor',
    subtitle: 'Making Technology Available to the People Who Deploy It',
    content: (
      <>
        <p>
          Once technology is in-market, it needs to reach the installers, integrators, and developers who actually build energy systems for end customers. That is the distributor role — and it is one Baterino takes seriously.
        </p>
        <p>
          Distribution, done properly, is not just logistics. It means being a reliable source of supply, providing technical support to downstream partners, helping them size systems correctly, and being accountable for product quality end-to-end. A bad distribution chain creates bad installations. We are not interested in either.
        </p>
        <p>
          In markets where Baterino distributes, our partners get more than product. They get a technically capable partner who understands what they are installing and can support them when things get complicated.
        </p>
        <div className="role-active">
          <strong>Currently active as distributor in:</strong> Romania, Bulgaria
        </div>
      </>
    ),
  },
  {
    id: 3,
    label: 'After-Sales & Lifecycle Support',
    title: 'After-Sales & Lifecycle Support',
    subtitle: 'The Work That Starts After Everyone Else Leaves',
    content: (
      <>
        <p>
          Here is an uncomfortable truth about the energy storage industry: most companies disappear after commissioning. The system is installed, the paperwork is signed, and the client is on their own.
        </p>
        <p>
          Baterino is built around the opposite philosophy. Energy storage systems are infrastructure — they are designed to run for ten years or more. Their performance over that time is not automatic. It requires monitoring, maintenance, and a partner who stays involved and accountable.
        </p>
        <p>Our after-sales role includes:</p>
        <ul>
          <li>Ongoing performance monitoring and remote diagnostics</li>
          <li>Structured maintenance and service pathways</li>
          <li>System optimization as operating conditions evolve</li>
          <li>Technical support for local partners and end users</li>
        </ul>
        <p>
          This is not a support hotline. It is a long-term operational relationship — the same discipline we bring to project delivery, applied to keeping systems running well for years afterwards.
        </p>
        <div className="role-active">
          <strong>Currently active in after-sales in:</strong> Romania, Indonesia
        </div>
      </>
    ),
  },
  {
    id: 4,
    label: 'Enabler',
    title: 'Enabler',
    subtitle: 'Pushing Projects From Idea to Reality',
    content: (
      <>
        <p>The enabler role is the hardest to explain — and the one that matters most.</p>
        <p>
          Good energy projects fail all the time. Not because the technology doesn't work. Not because the demand isn't there. They fail because of structural barriers: no access to project finance, regulatory frameworks that don't accommodate the technology, absence of local expertise, supply chains that don't reach the project site, no one to coordinate the moving parts.
        </p>
        <p>
          As an enabler, Baterino steps in to remove those barriers. We work upstream of the project itself — helping structure deals, connect developers with financial partners, align technology choices with regulatory realities, and build the conditions that allow a project to actually happen.
        </p>
        <p>This might mean:</p>
        <ul>
          <li>Supporting project developers with structuring and feasibility</li>
          <li>Connecting projects with institutional or strategic finance</li>
          <li>Coordinating between technology providers, local partners, and authorities</li>
          <li>Solving the logistical and regulatory problems that kill projects before they start</li>
          <li>Taking end-to-end accountability from concept through to commissioning and beyond</li>
        </ul>
        <p>
          Not every market is ready for this level of involvement. But in markets where the conditions are right — and where the barriers are real — the enabler role is where Baterino creates its most significant impact.
        </p>
        <div className="role-active">
          <strong>Currently active as enabler in:</strong> Romania
        </div>
      </>
    ),
  },
] as const

export function RolesArticleContent() {
  const [activeRole, setActiveRole] = useState(1)
  const activeContent = ROLES.find((r) => r.id === activeRole) ?? ROLES[0]

  return (
    <div className="article-rich article-roles">
      <div className="about-inner">
        <div className="about-label">About Baterino</div>
        <p>
          Baterino is a 100% Romanian-capital company, founded in 2025 and built from day one with a global vision. In under a year, Baterino has established active operations in Romania, Bulgaria, and Indonesia. We are not a product manufacturer — we are an energy infrastructure enabler, integrating proven technologies across battery storage, solar, inverters, and accessories, and supporting projects from concept through to long-term operation.
        </p>
      </div>

      <p className="section-label">The bigger picture</p>
      <h2>One Company. Four Roles. Any Market.</h2>
      <blockquote>
        <p>We don't ask 'what can we sell here'. We ask 'what role does this market need us to play'.</p>
      </blockquote>
      <p>
        Most energy companies have a fixed identity: manufacturer, EPC contractor, installer, distributor. They enter every market the same way, offering the same thing. Baterino was built differently. Our structure allows us to read what a market actually needs and adapt our role accordingly — becoming whatever creates the most value, the most reliably, for the longest time.
      </p>
      <p>
        What makes this model work is that our four roles are not separate business units or separate products. They are expressions of the same underlying capability — the ability to understand a market, identify what it needs, and deploy the right combination of technology, expertise, and support to create lasting infrastructure.
      </p>
      <p>
        As new markets open up, the same logic applies. We assess what role — or combination of roles — creates the most value. We build the structure to deliver it. And we stay.
      </p>

      <p className="section-label">First, let's clear something up</p>
      <h2>We Are Not Just an EPC</h2>
      <p>
        EPC — Engineering, Procurement, and Construction — is how most people in the industry understand project delivery. A company designs, procures, builds, and hands over. The contract ends. The relationship ends.
      </p>
      <p>
        Baterino can do all of that. But our model does not stop there, and it does not always start there either. Depending on what a market needs, we step in at different points in the value chain and play different roles. Sometimes we are upstream, bringing technology into a country for the first time. Sometimes we are downstream, making sure a system installed two years ago is still performing at its best. Sometimes we are both.
      </p>
      <p>There are four roles we play — and in some markets, we play all four at once.</p>

      {/* Role tabs */}
      <div className="roles-tabs">
        {ROLES.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => setActiveRole(role.id)}
            className={`roles-tab ${activeRole === role.id ? 'roles-tab-active' : ''}`}
          >
            {role.label}
          </button>
        ))}
      </div>

      {/* Role content */}
      <div className="role-card">
        <div className="role-number">
          Role 0{activeContent.id} — {activeContent.title}
        </div>
        <h3>{activeContent.subtitle}</h3>
        {activeContent.content}
      </div>

      {activeRole === 3 && (
        <blockquote>
          <p>Reliability is not a feature you specify at procurement. It is the result of staying involved.</p>
        </blockquote>
      )}

      <p className="section-label">Where we are today</p>
      <h2>Current Market Presence at a Glance</h2>
      <div className="market-table">
        <div className="market-row">
          <div className="market-country">Romania</div>
          <div className="market-roles">
            Importer <span className="market-dot">·</span> Distributor <span className="market-dot">·</span> Enabler <span className="market-dot">·</span> After-Sales
          </div>
        </div>
        <div className="market-row">
          <div className="market-country">Bulgaria</div>
          <div className="market-roles">Distributor</div>
        </div>
        <div className="market-row">
          <div className="market-country">Indonesia</div>
          <div className="market-roles">
            Importer <span className="market-dot">·</span> After-Sales
          </div>
        </div>
      </div>

      <p>
        Baterino is a 100% Romanian-capital company — and the fact that a company founded in Romania in 2025 is already operating across three continents is not an accident. It is what happens when you build a structure designed for the world, not just for one market.
      </p>
      <p>
        We are actively developing our presence in additional markets across Europe, Asia-Pacific, the Middle East, and Africa. If you are working on energy infrastructure in a market where any of these four roles would add value, we want to hear from you.
      </p>
    </div>
  )
}
