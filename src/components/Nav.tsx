'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.css';

const links = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} onClick={(e) => {
            closeMenu();
            if (window.location.pathname === '/') {
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
            {links.map((l, i) => (
              <a key={l.href} href={l.href} className={styles.navLink}>
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact" className={styles.cta}>
            Start a project
          </a>

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
        </nav>
        <div className={styles.mobileFooter}>
          <span className={styles.t_label}>Available for projects</span>
        </div>
      </div>
    </>
  );
}
