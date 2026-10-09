import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const services = [
  { id: "1", name: "Ultimate Gamer Pass", price: "R 150/hr", type: "package" },
  {
    id: "2",
    name: "VIP Gaming Experience",
    price: "R 250/hr",
    type: "package",
  },
  { id: "3", name: "E-Sports Training", price: "R 200/hr", type: "package" },
  { id: "4", name: "VR Solo", price: "R 100/hr", type: "experience" },
  { id: "5", name: "Sim Racing", price: "R 120/hr", type: "experience" },
];

export const ServicesOverviewScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OUR SERVICES</Text>

      <Text style={styles.sectionTitle}>GAMING PACKAGES</Text>
      {services
        .filter((s) => s.type === "package")
        .map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() => navigation.navigate("ServiceDetail", { service })}
          >
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardPrice}>{service.price}</Text>
          </TouchableOpacity>
        ))}

      <Text style={styles.sectionTitle}>INDIVIDUAL EXPERIENCES</Text>
      {services
        .filter((s) => s.type === "experience")
        .map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            onPress={() => navigation.navigate("ServiceDetail", { service })}
          >
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardPrice}>{service.price}</Text>
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
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: SIZES.h2,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: SIZES.borderRadius,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: { color: COLORS.text, fontSize: SIZES.body, fontWeight: "600" },
  cardPrice: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: "bold",
  },
});
