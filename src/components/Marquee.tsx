import styles from './Marquee.module.css';
import type { Dictionary } from '@/i18n';

export default function Marquee({ dict }: { dict: Dictionary }) {
  return (
    <div className={styles.marquee}>
      <div className={styles.inner}>
        {/* Render twice for seamless loop */}
        {[1, 2].map(i => (
          <div key={i} className={styles.track}>
            {dict.marquee.map(it => (
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
