import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { CustomInput } from "../components/CustomInput";
import { COLORS, SIZES } from "../constants/theme";

export const BookSessionScreen = () => {
  const [experience, setExperience] = useState("PC Gaming");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [players, setPlayers] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>BOOK A SESSION</Text>

      <Text style={styles.label}>CHOOSE GAMING EXPERIENCE</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerText}>{experience}</Text>
      </View>

      <Text style={styles.label}>DATE & TIME</Text>
      <CustomInput
        placeholder="DD/MM/YYYY"
        value={date}
        onChangeText={setDate}
      />
      <CustomInput placeholder="HH:MM" value={time} onChangeText={setTime} />

      <Text style={styles.label}>PARTY SIZE</Text>
      <CustomInput
        placeholder="Number of players"
        value={players}
        onChangeText={setPlayers}
        keyboardType="numeric"
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>SESSION SUMMARY</Text>
        <Text style={styles.summaryText}>Experience: {experience}</Text>
        <Text style={styles.summaryText}>Date: {date || "--"}</Text>
        <Text style={styles.summaryText}>Players: {players || "--"}</Text>
      </View>

      <CustomButton
        title="BOOK SESSION"
        onPress={() => alert("Booking request sent!")}
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
  label: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: COLORS.cardBg,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickerText: { color: COLORS.text },
  summaryCard: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  summaryTitle: { color: COLORS.primary, fontWeight: "bold", marginBottom: 10 },
  summaryText: { color: COLORS.textMuted, marginBottom: 5 },
});
