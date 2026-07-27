import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { PageHeader, PrimaryButton, Screen } from "../src/ui";
import { colors } from "../src/theme";

export default function EditProfileScreen() { const router = useRouter(); return <Screen><PageHeader title="Edit profile" /><View style={styles.avatar}><Text style={styles.initials}>KM</Text></View><View style={styles.form}><Field label="Full name" value="Ken Morgan" /><Field label="Email" value="ken@example.com" /><Field label="Phone (optional)" value="+44 7700 900 123" /><Field label="Home city" value="Bristol" /><PrimaryButton label="Save changes" onPress={() => router.back()} /></View></Screen>; }
function Field({ label, value }: { label: string; value: string }) { return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput defaultValue={value} style={styles.input} /></View>; }
const styles = StyleSheet.create({ avatar: { width: 88, height: 88, marginHorizontal: 20, marginBottom: 20, borderRadius: 44, backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink, alignItems: "center", justifyContent: "center" }, initials: { fontSize: 27, fontWeight: "900" }, form: { padding: 20, gap: 16, borderTopWidth: 2, borderColor: colors.ink }, field: { gap: 6 }, label: { fontSize: 13, fontWeight: "800" }, input: { height: 52, paddingHorizontal: 14, borderWidth: 1.5, borderColor: colors.ink, backgroundColor: colors.white, fontSize: 16 } });
