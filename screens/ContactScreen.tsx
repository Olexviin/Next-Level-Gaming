import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";

export const ContactScreen = () => {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <Text style={styles.header}>CONTACT US</Text>

      <View style={styles.card}>
        <Text style={styles.label}>VENUE ADDRESS</Text>
        <Text style={styles.value}>123 Gaming Street, Johannesburg, 2001</Text>

        <Text style={styles.label}>CONTACT DETAILS</Text>
        <Text style={styles.value}>Phone: 011 123 4567</Text>
        <Text style={styles.value}>Email: info@nglarena.co.za</Text>

        <Text style={styles.label}>BUSINESS HOURS</Text>
        <Text style={styles.value}>Mon - Fri: 10:00 - 22:00</Text>
        <Text style={styles.value}>Sat - Sun: 09:00 - 00:00</Text>
      </View>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() =>
          Linking.openURL("https://maps.google.com/?q=Johannesburg")
        }
      >
        <Text style={styles.mapText}>GET DIRECTIONS (Map)</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  value: { color: COLORS.text, fontSize: SIZES.body, marginBottom: 2 },
  mapButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  mapText: { color: COLORS.text, fontWeight: "bold" },
});
