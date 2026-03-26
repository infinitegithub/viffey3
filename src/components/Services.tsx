'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';
import type { Dictionary } from '@/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="services">
      <div className={styles.header}>
        <div className={styles.container}>
          <span className={styles.label}>{dict.services.label}</span>
          <h2 className={styles.heading}>
            {dict.services.headingLine1}<br />
            <em>{dict.services.headingLine2}</em>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        {dict.services.items.map((s) => (
          <article key={s.title} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.cardTitle}>
                {s.title.split('\n').map((l, i) => (
                  <span key={i}>{l}{i === 0 && <br />}</span>
                ))}
              </h3>
            </div>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map(t => (
                <span key={t} className={styles.tag}>{t}</span>
              ))}
            </div>
            <div className={styles.cardLine} />
          </article>
        ))}
      </div>
    </section>
  );
}
