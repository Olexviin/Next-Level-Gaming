import { NavigationBar } from "expo-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { COLORS } from "../../constants/theme";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
      >
        <Stack.Screen name="(drawer)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
