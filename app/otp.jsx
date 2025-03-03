import React, { useState } from "react";
import { View, Keyboard, Pressable, Platform, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import OtpValidation from "@/components/otpValidation";

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
      <View className="flex flex-1 " style={{ backgroundColor: "#1E1E2E" }}>
        <Pressable
          style={{
            padding: 20,
            position: "absolute",
            top: 10,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
        </Pressable>
        <OtpValidation
          isOtpVisible={showScreen}
          userData={parsedUserData}
          onBack={() => {
            router.back();
          }}
          onSubmitOTP={(otp) => {
            console.log(otp);
          }}
        />
      </View>
    </Pressable>
  );
};

export default OTPscreen;
