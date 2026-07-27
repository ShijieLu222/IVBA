import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";
import { AppIcon } from "../../src/ui";

const icons = {
  index: "calendar-outline",
  search: "search-outline",
  tickets: "ticket-outline",
  saved: "bookmark-outline",
  profile: "person-circle-outline",
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.pink,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          width: "100%",
          maxWidth: 430,
          alignSelf: "center",
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: colors.paper,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.border,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          lineHeight: 14,
          fontWeight: "500",
          letterSpacing: 0.1,
        },
        tabBarIcon: ({ color, size }) => {
          const icon = icons[route.name as keyof typeof icons] ?? icons.index;
          return <AppIcon name={icon} color={color} size={size - 2} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Discover" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="tickets" options={{ title: "Tickets" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
