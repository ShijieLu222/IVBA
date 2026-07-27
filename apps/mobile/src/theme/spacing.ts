export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 22,
  xl: 32,
  xxl: 44,
  /** Horizontal screen margin shared by every screen and full-bleed block. */
  gutter: 22,
  /** Vertical rhythm between major content blocks. */
  section: 34,
} as const;

/**
 * Corners stay square by design contract; `xs`/`sm` only soften raw edges.
 * `pill` is reserved for avatars and status dots, never for buttons or chips.
 */
export const radii = {
  none: 0,
  xs: 2,
  sm: 4,
  pill: 999,
} as const;
