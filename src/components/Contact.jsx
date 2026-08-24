import { useState } from 'react';
import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight, Check, Mail, MapPin, Phone } from './icons';

export default function Contact() {
  const data = defaultData.footer;
  const introRef = useScrollReveal();
  const formRef = useScrollReveal({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-14 lg:py-20 bg-bg-primary border-b border-border/60"
    >
      <div className="max-w-content mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20 items-start">
          <div ref={introRef} className="reveal lg:sticky lg:top-28">
            <span className="inline-block font-mono text-xs font-bold tracking-[0.25em] text-accent mb-4 uppercase">
              GET IN TOUCH
            </span>
            <h2 id="contact-heading" className="font-display font-bold text-section text-ink-primary mb-6">
              Ready to Train With Purpose?
            </h2>
            <p className="font-body text-base sm:text-lg text-ink-secondary leading-relaxed font-medium mb-8">
              Have a question or need more information? Send us a message and our team will get back to you.
            </p>

            <div className="space-y-5">
              <a href={`tel:${data.contact?.phone}`} className="flex items-start gap-3 text-ink-secondary hover:text-accent transition-colors">
                <Phone size={19} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base font-semibold">{data.contact?.phone}</span>
              </a>
              <a href={`mailto:${data.contact?.email}`} className="flex items-start gap-3 text-ink-secondary hover:text-accent transition-colors">
                <Mail size={19} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base font-semibold">{data.contact?.email}</span>
              </a>
              <div className="flex items-start gap-3 text-ink-secondary">
                <MapPin size={19} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm sm:text-base font-semibold leading-relaxed">{data.contact?.address}</span>
              </div>
            </div>
          </div>

          <div ref={formRef} className="reveal">
            {submitted ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center rounded-3xl border border-border bg-bg-card p-8 text-center shadow-xs sm:p-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check size={32} />
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold text-ink-primary">Message received</h3>
                <p className="mt-3 max-w-md font-body text-base leading-relaxed text-ink-secondary">
                  Thanks for reaching out. Your message has been submitted successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl bg-bg-card border border-border shadow-xs p-5 sm:p-8 lg:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="font-body text-sm font-bold text-ink-primary">Full name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3.5 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="font-body text-sm font-bold text-ink-primary">Phone number</label>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3.5 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-email" className="font-body text-sm font-bold text-ink-primary">Email address</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-border bg-bg-primary px-4 py-3.5 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="font-body text-sm font-bold text-ink-primary">
                      Message <span className="font-normal text-ink-secondary">(optional)</span>
                    </label>
                    <textarea id="contact-message" name="message" rows="4" className="mt-2 w-full resize-y rounded-xl border border-border bg-bg-primary px-4 py-3.5 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button type="submit" className="inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-xl bg-accent px-6 py-3.5 font-body text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2">
                    Send Message
                    <ArrowRight size={17} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
