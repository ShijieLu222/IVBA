import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { colors, spacing, type } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";
import { AppIcon } from "../icons";
import { BrandLockup } from "./BrandLockup";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  back?: boolean;
  right?: ReactNode;
};

export function PageHeader({
  title,
  eyebrow,
  back = true,
  right,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.pageHeader}>
      <View style={styles.pageHeaderTop}>
        {back ? (
          <Pressable
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={[globalStyles.touchTarget, styles.back]}
          >
            <AppIcon name="arrow-back" size={21} />
          </Pressable>
        ) : (
          <BrandLockup compact />
        )}
        {right ?? <View style={{ width: 44 }} />}
      </View>
      {eyebrow ? <Text style={globalStyles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={[type.h1, eyebrow ? styles.titleWithEyebrow : null]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    paddingHorizontal: spacing.gutter,
    paddingBottom: spacing.lg,
    backgroundColor: colors.paper,
  },
  pageHeaderTop: {
    minHeight: 56,
    marginLeft: -10,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { alignItems: "flex-start" },
  titleWithEyebrow: { marginTop: spacing.xs },
});
