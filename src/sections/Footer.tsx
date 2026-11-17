import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { MagneticButton } from '../components/MagneticButton';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer className="footer-container site-container" role="contentinfo">
      <div className="footer-top">
        <div>
          <div className="footer-brand">{portfolioData.personal.name}</div>
          <p className="body-small" style={{ marginTop: '0.25rem' }}>
            {portfolioData.personal.role}
          </p>
          <p className="body-small">
            {portfolioData.personal.location} · {portfolioData.personal.coordinates}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <a
            href={portfolioData.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-editorial hover-underline"
            aria-label="GitHub profile (opens in new tab)"
          >
            GITHUB
          </a>
          <a
            href={portfolioData.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-editorial hover-underline"
            aria-label="Instagram profile (opens in new tab)"
          >
            INSTAGRAM
          </a>
          <a
            href={portfolioData.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="label-editorial hover-underline"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${portfolioData.socials.email.address}`}
            className="label-editorial hover-underline"
            aria-label="Send email to Suman Das"
          >
            EMAIL
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <span>© {portfolioData.colophon.year} {portfolioData.personal.name}. ALL RIGHTS RESERVED.</span>
        </div>

        <div>
          <span>{portfolioData.colophon.stack}</span>
        </div>

        <div>
          <MagneticButton strength={0.28} radius={70}>
            <button
              type="button"
              className="footer-back-to-top"
              onClick={onBackToTop}
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} />
            </button>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};
