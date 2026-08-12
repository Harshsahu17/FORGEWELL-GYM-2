/* ── Data Manager: localStorage read/write/merge for section overrides ── */

const STORAGE_KEY = 'forgewell_overrides_v3';

/**
 * Clean up legacy storage if present
 */
function cleanupLegacyStorage() {
  try {
    ['forgewell_overrides_v1', 'forgewell_overrides_v2'].forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });
  } catch (e) {
    // Ignore error
  }
}
cleanupLegacyStorage();

/**
 * Deep-merge source into target. Arrays from source replace target arrays entirely.
 */
export function deepMerge(target, source) {
  if (!source || typeof source !== 'object') return target;
  if (!target || typeof target !== 'object') return source;

  const output = { ...target };

  Object.keys(source).forEach(key => {
    const srcVal = source[key];
    const tgtVal = target[key];

    if (Array.isArray(srcVal)) {
      output[key] = srcVal;
    } else if (srcVal && typeof srcVal === 'object' && !Array.isArray(srcVal)) {
      output[key] = deepMerge(tgtVal || {}, srcVal);
    } else {
      output[key] = srcVal;
    }
  });

  return output;
}

/**
 * Read all overrides from localStorage.
 */
export function getAllOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Get a section's data by deep-merging fallback defaults with stored overrides.
 */
export function getSection(key, fallback) {
  const overrides = getAllOverrides();
  const stored = overrides[key];
  if (!stored) return fallback;
  return deepMerge(fallback, stored);
}

/**
 * Save a section's data to localStorage, dispatching a custom event for live sync.
 */
export function saveSection(key, value) {
  const overrides = getAllOverrides();
  overrides[key] = value;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
  window.dispatchEvent(new CustomEvent('section-saved', { detail: { key } }));
}

export { STORAGE_KEY };
