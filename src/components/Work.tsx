'use client';

import { useRef } from 'react';
import styles from './Work.module.css';

const PROJECTS = [
  {
    num: '01',
    title: 'Aura Collective',
    cat: 'Brand Identity',
    year: '2024',
    desc: 'High-end retail direction and digital flagship for a premium furniture brand.',
  },
  {
    num: '02',
    title: 'Nexus Data Lab',
    cat: 'Complex Web App',
    year: '2024',
    desc: 'Live data visualization engine and dashboard for global logistics tracking.',
  },
  {
    num: '03',
    title: 'Studio Kôre',
    cat: 'Visual Experience',
    year: '2023',
    desc: 'Hyper-minimal portfolio for an architecture studio in Kyoto.',
  },
  {
    num: '04',
    title: 'Velvet Horizon',
    cat: 'E-commerce',
    year: '2023',
    desc: 'Next-gen shopping experience for a luxury fragrance house.',
  },
];

export default function Work() {
  return (
    <section className={styles.section} id="work">
      <div className={styles.header}>
        <span className={styles.label}>04 — SELECTED WORK</span>
        <h2 className={styles.heading}>
          Crafting digital<br />
          <em>masterpieces.</em>
        </h2>
      </div>

      <div className={styles.list}>
        {PROJECTS.map(p => (
          <div key={p.num} className={styles.item}>
            <div className={styles.itemInner}>
              <div className={styles.itemLeft}>
                <span className={styles.itemNum}>{p.num}</span>
                <h3 className={styles.itemTitle}>{p.title}</h3>
              </div>

              <div className={styles.itemMeta}>
                <span className={styles.itemCategory}>{p.cat}</span>
                <span className={styles.itemYear}>{p.year}</span>
              </div>

              <div className={styles.itemDesc}>
                {p.desc}
              </div>

              <div className={styles.itemArrow}>→</div>
            </div>
            <div className={styles.itemLine} />
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        {/* Placeholder for "View All" if needed */}
      </div>
    </section>
  );
}
