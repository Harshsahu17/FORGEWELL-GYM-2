import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { getIcon, ArrowRight } from './icons';

export default function Services() {
  const data = defaultData.services;
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="services" className="relative py-12 lg:py-14 bg-bg-primary">
      <div className="max-w-content mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Services Grid (Redesigned Cards) */}
        <div ref={gridRef} className="reveal services-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items?.map((item, i) => {
            const IconComp = getIcon(item.icon);
            return (
              <div
                key={i}
                className={`group relative p-7 sm:p-10 rounded-3xl bg-bg-card border border-border/80 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden stagger-${i + 1}`}
              >
                {/* Top Accent Stripe on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-2xs">
                    {IconComp ? <IconComp size={28} /> : <span className="text-xl">●</span>}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl text-ink-primary mb-4 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-sm sm:text-base text-ink-secondary leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Footer link cue */}
                <div className="mt-8 pt-6 border-t border-border/60 flex items-center gap-2 text-xs font-body font-bold text-accent">
                  <span><a href="#pricing">Explore Program</a></span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
