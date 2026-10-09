import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { SERVICES } from "../constants/services";
import { COLORS, SIZES } from "../constants/theme";

export const ServiceDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = SERVICES.find((item) => item.id === id);

  if (!service) {
    return <Redirect href="/(tab)/services" />;
  }

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
        onPress={() => router.navigate("/(tab)/fees")}
      />
      <CustomButton
        title="Back to Services"
        onPress={() => router.back()}
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
