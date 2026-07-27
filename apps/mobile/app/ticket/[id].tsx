import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  InfoBanner,
  PageHeader,
  Screen,
  SecondaryButton,
  Tag,
} from "../../src/ui";
import { colors, radii, spacing, type } from "../../src/theme";

export default function TicketScreen() {
  const router = useRouter();

  return (
    <Screen>
      <PageHeader title="Your ticket" right={<Tag label="Valid" tone="yellow" />} />

      <View style={styles.card}>
        <View style={styles.top}>
          <Text style={styles.kicker}>MON 27 JUL · 19:00</Text>
          <Text style={type.h1}>Broadmead XP</Text>
          <Text style={styles.meta}>The Island · Standard admission</Text>
        </View>
        <View style={styles.cutLine}>
          <View style={styles.notch} />
          <View style={styles.dash} />
          <View style={styles.notch} />
        </View>
        <View style={styles.qr}>
          <Image
            source={require("../../assets/artspace/ticket-qr.png")}
            style={styles.qrImage}
          />
          <Text style={styles.ticketId}>TKT-2817</Text>
          <Text style={styles.hint}>Show this code at the entrance</Text>
        </View>
      </View>

      <InfoBanner
        icon="cloud-done-outline"
        title="Saved on this device"
        body="This ticket remains available without an internet connection."
        tone="soft"
      />

      <View style={styles.actions}>
        <SecondaryButton label="Add to wallet" icon="wallet-outline" />
        <SecondaryButton
          label="View order details"
          onPress={() => router.push("/orders")}
          icon="receipt-outline"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.gutter,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  top: { padding: spacing.lg, gap: spacing.xs + 2 },
  kicker: { ...type.kicker, color: colors.pink },
  meta: { ...type.meta, color: colors.muted },
  cutLine: { height: 20, flexDirection: "row", alignItems: "center" },
  notch: {
    width: 20,
    height: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.paper,
  },
  dash: {
    flex: 1,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
  },
  qr: { paddingVertical: spacing.xl, alignItems: "center", gap: spacing.sm },
  qrImage: { width: 188, height: 188 },
  ticketId: {
    ...type.label,
    marginTop: spacing.sm,
    letterSpacing: 2,
  },
  hint: { ...type.meta, fontSize: 12, color: colors.muted },
  actions: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.sm + 2,
  },
});
