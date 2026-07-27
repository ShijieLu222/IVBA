import { StyleSheet } from "react-native";

import { colors } from "./colors";
import { spacing } from "./spacing";
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
    paddingHorizontal: spacing.lg - 4,
  },
  hairline: {
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  rule: {
    borderTopWidth: 1,
    borderColor: colors.ink,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.45,
  },
  touchTarget: {
    minWidth: 44,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: {
    color: colors.pink,
    textTransform: "uppercase",
    fontSize: 13,
    letterSpacing: 1.2,
    fontWeight: "800",
    marginBottom: 5,
  },
  mutedBody: {
    ...type.body,
    color: colors.muted,
  },
});
