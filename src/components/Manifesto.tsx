'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';

// Register with try/catch to ensure browser-only exec
try {
  gsap.registerPlugin(ScrollTrigger);
} catch (e) {
  console.warn('[Manifesto] Plugin error:', e);
}

const STATS = [
  { label: 'Founded', value: '2024' },
  { label: 'Completed projects', value: '40+' },
  { label: 'Current clients', value: '12' },
  { label: 'Avg lead time', value: '24h' },
];

export default function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if GSAP is available and we're in browser
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {

      // Reveal text
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Reveal stats
      gsap.fromTo(statsRef.current?.children ?? [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.section} id="manifesto">
      <div className={styles.inner}>

        <div className={styles.left}>
          <span className={styles.label}>02 — Manifesto</span>
        </div>

        <div className={styles.right}>
          <div ref={textRef} className={styles.content}>
            <p className={styles.heroText}>
              In a digital landscape cluttered with generic solutions, we advocate for
              <em className={styles.ital}> meticulous intentionality.</em>
            </p>
            <p className={styles.bodyText}>
              Everything we create for our clients is driven by a simple belief:
              Quality isn't just a goal, but a baseline. By merging minimalist
              aesthetics with raw technical capabilities, we deliver digital
              products that don't just solve problems—they define standards.
            </p>
          </div>

          {/* Stats grid */}
          <div ref={statsRef} className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
