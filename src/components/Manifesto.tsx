'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lines = [
    'Most agencies chase trends.',
    'We study what lasts.',
    'Then we make it move.',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lineEls = sectionRef.current?.querySelectorAll(`.${styles.manifestoLine}`);
      lineEls?.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1.1,
            delay: i * 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      gsap.fromTo(`.${styles.statsRow}`,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.${styles.statsRow}`,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      <div className={styles.inner}>

        {/* Margin label */}
        <div className={styles.marginLabel}>
          <span className={styles.label}>Manifesto</span>
        </div>

        <div className={styles.right}>
          {/* The manifesto */}
          <div className={styles.manifestoBlock}>
            {lines.map((line, i) => (
              <div key={i} className={styles.lineWrap}>
                <p
                  className={`${styles.manifestoLine} ${i === 1 ? styles.italic : ''}`}
                >
                  {line}
                  {i === 2 && <span className={styles.accent}>.</span>}
                </p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className={styles.statsRow}>
            {[
              { num: '7+',  label: 'Years of craft' },
              { num: '80+', label: 'Projects shipped' },
              { num: '3',   label: 'Core services' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}