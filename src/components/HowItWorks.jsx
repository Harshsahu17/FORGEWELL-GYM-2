import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';

export default function HowItWorks() {
  const data = defaultData.howItWorks;
  const headerRef = useScrollReveal();
  const stepsRef = useScrollReveal({ threshold: 0.1 });
  
  return (
    <section id="how-it-works" className="relative py-12 lg:py-14 bg-bg-secondary border-y border-border/60">
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

        {/* Steps */}
        <div ref={stepsRef} className="reveal relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-[3.25rem] left-[15%] right-[15%] h-[2px] bg-border/80">
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/50 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6">
            {data.steps?.map((step, i) => (
              <div
                key={i}
                className={`relative flex lg:flex-col items-start gap-6 lg:gap-0 lg:text-center stagger-${i + 1}`}
              >
                {/* Mobile vertical connector */}
                {i < (data.steps?.length || 0) - 1 && (
                  <div className="lg:hidden absolute left-[1.75rem] top-[3.5rem] bottom-[-2rem] w-[2px] bg-border/80" />
                )}

                {/* Number badge */}
                <div className="relative z-10 w-16 h-16 flex-shrink-0 rounded-2xl bg-bg-card border-2 border-accent flex items-center justify-center lg:mx-auto lg:mb-8 shadow-md">
                  <span className="font-mono text-lg font-bold text-accent">
                    {step.number}
                  </span>
                </div>

                {/* Content Card */}
                <div className="flex-1 p-6 sm:p-7 rounded-2xl bg-bg-card border border-border/80 shadow-xs">
                  <h3 className="font-display font-bold text-xl text-ink-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-ink-secondary leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
