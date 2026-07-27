import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";

type SectionTitleProps = {
  title: string;
  action?: string;
  onAction?: () => void;
};

export function SectionTitle({ title, action, onAction }: SectionTitleProps) {
  return (
    <View style={styles.sectionTitle}>
      <Text style={type.h2}>{title}</Text>
      {action ? (
        <Pressable
          accessibilityRole="button"
          onPress={onAction}
          style={({ pressed }) => [
            styles.action,
            pressed && globalStyles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  action: { minHeight: 28, justifyContent: "center" },
  actionText: { ...type.label, color: colors.pink },
});
