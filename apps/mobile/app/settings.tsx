import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, Screen, SectionTitle } from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

const dataLinks = [
  "Download my data",
  "Delete my account",
  "Privacy policy",
  "Terms of service",
];

export default function SettingsScreen() {
  const router = useRouter();
  const [marketing, setMarketing] = useState(false);
  const [recommendations, setRecommendations] = useState(true);

  return (
    <Screen>
      <PageHeader title="Privacy & settings" />

      <SectionTitle title="Notifications" />
      <Toggle
        label="Event reminders"
        body="Important reminders for tickets you hold."
        value
      />
      <Toggle
        label="Saved event updates"
        body="Changes and low-ticket alerts."
        value={recommendations}
        onChange={setRecommendations}
      />
      <Toggle
        label="News and inspiration"
        body="Optional Artspace Lifespace updates."
        value={marketing}
        onChange={setMarketing}
      />

      <SectionTitle title="Your data" />
      {dataLinks.map((label) => (
        <Pressable key={label} style={styles.link}>
          <Text style={styles.linkText}>{label}</Text>
          <AppIcon name="chevron-forward" size={16} color={colors.muted} />
        </Pressable>
      ))}

      <Pressable
        style={styles.signOut}
        onPress={() => router.replace("/welcome")}
      >
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </Screen>
  );
}

function Toggle({
  label,
  body,
  value,
  onChange,
}: {
  label: string;
  body: string;
  value: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <View style={styles.toggle}>
      <View style={{ flex: 1 }}>
        <Text style={styles.linkText}>{label}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
      <Switch
        value={value}
        disabled={!onChange}
        onValueChange={onChange}
        trackColor={{ false: "#D8D3CB", true: colors.pink }}
        thumbColor={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toggle: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  link: {
    minHeight: 54,
    marginHorizontal: spacing.gutter,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  linkText: { ...type.body, fontSize: 15 },
  body: { ...type.meta, fontSize: 12.5, color: colors.muted, marginTop: 2 },
  signOut: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.danger,
    borderRadius: radii.xs,
  },
  signOutText: { fontSize: 15, fontWeight: "600", color: colors.danger },
});
