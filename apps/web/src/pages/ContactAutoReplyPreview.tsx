import { Link, useParams } from 'react-router-dom'
import { SEOHead } from '../components/SEOHead'
import { socialFacebookUrl, socialLinkedInUrl } from '../config/socialLinks'

/** Placeholders — mirrors client auto-reply in apps/api/src/routes/contact.ts */
const SAMPLE_NAME = 'Alex Morgan'
const SAMPLE_REF = 'BAT-A1B2C3-D4E5F6'

const AUTO_REPLY_FOOTPRINT =
  'You have received this message because you sent an inquiry via the baterino.com platform.'

const SOCIAL_ICON_SIZE = 20

/**
 * Open in browser: /{locale}/preview/contact-auto-reply
 * e.g. /en/preview/contact-auto-reply
 */
export function ContactAutoReplyPreview() {
  const { locale } = useParams<{ locale: string }>()
  const base = `/${locale ?? 'en'}`

  return (
    <>
      <SEOHead
        title="Contact confirmation email preview | Baterino"
        description="Preview of the automated confirmation email sent after submitting the contact form."
        noIndex
      />
      <article className="min-h-screen bg-neutral-100 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 font-body text-body-sm text-neutral-600">
            <Link
              to={`${base}/contact`}
              className="font-medium text-neutral-900 underline decoration-2 underline-offset-2 hover:no-underline"
            >
              ← Back to Contact
            </Link>
          </p>
          <p className="mb-6 font-body text-body-sm text-neutral-500">
            Preview only — this email is not sent from this page. Name and reference are sample values. The live
            email matches this layout (logo URL uses your public site in production).
          </p>

          <div className="mb-3 rounded-t-lg border border-b-0 border-neutral-200 bg-neutral-50 px-4 py-3">
            <p className="font-body text-body-xs font-semibold uppercase tracking-wide text-neutral-500">
              Subject
            </p>
            <p className="font-body text-body-sm text-neutral-900">
              We received your message — Baterino ({SAMPLE_REF})
            </p>
          </div>

          <div className="overflow-hidden rounded-b-lg border border-neutral-200 bg-white shadow-md">
            <div
              className="p-6"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: '#1a1a1a',
              }}
            >
              <table
                role="presentation"
                cellPadding={0}
                cellSpacing={0}
                width="100%"
                style={{ maxWidth: 560 }}
              >
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: 24 }}>
                      <img
                        src="/images/Baterino-Logo-black.png"
                        alt="Baterino"
                        width={200}
                        style={{ display: 'block', maxWidth: 200, height: 'auto', border: 0 }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style={{ margin: '0 0 16px' }}>Dear {SAMPLE_NAME},</p>
                      <p style={{ margin: '0 0 16px' }}>
                        Thank you for reaching out to Baterino. Your message has been received and logged under
                        reference number <strong>{SAMPLE_REF}</strong>.
                      </p>
                      <p style={{ margin: '0 0 16px' }}>
                        Our team is reviewing your inquiry and will respond shortly. If your request relates to a
                        specific market, the relevant local contact will follow up with you within 24–48 business
                        hours.
                      </p>
                      <p style={{ margin: '0 0 24px' }}>
                        We appreciate your interest and look forward to connecting.
                      </p>
                      <p style={{ margin: 0 }}>
                        Warm regards,
                        <br />
                        <strong>The Baterino Team</strong>
                      </p>
                      <p
                        style={{
                          margin: '16px 0 0',
                          fontSize: 14,
                          color: '#444',
                          lineHeight: 1.8,
                        }}
                      >
                        <a href="mailto:global@baterino.com" style={{ color: '#0B0726' }}>
                          global@baterino.com
                        </a>
                        &nbsp;|&nbsp;
                        <a href="https://baterino.com" style={{ color: '#0B0726' }}>
                          baterino.com
                        </a>
                        &nbsp;|&nbsp;
                        <a
                          href={socialFacebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', verticalAlign: 'middle' }}
                          title="Facebook"
                        >
                          <img
                            src="/images/social/email-facebook.svg"
                            alt="Facebook"
                            width={SOCIAL_ICON_SIZE}
                            height={SOCIAL_ICON_SIZE}
                            style={{
                              display: 'inline-block',
                              width: SOCIAL_ICON_SIZE,
                              height: SOCIAL_ICON_SIZE,
                              maxWidth: SOCIAL_ICON_SIZE,
                              maxHeight: SOCIAL_ICON_SIZE,
                              verticalAlign: 'middle',
                              objectFit: 'contain',
                            }}
                          />
                        </a>
                        &nbsp;
                        <a
                          href={socialLinkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', verticalAlign: 'middle' }}
                          title="LinkedIn"
                        >
                          <img
                            src="/images/social/email-linkedin.svg"
                            alt="LinkedIn"
                            width={SOCIAL_ICON_SIZE}
                            height={SOCIAL_ICON_SIZE}
                            style={{
                              display: 'inline-block',
                              width: SOCIAL_ICON_SIZE,
                              height: SOCIAL_ICON_SIZE,
                              maxWidth: SOCIAL_ICON_SIZE,
                              maxHeight: SOCIAL_ICON_SIZE,
                              verticalAlign: 'middle',
                              objectFit: 'contain',
                            }}
                          />
                        </a>
                      </p>
                      <p
                        style={{
                          margin: '24px 0 0',
                          paddingTop: 16,
                          borderTop: '1px solid #e5e5e5',
                          fontSize: 11,
                          lineHeight: 1.5,
                          color: '#888888',
                          fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                      >
                        {AUTO_REPLY_FOOTPRINT}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
