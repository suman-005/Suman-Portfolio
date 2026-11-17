import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  CheckCircle,
  ExternalLink,
  Radio,
  Terminal,
  X,
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { portfolioData, type Project } from '../data/portfolio';
import { gsap } from '../lib/gsap';
import { MagneticButton } from '../components/MagneticButton';
import type Lenis from 'lenis';
import pujapathHeroImg from '../assets/projects/pujapath/hero-bg.webp';
import financialPortalImg from '../assets/projects/financial-portal.svg';

interface SelectedWorkProps {
  reducedMotion?: boolean;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ reducedMotion = false }) => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const modalDialogRef = useRef<HTMLDivElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProject) {
        setActiveModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject]);

  // Lock background scroll when modal is open and coordinate with Lenis
  useEffect(() => {
    const lenisInstance = (window as unknown as { __lenis?: Lenis }).__lenis;

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      lenisInstance?.stop();
      // Focus modal dialog container for keyboard navigation
      setTimeout(() => {
        modalDialogRef.current?.focus({ preventScroll: true });
      }, 50);
    } else {
      document.body.style.overflow = '';
      lenisInstance?.start();
    }

    return () => {
      document.body.style.overflow = '';
      const activeLenis = (window as unknown as { __lenis?: Lenis }).__lenis;
      activeLenis?.start();
    };
  }, [activeModalProject]);

  // Scroll-triggered 2D entry animation
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;

    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const projects = portfolioData.projects;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="work-section site-container"
      aria-labelledby="work-heading"
    >
      <SectionHeader
        number="03 / 07"
        category="SELECTED WORK &amp; CASE STUDY"
        headline="REAL-WORLD ENGINEERING."
      />

      <div className="projects-container">
        {projects.map((project) => (
          <article
            key={project.id}
            ref={cardRef}
            className="project-feature"
          >
            {/* Left Column: Project Details */}
            <div className="project-details">
              <div className="project-badge-row">
                <span
                  className="section-number"
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {project.number}
                </span>
                <span className="label-editorial">{project.category}</span>
                <span className="project-status-pill">
                  <span
                    className="status-dot"
                    style={{ width: 6, height: 6, display: 'inline-block', marginRight: 4 }}
                  />
                  LIVE DEPLOYMENT
                </span>
              </div>

              <div>
                <h3
                  className="project-name"
                  onClick={() => setActiveModalProject(project)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view Technical Blueprint & Project Details"
                >
                  {project.title}
                </h3>
                <p
                  className="body-large"
                  style={{
                    marginTop: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                  }}
                >
                  "{project.description}"
                </p>
              </div>

              <p className="body-regular">{project.tagline}</p>

              {/* Technologies */}
              <div
                className="project-tech-list"
                aria-label="Technologies used in PujaPath"
              >
                {project.technologies.map((tech) => (
                  <span key={tech} className="badge-tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Key Verified Features */}
              <div className="project-features-list">
                <span className="label-editorial">VERIFIED APPLICATION CAPABILITIES</span>
                {project.features.map((feature) => (
                  <div key={feature.title} className="project-feature-item">
                    <CheckCircle size={15} className="feature-check-icon" />
                    <span>
                      <strong style={{ color: 'var(--text-primary)' }}>{feature.title}:</strong>{' '}
                      {feature.description}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions with Magnetic Interactions */}
              <div className="project-actions">
                {project.liveUrl && (
                  <MagneticButton strength={0.28} radius={85} disabled={reducedMotion}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial"
                      aria-label="Visit PujaPath live website (opens in new tab)"
                    >
                      <span>Visit Live Site</span>
                      <ArrowUpRight size={17} />
                    </a>
                  </MagneticButton>
                )}

                {project.repositoryUrl && (
                  <MagneticButton strength={0.25} radius={80} disabled={reducedMotion}>
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-ghost"
                      aria-label="View PujaPath GitHub repository (opens in new tab)"
                    >
                      <span>Source Code</span>
                      <ExternalLink size={15} />
                    </a>
                  </MagneticButton>
                )}

                <MagneticButton strength={0.22} radius={75} disabled={reducedMotion}>
                  <button
                    type="button"
                    className="btn-editorial-ghost"
                    onClick={() => setActiveModalProject(project)}
                    aria-haspopup="dialog"
                    aria-label="Open PujaPath technical blueprint and case study"
                  >
                    <span>Technical Blueprint</span>
                    <Terminal size={15} />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* Right Column: Visual Showcase Canvas */}
            <div
              className="project-visual-canvas"
              aria-label="PujaPath live application showcase"
              onClick={() => {
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                  <span className="mockup-dot" />
                </div>
                <div className="mockup-url-bar">{project.id === 'financial-practice-portal' ? 'audit-portal.secure.client' : 'pujapath-web.onrender.com'}</div>
                <div className="mockup-live-indicator">
                  <span className="status-dot" style={{ width: 6, height: 6 }} />
                  <span style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}>ONLINE</span>
                </div>
              </div>

              {/* Dynamic Visual Art / Mockup Piece */}
              <div style={{ position: 'relative', width: '100%', flexGrow: 1, overflow: 'hidden' }}>
                <img
                  src={project.image || (project.id === 'financial-practice-portal' ? '/projects/financial-portal.png' : '/projects/pujapath.webp')}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: project.id === 'financial-practice-portal' ? 'center top' : 'center 35%',
                    filter: 'contrast(1.05) brightness(0.95)',
                    transition: 'transform 0.5s ease',
                  }}
                  loading="lazy"
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(16,16,16,0.3) 0%, rgba(16,16,16,0.88) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      className="badge-tag"
                      style={{
                        backgroundColor: 'rgba(16,16,16,0.7)',
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: '#F7F7F5',
                        fontSize: '0.7rem',
                      }}
                    >
                      {project.id === 'financial-practice-portal' ? 'AUDIT & TAX COMPLIANCE' : 'PURBA BARDHAMAN HERITAGE'}
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {project.year ? 'EST. ' + project.year : 'EST. 2026'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: project.id === 'financial-practice-portal' ? '#38BDF8' : '#10B981',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                      }}
                    >
                      <Radio size={14} className="hero-scroll-arrow" />
                      <span>
                        {project.id === 'financial-practice-portal'
                          ? 'FASTAPI BACKEND & 256-BIT ENCRYPTION ACTIVE'
                          : 'LEAFLET GEOSPATIAL MAP & FASTAPI CLOUD ACTIVE'}
                      </span>
                    </div>

                    <p
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {project.tagline || project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Editorial Architecture Note */}
      <div className="work-placeholder-note">
        <span>ARCHITECTURAL INTEGRITY: DEPLOYED LIVE ON RENDER · ZERO FABRICATED METRICS.</span>
        <span>BURDWAN, WB, INDIA</span>
      </div>

      {/* Technical Blueprint & Case Study Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blueprint-modal-title"
          className="blueprint-modal-backdrop"
          onClick={() => setActiveModalProject(null)}
          data-lenis-prevent
        >
          <div
            ref={modalDialogRef}
            tabIndex={-1}
            className="blueprint-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            {/* Modal Header */}
            <div className="blueprint-modal-header">
              <div>
                <span className="label-editorial">{activeModalProject.category}</span>
                <h3
                  id="blueprint-modal-title"
                  className="font-display"
                  style={{ fontSize: '1.85rem', fontWeight: 700, marginTop: '0.25rem' }}
                >
                  {activeModalProject.title} — Technical Blueprint
                </h3>
                <p className="body-small" style={{ marginTop: '0.25rem' }}>
                  {activeModalProject.tagline}
                </p>
              </div>

              <button
                type="button"
                className="blueprint-modal-close"
                onClick={() => setActiveModalProject(null)}
                aria-label="Close blueprint modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Case Study Breakdown: THE IDEA, THE BUILD, THE EXPERIENCE, THE RESULT */}
            <div className="blueprint-story-grid">
              <div className="blueprint-story-card">
                <span className="blueprint-story-title">01 / THE IDEA</span>
                <p className="body-regular">{activeModalProject.story.idea}</p>
              </div>

              <div className="blueprint-story-card">
                <span className="blueprint-story-title">02 / THE BUILD</span>
                <p className="body-regular">{activeModalProject.story.build}</p>
              </div>

              <div className="blueprint-story-card">
                <span className="blueprint-story-title">03 / THE EXPERIENCE</span>
                <p className="body-regular">{activeModalProject.story.experience}</p>
              </div>

              <div className="blueprint-story-card">
                <span className="blueprint-story-title">04 / THE RESULT</span>
                <p className="body-regular">{activeModalProject.story.result}</p>
              </div>
            </div>

            {/* Verified Architectural Features Grid */}
            <div>
              <span
                className="label-editorial"
                style={{
                  display: 'block',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)',
                }}
              >
                VERIFIED PLATFORM CAPABILITIES
              </span>
              <div className="blueprint-features-grid">
                {activeModalProject.features.map((feature) => (
                  <div key={feature.title} className="blueprint-feature-box">
                    <span className="blueprint-feature-name">{feature.title}</span>
                    <p className="body-small">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Stack Specifications */}
            <div>
              <span
                className="label-editorial"
                style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)',
                }}
              >
                FULL STACK ECOSYSTEM
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {activeModalProject.technologies.map((tech) => (
                  <span key={tech} className="badge-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Footer with Live Link & Magnetic Actions */}
            <div className="blueprint-modal-footer">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <span className="status-dot" style={{ width: 6, height: 6 }} />
                <span>Render Cloud: Web Client &amp; FastAPI Backend</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {activeModalProject.liveUrl && (
                  <MagneticButton strength={0.25} radius={70} disabled={reducedMotion}>
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial"
                      aria-label="Open PujaPath in new tab"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink size={15} />
                    </a>
                  </MagneticButton>
                )}
                {activeModalProject.repositoryUrl && (
                  <MagneticButton strength={0.22} radius={65} disabled={reducedMotion}>
                    <a
                      href={activeModalProject.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-ghost"
                      aria-label="View PujaPath repository on GitHub (opens in new tab)"
                    >
                      <span>Source Code</span>
                      <ExternalLink size={15} />
                    </a>
                  </MagneticButton>
                )}
                <MagneticButton strength={0.2} radius={60} disabled={reducedMotion}>
                  <button
                    type="button"
                    className="btn-editorial-ghost"
                    onClick={() => setActiveModalProject(null)}
                  >
                    Close Blueprint
                  </button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
