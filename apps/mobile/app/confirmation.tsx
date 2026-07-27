import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PrimaryButton, Screen, SecondaryButton } from "../src/ui";
import { colors, type } from "../src/theme";

export default function ConfirmationScreen() {
  const router = useRouter();
  return (
    <Screen scroll={false} style={styles.screen}>
      <View style={styles.mark}><AppIcon name="checkmark" size={44} /></View>
      <Text style={styles.eyebrow}>ORDER AS-10482</Text>
      <Text style={type.h1}>You’re going to Broadmead XP</Text>
      <Text style={styles.body}>Your ticket is ready. We’ve also sent the details to ken@example.com.</Text>
      <View style={styles.details}><Text style={type.h3}>Mon 27 Jul · 19:00</Text><Text style={styles.meta}>The Island, Nelson Street, Bristol</Text><Text style={styles.meta}>1 × Standard ticket</Text></View>
      <View style={styles.actions}><PrimaryButton label="View your ticket" onPress={() => router.replace("/ticket/TKT-2817")} tone="yellow" /><SecondaryButton label="Back to Discover" onPress={() => router.replace("/(tabs)")} /></View>
    </Screen>
  );
}
const styles = StyleSheet.create({ screen: { padding: 24, justifyContent: "center", gap: 16 }, mark: { width: 76, height: 76, backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center" }, eyebrow: { color: colors.pink, fontSize: 12, fontWeight: "900", letterSpacing: 1 }, body: { ...type.body, color: colors.muted }, details: { paddingVertical: 18, gap: 7, borderTopWidth: 2, borderBottomWidth: 1, borderColor: colors.ink }, meta: { ...type.body }, actions: { marginTop: 12, gap: 12 } });
