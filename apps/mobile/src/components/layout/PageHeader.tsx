import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

import { colors, type } from "../../theme";
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
            onPress={() => router.back()}
            style={globalStyles.touchTarget}
          >
            <AppIcon name="arrow-back" />
          </Pressable>
        ) : (
          <BrandLockup compact />
        )}
        {right ?? <View style={{ width: 44 }} />}
      </View>
      {eyebrow ? <Text style={globalStyles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={type.h1}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageHeader: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    backgroundColor: colors.paper,
  },
  pageHeaderTop: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
