import React, { useState } from "react";
import { View, Keyboard, Pressable, Platform } from "react-native";

import Login from "@/components/loginComponent";
import OtpValidation from "@/components/otpValidation";

const MemoizedLogin = React.memo(Login);
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
      className="flex-1"
    >
      <View className="flex-1 justify-center p-2">
        <MemoizedLogin
          onSendOtp={(data) => {
            setIsOtpVisible(true);
          }}
        />
        <OtpValidation isOtpVisible={isOtpVisible} />
      </View>
    </Pressable>
  );
}
