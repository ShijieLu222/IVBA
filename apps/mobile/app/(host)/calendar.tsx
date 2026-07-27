import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { partialDays, spaces, unavailableDays } from "../../src/host-data";
import { HostHeader } from "../../src/host-ui";
import { AppIcon, PrimaryButton, Screen } from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
const days = Array.from({ length: 42 }, (_, index) =>
  index < 5 || index > 35 ? null : index - 4,
);
const baseSlots = [
  "09:00–11:00",
  "11:30–13:30",
  "14:00–16:00",
  "16:30–18:30",
  "19:00–22:00",
];

export default function AvailabilityScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(6);
  const [spaceId, setSpaceId] = useState(spaces[0].id);
  const [blocked, setBlocked] = useState<string[]>([]);
  const selectedSpace = spaces.find((space) => space.id === spaceId)!;

  const unavailableSlots = useMemo(
    () =>
      selectedDay % 2 === 0
        ? ["11:30–13:30", "19:00–22:00"]
        : ["14:00–16:00"],
    [selectedDay],
  );

  const toggleBlock = (slot: string) =>
    setBlocked((current) =>
      current.includes(slot)
        ? current.filter((item) => item !== slot)
        : [...current, slot],
    );

  return (
    <Screen>
      <HostHeader title="Availability" />

      <View style={styles.toolbar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>SPACE</Text>
          <Text style={type.h3}>{selectedSpace.name}</Text>
        </View>
        <Pressable
          onPress={() =>
            setSpaceId(spaceId === spaces[0].id ? spaces[1].id : spaces[0].id)
          }
          style={styles.change}
        >
          <Text style={styles.changeText}>Change</Text>
          <AppIcon name="refresh-outline" size={15} color={colors.pink} />
        </Pressable>
      </View>

      <View style={styles.monthTop}>
        <Pressable accessibilityLabel="Previous month" style={styles.arrow}>
          <AppIcon name="arrow-back" size={18} />
        </Pressable>
        <View style={{ alignItems: "center" }}>
          <Text style={type.h2}>August 2026</Text>
          <Text style={styles.timezone}>Europe/London</Text>
        </View>
        <Pressable accessibilityLabel="Next month" style={styles.arrow}>
          <AppIcon name="arrow-forward" size={18} />
        </Pressable>
      </View>

      <View style={styles.calendar}>
        <View style={styles.week}>
          {weekdays.map((day, index) => (
            <Text key={`${day}-${index}`} style={styles.weekday}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.grid}>
          {days.map((day, index) => {
            const unavailable = day !== null && unavailableDays.includes(day);
            const partial = day !== null && partialDays.includes(day);
            const selected = day === selectedDay;
            return (
              <Pressable
                key={index}
                disabled={day === null || unavailable}
                onPress={() => day && setSelectedDay(day)}
                style={styles.dayCell}
              >
                <View
                  style={[
                    styles.dayInner,
                    partial && styles.dayPartial,
                    selected && styles.daySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      unavailable && styles.dayTextUnavailable,
                      selected && styles.dayTextSelected,
                    ]}
                  >
                    {day ?? ""}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.legend}>
        <Legend color={colors.pink} label="Selected" />
        <Legend color={colors.yellow} label="Partly booked" />
        <Legend color={colors.border} label="Unavailable" />
      </View>

      <View style={styles.dayHeading}>
        <View style={{ flex: 1 }}>
          <Text style={styles.kicker}>SELECTED DAY</Text>
          <Text style={type.h2}>Thursday {selectedDay} August</Text>
        </View>
        <Text style={styles.openCount}>
          {baseSlots.length - unavailableSlots.length - blocked.length} open
        </Text>
      </View>

      <View style={styles.slots}>
        {baseSlots.map((slot) => {
          const booked = unavailableSlots.includes(slot);
          const isBlocked = blocked.includes(slot);
          return (
            <Pressable
              key={slot}
              disabled={booked}
              onPress={() => toggleBlock(slot)}
              style={styles.slot}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.slotTime, booked && styles.mutedText]}>
                  {slot}
                </Text>
                <Text
                  style={[
                    styles.slotStatus,
                    (booked || isBlocked) && styles.mutedText,
                  ]}
                >
                  {booked
                    ? "Booked · unavailable"
                    : isBlocked
                      ? "Blocked by venue"
                      : "Available to hire"}
                </Text>
              </View>
              {booked ? (
                <AppIcon
                  name="lock-closed-outline"
                  size={16}
                  color={colors.muted}
                />
              ) : (
                <View style={[styles.checkbox, isBlocked && styles.checkboxActive]}>
                  {isBlocked ? (
                    <AppIcon name="checkmark" size={13} color={colors.white} />
                  ) : null}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.hint}>
        <AppIcon
          name="information-circle-outline"
          size={16}
          color={colors.muted}
        />
        <Text style={styles.hintText}>
          Tap an available time to block or reopen it. Existing bookings stay
          locked here.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="View space details"
          onPress={() => router.push(`/host-space/${spaceId}`)}
        />
      </View>
    </Screen>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  kicker: { ...type.kicker, color: colors.pink, marginBottom: 2 },
  change: {
    minHeight: 40,
    flexDirection: "row",
    gap: spacing.xs + 2,
    alignItems: "center",
  },
  changeText: { ...type.label, color: colors.pink },
  monthTop: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  timezone: { ...type.meta, fontSize: 11.5, color: colors.muted, marginTop: 2 },
  calendar: { paddingHorizontal: spacing.gutter },
  week: { flexDirection: "row", paddingBottom: spacing.sm },
  weekday: {
    ...type.kicker,
    width: "14.285%",
    textAlign: "center",
    color: colors.muted,
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  dayCell: {
    width: "14.285%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayInner: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
  },
  dayPartial: { backgroundColor: colors.yellowWash },
  daySelected: { backgroundColor: colors.pink },
  dayText: { fontSize: 14, fontWeight: "500" },
  dayTextUnavailable: { color: "#BFBAB3" },
  dayTextSelected: { color: colors.white, fontWeight: "600" },
  legend: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: spacing.xs + 1 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendText: { ...type.meta, fontSize: 11, color: colors.muted },
  dayHeading: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.section,
    paddingBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  openCount: { ...type.label, color: colors.success },
  slots: { marginHorizontal: spacing.gutter },
  slot: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  slotTime: { ...type.body, fontSize: 15 },
  slotStatus: { ...type.meta, fontSize: 12, color: colors.success, marginTop: 2 },
  mutedText: { color: colors.muted },
  checkbox: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  checkboxActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  hint: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.lg,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.sm + 2,
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  hintText: { ...type.meta, flex: 1, fontSize: 12, color: colors.muted },
  actions: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
});
