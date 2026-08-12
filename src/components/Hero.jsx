import useManagedSection from '../utils/useManagedSection';
import useScrollReveal from '../utils/useScrollReveal';
import SectionToolbar from './SectionToolbar';
import { ArrowRight, Check, Star } from './icons';

export default function Hero({ onOpenCustomizer }) {
  const [data] = useManagedSection('hero');
  const revealRef = useScrollReveal({ threshold: 0.1 });

  const heroImgSrc = data.backgroundImage || '/hero-bg.jpg';

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-20 lg:py-32 bg-bg-primary"
    >
      {/* Top Right Customize Toolbar Button */}
      <SectionToolbar
        sectionKey="hero"
        onCustomize={() => onOpenCustomizer('hero')}
        label="Hero / Navbar / Theme"
      />

      {/* Background Decorative Blur & Accent Shapes — own clipping wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#75BDE0]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A9D09E]/20 rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div ref={revealRef} className="reveal grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column (Content & Action) - 7 cols */}
          <div className="lg:col-span-7 pb-11 space-y-6 sm:space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F6E2BC]/70 border border-[#3B7097]/20 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-wider text-bg-accent uppercase">
                {data.eyebrow || 'BHOPAL\'S STRENGTH & CONDITIONING STUDIO'}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink-primary tracking-tight leading-[1.08]">
              <span className="block mb-1">{data.headlineLine1 || 'FORGE YOUR'}</span>
              <span className="inline-block text-bg-accent underline decoration-[#75BDE0]/60 decoration-wavy decoration-2 underline-offset-8">
                {data.headlineLine2 || 'STRONGEST SELF'}
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-base sm:text-lg text-ink-secondary max-w-xl leading-relaxed font-medium">
              {data.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={data.ctaPrimary?.link || '#pricing'}
                className="inline-flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 bg-accent text-white font-body font-bold text-sm sm:text-base rounded-2xl hover:bg-accent-hover transition-all duration-200 shadow-md shadow-accent/20 hover:shadow-lg hover:-translate-y-0.5"
              >
                {data.ctaPrimary?.text || 'Start Your Journey'}
                <ArrowRight size={18} />
              </a>
              <a
                href={data.ctaSecondary?.link || '#gallery'}
                className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-[#F6E2BC]/60 border border-[#3B7097]/20 text-accent font-body font-bold text-sm sm:text-base rounded-2xl hover:bg-[#F6E2BC] transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                {data.ctaSecondary?.text || 'Take a Tour'}
              </a>
            </div>

            {/* Feature Pills Tag Row */}
            <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-body font-bold text-ink-secondary">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#A9D09E]/50 text-accent-hover flex items-center justify-center">
                  <Check size={12} />
                </div>
                <span>Certified Coaches</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#A9D09E]/50 text-accent-hover flex items-center justify-center">
                  <Check size={12} />
                </div>
                <span>State-of-the-Art Equipment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#A9D09E]/50 text-accent-hover flex items-center justify-center">
                  <Check size={12} />
                </div>
                <span>Recovery Lounge</span>
              </div>
            </div>
          </div>

          {/* Right Column (Hero Visual & Floating Overlay Card) - 5 cols */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Background Accent Frame */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#75BDE0]/30 via-[#F6E2BC]/50 to-[#A9D09E]/30 transform rotate-2 -z-10" />

            {/* Main Image Frame */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-slate-100">
              <img
                src={heroImgSrc}
                alt="ForgeWell Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/hero-bg.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Overlaid Stats Card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-xl border border-border">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center divide-x divide-border/60">
                {data.stats?.map((stat, i) => (
                  <div key={i} className="px-1 sm:px-2">
                    <div className="font-display font-extrabold text-xl sm:text-3xl text-accent">
                      {stat.value}
                    </div>
                    <div className="font-body text-[10px] sm:text-[11px] font-bold text-ink-secondary uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Rating Badge */}
            <div className="absolute -top-4 -right-2 sm:-right-4 bg-white rounded-2xl p-3 shadow-lg border border-border flex items-center gap-2.5 z-10">
              <div className="w-9 h-9 rounded-xl bg-[#F6E2BC] text-accent flex items-center justify-center">
                <Star size={20} />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-sm text-ink-primary">4.9 / 5.0</div>
                <div className="font-body text-[10px] font-semibold text-ink-secondary">Bhopal's Top Gym</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
