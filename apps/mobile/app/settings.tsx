import { useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, PageHeader, Screen, SectionTitle } from "../src/ui";
import { colors, type } from "../src/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const [marketing, setMarketing] = useState(false);
  const [recommendations, setRecommendations] = useState(true);
  return <Screen><PageHeader title="Privacy & settings" /><SectionTitle title="Notifications" /><Toggle label="Event reminders" body="Important reminders for tickets you hold." value /><Toggle label="Saved event updates" body="Changes and low-ticket alerts." value={recommendations} onChange={setRecommendations} /><Toggle label="News and inspiration" body="Optional Artspace Lifespace updates." value={marketing} onChange={setMarketing} />
    <SectionTitle title="Your data" />{["Download my data", "Delete my account", "Privacy policy", "Terms of service"].map((label) => <Pressable key={label} style={styles.link}><Text style={styles.linkText}>{label}</Text><AppIcon name="chevron-forward" /></Pressable>)}
    <Pressable style={styles.signOut} onPress={() => router.replace("/welcome")}><Text style={styles.signOutText}>Sign out</Text></Pressable>
  </Screen>;
}
function Toggle({ label, body, value, onChange }: { label: string; body: string; value: boolean; onChange?: (value: boolean) => void }) { return <View style={styles.toggle}><View style={{ flex: 1 }}><Text style={styles.linkText}>{label}</Text><Text style={styles.body}>{body}</Text></View><Switch value={value} disabled={!onChange} onValueChange={onChange} trackColor={{ false: "#C8C3BB", true: colors.pink }} thumbColor={colors.white} /></View>; }
const styles = StyleSheet.create({ toggle: { minHeight: 78, marginHorizontal: 20, paddingVertical: 14, flexDirection: "row", alignItems: "center", gap: 14, borderBottomWidth: 1, borderColor: colors.ink }, link: { minHeight: 58, marginHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: colors.ink }, linkText: { fontSize: 16, fontWeight: "700" }, body: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 3 }, signOut: { margin: 20, minHeight: 52, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: colors.danger }, signOutText: { color: colors.danger, fontSize: 16, fontWeight: "800" } });
