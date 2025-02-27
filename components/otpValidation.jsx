import { View } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import withCssInterop from "@/utilities/withCssInterOp";
import React from "react";

const OtpValidation = ({ isOtpVisible }) => {
  const [timer, setTimer] = useState(30);
  const [isDisabled, setIsDisabled] = useState(true);
  const [otp, setOtp] = useState("");
  const [validOtp, setValidOtp] = useState(false);
  useEffect(() => {
    let interval;
    if (timer > 0 && isOtpVisible) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isOtpVisible, timer]);
  const handleResendOtp = () => {
    setTimer(30);
    setIsDisabled(true);
  };
  const TextInputComponent = useMemo(() => withCssInterop(TextInput), []);
  const ButtonComponent = withCssInterop(Button);
  const TextComponent = withCssInterop(Text);
  return (
    <View className={`${isOtpVisible ? "opacity-100" : "opacity-0"} mt-5`}>
      <View className="flex flex-row gap-2 justify-around items-center">
        <TextInputComponent
          label={"OTP"}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={6}
          onChangeText={(value) => {
            setOtp(value);
            setValidOtp(value.length >= 4 && value.length <= 6);
          }}
          // style={{
          //   width: "40%",
          //   backgroundColor: "transparent",
          //   color: "black",
          // }}
          className="w-[40%] bg-[#F2F2F2] text-black border-black placeholder-gray-500"
          theme={{
            colors: {
              primary: "grey",
              onSurfaceVariant: "black",
              background: "white",
              text: "black",
            },
          }}
          selectionColor="green"
          textColor="black"
          disabled={false}
        ></TextInputComponent>
        <ButtonComponent
          mode="contained"
          onPress={handleResendOtp}
          disabled={isDisabled && isOtpVisible}
          // style={{
          //   marginTop: 10,
          //   borderRadius: 8,
          //   backgroundColor: isDisabled && isOtpVisible ? "grey" : "#0077B6",
          // }}
          className={`mt-2 rounded-lg ${
            isDisabled && isOtpVisible ? "bg-gray-500" : "bg-[#0077B6]"
          }`}
          labelStyle={{ color: "white", fontWeight: "bold" }}
        >
          Resend OTP
        </ButtonComponent>
      </View>
      <View
        // style={{
        //   alignItems: "center",
        //   marginTop: 20,
        // }}
        className="mt-5 flex items-center"
      >
        <TextComponent
          // style={{
          //   color: "black",
          //   opacity: isDisabled && isOtpVisible ? 1 : 0,
          // }}
          className={`text-black ${
            isDisabled && isOtpVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Resend OTP in {timer}seconds
        </TextComponent>
        <ButtonComponent
          disabled={!validOtp}
          mode="contained"
          // style={{
          //   marginTop: 10,
          //   borderRadius: 30,
          //   backgroundColor: validOtp ? "#FF8C00" : "grey",
          //   width: "60%",
          // }}
          className={`mt-2.5 rounded-[30px] ${
            validOtp ? "bg-[#FF8C00]" : "bg-gray-500"
          } w-[60%]`}
          labelStyle={{ color: "white", fontWeight: "bold" }}
        >
          Verify OTP
        </ButtonComponent>
      </View>
    </View>
  );
};

export default OtpValidation;
