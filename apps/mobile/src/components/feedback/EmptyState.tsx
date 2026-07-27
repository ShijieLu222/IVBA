import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing, type } from "../../theme";
import { SecondaryButton } from "../buttons";
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
        <AppIcon name={icon} size={20} color={colors.muted} />
      </View>
      <Text style={type.h3}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      <View style={styles.action}>
        <SecondaryButton label={action} onPress={onAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    marginTop: spacing.md,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    borderRadius: radii.xs,
    backgroundColor: colors.white,
  },
  emptyIcon: {
    width: 40,
    height: 40,
    marginBottom: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.xs,
    backgroundColor: colors.soft,
  },
  emptyBody: {
    ...type.meta,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 280,
  },
  action: { marginTop: spacing.md, alignSelf: "stretch" },
});
