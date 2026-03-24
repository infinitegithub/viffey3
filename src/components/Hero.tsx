'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);
  const line2Ref   = useRef<HTMLDivElement>(null);
  const line3Ref   = useRef<HTMLDivElement>(null);
  const line4Ref   = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.set([line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current, subRef.current, scrollRef.current], {
        opacity: 0,
        yPercent: 100,
      });

      tl.to(line1Ref.current, { yPercent: 0, opacity: 1, duration: 1.2 }, 0.4)
        .to(line2Ref.current, { yPercent: 0, opacity: 1, duration: 1.2 }, 0.55)
        .to(line3Ref.current, { yPercent: 0, opacity: 1, duration: 1.2 }, 0.70)
        .to(line4Ref.current, { yPercent: 0, opacity: 1, duration: 1.2 }, 0.85)
        .to(subRef.current,   { yPercent: 0, opacity: 1, duration: 0.9 }, 1.1)
        .to(scrollRef.current,{ yPercent: 0, opacity: 1, duration: 0.8 }, 1.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="home">
      <div className={styles.inner}>



        {/* Main headline — four lines to match your local vision */}
        <div className={styles.headlines}>
          <div className={styles.lineWrap}>
            <div ref={line1Ref} className={`${styles.line} ${styles.lineLeft}`}>
              <span className={styles.displayText}>WE BUILD</span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <div ref={line2Ref} className={`${styles.line} ${styles.lineRight}`}>
              <span className={`${styles.displayText} ${styles.italic}`}>NEW</span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <div ref={line3Ref} className={`${styles.line} ${styles.lineLeft}`}>
              <span className={styles.displayText}>DIGITAL</span>
            </div>
          </div>

          <div className={styles.lineWrap}>
            <div ref={line4Ref} className={`${styles.line} ${styles.lineRight}`}>
              <span className={styles.displayText}>
                WORLDS
                <span className={styles.accentDot}>.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sub content row */}
        <div ref={subRef} className={styles.sub}>
          <div className={styles.subLeft}>
            <span className={styles.label}>Digital Agency — Est. 2024</span>
          </div>
          <div className={styles.subRight}>
            <p className={styles.subText}>
              Web design & development, brand identity,<br />
              and digital strategy for brands that refuse<br />
              to be ordinary.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </div>
    </section>
  );
}