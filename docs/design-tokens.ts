/**
 * Gee & Geesus — Design Tokens
 * Tailwind CSS configuration extension
 *
 * Usage: import and spread into tailwind.config.ts theme.extend
 */

// =============================================
// COLOR SYSTEM
// =============================================

export const colors = {
  // Brand anthracite scale (primary surface palette)
  anthracite: {
    950: '#0f0f0f', // deepest — reserved for overlays
    900: '#1a1a1a', // base background
    800: '#222222', // slightly raised surface
    700: '#2a2a2a', // nav scrolled, mobile menu
    600: '#2e2e2e', // cards, elevated surfaces
    500: '#3a3a3a', // borders, dividers, subtle elements
    400: '#4a4a4a', // hover borders, active states
    300: '#5a5a5a', // disabled text on dark
    200: '#6a6a6a', // placeholder text
    100: '#888888', // muted text (secondary)
    50: '#999999',  // muted text (tertiary)
  },

  // Text colors
  text: {
    primary: '#ffffff',   // headings, CTAs, strong emphasis
    body: '#d4d4d4',      // paragraph text, descriptions
    muted: '#999999',     // secondary info, labels, captions
    disabled: '#5a5a5a',  // disabled state text
  },

  // Accent (white-on-dark brand)
  accent: {
    DEFAULT: '#ffffff',
    hover: '#cccccc',
    muted: 'rgba(255, 255, 255, 0.12)', // subtle glow, box shadows
  },

  // Surface layers
  surface: {
    base: '#1a1a1a',     // page background
    raised: '#252525',   // alternating sections (section--dark)
    card: '#2e2e2e',     // cards, inputs, elevated UI
    overlay: 'rgba(15, 15, 15, 0.95)', // modals, mobile menu
  },

  // Semantic
  success: {
    DEFAULT: '#4ade80',
    muted: 'rgba(74, 222, 128, 0.15)',
    text: '#86efac',
  },
  warning: {
    DEFAULT: '#fbbf24',
    muted: 'rgba(251, 191, 36, 0.15)',
    text: '#fcd34d',
  },
  error: {
    DEFAULT: '#f87171',
    muted: 'rgba(248, 113, 113, 0.15)',
    text: '#fca5a5',
  },
  info: {
    DEFAULT: '#60a5fa',
    muted: 'rgba(96, 165, 250, 0.15)',
    text: '#93bbfd',
  },
} as const;

// =============================================
// TYPOGRAPHY
// =============================================

export const fontFamily = {
  heading: ['"Bebas Neue"', 'sans-serif'],
  body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
  mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
};

// Type scale — 1.25 ratio (major third)
export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],       // 12px — captions, badges
  sm: ['0.85rem', { lineHeight: '1.25rem' }],     // 13.6px — labels, meta
  base: ['0.95rem', { lineHeight: '1.6' }],       // 15.2px — body text
  lg: ['1.05rem', { lineHeight: '1.6' }],         // 16.8px — lead paragraphs
  xl: ['1.2rem', { lineHeight: '1.4' }],          // 19.2px — card titles (Bebas)
  '2xl': ['1.6rem', { lineHeight: '1.2' }],       // 25.6px — section subtitles
  '3xl': ['2.2rem', { lineHeight: '1.1' }],       // 35.2px — section titles
  '4xl': ['3rem', { lineHeight: '1.05' }],        // 48px — hero headline
  '5xl': ['3.5rem', { lineHeight: '1' }],         // 56px — hero headline (desktop)
} as const;

// Font weight mapping
// Bebas Neue: only 400 (it's naturally bold-looking)
// Inter: 300 (body light), 400 (body), 500 (labels/UI), 600 (emphasis)
export const fontWeight = {
  light: '300',    // body text
  normal: '400',   // default, Bebas Neue headings
  medium: '500',   // UI labels, buttons, nav links
  semibold: '600', // strong emphasis in body
};

// Letter spacing
export const letterSpacing = {
  tight: '-0.01em',    // large headings
  normal: '0',         // body text
  wide: '0.05em',      // Bebas Neue headings, nav links
  wider: '0.08em',     // buttons, uppercase labels
  widest: '0.15em',    // hero headline
};

// =============================================
// SPACING
// =============================================

// Base unit: 4px. Using Tailwind default (1 = 0.25rem = 4px)
export const spacing = {
  // Component internals
  'px': '1px',
  '0.5': '0.125rem',  // 2px
  '1': '0.25rem',     // 4px
  '1.5': '0.375rem',  // 6px
  '2': '0.5rem',      // 8px — inline icon gap
  '3': '0.75rem',     // 12px — tight component padding
  '4': '1rem',        // 16px — standard component padding
  '5': '1.25rem',     // 20px
  '6': '1.5rem',      // 24px — card padding, container gutter
  '8': '2rem',        // 32px — between related elements
  '10': '2.5rem',     // 40px
  '12': '3rem',       // 48px — between section header and content
  '16': '4rem',       // 64px — mobile section padding
  '20': '5rem',       // 80px
  '24': '6rem',       // 96px — desktop section padding
  '32': '8rem',       // 128px
};

// =============================================
// BORDERS & RADII
// =============================================

export const borderRadius = {
  none: '0',
  sm: '4px',
  DEFAULT: '8px',       // cards, buttons, inputs
  md: '8px',
  lg: '12px',           // modals, large cards
  xl: '16px',           // hero overlay elements
  full: '9999px',       // pills, avatars
};

export const borderWidth = {
  DEFAULT: '1px',
  '0': '0',
  '1.5': '1.5px',      // outline buttons
  '2': '2px',          // focus rings, active borders
};

// =============================================
// SHADOWS
// =============================================

export const boxShadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 2px 8px rgba(0, 0, 0, 0.3)',
  md: '0 4px 16px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
  glow: '0 0 24px rgba(255, 255, 255, 0.08)',     // subtle white glow for hover
  'glow-lg': '0 8px 24px rgba(255, 255, 255, 0.12)', // CTA hover glow
};

// =============================================
// MOTION
// =============================================

export const transitionDuration = {
  fast: '150ms',
  DEFAULT: '250ms',
  slow: '400ms',
  slower: '600ms',   // page section fade-in
};

export const transitionTimingFunction = {
  DEFAULT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // ease-out-quad
  'ease-in': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  'ease-in-out': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
};

// =============================================
// LAYOUT
// =============================================

export const screens = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const maxWidth = {
  content: '1200px',    // main container
  prose: '680px',       // blog reading column
  narrow: '480px',      // forms, login
};

export const height = {
  nav: '72px',
  'nav-mobile': '64px',
  hero: '100vh',
  'hero-min': '600px',
};

// =============================================
// Z-INDEX
// =============================================

export const zIndex = {
  base: '0',
  raised: '10',
  nav: '50',
  sticky: '60',        // mobile CTA bar
  overlay: '90',       // mobile menu bg
  modal: '100',
  toast: '110',
};
