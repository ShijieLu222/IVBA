import { Tabs } from "expo-router";
import { colors } from "../../src/theme";
import { AppIcon } from "../../src/ui";

const icons = { index: "home-outline", calendar: "calendar-outline", requests: "document-text-outline", venue: "location-outline", profile: "person-circle-outline" } as const;

export default function HostTabLayout() {
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: colors.pink, tabBarInactiveTintColor: colors.ink,
    tabBarStyle: { width: "100%", maxWidth: 430, alignSelf: "center", height: 78, paddingTop: 8, paddingBottom: 8, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.ink, elevation: 0 },
    tabBarLabelStyle: { fontSize: 11, lineHeight: 15, fontWeight: "700" },
    tabBarIcon: ({ color, size }) => <AppIcon name={icons[route.name as keyof typeof icons] ?? icons.index} color={color} size={size + 2} />,
  })}>
    <Tabs.Screen name="index" options={{ title: "Today" }} />
    <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
    <Tabs.Screen name="requests" options={{ title: "Requests" }} />
    <Tabs.Screen name="venue" options={{ title: "Venue" }} />
    <Tabs.Screen name="profile" options={{ title: "Profile" }} />
  </Tabs>;
}
