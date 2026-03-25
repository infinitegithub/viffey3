import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './ServicesPage.module.css';

export const metadata = {
  title: 'Services — Viffey',
  description: 'Bespoke Web Design, Custom Architecture, and Technical SEO for brands that refuse to be ordinary.',
};

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      {/* Page Layout Wrapper */}
      <div className={styles.page}>
         <div className={styles.hero}>
           <h1 className={styles.title}>
             Custom engineering.<br />
             <em>Measurable results.</em>
           </h1>
           <div className={styles.intro}>
             <p>
               Many businesses struggle with the performance limitations of rigid WordPress themes and cookie-cutter page builders.
             </p>
             <p>
               At Viffey, we build <span className={styles.highlight}>bespoke, lightning-fast digital architectures</span> using modern technology (Next.js & React) designed from the ground up to rank higher on Google, convert better, and help your business scale efficiently.
             </p>
           </div>
         </div>

         <div className={styles.grid}>
           {/* Service 1 */}
           <div className={styles.card}>
             <div className={styles.cardHeader}>
               <span className={styles.cardNumber}>01 — ONLINE PRESENCE</span>
               <h3 className={styles.cardTitle}>Custom Web Development & SEO</h3>
             </div>
             <p className={styles.cardDesc}>
               Whether it's a high-converting landing page or a full-fledged robust storefront, we bring your vision to life. We prioritize technical SEO from day one—meaning your site doesn't just look stunning, it's structured perfectly for search engines to crawl, index, and rank at the top.
             </p>
             <div className={styles.techStack}>
               <span className={styles.tag}>Next.js</span>
               <span className={styles.tag}>React</span>
               <span className={styles.tag}>Technical SEO</span>
               <span className={styles.tag}>Performance</span>
             </div>
           </div>

           {/* Service 2 */}
           <div className={styles.card}>
             <div className={styles.cardHeader}>
               <span className={styles.cardNumber}>02 — HOSTING & SETUP</span>
               <h3 className={styles.cardTitle}>Rock-Solid Infrastructure</h3>
             </div>
             <p className={styles.cardDesc}>
               We handle the technical heavy lifting so you don't have to. We host your platform remotely on our robust, enterprise-grade infrastructure—or seamlessly help you set it up locally. No more shared server downtime, plugin conflicts, or slow database queries holding your business back.
             </p>
             <div className={styles.techStack}>
               <span className={styles.tag}>Cloud Architecture</span>
               <span className={styles.tag}>Zero-Downtime</span>
               <span className={styles.tag}>Secure</span>
             </div>
           </div>

           {/* Service 3 */}
           <div className={styles.card}>
             <div className={styles.cardHeader}>
               <span className={styles.cardNumber}>03 — AUTOMATIONS & AI</span>
               <h3 className={styles.cardTitle}>Next-Gen Systems</h3>
             </div>
             <p className={styles.cardDesc}>
               Enhance your business with cutting-edge AI and advanced automations. We build bespoke solutions, streamlined internal workflows, and even specialized, high-frequency trading bots. If it costs you time, we reverse-engineer it to run on autopilot.
             </p>
             <div className={styles.techStack}>
               <span className={styles.tag}>AI Integrations</span>
               <span className={styles.tag}>Custom Bots</span>
               <span className={styles.tag}>Workflows</span>
               <span className={styles.tag}>Trading Algorithms</span>
             </div>
           </div>
           
           <div className={styles.manifestoBlock}>
             <h2 className={styles.manifestoTitle}>The Viffey Standard</h2>
             <p className={styles.manifestoText}>
               A website is not a brochure. It is a 24/7 sales engine. If your site takes more than 2 seconds to load, you risk losing potential clients. That's why we choose modern, performant frameworks over legacy CMS platforms, ensuring your foundation is built for speed and sustainable growth.
             </p>
           </div>
         </div>
      </div>
      <Footer />
    </main>
  );
}
