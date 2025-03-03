import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { Text, Button } from "react-native-paper";

import Entypo from "@expo/vector-icons/Entypo";
import withCssInterop from "@/utilities/withCssInterOp";

const OtpValidation = ({ isOtpVisible, userData, onBack, onSubmitOTP }) => {
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
  const submitHandler = () => {
    onSubmitOTP(otp);
  };
  const ButtonComponent = useMemo(() => withCssInterop(Button), []);
  const TextComponent = useMemo(() => withCssInterop(Text), []);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: 30,
      }}
    >
      <View></View>
      <View>
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
              +91 {userData?.phoneNumber}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                borderBottomColor: "#4F46E5",
                borderBottomWidth: 1,
              }}
            >
              <Entypo name="edit" size={14} color="#4F46E5" />
              <Text
                style={{
                  color: "#4F46E5",
                  fontWeight: "bold",
                }}
                onPress={onBack}
              >
                Edit
              </Text>
            </View>
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
          {isOtpVisible && isDisabled && (
            <TextComponent className={`text-[#F8FAFC]`}>
              Retry in {timer} seconds
            </TextComponent>
          )}
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
      </View>

      <View className="mt-5 flex items-center">
        <ButtonComponent
          disabled={!validOtp}
          mode="contained"
          style={{
            width: "90%",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 10,
            backgroundColor: validOtp ? "#4F46E5" : "grey",
          }}
          labelStyle={{ color: "#F8FAFC", fontFamily: "Manrope_700Bold" }}
          onPress={submitHandler}
        >
          Verify OTP
        </ButtonComponent>
      </View>
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
    borderColor: "#0E8667",
    backgroundColor: "transparent",
    height: 50,
    borderWidth: 2,
    width: 50,
  },
  pinCodeText: {
    fontSize: 20,
    color: "#F8FAFC",
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
