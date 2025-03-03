import { View, StyleSheet } from "react-native";
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather";

import { Manrope_300Light } from "@expo-google-fonts/manrope";
import { useState, useEffect, useMemo } from "react";
import { OtpInput } from "react-native-otp-entry";
import { Text, Button } from "react-native-paper";
import withCssInterop from "@/utilities/withCssInterOp";
import React from "react";

const OtpValidation = ({ isOtpVisible, userData, onBack }) => {
  const [fontsLoaded] = useFonts({
    Merriweather_400Regular,
    Merriweather_700Bold,
    Manrope_300Light,
  });

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

  const ButtonComponent = useMemo(() => withCssInterop(Button), []);
  const TextComponent = useMemo(() => withCssInterop(Text), []);

  return (
    <View className={`${isOtpVisible ? "opacity-100" : "opacity-0"} mt-5`}>
      {!fontsLoaded ? (
        <Text>Loading Fonts...</Text>
      ) : (
        <>
          <View className="flex flex-col gap-2 justify-around items-center mb-10">
            <Text
              style={{
                fontFamily: "Merriweather_700Bold",
                fontSize: 24,
                color: "#F8FAFC",
              }}
            >
              OTP Verification
            </Text>
            <Text
              style={{
                fontFamily: "Manrope_300Light",
                color: "#F8FAFC",
                fontSize: 14,
              }}
            >
              6 Digit Verification code is sent on
            </Text>
            <View className="flex flex-row gap-5">
              <Text
                style={{
                  fontFamily: "Manrope_300Light",
                  color: "#F8FAFC",
                  fontWeight: "bold",
                }}
              >
                {userData?.phoneNumber}
              </Text>
              <Text
                style={{
                  color: "#4F46E5",
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                }}
                onPress={onBack}
              >
                Edit
              </Text>
            </View>
          </View>

          <OtpInput
            numberOfDigits={6}
            focusColor={"red"}
            placeholder="******"
            blurOnFilled={true}
            type="numeric"
            secureTextEntry={false}
            onFilled={(value) => {
              setOtp(value);
              setValidOtp(true);
            }}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
              placeholderTextStyle: styles.placeholderText,
              filledPinCodeContainerStyle: styles.filledPinCodeContainer,
              disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
            }}
          />

          <View style={styles.resendContainer}>
            <Text style={{ color: "#F8FAFC" }}>Did'nt receive OTP</Text>
            <Text
              style={{
                color: isDisabled ? "grey" : "#4F46E5",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
              onPress={handleResendOtp}
              disabled={isDisabled}
            >
              Resend OTP
            </Text>
          </View>

          <View className="mt-5 flex items-center">
            <TextComponent
              className={`text-[#F8FAFC] ${
                isDisabled && isOtpVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              Resend OTP in {timer} seconds
            </TextComponent>

            <ButtonComponent
              disabled={!validOtp}
              mode="contained"
              className={`mt-2.5  ${
                validOtp ? "bg-[#4F46E5]" : "bg-gray-500"
              } w-[40%]`}
              labelStyle={{ color: "white", fontWeight: "bold" }}
              style={{ borderRadius: 5 }}
            >
              Verify OTP
            </ButtonComponent>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    width: "80%",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  pinCodeContainer: {
    borderRadius: 4,
    borderColor: "#10B981",
    backgroundColor: "#FFFFFF",
    height: 50,
    borderWidth: 2,
    width: 50,
  },
  pinCodeText: {
    fontSize: 20,
  },
  activePinCodeContainer: {
    backgroundColor: "#2E2E48",
    borderColor: "#7C3AED",
  },
  placeholderText: {
    color: "#6B7280",
  },
  resendContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    justifyContent: "center",
    marginTop: 20,
  },
  focusStick: {
    backgroundColor: "#7C3AED",
  },
});

export default OtpValidation;
