---
name: ForgeWell
description: A light editorial training system for purposeful fitness.
colors:
  primary: "#2F6F95"
  primary-deep: "#1C4B69"
  signal: "#D3533D"
  highlight: "#ECC159"
  paper: "#F7F4ED"
  surface: "#EBF1F2"
  card: "#FFFDF8"
  ink: "#182328"
  muted: "#4C5B60"
  line: "#CDD5D3"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "clamp(2.8rem, 5.2vw, 5.4rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.065em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.62rem"
    fontWeight: 600
    letterSpacing: "0.16em"
    textTransform: uppercase
rounded:
  sm: "8px"
  md: "12px"
  lg: "24px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
---

# Design System: ForgeWell

## Overview

**Creative North Star: "The Training Ledger"**

ForgeWell is expressed as a light editorial field journal for disciplined progress. Warm paper surfaces carry deep ink typography, structured rules, facility photography, and small signal marks that feel more like a coach's notation than generic fitness decoration. The page is confident and tactile without becoming aggressive: clarity, proof, and a visible next step lead every section.

The system uses a restrained two-ink rhythm: ForgeWell blue owns primary action and progress, while coral marks moments that need attention. Yellow is reserved for small evidence highlights. The visual world rejects the predictable all-black gym aesthetic and keeps the experience bright, legible, and welcoming.

**Key Characteristics:**

- Warm paper canvas with cool secondary surfaces.
- Oversized editorial headlines and compact mono labels.
- Image-led proof with quiet borders and responsive cropping.
- Rules, indexes, and timelines instead of repetitive feature-card grids.

## Colors

The palette is light, mineral, and print-like: blue for commitment, coral for signals, yellow for evidence, and ink for reading.

### Primary

