'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Nav.module.css';
import type { Dictionary } from '@/i18n';

const localeLabels: Record<string, string> = {
  en: 'EN',
  fr: 'FR',
  ar: 'عر',
};

export default function Nav({ dict, locale }: { dict: Dictionary; locale: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const links = [
    { label: dict.nav.work, href: `/${locale}/#work` },
    { label: dict.nav.services, href: `/${locale}/services` },
    { label: dict.nav.about, href: `/${locale}/about` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Build locale-switched path: replace current locale prefix with new one
  const switchLocalePath = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/') || `/${newLocale}`;
  };

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href={`/${locale}`} className={styles.logo} onClick={(e) => {
            closeMenu();
            if (pathname === `/${locale}`) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}>
            <Image
              src="/viffey-logo.svg"
              alt="Viffey Logo"
              width={200}
              height={60}
              className={styles.logoImage}
              priority
            />
          </Link>

          <div className={styles.desktopLinks}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className={styles.navLink}>
                {l.label}
              </a>
            ))}
          </div>

          {/* Language Switcher */}
          <div className={styles.langSwitcher}>
            {Object.entries(localeLabels).map(([loc, label]) => (
              <Link
                key={loc}
                href={switchLocalePath(loc)}
                className={`${styles.langBtn} ${loc === locale ? styles.langBtnActive : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link href={`/${locale}/contact`} className={styles.cta}>
            {dict.nav.cta}
          </Link>

          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={closeMenu}
              style={{ transitionDelay: `${0.05 * i}s` }}
            >
              {l.label}
            </a>
          ))}
          {/* Mobile Language Switcher */}
          <div className={styles.mobileLangSwitcher}>
            {Object.entries(localeLabels).map(([loc, label]) => (
              <Link
                key={loc}
                href={switchLocalePath(loc)}
                className={`${styles.mobileLangBtn} ${loc === locale ? styles.langBtnActive : ''}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
        <div className={styles.mobileFooter}>
          <span className={styles.t_label}>{dict.nav.availableForProjects}</span>
        </div>
      </div>
    </>
  );
}
