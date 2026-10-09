import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/theme";

export const ServiceDetailScreen = ({ route, navigation }: any) => {
  const { service } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{service.name}</Text>
      <Text style={styles.price}>{service.price}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>WHAT'S INCLUDED</Text>
        <Text style={styles.body}>• Access to high-end PC/Console</Text>
        <Text style={styles.body}>• Complimentary beverage</Text>
        <Text style={styles.body}>• 1 Hour of gameplay</Text>
      </View>

      <CustomButton
        title="GET A QUOTE"
        onPress={() => navigation.navigate("CalculateFees")}
      />
      <CustomButton
        title="Back to Services"
        onPress={() => navigation.goBack()}
        variant="outline"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  header: { color: COLORS.text, fontSize: SIZES.h1, fontWeight: "bold" },
  price: {
    color: COLORS.secondary,
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: SIZES.borderRadius,
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: { color: COLORS.textMuted, fontSize: SIZES.body, marginBottom: 5 },
});
