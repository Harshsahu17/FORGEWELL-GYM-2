import { useCallback, useRef } from 'react';
import defaultData from '../data/forgewellData.json';
import useScrollReveal from '../utils/useScrollReveal';
import { ArrowRight, X } from './icons';

export default function Gallery() {
  const data = defaultData.gallery;
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

  const closeLightbox = useCallback(() => dialogRef.current?.close(), []);
  const handleDialogClick = useCallback((event) => {
    if (event.target === dialogRef.current) closeLightbox();
  }, [closeLightbox]);

  return (
    <section id="gallery" className="bg-bg-primary py-10 sm:py-14 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        <div ref={headerRef} className="reveal mb-8 flex flex-col justify-between gap-5 border-b border-border pb-7 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">{data.eyebrow}</span>
            <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,5.2vw,5.4rem)] font-bold leading-[0.9] tracking-[-0.065em] text-ink-primary">{data.heading}</h2>
          </div>
          <div className="flex max-w-sm items-end gap-4">
            <p className="font-body text-sm leading-relaxed text-ink-secondary sm:text-base">{data.description}</p>
            <ArrowRight size={20} className="mb-0.5 shrink-0 text-signal" />
          </div>
        </div>

        <div ref={gridRef} className="reveal grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {data.images?.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openLightbox(image.src, image.alt)}
              className={`group relative min-h-0 overflow-hidden rounded-2xl border border-ink-primary/10 bg-bg-secondary text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4 focus:ring-offset-bg-primary stagger-${index + 1} ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <div className={index === 0 ? 'aspect-square h-full' : 'aspect-[4/3] h-full'}>
                <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-ink-primary/85 px-3 py-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:px-4">
                <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em]">{image.number} / {data.viewLabel}</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <dialog ref={dialogRef} className="lightbox" onClick={handleDialogClick}>
        <div className="relative">
          <button onClick={closeLightbox} className="absolute -right-1 -top-12 text-white transition-colors hover:text-highlight" aria-label={data.closeLabel}>
            <X size={30} />
          </button>
          <img ref={imgRef} src={data.images?.[0]?.src} alt={data.lightboxAlt} />
        </div>
      </dialog>
    </section>
  );
}
