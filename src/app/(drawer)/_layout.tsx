import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { COLORS } from "../../../constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      initialRouteName="(tab)"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { color: COLORS.text, fontWeight: "bold" },
        drawerStyle: { backgroundColor: COLORS.cardBg, width: 280 },
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textMuted,
        drawerActiveBackgroundColor: "rgba(138, 43, 226, 0.15)",
        sceneStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Drawer.Screen
        name="(tab)"
        options={{
          drawerLabel: "Home",
          title: "Next Level Gaming",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AboutScreen"
        options={{
          drawerLabel: "About Us",
          title: "About Us",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="BookSessionScreen"
        options={{
          drawerLabel: "Book a Session",
          title: "Book a Session",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="EventsScreen"
        options={{
          drawerLabel: "Events & Tournaments",
          title: "Events & Tournaments",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TournamentDetails"
        options={{
          drawerLabel: "Tournament Details",
          title: "Tournament Details",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FindSquadScreen"
        options={{
          drawerLabel: "Find Your Squad",
          title: "Find Your Squad",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="LeaderboardScreen"
        options={{
          drawerLabel: "Leaderboard",
          title: "Leaderboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="podium" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        options={{
          drawerLabel: "Player Profile",
          title: "Player Profile",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="service/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Service Details",
        }}
      />
    </Drawer>
  );
}
