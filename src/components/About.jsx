import useManagedSection from '../utils/useManagedSection';
import useScrollReveal from '../utils/useScrollReveal';
import SectionToolbar from './SectionToolbar';
import { ArrowRight } from './icons';

export default function About({ onOpenCustomizer }) {
  const [data] = useManagedSection('about');
  const revealRef = useScrollReveal();
  const imageRef = useScrollReveal({ rootMargin: '0px 0px -60px 0px' });

  return (
    <section id="about" className="relative py-28 lg:py-36 bg-bg-secondary border-y border-border/60">
      {/* Sticky Section Toolbar (Bottom Right Corner) */}
      <SectionToolbar
        sectionKey="about"
        onCustomize={() => onOpenCustomizer('about')}
      />
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div ref={imageRef} className="reveal-left relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-white">
              <img
                src={data.image}
                alt="About ForgeWell"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative subtle accent frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/25 rounded-3xl -z-10 hidden sm:block" />
          </div>

          {/* Content */}
          <div ref={revealRef} className="reveal">
            <span className="inline-block font-mono text-xs font-bold tracking-[0.25em] text-accent mb-4 uppercase">
              {data.eyebrow}
            </span>

            <h2 className="font-display font-bold text-section text-ink-primary mb-6">
              {data.heading}
            </h2>

            <p className="font-body text-base sm:text-lg text-ink-secondary leading-relaxed mb-10 font-medium">
              {data.description}
            </p>

            {/* Stats Row Cards */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-10">
              {data.stats?.map((stat, i) => (
                <div key={i} className="p-4 sm:p-5 rounded-2xl bg-bg-card border border-border shadow-xs text-center lg:text-left">
                  <div className="font-display font-extrabold text-2xl sm:text-3xl text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs font-semibold text-ink-secondary tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={data.ctaLink}
              className="inline-flex items-center gap-3 font-body font-bold text-base text-accent hover:text-accent-hover transition-colors group py-2"
            >
              {data.ctaText}
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}
