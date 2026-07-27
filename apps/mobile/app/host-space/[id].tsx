import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { spaces } from "../../src/host-data";
import {
  AppIcon,
  InfoBanner,
  MetaRow,
  PageHeader,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SectionTitle,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

export default function HostSpaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const space = spaces.find((item) => item.id === id) ?? spaces[0];

  return (
    <Screen>
      <PageHeader
        title={space.name}
        eyebrow="Hireable space"
        right={
          <Pressable accessibilityLabel="Edit space" style={styles.edit}>
            <AppIcon name="pencil-outline" size={17} />
          </Pressable>
        }
      />

      <Image source={space.image} style={styles.hero} />

      <View style={styles.intro}>
        <Text style={styles.summary}>{space.summary}</Text>
        <Text style={styles.price}>{space.price}</Text>
      </View>

      <View style={styles.metrics}>
        <Metric value={space.area} label="Floor area" />
        <Metric value={`${space.standing}`} label="Standing" />
        <Metric value={`${space.seated}`} label="Seated" />
      </View>

      <View style={styles.meta}>
        <MetaRow icon="accessibility-outline">{space.access}</MetaRow>
        <MetaRow icon="location-outline">First floor · The Island</MetaRow>
        <MetaRow icon="time-outline">Minimum booking: 2 hours</MetaRow>
      </View>

      <SectionTitle title="What’s included" />
      <View style={styles.features}>
        {space.features.map((feature) => (
          <View key={feature} style={styles.feature}>
            <AppIcon name="checkmark" size={14} color={colors.pink} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title="Hire notes" />
      <InfoBanner
        icon="information-circle-outline"
        title="Before accepting a request"
        body="Allow at least 30 minutes between bookings. Amplified events after 22:00 need venue manager approval."
        tone="soft"
      />

      <View style={styles.actions}>
        <PrimaryButton
          label="Manage availability"
          onPress={() => router.push("/(host)/calendar")}
        />
        <SecondaryButton label="Edit space information" icon="pencil-outline" />
      </View>
    </Screen>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  edit: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
  },
  hero: { width: "100%", height: 230, backgroundColor: colors.soft },
  intro: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  summary: { ...type.body, color: colors.muted },
  price: { fontSize: 16, lineHeight: 21, fontWeight: "600" },
  metrics: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    flexDirection: "row",
    gap: spacing.sm,
  },
  metric: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md - 2,
    gap: spacing.xs,
    borderRadius: radii.xs,
    backgroundColor: colors.yellowWash,
  },
  metricValue: { fontSize: 17, lineHeight: 22, fontWeight: "600" },
  metricLabel: { ...type.meta, fontSize: 11.5, color: colors.muted },
  meta: { paddingHorizontal: spacing.gutter, paddingTop: spacing.lg },
  features: {
    paddingHorizontal: spacing.gutter,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  feature: {
    width: "50%",
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  featureText: { ...type.meta, flex: 1, fontSize: 12.5 },
  actions: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.sm + 2,
  },
});
