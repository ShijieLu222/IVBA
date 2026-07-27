import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { BrandLockup, PrimaryButton, Screen, SecondaryButton } from "../src/ui";
import { colors, spacing, type } from "../src/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen scroll={false} style={styles.screen}>
      <View style={styles.brand}>
        <BrandLockup />
      </View>
      <Image
        source={require("../assets/artspace/dance-studio.jpg")}
        style={styles.image}
      />
      <View style={styles.copy}>
        <Text style={styles.kicker}>EVENTS · SPACES · BRISTOL</Text>
        <Text style={type.h1}>Your way into Bristol’s independent arts.</Text>
        <Text style={styles.body}>
          Find an event, keep your tickets close—or sign in to manage an
          Artspace Lifespace venue.
        </Text>
        <View style={styles.actions}>
          <PrimaryButton label="Sign in" onPress={() => router.push("/sign-in")} />
          <SecondaryButton
            label="Create a visitor account"
            onPress={() => router.push("/create-account")}
          />
          <Text onPress={() => router.replace("/(tabs)")} style={styles.guest}>
            Browse events as a guest
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingBottom: 0 },
  brand: {
    height: 64,
    paddingHorizontal: spacing.gutter - 4,
    justifyContent: "center",
  },
  image: { width: "100%", flex: 1, backgroundColor: colors.soft },
  copy: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg + 4,
    paddingBottom: spacing.lg,
    gap: spacing.sm + 2,
    backgroundColor: colors.paper,
  },
  kicker: { ...type.kicker, color: colors.pink },
  body: { ...type.body, color: colors.muted },
  actions: { marginTop: spacing.md, gap: spacing.sm + 2 },
  guest: {
    minHeight: 44,
    paddingTop: spacing.md,
    textAlign: "center",
    ...type.label,
    color: colors.pink,
  },
});
