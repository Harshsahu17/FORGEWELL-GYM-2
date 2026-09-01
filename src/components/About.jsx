import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight } from './icons';

export default function About() {
  const data = defaultData.about;
  const revealRef = useScrollReveal();
  const imageRef = useScrollReveal({ rootMargin: '0px 0px -60px 0px' });

  return (
    <section id="about" className="border-y border-border bg-bg-secondary py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div ref={imageRef} className="reveal-left relative">
            <div className="overflow-hidden rounded-[1.5rem] border border-ink-primary/15 bg-bg-card shadow-xl">
              <div className="aspect-[4/4]">
                <img src={data.image} alt={data.imageAlt} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            </div>
            <div className="absolute -bottom-5 -right-4 bg-signal px-4 py-3 text-white shadow-lg sm:-right-6 sm:px-5 sm:py-4">
              <div className="font-display text-2xl font-bold tracking-[-0.05em]">{data.facilityBadge.value}</div>
              <div className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em]">{data.facilityBadge.label}</div>
            </div>
          </div>

          <div ref={revealRef} className="reveal">
            <span className="section-kicker">{data.eyebrow}</span>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.8rem,5.2vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.065em] text-ink-primary">
              {data.heading}
            </h2>
            <p className="mt-7 max-w-2xl font-body text-base leading-relaxed text-ink-secondary sm:text-lg">
              {data.description}
            </p>

            <div className="mt-10 grid grid-cols-3 border-y border-border py-5">
              {data.stats?.map((stat) => (
                <div key={stat.label} className="border-r border-border px-3 first:pl-0 last:border-0 last:pr-0 sm:px-5">
                  <div className="font-display text-2xl font-bold tracking-[-0.05em] text-accent sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 max-w-[9rem] font-mono text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.1em] text-ink-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href={data.ctaLink} className="group mt-8 inline-flex items-center gap-3 font-body text-sm font-bold text-ink-primary transition-colors hover:text-accent">
              {data.ctaText}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
