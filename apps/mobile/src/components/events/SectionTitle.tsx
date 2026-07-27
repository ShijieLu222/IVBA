import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, type } from "../../theme";

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
        <Pressable onPress={onAction}>
          <Text style={styles.actionText}>{action}  →</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
  },
  actionText: { color: colors.pink, fontSize: 14, fontWeight: "800" },
});
