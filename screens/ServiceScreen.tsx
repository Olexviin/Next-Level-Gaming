import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SERVICES, type ServiceCategory } from "../constants/services";
import { COLORS, SIZES } from "../constants/theme";

type ServiceFilter = ServiceCategory | "all";

export const ServicesOverviewScreen = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: ServiceFilter }>();
  const selectedCategory: ServiceFilter =
    category === "package" || category === "experience" ? category : "all";
  const visibleServices =
    selectedCategory === "all"
      ? SERVICES
      : SERVICES.filter((service) => service.type === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OUR SERVICES</Text>

      <View style={styles.filterRow}>
        {(
          [
            ["all", "All"],
            ["package", "Packages"],
            ["experience", "Experiences"],
          ] as const
        ).map(([value, label]) => (
          <TouchableOpacity
            key={value}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedCategory === value }}
            style={[
              styles.filterButton,
              selectedCategory === value && styles.filterButtonSelected,
            ]}
            onPress={() =>
              router.setParams({
                category: value === "all" ? undefined : value,
              })
            }
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === value && styles.filterTextSelected,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {visibleServices.map((service) => (
        <TouchableOpacity
          key={service.id}
          accessibilityRole="button"
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: "/service/[id]",
              params: { id: service.id },
            })
          }
        >
          <View>
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardType}>
              {service.type === "package"
                ? "Gaming package"
                : "Individual experience"}
            </Text>
          </View>
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    borderColor: COLORS.border,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: { color: COLORS.textMuted, fontWeight: "600" },
  filterTextSelected: { color: COLORS.text },
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
  cardType: { color: COLORS.textMuted, fontSize: 12, marginTop: 4 },
  cardPrice: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: "bold",
  },
});
