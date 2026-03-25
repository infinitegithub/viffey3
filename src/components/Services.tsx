'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    title: 'Online\nPresence',
    desc: 'Whether it is a high-converting landing page, a full-fledged store, or whatever your idea is, we can help bring it to life.',
    tags: ['Landing Pages', 'E-Commerce', 'Custom Dev'],
  },
  {
    num: '02',
    title: 'Hosting\n& Setup',
    desc: 'We handle the technical heavy lifting. We can host your platform remotely on our robust infrastructure or help you set it up locally.',
    tags: ['Cloud Hosting', 'Local Setup', 'Deployment'],
  },
  {
    num: '03',
    title: 'Automations\n& AI',
    desc: 'Enhance your business with cutting-edge AI and automations. We build custom solutions, automated workflows, and even specialized trading bots.',
    tags: ['AI Integrations', 'Bots', 'Trading Algorithms'],
  },
];

export default function Services() {
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
          <span className={styles.label}>Services</span>
          <h2 className={styles.heading}>
            What we<br />
            <em>do best</em>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((s) => (
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
