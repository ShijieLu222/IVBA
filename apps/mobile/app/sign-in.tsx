import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { demoAccounts, detectAccountRole } from "../src/auth";
import {
  BrandLockup,
  InfoBanner,
  PageHeader,
  PrimaryButton,
  Screen,
  SecondaryButton,
  TextField,
} from "../src/ui";
import { colors, radii, spacing, type } from "../src/theme";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const signIn = () => {
    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setError("");
    setChecking(true);
    setTimeout(() => {
      const role = detectAccountRole(email);
      setChecking(false);
      router.replace(role === "host" ? "/(host)" : "/(tabs)");
    }, 700);
  };

  const useDemo = (role: "audience" | "host") => {
    const account = demoAccounts[role];
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  };

  return (
    <Screen>
      <PageHeader title="Sign in" right={<BrandLockup compact />} />

      <View style={styles.intro}>
        <Text style={styles.body}>
          We’ll recognise your account and open event discovery or your venue
          workspace automatically.
        </Text>
      </View>

      <View style={styles.form}>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secure
          autoCapitalize="none"
          error={error || undefined}
        />
        <Pressable style={styles.forgotWrap}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </Pressable>
        <PrimaryButton
          label={checking ? "Checking your workspace…" : "Sign in"}
          onPress={signIn}
          disabled={checking}
        />
        {checking ? (
          <View style={styles.checking}>
            <ActivityIndicator size="small" color={colors.pink} />
            <Text style={styles.checkingText}>
              Checking account and organisation access
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.demo}>
        <Text style={styles.demoKicker}>STATIC PROTOTYPE</Text>
        <Text style={type.h3}>Preview both account types</Text>
        <Text style={styles.demoBody}>
          Choose a demo, then tap Sign in. This shortcut is only for the
          prototype.
        </Text>
        <View style={styles.demoActions}>
          <SecondaryButton
            label="Use visitor demo"
            icon="ticket-outline"
            onPress={() => useDemo("audience")}
          />
          <SecondaryButton
            label="Use Venue Host demo"
            icon="home-outline"
            onPress={() => useDemo("host")}
          />
        </View>
      </View>

      <InfoBanner
        icon="lock-closed-outline"
        title="Role detection"
        body="In production, access comes from the signed-in account’s organisation membership—not a role picker."
        tone="soft"
      />

      <Text onPress={() => router.push("/create-account")} style={styles.switch}>
        New here? Create a visitor account
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { paddingHorizontal: spacing.gutter },
  body: { ...type.body, color: colors.muted },
  form: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
  forgotWrap: { minHeight: 32, justifyContent: "center", alignSelf: "flex-end" },
  forgot: { ...type.label, color: colors.pink },
  checking: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  checkingText: { ...type.meta, fontSize: 12, color: colors.muted },
  demo: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.section,
    padding: spacing.lg - 4,
    gap: spacing.xs + 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  demoKicker: { ...type.kicker, color: colors.pink },
  demoBody: { ...type.meta, color: colors.muted },
  demoActions: { marginTop: spacing.sm, gap: spacing.sm },
  switch: {
    minHeight: 52,
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    textAlign: "center",
    ...type.label,
    color: colors.pink,
  },
});
