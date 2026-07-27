import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, PrimaryButton, Screen, SectionTitle } from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

const groups = [
  ["When", ["Today", "This week", "This weekend", "Pick a date"]],
  ["Price", ["Free", "Under £10", "Under £20"]],
  ["Category", ["Dance", "Live music", "Visual arts", "Talks & workshops"]],
  [
    "Access",
    ["Step-free", "BSL interpreted", "Quiet space", "Relaxed performance"],
  ],
] as const;

export default function FiltersScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([
    "This week",
    "Under £20",
    "Step-free",
  ]);

  const toggle = (item: string) =>
    setSelected((values) =>
      values.includes(item)
        ? values.filter((value) => value !== item)
        : [...values, item],
    );

  return (
    <Screen>
      <PageHeader
        title="Filters"
        right={
          <Pressable onPress={() => setSelected([])} style={styles.clearWrap}>
            <Text style={styles.clear}>Clear</Text>
          </Pressable>
        }
      />

      {groups.map(([title, items]) => (
        <View key={title}>
          <SectionTitle title={title} />
          {items.map((item) => {
            const active = selected.includes(item);
            return (
              <Pressable
                key={item}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: active }}
                onPress={() => toggle(item)}
                style={styles.option}
              >
                <Text style={styles.optionText}>{item}</Text>
                <View style={[styles.check, active && styles.checkActive]}>
                  {active ? (
                    <AppIcon name="checkmark" size={14} color={colors.white} />
                  ) : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}

      <View style={styles.footer}>
        <PrimaryButton label="Show 12 events" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  clearWrap: { minHeight: 44, justifyContent: "center" },
  clear: { ...type.label, color: colors.pink },
  option: {
    minHeight: 50,
    marginHorizontal: spacing.gutter,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  optionText: { ...type.body, fontSize: 15 },
  check: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  checkActive: { backgroundColor: colors.pink, borderColor: colors.pink },
  footer: { padding: spacing.gutter, paddingTop: spacing.section },
});
