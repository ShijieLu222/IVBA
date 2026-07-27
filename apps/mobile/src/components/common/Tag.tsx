import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, type } from "../../theme";

type TagProps = {
  label: string;
  tone?: "neutral" | "yellow" | "pink" | "ink";
};

const tones = {
  neutral: { backgroundColor: colors.soft, color: colors.muted },
  yellow: { backgroundColor: colors.yellow, color: colors.ink },
  pink: { backgroundColor: colors.pinkWash, color: colors.pink },
  ink: { backgroundColor: colors.ink, color: colors.white },
} as const;

export function Tag({ label, tone = "neutral" }: TagProps) {
  const { backgroundColor, color } = tones[tone];

  return (
    <View style={[styles.tag, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.xs,
  },
  label: { ...type.kicker, fontSize: 9.5, letterSpacing: 1.1 },
});
