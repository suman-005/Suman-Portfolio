import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection = 'hero' }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll bleed when mobile navigation is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(targetId);
  };

  const navItems = [
    { label: 'WORK', id: '#work', target: 'work' },
    { label: 'TECH', id: '#tech', target: 'tech' },
    { label: 'ABOUT', id: '#about', target: 'about' },
    { label: 'CONTACT', id: '#contact', target: 'contact' },
  ];

  return (
    <>
      <header
        className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}
        role="banner"
      >
        <div className="site-container">
          <div className="navbar-inner">
            {/* Brand */}
            <a
              href="#hero"
              className="navbar-brand"
              onClick={(e) => handleLinkClick(e, 'hero')}
              aria-label="Suman Das - Back to top"
            >
              <span>{portfolioData.personal.name}</span>
              <span className="status-dot" title="Available for collaborations & internships" />
            </a>

            {/* Desktop Navigation */}
            <nav className="navbar-links" aria-label="Main Navigation">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.id}
                  className={`nav-link-item ${activeSection === item.target ? 'active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.target)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={`nav-mobile-toggle ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="nav-mobile-line" />
              <span className="nav-mobile-line" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal={mobileOpen}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-links">
          {navItems.map((item, index) => (
            <a
              key={item.id}
              href={item.id}
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, item.target)}
              tabIndex={mobileOpen ? 0 : -1}
            >
              <span>{item.label}</span>
              <span className="mobile-nav-index">0{index + 1}</span>
            </a>
          ))}
        </div>

        <div className="mobile-nav-footer">
          <div className="status-indicator">
            <span className="status-dot" />
            <span>BURDWAN, WB, INDIA</span>
          </div>
          <p className="body-small">BCA — Burdwan University (2024–2027)</p>
        </div>
      </div>
    </>
  );
};
