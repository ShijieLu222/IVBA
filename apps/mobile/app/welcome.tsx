import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { BrandLockup, PrimaryButton, Screen, SecondaryButton } from "../src/ui";
import { colors, type } from "../src/theme";

export default function WelcomeScreen() {
  const router = useRouter();
  return <Screen scroll={false} style={styles.screen}><View style={styles.brand}><BrandLockup /></View><Image source={require("../assets/artspace/dance-studio.jpg")} style={styles.image} /><View style={styles.copy}><Text style={styles.kicker}>EVENTS · SPACES · BRISTOL</Text><Text style={type.h1}>Your way into Bristol’s independent arts.</Text><Text style={styles.body}>Find an event, keep your tickets close—or sign in to manage an Artspace Lifespace venue.</Text><PrimaryButton label="Sign in" centered onPress={() => router.push("/sign-in")} /><SecondaryButton label="Create a visitor account" onPress={() => router.push("/create-account")} /><Text onPress={() => router.replace("/(tabs)")} style={styles.guest}>Browse events as a guest</Text></View></Screen>;
}
const styles = StyleSheet.create({ screen: { paddingBottom: 0 }, brand: { height: 82, paddingHorizontal: 18, justifyContent: "center", backgroundColor: colors.yellow, borderBottomWidth: 1, borderColor: colors.ink }, image: { width: "100%", flex: 0.82 }, copy: { padding: 22, gap: 13, backgroundColor: colors.paper }, kicker: { color: colors.pink, fontSize: 11, fontWeight: "900", letterSpacing: 1 }, body: { ...type.body, color: colors.muted }, guest: { minHeight: 44, paddingTop: 12, textAlign: "center", color: colors.pink, fontSize: 15, fontWeight: "800" } });
