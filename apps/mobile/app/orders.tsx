import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, InfoBanner, PageHeader, Screen, SectionTitle } from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

export default function OrdersScreen() {
  const router = useRouter();

  return (
    <Screen>
      <PageHeader title="Orders & refunds" />

      <InfoBanner
        icon="information-circle-outline"
        title="Clear, traceable payments"
        body="Each order shows payment, refund and ticket status separately."
        tone="soft"
      />

      <SectionTitle title="Recent" />

      <Pressable
        style={styles.order}
        onPress={() => router.push("/ticket/TKT-2817")}
      >
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.kicker}>PAID · 27 JUL 2026</Text>
            <Text style={type.h2}>Broadmead XP</Text>
          </View>
          <Text style={styles.amount}>£8.80</Text>
        </View>
        <View style={styles.rule} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.meta}>Order AS-10482</Text>
            <Text style={styles.meta}>1 ticket · Visa •••• 4242</Text>
          </View>
          <AppIcon name="chevron-forward" size={16} color={colors.muted} />
        </View>
      </Pressable>

      <View style={styles.help}>
        <AppIcon name="help-circle-outline" size={19} color={colors.muted} />
        <View style={{ flex: 1 }}>
          <Text style={type.h3}>Need help with an order?</Text>
          <Text style={styles.meta}>
            Refund eligibility depends on the organiser’s policy and event
            status.
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  order: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.sm,
    padding: spacing.lg - 4,
    gap: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  kicker: { ...type.kicker, color: colors.success, marginBottom: spacing.xs },
  amount: { fontSize: 18, lineHeight: 23, fontWeight: "600" },
  rule: { height: StyleSheet.hairlineWidth, backgroundColor: colors.border },
  meta: { ...type.meta, color: colors.muted },
  help: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    paddingTop: spacing.lg,
    flexDirection: "row",
    gap: spacing.md - 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
