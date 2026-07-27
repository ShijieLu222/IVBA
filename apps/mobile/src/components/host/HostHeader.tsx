import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { colors } from "../../theme";
import { AppIcon } from "../icons";
import { BrandLockup } from "../layout";

type HostHeaderProps = {
  title: string;
  subtitle?: string;
};

export function HostHeader({
  title,
  subtitle = "The Island",
}: HostHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View>
        <BrandLockup compact />
        <Text style={styles.role}>VENUE HOST · {subtitle.toUpperCase()}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Pressable
        onPress={() => router.push("/host-notifications")}
        style={styles.notification}
      >
        <AppIcon name="notifications-outline" size={24} />
        <View style={styles.dot} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 146,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: colors.yellow,
    borderBottomWidth: 2,
    borderColor: colors.ink,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  role: {
    marginTop: 7,
    color: colors.pink,
    fontSize: 10,
    letterSpacing: 0.9,
    fontWeight: "900",
  },
  title: { marginTop: 2, fontSize: 27, lineHeight: 31, fontWeight: "900" },
  notification: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.pink,
    right: 6,
    top: 5,
  },
});
