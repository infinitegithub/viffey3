'use client';

import styles from './Services.module.css';

const SERVICES = [
  {
    num: '01',
    title: 'Visual Identity',
    desc: 'Deep strategy meeting design excellence. We create brand systems that stand the test of relative time.',
    tags: ['Logo Design', 'Guidelines', 'Collateral'],
  },
  {
    num: '02',
    title: 'Product Design',
    desc: 'Functional beauty for digital products. We focus on user behaviors to build tools that feel natural.',
    tags: ['UX/UI', 'Prototyping', 'Web Apps'],
  },
  {
    num: '03',
    title: 'Engineering',
    desc: 'High-performance code that matches the design intent. No compromises in motion or stability.',
    tags: ['Next.js', 'GSAP', 'React'],
  },
];

export default function Services() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.header}>
        <div className={styles.container}>
          <span className={styles.label}>03 — expertise</span>
          <h2 className={styles.heading}>
            What we do,<br />
            <em>better than most.</em>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        {SERVICES.map(s => (
          <div key={s.num} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.cardNum}>{s.num}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
            </div>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
            <div className={styles.cardLine} />
          </div>
        ))}
      </div>
    </section>
  );
}
