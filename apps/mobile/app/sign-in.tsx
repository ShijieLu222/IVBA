import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { demoAccounts, detectAccountRole } from "../src/auth";
import { BrandLockup, InfoBanner, PageHeader, PrimaryButton, Screen, SecondaryButton } from "../src/ui";
import { colors, type } from "../src/theme";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const signIn = () => {
    if (!email.trim() || !password) { setError("Enter your email and password to continue."); return; }
    setError(""); setChecking(true);
    setTimeout(() => {
      const role = detectAccountRole(email);
      setChecking(false);
      router.replace(role === "host" ? "/(host)" : "/(tabs)");
    }, 700);
  };

  const useDemo = (role: "audience" | "host") => {
    const account = demoAccounts[role];
    setEmail(account.email); setPassword(account.password); setError("");
  };

  return <Screen><PageHeader title="Sign in" right={<BrandLockup compact />} />
    <View style={styles.intro}><Text style={type.h3}>One account, the right workspace.</Text><Text style={styles.body}>We’ll recognise your account and open event discovery or your venue workspace automatically.</Text></View>
    <View style={styles.form}>
      <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
      <Field label="Password" value={password} onChange={setPassword} placeholder="Your password" secure />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable><Text style={styles.forgot}>Forgot password?</Text></Pressable>
      <PrimaryButton label={checking ? "Checking your workspace…" : "Sign in"} onPress={signIn} icon={checking ? "refresh-outline" : "arrow-forward"} disabled={checking} />
      {checking ? <View style={styles.checking}><ActivityIndicator color={colors.pink} /><Text style={styles.checkingText}>Checking account and organisation access</Text></View> : null}
    </View>
    <View style={styles.demo}>
      <Text style={styles.demoKicker}>STATIC PROTOTYPE</Text><Text style={type.h3}>Preview both account types</Text>
      <Text style={styles.demoBody}>Choose a demo, then tap Sign in. This shortcut is only for the prototype.</Text>
      <SecondaryButton label="Use visitor demo" icon="ticket-outline" onPress={() => useDemo("audience")} />
      <SecondaryButton label="Use Venue Host demo" icon="home-outline" onPress={() => useDemo("host")} />
    </View>
    <InfoBanner icon="lock-closed-outline" title="Role detection" body="In production, access comes from the signed-in account’s organisation membership—not a role picker." tone="soft" />
    <Text onPress={() => router.push("/create-account")} style={styles.switch}>New here? Create a visitor account</Text>
  </Screen>;
}

function Field({ label, value, onChange, placeholder, secure = false }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; secure?: boolean }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={colors.muted} style={styles.input} secureTextEntry={secure} autoCapitalize="none" autoCorrect={false} keyboardType={secure ? "default" : "email-address"} /></View>;
}

const styles = StyleSheet.create({
  intro: { paddingHorizontal: 20, paddingBottom: 4, gap: 5 }, body: { ...type.body, color: colors.muted },
  form: { padding: 20, gap: 14 }, field: { gap: 6 }, label: { fontSize: 13, fontWeight: "800" }, input: { height: 52, paddingHorizontal: 14, borderWidth: 1.5, borderColor: colors.ink, backgroundColor: colors.white, fontSize: 16 },
  error: { color: colors.danger, fontSize: 13, fontWeight: "700" }, forgot: { minHeight: 36, color: colors.pink, textAlign: "right", fontWeight: "800" }, checking: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }, checkingText: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  demo: { margin: 20, marginTop: 0, padding: 17, gap: 10, backgroundColor: colors.yellow, borderWidth: 2, borderColor: colors.ink }, demoKicker: { color: colors.pink, fontSize: 10, fontWeight: "900", letterSpacing: 1 }, demoBody: { color: colors.muted, fontSize: 13, lineHeight: 18 },
  switch: { minHeight: 52, margin: 20, paddingTop: 14, textAlign: "center", color: colors.pink, fontWeight: "800" },
});
