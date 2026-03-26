'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';
import type { Dictionary } from '@/i18n';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_COLORS = ['#1A1714', '#141718', '#181614', '#141616'];

export default function Work({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll(`.${styles.item}`);
      items?.forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="work">
      <div className={styles.header}>
        <span className={styles.label}>{dict.work.label}</span>
        <h2 className={styles.heading}>
          {dict.work.headingLine1}<br /><em>{dict.work.headingLine2}</em>
        </h2>
      </div>

      <div className={styles.list}>
        {dict.work.projects.map((p, idx) => (
          <article key={p.title} className={styles.item} data-cursor>
            <div className={styles.itemInner}>
              <div className={styles.itemLeft}>
                <h3 className={styles.itemTitle}>{p.title}</h3>
              </div>

              <div className={styles.itemMeta}>
                <span className={styles.itemCategory}>{p.category}</span>
                <span className={styles.itemYear}>{p.year}</span>
              </div>

              <p className={styles.itemDesc}>{p.desc}</p>

              <div className={styles.itemArrow}>→</div>
            </div>

            {/* Accent line */}
            <div className={styles.itemLine} />
          </article>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.label}>{dict.work.footer}</span>
      </div>
    </section>
  );
}