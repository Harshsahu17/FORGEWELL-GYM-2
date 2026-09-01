import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight } from './icons';

export default function Hero() {
  const data = defaultData.hero;
  const revealRef = useScrollReveal({ threshold: 0.1 });
  const heroImgSrc = data.backgroundImage;

  return (
    <section id="hero" className="relative overflow-hidden bg-bg-primary">
      <div className="pointer-events-none absolute right-[-12rem] top-24 h-[30rem] w-[30rem] rounded-full bg-highlight/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-content gap-10 px-4 pb-16 pt-24 sm:px-8 lg:grid-cols-[1.2fr_0.9fr] lg:gap-14 lg:px-12 lg:pb-20 lg:pt-24">
        <div ref={revealRef} className="reveal flex flex-col justify-start">
          <p className="flex items-center gap-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-signal">
            <span className="h-px w-10 bg-signal" aria-hidden="true" />
            {data.eyebrow}
          </p>

          <h1 className="mt-10 max-w-[700px] font-display text-[clamp(4.5rem,8.2vw,7.25rem)] font-bold uppercase leading-[0.82] tracking-[-0.075em] text-ink-primary sm:mt-12 lg:mt-10">
            <span className='block'>{data.headlineLine1}</span>
            <span className='block text-accent'>{data.headlineLine2}</span>
          </h1>

          <div className="mt-8 max-w-xl sm:mt-5">
            <p className="font-body text-base leading-relaxed text-ink-secondary sm:text-lg">
              {data.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
              <a
                href={data.ctaPrimary.link}
                className="group inline-flex items-center gap-3 rounded-lg bg-accent px-5 py-3.5 font-body text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover sm:px-6"
              >
                {data.ctaPrimary.text}
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={data.ctaSecondary.link}
                className="group inline-flex items-center gap-2 rounded-lg border border-ink-primary/20 bg-bg-card px-5 py-3.5 font-body text-sm font-bold text-ink-primary transition-colors duration-200 hover:border-accent hover:text-accent sm:px-6"
              >
                {data.ctaSecondary.text}
                <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 border-t border-border pt-4">
            {data.stats?.map((stat) => (
              <div key={stat.label} className="border-r border-border px-3 first:pl-0 last:border-r-0 sm:px-4">
                <p className="font-display text-2xl font-bold tracking-[-0.04em] text-ink-primary sm:text-3xl">{stat.value}</p>
                <p className="mt-1 font-mono text-[0.62rem] font-semibold uppercase leading-relaxed tracking-[0.1em] text-ink-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-primary/15 bg-ink-primary shadow-xl">
            <img
              src={heroImgSrc}
              alt={data.imageAlt}
              className="h-full w-full object-cover object-center"
              onError={(event) => {
                event.currentTarget.src = data.fallbackImage;
              }}
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-ink-primary/95 px-4 py-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white">
              <span>{data.fieldLabel}</span>
              <span className="text-highlight">{data.locationLabel}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
