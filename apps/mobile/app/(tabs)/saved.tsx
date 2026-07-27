import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { events } from "../../src/data";
import { BrandHeader, EventRow, InfoBanner, Screen } from "../../src/ui";
import { colors, spacing, type } from "../../src/theme";

export default function SavedScreen() {
  const router = useRouter();

  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />

      <View style={styles.heading}>
        <Text style={type.h1}>Saved for later</Text>
        <Text style={styles.sub}>Your shortlist of Bristol events.</Text>
      </View>

      <InfoBanner
        icon="notifications-outline"
        title="One useful reminder"
        body="We’ll tell you if a saved event is nearly sold out or changes time."
        tone="yellow"
      />

      <View style={styles.list}>
        {events.slice(0, 3).map((event) => (
          <EventRow
            key={event.id}
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs + 2,
  },
  sub: { ...type.body, color: colors.muted },
  list: { marginTop: spacing.lg },
});
