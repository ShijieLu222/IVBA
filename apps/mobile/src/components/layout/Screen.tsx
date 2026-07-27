import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors } from "../../theme";
import { globalStyles } from "../../theme/globalStyles";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}>;

export function Screen({ children, scroll = true, style }: ScreenProps) {
  const content = (
    <View style={[styles.screenContent, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={globalStyles.appCanvas}>
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1 },
  screenContent: {
    flex: 1,
    paddingBottom: 120,
    backgroundColor: colors.paper,
  },
});
