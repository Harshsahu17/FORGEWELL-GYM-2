import { useState, useEffect, useRef } from 'react';
import useManagedSection from '../utils/useManagedSection';
import { Menu, X } from './icons';

export default function Navbar({ onOpenCustomizer }) {
  const [data] = useManagedSection('navbar');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogRef = useRef(null);

  // Track scroll to add glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Handle mobile menu dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (mobileOpen) {
      dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-[900] transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border shadow-xs py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        {/* Full-width container (edge-to-edge edge padding) */}
        <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {/* Logo Element (Far Left) */}
          <a href="#" className="flex items-center gap-3 sm:gap-3.5 group flex-shrink-0">
            {data.logoImage ? (
              <div className="w-10 h-10 rounded-xl bg-white border border-border/80 p-1.5 shadow-xs flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                <img
                  src={data.logoImage}
                  alt={data.logoText}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-hover text-white flex items-center justify-center font-display font-extrabold text-xl shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
                F
              </div>
            )}
            <span className="font-display font-extrabold text-2xl tracking-tight text-accent group-hover:text-accent-hover transition-colors">
              {data.logoText || 'FORGEWELL'}
            </span>
          </a>

          {/* Nav Links (Center / Spaced Out) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 nav-links">
            {data.links?.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-xs lg:text-sm font-body font-semibold text-ink-secondary hover:text-ink-primary transition-colors relative py-1 whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button (Far Right) */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a
              href={data.ctaLink || '#pricing'}
              className="hidden sm:inline-flex px-6 py-2.5 bg-accent text-white font-body font-bold text-xs sm:text-sm rounded-xl hover:bg-accent-hover shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              {data.ctaText || 'Join Now'}
            </a>

            {/* Mobile Hamburger Menu Icon */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-ink-primary hover:text-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <dialog
        ref={dialogRef}
        className="mobile-menu"
        onClose={() => setMobileOpen(false)}
      >
        <div className="flex flex-col h-full p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center font-display font-bold text-lg">
                F
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-accent">
                {data.logoText || 'FORGEWELL'}
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-ink-primary hover:text-accent transition-colors"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6">
            {data.links?.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={handleLinkClick}
                className="font-display font-bold text-2xl sm:text-3xl text-ink-primary hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-auto pt-8">
            <a
              href={data.ctaLink || '#pricing'}
              onClick={handleLinkClick}
              className="block w-full text-center px-6 py-4 bg-accent text-white font-body font-bold text-base sm:text-lg rounded-xl hover:bg-accent-hover transition-colors shadow-lg"
            >
              {data.ctaText || 'Join Now'}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
