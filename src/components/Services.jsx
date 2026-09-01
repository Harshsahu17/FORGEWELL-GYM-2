import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight, getIcon } from './icons';

export default function Services() {
  const data = defaultData.services;
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="services" className="bg-bg-primary py-10 sm:py-14 lg:py-20">
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

        <div ref={gridRef} className="reveal grid gap-x-10 md:grid-cols-2">
          {data.items?.map((item, index) => {
            const IconComp = getIcon(item.icon);
            return (
              <article key={item.title} className={`group border-b border-border py-7 sm:py-9 stagger-${index + 1}`}>
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="font-mono text-xs font-semibold tracking-[0.1em] text-signal">{item.number}</span>
                  <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                    <div>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-bg-secondary text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                        {IconComp ? <IconComp size={21} /> : null}
                      </div>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.04em] text-ink-primary transition-colors duration-300 group-hover:text-accent sm:text-3xl">{item.title}</h3>
                      <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink-secondary sm:text-base">{item.description}</p>
                    </div>
                    <ArrowRight size={19} className="mt-1 shrink-0 text-border transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-signal" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
