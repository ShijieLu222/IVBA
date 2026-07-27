import { StyleSheet, Text, View } from "react-native";

import { colors, type } from "../../theme";
import { PrimaryButton } from "../buttons";
import { AppIcon, type IconName } from "../icons";

type EmptyStateProps = {
  icon: IconName;
  title: string;
  body: string;
  action: string;
  onAction?: () => void;
};

export function EmptyState({
  icon,
  title,
  body,
  action,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <AppIcon name={icon} size={32} />
      </View>
      <Text style={type.h2}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      <PrimaryButton label={action} onPress={onAction} tone="yellow" />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    margin: 20,
    paddingVertical: 48,
    alignItems: "stretch",
    gap: 14,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.ink,
  },
  emptyIcon: {
    width: 56,
    height: 56,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyBody: { ...type.body, color: colors.muted, maxWidth: 320 },
});