- **ForgeWell Blue** (#2F6F95): Primary actions, selected states, key emphasis, and the active membership plan.
- **ForgeWell Blue Deep** (#1C4B69): Hover and pressed states where the action needs more weight.

### Secondary

- **Signal Coral** (#D3533D): Section markers, index numbers, and small moments of directional emphasis.
- **Evidence Yellow** (#ECC159): Small proof accents, popular-plan marker, and image metadata.

### Neutral

- **Warm Paper** (#F7F4ED): The primary page canvas and input backgrounds.
- **Cool Surface** (#EBF1F2): Alternating sections, timeline field, and quiet controls.
- **Soft Card** (#FFFDF8): Form and pricing surfaces that sit above the paper.
- **Deep Ink** (#182328): Headings, readable high-contrast controls, and image overlays.
- **Muted Ink** (#4C5B60): Body copy and supporting labels.
- **Mineral Line** (#CDD5D3): Dividers, table-like rules, and low-noise borders.

### Named Rules

**The Signal Scarcity Rule.** Coral and yellow are directional marks, not a second body palette; keep them limited to labels, indicators, and proof.

## Typography

**Display Font:** Bricolage Grotesque (with sans-serif)
**Body Font:** DM Sans (with sans-serif)
**Label/Mono Font:** IBM Plex Mono (with monospace)

**Character:** Bricolage Grotesque gives the page a muscular editorial voice without defaulting to condensed sports typography. DM Sans keeps longer descriptions and form labels calm, while IBM Plex Mono makes indexes and operational details feel deliberate.

### Hierarchy

- **Display** (700, `clamp(2.8rem, 5.2vw, 5.4rem)`, 0.9): Section headlines and the most important first-viewport statements.
- **Headline** (700, `clamp(3.6rem, 9vw, 8.8rem)`, 0.84): Hero title only; it is allowed to break dramatically.
- **Title** (700, 1.5rem–3rem, 0.9): Program names, plan names, and timeline steps.
- **Body** (400, 1rem–1.125rem, 1.6): Explanatory copy with a comfortable reading measure.
- **Label** (600, 0.58rem–0.68rem, 0.16em, uppercase): Indexes, metadata, nav, and section markers.

### Named Rules

**The Two Voices Rule.** Use the display face for meaning and the mono face for measurement; do not use mono as decorative body copy.

## Layout

The page uses a full-width light canvas with a centered content rail capped at 1440px and horizontal padding that grows from 16px on phones to 64px on wide screens. Sections alternate between warm paper and cool mineral surfaces so the scroll has rhythm without relying on heavy container chrome.

The hero is a split editorial composition: oversized statement and actions on the left, one decisive facility image and proof strip on the right. Services are indexed rows, pricing uses three comparison columns from large tablet upward, gallery uses an asymmetric image grid, and the onboarding sequence becomes a vertical timeline on small screens. All interactive controls retain touch-friendly sizing and visible focus rings.

## Elevation & Depth

Depth is tonal first and elevated second. Surfaces begin flat with mineral borders; shadows appear on the hero image, forms, modal, and hover states only. Shadows remain soft and offset, never hard blocks. Image overlays use deep ink only when needed to preserve metadata contrast.

### Shadow Vocabulary

- **Image depth:** `0 25px 50px -20px rgba(24, 35, 40, 0.22)` for the hero and major photography.
- **Interactive lift:** `0 20px 35px -18px rgba(47, 111, 149, 0.24)` for hovered cards and primary actions.
- **Form elevation:** `0 25px 60px -20px rgba(24, 35, 40, 0.30)` for the membership dialog.

### Named Rules

**The Flat-by-Default Rule.** A surface earns a shadow through hierarchy or interaction; borders and tonal shifts do the rest.

## Shapes

The shape language is compact and functional: 8px controls, 12px fields and small panels, and 24px image-led feature frames. Buttons are rectangular with softened corners rather than pill-shaped. Borders are one-pixel mineral rules; rounded corners are reserved for images, forms, and actionable surfaces.

## Components

### Buttons

- **Shape:** Soft rectangular corners (8px).
- **Primary:** ForgeWell Blue with white text and 14px vertical / 24px horizontal padding.
- **Hover / Focus:** Deep blue fill, a slight upward lift, soft shadow, and a visible blue focus ring.
- **Secondary:** Warm card fill with an ink border; hover promotes the border and text to blue.

### Cards / Containers

- **Corner Style:** 12px for plans/forms, 24px for image-led feature frames.
- **Background:** Soft Card over Warm Paper or Cool Surface.
- **Shadow Strategy:** Flat at rest; soft elevation on hover or dialog state.
- **Border:** One-pixel Mineral Line or ForgeWell Blue for the selected plan.
- **Internal Padding:** 24px on mobile, 32px on larger cards.

### Inputs / Fields

- **Style:** Warm Paper fill, Mineral Line border, 8px radius, 14–16px padding.
- **Focus:** Blue border plus a low-opacity blue ring; preserve browser-visible keyboard focus.
- **Error / Success:** Error uses Signal Coral helper text; success uses a yellow-tinted check state.

### Navigation

The desktop nav is a quiet indexed rail with mono uppercase labels, a coral underline on hover, and one blue action button. The mobile menu becomes a full-page paper index with numbered links and a bottom-anchored action.

### Signature Component: Training Index

Services and onboarding use numbered rules to turn a long landing page into a coach-like sequence. The numbers are informative because they encode program order and journey progression, not decoration.

## Do's and Don'ts

### Do:

- **Do** use real ForgeWell photography as proof and let one image carry a section.
- **Do** keep headings oversized, compact, and left-aligned where the composition permits.
- **Do** use rules, indexes, and measured metadata to make the system feel operational.
- **Do** preserve keyboard focus, reduced motion, and touch-friendly control sizes.

### Don't:

- **Don't** turn the page into a generic dark-gym theme.
- **Don't** use coral or yellow as broad backgrounds for long copy.
- **Don't** rebuild every section as a repeated icon-plus-card grid.
- **Don't** add unverified testimonials, benchmarks, or performance claims.
