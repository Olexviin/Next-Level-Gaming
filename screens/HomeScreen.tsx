import { Image, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "../components/CustomButton";
import { COLORS, SIZES } from "../constants/theme";

export const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/ngl-home-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Next Level Gaming</Text>
      <Text style={styles.subtitle}>
        Level up your gaming experience. From casual play to competitive
        esports, NGL offers the ultimate high-tech arena for individuals,
        teams, and corporate events.
      </Text>

      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitle}>EXPLORE</Text>
        <View style={styles.row}>
          <CustomButton
            title="Packages"
            onPress={() =>
              router.navigate({
                pathname: "/(tab)/services",
                params: { category: "package" },
              })
            }
            variant="secondary"
          />
          <CustomButton
            title="Experiences"
            onPress={() =>
              router.navigate({
                pathname: "/(tab)/services",
                params: { category: "experience" },
              })
            }
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
  subtitle: {
    color: COLORS.textMuted,
    fontSize: SIZES.body,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  exploreSection: { marginTop: 20 },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
});
