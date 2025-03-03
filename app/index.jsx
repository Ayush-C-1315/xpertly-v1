import React, { useEffect, useState } from "react";
import { View, Keyboard, Pressable, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Login from "@/components/loginComponent";

const MemoizedLogin = React.memo(Login);
export default function Index() {
  const [userData, setUserData] = useState(null);
  const { userData: data } = useLocalSearchParams();

  useEffect(() => {
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

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
        <MemoizedLogin
          onSendOtp={(data) => {
            router.push({
              pathname: "/otp",
              params: { userData: JSON.stringify(data) },
            });
            setUserData(data);
          }}
        />
      </View>
    </Pressable>
  );
}
