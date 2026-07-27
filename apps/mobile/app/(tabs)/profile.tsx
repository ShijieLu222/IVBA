import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { AppIcon, BrandHeader, InfoBanner, Screen } from "../../src/ui";
import { colors, type } from "../../src/theme";

const links = [
  ["Orders & refunds", "receipt-outline", "/orders"],
  ["Notifications", "notifications-outline", "/notifications"],
  ["Accessibility", "accessibility-outline", "/accessibility"],
  ["Privacy & settings", "settings-outline", "/settings"],
] as const;

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <Screen>
      <BrandHeader onNotifications={() => router.push("/notifications")} />
      <View style={styles.profile}>
        <View style={styles.avatar}><Text style={styles.initials}>KM</Text></View>
        <View style={{ flex: 1 }}><Text style={type.h2}>Ken Morgan</Text><Text style={styles.email}>ken@example.com</Text></View>
        <Pressable onPress={() => router.push("/edit-profile")} style={styles.edit}><AppIcon name="pencil-outline" /></Pressable>
      </View>
      <InfoBanner icon="heart-outline" title="Creativity stays local" body="Ticket and hire income supports independent venues and artists across Bristol." tone="pink" />
      <View style={styles.links}>
        {links.map(([label, icon, href]) => <Pressable key={label} onPress={() => router.push(href)} style={styles.link}><View style={styles.linkLeft}><AppIcon name={icon} /><Text style={styles.linkText}>{label}</Text></View><AppIcon name="chevron-forward" /></Pressable>)}
      </View>
      <Pressable style={styles.organiser} onPress={() => router.push("/for-organisers")}><Text style={styles.organiserKicker}>FOR ORGANISERS</Text><Text style={type.h3}>Manage events or find a space</Text><Text style={styles.organiserBody}>Professional tools continue on the web.</Text><AppIcon name="arrow-forward" color={colors.pink} /></Pressable>
    </Screen>
  );
}
const styles = StyleSheet.create({
  profile: { padding: 20, flexDirection: "row", alignItems: "center", gap: 14 }, avatar: { width: 62, height: 62, borderRadius: 31, alignItems: "center", justifyContent: "center", backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink }, initials: { fontSize: 20, fontWeight: "900" }, email: { color: colors.muted, marginTop: 4 }, edit: { width: 44, height: 44, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.ink },
  links: { margin: 20, borderTopWidth: 2, borderColor: colors.ink }, link: { minHeight: 62, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomWidth: 1, borderColor: colors.ink }, linkLeft: { flexDirection: "row", alignItems: "center", gap: 12 }, linkText: { fontSize: 16, fontWeight: "700" },
  organiser: { margin: 20, padding: 18, gap: 5, backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink }, organiserKicker: { color: colors.pink, fontSize: 11, letterSpacing: 1, fontWeight: "900" }, organiserBody: { color: colors.muted, fontSize: 13, marginBottom: 8 },
});
