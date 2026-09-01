import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { Check, Star } from './icons';

export default function Membership({ onOpenJoinForm }) {
  const data = defaultData.membership;
  const headerRef = useScrollReveal();
  const cardsRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="membership" className="border-y border-border bg-bg-secondary py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div ref={headerRef} className="reveal grid gap-6 border-b border-border pb-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end lg:pb-10">
          <div>
            <span className="section-kicker">{data.eyebrow}</span>
            <div className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink-secondary">{data.metaText}</div>
          </div>
          <div>
            <h2 className="max-w-4xl font-display text-[clamp(2.8rem,5.2vw,5.4rem)] font-bold leading-[0.9] tracking-[-0.065em] text-ink-primary">{data.heading}</h2>
            <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ink-secondary sm:text-lg">{data.description}</p>
          </div>
        </div>

        <div ref={cardsRef} className="reveal grid items-start gap-5 pt-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {data.tiers?.map((tier, index) => {
            const isRecommended = tier.recommended;
            return (
              <article
                key={tier.name}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 sm:p-8 stagger-${index + 1} ${
                  isRecommended
                    ? 'border-accent bg-accent text-white shadow-xl shadow-accent/20'
                    : 'border-border bg-bg-card text-ink-primary shadow-sm hover:border-accent/50 hover:shadow-xl'
                }`}
              >
                {isRecommended && (
                    <div className="absolute right-0 top-0 flex items-center gap-2 bg-highlight px-4 py-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-primary">
                    <Star size={12} /> {data.popularLabel}
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-current/15 pb-5">
                  <div>
                    <div className={`font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] ${isRecommended ? 'text-white/70' : 'text-signal'}`}>{data.planLabel} {tier.number}</div>
                    <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.05em]">{tier.name}</h3>
                  </div>
                  {!isRecommended && <span className="h-2.5 w-2.5 rounded-full bg-highlight" />}
                </div>
                <p className={`mt-5 font-body text-sm leading-relaxed ${isRecommended ? 'text-white/75' : 'text-ink-secondary'}`}>{tier.description}</p>
                <div className="mt-7 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold tracking-[-0.07em]">{tier.price}</span>
                  <span className={`font-mono text-xs font-semibold ${isRecommended ? 'text-white/70' : 'text-ink-secondary'}`}>{tier.period}</span>
                </div>
                <ul className="mt-6 space-y-3 border-t border-current/15 pt-6">
                  {tier.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 font-body text-sm leading-relaxed">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isRecommended ? 'bg-white/15 text-highlight' : 'bg-accent/10 text-accent'}`}>
                        <Check size={12} />
                      </span>
                      <span className={isRecommended ? 'text-white/85' : 'text-ink-primary'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onOpenJoinForm(tier.name)}
                  aria-haspopup="dialog"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-5 py-3.5 font-body text-sm font-bold transition-all duration-300 ${
                    isRecommended
                      ? 'bg-white text-accent hover:bg-highlight hover:text-ink-primary'
                      : 'border border-ink-primary/20 bg-bg-primary text-ink-primary hover:border-accent hover:bg-accent hover:text-white'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
