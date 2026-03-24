'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    title: 'Lumina',
    category: 'Web Design · Development',
    year: '2024',
    desc: 'Full rebrand and e-commerce build for a luxury skincare brand. 2.4× conversion lift post-launch.',
    color: '#1A1714',
  },
  {
    id: '02',
    title: 'Forma Studio',
    category: 'Brand Identity',
    year: '2024',
    desc: 'Visual identity system for an architecture studio. Wordmark, type system, and print collateral.',
    color: '#141718',
  },
  {
    id: '03',
    title: 'Axis Capital',
    category: 'Web Design · Strategy',
    year: '2023',
    desc: 'Digital presence for a private equity firm. Positioning, copy, and a site that commands respect.',
    color: '#181614',
  },
  {
    id: '04',
    title: 'Noor Health',
    category: 'Web Design · Branding',
    year: '2023',
    desc: 'End-to-end brand and product website for a digital health startup. Series A accelerant.',
    color: '#141616',
  },
];

export default function Work() {
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
        <span className={styles.label}>Selected Work</span>
        <h2 className={styles.heading}>
          Recent<br /><em>projects</em>
        </h2>
      </div>

      <div className={styles.list}>
        {projects.map((p) => (
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
        <span className={styles.label}>All work available upon request</span>
      </div>
    </section>
  );
}