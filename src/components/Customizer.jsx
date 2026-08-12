import { useState, useEffect, useCallback, useRef } from 'react';
import { getSection, saveSection } from '../utils/dataManager';
import { applyTheme, DEFAULT_THEME } from '../utils/theme';
import { compressImage } from '../utils/imageUtils';
import defaultData from '../data/forgewellData.json';
import { X, Upload, Palette } from './icons';

/* ── Field schema for each section ── */
const SECTION_SCHEMAS = {
  hero: {
    title: 'Hero Section & Theme',
    groups: [
      {
        label: 'Navbar Settings',
        sectionKey: 'navbar',
        fields: [
          { key: 'logoText', label: 'Logo Text', type: 'text' },
          { key: 'logoImage', label: 'Logo Image', type: 'image' },
          { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
          { key: 'ctaLink', label: 'CTA Button Link', type: 'text' },
        ],
      },
      {
        label: 'Hero Content',
        sectionKey: 'hero',
        fields: [
          { key: 'eyebrow', label: 'Eyebrow Label', type: 'text' },
          { key: 'headlineLine1', label: 'Headline Line 1', type: 'text' },
          { key: 'headlineLine2', label: 'Headline Line 2', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'backgroundImage', label: 'Background Image', type: 'image' },
          { key: 'ctaPrimary.text', label: 'Primary CTA Text', type: 'text' },
          { key: 'ctaPrimary.link', label: 'Primary CTA Link', type: 'text' },
          { key: 'ctaSecondary.text', label: 'Secondary CTA Text', type: 'text' },
          { key: 'ctaSecondary.link', label: 'Secondary CTA Link', type: 'text' },
          { key: 'stats', label: 'Stats Highlights', type: 'stats-array' },
        ],
      },
      {
        label: 'Global Theme Colors',
        sectionKey: 'theme',
        fields: [
          { key: 'accent', label: 'Accent Color', type: 'color' },
          { key: 'accentHover', label: 'Accent Hover', type: 'color' },
          { key: 'shadow', label: 'Shadow Color', type: 'color' },
          { key: 'bgPrimary', label: 'Background Primary', type: 'color' },
          { key: 'bgSecondary', label: 'Background Secondary', type: 'color' },
          { key: 'bgCard', label: 'Card Background', type: 'color' },
          { key: 'inkPrimary', label: 'Text Primary', type: 'color' },
          { key: 'inkSecondary', label: 'Text Secondary', type: 'color' },
          { key: 'border', label: 'Border Color', type: 'color' },
        ],
      },
    ],
  },
  about: {
    title: 'About Section',
    groups: [
      {
        label: 'Content Settings',
        sectionKey: 'about',
        fields: [
          { key: 'eyebrow', label: 'Section Eyebrow Label', type: 'text' },
          { key: 'heading', label: 'Main Section Heading', type: 'text' },
          { key: 'description', label: 'Section Description Text', type: 'textarea' },
          { key: 'image', label: 'About Image', type: 'image' },
          { key: 'ctaText', label: 'CTA Text', type: 'text' },
          { key: 'ctaLink', label: 'CTA Link', type: 'text' },
          { key: 'stats', label: 'Stats Highlights', type: 'stats-array' },
        ],
      },
    ],
  },
  services: {
    title: 'Services Section',
    groups: [
      {
        label: 'Content Settings',
        sectionKey: 'services',
        fields: [
          { key: 'eyebrow', label: 'Section Eyebrow Label', type: 'text' },
          { key: 'heading', label: 'Main Section Heading', type: 'text' },
          { key: 'description', label: 'Section Description Text', type: 'textarea' },
          { key: 'items', label: 'Service Cards (Headings & Content)', type: 'services-array' },
        ],
      },
    ],
  },
  pricing: {
    title: 'Membership Section',
    groups: [
      {
        label: 'Content Settings',
        sectionKey: 'pricing',
        fields: [
          { key: 'eyebrow', label: 'Section Eyebrow Label', type: 'text' },
          { key: 'heading', label: 'Main Section Heading', type: 'text' },
          { key: 'description', label: 'Section Description Text', type: 'textarea' },
          { key: 'tiers', label: 'Membership Tier Cards (Headings & Prices)', type: 'tiers-array' },
        ],
      },
    ],
  },
  gallery: {
    title: 'Gallery Section',
    groups: [
      {
        label: 'Content Settings',
        sectionKey: 'gallery',
        fields: [
          { key: 'eyebrow', label: 'Section Eyebrow Label', type: 'text' },
          { key: 'heading', label: 'Main Section Heading', type: 'text' },
          { key: 'description', label: 'Section Description Text', type: 'textarea' },
          { key: 'images', label: 'Gallery Photos', type: 'gallery-array' },
        ],
      },
    ],
  },
  howItWorks: {
    title: 'How It Works Section',
    groups: [
      {
        label: 'Content Settings',
        sectionKey: 'howItWorks',
        fields: [
          { key: 'eyebrow', label: 'Section Eyebrow Label', type: 'text' },
          { key: 'heading', label: 'Main Section Heading', type: 'text' },
          { key: 'description', label: 'Section Description Text', type: 'textarea' },
          { key: 'steps', label: 'Steps List (Headings & Descriptions)', type: 'steps-array' },
        ],
      },
    ],
  },
};

/* ── Helper: get/set nested keys ── */
function getNestedValue(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj);
}

