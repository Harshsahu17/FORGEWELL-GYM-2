/* ── Theme utility: hex↔RGB conversion + CSS custom property application ── */

/* Exact Color Palette from User Image:
   - #3B7097 : Deep Ocean Blue (Primary Accent)
   - #75BDE0 : Sky Blue (Secondary Accent / Hover)
   - #A9D09E : Sage Green (Badge / Highlights)
   - #F6E2BC : Warm Sand / Cream (Soft Card Accents)
*/

export const DEFAULT_THEME = {
  accent:      '#3B7097', // Deep Ocean Blue
  accentHover: '#2C5677', // Darker Ocean Blue
  shadow:      '#3B7097',
  bgPrimary:   '#FAFAFA', // Crisp Clean Off-White
  bgSecondary: '#F0F4F8', // Soft Blue-tinted Slate
  bgCard:      '#FFFFFF', // Pure White Cards
  inkPrimary:  '#1E293B', // Slate 800 (High contrast dark)
  inkSecondary:'#475569', // Slate 600
  border:      '#E2E8F0', // Clean Slate Border
};

/* Map of theme key → CSS custom property name */
const CSS_VAR_MAP = {
  accent:      '--accent',
  accentHover: '--accent-hover',
  shadow:      '--shadow',
  bgPrimary:   '--bg-primary',
  bgSecondary: '--bg-secondary',
  bgCard:      '--bg-card',
  inkPrimary:  '--ink-primary',
  inkSecondary:'--ink-secondary',
  border:      '--border',
};

/**
 * Convert a hex color string (#RRGGBB or #RGB) to space-separated RGB.
 * e.g. "#3B7097" → "59 112 151"
 */
export function hexToRgb(hex) {
  if (!hex) return '59 112 151';
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  const num = parseInt(h, 16);
  if (isNaN(num)) return '59 112 151';
  return `${(num >> 16) & 255} ${(num >> 8) & 255} ${num & 255}`;
}

/**
 * Convert space-separated RGB string back to hex.
 */
export function rgbToHex(rgb) {
  if (!rgb) return '#3b7097';
  const parts = rgb.trim().split(/\s+/).map(Number);
  return '#' + parts.map(p => (isNaN(p) ? 0 : p).toString(16).padStart(2, '0')).join('');
}

/**
 * Apply a theme object to the document by setting CSS custom properties.
 * @param {Object} themeObj - keys matching DEFAULT_THEME, values as hex strings
 */
export function applyTheme(themeObj) {
  const root = document.documentElement;
  const merged = { ...DEFAULT_THEME, ...themeObj };
  Object.entries(merged).forEach(([key, hex]) => {
    const cssVar = CSS_VAR_MAP[key];
    if (cssVar && hex) {
      root.style.setProperty(cssVar, hexToRgb(hex));
    }
  });
}

/**
 * Reset theme to defaults.
 */
export function resetTheme() {
  applyTheme(DEFAULT_THEME);
}

export { CSS_VAR_MAP };
