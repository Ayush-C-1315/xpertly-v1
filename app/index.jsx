import { useState } from "react";
import { View, Keyboard, Pressable, Platform } from "react-native";

import Login from "@/components/loginComponent";
import OtpValidation from "@/components/otpValidation";
export default function Index() {
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  return (
    <Pressable
      onPress={() => {
        if (Platform.OS !== "web") {
          Keyboard.dismiss();
        }
      }}
      accessible={false}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Login
          onSendOtp={(data) => {
            setIsOtpVisible(true);
          }}
        />
        <OtpValidation isOtpVisible={isOtpVisible} />
      </View>
    </Pressable>
  );
}