function setNestedValue(obj, path, value) {
  const clone = JSON.parse(JSON.stringify(obj));
  const keys = path.split('.');
  let current = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return clone;
}

/* ══════════════════════════════════════════════════════
   Customizer Component
   ══════════════════════════════════════════════════════ */
export default function Customizer({ sectionKey, isOpen, onClose }) {
  const schema = SECTION_SCHEMAS[sectionKey];
  const [formStates, setFormStates] = useState({});

  // Initialize form states when panel opens
  useEffect(() => {
    if (isOpen && schema) {
      const states = {};
      schema.groups.forEach((group) => {
        const key = group.sectionKey;
        const fallback = defaultData[key] || {};
        states[key] = getSection(key, fallback);
      });
      setFormStates(states);
    }
  }, [isOpen, sectionKey]);

  // Dispatch live preview on every form change
  const updateField = useCallback(
    (groupKey, fieldPath, value) => {
      setFormStates((prev) => {
        const updated = {
          ...prev,
          [groupKey]: setNestedValue(prev[groupKey] || {}, fieldPath, value),
        };

        // Dispatch live preview event
        window.dispatchEvent(
          new CustomEvent(`live-preview-${groupKey}`, {
            detail: updated[groupKey],
          })
        );

        // If editing theme, apply colors live
        if (groupKey === 'theme') {
          applyTheme(updated[groupKey]);
        }

        return updated;
      });
    },
    []
  );

  // Update an entire section object
  const updateSectionState = useCallback(
    (groupKey, newData) => {
      setFormStates((prev) => {
        const updated = { ...prev, [groupKey]: newData };

        window.dispatchEvent(
          new CustomEvent(`live-preview-${groupKey}`, {
            detail: updated[groupKey],
          })
        );

        if (groupKey === 'theme') {
          applyTheme(updated[groupKey]);
        }

        return updated;
      });
    },
    []
  );

  // Save all section groups
  const handleSave = useCallback(() => {
    Object.entries(formStates).forEach(([key, value]) => {
      saveSection(key, value);
    });
    onClose();
  }, [formStates, onClose]);

  // Close without saving → revert preview
  const handleCancel = useCallback(() => {
    Object.keys(formStates).forEach((key) => {
      window.dispatchEvent(new CustomEvent(`revert-preview-${key}`));
    });

    if (formStates.theme) {
      const savedTheme = getSection('theme', defaultData.theme || DEFAULT_THEME);
      applyTheme(savedTheme);
    }

    onClose();
  }, [formStates, onClose]);

  // Reset theme to defaults
  const handleResetTheme = useCallback(() => {
    updateSectionState('theme', { ...DEFAULT_THEME });
  }, [updateSectionState]);

  // Handle image file upload
  const handleFileUpload = useCallback(
    async (groupKey, fieldPath, file) => {
      try {
        const dataUrl = await compressImage(file);
        updateField(groupKey, fieldPath, dataUrl);
      } catch (err) {
        console.error('Image upload failed:', err);
      }
    },
    [updateField]
  );

  if (!schema) return null;

  return (
    <>
      {/* Backdrop (visible only on mobile/tablet) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 z-[999] lg:hidden backdrop-blur-xs"
          onClick={handleCancel}
        />
      )}

      {/* Slide-in Panel */}
      <div className={`customizer-panel ${isOpen ? 'open' : ''}`}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#3B7097] uppercase block">
              Live Customizer
            </span>
            <h2 className="font-display font-bold text-lg text-slate-900">
              {schema.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3B7097] text-white font-body font-bold text-xs rounded-xl hover:bg-[#2C5677] shadow-xs transition-all hover:shadow-md"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-lg hover:bg-slate-100"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-8 bg-slate-50/50">
          {schema.groups.map((group) => (
            <div key={group.sectionKey} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              {/* Group label */}
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                {group.sectionKey === 'theme' && <Palette size={16} className="text-[#3B7097]" />}
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] text-[#3B7097] uppercase">
                  {group.label}
                </h3>
                {group.sectionKey === 'theme' && (
                  <button
                    onClick={handleResetTheme}
                    className="ml-auto text-xs font-body font-semibold text-slate-500 hover:text-[#3B7097] transition-colors"
                  >
                    Reset Theme
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {group.fields.map((field) => (
                  <FieldRenderer
                    key={field.key}
                    field={field}
                    groupKey={group.sectionKey}
                    data={formStates[group.sectionKey] || {}}
                    onChange={updateField}
                    onFileUpload={handleFileUpload}
                    onUpdateSection={updateSectionState}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════
   Field Renderer (With Clear Input Labels for Headings)
   ══════════════════════════════════════════════════════ */
function FieldRenderer({ field, groupKey, data, onChange, onFileUpload }) {
  const value = getNestedValue(data, field.key);
  const fileRef = useRef(null);

  const inputClasses =
    'w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-body text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3B7097] focus:bg-white transition-all shadow-2xs';

  switch (field.type) {
    case 'text':
      return (
        <div>
          <label className="block text-xs font-body font-semibold text-slate-700 mb-1.5">
            {field.label}
          </label>
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(groupKey, field.key, e.target.value)}
            className={inputClasses}
          />
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label className="block text-xs font-body font-semibold text-slate-700 mb-1.5">
            {field.label}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => onChange(groupKey, field.key, e.target.value)}
            rows={3}
            className={`${inputClasses} resize-y`}
          />
        </div>
      );

    case 'image':
      return (
        <div>
          <label className="block text-xs font-body font-semibold text-slate-700 mb-1.5">
            {field.label}
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(groupKey, field.key, e.target.value)}
              placeholder="Image URL or upload below"
              className={inputClasses}
            />
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onFileUpload(groupKey, field.key, file);
                }}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-body font-semibold text-slate-700 hover:text-[#3B7097] hover:bg-white transition-colors"
              >
                <Upload size={13} />
                Upload Image File
              </button>
              {value && value.startsWith('data:') && (
                <span className="text-xs text-emerald-600 font-mono font-semibold">✓ Uploaded</span>
              )}
            </div>
            {/* Image Preview */}
            {value && (
              <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 max-h-28 shadow-2xs">
                <img src={value} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      );

    case 'color':
      return (
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
          <input
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(groupKey, field.key, e.target.value)}
            className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent p-0.5"
          />
          <div className="flex-1">
            <label className="block text-[11px] font-body font-semibold text-slate-700 mb-0.5">
              {field.label}
            </label>
            <input
              type="text"
              value={value || ''}
              onChange={(e) => {
                let v = e.target.value;
                if (v && !v.startsWith('#')) v = '#' + v;
                onChange(groupKey, field.key, v);
              }}
              placeholder="#3B7097"
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-0.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-[#3B7097]"
            />
          </div>
        </div>
      );

    case 'stats-array':
      return (
        <ArrayField
          label={field.label}
          items={value || []}
          renderItem={(item, idx, updateItem) => (
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="w-1/3">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Value</label>
                  <input
                    type="text"
                    value={item.value || ''}
                    onChange={(e) => updateItem(idx, { ...item, value: e.target.value })}
                    placeholder="12+"
                    className={inputClasses}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Stat Label / Heading</label>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => updateItem(idx, { ...item, label: e.target.value })}
                    placeholder="Years of Excellence"
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>
          )}
          onUpdate={(newItems) => onChange(groupKey, field.key, newItems)}
        />
      );

    case 'services-array':
      return (
        <ArrayField
          label={field.label}
          items={value || []}
          renderItem={(item, idx, updateItem) => (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#3B7097] uppercase tracking-wider mb-1">
                  Card #{idx + 1} Title / Heading
                </label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => updateItem(idx, { ...item, title: e.target.value })}
                  placeholder="Card Title / Heading"
                  className={inputClasses}
                />
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-full">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Icon</label>
                  <select
                    value={item.icon || 'Dumbbell'}
                    onChange={(e) => updateItem(idx, { ...item, icon: e.target.value })}
                    className={inputClasses}
                  >
                    {['Dumbbell', 'Flame', 'Heart', 'Users', 'Timer', 'Salad'].map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(idx, { ...item, description: e.target.value })}
                  placeholder="Service Card Description"
                  rows={2}
                  className={`${inputClasses} resize-y`}
                />
              </div>
            </div>
          )}
          onUpdate={(newItems) => onChange(groupKey, field.key, newItems)}
        />
      );

    case 'tiers-array':
      return (
        <ArrayField
          label={field.label}
          items={value || []}
          renderItem={(item, idx, updateItem) => (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#3B7097] uppercase tracking-wider mb-1">
                  Plan #{idx + 1} Name / Heading
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.name || ''}
                    onChange={(e) => updateItem(idx, { ...item, name: e.target.value })}
                    placeholder="Plan Name / Heading"
                    className={`${inputClasses} flex-1`}
                  />
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={item.recommended || false}
                      onChange={(e) => updateItem(idx, { ...item, recommended: e.target.checked })}
                      className="accent-[#3B7097] w-4 h-4"
                    />
                    Popular Badge
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-1/2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Price</label>
                  <input
                    type="text"
                    value={item.price || ''}
                    onChange={(e) => updateItem(idx, { ...item, price: e.target.value })}
                    placeholder="₹2,999"
                    className={inputClasses}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Period</label>
                  <input
                    type="text"
                    value={item.period || ''}
                    onChange={(e) => updateItem(idx, { ...item, period: e.target.value })}
                    placeholder="/month"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Plan Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(idx, { ...item, description: e.target.value })}
                  placeholder="Plan Short Description"
                  rows={2}
                  className={`${inputClasses} resize-y`}
                />
              </div>

              {/* Features list */}
              <div className="pl-3 border-l-2 border-[#3B7097]/30 space-y-2">
                <span className="text-[11px] font-bold text-[#3B7097] uppercase tracking-wider block">
                  Plan Features List
                </span>
                {item.features?.map((feat, fi) => (
                  <div key={fi}>
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const newFeatures = [...item.features];
                        newFeatures[fi] = e.target.value;
                        updateItem(idx, { ...item, features: newFeatures });
                      }}
                      placeholder={`Feature ${fi + 1}`}
                      className={inputClasses}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          onUpdate={(newItems) => onChange(groupKey, field.key, newItems)}
        />
      );

    case 'gallery-array':
      return (
        <ArrayField
          label={field.label}
          items={value || []}
          renderItem={(item, idx, updateItem) => (
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-[#3B7097] uppercase tracking-wider mb-1">
                Photo #{idx + 1} Image & Caption
              </label>
              <ImageFieldInline
                value={item.src}
                onChange={(val) => updateItem(idx, { ...item, src: val })}
                onFileUpload={async (file) => {
                  const dataUrl = await compressImage(file);
                  updateItem(idx, { ...item, src: dataUrl });
                }}
                placeholder="Image URL"
              />
              <input
                type="text"
                value={item.alt || ''}
                onChange={(e) => updateItem(idx, { ...item, alt: e.target.value })}
                placeholder="Photo Caption / Alt Text"
                className={inputClasses}
              />
            </div>
          )}
          onUpdate={(newItems) => onChange(groupKey, field.key, newItems)}
        />
      );

    case 'steps-array':
      return (
        <ArrayField
          label={field.label}
          items={value || []}
          renderItem={(item, idx, updateItem) => (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-[#3B7097] uppercase tracking-wider mb-1">
                  Step #{idx + 1} Title / Heading
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.number || ''}
                    onChange={(e) => updateItem(idx, { ...item, number: e.target.value })}
                    placeholder="01"
                    className={`${inputClasses} w-16`}
                  />
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => updateItem(idx, { ...item, title: e.target.value })}
                    placeholder="Step Title / Heading"
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Step Description</label>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => updateItem(idx, { ...item, description: e.target.value })}
                  placeholder="Step Description Text"
                  rows={2}
                  className={`${inputClasses} resize-y`}
                />
              </div>
            </div>
          )}
          onUpdate={(newItems) => onChange(groupKey, field.key, newItems)}
        />
      );

    default:
      return null;
  }
}

/* ══════════════════════════════════════════════════════
   Array Field Component (Edit existing items only)
   ══════════════════════════════════════════════════════ */
function ArrayField({ label, items, renderItem, onUpdate }) {
  const updateItem = (idx, newItem) => {
    const newItems = [...items];
    newItems[idx] = newItem;
    onUpdate(newItems);
  };

  return (
    <div>
      <label className="block text-xs font-body font-bold text-slate-800 mb-2">
        {label}
      </label>
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="relative bg-slate-50/90 rounded-xl p-4 border border-slate-200 shadow-2xs">
            {renderItem(item, idx, updateItem)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Inline image field with upload ── */
function ImageFieldInline({ value, onChange, onFileUpload, placeholder }) {
  const fileRef = useRef(null);
  const inputClasses =
    'w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-body text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#3B7097]';

  return (
    <div className="space-y-1.5">
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
      />
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileUpload(file);
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-600 hover:text-[#3B7097] transition-colors"
        >
          <Upload size={12} />
          Upload
        </button>
      </div>
    </div>
  );
}
