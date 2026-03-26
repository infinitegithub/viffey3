'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';
import type { Dictionary } from '@/i18n';

// Register ScrollTrigger with error handling
let gsapReady = false;
try {
  gsap.registerPlugin(ScrollTrigger);
  gsapReady = true;
} catch (e) {
  console.warn('[Contact] GSAP ScrollTrigger registration failed:', e);
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact({ dict, hideQA = false }: { dict: Dictionary; hideQA?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const t = dict.contact;

  // Scroll-triggered reveal (with GSAP error handling)
  useEffect(() => {
    if (!gsapReady) return;

    const ctx = gsap.context(() => {
      try {
        gsap.fromTo(headRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
          }
        );
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 85%' },
          }
        );
      } catch (e) {
        console.warn('[Contact] GSAP animation error:', e);
        if (headRef.current) headRef.current.style.opacity = '1';
        if (formRef.current) formRef.current.style.opacity = '1';
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };

  const isFieldInvalid = (field: string, value: string) =>
    touched[field] && !value.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setStatus('error');
        setErrorMsg(json.error ?? t.errorDefault);
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
      setErrorMsg(t.errorNetwork);
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      <div className={styles.inner}>

        {/* Header row */}
        <div className={styles.headerRow}>
          <span className={styles.label}>{t.label}</span>
          <h2 ref={headRef} className={styles.heading}>
            {t.headingLine1}<br />
            <em>{t.headingLine2}</em>
          </h2>
        </div>

        {/* Two columns: form + info */}
        <div className={styles.cols}>

          {/* Left — Form */}
          <div className={styles.formCol}>
            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>{t.successTitle}</h3>
                <p className={styles.successSub}>{t.successSub}</p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setStatus('idle')}
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>

                {/* Row 1 — Name + Email */}
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="name">
                      {t.fullName} <span className={styles.required}>{t.required}</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t.placeholder.name}
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${isFieldInvalid('name', form.name) ? styles.inputError : ''}`}
                      required
                    />
                    {isFieldInvalid('name', form.name) && (
                      <span className={styles.fieldError}>{t.validation.nameRequired}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      {t.email} <span className={styles.required}>{t.required}</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.placeholder.email}
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${isFieldInvalid('email', form.email) ? styles.inputError : ''}`}
                      required
                    />
                    {isFieldInvalid('email', form.email) && (
                      <span className={styles.fieldError}>{t.validation.emailRequired}</span>
                    )}
                  </div>
                </div>

                {/* Row 2 — Phone */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="phone">
                    {t.phone}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder={t.placeholder.phone}
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                </div>

                {/* Row 4 — Message */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    {t.projectBrief} <span className={styles.required}>{t.required}</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={t.placeholder.message}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${styles.textarea} ${isFieldInvalid('message', form.message) ? styles.inputError : ''}`}
                    required
                  />
                  {isFieldInvalid('message', form.message) && (
                    <span className={styles.fieldError}>{t.validation.messageRequired}</span>
                  )}
                </div>

                {/* Server error */}
                {status === 'error' && (
                  <div className={styles.serverError}>{errorMsg}</div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'sending'}
                >
                  <span className={styles.submitText}>
                    {status === 'sending' ? t.sending : t.sendMessage}
                  </span>
                  <span className={styles.submitArrow} aria-hidden="true">→</span>
                </button>

              </form>
            )}
          </div>

          {/* Right — Info column */}
          <aside className={styles.infoCol}>
            <div className={styles.infoEmail}>
              <span className={styles.infoLabel}>{t.emailLabel}</span>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@viffey.com'}`} className={styles.email}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@viffey.com'}
              </a>
            </div>

            <div className={styles.infoBlocks}>
              {[
                { label: t.responseTime, value: t.responseValue },
              ].map(b => (
                <div key={b.label} className={styles.infoBlock}>
                  <span className={styles.infoLabel}>{b.label}</span>
                  <span className={styles.infoValue}>{b.value}</span>
               </div>
              ))}
            </div>

            <div className={styles.crmNote}>
              <span className={styles.infoLabel}>{t.dataLabel}</span>
              <p className={styles.crmText}>{t.dataText}</p>
            </div>

            {!hideQA && (
              <div className={styles.crmNote} style={{ marginTop: '2.5rem' }}>
                <span className={styles.infoLabel}>{t.qa.label}</span>
                {t.qa.items.map((item, idx) => (
                  <p key={idx} className={styles.crmText} style={{ marginBottom: idx < t.qa.items.length - 1 ? '1.25rem' : undefined }}>
                    <strong style={{ color: 'var(--white)', fontWeight: 500 }}>{item.q}</strong><br />
                    {item.a}
                  </p>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
