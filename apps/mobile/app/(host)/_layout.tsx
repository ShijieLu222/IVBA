import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "../../src/theme";
import { AppIcon } from "../../src/ui";

const icons = {
  index: "home-outline",
  calendar: "calendar-outline",
  requests: "document-text-outline",
  venue: "location-outline",
  profile: "person-circle-outline",
} as const;

export default function HostTabLayout() {
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
        tabBarIcon: ({ color, size }) => (
          <AppIcon
            name={icons[route.name as keyof typeof icons] ?? icons.index}
            color={color}
            size={size - 2}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Today" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="requests" options={{ title: "Requests" }} />
      <Tabs.Screen name="venue" options={{ title: "Venue" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
