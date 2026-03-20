'use client';

import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [menuOpen]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.open : ''}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <a href="#" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <span className={styles.logoText}>VIFFEY</span>
        </a>

        {/* Desktop links */}
        <nav className={styles.desktopLinks}>
          <div className={styles.linkGrid}>
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className={styles.link}>
                <span className={styles.linkInner}>{l.label}</span>
              </a>
            ))}
          </div>
          <a href="#contact" className={styles.cta}>
            <span className={styles.ctaText}>Get in touch</span>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className={styles.toggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={styles.toggleLines}>
            <div className={styles.line} />
            <div className={styles.line} />
          </div>
        </button>

      </div>

      {/* Mobile Menu Backdrop */}
      <div className={styles.menu}>
        <div className={styles.menuInner}>
          <div className={styles.menuLinks}>
            {LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className={styles.menuLink}
                onClick={() => setMenuOpen(false)}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <span className={styles.menuLinkNum}>0{i + 1}</span>
                <span className={styles.menuLinkText}>{l.label}</span>
              </a>
            ))}
          </div>
          <div className={styles.menuFooter}>
            <span className={styles.menuLabel}>Email us</span>
            <a href="mailto:hello@viffey.com" className={styles.menuEmail}>hello@viffey.com</a>
          </div>
        </div>
      </div>
    </header>
  );
}
