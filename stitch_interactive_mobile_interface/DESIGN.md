---
name: Heritage Industrial Modern
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#414845'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#727974'
  outline-variant: '#c1c8c3'
  surface-tint: '#446557'
  primary: '#00130c'
  on-primary: '#ffffff'
  primary-container: '#072a1f'
  on-primary-container: '#719384'
  inverse-primary: '#aacebe'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#0f100d'
  on-tertiary: '#ffffff'
  tertiary-container: '#242522'
  on-tertiary-container: '#8c8c88'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6ebd9'
  primary-fixed-dim: '#aacebe'
  on-primary-fixed: '#002116'
  on-primary-fixed-variant: '#2c4d40'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e4e2de'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#474744'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-display:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system embodies the "Heritage Industrial Modern" aesthetic—a blend of established authority and contemporary efficiency. The visual language is rooted in reliability, speed, and industrial strength, designed specifically for a professional desktop environment.

The brand personality is disciplined, capable, and prestigious. It balances the weight of a long-standing institution with the streamlined precision of modern logistics. The emotional response should be one of total confidence: "This is a partner that can handle any scale of operation with surgical accuracy."

The style utilizes:
- **Corporate Modernism:** Precise alignment, structured grids, and a focus on clarity.
- **Industrial Accents:** High-contrast borders, subtle metallic sheen, and functional iconography.
- **Heritage Quality:** A sophisticated color palette that feels "earned" and professional.

## Colors

The color palette is anchored by **Forest Green** (#072a1f), symbolizing stability and growth, and **Industrial Gold** (#c5a059), used strategically to highlight premium features, calls to action, and key statuses. 

- **Primary (Forest Green):** Used for navigation backgrounds, primary headings, and heavy UI containers. It provides a deep, authoritative base.
- **Secondary (Industrial Gold):** Reserved for interactive elements, highlights, and borders on featured cards. It should be used with restraint to maintain its "prestige" value.
- **Background (Cream/Off-White):** A soft, warm neutral (#fcfaf5) is used for the main canvas to reduce eye strain and provide a more "heritage" feel than pure white.
- **Neutral (Carbon):** A rich charcoal (#1a1a1a) for body text and functional icons, ensuring maximum legibility.

## Typography

This design system exclusively uses **Manrope** for its technical precision and modern geometric construction. The typeface bridges the gap between industrial utility and professional elegance.

Headlines use tight tracking and heavy weights to convey strength and urgency. Body text utilizes a generous line-height to ensure clarity for data-heavy desktop tasks. Labels use uppercase styling and wider letter spacing to denote secondary information or metadata, mimicking industrial tagging and documentation.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** system for the main content area, centered on the screen with a maximum width of 1280px. This ensures a consistent, organized reading experience on large desktop monitors.

- **Rhythm:** A strictly enforced 8px baseline grid maintains vertical alignment across all components.
- **Density:** The system favors "Professional Density"—tight enough to show significant data, but with enough margin to feel premium and intentional.
- **Breakpoints:** While primarily desktop-focused, the layout reflows to an 8-column grid for tablets (768px - 1024px) and a 4-column grid for mobile, where margins reduce from 40px to 16px.

## Elevation & Depth

To maintain the "Industrial" character, the design system avoids soft, floating shadows. Instead, it uses **Structured Tonal Layering** and **Bold Outlines**:

- **Layer 0 (Background):** The base cream surface.
- **Layer 1 (Cards/Containers):** Flat surfaces with a 1px solid border (#072a1f at 10% opacity).
- **Layer 2 (Interactive/Focus):** A subtle, sharp 2px "industrial shadow" (0px offset, high density) in Forest Green to indicate selection.
- **Layer 3 (Overlays):** Modals and dropdowns use a sharp, 4px displacement shadow without blur, creating a mechanical "lifted" effect.
- **Accents:** Key components (like the active navigation item) use a 2px Industrial Gold bottom border for emphasis.

## Shapes

The shape language is primarily **Soft (0.25rem)**. This provides a subtle "machined" edge—just enough to feel modern and accessible without losing the structural integrity of sharp industrial lines.

- **Buttons & Inputs:** Use the base 0.25rem (4px) radius.
- **Cards & Sections:** Use `rounded-lg` (8px) to create clear visual containment.
- **Status Pills:** Use `rounded-xl` (12px) for high contrast against the otherwise rectangular UI.

## Components

### Buttons
Primary buttons use the Forest Green background with white Manrope-bold text. Secondary buttons use a transparent background with an Industrial Gold border and text. Hover states should include a subtle brightening of the background or a slight increase in border weight (from 1px to 2px).

### Input Fields
Fields feature a 1px Forest Green border with a 4px radius. The label sits above the field in `label-bold` style. Upon focus, the border thickens and changes to Industrial Gold.

### Cards
Cards are the primary organizational tool. They should have a 1px subtle border and a white background. Featured cards (e.g., "Construction" or "Office Needs") may feature a 2px top-border in Industrial Gold to denote priority.

### Lists & Tables
Given the professional context, data tables use a "Zebra" striping pattern in a very light tint of the primary color. Headers are always Forest Green with white text to provide a strong visual anchor.

### Status Indicators (Chips)
Used for delivery statuses or stock levels. These use the `rounded-xl` shape with low-opacity background tints of green (success), gold (warning), or red (alert).