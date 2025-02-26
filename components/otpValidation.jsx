import { View } from "react-native";
import { useState, useEffect } from "react";
import { Text, TextInput, Button } from "react-native-paper";
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
  return (
    <View style={{ opacity: isOtpVisible ? 1 : 0, marginTop: 20 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TextInput
          label={"OTP"}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={6}
          onChangeText={(value) => {
            setOtp(value);
            setValidOtp(value.length >= 4 && value.length <= 6);
          }}
          style={{
            width: "40%",
            backgroundColor: "transparent",
            color: "black",
          }}
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
        ></TextInput>
        <Button
          mode="contained"
          onPress={handleResendOtp}
          disabled={isDisabled && isOtpVisible}
          style={{
            marginTop: 10,
            borderRadius: 8,
            backgroundColor: isDisabled && isOtpVisible ? "grey" : "#0077B6",
          }}
          labelStyle={{ color: "white", fontWeight: "bold" }}
        >
          Resend OTP
        </Button>
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            opacity: isDisabled && isOtpVisible ? 1 : 0,
          }}
        >
          Resend OTP in {timer}seconds
        </Text>
        <Button
          disabled={!validOtp}
          mode="contained"
          style={{
            marginTop: 10,
            borderRadius: 30,
            backgroundColor: validOtp ? "#FF8C00" : "grey",
            width: "60%",
          }}
          labelStyle={{ color: "white", fontWeight: "bold" }}
        >
          Verify OTP
        </Button>
      </View>
    </View>
  );
};

export default OtpValidation;
