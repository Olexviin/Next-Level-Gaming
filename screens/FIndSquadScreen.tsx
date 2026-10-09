import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { CustomButton } from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/theme";

export const FindSquadScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FIND YOUR SQUAD</Text>

      <View style={styles.filterCard}>
        <Text style={styles.label}>DISCOVER SQUADS</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.squadRow}>
            <View style={styles.avatarRow}>
              <View style={styles.avatar} />
              <View style={styles.avatar} />
              <View style={styles.avatar} />
              <View style={styles.avatarEmpty} />
            </View>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <CustomButton
        title="CREATE SQUAD"
        onPress={() => alert("Create Squad feature")}
      />
      <Text style={styles.hint}>Squares represent member slots</Text>
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
  filterCard: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: { color: COLORS.secondary, fontWeight: "bold", marginBottom: 15 },
  squadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarRow: { flexDirection: "row", gap: 5 },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  avatarEmpty: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.border,
    borderRadius: 4,
  },
  joinButton: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
  },
  joinText: { color: COLORS.secondary, fontWeight: "bold" },
  hint: {
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
  },
});
