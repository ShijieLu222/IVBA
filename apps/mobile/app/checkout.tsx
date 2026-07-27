import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Checkbox,
  InfoBanner,
  PageHeader,
  PrimaryButton,
  Screen,
  TextField,
} from "../src/ui";
import { colors, spacing, type } from "../src/theme";

const BOOKING_FEE = 0.8;

export default function CheckoutScreen() {
  const router = useRouter();
  const { total = "8" } = useLocalSearchParams<{ total: string }>();
  const [agreed, setAgreed] = useState(true);
  const tickets = Number(total);
  const grandTotal = tickets + BOOKING_FEE;

  return (
    <Screen>
      <PageHeader eyebrow="Step 2 of 2" title="Checkout" />

      <View style={styles.section}>
        <Text style={type.h2}>Your details</Text>
        <TextField
          label="Email"
          value="ken@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField label="Full name" value="Ken Morgan" />
      </View>

      <View style={styles.section}>
        <Text style={type.h2}>Pay securely</Text>
        <TextField label="Card number" value="4242 4242 4242 4242" />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <TextField label="Expiry" value="08/29" />
          </View>
          <View style={{ flex: 1 }}>
            <TextField label="CVC" value="123" secure />
          </View>
        </View>
      </View>

      <InfoBanner
        icon="lock-closed-outline"
        title="Powered by Stripe"
        body="Card details are encrypted and never stored by Artspace Lifespace."
        tone="soft"
      />

      <View style={styles.section}>
        <View style={styles.costs}>
          <View style={styles.cost}>
            <Text style={styles.costLabel}>Tickets</Text>
            <Text style={styles.costValue}>£{tickets.toFixed(2)}</Text>
          </View>
          <View style={styles.cost}>
            <Text style={styles.costLabel}>Booking fee</Text>
            <Text style={styles.costValue}>£{BOOKING_FEE.toFixed(2)}</Text>
          </View>
        </View>
        <View style={styles.grand}>
          <Text style={styles.grandLabel}>Total</Text>
          <Text style={styles.grandValue}>£{grandTotal.toFixed(2)}</Text>
        </View>
        <Checkbox
          checked={agreed}
          onToggle={() => setAgreed(!agreed)}
          label="I agree to the event refund policy and platform terms."
        />
        <PrimaryButton
          label={`Pay £${grandTotal.toFixed(2)}`}
          disabled={!agreed}
          onPress={() => router.replace("/confirmation")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.section,
    gap: spacing.md,
  },
  row: { flexDirection: "row", gap: spacing.md - 2 },
  costs: { gap: spacing.sm },
  cost: { flexDirection: "row", justifyContent: "space-between" },
  costLabel: { ...type.body, fontSize: 14, color: colors.muted },
  costValue: { ...type.body, fontSize: 14 },
  grand: {
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  grandLabel: { ...type.label, color: colors.muted },
  grandValue: { fontSize: 22, lineHeight: 27, fontWeight: "600" },
});
