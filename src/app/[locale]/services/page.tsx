import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import styles from './ServicesPage.module.css';
import { getDictionary, type Locale } from '@/i18n';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.servicesPage.title,
    description: dict.servicesPage.description,
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const sp = dict.servicesPage;

  return (
    <main>
      <Nav dict={dict} locale={locale} />
      <div className={styles.page}>
         <div className={styles.hero}>
           <h1 className={styles.title}>
             {sp.heroTitle1}<br />
             <em>{sp.heroTitle2}</em>
           </h1>
           <div className={styles.intro}>
             <p>{sp.intro1}</p>
             <p>
               {sp.intro2.split('{highlight}')[0]}
               <span className={styles.highlight}>{sp.highlight}</span>
               {sp.intro2.split('{highlight}')[1]}
             </p>
           </div>
         </div>

         <div className={styles.grid}>
           {sp.cards.map((card) => (
             <div key={card.number} className={styles.card}>
               <div className={styles.cardHeader}>
                 <span className={styles.cardNumber}>{card.number}</span>
                 <h3 className={styles.cardTitle}>{card.title}</h3>
               </div>
               <p className={styles.cardDesc}>{card.desc}</p>
               <div className={styles.techStack}>
                 {card.tags.map((tag) => (
                   <span key={tag} className={styles.tag}>{tag}</span>
                 ))}
               </div>
             </div>
           ))}
           
           <div className={styles.manifestoBlock}>
             <h2 className={styles.manifestoTitle}>{sp.manifesto.title}</h2>
             <p className={styles.manifestoText}>{sp.manifesto.text}</p>
           </div>
         </div>
      </div>
      <Footer dict={dict} locale={locale} />
    </main>
  );
}
