'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineItems = useRef<(HTMLDivElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if gsap is loaded correctly (to avoid hydration/browser issues)
    if (!gsap) return;

    const ctx = gsap.context(() => {

      // Initial state
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } });

      tl.set(headlineItems.current, { opacity: 0, y: 150, skewY: 10 });
      tl.set(subRef.current, { opacity: 0, y: 30 });
      tl.set(scrollRef.current, { opacity: 0, scaleY: 0 });

      // Build sequence
      tl.to(headlineItems.current, {
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: 0.12,
        delay: 0.4
      });

      tl.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, '-=0.8');

      tl.to(scrollRef.current, {
        opacity: 1,
        scaleY: 1,
        duration: 0.8
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToHeadline = (el: HTMLDivElement | null) => {
    if (el && !headlineItems.current.includes(el)) {
      headlineItems.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.inner}>

        {/* Marginalia */}
        <span className={styles.marginNum}>01 // INDEX</span>

        {/* Headlines */}
        <div className={styles.headlines}>
          <div className={styles.lineWrap}>
            <div ref={addToHeadline} className={`${styles.line} ${styles.lineLeft}`}>
              <span className={styles.displayText}>
                WE BUILD <em className={styles.italic}>NEW</em>
              </span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <div ref={addToHeadline} className={`${styles.line} ${styles.lineRight}`}>
              <span className={styles.displayText}>
                DIGITAL <span className={styles.accentDot}>.</span>
              </span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <div ref={addToHeadline} className={`${styles.line} ${styles.lineLeft}`}>
              <span className={styles.displayText}>WORLDS</span>
            </div>
          </div>
        </div>

        {/* Sub Row */}
        <div ref={subRef} className={styles.sub}>
          <div className={styles.subLeft}>
            <span className={styles.label}>Est. 2024 — Worldwide</span>
          </div>
          <div className={styles.subRight}>
            <p className={styles.subText}>
              A full-service digital agency focused on building high-performance
              brands and products. We merge technical excellence with
              uncompromising aesthetic direction.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className={styles.scrollIndicator}>
          <span className={styles.scrollLabel}>Scroll to explore</span>
          <div className={styles.scrollLine} />
        </div>

      </div>
    </section>
  );
}
