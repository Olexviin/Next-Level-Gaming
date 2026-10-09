import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>PLAYER PROFILE</Text>

      <View style={styles.profileHeader}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.level}>Level 12</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>REWARDS</Text>
      <View style={styles.rewardCard}>
        <Text style={styles.rewardTitle}>10% Off Next Booking</Text>
        <Text style={styles.rewardDesc}>Valid until end of month</Text>
      </View>

      <Text style={styles.sectionTitle}>ACCOUNT OPTIONS</Text>
      {["Edit Profile", "Preferences", "Sign Out"].map((option) => (
        <TouchableOpacity key={option} style={styles.optionRow}>
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  header: {
    color: COLORS.text,
    fontSize: SIZES.h1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    marginRight: 20,
  },
  name: { color: COLORS.text, fontSize: 24, fontWeight: "bold" },
  level: { color: COLORS.secondary, fontSize: 16, marginTop: 5 },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  rewardCard: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  rewardTitle: { color: COLORS.text, fontWeight: "bold", fontSize: 16 },
  rewardDesc: { color: COLORS.textMuted, marginTop: 5 },
  optionRow: {
    padding: 15,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: { color: COLORS.text },
});
