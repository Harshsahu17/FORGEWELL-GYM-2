import useManagedSection from '../utils/useManagedSection';
import useScrollReveal from '../utils/useScrollReveal';
import SectionToolbar from './SectionToolbar';
import { Check, Star } from './icons';

export default function Pricing({ onOpenCustomizer }) {
  const [data] = useManagedSection('pricing');
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="pricing" className="relative py-28 lg:py-36 bg-bg-secondary border-t border-border/60">
      {/* Sticky Section Toolbar (Bottom Right Corner) */}
      <SectionToolbar
        sectionKey="pricing"
        onCustomize={() => onOpenCustomizer('pricing')}
      />
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block font-mono text-xs font-bold tracking-[0.25em] text-accent mb-4 uppercase">
            {data.eyebrow}
          </span>
          <h2 className="font-display font-bold text-section text-ink-primary mb-6">
            {data.heading}
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-secondary leading-relaxed font-medium">
            {data.description}
          </p>
        </div>

        {/* Pricing Cards (Redesigned Tiers) */}
        <div ref={cardsRef} className="reveal  pricing-grid grid md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {data.tiers?.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 stagger-${i + 1} ${
                tier.recommended
                  ? 'bg-bg-card border-2 border-accent shadow-2xl shadow-accent/15 scale-[1.03] z-10'
                  : 'bg-bg-card border border-border/80 shadow-xs hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* Popular Badge */}
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white font-body font-bold text-xs uppercase tracking-wider rounded-full shadow-md">
                  <Star size={14} />
                  Most Popular
                </div>
              )}

              <div>
                {/* Header Info */}
                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-ink-primary mb-2">
                    {tier.name}
                  </h3>
                  <p className="font-body text-sm text-ink-secondary font-medium">
                    {tier.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex flex-wrap items-baseline gap-1.5 mb-8 pb-8 border-b border-border/80">
                  <span className="font-display font-extrabold text-4xl sm:text-5xl text-ink-primary tracking-tight">
                    {tier.price}
                  </span>
                  <span className="font-body text-ink-secondary text-sm font-semibold">
                    {tier.period}
                  </span>
                </div>

                {/* Features checklist */}
                <ul className="space-y-4 mb-10">
                  {tier.features?.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/15 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={13} />
                      </div>
                      <span className="font-body text-sm font-medium text-ink-primary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <a
                href={tier.ctaLink}
                className={`block w-full text-center py-4 rounded-2xl font-body font-bold text-sm transition-all duration-200 ${
                  tier.recommended
                    ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-bg-secondary border border-border text-ink-primary hover:border-accent hover:text-accent hover:bg-white'
                }`}
              >
                {tier.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
