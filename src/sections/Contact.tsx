import React, { useState } from 'react';
import { ArrowUpRight, Copy, Mail } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { Toast } from '../components/Toast';
import { portfolioData } from '../data/portfolio';
import { MagneticButton } from '../components/MagneticButton';

interface ContactProps {
  reducedMotion?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ reducedMotion = false }) => {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const email = portfolioData.socials.email.address;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setToastMessage('Email address copied to clipboard');
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  return (
    <section
      id="contact"
      className="contact-section site-container"
      aria-labelledby="contact-heading"
    >
      <SectionHeader
        number="07 / 07"
        category="DIRECT COMMUNICATION"
      />

      <div className="contact-layout">
        <div>
          <h2 id="contact-heading" className="contact-headline">
            LET'S BUILD
            <br />
            SOMETHING.
          </h2>
          <p className="body-large" style={{ marginTop: '2rem', maxWidth: '580px' }}>
            Have an idea, opportunity, project, or collaboration in mind? Let's talk.
          </p>
        </div>

        <div className="contact-details">
          {/* Quick Copy Box */}
          <div className="contact-copy-box">
            <span className="label-editorial">PRIMARY INBOX</span>
            <div className="contact-email-val">{email}</div>

            <div className="contact-button-row">
              <MagneticButton strength={0.28} radius={80} disabled={reducedMotion}>
                <button
                  type="button"
                  className="btn-editorial"
                  onClick={handleCopyEmail}
                >
                  <span>Copy Email</span>
                  <Copy size={16} />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.24} radius={75} disabled={reducedMotion}>
                <a
                  href={`mailto:${email}`}
                  className="btn-editorial-ghost"
                >
                  <span>Open Mailer</span>
                  <Mail size={16} />
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="contact-socials-grid">
            <MagneticButton strength={0.2} radius={70} disabled={reducedMotion}>
              <a
                href={portfolioData.socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="GitHub profile (opens in new tab)"
                style={{ width: '100%' }}
              >
                <span>GitHub</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="label-editorial">{portfolioData.socials.github.handle}</span>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2} radius={70} disabled={reducedMotion}>
              <a
                href={portfolioData.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="Instagram profile (opens in new tab)"
                style={{ width: '100%' }}
              >
                <span>Instagram</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="label-editorial">{portfolioData.socials.instagram.handle}</span>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2} radius={70} disabled={reducedMotion}>
              <a
                href={portfolioData.socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-link"
                aria-label="LinkedIn profile (opens in new tab)"
                style={{ width: '100%' }}
              >
                <span>LinkedIn</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="label-editorial">{portfolioData.socials.linkedin.handle}</span>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} isVisible={toastVisible} />
    </section>
  );
};
