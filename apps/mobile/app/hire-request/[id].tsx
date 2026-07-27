import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { hireRequests, spaces, type HireRequest } from "../../src/host-data";
import { StatusBadge } from "../../src/host-ui";
import {
  AppIcon,
  InfoBanner,
  PageHeader,
  PrimaryButton,
  Screen,
  SecondaryButton,
  SectionTitle,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

type DetailIcon =
  | "calendar-outline"
  | "time-outline"
  | "location-outline"
  | "people-outline";

export default function HireRequestScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const request = hireRequests.find((item) => item.id === id) ?? hireRequests[0];
  const [status, setStatus] = useState<HireRequest["status"]>(request.status);
  const space = spaces.find((item) => item.name === request.space);

  return (
    <Screen>
      <PageHeader
        title="Hire request"
        eyebrow={request.id}
        right={<StatusBadge status={status} />}
      />

      <View style={styles.hero}>
        <Text style={styles.kicker}>{request.eventType.toUpperCase()}</Text>
        <Text style={type.h1}>{request.eventName}</Text>
        <Text style={styles.organiser}>Requested by {request.organiser}</Text>
      </View>

      {status !== request.status ? (
        <InfoBanner
          icon="checkmark-circle-outline"
          title={`Request marked ${status.toLowerCase()}`}
          body="This static prototype updates the page locally; no message has been sent."
          tone="pink"
        />
      ) : null}

      <View style={styles.details}>
        <Detail icon="calendar-outline" label="Date" value={request.date} />
        <Detail icon="time-outline" label="Hire time" value={request.time} />
        <Detail icon="location-outline" label="Space" value={request.space} />
        <Detail
          icon="people-outline"
          label="Expected guests"
          value={`${request.guests} people`}
        />
      </View>

      <SectionTitle title="Organiser note" />
      <View style={styles.note}>
        <Text style={styles.noteText}>{request.note}</Text>
      </View>

      <SectionTitle title="Space check" />
      <Pressable
        style={styles.space}
        onPress={() => space && router.push(`/host-space/${space.id}`)}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>REQUESTED SPACE</Text>
          <Text style={type.h3}>{request.space}</Text>
          <Text style={styles.spaceMeta}>
            {space?.area} · up to {space?.standing} standing
          </Text>
        </View>
        <AppIcon name="chevron-forward" size={16} color={colors.muted} />
      </Pressable>

      <InfoBanner
        icon="calendar-outline"
        title="Calendar conflict check"
        body="No conflicting booking found. Setup buffer begins 45 minutes before this hire."
        tone="yellow"
      />

      <View style={styles.actions}>
        <PrimaryButton
          label={status === "Accepted" ? "Accepted" : "Accept request"}
          disabled={status === "Accepted"}
          onPress={() => setStatus("Accepted")}
        />
        <SecondaryButton
          label="Request changes"
          icon="refresh-outline"
          onPress={() => setStatus("Changes requested")}
        />
        <Pressable
          style={styles.decline}
          onPress={() => setStatus("Declined")}
        >
          <Text style={styles.declineText}>Decline request</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: DetailIcon;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.detail}>
      <AppIcon name={icon} size={17} color={colors.muted} />
      <View style={{ flex: 1 }}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    marginHorizontal: spacing.gutter,
    paddingBottom: spacing.lg,
    gap: spacing.xs + 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  kicker: { ...type.kicker, color: colors.pink },
  organiser: { ...type.meta, color: colors.muted },
  details: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  detail: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md - 2 },
  detailLabel: { ...type.kicker, fontSize: 9.5, color: colors.muted },
  detailValue: { ...type.body, fontSize: 15, marginTop: 2 },
  note: {
    marginHorizontal: spacing.gutter,
    padding: spacing.md,
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
    borderLeftWidth: 3,
    borderLeftColor: colors.pink,
  },
  noteText: { ...type.body, fontSize: 14 },
  space: {
    marginHorizontal: spacing.gutter,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  spaceMeta: { ...type.meta, fontSize: 12.5, color: colors.muted, marginTop: 2 },
  actions: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.sm + 2,
  },
  decline: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  declineText: { ...type.label, color: colors.danger },
});
