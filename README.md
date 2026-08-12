# ForgeWell — Premium Fitness Marketing Site

A dark, premium single-page marketing website for **ForgeWell** gym (Bhopal) with a built-in **live content editor** ("Customizer") and **full theme customization** — all client-side, no backend required.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Architecture

```
src/
├── data/
│   └── forgewellData.json       # Single source of truth for all content
├── utils/
│   ├── theme.js                 # Hex↔RGB conversion, CSS variable application
│   ├── dataManager.js           # localStorage read/write/merge
│   ├── useManagedSection.js     # Live-data hook (pub/sub via CustomEvent)
│   ├── useScrollReveal.js       # IntersectionObserver scroll-reveal
│   └── imageUtils.js            # Client-side image compression
├── components/
│   ├── icons/index.jsx          # Hand-authored SVG icon set (no icon libraries)
│   ├── Navbar.jsx               # Fixed navbar with glass effect + mobile menu
│   ├── Hero.jsx                 # Full-viewport hero section
│   ├── About.jsx                # Split image/content layout
│   ├── Services.jsx             # 6-card service grid
│   ├── Pricing.jsx              # 3-tier pricing cards
│   ├── Gallery.jsx              # Image grid with native <dialog> lightbox
│   ├── HowItWorks.jsx           # 4-step process with connector lines
│   ├── Footer.jsx               # Multi-column footer
│   ├── SectionToolbar.jsx       # Sticky Customize button per section
│   └── Customizer.jsx           # Slide-in side panel with dynamic forms
├── App.jsx                      # Root — assembles all sections
├── main.jsx                     # React entry point
└── index.css                    # Global CSS: theme variables, animations, utilities
```

---

## 🎨 Theme System

### How It Works

1. **CSS Custom Properties** (`:root` in `index.css`) define all colors as **space-separated RGB**:
   ```css
   :root {
     --accent: 255 212 0;
     --bg-primary: 5 5 5;
     /* ... */
   }
   ```

2. **Tailwind** maps these via the `rgb(var(--x) / <alpha-value>)` pattern, so opacity utilities like `bg-accent/50` work:
   ```js
   // tailwind.config.js
   colors: {
     accent: { DEFAULT: 'rgb(var(--accent) / <alpha-value>)' }
   }
   ```

3. **Theme is stored as hex strings** (e.g. `#FFD400`) in localStorage, but **converted to space-separated RGB** before being set on `:root`:
   ```js
   hexToRgb('#FFD400') // → "255 212 0"
   document.documentElement.style.setProperty('--accent', '255 212 0');
   ```

4. **Flash prevention**: An inline `<script>` in `index.html`'s `<head>` reads saved theme from localStorage and applies it **synchronously before React mounts** — preventing any flash of default colors.

### Themeable Properties

| Picker Label         | CSS Variable       | Default   |
|---------------------|-------------------|-----------|
| Accent Color        | `--accent`        | `#FFD400` |
| Accent Hover        | `--accent-hover`  | `#E5BE00` |
| Shadow Color        | `--shadow`        | `#FFD400` |
| Background Primary  | `--bg-primary`    | `#050505` |
| Background Secondary| `--bg-secondary`  | `#0D0D0D` |
| Card Background     | `--bg-card`       | `#151515` |
| Text Primary        | `--ink-primary`   | `#FFFFFF` |
| Text Secondary      | `--ink-secondary` | `#A3A3A3` |
| Border Color        | `--border`        | `#242424` |

---

## ✏️ Customizer Event Flow

```
User types in Customizer form
        │
        ▼
CustomEvent('live-preview-{sectionKey}')
dispatched with current form data
        │
        ▼
useManagedSection(key) hook listens
→ updates section state instantly
→ section re-renders with preview data
        │
        ├── [Save clicked]
        │       │
        │       ▼
        │   saveSection(key, value)
        │   → writes to localStorage
        │   → dispatches CustomEvent('section-saved')
        │   → useManagedSection re-reads from storage
        │
        └── [Close without save]
                │
                ▼
            CustomEvent('revert-preview-{sectionKey}')
            → useManagedSection reverts to last saved state
            → theme colors revert via applyTheme(savedTheme)
```

### Cross-Tab Sync

The `useManagedSection` hook also listens for the native `storage` event, so edits saved in one browser tab instantly appear in another.

---

## 📦 Persistence

- **Storage key**: `forgewell_overrides_v1`
- **Format**: Single JSON object keyed by section name:
  ```json
  {
    "navbar": { ... },
    "hero": { ... },
    "theme": { ... },
    "about": { ... }
  }
  ```
- **Merge strategy**: `deepMerge(defaultData, savedOverrides)` — editing one field never wipes unedited siblings. Arrays from the override replace default arrays wholesale.

---

## 🖼️ Image Uploads

- Both **URL** and **file upload** are supported for every image field.
- Uploaded files are **compressed client-side** using the Canvas API:
  - Max width: 1200px
  - Quality: 80%
  - Format: WebP (fallback to JPEG)
- Compressed images are stored as **data URLs** in localStorage.

---

## 🔧 Troubleshooting

### Colors not persisting after refresh
- Check that the inline `<script>` in `index.html` is reading from the correct storage key (`forgewell_overrides_v1`).
- Verify that the `CSS_VAR_MAP` in the inline script matches the one in `src/utils/theme.js`.
- Open DevTools → Application → Local Storage and inspect the stored JSON.

### Sticky toolbar not sticking
- The toolbar uses `position: sticky; bottom: 1rem;`. This breaks if **any ancestor** has `overflow: hidden`, `overflow: auto`, or `overflow: scroll`.
- The toolbar must be a direct child of the section's outer content wrapper (not nested inside a clipping container).

### Customizer panel not appearing
- Check that `activeCustomizer` state in `App.jsx` is being set correctly.
- The panel uses CSS `transform: translateX(100%)` / `translateX(0)` — verify the `.open` class is being applied.

### Cross-tab sync not working
- The native `storage` event only fires in **other** tabs, not the tab that made the change. This is by design.
- Make sure both tabs are on the same origin.

### Image uploads failing
- Large images may exceed localStorage's ~5MB limit. The compression utility targets ~80% quality with max 1200px width.
- If localStorage is full, the `saveSection` function logs a warning to the console.

### Scroll reveal animations not playing
- If `prefers-reduced-motion: reduce` is enabled in your OS settings, all animations are disabled. This is intentional for accessibility.
- Check that the `.reveal` class is present on the element and the `useScrollReveal` hook's ref is attached.

---

## 📋 Tech Stack

| Technology    | Version | Purpose                           |
|--------------|---------|-----------------------------------|
| React        | 18      | UI components (hooks only)        |
| Vite         | 8.x     | Build tool / dev server           |
| Tailwind CSS | 3.x     | Utility-first styling             |
| localStorage | —       | Client-side persistence           |

**No external dependencies** for animations (uses CSS `@keyframes` + `IntersectionObserver`), icons (hand-authored SVGs), or state management (uses `CustomEvent` pub/sub).

---

## 📄 License

© 2024 ForgeWell. All rights reserved.
