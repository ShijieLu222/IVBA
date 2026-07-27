import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { events } from "../src/data";
import {
  InfoBanner,
  PageHeader,
  PrimaryButton,
  Screen,
  Stepper,
} from "../src/ui";
import { colors, spacing, type } from "../src/theme";

const ticketTypes = [
  {
    id: "standard",
    name: "Standard",
    description: "General admission",
    price: 8,
  },
  {
    id: "supporter",
    name: "Supporter",
    description: "Includes a £6 donation to Artspace Lifespace",
    price: 14,
  },
] as const;

export default function TicketSelectScreen() {
  const { event: id } = useLocalSearchParams<{ event: string }>();
  const router = useRouter();
  const event = events.find((item) => item.id === id) ?? events[0]!;
  const [quantities, setQuantities] = useState<Record<string, number>>({
    standard: 1,
    supporter: 0,
  });

  const total = ticketTypes.reduce(
    (sum, ticket) => sum + (quantities[ticket.id] ?? 0) * ticket.price,
    0,
  );

  return (
    <Screen>
      <PageHeader eyebrow="Step 1 of 2" title="Choose tickets" />

      <View style={styles.summary}>
        <Text style={type.h3}>{event.title}</Text>
        <Text style={styles.meta}>{event.venue}</Text>
        <Text style={styles.meta}>
          {event.date} · {event.time}
        </Text>
      </View>

      <InfoBanner
        icon="time-outline"
        title="Tickets held for 10 minutes"
        body="Your place is reserved while you complete checkout."
        tone="yellow"
      />

      <View style={styles.list}>
        {ticketTypes.map((ticket) => (
          <View key={ticket.id} style={styles.ticketType}>
            <View style={styles.typeCopy}>
              <Text style={type.h3}>{ticket.name}</Text>
              <Text style={styles.description}>{ticket.description}</Text>
              <Text style={styles.price}>£{ticket.price.toFixed(2)}</Text>
            </View>
            <Stepper
              value={quantities[ticket.id] ?? 0}
              label={`${ticket.name} tickets`}
              onChange={(value) =>
                setQuantities((current) => ({ ...current, [ticket.id]: value }))
              }
            />
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>£{total.toFixed(2)}</Text>
        </View>
        <PrimaryButton
          label="Continue to checkout"
          onPress={() =>
            router.push(`/checkout?event=${event.id}&total=${total}`)
          }
          disabled={total === 0}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.lg,
    gap: 3,
  },
  meta: { ...type.meta, color: colors.muted },
  list: { marginHorizontal: spacing.gutter, marginTop: spacing.lg },
  ticketType: {
    paddingVertical: spacing.lg - 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  typeCopy: { flex: 1, gap: 3 },
  description: { ...type.meta, color: colors.muted },
  price: { fontSize: 15, fontWeight: "600", marginTop: 2 },
  footer: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  total: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  totalLabel: { ...type.label, color: colors.muted },
  totalPrice: { fontSize: 22, lineHeight: 27, fontWeight: "600" },
});
