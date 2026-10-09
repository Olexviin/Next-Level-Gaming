import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const EventsScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>EVENTS & TOURNAMENTS</Text>

      <View style={styles.featuredCard}>
        <Text style={styles.featuredBadge}>FEATURED</Text>
        <Text style={styles.cardTitle}>FIFA 24 Championship</Text>
        <Text style={styles.cardDate}>Date: 15 Nov 2024</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("TournamentDetails")}
        >
          <Text style={styles.linkText}>View Details →</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>UPCOMING EVENTS</Text>
      {[1, 2, 3].map((item) => (
        <View key={item} style={styles.card}>
          <Text style={styles.cardTitle}>CS:GO 5v5 Tournament</Text>
          <Text style={styles.cardDate}>Date: 20 Nov 2024</Text>
          <Text style={styles.status}>Upcoming</Text>
        </View>
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
  featuredCard: {
    backgroundColor: COLORS.cardBg,
    padding: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 20,
  },
  featuredBadge: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: { color: COLORS.text, fontSize: 18, fontWeight: "bold" },
  cardDate: { color: COLORS.textMuted, marginTop: 5 },
  status: { color: COLORS.secondary, marginTop: 5, fontSize: 12 },
  linkText: { color: COLORS.primary, marginTop: 10, fontWeight: "bold" },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
