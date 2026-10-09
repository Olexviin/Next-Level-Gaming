import { NavigationBar } from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { COLORS } from "../../constants/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
      />
      <NavigationBar style="dark" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.background },
          headerShown: false,
        }}
      />
    </>
  );
}
