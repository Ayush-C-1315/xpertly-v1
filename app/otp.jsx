import OtpValidation from "@/components/otpValidation";
import { View, Keyboard, Pressable, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

const OTPscreen = () => {
  const { userData } = useLocalSearchParams();
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const [showScreen, setShowScreen] = useState(true);

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
        className="flex flex-1 justify-center"
        style={{ backgroundColor: "#1E1E2E" }}
      >
        <OtpValidation
          isOtpVisible={showScreen}
          userData={parsedUserData}
          onBack={() => {
            router.back();
          }}
        />
      </View>
    </Pressable>
  );
};

export default OTPscreen;
