import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";

type SectionProps = PropsWithChildren<{
  eyebrow?: string;
  title?: string;
  body?: string;
  /** Vertical space between children. */
  gap?: number;
  /** Removes the top rhythm when the section follows a header. */
  flush?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

/** Standard content block: shared gutter, rhythm and optional heading stack. */
export function Section({
  eyebrow,
  title,
  body,
  gap = spacing.md,
  flush = false,
  style,
  children,
}: SectionProps) {
  const hasHeading = Boolean(eyebrow || title || body);

  return (
    <View
      style={[styles.section, flush && styles.flush, { gap }, style]}
    >
      {hasHeading ? (
        <View style={styles.heading}>
          {eyebrow ? (
            <Text style={globalStyles.eyebrow}>{eyebrow}</Text>
          ) : null}
          {title ? <Text style={type.h2}>{title}</Text> : null}
          {body ? <Text style={styles.body}>{body}</Text> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
  flush: { paddingTop: 0 },
  heading: { gap: spacing.xs + 2 },
  body: { ...type.body, color: colors.muted },
});
