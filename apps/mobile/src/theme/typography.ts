/**
 * Editorial type scale. Weights stay under 700 so hierarchy comes from size and
 * spacing rather than everything shouting at once.
 */
export const type = {
  display: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700" as const,
    letterSpacing: -1.4,
  },
  h1: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "700" as const,
    letterSpacing: -0.7,
  },
  h2: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "700" as const,
    letterSpacing: -0.35,
  },
  h3: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600" as const,
    letterSpacing: -0.1,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: "400" as const,
  },
  meta: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500" as const,
  },
  /** Uppercase micro-label used above headings and on tags. */
  kicker: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700" as const,
    letterSpacing: 1.6,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600" as const,
    letterSpacing: 0.2,
  },
} as const;
