/** Artspace Lifespace brand palette — Living Programme mobile system */
export const colors = {
  yellow: "#FFE800",
  pink: "#DB2F67",
  ink: "#111111",
  paper: "#FFFDF8",
  white: "#FFFFFF",
  muted: "#6F6A64",
  line: "#171717",
  soft: "#F3EFE8",
  teal: "#18C9C1",
  success: "#137B55",
  danger: "#B42318",

  /** Quiet separators — structure without heavy rules. */
  hairline: "rgba(17, 17, 17, 0.10)",
  border: "rgba(17, 17, 17, 0.16)",
  /** Tinted washes so brand colour can accent instead of flood. */
  yellowWash: "#FFF9CC",
  pinkWash: "#FBEDF2",
} as const;

export type ColorName = keyof typeof colors;
