import { useState } from 'react';
import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight, Check, Mail, MapPin, Phone } from './icons';

export default function Contact() {
  const data = defaultData.contactSection;
  const contact = defaultData.contactSection.contact;
  const introRef = useScrollReveal();
  const formRef = useScrollReveal({ threshold: 0.1 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-accent py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div ref={introRef} className="reveal text-white">
            <span className="inline-flex items-center gap-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-highlight">
              <span className="h-px w-10 bg-highlight" /> {data.eyebrow}
            </span>
            <h2 id="contact-heading" className="mt-6 max-w-xl font-display text-[clamp(2.8rem,5.2vw,5.3rem)] font-bold leading-[0.9] tracking-[-0.065em]">
              {data.heading}
            </h2>
            <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-white/75 sm:text-lg">
              {data.description}
            </p>

            <div className="mt-10 space-y-5 border-t border-white/20 pt-7">
              <a href={`tel:${data.contact?.phone}`} className="flex items-start gap-3 font-body text-sm font-semibold text-white transition-colors hover:text-highlight sm:text-base">
                <Phone size={18} className="mt-0.5 shrink-0 text-highlight" /> {data.contact?.phone}
              </a>
              <a href={`mailto:${data.contact?.email}`} className="flex items-start gap-3 font-body text-sm font-semibold text-white transition-colors hover:text-highlight sm:text-base">
                <Mail size={18} className="mt-0.5 shrink-0 text-highlight" /> {data.contact?.email}
              </a>
              <div className="flex items-start gap-3 font-body text-sm font-semibold leading-relaxed text-white sm:text-base">
                <MapPin size={18} className="mt-0.5 shrink-0 text-highlight" /> {data.contact?.address}
              </div>
            </div>
          </div>

          <div ref={formRef} className="reveal">
            {submitted ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl bg-bg-card p-6 text-center shadow-xl sm:p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-highlight/30 text-accent"><Check size={30} /></div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-[-0.04em] text-ink-primary">{data.successHeading}</h3>
                <p className="mt-3 max-w-md font-body text-base leading-relaxed text-ink-secondary">{data.successDescription}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-2xl bg-bg-card p-4 shadow-xl sm:p-6 lg:p-7">
                <div className="mb-6 flex items-start justify-between gap-5 border-b border-border pb-4">
                  <div>
                    <div className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-signal">{data.formEyebrow}</div>
                    <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em] text-ink-primary">{data.formHeading}</h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-ink-secondary">{data.formStep}</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="font-body text-sm font-bold text-ink-primary">Full name</label>
                    <input id="contact-name" name="name" type="text" autoComplete="name" required className="mt-2 w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="font-body text-sm font-bold text-ink-primary">Phone number</label>
                    <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required className="mt-2 w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-email" className="font-body text-sm font-bold text-ink-primary">Email address</label>
                    <input id="contact-email" name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-lg border border-border bg-bg-primary px-4 py-3 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="font-body text-sm font-bold text-ink-primary">Message <span className="font-normal text-ink-secondary">(optional)</span></label>
                    <textarea id="contact-message" name="message" rows="3" className="mt-2 w-full resize-y rounded-lg border border-border bg-bg-primary px-4 py-3 font-body text-sm text-ink-primary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20" />
                  </div>
                </div>
                <button type="submit" className="group mt-5 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-ink-primary px-6 py-3 font-body text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-primary/90 hover:shadow-lg sm:w-auto">
                  {data.submitText} <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
