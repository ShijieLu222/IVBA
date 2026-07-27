import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PrimaryButton, Screen, SecondaryButton } from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

export default function ConfirmationScreen() {
  const router = useRouter();

  return (
    <Screen scroll={false} style={styles.screen}>
      <View style={styles.mark}>
        <AppIcon name="checkmark" size={24} color={colors.ink} />
      </View>
      <Text style={styles.eyebrow}>ORDER AS-10482</Text>
      <Text style={type.h1}>You’re going to Broadmead XP</Text>
      <Text style={styles.body}>
        Your ticket is ready. We’ve also sent the details to ken@example.com.
      </Text>

      <View style={styles.details}>
        <Text style={type.h3}>Mon 27 Jul · 19:00</Text>
        <Text style={styles.meta}>The Island, Nelson Street, Bristol</Text>
        <Text style={styles.meta}>1 × Standard ticket</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="View your ticket"
          onPress={() => router.replace("/ticket/TKT-2817")}
        />
        <SecondaryButton
          label="Back to Discover"
          onPress={() => router.replace("/(tabs)")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: spacing.gutter,
    justifyContent: "center",
    gap: spacing.md,
  },
  mark: {
    width: 48,
    height: 48,
    marginBottom: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: { ...type.kicker, color: colors.pink },
  body: { ...type.body, color: colors.muted },
  details: {
    marginTop: spacing.sm,
    paddingVertical: spacing.lg,
    gap: spacing.xs + 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  meta: { ...type.meta, color: colors.muted },
  actions: { marginTop: spacing.md, gap: spacing.sm + 2 },
});
