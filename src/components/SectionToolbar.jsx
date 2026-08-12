import { Settings } from './icons';

/**
 * Sticky floating toolbar that appears at top-right of each section.
 * Provides "Customize" button to open the customizer panel.
 */
export default function SectionToolbar({ sectionKey, onCustomize, label }) {
  return (
    <div className="section-toolbar">
      <button
        onClick={onCustomize}
        className="flex items-center gap-2 px-4 py-2 bg-white/95 border border-border shadow-lg rounded-xl text-ink-primary hover:text-accent hover:border-accent hover:shadow-xl transition-all duration-200 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
        aria-label={`Customize ${label || sectionKey}`}
      >
        <Settings size={15} className="text-accent" />
        <span>Customize</span>
      </button>
    </div>
  );
}
