'use client';

import { useRef } from 'react';
import styles from './Footer.module.css';
import type { Dictionary } from '@/i18n';

const SOCIAL_LINKS = [
  { label: 'Twitter', href: 'https://twitter.com', ext: true },
  { label: 'LinkedIn', href: 'https://linkedin.com', ext: true },
  { label: 'Instagram', href: 'https://instagram.com', ext: true },
  { label: 'TikTok', href: 'https://tiktok.com', ext: true },
];

export default function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: dict.nav.work, href: `/${locale}/#work` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className={styles.footer}>

      {/* ── CTA block ───────────────────────────────── */}
      <div className={styles.cta}>
        <div className={styles.ctaLeft}>
          <p className={styles.ctaLabel}>{dict.footer.ctaLabel}</p>
          <h2 className={styles.ctaHeading}>
            {dict.footer.ctaHeadingLine1}<br />
            <em>{dict.footer.ctaHeadingLine2}</em>
          </h2>
        </div>
        <div className={styles.ctaRight}>
          <a href={`/${locale}/contact`} className={styles.ctaBtn}>
            <span className={styles.ctaBtnText}>{dict.footer.ctaBtn}</span>
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
          <span className={styles.colLabel}>{dict.footer.navLabel}</span>
          <nav className={styles.colLinks}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className={styles.colLink}>{l.label}</a>
            ))}
          </nav>
        </div>

        <div className={styles.gridCol}>
          <span className={styles.colLabel}>{dict.footer.socialLabel}</span>
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
        <span className={styles.copy}>{dict.footer.copyright.replace('{year}', String(year))}</span>
        <span className={styles.copy}>{dict.footer.tagline}</span>
      </div>
    </footer>
  );
}
