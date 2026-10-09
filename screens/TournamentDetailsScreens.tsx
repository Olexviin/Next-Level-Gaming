import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/theme";

export const TournamentDetailsScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>TOURNAMENT DETAILS</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Schedule:</Text>
        <Text style={styles.value}>15 Nov, 10:00 AM</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Format:</Text>
        <Text style={styles.value}>Single Elimination</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Entry Fee:</Text>
        <Text style={styles.value}>R 150 per team</Text>
      </View>

      <Text style={styles.sectionTitle}>ELIGIBILITY</Text>
      <Text style={styles.value}>Open to all ages. Teams of 5.</Text>

      <Text style={styles.sectionTitle}>PRIZES</Text>
      <Text style={styles.value}>1st Place: R 5000 + Gear</Text>

      <Text style={styles.sectionTitle}>PARTICIPANT / TEAM ENTRY</Text>
      <CustomButton
        title="REGISTER"
        onPress={() => alert("Registration Open!")}
      />
      <CustomButton
        title="Back to Events"
        variant="outline"
        onPress={() => navigation.goBack()}
      />
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 5,
  },
  label: { color: COLORS.secondary, fontWeight: "bold" },
  value: { color: COLORS.text },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
