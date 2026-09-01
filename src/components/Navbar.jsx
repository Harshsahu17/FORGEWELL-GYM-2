import { useEffect, useRef, useState } from 'react';
import defaultData from '../data/forgewellData.json';
import { ArrowRight, Menu, X } from './icons';

export default function Navbar({ onOpenJoinForm }) {
  const data = defaultData.navbar;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mobileOpen && !dialog.open) dialog.showModal();
    if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav
        id="navbar"
        className={`fixed left-0 top-0 z-[900] w-full border-b transition-all duration-300 ${
          scrolled
            ? 'border-border bg-bg-primary/95 shadow-sm backdrop-blur-sm'
            : 'border-transparent bg-bg-primary/80'
        }`}
      >
        <div className="mx-auto flex h-[4.75rem] w-full max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16">
          <a href="#hero" className="group flex shrink-0 items-center gap-3" aria-label={data.homeAriaLabel}>
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-ink-primary/15 bg-bg-card shadow-sm transition-transform duration-300 group-hover:-rotate-3">
              <img src={data.logoImage} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-bold tracking-[-0.04em] text-ink-primary sm:text-2xl">
              {data.logoText}
            </span>
          </a>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {data.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative whitespace-nowrap py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-ink-secondary transition-colors hover:text-ink-primary"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
                <span className="sr-only">{data.navItemAriaPrefix} {link.number}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenJoinForm()}
              aria-haspopup="dialog"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-body text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md sm:px-5 sm:text-sm"
            >
              {data.ctaText}
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-ink-primary transition-colors hover:bg-bg-secondary hover:text-accent lg:hidden"
              aria-label={data.openMenuLabel}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <dialog ref={dialogRef} className="mobile-menu" onClose={() => setMobileOpen(false)}>
        <div className="flex min-h-full flex-col px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex items-center justify-between border-b border-border pb-6">
            <span className="section-kicker">{data.mobileSectionLabel}</span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-ink-primary transition-colors hover:bg-bg-secondary hover:text-signal"
              aria-label={data.closeMenuLabel}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-5 py-10">
            {data.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-baseline justify-between border-b border-border/70 pb-4 font-display text-3xl font-bold tracking-[-0.04em] text-ink-primary transition-colors hover:text-accent sm:text-4xl"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs font-medium tracking-[0.16em] text-signal">{link.number}</span>
              </a>
            ))}
          </div>

          <div className="mt-auto border-t border-border pt-6">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onOpenJoinForm();
              }}
              aria-haspopup="dialog"
              className="flex w-full items-center justify-between rounded-lg bg-accent px-5 py-4 font-body text-base font-bold text-white transition-colors hover:bg-accent-hover"
            >
              {data.ctaText}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
