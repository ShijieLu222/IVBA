import { StyleSheet, Text, View } from "react-native";
import {
  InfoBanner,
  PageHeader,
  PrimaryButton,
  Screen,
  SecondaryButton,
} from "../src/ui";
import { colors, spacing, type } from "../src/theme";

const steps = [
  [
    "Find a characterful space",
    "Compare capacity, access, price guidance and availability.",
  ],
  [
    "Send one clear request",
    "Share dates, audience size and what you need to make.",
  ],
  [
    "Agree details together",
    "Receive a quote, ask questions and keep decisions in one place.",
  ],
] as const;

export default function ForOrganisersScreen() {
  return (
    <Screen>
      <PageHeader eyebrow="For organisers" title="Make something happen in Bristol" />

      <View style={styles.hero}>
        <Text style={styles.lede}>
          Find an independent space, agree the details and bring your event to
          life.
        </Text>
      </View>

      <View style={styles.steps}>
        {steps.map(([title, body], index) => (
          <View key={title} style={styles.step}>
            <Text style={styles.number}>{String(index + 1).padStart(2, "0")}</Text>
            <View style={{ flex: 1 }}>
              <Text style={type.h3}>{title}</Text>
              <Text style={styles.body}>{body}</Text>
            </View>
          </View>
        ))}
      </View>

      <InfoBanner
        icon="open-outline"
        title="Organiser tools live on the web"
        body="Venue requests and event management open in a secure web workspace."
        tone="yellow"
      />

      <View style={styles.action}>
        <PrimaryButton label="Open organiser workspace" />
        <SecondaryButton label="Explore spaces" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: spacing.gutter },
  lede: { fontSize: 18, lineHeight: 27, fontWeight: "400", color: colors.muted },
  steps: { marginHorizontal: spacing.gutter, marginTop: spacing.section },
  step: {
    paddingVertical: spacing.lg - 2,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  number: {
    ...type.label,
    width: 22,
    paddingTop: 2,
    color: colors.pink,
  },
  body: { ...type.meta, color: colors.muted, marginTop: 3 },
  action: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.section,
    gap: spacing.sm + 2,
  },
});
