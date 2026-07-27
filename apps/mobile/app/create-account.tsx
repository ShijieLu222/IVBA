import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
  Checkbox,
  PageHeader,
  PrimaryButton,
  Screen,
  TextField,
} from "../src/ui";
import { colors, spacing, type } from "../src/theme";

export default function CreateAccountScreen() {
  const router = useRouter();
  const [consent, setConsent] = useState(false);

  return (
    <Screen>
      <PageHeader title="Create your account" />

      <View style={styles.intro}>
        <Text style={styles.body}>
          Save events, manage orders and keep your tickets available on your
          phone.
        </Text>
      </View>

      <View style={styles.form}>
        <TextField label="Full name" placeholder="Your name" />
        <TextField
          label="Email"
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          placeholder="At least 10 characters"
          secure
          autoCapitalize="none"
          hint="Use a mix of words, numbers or symbols."
        />
        <Checkbox
          checked={consent}
          onToggle={() => setConsent(!consent)}
          label="Send me occasional arts news and local event inspiration. Optional and easy to turn off."
        />
        <PrimaryButton
          label="Create account"
          onPress={() => router.replace("/(tabs)")}
        />
        <Text style={styles.terms}>
          By creating an account, you agree to the Terms and confirm you have
          read the Privacy Policy.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { paddingHorizontal: spacing.gutter },
  body: { ...type.body, color: colors.muted },
  form: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.md + 2,
  },
  terms: { ...type.meta, fontSize: 12, color: colors.muted },
});
