---
name: Electric Dark Glass
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f24'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff516a'
  on-tertiary-container: '#5b0017'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets short-form video creators, scriptwriters, and digital media operators seeking rapid, high-retention script generation. The visual voice is energetic, ultra-modern, and intensely focused, blending the hyper-speed energy of creator culture with high-precision creative tooling. 

The aesthetic fuses **Glassmorphism** with **Luminous High-Tech Minimalism**. Deep obsidian backdrops isolate vibrant neon spectrum accents (Electric Indigo, Cyber Cyan, and TikTok Neon Rose) to drive conversions and focus creator attention on workflow efficiency. Frosted translucent layers, subtle glowing contours, and tactile micro-interactions establish an agile, high-performance workstation atmosphere.

## Colors

The palette employs dark-mode-first color architecture optimized for low visual fatigue during high-volume ideation:

- **Base Canvas (`#0A0A0E`)**: Foundations and peripheral viewport areas.
- **Surface Cards (`#13131A`)**: Mid-ground content panels and default structural modules.
- **Elevated Surfaces (`#1C1C26`)**: Modals, hovering controls, dropdowns, and active toolbars.
- **Borders & Dividers (`rgba(255, 255, 255, 0.08)`)**: Ultra-fine linear separators providing crisp containment without visual friction.
- **Electric Indigo (`#6366F1`)**: Primary actions, high-importance triggers, and core state changes.
- **Cyber Cyan (`#06B6D4`)**: Teleprompter cues, hook-performance metrics, and AI workflow telemetry.
- **TikTok Neon Rose (`#F43F5E`)**: High-converting hooks, viral indicators, and call-to-action anchors.
- **Text & Foreground**: Full-opacity white (`#FFFFFF`) for primary headings, softened slate (`#94A3B8`) for body metadata, and muted graphite (`#64748B`) for disabled states.

## Typography

The typographic hierarchy establishes clear structural clarity across dense scriptwriting screens:
- **Headings (Space Grotesk)**: Geometric, confident, and slightly technical. Negative letter-spacing maintains tight visual rhythm on big monitor views and mobile screens.
- **Interface & Narrative Body (Plus Jakarta Sans)**: Highly legible, open apertures ensure frictionless script reading and rapid prompt drafting.
- **Script Metadata, Prompts, and Badges (JetBrains Mono)**: Conveys analytical rigor for timing calculations, token budgets, and hook triggers.

## Layout & Spacing

A 12-column fluid grid system anchors the responsive layout:
- **Desktop (1280px+)**: Multi-pane layout featuring an expandable persistent navigation rail, a dual-pane editor workspace, and an interactive hook analysis drawer. 24px gutters and 32px canvas margins maintain breathability.
- **Tablet (768px - 1279px)**: Collapses secondary utility panels into slide-over sheets, switching the editor to full view width with 16px gutters and 24px canvas margins.
- **Mobile (Under 768px)**: Single-column linear layout. Workspace actions collapse to fixed bottom navigation bars and floating tool sheets, supported by tight 12px gutters and 16px safe-area margins.

## Elevation & Depth

Spatial layering relies on translucent glass planes and controlled luminous diffusion rather than muddy drop shadows:

- **Level 0 (Base)**: `#0A0A0E` canvas, flush with the viewport.
- **Level 1 (Card Containers)**: `#13131A` with a 1px exterior stroke of `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Floating Glass Layers)**: `rgba(28, 28, 38, 0.75)` backdrop with `backdrop-filter: blur(16px)` and subtle highlight gradient lines along the top edge (`linear-gradient(90deg, rgba(255,255,255,0.15), transparent)`).
- **Luminous Bloom (Active & Focus)**: High-priority interactions trigger directional halo effects:
  - Primary Active: `0 0 20px rgba(99, 102, 241, 0.35)`
  - Viral / Hook Focus: `0 0 20px rgba(244, 63, 94, 0.35)`
  - AI Generation Pulse: `0 0 24px rgba(6, 182, 212, 0.30)`

## Shapes

The interface utilizes structured geometric curves (level 2 roundedness) to balance clean product architecture with tactical warmth:
- Standard inputs, list rows, and cards adopt a default `0.5rem` (8px) radius.
- Large panel cards, script preview containers, and dialog sheets use `rounded-lg` (`1rem` / 16px).
- Metadata badges, viral hook pill meters, and floating micro-actions adopt full pill radii (`9999px`) to emphasize distinct glassmorphic physical objects within the dark workspace.

## Components

### Buttons
- **Primary CTA**: Solid `#6366F1` background, white label, with a soft neon aura (`0 4px 14px rgba(99, 102, 241, 0.4)`). Scales to `0.98` on click.
- **Viral Action CTA**: `#F43F5E` gradient tint, optimized for final script generation and export triggers.
- **Secondary / Ghost**: Translucent glass fill (`rgba(255, 255, 255, 0.04)`), 1px border (`rgba(255, 255, 255, 0.08)`), hover state brightens border to Cyber Cyan (`rgba(6, 182, 212, 0.5)`).

### Input Fields & Prompt Editors
- Background `#13131A` framed with `rgba(255, 255, 255, 0.08)`.
- Active focus smoothly transitions the border to `#6366F1` along with a subtle `0 0 0 3px rgba(99, 102, 241, 0.2)` ring.
- Placeholder text uses muted slate (`#64748B`).

### Glassmorphic Pills & Badges
- Semi-transparent fills (`rgba(255, 255, 255, 0.06)`), 1px border matching the accent color at 30% opacity, and `JetBrains Mono` text.
- Viral score pills incorporate an interior glowing dot colored dynamically by rating (Rose for viral hooks, Cyan for pacing cues).

### Script Cards
- Built using `#13131A` cards with 16px interior padding and 12px external gaps.
- Hovering brings forward an inner top edge highlight and elevates surface color to `#1C1C26`.

### Checkboxes & Segmented Toggles
- Custom square-rounded boxes (4px radius). When selected, filled with `#6366F1` with an inner white glyph.
- Segmented script mode switches (e.g., "Hook / Body / Call-To-Action") use a dark container rail (`#0A0A0E`) with sliding pill indicators in elevated glass (`#1C1C26`).