import { Image, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/theme";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo-glow.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Next Level Gaming</Text>
      <Text style={styles.subtitle}>
        Experience the ultimate esports arena.
      </Text>

      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitle}>EXPLORE</Text>
        <View style={styles.row}>
          <CustomButton
            title="Packages"
            onPress={() => navigation.navigate("ServicesOverview")}
            variant="secondary"
          />
          <CustomButton
            title="Experiences"
            onPress={() => navigation.navigate("ServicesOverview")}
            variant="outline"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
    justifyContent: "center",
  },
  logo: { width: 150, height: 150, alignSelf: "center", marginBottom: 20 },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: { color: COLORS.textMuted, textAlign: "center", marginBottom: 40 },
  exploreSection: { marginTop: 20 },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
