import { Appearance, StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Google Fonts Imports
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";
import { Manrope_300Light, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { Poppins_500Medium } from "@expo-google-fonts/poppins";

import { Colors } from "@/constants/colors";
import "../global.css";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Manrope_300Light,
    Poppins_500Medium,
    Manrope_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  if (!fontsLoaded) return <></>;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1E1E2E"
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
