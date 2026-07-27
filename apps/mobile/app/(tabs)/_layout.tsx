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
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.pink,
      tabBarInactiveTintColor: colors.ink,
      tabBarStyle: { width: "100%", maxWidth: 430, alignSelf: "center", height: 78, paddingTop: 8, paddingBottom: 8, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.ink, elevation: 0 },
      tabBarLabelStyle: { fontSize: 11, lineHeight: 15, fontWeight: "700" },
      tabBarIcon: ({ color, size, focused }) => {
        const icon = icons[route.name as keyof typeof icons] ?? icons.index;
        return <AppIcon name={icon} color={color} size={size + 2} />;
      },
    })}>
      <Tabs.Screen name="index" options={{ title: "Discover" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="tickets" options={{ title: "Tickets" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
