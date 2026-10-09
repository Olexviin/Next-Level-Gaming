import { ScrollView, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>ABOUT US</Text>

      <Text style={styles.subHeader}>OUR HISTORY</Text>
      <Text style={styles.body}>
        Founded in Johannesburg, NGL has grown to become the premier esports
        destination...
      </Text>

      <Text style={styles.subHeader}>OUR VISION</Text>
      <Text style={styles.body}>
        To foster a diverse and inclusive gaming community...
      </Text>

      <Text style={styles.subHeader}>OUR MISSION</Text>
      <Text style={styles.body}>
        Providing top-tier hardware and a modern, high-tech environment...
      </Text>

      <Text style={styles.subHeader}>OUR GOALS</Text>
      <Text style={styles.bullet}>• Host weekly tournaments</Text>
      <Text style={styles.bullet}>• Expand to 3 new locations</Text>
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
    color: COLORS.secondary,
    fontSize: SIZES.h1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    color: COLORS.primary,
    fontSize: SIZES.h2,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  body: { color: COLORS.textMuted, fontSize: SIZES.body, lineHeight: 22 },
  bullet: {
    color: COLORS.textMuted,
    fontSize: SIZES.body,
    marginLeft: 10,
    marginTop: 5,
  },
});
