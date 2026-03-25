'use client';

import { useRef } from 'react';
import styles from './Footer.module.css';

const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com', ext: true },
  { label: 'LinkedIn', href: 'https://linkedin.com', ext: true },
  { label: 'Instagram', href: 'https://instagram.com', ext: true },
  { label: 'TikTok', href: 'https://tiktok.com', ext: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>

      {/* ── CTA block ───────────────────────────────── */}
      <div className={styles.cta}>
        <div className={styles.ctaLeft}>
          <p className={styles.ctaLabel}>Ready to work together?</p>
          <h2 className={styles.ctaHeading}>
            Let's build something<br />
            <em>extraordinary.</em>
          </h2>
        </div>
        <div className={styles.ctaRight}>
          <a href="#contact" className={styles.ctaBtn}>
            <span className={styles.ctaBtnText}>Start a project</span>
            <span className={styles.ctaBtnArrow}>→</span>
          </a>
          <a href="mailto:contact@viffey.com" className={styles.ctaEmail}>
            {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@viffey.com'}
          </a>
        </div>
      </div>

      {/* ── Middle rule ─────────────────────────────── */}
      <div className={styles.rule} />

      {/* ── Link grid ───────────────────────────────── */}
      <div className={styles.grid}>
        <div className={styles.gridCol}>
          <span className={styles.colLabel}>Navigation</span>
          <nav className={styles.colLinks}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className={styles.colLink}>{l.label}</a>
            ))}
          </nav>
        </div>

        <div className={styles.gridCol}>
          <span className={styles.colLabel}>Social</span>
          <nav className={styles.colLinks}>
            {SOCIAL_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className={styles.colLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {l.label} <span className={styles.ext}>↗</span>
              </a>
            ))}
          </nav>
        </div>




      </div>

      {/* ── Bottom bar ──────────────────────────────── */}
      <div className={styles.bottom}>
        <span className={styles.copy}>© {year} Viffey. All rights reserved.</span>
        <span className={styles.copy}>Digital Agency — Est. 2024</span>
      </div>
    </footer>
  );
}
