import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { PageHeader, PrimaryButton, Screen, TextField } from "../src/ui";
import { colors, radii, spacing } from "../src/theme";

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <Screen>
      <PageHeader title="Edit profile" />

      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>KM</Text>
        </View>
      </View>

      <View style={styles.form}>
        <TextField label="Full name" value="Ken Morgan" />
        <TextField
          label="Email"
          value="ken@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label="Phone (optional)"
          value="+44 7700 900 123"
          keyboardType="phone-pad"
        />
        <TextField label="Home city" value="Bristol" />
        <PrimaryButton label="Save changes" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarRow: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.lg,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: radii.pill,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: { fontSize: 21, fontWeight: "600", letterSpacing: 0.4 },
  form: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
    gap: spacing.md + 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
