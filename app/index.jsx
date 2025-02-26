import { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";

import Login from "@/components/loginComponent";
import OtpValidation from "@/components/otpValidation";
export default function Index() {
  const [isOtpVisible, setIsOtpVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 10,
          // backgroundColor: "#707070",
        }}
      >
        <Login
          onSendOtp={(data) => {
            setIsOtpVisible(true);
          }}
        />
        <OtpValidation isOtpVisible={isOtpVisible} />
      </View>
    </TouchableWithoutFeedback>
  );
}
