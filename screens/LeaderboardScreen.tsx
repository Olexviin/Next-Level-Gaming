import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

export const LeaderboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>LEADERBOARD</Text>

      <View style={styles.topThree}>
        {[1, 2, 3].map((rank) => (
          <View key={rank} style={styles.podium}>
            <Text style={styles.rankText}>{rank}</Text>
            <View style={styles.avatar} />
            <Text style={styles.nameText}>Player {rank}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>PLAYER / TEAM RANKINGS</Text>
      {[4, 5, 6, 7, 8].map((rank) => (
        <View key={rank} style={styles.rankRow}>
          <Text style={styles.rankNumber}>{rank}</Text>
          <Text style={styles.rankName}>Player Name {rank}</Text>
          <Text style={styles.rankPoints}>1200 pts</Text>
        </View>
      ))}

      <View style={styles.userRank}>
        <Text style={styles.rankNumber}>--</Text>
        <Text style={styles.rankName}>Your rank</Text>
        <Text style={styles.rankPoints}>--</Text>
      </View>
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
  topThree: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    alignItems: "flex-end",
  },
  podium: { alignItems: "center" },
  rankText: {
    color: COLORS.secondary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    marginBottom: 5,
  },
  nameText: { color: COLORS.text, fontSize: 12 },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rankRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    marginBottom: 8,
  },
  rankNumber: { color: COLORS.textMuted, width: 30 },
  rankName: { color: COLORS.text, flex: 1 },
  rankPoints: { color: COLORS.primary, fontWeight: "bold" },
  userRank: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginTop: 20,
  },
});
