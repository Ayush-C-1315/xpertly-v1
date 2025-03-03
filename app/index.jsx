import { View, Keyboard, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";

import Login from "@/components/loginComponent";

export default function Index() {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== "web") {
          Keyboard.dismiss();
        }
      }}
      accessible={false}
      className="flex-1"
    >
      <View
        className="flex-1 justify-center p-2"
        style={{ backgroundColor: "#1E1E2E" }}
      >
        <Login
          onSendOtp={(data) => {
            router.push({
              pathname: "/otp",
              params: { userData: JSON.stringify(data) },
            });
          }}
        />
      </View>
    </Pressable>
  );
}
