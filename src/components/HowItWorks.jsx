import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';

export default function HowItWorks() {
  const data = defaultData.howItWorks;
  const headerRef = useScrollReveal();
  const stepsRef = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="border-y border-border bg-bg-secondary py-10 sm:py-14 lg:py-20">
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

        <div ref={stepsRef} className="reveal relative pt-6 sm:pt-8">
          <div className="absolute left-5 top-12 bottom-12 w-px bg-border sm:left-8 lg:left-[12.5%] lg:right-[12.5%] lg:top-20 lg:h-px lg:w-auto" />
          <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
            {data.steps?.map((step, index) => (
              <article key={step.number} className={`relative grid grid-cols-[2.5rem_1fr] gap-5 lg:block stagger-${index + 1}`}>
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-bg-secondary font-mono text-xs font-bold text-accent lg:mx-auto lg:h-16 lg:w-16 lg:bg-bg-secondary lg:text-base">
                  {step.number}
                </div>
                <div className="pt-1 lg:pt-7 lg:text-center">
                  <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-ink-primary">{step.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink-secondary">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
