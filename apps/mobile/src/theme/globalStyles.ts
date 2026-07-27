import { StyleSheet } from "react-native";

import { colors } from "./colors";
import { radii, spacing } from "./spacing";
import { type } from "./typography";

/** Shared layout primitives used across screens and components. */
export const globalStyles = StyleSheet.create({
  appCanvas: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: colors.paper,
  },
  screenPadding: {
    paddingHorizontal: spacing.gutter,
  },
  /** Default separator: present enough to divide, quiet enough to ignore. */
  hairline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  rule: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  /** Reserved for the few places that need a deliberate structural edge. */
  inkRule: {
    borderTopWidth: 1,
    borderColor: colors.ink,
  },
  surface: {
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
  },
  pressed: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
  touchTarget: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    ...type.kicker,
    color: colors.pink,
    textTransform: "uppercase",
  },
  mutedBody: {
    ...type.body,
    color: colors.muted,
  },
  metaText: {
    ...type.meta,
    color: colors.muted,
  },
});
