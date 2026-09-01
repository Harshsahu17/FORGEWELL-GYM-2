# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing React + Vite application; preserve the current component structure and local data-driven content.

## Users

Inferred from the existing site: people in Bhopal evaluating a premium gym, personal training, and structured fitness programs, primarily on mobile and desktop web.

## Product Purpose

ForgeWell is a premium fitness studio website that helps prospective members understand the facility, programs, membership options, and joining process. Success means a visitor quickly understands the offer and opens the membership enquiry or contact flow.

## Positioning

Inferred from the existing content: ForgeWell positions itself around purposeful strength and conditioning, coached progress, premium equipment, and a supportive training community.

## Operating Context

Visitors scan the landing page, explore services and the gallery, compare membership tiers, and either submit a general contact message or open a membership enquiry form. The page must work across mobile, tablet, and desktop web views.

## Capabilities and Constraints

- Preserve the existing section content, local imagery, navigation anchors, gallery lightbox, local success states, and membership enquiry modal.
- Keep contact and membership form submissions local for now; do not introduce email redirects or external backends.
- Keep the current React/Vite stack and responsive web behavior.
- Do not invent testimonials, performance claims, or customer data.

## Brand Commitments

- Preserve the ForgeWell name and existing logo asset.
- Keep the current purpose-led, premium fitness voice.
- Use the existing local gym imagery as the visual proof of the facility.

## Evidence on Hand

- Source content and section data: `src/data/forgewellData.json`
- Local imagery in `public/` including hero and gallery assets.
- Existing flows in `src/components/Contact.jsx` and `src/components/JoinFormModal.jsx`.

## Product Principles

- Make the training offer understandable within seconds.
- Show the facility and programs as evidence, not decoration.
- Make the next action obvious without pressure.
- Keep details legible and usable on small screens.

## Accessibility & Inclusion

Use semantic headings, labelled form controls, keyboard-visible focus, touch-friendly controls, and reduced-motion support across the responsive web experience.
