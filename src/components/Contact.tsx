'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

// Register ScrollTrigger with error handling
let gsapReady = false;
try {
  gsap.registerPlugin(ScrollTrigger);
  gsapReady = true;
} catch (e) {
  console.warn('[Contact] GSAP ScrollTrigger registration failed:', e);
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
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
        // Fallback: show elements immediately
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
        setErrorMsg(json.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
      setTouched({});
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="contact">
      <div className={styles.inner}>

        {/* Header row */}
        <div className={styles.headerRow}>
          <span className={styles.label}>Contact</span>
          <h2 ref={headRef} className={styles.heading}>
            Have something<br />
            <em>worth building?</em>
          </h2>
        </div>

        {/* Two columns: form + info */}
        <div className={styles.cols}>

          {/* Left — Form */}
          <div className={styles.formCol}>
            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>✓</div>
                <h3 className={styles.successTitle}>Message received.</h3>
                <p className={styles.successSub}>
                  We read every submission carefully. Expect a reply within 24 hours.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className={styles.form} noValidate>

                {/* Row 1 — Name + Email */}
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="name">
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${isFieldInvalid('name', form.name) ? styles.inputError : ''}`}
                      required
                    />
                    {isFieldInvalid('name', form.name) && (
                      <span className={styles.fieldError}>Name is required</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${styles.input} ${isFieldInvalid('email', form.email) ? styles.inputError : ''}`}
                      required
                    />
                    {isFieldInvalid('email', form.email) && (
                      <span className={styles.fieldError}>Email is required</span>
                    )}
                  </div>
                </div>

                {/* Row 2 — Phone */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.input}
                  />
                </div>

                {/* Row 4 — Message */}
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    Project brief <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tell us what you're building, what's not working, or what you'd like to exist…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${styles.input} ${styles.textarea} ${isFieldInvalid('message', form.message) ? styles.inputError : ''}`}
                    required
                  />
                  {isFieldInvalid('message', form.message) && (
                    <span className={styles.fieldError}>Please describe your project</span>
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
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </span>
                  <span className={styles.submitArrow} aria-hidden="true">→</span>
                </button>

              </form>
            )}
          </div>

          {/* Right — Info column */}
          <aside className={styles.infoCol}>
            <div className={styles.infoEmail}>
              <span className={styles.infoLabel}>Email us directly</span>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@viffey.com'}`} className={styles.email}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@viffey.com'}
              </a>
            </div>

            <div className={styles.infoBlocks}>
              {[
                { label: 'Response time', value: 'Within 24 hours' },
              ].map(b => (
                <div key={b.label} className={styles.infoBlock}>
                  <span className={styles.infoLabel}>{b.label}</span>
                  <span className={styles.infoValue}>{b.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.crmNote}>
              <span className={styles.infoLabel}>Your data</span>
              <p className={styles.crmText}>
                Submissions are stored securely and used only to respond to your enquiry.
                We do not sell or share your data.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}