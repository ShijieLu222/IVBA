import { VenueStatuses } from "@ivba/domain";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>IVBA scaffold</Text>
      <Text style={styles.title}>React Native + Expo</Text>
      <Text style={styles.body}>
        Mobile app shell is ready. First product slice will reuse the same OpenAPI
        contract as the website.
      </Text>
      <Text style={styles.meta}>Venue statuses: {VenueStatuses.join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    paddingHorizontal: 24,
    paddingTop: 72,
    gap: 12,
  },
  kicker: {
    color: "#78716C",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontSize: 12,
  },
  title: {
    color: "#1C1917",
    fontSize: 32,
    fontWeight: "700",
  },
  body: {
    color: "#44403C",
    fontSize: 16,
    lineHeight: 24,
  },
  meta: {
    marginTop: 16,
    color: "#0F766E",
    fontSize: 13,
  },
});
