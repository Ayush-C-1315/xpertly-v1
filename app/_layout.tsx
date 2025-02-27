import { Stack } from "expo-router";
import { Appearance, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: theme.headerBackground },
            headerTintColor: theme.text,
          }}
        />
      </PaperProvider>
    </SafeAreaView>
  );
}
