import styles from './Marquee.module.css';

const ITEMS = [
  'Development',
  'Interactivity',
  'Motion Direction',
  'Visual Identity',
  'Digital Experiences',
  'Technical Excellence',
  'Next.js Specialists',
  'GSAP Animations',
];

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.inner}>
        {/* Render twice for seamless loop */}
        {[1, 2].map(i => (
          <div key={i} className={styles.track}>
            {ITEMS.map(it => (
              <div key={it} className={styles.item}>
                <span className={styles.dot}>•</span>
                {it}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.overlay} />
    </div>
  );
}
