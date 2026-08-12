import { useRef, useCallback } from 'react';
import useManagedSection from '../utils/useManagedSection';
import useScrollReveal from '../utils/useScrollReveal';
import SectionToolbar from './SectionToolbar';
import { X } from './icons';

export default function Gallery({ onOpenCustomizer }) {
  const [data] = useManagedSection('gallery');
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal({ threshold: 0.05 });
  const dialogRef = useRef(null);
  const imgRef = useRef(null);

  const openLightbox = useCallback((src, alt) => {
    if (imgRef.current) {
      imgRef.current.src = src;
      imgRef.current.alt = alt;
    }
    dialogRef.current?.showModal();
  }, []);

  const closeLightbox = useCallback(() => {
    dialogRef.current?.close();
  }, []);
  
  // Close on click outside the image
  const handleDialogClick = useCallback((e) => {
    if (e.target === dialogRef.current) {
      closeLightbox();
    }
  }, [closeLightbox]);
  
  return (
    <section id="gallery" className="relative py-28 lg:py-36 bg-bg-primary">
      {/* Sticky Section Toolbar (Bottom Right Corner) */}
      <SectionToolbar
        sectionKey="gallery"
        onCustomize={() => onOpenCustomizer('gallery')}
      />
      <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="reveal text-center max-w-3xl mx-auto mb-20">
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

        {/* Image Grid */}
        <div ref={gridRef} className="reveal grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {data.images?.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(img.src, img.alt)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer shadow-xs hover:shadow-2xl border border-border/80 transition-all duration-300 stagger-${i + 1} ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`${i === 0 ? 'aspect-square md:aspect-auto md:h-full' : 'aspect-[4/3]'}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              {/* Light Hover Overlay */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-all duration-300 flex items-center justify-center">
                <span className="font-body font-bold text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl">
                  Expand Photo
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        className="lightbox"
        onClick={handleDialogClick}
      >
        <div className="relative">
          <button
            onClick={closeLightbox}
            className="absolute -top-12 right-0 text-white hover:text-[#75BDE0] transition-colors"
            aria-label="Close lightbox"
          >
            <X size={30} />
          </button>
          <img ref={imgRef} src="" alt="" />
        </div>
      </dialog>

    </section>
  );
}
