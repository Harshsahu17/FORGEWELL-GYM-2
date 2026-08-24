import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin, Clock } from './icons';

const SOCIAL_ICONS = { Instagram, Facebook, Twitter, Youtube };

export default function Footer() {
  const data = defaultData.footer;
  const ref = useScrollReveal({ threshold: 0.05 });

  return (
    <footer id="footer" className="relative bg-bg-primary border-t border-border">
      <div className="max-w-content mx-auto px-4 sm:px-8 lg:px-12 py-6 lg:py-6">
        <div ref={ref} className="reveal grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <span className="font-display font-extrabold text-2xl tracking-tight text-ink-primary block mb-4">
              {data.logoText}
            </span>
            <p className="font-body text-sm text-ink-secondary leading-relaxed mb-8 font-medium">
              {data.description}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {data.socialLinks?.map((social, i) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-bg-secondary border border-border flex items-center justify-center text-ink-secondary hover:text-accent hover:border-accent/40 hover:bg-white shadow-sm transition-all duration-200"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon size={18} />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {data.quickLinks?.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm font-medium text-ink-secondary leading-relaxed">
                  {data.contact?.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a
                  href={`tel:${data.contact?.phone}`}
                  className="font-body text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
                >
                  {data.contact?.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a
                  href={`mailto:${data.contact?.email}`}
                  className="font-body text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
                >
                  {data.contact?.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-[0.2em] text-accent uppercase mb-6">
              Business Hours
            </h4>
            <ul className="space-y-4">
              {data.hours?.map((slot, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-body text-sm font-bold text-ink-primary">
                      {slot.days}
                    </div>
                    <div className="font-body text-xs font-semibold text-ink-secondary mt-0.5">
                      {slot.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/80 bg-bg-secondary/60">
        <div className="max-w-content mx-auto px-4 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-xs font-medium text-ink-secondary">
            {data.copyright}
          </span>
          <div className="flex gap-6">
            {data.legalLinks?.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="font-body text-xs font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
