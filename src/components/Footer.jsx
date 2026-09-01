import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin, Clock, ArrowRight } from './icons';

const SOCIAL_ICONS = { Instagram, Facebook, Twitter, Youtube };

export default function Footer() {
  const data = defaultData.footer;
  const ref = useScrollReveal({ threshold: 0.05 });

  return (
    <footer id="footer" className="border-t border-border bg-bg-primary">
      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16 xl:px-16">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">{data.kicker}</span>
            <div className="mt-5 font-display text-5xl font-bold tracking-[-0.07em] text-ink-primary sm:text-7xl">{data.logoText}</div>
          </div>
          <a href="#hero" className="group inline-flex items-center gap-3 font-body text-sm font-bold text-ink-primary transition-colors hover:text-accent">
            {data.backToTopText} <ArrowRight size={17} className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>

        <div ref={ref} className="reveal grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className="max-w-xs font-body text-sm leading-relaxed text-ink-secondary">{data.description}</p>
            <div className="mt-7 flex gap-2.5">
              {data.socialLinks?.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg-card text-ink-secondary transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent" aria-label={social.platform}>
                    {Icon && <Icon size={17} />}
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-signal">{data.exploreHeading}</h3>
            <ul className="mt-5 space-y-3">
              {data.quickLinks?.map((link) => <li key={link.label}><a href={link.href} className="font-body text-sm font-semibold text-ink-secondary transition-colors hover:text-ink-primary">{link.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-signal">{data.findUsHeading}</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-accent" /><span className="font-body text-sm leading-relaxed text-ink-secondary">{data.contact?.address}</span></li>
              <li className="flex items-center gap-3"><Phone size={17} className="shrink-0 text-accent" /><a href={`tel:${data.contact?.phone}`} className="font-body text-sm font-semibold text-ink-secondary hover:text-ink-primary">{data.contact?.phone}</a></li>
              <li className="flex items-center gap-3"><Mail size={17} className="shrink-0 text-accent" /><a href={`mailto:${data.contact?.email}`} className="font-body text-sm font-semibold text-ink-secondary hover:text-ink-primary">{data.contact?.email}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-signal">{data.hoursHeading}</h3>
            <ul className="mt-5 space-y-4">
              {data.hours?.map((slot) => <li key={slot.days} className="flex items-start gap-3"><Clock size={17} className="mt-0.5 shrink-0 text-accent" /><div><div className="font-body text-sm font-bold text-ink-primary">{slot.days}</div><div className="mt-0.5 font-body text-xs text-ink-secondary">{slot.time}</div></div></li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-bg-secondary">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center sm:px-8 lg:px-12 xl:px-16">
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-ink-secondary">{data.copyright}</span>
          <div className="flex gap-5">{data.legalLinks?.map((link) => <a key={link.label} href={link.href} className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-ink-secondary hover:text-ink-primary">{link.label}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
